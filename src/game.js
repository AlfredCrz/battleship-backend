const dbGame = []
const idHelper = require('./IdHelper.js')
const gameDB = require('../config/model-game.js')
const boardDB = require('../config/model-board.js')
const shipDB = require('../config/model-ship.js')
const positionDB = require('../config/model-position.js')

class Game {
	constructor({cols = 10, rows = 10} = {}){
		this.cols = cols;
		this.rows = rows;
	}

	static create({cols = 10, rows = 10} = {}) {
		const game = new Game({cols,rows});
		game.playerOneId = idHelper();
		const token = idHelper();
		game.token = token;

		game.session = `http://localhost:3000/game?token=${token}`;

		return gameDB.sync({force: false})
			.then(function () {
				return gameDB.create({
					playerOneId: game.playerOneId,
					token: game.token
				});
			})
			.then(gameSave => {
				return boardDB.sync({force: false})	
				.then(function () {
					return boardDB.create({
						idGame: gameSave.dataValues.id,
						rows: game.rows,
						columns: game.cols
					});
				});
			})
			.catch(error => {
				console.log(error);
				throw error;
			})
	}

	static join(token) {
		return gameDB.findOne({ where: {token: token} })
			.then(game => {
				let idPlayer = idHelper();
				return game.update({
					playerTwoId: idPlayer
				})
			})
			.catch(error => {
				console.log(error);
				throw error;
			})
	}

	static shipsOrder(gameId, playerId, params) {
		return boardDB.findOne({ where: {idGame: gameId} })
			.then(board => {
				if (params.length !== 5) {
					return Promise.reject({
						message: "You need 5 ships"
					});
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
						console.log("entro")
						return Promise.reject({
							message: "fuera del rango"
						});
					}
				})
			})
			.then( function() {
				return positionDB.sync({force: false})	
				.then(function () {
					for (var i = 0; i < params.length; i++) {
						positionDB.create({
							positionX: params[i].positionX,
							positionY: params[i].positionY,
							orientation: params[i].orientation,
							type: params[i].type
						});
					}
				})
			})
			.catch(error => {
				console.log(error);
				throw error;
			})
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
			})
			.catch(error => {
				console.log(error);
				throw error;
			});
	}
}

module.exports = Game