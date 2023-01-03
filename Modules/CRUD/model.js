const response = require("../../Common/Response/ResponseCodes");

const Model = {
  getAll: async (table, options = {}) => {
    try {
      const data = await table.query().where(options);
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  addRecord: async (request, table, options = {}) => {
    try {
      const insertRecord = await table.query().insert(request).returning("*");
      return Promise.resolve(insertRecord);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  updateRecord: async (id, request,table) => {
    try {
      const data = await table.query().where({ id: id });
      if (data.length === 0) {
        return Promise.reject(response.RECORD_NOT_FOUND);
      } else {
        const updates=await table.query().where({ id: id }).update(request).returning("*");
        return Promise.resolve(updates)
      }
    } catch (e) {
      return Promise.reject(e);
    }
  },
  deleteRecord: async (id,table, options = {}) => {
    try {
      const terms = await table.query().where({ id: id });
      if (terms.length === 0) {
        return Promise.reject(response.RECORD_NOT_FOUND);
      } else {
        const deletes = await table.query().where({ id: id }).delete();
        return Promise.resolve(deletes);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  },
};

module.exports = Model;
