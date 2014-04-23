'use strict';

function generateMongoUrl( options ) {
	options = options || {};

	var host = options.host || 'localhost';
	var port = options.port || '27017';
	var db = options.db || 'dev';
	var url = '';

	if ( options.user && options.pass ) {
		url = 'mongodb://' + options.user + ':' + options.pass + '@' + host + ':' + port + '/' + db;
	} else {
		url = 'mongodb://' + host + ':' + port + '/' + db;
	}

	return url;
}

exports.mongoUrl = generateMongoUrl;