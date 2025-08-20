const responseHandler = require("../Helper/responseHandler.js");
const mysqlPool = require("../config/db.js");

const storeController = async (req, res) => {
    try {
        const sql = "SELECT store_id,store_name,address,owner_id FROM stores";
        const [store] = await mysqlPool.query(sql);
        responseHandler.success(res, "Store names fetched", store);
    } catch (error) {
        responseHandler.error(res, "DB fetch error", error, 500);
    }
};
const adminController = async (req, res) => {
    try {
        const sql = "SELECT user_id,name,email,address,role FROM user WHERE role=?";
        const [user] = await mysqlPool.query(sql,['admin']);
        responseHandler.success(res, "Store names fetched", user);
    } catch (error) {
        responseHandler.error(res, "DB fetch error", error, 500);
    }
};
const userController = async (req, res) => {
    try {
        const sql = "SELECT user_id,name,email,address,role FROM user WHERE role=?";
        const [user] = await mysqlPool.query(sql,['normal_user']);
        responseHandler.success(res, "Store names fetched", user);
    } catch (error) {
        responseHandler.error(res, "DB fetch error", error, 500);
    }
};

const ownergetController = async (req, res) => {
    try {
        console.log("Query executed1");
        const sql = "SELECT user_id,name FROM user WHERE role= ?";
        const [storeOwners] = await mysqlPool.query(sql, ['store_owner']);
        console.log(storeOwners)
        responseHandler.success(res, "Store names fetched", storeOwners);
    } catch (error) {
        responseHandler.error(res, "DB fetch error", error, 500);
    }
};
const getStatController = async (req, res) => {
    try {
        console.log("Query executed1");
        const sql = "SELECT COUNT(*) FROM user ";
        const sql1 = "SELECT COUNT(*) FROM user WHERE role=? ";
        const sql2 = "SELECT COUNT(*) FROM user WHERE role=?";
        const sql3 = "SELECT COUNT(*) FROM user WHERE role=?"
        const sql4 = "SELECT COUNT(*) FROM stores"
        const sql5 = "SELECT COUNT(*) FROM rating"

        const [allusers] = await mysqlPool.query(sql);
        const [allowner] = await mysqlPool.query(sql1, ['store_owner']);
        const [alladmin] = await mysqlPool.query(sql2, ['admin']);
        const [allnormal] = await mysqlPool.query(sql3, ['normal_user']);
        const [allstores] = await mysqlPool.query(sql4);
        const [allratings] = await mysqlPool.query(sql5);

        const stats = {
            alluser: allusers[0]["COUNT(*)"],
            owner: allowner[0]["COUNT(*)"],
            admin: alladmin[0]["COUNT(*)"],
            normal: allnormal[0]["COUNT(*)"],
            store: allstores[0]["COUNT(*)"],
            rate: allratings[0]["COUNT(*)"]
        };
        responseHandler.success(res, "Store names fetched", stats);
    } catch (error) {
        responseHandler.error(res, "DB fetch error", error, 500);
    }
};


module.exports = { userController, storeController,getStatController, ownergetController,adminController }
