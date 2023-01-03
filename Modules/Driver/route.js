const router = require("express").Router({ mergeParams: true });
const driver = require("./model");
const response = require("../../Common/Response/ResponseCodes");

router.get("/", async (req, res) => {
  try {
    const data = await driver.getDrivers(req.query);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const data = await driver.getByID(req.params.id);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const data = await driver.updateLocation(req.params.id, req.body);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
router.put("/status/:id", async (req, res) => {
  try {
    const data = await driver.updateMyStatus(req.params.id);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
module.exports = router;
