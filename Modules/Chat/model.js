const MessageDB = require("./db");
const UserDB = require("../Users/db");
const CrudModel = require("../CRUD/model");

const ChatController = {
  createMessage: async (req, options = {}) => {
    try {
      const payload = {
        ...req,
        createdAt: new Date().toISOString(),
      };
      const data = await CrudModel.addRecord(payload, MessageDB);
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  getAllMessageReceiver: async (receiver, options = {}) => {
    const userMessages = await UserDB.query()
      .innerJoin("messages", "messages.receiverID", "users.id")
      .select({
        fname: "users.fname",
        lname: "users.lname",
        id: "users.id",
        receiverID: "messages.receiverID",
        senderID: "messages.senderID",
        messages: "messages.messages",
      })
      .orderBy("createdAt", "desc")
      .where({ receiverID: receiver });
    return Promise.resolve(userMessages);
  },
  getAllMessageSender: async (sender, options = {}) => {
    const userMessages = await UserDB.query()
      .innerJoin("messages", "messages.senderID", "users.id")
      .select({
        fname: "users.fname",
        lname: "users.lname",
        id: "users.id",
        receiverID: "messages.receiverID",
        senderID: "messages.senderID",
        messages: "messages.messages",
      })
      .orderBy("createdAt", "desc")
      .where({ senderID: sender });
    return Promise.resolve(userMessages);
  },
  deleteMessagesByID: async (id, options = {}) => {
    try {
      const data = await CrudModel.deleteRecord(id, MessageDB);
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
module.exports = ChatController;
