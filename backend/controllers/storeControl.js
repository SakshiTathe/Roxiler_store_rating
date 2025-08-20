const responseHandler = require("../Helper/responseHandler.js");
const mysqlPool = require("../config/db.js");

const ownersStore = async (req, res) => {
    const {storeOwnerId} = req.query;
    try {
        const sql = "SELECT store_id,store_name,address,owner_id FROM stores WHERE owner_id= ?";
        const [store] = await mysqlPool.query(sql,storeOwnerId);
        responseHandler.success(res, "Store names fetched", store);
    } catch (error) {
        responseHandler.error(res, "DB fetch error", error, 500);
    }
};

const ownerstorController = async (req, res) => {
    const storeID = req.query.storeID;
    try {
        const sql = `SELECT u.name AS user_name, r.rating_value,u.email AS user_email
                    FROM rating r
                    JOIN user u ON r.user_id=u.user_id
                    WHERE r.store_id = ?;
            `;
        const sql2 = `SELECT AVG(r.rating_value) AS average_rate
                    FROM rating r
                    JOIN user u ON r.user_id=u.user_id
                    WHERE r.store_id = ?`;
        const [rows] = await mysqlPool.query(sql, [storeID]);
        const [averages] = await mysqlPool.query(sql2, [storeID]);
        if (rows.length === 0) {
            return responseHandler.success(res, "No ratings found for this store owner", {
                rows: [],
                average: averages[0]?.average_rate || null
            });
        }
        return responseHandler.success(res, "Ratings fetched successfully", {rows,average:averages[0]?.average_rate || null });
    } catch (error) {
        responseHandler.error(res, "Error fetching ratings", error, 500);
    }
};

module.exports={ownersStore,ownerstorController}
