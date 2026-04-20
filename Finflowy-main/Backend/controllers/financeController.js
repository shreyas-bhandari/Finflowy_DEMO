import Transaction from '../models/Transaction.js';
import Goal from '../models/Goal.js';

// @desc    Get all transactions for user
// @route   GET /api/finance/transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a transaction
// @route   POST /api/finance/transactions
export const createTransaction = async (req, res) => {
  try {
    const { amount, type, category, date, description } = req.body;
    
    // Create new transaction
    const transaction = await Transaction.create({
      user: req.user._id,
      amount,
      type,
      category,
      date,
      description
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// @desc    Get Goals
// @route   GET /api/finance/goals
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ priorityWeight: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Goal
// @route   POST /api/finance/goals
export const createGoal = async (req, res) => {
  try {
    const { name, targetAmount, deadline, priorityWeight } = req.body;
    const goal = await Goal.create({
      user: req.user._id,
      name,
      targetAmount,
      deadline,
      priorityWeight
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

