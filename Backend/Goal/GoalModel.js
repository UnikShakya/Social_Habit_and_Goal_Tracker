const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  name: { type: String, required: true },
  days: {
    monday: Boolean,
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean,
    friday: Boolean,
    saturday: Boolean,
    sunday: Boolean,
  },
  repeat: { type: String, enum: ['daily', 'weekly'], default: 'daily' },
  reminder: Boolean,
  reminderTime: String,
  completed: Boolean,   
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

module.exports = mongoose.model('Goal', goalSchema);

