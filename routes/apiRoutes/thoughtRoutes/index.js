const express = require('express');
const router = express.Router();
const { User, Thought } = require('../../../models/Thought');
//get all thoughts
router.get('/thoughts', async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

// post new thought
router.get('/thoughts', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id).populate('reactions');
        const user = await User.findById(req.params.id).populate('thoughts');
        user.thoughts.push(thought);
        await user.save();
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update thought by id
router.put('/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
    }
    res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }

});

// delete thought by id
router.delete('/thought/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        const user = await User.findById(req.params.id).populate('thoughts');
        user.thoughts.pull(thought);
        await user.save();
        res.json('thouyght deleted');
    } catch (err) {
        res.status(500).json(err);
    }
});

// post create a reaction to a thought
router.post('/:id/reactions', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
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

// delete reaction by id
router.delete('/:id/reactions/:reactionId', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      const reactionId = req.params.reactionId;
      thought.reactions.pull(reactionId);
      await thought.save();
      res.json({ message: 'Reaction removed' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;