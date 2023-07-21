const { Register, Login } = require('../controllers/authController');
const { userVerification } = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.post('/api', userVerification)
router.post('/api/register', Register)
router.post('/api/login', Login)

module.exports = router