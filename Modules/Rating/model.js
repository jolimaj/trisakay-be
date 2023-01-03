const Rating = require("./db");

const RatingModel = {
  getRating: async (options = {}) => {
    const fees = await Rating.query()
      .innerJoin("users", "users.id", "driver_rating.driver")
      .select({
        id: "users.id",
        fname: "users.fname",
        lname: "users.lname",
        details: "users.details",
        rate: "driver_rating.rate",
        comment: "driver_rating.comment",
      })
      .where({ rate: null });

    return Promise.resolve(fees);
  },
  getRatingByID: async (driver, options = {}) => {
    const fees = await Rating.query().where({ driver }).first();
    return Promise.resolve(fees);
  },
  addRating: async (id, options = {}) => {
    const payload = {
      driver: id,
    };
    const rate = await Rating.query().insert(payload).returning("*");
    return Promise.resolve(rate);
  },
  updateRating: async (id, request) => {
    try {
      const updates = await Rating.query()
        .where({ driver: id })
        .update(request)
        .returning("*");
      return Promise.resolve(updates);
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
module.exports = RatingModel;
