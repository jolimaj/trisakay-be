const Fees = require("./db");

const FeesModel = {
  getFee: async (options = {}) => {
    const fees = await Fees.query().where(options);
    return Promise.resolve(fees);
  },

  updateFees: async (id, request, options = {}) => {
    const data = await Fees.query()
      .where({ id: id })
      .update(request)
      .returning("*");

    return Promise.resolve(data);
  },
};
module.exports = FeesModel;
