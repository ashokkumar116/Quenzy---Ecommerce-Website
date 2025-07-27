const express = require('express');
const adminAuth = require('../Middlewares/adminAuth');
const { getUserCount, getProductCount, getSellerCount, getCategoriesData, getDashboardStats, getRecentOrders, getRecentReviews, getLowStockProducts, getOrderChartData, getRevenueChartData, getTopSellingProducts } = require('../Controllers/dashboardControllers');
const router = express.Router();

router.get('/getusercount',adminAuth,getUserCount);
router.get('/getproductcount', adminAuth,getProductCount);
router.get('/getsellerscount',adminAuth,getSellerCount);
router.get('/categoriesdata',adminAuth,getCategoriesData);
router.get('/stats',adminAuth, getDashboardStats);
router.get('/recent-orders',adminAuth, getRecentOrders);
// router.get('/recent-reviews', getRecentReviews);
router.get('/low-stock',adminAuth, getLowStockProducts);
router.get('/order-chart',adminAuth, getOrderChartData);
router.get('/revenue-chart',adminAuth, getRevenueChartData);
router.get('/top-products',adminAuth, getTopSellingProducts);





module.exports = router;