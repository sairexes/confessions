'use strict';

var request  = require( 'supertest' );
var should   = require( 'should' );
var fixtures = require( '../fixtures' );

describe( 'ConfessionController', function () {
	var app, mongodb;

	var testPost = {
		'message' : 'Mocha test 01',
		'alias'   : 'Rj'
	};

	before( function ( done ) {
		fixtures.createServer( 'ConfessionsController',
			function ( error, server ) {
				app = server;

				fixtures.connectMongo( null, function ( error, conn ) {
					if ( error ) {
						done( error );
					}

					mongodb = conn.db;
					done();
				} );
		} );
	} );

	after( function ( done ) {
		mongodb.dropDatabase( function () {
			done();
		} );
	} );

	describe( 'POST' , function () {

		it( 'should return a response', function ( done ) {

			request( app )
				.post( '/confessions' )
				.send( testPost )
				.expect( 'Content-Type', /json/ )
				.expect( 200 )
				.end( function( err, res ) {
					if ( err ) throw err;

					res.body.should.be.ok;
					res.body.should.be.an.instanceof( Object );
					res.body.message.should.equal( testPost.message );
					res.body.alias.should.equal( testPost.alias );
					done();
				} );

		} );

	} );

	describe( 'GET' , function () {

		it( 'should return a response', function ( done ) {

			request( app )
				.get( '/confessions' )
				.expect( 'Content-Type', /json/ )
				.expect( 200 )
				.end( function( err, res ) {
					if ( err ) throw err;

					testPost.id = res.body[0]._id;

					res.body.should.be.ok;
					res.body.should.be.an.instanceof( Array );
					res.body.length.should.not.be.above( 1 );

					done();
				} );

		} );

	} );

	describe( 'PUT', function( ) {
		it( 'should return a response', function ( done ) {
			request( app )
				.put( '/confessions/' + testPost.id )
				.send( { 'message' : 'OK'} )
				.expect( 200 )
				.end( function( err, res ) {
					if( err ) throw err;
					res.body.should.be.ok;
					res.body.should.be.an.instanceof( Object );
					done();
				} );
		} );
	} );

	describe( 'DELETE' , function() {
		it( 'should delete confession with Id', function( done ){

			request( app )
				.delete( '/confessions/' + testPost.id )
				.expect( 200 )
				.end( function(err, res) {
					if( err ) throw err;
					res.body.should.be.ok;
					done();
				} );

		} );
	} );

	// describe( 'DELETE' , function() {

	// 	it( 'should delete all confessions', function ( done ) {

	// 		request( app )
	// 			.delete( '/confessions' )
	// 			.expect( 200 )
	// 			.end( function(err, res) {
	// 				if( err ) throw err;
	// 				res.body.should.be.ok;
	// 				done();
	// 			} );
	// 	} );

	// } );

} );
