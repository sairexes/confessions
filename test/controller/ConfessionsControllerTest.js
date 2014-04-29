var request = require( 'supertest' );
var should = require( 'should' );
var server = require( '../../' );

describe( 'ConfessionController', function () {


	var testPost = {
		'message' : 'Mocha test 01',
		'alias'   : 'Rj'
	};

	describe( 'POST' , function () {

		it( 'should return a response', function ( done ) {

			request( server )
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

			request( server )
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
			request( server )
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


} );
