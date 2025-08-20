
module.exports = {
    success: (res, message, data = {}) => {
        res.status(200).json({ status: "success",success: true, message, data });
    },
    error: (res, message, error=null, code = 500) => {
        res.status(code).json({ status: "error", message });
    },
    ok: (res,message = "Success") => {
    return res.status(200).json({ok: true,message});
    },
};
