const router = require("express").Router({ mergeParams: true });
const model = require("../Users/model");
const response = require("../../Common/Response/ResponseCodes");
const mw = require("../../Common/middlewares");
const multer = require("multer");
const path = require("path");
const cloudinary = require("../../Common/cloudinary");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Only .jpg, .jpeg, .png format are allowed!", false);
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../resources/static/assets/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploader = multer({ storage: storage, fileFilter: imageFilter });

router.get("/email", async (req, res) => {
  try {
    const data = await model.isNotExisting(req.body);
    return res.success(200, response.RETRIEVE_RECORD, data);
  } catch (e) {
    return res.error(400, response.EMAIL_ALREADY_TAKEN, e);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const data = await model.getUsersID(req.params.id);
    return res.success(200, response.RETRIEVE_RECORD, data);
  } catch (e) {
    return res.error(400, response.RECORD_NOT_FOUND, e);
  }
});
router.put("/logout/:id", async (req, res) => {
  try {
    const data = await model.logoutUser(req.params.id);
    return res.success(200, response.LOGOUT_SUCCESSFUL, data);
  } catch (e) {
    return res.error(400, response.LOGOUT_FAILED, e);
  }
});
router.post("/login", mw.validateLogin, async (req, res) => {
  try {
    const data = await model.loginUsers(req.body);
    req.session.email = req.body.email;
    return res.success(200, response.LOGIN_SUCCESSFUL, data);
  } catch (e) {
    return res.error(400, response.LOGIN_FAILED, e);
  }
});
router.post(
  "/register",
  async (req, res, next) => {
    uploader.fields([
      { name: "profile", maxCount: 1 },
      { name: "licence_pic", maxCount: 1 },
      { name: "franchise_pic", maxCount: 1 },
      { name: "registration_pic", maxCount: 1 },
      { name: "tric_pic", maxCount: 1 },
    ])(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        const message = err.message + " " + err.field;
        return res.error(400, response.INVALID_PARAMETER, message);
      } else if (err) {
        return res.error(
          400,
          response.VALIDATION_CREATE_FAILED,
          err.toString()
        );
      }
      next();
    });
  },
  mw.validateRegistration,
  async (req, res) => {
    try {
      let value;
      await model.isNotExisting(req.body);
      const profile = await cloudinary.uploader.upload(
        req.files.profile[0].path,
        {
          folder: "profile",
        },
        (err, result) => {
          return result;
        }
      );
      if (req.body.roleID === "2") {
        const licence_pic = await cloudinary.uploader.upload(
          req.files.licence_pic[0].path,
          {
            folder: "license",
          },
          (err, result) => {
            return result;
          }
        );
        const franchise_pic = await cloudinary.uploader.upload(
          req.files.franchise_pic[0].path,
          {
            folder: "franchise",
          },
          (err, result) => {
            return result;
          }
        );
        const registration_pic = await cloudinary.uploader.upload(
          req.files.registration_pic[0].path,
          {
            folder: "registration",
          },
          (err, result) => {
            return result;
          }
        );
        const tric_pic = await cloudinary.uploader.upload(
          req.files.tric_pic[0].path,
          {
            folder: "tricycle",
          },
          (err, result) => {
            return result;
          }
        );
        value = {
          profile: profile.secure_url,
          licence_pic: licence_pic.secure_url,
          franchise_pic: franchise_pic.secure_url,
          registration_pic: registration_pic.secure_url,
          tric_pic: tric_pic.secure_url,
          ...req.body,
        };
      } else {
        value = {
          profile: profile.secure_url,
          ...req.body,
        };
      }
      const data = await model.registration(value);
      return res.success(200, response.REGISTRATION_SUCCESS, data);
    } catch (e) {
      return res.error(400, response.REGISTRATION_FAILED, e);
    }
  }
);

router.post("/register/set_password/otp/:id", async (req, res) => {
  try {
    const data = await model.checkOTP(req.params.id, req.body);
    return res.success(200, response.CORRECT_OTP, data);
  } catch (e) {
    return res.error(400, response.INVALID_OTP, e);
  }
});
router.put(
  "/register/set_password/:id",
  mw.validatePassword,
  async (req, res) => {
    try {
      const data = await model.setPassword(req.params.id, req.body);
      return res.success(200, response.PASSWORD_SET, data);
    } catch (e) {
      return res.error(400, response.PASSWORD_ALREADY_TAKEN, e);
    }
  }
);
router.post(
  "/login/forgot_password",
  mw.validateForgotPassword,
  async (req, res) => {
    try {
      const data = await model.forgotPassword(req.body);
      return res.success(200, "Naipadala na ang pin sa iyong email!", data);
    } catch (e) {
      return res.error(400, response.LINK_WAS_NOT_SENT, e);
    }
  }
);
router.put(
  "/login/password-reset/:id",
  mw.validatePassword,
  async (req, res) => {
    try {
      const data = await model.setPassword(req.params.id, req.body);
      return res.success(200, response.PASSWORD_SET, data);
    } catch (e) {
      return res.error(400, response.PASSWORD_ALREADY_TAKEN, e);
    }
  }
);
module.exports = router;
