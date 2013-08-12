'use strict';


angular
    .module( 'app', [ 'files' ])

    // The example of the full functionality
    .controller( 'TestController', function( $scope, $fileUploader ) {

        // create a uploader with options
        var uploader = $fileUploader.create({
            url: '/upload.php',
            filters: [
                function( item ) {                    // first user filter
                    console.log( 'filter1' );
                    return true;
                }
            ]
        });

        // ADDING FILTER

        uploader.filters.push(function( item ) { // second user filter
            console.log( 'filter2' );
        });

        // REGISTER HANDLERS

        uploader.bind( 'afteraddingfile', function( event, item ) {
            console.log( 'After adding a file', item );
        });

        uploader.bind( 'afteraddingall', function( event, items ) {
            console.log( 'After adding all files', items );
        });

        uploader.bind( 'changedqueue', function( items ) {
            $scope.$$phase || $scope.$apply();
        });

        uploader.bind( 'beforeupload', function( event, item ) {
            console.log( 'Before upload', item );
        });

        uploader.bind( 'progress', function( event, item, progress ) {
            console.log( 'Progress: ' + progress );
        });

        uploader.bind( 'success', function( event, xhr, item ) {
            console.log( 'Success: ' + xhr.response );
        });

        uploader.bind( 'complete', function( event, xhr, item ) {
            console.log( 'Complete: ' + xhr.response );
        });

        uploader.bind( 'progressall', function( event, progress ) {
            console.log( 'Total progress: ' + progress );
            $scope.$$phase || $scope.$apply();
        });

        uploader.bind( 'completeall', function( event, items ) {
            console.log( 'All files are transferred' );
            $scope.$$phase || $scope.$apply();
        });

        $scope.uploader = uploader;
    });