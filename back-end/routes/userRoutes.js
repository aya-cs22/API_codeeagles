const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authenticate')
const loginLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 15 minutes
    max: 2, // 10 requests only
    message: 'Too many login attempts, please try again later.'
});
//authentication
router.post('/register', userController.register);
router.post('/verify-Email', userController.verifyEmail);
router.post('/login', loginLimiter, userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

//feedback
router.post('/submit-feedback', authMiddleware, userController.submitFeedback);
router.get('/get-all-feedback', userController.getAllFeedback);
router.delete('/:userId/feedback', authMiddleware, userController.deleteFeedback);

router.post('/add-allowed-emails', authMiddleware, userController.addAllowedEmails);
router.get('/get-allowed-emails/:groupId', authMiddleware, userController.getAllowedEmails);
router.put('/update-allowed-emails', authMiddleware, userController.updateAllowedEmails);
router.delete('/remove-allowed-email', authMiddleware, userController.removeAllowedEmail);


router.get('/pending-users', authMiddleware, userController.getPendingUsers);
router.post('/adduser', authMiddleware, userController.addUser);
router.get('/', authMiddleware, userController.getUserByhimself);
router.get('/all-users', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserByid);

router.put('/', authMiddleware, userController.updateUser);
router.put('/:id', authMiddleware, userController.updateUserRole);

router.delete('/:id?', authMiddleware, userController.deleteUser);


//join group
router.post('/joinGroupRequest', authMiddleware, userController.joinGroupRequest);
router.get('/pending-join-requests/:groupId', authMiddleware, userController.getPendingJoinRequestsByGroup);

router.post('/accept-join-request', authMiddleware, userController.acceptJoinRequest);
router.put('/update-join-request/:groupId/:userId', authMiddleware, userController.updateJoinRequestStatus);

router.post('/reject-join-request', authMiddleware, userController.rejectJoinRequest);




module.exports = router; 