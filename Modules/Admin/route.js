const router = require("express").Router({ mergeParams: true });
const user = require("../Users/model");
const term = require("../Terms/model");
const TermsAccept = require("../TermsAccept/model");
const toda = require("../TODA/model");
const fees = require("../Fees/model");
const response = require("../../Common/Response/ResponseCodes");
const mw = require("../../Common/middlewares");
const RatingModel = require("../Rating/model");

router.get("/user/:roleID", async (req, res) => {
  try {
    const data = await user.getUsers(req.params.roleID);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.get("/user", async (req, res) => {
  try {
    const data = await user.getUsersPending(req.query);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.post("/user/add", mw.validateUsers, async (req, res) => {
  try {
    const data = await user.addUser(req.body);
    return res.success(200, response.CREATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_CREATE_FAILED, e);
  }
});

router.put("/user/approve/:id", async (req, res) => {
  try {
    const data = await user.approveUser(req.params.id);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
router.put("/user/reject/:id", async (req, res) => {
  try {
    const data = await user.deactivateUser(req.params.id);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
router.get("/toda", async (req, res) => {
  try {
    const data = await toda.getTodas(req.query);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.post("/toda/add", mw.validateTodas, async (req, res) => {
  try {
    const data = await toda.addToda(req.body);
    return res.success(200, response.CREATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_CREATE_FAILED, e);
  }
});
router.delete("/toda/delete/:id", async (req, res) => {
  try {
    const data = await toda.deleteToda(req.params.id);
    return res.success(200, response.DELETE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.CONTENT_NOT_FOUND, e);
  }
});
router.put("/toda/update/:id", mw.validateTodas, async (req, res) => {
  try {
    const data = await toda.updateToda(req.params.id, req.body);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
router.get("/terms", async (req, res) => {
  try {
    const data = await term.getTerms(req.query);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.post("/terms/add", mw.validateTerms, async (req, res) => {
  try {
    const data = await term.addTerm(req.body);
    return res.success(200, response.CREATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_CREATE_FAILED, e);
  }
});
router.delete("/terms/delete/:id", async (req, res) => {
  try {
    const data = await term.deleteTerm(req.params.id);
    return res.success(200, response.DELETE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.CONTENT_NOT_FOUND, e);
  }
});
router.put("/terms/update/:id", mw.validateTerms, async (req, res) => {
  try {
    const data = await term.updateTerm(req.params.id, req.body);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});

router.put("/fees/:id", async (req, res) => {
  try {
    const data = await fees.updateFees(req.params.id, req.body);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});

router.get("/fees", async (req, res) => {
  try {
    const data = await fees.getFee(req.query);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.get("/terms/accepted/:userID", async (req, res) => {
  try {
    const data = await TermsAccept.getTerms(req.params.userID);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.put("/terms/accepted/:userID", async (req, res) => {
  try {
    const data = await TermsAccept.updateAcceptance(req.params.userID);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
router.get("/rating", async (req, res) => {
  try {
    const data = await RatingModel.getRating(req.query);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
module.exports = router;
