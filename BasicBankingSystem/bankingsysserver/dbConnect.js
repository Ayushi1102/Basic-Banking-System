var mySql = require('mysql');
var pool;

module.exports = {
	getPool: function () {
      	if (pool) {
			console.log("\nConnection Pool Already Created..........\n");
			return pool;
		}

		pool = mySql.createPool({
			connectionLimit: 40,
			connectTimeout: 5*60*1000, // 5*60*1000 = 5 minutes
			acquireTimeout: 5*60*1000, // 5*60*1000 = 5 minutes
			host: "localhost",
			user: "root",
			password: "ashwini1234",
			database: "bankingsystemdb",
                     supportBigNumbers: true,
                     bigNumberStrings: true
		});

		console.log("\nCreating New Pool..........\n");
		return pool;
	}
};
