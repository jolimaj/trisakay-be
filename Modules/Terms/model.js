const Terms = require("./db");
const CrudModel = require("../CRUD/model");

const TermsModel = {
  getTerms: async (options = {}) => {
    const terms = await CrudModel.getAll(Terms);
    if (terms && terms.length === 0) {
      return Promise.reject("Terms & Condition list is Empty");
    }
    return Promise.resolve(terms);
  },
  isNotExisting: async (request) => {
    try {
      const data = await Terms.query().where({ title: request }).first();
      if (data) return Promise.reject(`${request} already exist!`);
      return Promise.resolve(true);
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  },
  addTerm: async (request, options = {}) => {
    //Validate title
    await TermsModel.isNotExisting(request.title);
    const data = await CrudModel.addRecord(request, Terms);
    return Promise.resolve(data);
  },
  deleteTerm: async (id, options = {}) => {
    try {
      const data = await CrudModel.deleteRecord(id, Terms);
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  updateTerm: async (id, request, options = {}) => {
    //Validate title
    await TermsModel.isNotExisting(request.title);
    const data = await CrudModel.updateRecord(id, request, Terms);
    return Promise.resolve(data);
  },
};

module.exports = TermsModel;
