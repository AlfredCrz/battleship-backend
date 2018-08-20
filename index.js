const express = require('express');
const bodyParser = require('body-parser');
const Game = require('./src/game.js')
const Connection = require('./config/connection.js')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

Connection.authenticate()
  .then(() => {
    Game.createShip();
    app.listen(3000, () => {
      console.log('Connection has been established successfully.');
      console.log('listening port 3000');
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.get('/game',(req, res) => {
  console.log("entro aqui");
  Game.join(req.query.token)
  .then(game => {
      res.send(game)
    })
  .catch(error => {
      res.send(error)
    });
})

app.post('/game', (req, res) => {
  Game.create(req.body)
    .then(game => {
      res.send(game)
    })
    .catch(error => {
      res.send(error)
    });
})

app.put('/game/:gameId/player/:playerId/board', (req, res) => {
  const gameId = req.params.gameId;
  const playerId = req.params.playerId;
  const ships = req.body;
  Game.shipsOrder(gameId, playerId, ships)
    .then(game => {
      res.send(game)
    })
    .catch(error => {
      res.send(error)
    });
})

