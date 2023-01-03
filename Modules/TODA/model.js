const Todas = require("./db");
const CrudModel = require("../CRUD/model");

const TodaModel = {
  getTodas: async (options = {}) => {
    const todas = await CrudModel.getAll(Todas);
    if (todas && todas.length === 0) {
      return Promise.reject("Toda list is Empty");
    }
    return Promise.resolve(todas);
  },
  isNotExisting: async (request) => {
    try {
      const data = await Todas.query().where({ code: request }).first();
      if (data) return Promise.reject(`${request} already exist!`);
      return Promise.resolve(true);
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  },
  addToda: async (request, options = {}) => {
    //Validate title
    await TodaModel.isNotExisting(request.code);
    const data = await CrudModel.addRecord(request, Todas);
    return Promise.resolve(data);
  },
  deleteToda: async (id, options = {}) => {
    try {
      const data = await CrudModel.deleteRecord(id, Todas);
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  updateToda: async (id, request, options = {}) => {
    //Validate title
    const data = await CrudModel.updateRecord(id, request, Todas);
    return Promise.resolve(data);
  },
};

module.exports = TodaModel;
