const router = require("express").Router({ mergeParams: true });
const toda = require("./model");
const response = require("../../Common/Response/ResponseCodes");

router.get("/", async (req, res) => {
  try {
    const data = await toda.getTodas(req.query);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
module.exports = router;
