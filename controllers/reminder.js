require('dotenv/config');

const ReminderModel = require('../models/reminder');

const ReminderController = {
    all: async (req, res) => {
        const allReminders = await ReminderModel.find({ user: req.params.id });

        allReminders.sort(function (a, b) {
            const keyA = a.expires;
            const keyB = b.expires;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });

        res.json(allReminders);
    },

    create: async (req, res) => {
        let newReminder = new ReminderModel(req.body);

        await newReminder.save();

        const allReminders = await ReminderModel.find({ user: req.body.user });

        allReminders.sort(function (a, b) {
            const keyA = a.expires;
            const keyB = b.expires;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });

        res.json(allReminders);
    },

    edit: async (req, res) => {
        const reminder = await ReminderModel.findById(req.params.id);

        if (!reminder) {
            res.status(404).json({
                errorMessage: 'Reminder not found.'
            });

            return;
        };

        reminder.title = req.body.title;
        reminder.body = req.body.body;
        reminder.expires = req.body.expires;

        await reminder.save();

        const allReminders = await ReminderModel.find({ user: req.params.id });

        allReminders.sort(function (a, b) {
            const keyA = a.expires;
            const keyB = b.expires;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });

        res.json(allReminders);
    },

    delete: async (req, res) => {
        await ReminderModel.findByIdAndRemove(req.params.id, async function (err) {
            if (!err) {
                const allReminders = await ReminderModel.find({ user: req.params.id });

                allReminders.sort(function (a, b) {
                    const keyA = a.expires;
                    const keyB = b.expires;
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });

                res.json(allReminders);

                return;
            };

            res.status(409).send(err);
        });
    },
};

module.exports = ReminderController;