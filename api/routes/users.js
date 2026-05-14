const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateBirthdate,
  updateAddress,
  updateProfilePicture,
} = require("../controllers/userController");

// GET ALL USERS — must be BEFORE /:id
router.get("/", getAllUsers);

// GET USER BY ID
router.get("/:id", getUser);

// UPDATE BIRTHDATE
router.put("/:id/birthdate", updateBirthdate);

// UPDATE ADDRESS
router.put("/:id/address", updateAddress);

// UPDATE PROFILE PICTURE
router.put("/:id/profile-picture", updateProfilePicture);

module.exports = router;
