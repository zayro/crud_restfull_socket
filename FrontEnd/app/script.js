$(document).ready(function() {
    // Handler for .ready() called.
    console.info('load jquery');

    angular.element(document).ready(function() {

        console.info('load angular element');

        function fire() {
            console.log('execute table_main');
            var v = 1;
            $('#table_main tr > *:nth-child(4)').toggle();
            $('#table_main tr > *:nth-child(2)').toggle();
            $('#table_main tr > *:nth-child(3)').toggle();
            $('#insert').toggle();
        }

        $('#hidden_column').click(fire);

    });


});