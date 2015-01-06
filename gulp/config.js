'use strict';

// configuration
module.exports = {
    dev: true,
    src: {
        scripts: {
            bower: './bower_components',
            fabricator: [
                './src/fabricator/scripts/prism.js',
                './src/fabricator/scripts/fabricator.search.js',
                './src/fabricator/scripts/fabricator.js'
            ],
            toolkit: './src/toolkit/assets/scripts/toolkit.js'
        },
        styles: {
            fabricator: './src/fabricator/styles/fabricator.scss',
            toolkit: './src/toolkit/assets/styles/toolkit.scss'
        },
        images: 'src/toolkit/assets/images/**/*',
        views: './src/toolkit/views/*.hbs',
        materials: [
            'components',
            'structures',
            'layouts',
            'templates',
            'documentation'
        ]
    },
    dest: './public/'
};

