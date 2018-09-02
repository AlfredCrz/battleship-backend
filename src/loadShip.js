const shipDB = require('../config/model-ship.js')

async function loadShip() {
 	for (var i = 2; i < 6; i++) {
 		var ship = await shipDB.sync({force: false})
		await ship.create({
			id: i, 
			quantity: i
		});
 	}
}

module.exports = loadShip;