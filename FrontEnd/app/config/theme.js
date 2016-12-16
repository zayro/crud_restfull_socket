app.config(function($mdThemingProvider) {

    /*
        $mdThemingProvider.theme('gris').primaryPalette('grey', {
            'default': '400', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        });

    */


    $mdThemingProvider.definePalette('info', {
        '50': 'B71C1C',
        '100': 'F5F5F5',
        /* background */
        '200': 'B71C1C',
        '300': '558B2F',
        /* success */
        '400': 'B71C1C',
        '500': 'B71C1C',
        /* error */
        '600': 'B71C1C',
        '700': 'B71C1C',
        '800': '0D47A1',
        /* info */
        '900': 'B71C1C',
        'A100': 'FF5722',
        /* advertencia */
        'A200': 'B71C1C',
        'A400': 'B71C1C',
        'A700': 'B71C1C',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': undefined,
        'contrastLightColors': undefined
    });

    $mdThemingProvider.theme('default')

    .primaryPalette('blue-grey', {
            'default': '900',
            'hue-3': '600',
            'hue-2': '300',
            'hue-1': '50'
        })
        .accentPalette('blue', {
            'default': '400',
            'hue-3': 'A100',
            'hue-2': '600',
            'hue-1': '100'
        })

    .backgroundPalette('grey', { 'default': '200' })

    .warnPalette('red')

});


//$mdThemingProvider.setDefaultTheme('gris');