const idHelper = require('./IdHelper.js')
const gameDB = require('../config/model-game.js')

async function join(token) {
	var idPlayer = idHelper();
	var find = await gameDB.findOne({ where: {token: token} })

	if (find === null) {
		throw "The game does not exist"
	}

	return await find.update({
		playerTwoId: idPlayer
	})
} 

module.exports = join;
