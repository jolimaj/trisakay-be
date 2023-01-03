const router = require("express").Router({ mergeParams: true });
const booking = require("./model");
const response = require("../../Common/Response/ResponseCodes");
const mw = require("../../Common/middlewares");

router.get("/history/driver/:id", async (req, res) => {
  try {
    const data = await booking.getBookingHistoryDriver(req.params.id);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.get("/history/passenger/:id", async (req, res) => {
  try {
    const data = await booking.getBookingHistoryPassenger(req.params.id);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.put("/accept/:id", async (req, res) => {
  try {
    const data = await booking.acceptPassenger(req.params.id, req.body);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
router.put("/reject/:id", async (req, res) => {
  try {
    const data = await booking.rejectPassenger(req.params.id, req.body);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
router.put("/cancell/:id", async (req, res) => {
  try {
    const data = await booking.cancellPassenger(req.params.id, req.body);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
router.get("/current/:id", async (req, res) => {
  try {
    const data = await booking.currentBookPassenger(req.params.id);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.get("/currentDriver/:id", async (req, res) => {
  try {
    const data = await booking.currentBookDriver(req.params.id);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.get("/myCurrent/:id", async (req, res) => {
  try {
    const data = await booking.myCurrentPassenger(req.params.id);
    return res.success(200, response.RETRIEVE_RECORD_LIST, data);
  } catch (e) {
    return res.error(400, response.EMPTY_RECORD_LIST, e);
  }
});
router.put("/done/:id", async (req, res) => {
  try {
    const data = await booking.donePassenger(req.params.id, req.body);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
router.put("/end/:id", async (req, res) => {
  try {
    const data = await booking.endPassenger(req.params.id, req.body);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
router.put("/pickup/:id", async (req, res) => {
  try {
    const data = await booking.pickupPassenger(req.params.id, req.body);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
router.get("/pickup/:id", async (req, res) => {
  try {
    const data = await booking.currentPickBookPassenger(req.params.id);
    return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
router.post("/", mw.validateBooking, async (req, res) => {
  try {
    const data = await booking.bookCar(req.body);
    return res.success(200, response.CREATE_RECORD_SUCCESS, data);
  } catch (e) {
    return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
  }
});
module.exports = router;
