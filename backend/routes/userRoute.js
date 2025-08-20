const express = require('express');
const { adduserController, addstoreController } = require('../controllers/userControl');
const { userController, storeController, ownergetController, getStatController, adminController } = require('../controllers/getinfoControl');
const router = express.Router();
//2. User Management Routes (Admin only) /api/admin/users
router.post('/users',adduserController);
router.post('/stores', addstoreController);
router.get('/getowners',ownergetController)
router.get('/getstat',getStatController)

router.get('/dashboard/normal_users',userController);
router.get('/dashboard/admin_users',adminController);
router.get('/dashboard/store_users',ownergetController);
router.get('/dashboard/stores',storeController);

module.exports = router;