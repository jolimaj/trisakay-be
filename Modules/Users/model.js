const Users = require("./db");
const CrudModel = require("../CRUD/model");
const EmailController = require("../EmailNotification/model");
const OTP = require("../OTP/model");
const Passenger = require("../Passenger/model");
const Driver = require("../Driver/model");
const TermsAccept = require("../TermsAccept/model");
const Rating = require("../Rating/model");
const response = require("../../Common/Response/ResponseCodes");
const {
  comparePassword,
  securePassword,
} = require("../../Common/validatePassword");

const UserModel = {
  getDBRequest: async (request) => {
    const data = {
      profile: request.profile,
      roleID: request.roleID,
      fname: request.fname,
      mname: request.mname,
      lname: request.lname,
      email: request.email,
      mobile: request.mobile,
      details: {
        address: request.address,
        passengerType: request.passengerType,
        driver:
          request.roleID === 3
            ? ""
            : {
                tric_num: request.tric_num,
                p_motor: request.p_motor,
                toda_name: request.toda_name,
                licence_pic: request.licence_pic,
                franchise_pic: request.franchise_pic,
                registration_pic: request.registration_pic,
                tric_pic: request.tric_pic,
              },
      },
    };
    return data;
  },
  getUsers: async (roleID, options = {}) => {
    const users = await Users.query().where({ roleID }).whereNot({ status: 2 });
    return Promise.resolve(users);
  },
  getUsersPending: async (options = {}) => {
    const users = await Users.query().where({ status: 2 });
    return Promise.resolve(users);
  },
  getUsersID: async (id, options = {}) => {
    const users = await Users.query().where({ id: id }).first();
    return Promise.resolve(users);
  },
  isNotExisting: async (request) => {
    try {
      const data = await Users.query().where({ email: request.email }).first();
      if (data) return Promise.reject("Ang Email ay nagamit na!");
      return Promise.resolve(true);
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  },
  addUser: async (request, options = {}) => {
    //Validate title
    await UserModel.isNotExisting(request);
    request.roleID = 1;
    request.status = 1;
    const data = await CrudModel.addRecord(request, Users);
    //sent email notif to set password
    const message = data.fname;
    const otp = await OTP.sendOTP();
    const subject = "Maligayang pagdating sa TRI_SAKAY";
    EmailController.send(data.email, message, subject, otp, false);
    return Promise.resolve(data);
  },
  approveUser: async (id) => {
    try {
      const data = {
        status: 1,
      };
      const userData = await Users.query().where({ id: id }).first();
      //update user
      const user = await CrudModel.updateRecord(id, data, Users);
      //sent email notif to set password
      const message = userData.fname;
      const otp = "";
      const subject = "Maligayang pagdating sa TRI_SAKAY";
      EmailController.send(
        userData.email,
        message,
        subject,
        otp,
        false,
        data.status
      );
      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  deactivateUser: async (id, options = {}) => {
    const data = {
      status: 3,
    };
    const userData = await Users.query().where({ id: id }).first();
    //update user
    const user = await CrudModel.updateRecord(id, data, Users);
    //sent email notif to set password
    const subject = "Account Notification";
    const message = `${userData.fname}`;
    const link = "";
    EmailController.send(
      userData.email,
      message,
      subject,
      link,
      false,
      data.status
    );
    return Promise.resolve(user);
  },
  loginUsers: async (request, options = {}) => {
    try {
      const data = await Users.query().where({ email: request.email }).first();
      if (data) {
        const password = comparePassword(request.password, data.password);
        if (!password) {
          return Promise.reject(response.INVALID_PASSWORD);
        } else {
          if (data.status === 1) {
            return Promise.resolve(data);
          } else if (data.status === 2) {
            return Promise.reject(response.ACCOUNT_NOT_ACTIVE);
          } else {
            return Promise.reject(response.ACCOUNT_SUSPENDED);
          }
        }
      } else {
        return Promise.reject(response.INVALID_EMAIL);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  },
  registration: async (request, options = {}) => {
    const payload = await UserModel.getDBRequest(request);
    const data = await CrudModel.addRecord(payload, Users);
    data.roleID === 2
      ? await Driver.addDriver(data.id)
      : await Passenger.addPassenger(data.id);
    if (data.roleID === 2) {
      await Rating.addRating(data.id);
    }
    await TermsAccept.addAcceptance(data.id);
    const message = data.fname;
    const otp = Math.floor(1000 + Math.random() * 9000);
    OTP.saveOTP({ userID: data.id, otp: otp });
    const subject = "Maligayang pagdating sa TRI_SAKAY";
    EmailController.send(data.email, message, subject, otp, false);
    return Promise.resolve(data);
  },
  updateUser: async (id, request, options = {}) => {
    const payload = {
      profile: request.profile,
      mobile: request.mobile,
      details: {
        address: request.address,
        passengerType: request.passengerType,
        driver:
          request.roleID === 3
            ? ""
            : {
                tric_num: request.tric_num,
                p_motor: request.p_motor,
                toda_name: request.toda_name,
                licence_pic: request.licence_pic,
                franchise_pic: request.franchise_pic,
                registration_pic: request.registration_pic,
                tric_pic: request.tric_pic,
              },
      },
    };

    const data = await CrudModel.updateRecord(id, payload, Users);
    return Promise.resolve(data);
  },
  setPassword: async (id, req) => {
    try {
      const request = {
        password: securePassword(req.password),
      };
      const data = await CrudModel.updateRecord(id, request, Users);
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  checkOTP: async (id, req) => {
    try {
      const data = await OTP.verifyOTP(id);
      console.log(
        "🚀 ~ file: model.js ~ line 160 ~ checkOTP: ~ data",
        req.otp === data.otp
      );
      const startTime = new Date(data.createdAt);
      const endTime = new Date(new Date().toISOString());
      const diff = endTime.getTime() - startTime.getTime();
      const hrDiff = diff / 3600 / 1000; // 1.555555
      const totalHours = parseFloat(hrDiff.toFixed(2)); // 1.5

      if (req.otp === data.otp && totalHours < 0.15) {
        return Promise.resolve("Granted", data);
      } else if (totalHours >= 0.15) {
        return Promise.reject(
          "One time password was expired! Please resend new one time pin."
        );
      } else if (req.otp !== data.otp && totalHours < 0.15) {
        return Promise.reject("Incorrect OTP! Please resend new one time pin.");
      }
    } catch (e) {
      return Promise.reject(e);
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const data = await Users.query().where({ email: req.email }).first();
      if (data === undefined)
        return Promise.reject("Ang Email ay hindi mahanap!");
      const otp = await OTP.sendOTP(data.id);
      OTP.saveOTP({ userID: data.id, otp: otp });
      const message = `${data.fname},`;
      const subject = "Reset Password";
      EmailController.send(data.email, message, subject, otp, false);
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  logoutUser: async (id, options) => {
    try {
      const data = await Users.query()
        .where({ id: id })
        .update({ isOnline: false });
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
};

module.exports = UserModel;
