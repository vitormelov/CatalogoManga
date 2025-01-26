const express = require('express');
const { addToCollection, addToWishlist } = require('../controllers/collectionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/collection', protect, addToCollection);
router.post('/wishlist', protect, addToWishlist);

module.exports = router;
