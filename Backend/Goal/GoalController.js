const Goal = require('./GoalModel');
const jwt = require('jsonwebtoken');

const buddyMap = {
  '688f15c7fa11d141595a8b4a': ['688f18e6c1f30464a16f6e3d'],
  '688f18e6c1f30464a16f6e3d': ['688f15c7fa11d141595a8b4a'],
};

const getUserIdFromToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('Authorization token missing');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

const createGoal = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const goal = new Goal({ ...req.body, userId });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get goals of current user only (optional, can keep or remove)
const getGoals = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const goals = await Goal.find({ userId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// New: get goals for a specific user, only if self or buddy
const getGoalsByUserId = async (req, res) => {
  try {
    const currentUserId = getUserIdFromToken(req);
    const requestedUserId = req.params.userId;

    if (
      requestedUserId !== currentUserId &&
      !(buddyMap[currentUserId] && buddyMap[currentUserId].includes(requestedUserId))
    ) {
      return res.status(403).json({ message: "Access denied: Not your buddy" });
    }

    const goals = await Goal.find({ userId: requestedUserId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGoal = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    // Only allow updating if owner
    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found or not authorized' });
    }

    res.json(updatedGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const deleted = await Goal.findOneAndDelete({ _id: req.params.id, userId });

    if (!deleted) {
      return res.status(404).json({ message: 'Goal not found or not authorized' });
    }

    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGoal,
  getGoals,
  getGoalsByUserId,
  updateGoal,
  deleteGoal,
};
