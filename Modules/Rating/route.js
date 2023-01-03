const router = require("express").Router({ mergeParams: true });
const model = require("./model");
const response = require("../../Common/Response/ResponseCodes");

router.get("/:driver", async (req, res) => {
  try {
    const data = await model.getRatingByID(req.params.driver);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.post("/", async (req, res) => {
  try {
    const data = await model.addRating(req.query.body);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const data = await model.updateRating(req.params.id, req.body);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
module.exports = router;
