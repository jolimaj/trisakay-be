const Driver = require("./db");
const Users = require("../Users/db");
const CrudModel = require("../CRUD/model");

const DriverModel = {
  addDriver: async (request, options = {}) => {
    const payload = {
      userID: request,
    };
    const data = await CrudModel.addRecord(payload, Driver);
    return Promise.resolve(data);
  },
  getByID: async (id, options = {}) => {
    const users = await Driver.query()
      .innerJoin("users", "users.id", "driver.userID")
      .select({
        id: "users.id",
        fname: "users.fname",
        lname: "users.lname",
        latitude: "driver.latitude",
        longitude: "driver.longitude",
      })
      .where({ userID: id })
      .first();
    return Promise.resolve(users);
  },
  getDrivers: async (options = {}) => {
    const users = await Users.query()
      .innerJoin("driver", "driver.userID", "users.id")
      .select({
        id: "users.id",
        profile: "users.profile",
        fname: "users.fname",
        mname: "users.mname",
        lname: "users.lname",
        email: "users.email",
        mobile: "users.mobile",
        details: "users.details",
        latitude: "driver.latitude",
        longitude: "driver.longitude",
      })
      .where({ roleID: 2, isOnline: true });

    return Promise.resolve(users);
  },
  updateLocation: async (id, request, options = {}) => {
    const data = await Driver.query()
      .where({ userID: id })
      .update(request)
      .returning("*");

    return Promise.resolve(data);
  },
  updateMyStatus: async (id) => {
    try {
      const data = await Users.query().where({ id: id }).first();
      let isOn;
      if (data.isOnline) {
        isOn = await Users.query()
          .where({ id: id })
          .update({ isOnline: false });
      } else {
        isOn = await Users.query().where({ id: id }).update({ isOnline: true });
      }
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
module.exports = DriverModel;
