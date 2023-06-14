const express = require('express');
const router = express.Router();
const { User, Thought } = require('../../models');

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch {
        res.status(500).json(err);

    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts');
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);

    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);

    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);

    }
});

router.post('/users', async (req, res) => {
    try {
        const user = await User.findById(req.body);
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        const friend = await User.findById(req.body.friendId);
        if (!friend) {
            res.status(404).json({ message: 'No friend found with this id!' });
            return;
        }
        user.friends.push(friend);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json(err);

    }
});

router.delete('/users/:id/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        const friend = await User.findById(req.params.friendId);
        if (!friend) {
            res.status(404).json({ message: 'No friend found with this id!' });
            return;
        }
        user.friends.pull(friend);
        await user.save();
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;