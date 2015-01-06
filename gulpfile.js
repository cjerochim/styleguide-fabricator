'use strict';

//Todo - Upload version of package on release
//Todo - push to server
//Todo - push to git.



var requireDirectory = require('require-dir');
requireDirectory('./gulp/tasks/', { recurse: true });
