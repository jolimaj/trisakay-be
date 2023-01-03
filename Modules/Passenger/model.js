const Passenger = require("./db");
const CrudModel = require("../CRUD/model");
const Users = require("../Users/db");

const PassengerModel = {
  addPassenger: async (request, options = {}) => {
    const payload = {
      userID: request,
    };
    const data = await CrudModel.addRecord(payload, Passenger);
    return Promise.resolve(data);
  },
  getByID: async (id, options = {}) => {
    const users = await Passenger.query()
      .innerJoin("users", "users.id", "passenger.userID")
      .select({
        id: "users.id",
        fname: "users.fname",
        lname: "users.lname",
        latitude: "passenger.latitude",
        longitude: "passenger.longitude",
        details: "users.details",
      })
      .where({ userID: id })
      .first();
    return Promise.resolve(users);
  },
  getPassenger: async (options = {}) => {
    const users = await Users.query()
      .innerJoin("passenger", "passenger.userID", "users.id")
      .select({
        id: "users.id",
        profile: "users.profile",
        fname: "users.fname",
        mname: "users.mname",
        lname: "users.lname",
        email: "users.email",
        mobile: "users.mobile",
        details: "users.details",
        latitude: "passenger.latitude",
        longitude: "passenger.longitude",
      })
      .where({ roleID: 3, isOnline: true });
    return Promise.resolve(users);
  },
  updateLocation: async (id, request, options = {}) => {
    const data = await Passenger.query()
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
module.exports = PassengerModel;
