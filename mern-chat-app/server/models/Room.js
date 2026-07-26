const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '💬',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
