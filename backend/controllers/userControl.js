const responseHandler = require("../Helper/responseHandler.js");
const { ValidateAddress, ValidateEmail, ValidateName, ValidatePassword,
} = require("../middlewares/validations.js");
const mysqlPool = require("../config/db.js");

const adduserController = async (req, res) => {
    try {
        const { name, email, password, address,role } = req.body;
      
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
        const values = [name, email, password, address, role];
        try {
            const [result] = await mysqlPool.query(sql, values);
            responseHandler.success(res, "User registered successfully", {
                user_id: result.insertId,
                name,
                email,
                address,
                role,
            });
        } catch (err) {
            return responseHandler.error(res, "DB insert error", err, 500);
        }
    } catch (error) {
        responseHandler.error(res, "Error in registration", error, 500);
    }
};

const addstoreController = async (req, res) => {
    try {
        const { store_name, store_address, owner_id} = req.body;
     
        if (!ValidateName(store_name))
            return responseHandler.error(
                res, "Name must be between 20 and 60 characters", 400);
        if (!ValidateAddress(store_address))
            return responseHandler.error(res, "Invalid address", 400);
     
        const sql = "INSERT INTO stores (store_name,address,owner_id) VALUES(?,?,?)";
        const values = [store_name, store_address, owner_id];
        try {
            const [result] = await mysqlPool.query(sql, values);
            responseHandler.success(res, "User registered successfully", {
                store_id: result.insertId,
                store_name,
                store_address,
                owner_id
            });
        } catch (err) {
            return responseHandler.error(res, "DB insert error", err, 500);
        }
    } catch (error) {
        responseHandler.error(res, "Error in store Adding", error, 500);
    }
};
module.exports={adduserController,addstoreController}
