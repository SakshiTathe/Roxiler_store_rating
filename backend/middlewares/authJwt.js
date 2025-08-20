const JWT = require('jsonwebtoken');
const {verify}=require('jsonwebtoken')
const responseHandler = require('../Helper/responseHandler');
const { secret } = require('../config/auth');
const mysqlPool = require("../config/db.js");

//Protected Routes token base

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return responseHandler.error(res, "No token provided", 401);
        }
        const token = authHeader.split(" ")[1];
        if (!token) return responseHandler.error(res, "No token provided", 401);
        const decoded = JWT.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
    }
};

//admin acceess
const isAdmin = async (req, res, next) => {
    try {
        console.log("req.user:", req.user); 
        const sql = "SELECT user_id, role FROM user WHERE user_id = ?";
        const [results] = await mysqlPool.query(sql, [req.user.user_id]);
        if (!results[0]) return responseHandler.error(res, "User not found", 404);
        const user = results[0];
        if (user.role !== "admin") return responseHandler.error(res, "This is not Admin", 403);
        next();
    } catch (err) {
        responseHandler.error(res, "UnAuthorized Access", 500);
    }
};

const isNormalUser = async (req, res, next) => {
    try {
        const sql = " SELECT user_id,role FROM user WHERE user_id=?";
        const [results] = await mysqlPool.query(sql, [req.user.user_id]);
        if (!results[0]) return responseHandler.error(res, "User not found", 404);
        const user = results[0];
        if (user.role !== "normal_user") return responseHandler.error(res, "This is not User", 403);
        next();
    } catch (err) {
        responseHandler.error(res, "UnAuthorized Access", 500);
    }

};
const isStoreOwner = async (req, res, next) => {
    try {
        const sql = " SELECT user_id,role FROM user WHERE user_id=?";
        const [results] = await mysqlPool.query(sql, [req.user.user_id]);
        if (!results[0]) return responseHandler.error(res, "User not found", 404);
        const user = results[0];
        if (user.role !== "store_owner") return responseHandler.error(res, "This is Not Owner", 403);
        next();
    } catch (error) {
        console.log(error);
        responseHandler.error(res, "Error in Owner middleware", 500);
    }
};
module.exports = { verifyToken, isAdmin, isNormalUser, isStoreOwner }