const { Register, Login } = require('../controllers/authController');
const { userVerification } = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.post('/', userVerification)
router.post('/register', Register)
router.post('/login', Login)

module.exports = router