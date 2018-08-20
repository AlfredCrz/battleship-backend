const dbGame = []
const idHelper = require('./IdHelper.js')
const gameDB = require('../config/model-game.js')
const boardDB = require('../config/model-board.js')
const shipDB = require('../config/model-ship.js')

class Game {
	constructor({cols = 10, rows = 10} = {}){
		this.cols = cols;
		this.rows = rows;
	}
	static create({cols = 10, rows = 10} = {}) {
		const game = new Game({cols,rows});
		game.id = dbGame.length + 1;
		game.playerOneId = idHelper();
		const token = idHelper();
		game.token = token

		game.session = `http://localhost:3000/game?token=${token}`;

		return gameDB.sync({force: false})
			.then(function () {
				gameDB.create({
					playerOneId: game.playerOneId,
					token: game.token
				});
			})
			.then(function () {
				boardDB.sync({force: false})	
				.then(function () {
					boardDB.create({
						idPlayer: game.playerOneId,
						rows: game.rows,
						columns: game.cols
					});
				});
			})
	}

	static join(token) {
		return gameDB.findOne({ where: {token: token} })
			.then(result => {
				idPlayer = idHelper();
				result.update({
					playerTwoId: idPlayer
				});
			})
			.then(function () {
				boardDB.sync({force: false})	
				.then(function () {
					boardDB.create({
						idPlayer: game.playerTwoId,
						rows: game.rows,
						columns: game.cols
					});
				});
			});
	}

	static putShip(gameId, playerId, params) {
		return boardDB.findOne({ where: {idPlayer: playerId}})
			.then(result => {
			});
	}

	static join(token) {
		const game = dbGame.find(game => game.token === token);
		if(game === undefined) {
			return Promise.reject()		
		}
		return Promise.resolve({
			id : game.id,
			playerIdOne : idHelper()
		});
	}
}

module.exports = Game