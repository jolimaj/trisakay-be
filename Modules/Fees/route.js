const router = require("express").Router({ mergeParams: true });
const fees = require("./model");
const response = require("../../Common/Response/ResponseCodes");

router.get("/", async (req, res) => {
  try {
    const data = await fees.getFee(req.query);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
module.exports = router;
