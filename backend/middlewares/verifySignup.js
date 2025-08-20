const responseHandler =require("../Helper/responseHandler")
const mysqlPool= require ("../config/db")

const CheckDuplicateEmail = async(req, res, next) => {
    try {
        const [results] = await mysqlPool.query(
            "SELECT * FROM user WHERE email = ?",
            [req.body.email]
        );
        if (results.length > 0) {
            return responseHandler.error(res, "Email already exists!", 400);
        }
        next();
    } catch (err) {
        return responseHandler.error(res, "Server error", 500);
    }
};
module.exports= { CheckDuplicateEmail };
 