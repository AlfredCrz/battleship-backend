const Sequelize = require('sequelize');
const idHelper = require('./IdHelper.js')
const gameDB = require('../config/model-game.js')
const boardDB = require('../config/model-board.js')
const shipDB = require('../config/model-ship.js')
const positionDB = require('../config/model-position.js')

class Game {
	static create({cols = 10, rows = 10} = {}) {
		let playerOneId = idHelper();
		let token = idHelper();
		
		return boardDB.sync({force: false})	
			.then(() => {
				return boardDB.create({
					rows: rows,
					columns: cols
				});
			})
			.then(board => {
				return gameDB.sync({force: false})
				.then(() => {
					return gameDB.create({
						boardId: board.dataValues.id,
						playerOneId: playerOneId,
						token: token
					});
				});
			});
	}

	static join(token) {
		return gameDB.findOne({ where: {token: token} })
			.then(game => {
				let idPlayer = idHelper();
				return game.update({
					playerTwoId: idPlayer
				})
			})
	}

	static shipsOrder(gameId, playerId, params) {
		var board = boardDB.findOne({ where: {id: gameId} })
		return gameDB.findOne({ where: {
					id: gameId,
					[Sequelize.Op.or]: [{ playerOneId: playerId}, {playerTwoId: playerId}]
				} 
			})
			.then(game => {
				if (params.length !== 5) {
					return {
						message: "numero incorrecto de barcos"
					}
				}
				params.forEach(element => {
					let width = 0;
					if (element.orientation == "h") {
						width = element.positionX + element.type
						
					}

					if (element.orientation == "v") {
						width = element.positionY + element.type
					}
		
					if (element.positionX > board.rows || element.positionY > board.columns || width > board.rows || width > board.columns) {
						console.log("entro aqui")
						return {
							message: "fuera del rango"
						}
					}
				})
			})
			/*.then( function() {
				return positionDB.sync({force: false})	
				.then(function () {
					positionDB.create({
						positionX: params[0].positionX,
						positionY: params[0].positionY,
						orientation: params[0].orientation,
						type: params[0].type
					});
				})

			})*/
	}
	
	static createShip() {
		shipDB.sync({force: true})
			.then(function () {
				shipDB.create({
					id: 2,
					quantity: 2
				});
			})
			.then(function () {
				shipDB.create({
					id: 3,
					quantity: 3
				});
			})
			.then(function () {
				shipDB.create({
					id: 4,
					quantity: 4
				});
			})
			.then(function () {
				shipDB.create({
					id: 5,
					quantity: 5
				});
			});
	}
}

module.exports = Game