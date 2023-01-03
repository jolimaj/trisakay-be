const Booking = require("./db");
const Users = require("../Users/db");
const CrudModel = require("../CRUD/model");

const BookingModel = {
  getDBRequest: async (req) => {
    console.log("🚀 ~ file: model.js ~ line 6 ~ getDBRequest: ~ req", req);
    const data = {
      passengerID: req.passengerID,
      driverID: req.driverID,
      fee: req.fee,
      date: new Date(),
      details: {
        origin: req.origin,
        destination: req.destination,
        distance: req.distance,
        passenger: req.passNum,
      },
      status: 0,
    };
    return data;
  },
  bookCar: async (request, options = {}) => {
    const payload = await BookingModel.getDBRequest(request);
    const data = await CrudModel.addRecord(payload, Booking);
    return Promise.resolve(data);
  },
  getBookingHistoryDriver: async (id, options = {}) => {
    const driver = await Booking.query()
      .innerJoin("users", "users.id", "bookings.passengerID")
      .select({
        driverID: "bookings.driverID",
        fname: "users.fname",
        mname: "users.mname",
        lname: "users.lname",
        profile: "users.profile",
        email: "users.email",
        mobile: "users.mobile",
        other: "users.details",
        fee: "bookings.fee",
        date: "bookings.date",
        booking_details: "bookings.details",
        status: "bookings.status",
      })
      .where({ driverID: id });
    if (driver && driver.length === 0) {
      return Promise.reject("Booking list is Empty");
    }
    return Promise.resolve(driver);
  },
  getBookingHistoryPassenger: async (id, options = {}) => {
    const passenger = await Booking.query()
      .innerJoin("users", "users.id", "bookings.driverID")
      .select({
        passengerID: "bookings.passengerID",
        fname: "users.fname",
        mname: "users.mname",
        lname: "users.lname",
        profile: "users.profile",
        email: "users.email",
        mobile: "users.mobile",
        other: "users.details",
        fee: "bookings.fee",
        date: "bookings.date",
        booking_details: "bookings.details",
        status: "bookings.status",
      })
      .where({ passengerID: id });
    if (passenger && passenger.length === 0) {
      return Promise.reject("Booking list is Empty");
    }
    return Promise.resolve(passenger);
  },
  acceptPassenger: async (id, request, options = {}) => {
    const bookings = await Booking.query()
      .where({
        passengerID: request.passengerID,
        driverID: id,
      })
      .orderBy("id", "desc")
      .first();

    const data = await Booking.query()
      .where({
        passengerID: bookings.passengerID,
        driverID: id,
        date: bookings.date,
        id: bookings.id,
      })
      .update({ status: 1 })
      .returning("*");
    return Promise.resolve(data);
  },
  rejectPassenger: async (id, request, options = {}) => {
    const bookings = await Booking.query()
      .where({
        passengerID: request.passengerID,
        driverID: id,
      })
      .orderBy("id", "desc")
      .first();
    const data = await Booking.query()
      .where({
        passengerID: bookings.passengerID,
        driverID: id,
        date: bookings.date,
        id: bookings.id,
      })
      .update({ status: 2 })
      .returning("*");
    return Promise.resolve(data);
  },
  cancellPassenger: async (id, request, options = {}) => {
    const bookings = await Booking.query()
      .where({
        passengerID: request.passengerID,
        driverID: id,
      })
      .orderBy("id", "desc")
      .first();
    const data = await Booking.query()
      .where({
        passengerID: bookings.passengerID,
        driverID: id,
        date: bookings.date,
        id: bookings.id,
      })
      .update({ status: 3 })
      .returning("*");
    return Promise.resolve(data);
  },
  pickupPassenger: async (id, request, options = {}) => {
    const bookings = await Booking.query()
      .where({
        passengerID: request.passengerID,
        driverID: id,
      })
      .orderBy("id", "desc")
      .first();
    const data = await Booking.query()
      .where({
        passengerID: bookings.passengerID,
        driverID: id,
        date: bookings.date,
        id: bookings.id,
      })
      .update({ status: 4 })
      .returning("*");
    return Promise.resolve(data);
  },
  donePassenger: async (id, request, options = {}) => {
    const bookings = await Booking.query()
      .where({
        passengerID: request.passengerID,
        driverID: id,
      })
      .orderBy("id", "desc")
      .first();
    const data = await Booking.query()
      .where({
        passengerID: bookings.passengerID,
        driverID: id,
        date: bookings.date,
        id: bookings.id,
      })
      .update({ status: 5 })
      .returning("*");
    return Promise.resolve(data);
  },
  endPassenger: async (id, request, options = {}) => {
    const bookings = await Booking.query()
      .where({
        passengerID: request.passengerID,
        driverID: id,
      })
      .orderBy("id", "desc")
      .first();
    const data = await Booking.query()
      .where({
        passengerID: bookings.passengerID,
        driverID: id,
        date: bookings.date,
        id: bookings.id,
      })
      .update({ status: 6 })
      .returning("*");
    return Promise.resolve(data);
  },
  currentPickBookPassenger: async (id, options = {}) => {
    const bookings = await Booking.query()
      .where({
        passengerID: id,
      })
      .orderBy("id", "desc")
      .first();
    if (bookings === undefined) {
      return Promise.resolve(null);
    } else {
      const users = await Users.query()
        .where({
          id: bookings.passengerID,
          status: 1,
        })
        .first();

      const payload = {
        fname: users.fname,
        mname: users.mname,
        lname: users.lname,
        profile: users.profile,
        email: users.email,
        mobile: users.mobile,
        other: users.details,
        booking_details: bookings.details,
        fee: bookings.fee,
        date: bookings.data,
        status: bookings.status,
        passengerID: bookings.passengerID,
        driverID: bookings.driverID,
      };

      return Promise.resolve(payload);
    }
  },
  currentBookPassenger: async (id, options = {}) => {
    const bookings = await Booking.query()
      .where({
        passengerID: id,
        status: 1,
      })
      .orderBy("id", "desc")
      .first();
    if (bookings === undefined) {
      return Promise.resolve(null);
    } else {
      const users = await Users.query()
        .where({
          id: bookings.passengerID,
          status: 1,
        })
        .first();

      const payload = {
        fname: users.fname,
        mname: users.mname,
        lname: users.lname,
        profile: users.profile,
        email: users.email,
        mobile: users.mobile,
        other: users.details,
        booking_details: bookings.details,
        fee: bookings.fee,
        date: bookings.data,
        status: bookings.status,
        passengerID: bookings.passengerID,
        driverID: bookings.driverID,
      };

      return Promise.resolve(payload);
    }
  },
  currentBookDriver: async (id, options = {}) => {
    const bookings = await Booking.query()
      .orderBy("id", "desc")
      .where({
        driverID: id,
        status: 0,
      })
      .first();
    if (bookings === undefined) {
      return Promise.resolve(null);
    } else {
      const users = await Users.query()
        .where({
          id: bookings.passengerID,
        })
        .first();

      const payload = {
        fname: users.fname,
        mname: users.mname,
        lname: users.lname,
        profile: users.profile,
        email: users.email,
        mobile: users.mobile,
        other: users.details,
        booking_details: bookings.details,
        fee: bookings.fee,
        date: bookings.data,
        status: bookings.status,
        passengerID: bookings.passengerID,
        driverID: bookings.driverID,
      };

      return Promise.resolve(payload);
    }
  },
  myCurrentPassenger: async (id, options = {}) => {
    const bookings = await Booking.query()
      .orderBy("id", "desc")
      .where({
        driverID: id,
      })
      .first();
    if (bookings === undefined) {
      return Promise.resolve(null);
    } else {
      const users = await Users.query()
        .where({
          id: bookings.passengerID,
        })
        .first();

      const payload = {
        fname: users.fname,
        mname: users.mname,
        lname: users.lname,
        profile: users.profile,
        email: users.email,
        mobile: users.mobile,
        other: users.details,
        booking_details: bookings.details,
        fee: bookings.fee,
        date: bookings.data,
        status: bookings.status,
        passengerID: bookings.passengerID,
        driverID: bookings.driverID,
      };

      return Promise.resolve(payload);
    }
  },
};
module.exports = BookingModel;
