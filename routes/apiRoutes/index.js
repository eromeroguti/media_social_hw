const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Thought = require('../../models/Thought');
// const Reaction = require('../../models/Reaction');

router.get('/users', async (req, res) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        res.json(err);
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        res.json(user);
    } catch (err) {
        res.json(err);
    }
});

router.post('/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;