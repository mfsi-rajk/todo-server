const express = require('express');
const UserController = require('../controllers/user.controller');
const verifyAuth = require('../middlewares/verifyAuth');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/authenticate', UserController.authenticate);
router.post('/logout', UserController.logOut);
router.get('/checkToken', verifyAuth, UserController.checkToken);
module.exports = router;
