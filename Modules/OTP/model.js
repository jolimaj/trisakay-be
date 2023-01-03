const OTP = require("./db");
const CrudModel = require("../CRUD/model");

const OTPController = {
  saveOTP: async (req, options = {}) => {
    const payload = {
      ...req,
      createdAt: new Date().toISOString(),
    };
    const data = await CrudModel.addRecord(payload, OTP);
    return Promise.resolve(data);
  },
  verifyOTP: async (userID, options = {}) => {
    const users = await OTP.query().where({ userID: userID }).first();
    console.log("🚀 ~ file: model.js ~ line 15 ~ verifyOTP: ~ users", users);
    return Promise.resolve(users);
  },
  sendOTP: async (id) => {
    if (id) {
      await OTP.query().where({ userID: id }).delete();
    }
    return Math.floor(1000 + Math.random() * 9000);
  },
};
module.exports = OTPController;
