var express = require( 'express' );
var Confessions = require( '../model/ConfessionsModel' );

var Router = express.Router();

Router
	.get( '/', function ( request, response ) {
		Confessions.find( function ( error, doc ) {
			if ( error ) {
				return response.send( 500, error );
			}

			response.send( 200, doc );
		} );
	} );

module.exports = Router;