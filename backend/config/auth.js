module.exports = {
    secret: process.env.SECRET_KEY,
    jwtExpiration: parseInt(process.env.JWT_EXPIRATION) || 3600,
};
