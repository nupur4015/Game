const Game = require('../models/game');

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const game_index = (req, res) => {
  Game.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { games: result, title: 'All games' });
    })
    .catch(err => {
      console.log(err);
    });
}

const game_details = (req, res) => {
  const id = req.params.id;
  Game.findById(id)
    .then(result => {
      res.render('details', { game: result, title: 'Game Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Game not found' });
    });
}

const game_create_get = (req, res) => {
  res.render('create', { title: 'Create a new game' });
}

const game_create_post = (req, res) => {
  const obj={name:req.body.name, url:req.body.url, author:req.body.author, date:formatDate(req.body.date)};
  const game = new Game(obj);
  console.log(req.body);
  game.save()
    .then(result => {
      res.redirect('/games');
    })
    .catch(err => {
      console.log(err);
    });
}

const game_delete = (req, res) => {
  const id = req.params.id;
  Game.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/games' });
    })
    .catch(err => {
      console.log(err);
    });
}
const game_edit= (req,res) => {
  console.log(req.body);
  const id=req.params.id;
  
 req.body.date=formatDate(req.body.date);
  console.log(req.body);
  Game.findByIdAndUpdate(id,req.body)
    .then(result => {
      console.log(result);
      
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
    });

}

const game_editget = (req,res) =>{
  const id = req.params.id;
  Game.findById(id)
    .then(result => {
      res.render('edit', { game: result, title: 'Game Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Game not found' });
    });
}
module.exports = {
  game_editget,
  game_edit,
  game_index, 
  game_details, 
  game_create_get, 
  game_create_post, 
  game_delete
}