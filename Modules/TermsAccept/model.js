const TermsAccept = require("./db");
const CrudModel = require("../CRUD/model");

const TermsAcceptance = {
  getTerms: async (userID, options = {}) => {
    const data = await TermsAccept.query().where({ userID }).first();
    return Promise.resolve(data);
  },

  addAcceptance: async (user, options = {}) => {
    const payload = {
      userID: user,
      accepted: false,
    };
    const data = await CrudModel.addRecord(payload, TermsAccept);
    return Promise.resolve(data);
  },
  updateAcceptance: async (userID, options = {}) => {
    const data = await TermsAccept.query()
      .where({ userID })
      .update({ accepted: true })
      .returning("*");

    return Promise.resolve(data);
  },
};

module.exports = TermsAcceptance;
