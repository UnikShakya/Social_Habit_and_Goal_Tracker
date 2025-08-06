const express = require('express');
const {
  createGoal,
  getGoals,
  getGoalsByUserId,
  updateGoal,
  deleteGoal,
} = require('./GoalController');
const router = express.Router();

// Optional: get only own goals
router.get('/', getGoals);

// New route to get goals by user ID (self or buddy)
router.get('/:userId', getGoalsByUserId);

router.post('/', createGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

module.exports = router;
