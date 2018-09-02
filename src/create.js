const idHelper = require('./IdHelper.js')
const gameDB = require('../config/model-game.js')
const boardDB = require('../config/model-board.js')

async function create({cols = 10, rows = 10} = {}) {
	if (cols < 11 || cols > 30 || rows < 11 || rows > 30) {
		throw 'The size is out of range'
	}

	let playerOneId = idHelper();
	let token = idHelper();
	var board = await boardDB.sync({force: false})
	var boardSave = await board.create({
		rows: rows, 
		columns: cols
	})
	var game = await gameDB.sync({force: false})
	return await game.create({
		boardId: boardSave.dataValues.id,
		playerOneId: playerOneId,
		token: token
	})
}

module.exports = create;