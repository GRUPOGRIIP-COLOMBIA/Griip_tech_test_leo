const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const UserControls = require('../controllers/user');
const ReminderControls = require('../controllers/reminder');

//user
router.get('/allUsers', UserControls.all);

router.get('/user/:id', UserControls.find);

router.get('/logout', UserControls.logout);

router.post('/newUser', UserControls.create);

router.post('/login', UserControls.login);

router.post('/updatePassword/:id', auth, UserControls.updatePassword);

router.post('/newPassword', UserControls.newPassword);

//reminder
router.get('/userReminders/:id', auth, ReminderControls.all);

router.post('/newReminder', auth, ReminderControls.create);

router.put('/updateReminder/:id', auth, ReminderControls.edit);

router.delete('/deleteReminder/:id', auth, ReminderControls.delete);

module.exports = router;