const router = require("express").Router({ mergeParams: true });
const Admin = require("../Modules/Admin/route");
const Accounts = require("../Modules/Accounts/route");
const Chat = require("../Modules/Chat/route");
const TODA = require("../Modules/TODA/route");
const Driver = require("../Modules/Driver/route");
const Passenger = require("../Modules/Passenger/route");
const Booking = require("../Modules/Booking/route");
const Fees = require("../Modules/Fees/route");
const Users = require("../Modules/Users/route");
const Rating = require("../Modules/Rating/route");

router.use("/fees", Fees);
router.use("/booking", Booking);
router.use("/passengers", Passenger);
router.use("/drivers", Driver);
router.use("/admin", Admin);
router.use("/messages", Chat);
router.use("/toda", TODA);
router.use("/", Accounts);
router.use("/user", Users);
router.use("/rating", Rating);

module.exports = router;
