const express = require('express');
const { ownersStore, ownerstorController } = require('../controllers/storeControl');
const { rateUserControl } = require('../controllers/ratingControl');
const router = express.Router();

//3. Store Management Routes /api/stores
router.get('/store-list',ownersStore); 
router.get('/store-rate',ownerstorController)
module.exports = router;