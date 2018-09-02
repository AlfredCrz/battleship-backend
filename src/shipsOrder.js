const Sequelize = require('sequelize');
const gameDB = require('../config/model-game.js')
const boardDB = require('../config/model-board.js')
const positionDB = require('../config/model-position.js')

async function shipsOrder(gameId, playerId, params) {
 	var findGame = await gameDB.findOne({ where: {
		id: gameId,
		[Sequelize.Op.or]: [{ playerOneId: playerId}, {playerTwoId: playerId}]
		} 
	})

 	if (findGame === null) {
 		throw "The game does not exist"
 	}
 	
 	var findBoard = await boardDB.findOne({ where: {id: findGame.dataValues.boardId} });

 	if (params.length !== 5) {
 		throw "You need five ships"
 	}

 	params.forEach(ship => {
 		if (ship.orientation === "h" && (ship.type + ship.positionX) > findBoard.dataValues.rows) {
 			throw "A horizontal ship is out of range"
 		}
 		if (ship.orientation === "v" && (ship.type + ship.positionY) > findBoard.dataValues.columns) {
 			throw "A vertical ship is out of range"
 		}
 	})

 	for (var i = 1; i < params.length; i++) {
 		var ship = await positionDB.sync({force: false})
		await ship.create({
			positionX: params[i].positionX,
			positionY: params[i].positionY,
			orientation: params[i].orientation,
			type: params[i].type,
			idPlayer: playerId,
			idGame: gameId
		});
	}
}

module.exports = shipsOrder;