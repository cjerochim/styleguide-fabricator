'use strict';

// configuration
module.exports = {
    dev: true,
    src: {
        scripts: {
            //Todo - change reference location - bower can be used for css too.
            bower: {
                input: './bower_components',
                output: './public/toolkit/lib/'
            },
            fabricator: {
                input: [
                    './src/fabricator/scripts/prism.js',
                    './src/fabricator/scripts/fabricator.search.js',
                    './src/fabricator/scripts/fabricator.js'
                ],
                output: './public/fabricator/scripts/',
                fileName: 'f.js'
            },
            toolkit: {
                input: './src/toolkit/assets/scripts/toolkit.js',
                output: './public/toolkit/scripts/',
                fileName: 'toolkit.js'
            }
        },
        styles: {
            fabricator: {
                input: './src/fabricator/styles/**/*.scss',
                output: './public/fabricator/styles/'
            },
            toolkit: {
                input: './src/toolkit/assets/styles/**/*.scss',
                output: './public/toolkit/styles/'
            }
        },
        //Note - any changes to the location of './src/toolkit' will break, need to update manually in 'collate.js' within the parse function
        assemble: {
            data: './public/fabricator/data/data.json',
            helpers: './src/toolkit/helpers/',
            materials: [
                'components',
                'structures',
                'layouts',
                'templates',
                'documentation'
            ],
            views: {
                input: './src/toolkit/views/*.hbs',
                output: './public/'
            },
            templates: {
                input: './src/toolkit/templates/*.hbs',
                output: './public/'
            }
        },
        images: {
            input: 'src/toolkit/assets/images/**/*',
            output: './public/toolkit/images/'
        }
    },
    clean: './public/'
};

