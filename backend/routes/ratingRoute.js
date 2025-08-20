const express = require('express');
const { ratesubmitControl, rateupdateControl, rateUserControl } = require('../controllers/ratingControl');
const router = express.Router();
//4. Rating Routes /api/ratings/:storeId
router.get("/store-list/rate",rateUserControl)
router.post('/newrate',ratesubmitControl);
router.put('/updaterate',rateupdateControl);

module.exports = router;
