const router = require("express").Router({ mergeParams: true });
const model = require("./model");
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

router.put(
  "/:id",
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
          response.VALIDATION_UPDATE_FAILED,
          err.toString()
        );
      }
      next();
    });
  },
  mw.validateUsers,
  async (req, res) => {
    try {
      let value;
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
      const data = await model.updateUser(req.params.id, value);
      return res.success(200, response.UPDATE_RECORD_SUCCESS, data);
    } catch (e) {
      console.log("🚀 ~ file: route.js ~ line 115 ~ e", e);
      return res.error(400, response.VALIDATION_UPDATE_FAILED, e);
    }
  }
);

module.exports = router;
