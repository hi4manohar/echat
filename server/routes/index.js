var express = require('express');
var router = express.Router();

const c = require('../controllers/handler')

const authController = require('../controllers/auth')

/* Health check endpoint */
router.get('/health', c(_ => { return true; }));

/** Auth */
router.post('/auth/register', c(authController.register, (req) => []))
router.post('/auth/login', c(authController.login, (req) => []))

module.exports = router;
