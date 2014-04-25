var request = require( 'supertest' );
var should = require( 'should' );
var server = require( '../..' );

describe( 'ConfessionController', function () {

	describe( 'GET' , function () {

		it( 'should return a response', function ( done ) {

			request( server )
				.get( '/confessions' )
				.expect( 'Content-Type', /json/ )
				.expect( 200 )
				.end( function( err, res ) {
					if ( err ) throw err;

					res.body.should.be.ok;
					res.body.should.be.an.instanceof( Array );
					res.body.length.should.equal( 1 );
					done();
				} );

		} );

	} );
	
} );
