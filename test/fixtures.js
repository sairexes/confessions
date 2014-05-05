/* global require: false, console: false, exports: false */
'use strict';

var express  = require( 'express' );
var mongoose = require( 'mongoose' );
var connect  = require('connect');
var app      = express();
var utils    = require( '../utils' );
var config   = require( '../config' );
var path     = require( 'path' );

var controllerPath = function( name ) {
	return path.resolve( __dirname, '../controller/' + name );
}

exports.connectMongo = function ( options, done ) {
	options = options || {};

	mongoose.connect( utils.mongoUrl( options ) );
	var conn = mongoose.connection;

	mongoose.connection.on( 'open', function () {
		done( null, conn );
	} );

	mongoose.connection.on( 'error', function ( error ) {
		done( error );
	} );
};

exports.createServer = function ( controller, done ) {
	if ( !controller ) {
		return;
	}

	app.use( connect.bodyParser() );


	app.use( '/', require( controllerPath( controller ) ) );

	app.listen( config.port, config.host, function () {
		done( null, app );
	} );

};
