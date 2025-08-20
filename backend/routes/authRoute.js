const express = require('express');
const { registerController, loginController, changePasswordController } = require('../controllers/authControl');
const { CheckDuplicateEmail } = require('../middlewares/verifySignup');
const { isAdmin, verifyToken, isStoreOwner, isNormalUser }= require("../middlewares/authJwt");
const responseHandler = require('../Helper/responseHandler');
const router = express.Router();
//1. Auth Routes /api/auth/signup

router.post('/signup',CheckDuplicateEmail,registerController)
router.post('/login',loginController );
router.put('/update-password',changePasswordController)
router.get("/admin-auth",verifyToken,isAdmin,   (req, res) => responseHandler.ok(res,{ message: "Admin access granted" }));
router.get("/owner-auth",verifyToken,isStoreOwner, (req, res)=> responseHandler.ok(res,{ message: "owner access granted" }));
router.get("/private-auth",verifyToken,isNormalUser, (req, res)=> responseHandler.ok(res,{ message: "user access granted" }));

module.exports = router;
