const router = require("express").Router({ mergeParams: true });
const model = require("./model");
const response = require("../../Common/Response/ResponseCodes");
const mw = require("../../Common/middlewares");

router.post("/", mw.validateCreate, async (req, res) => {
  try {
    const data = await model.createMessage(req.body);
    return res.success(200, response.MESSAGE_SENT, data);
  } catch (e) {
    return res.error(400, response.MESSAGE_SENT_FAILED, e);
  }
});
router.get("/receiver/:receiver", async (req, res) => {
  try {
    const data = await model.getAllMessageReceiver(req.params.receiver);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.get("/sender/:sender", async (req, res) => {
  try {
    const data = await model.getAllMessageSender(req.params.sender);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const data = await model.deleteMessagesByID(req.params.id);
    return res.success(200, response.DELETE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.CONTENT_NOT_FOUND, e);
  }
});
module.exports = router;
