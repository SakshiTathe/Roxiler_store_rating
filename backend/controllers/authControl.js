const responseHandler = require("../Helper/responseHandler.js");
const { ValidateAddress, ValidateEmail, ValidateName, ValidatePassword,
} = require("../middlewares/validations.js");
const mysqlPool = require("../config/db.js");
const { secret } = require("../config/auth.js");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        //validations
        if (!ValidateName(name))
            return responseHandler.error(
                res, "Name must be between 20 and 60 characters", 400);
        if (!ValidateEmail(email))
            return responseHandler.error(res, "Invalid email", 400);
        const validationError = ValidatePassword(password);
        if (validationError)
            return responseHandler.error(res, validationError, 400);

        if (!ValidateAddress(address))
            return responseHandler.error(res, "Invalid address", 400);
        //check user
        const sql = "INSERT INTO user (name, email, password, address,role) VALUES(?,?,?,?,?)";
        const values = [name, email, password, address, "normal_user"];
        try {
            const [result] = await mysqlPool.query(sql, values);
            responseHandler.success(res, "User registered successfully", {
                user_id: result.insertId,
                name,
                email,
                address,
                role: "normal_user",
            });
        } catch (err) {
            return responseHandler.error(res, "DB insert error", err, 500);
        }
    } catch (error) {
        responseHandler.error(res, "Error in registration", error, 500);
    }
};
//POST LOGIN
const loginController = async (req, res) => {
    console.log("check")
    const { email, password } = req.body;
    console.log("em",email,password);
    try {
        console.log(!email || !password)
        if (!email || !password) {
            return responseHandler.error(res, "Invalid email or password", 404);
        }
        const sql = "SELECT * FROM user WHERE email = ?";
        const values = [email];
        try {
            const [result] = await mysqlPool.query(sql, values);
            if (result.length === 0)
                    return responseHandler.error(res, "User not found", 404);
                const user = result[0];
                if (user.password !== password) {
                    return responseHandler.error(res, "Invalid password", 401);
                }
                const token = JWT.sign(
                    { user_id: user.user_id, role: user.role },
                    secret,
                    { expiresIn: "7d" }
                );
                responseHandler.success(res, "login successfully", {
                    id: user.user_id,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    role: user.role,
                    token
                });
        } catch (err) {
            return responseHandler.error(res, "DB error", err, 500);
        }
    } catch (error) {
        responseHandler.error(res, "Error in login", error, 500);
    }
};

const changePasswordController = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Email is required" });
        }
        const validationError = ValidatePassword(newPassword);
        if (validationError)
            return responseHandler.error(res, validationError, 400);
        
        const sql="UPDATE user SET password = ? WHERE email = ?";
        const values=[newPassword, email]
        try {
            const [result]=await mysqlPool.query(sql,values);
            console.log(" already exists.");
            responseHandler.success(res, "Password changed Successfully", {
                    email,
                    role: "normal_user",
                });
        } catch (error) {
            return responseHandler.error(res, "wrong Email", err, 500);
        }
    } catch (error) {
        responseHandler.error(res, "Something went wrong", error);
    }
};

module.exports = { registerController, loginController, changePasswordController }

/*mysqlPool.query(querys,values, 
    (err, result) => { 
        if (err) return responseHandler.error(res, "DB insert error", err, 500); 
        responseHandler.success(res, "User registered successfully",
        { user_id: result.insertId, name, email, address, role: "normal_user", 
        }); 
    } 
); */