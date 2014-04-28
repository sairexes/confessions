var express = require( 'express' );
var Admin   = require( '../model/AdminModel' );
var Router  = express.Router();

Router
    .get( '/admin', function( request, response ) {
        Admin.find(function( error, doc ) {
            if ( error ) {
                return response.send( 500, error );
            }
            response.send( 200, doc );
        } );
    } )
    .post( '/admin', function( request, response ) {
        var newPost = new Admin( {
            username: request.body.username,
            password: request.body.password
        } );

        newPost.save( function ( error, doc ) {
            if ( error ) {
                return response.send( 500, error );
            }
            response.send( 200, doc);
        } );
    } )
    .put('/admin/:messageId', function(request, response) {
        Admin.update( {
            _id: request.params.messageId },
            { password: request.body.password },
            { multi: true },
            function( error, doc ) {
                if (error) {
                    response.send( 500, error );
                }
                response.send( 200 );
            } );
    } );

module.exports = Router;