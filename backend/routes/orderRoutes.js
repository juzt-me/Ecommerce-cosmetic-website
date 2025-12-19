const express = require('express');
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All order routes require authentication

router.route('/')
  .post(createOrder)
  .get(admin, getOrders);

router.get('/myorders', getMyOrders);

router.route('/:id')
  .get(getOrderById);

router.put('/:id/pay', updateOrderToPaid);
router.put('/:id/deliver', admin, updateOrderToDelivered);

module.exports = router;