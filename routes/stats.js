const {
  getStats,
  getLabels,
  getProperties,
  getObjects,
  getTexts,
  getPhotoScore,
  getFaces,
  getExif,
} = require("../controllers/statsController.js");
const express = require("express");
const router = express.Router();

// express router method to create route for getting all users
router.route("/").get(getStats);
router.route("/exif").post(getExif);

router.route("/labels").post(getLabels);
router.route("/properties").post(getProperties);
router.route("/objects").post(getObjects);
router.route("/texts").post(getTexts);
router.route("/photo-score").post(getPhotoScore);
router.route("/faces").post(getFaces);

module.exports = router;
