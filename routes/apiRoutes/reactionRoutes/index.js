const express = require('express');
const router = express.Router();
const { Thought, Reaction } = require('../../models');

// get all reactions
router.get('/', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id).populate('reactions');
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        const reaction = await Reaction.create(req.body);
        thought.reactions.push(reaction);
        await thought.save();
        res.json(reaction);
    } catch (err) {
        res.status(500).json(err);
    }

});

// delete reaction from thought
router.delete('/:id/reactions/:reactionId', async (req, res) => {
    try {
        const reaction = await Reaction.findByIdAndDelete(req.params.reactionId);
        if (!reaction) {
            return res.status(404).json({ message: 'No reaction found with this id!' });
        }
        const thought = await Thought.findById(req.params.id).populate('reactions');
        thought.reactions.pull(reaction);
        await thought.save();
        res.json('reaction deleted');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;