var express = require( 'express' );
var mongoose = require( 'mongoose' );

var app = express();
var utils = require( './utils' );
var config = require( './config' );

mongoose.connect( utils.mongoUrl( config.db ) );

mongoose.connection.on( 'open', function () {
	console.log( 'Connection to mongodb is open' );
} );

mongoose.connection.on( 'error', function ( error ) {
	console.log( 'Error on mongodb connection : ', error );
} );

app.use( '/confessions', require( './controller/ConfessionsController' ) );

app.listen( config.port, config.host );