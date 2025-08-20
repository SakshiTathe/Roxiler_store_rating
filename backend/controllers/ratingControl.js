const responseHandler = require("../Helper/responseHandler.js");
const mysqlPool = require("../config/db.js");

const ratesubmitControl = async (req, res) => {
    const { storeid, userid, rate } = req.body;
    try {
        const sql = "INSERT INTO rating (store_id,user_id,rating_value) VALUES(?,?,?)";
        const [addrate] = await mysqlPool.query(sql, [storeid, userid, rate]);
        responseHandler.success(res, "Store names fetched", addrate);
    } catch (error) {
        responseHandler.error(res, "DB fetch error", error, 500);
    }
};
const rateupdateControl = async (req, res) => {
    const { storeid, userid, newrate } = req.body;
    try {
        const sql = "UPDATE rating SET rating_value=? WHERE store_id=? AND user_id=?";
        const [newrateis] = await mysqlPool.query(sql, [newrate, storeid, userid]);
        responseHandler.success(res, "Store names fetched", newrateis);
    } catch (error) {
        responseHandler.error(res, "DB fetch error", error, 500);
    }
};

const rateUserControl = async (req, res) => {
    try {
        const { userID } = req.query;
        const sql = `SELECT 
            s.store_id,ANY_VALUE(s.store_name) AS store_name,
    ANY_VALUE(s.address) AS address,
    AVG(r.rating_value) AS overall_rating,
    MAX(ur.rating_value) AS my_rating, -- or ANY_VALUE
    MAX(ur.user_id) AS user_id
            FROM stores s
            LEFT JOIN rating r ON s.store_id = r.store_id
            LEFT JOIN rating ur ON s.store_id = ur.store_id AND ur.user_id = ?
            GROUP BY s.store_id`;
        const [stores] = await mysqlPool.query(sql, [userID]);
        responseHandler.success(res, "Store names fetched", stores);
    } catch (error) {
        responseHandler.error(res, "DB fetch error", error, 500);
    }
};
module.exports = { ratesubmitControl, rateupdateControl, rateUserControl }