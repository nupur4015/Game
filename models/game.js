const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: {
    type: String,
    required: true, 
  },
  url: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    
  }
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;