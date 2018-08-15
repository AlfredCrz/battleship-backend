const dbGame = []
const idHelper = require('./IdHelper.js')
const gameDB = require('../config/model-game.js')

class Game {
	constructor({cols = 10, rows = 10} = {}){
		this.cols = cols;
		this.rows = rows;
	}
	static create({cols = 10, rows = 10} = {}) {
		const game = new Game({cols,rows});
		game.id = dbGame.length + 1;
		game.playerIdOne = idHelper();
		const token = idHelper();
		game.token = token
		dbGame.push(game);

		game.session = `http://localhost:3000/game?token=${token}`;

		return gameDB.sync({force: false})
			.then(function () {
				gameDB.create({
					playerOneId: game.playerOneId,
					token: game.token
				});
			})
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