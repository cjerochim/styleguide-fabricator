/**
 * Collate "materials" - html and md files
 * @description Gets contents of files, parses, and creates JSON
 */

'use strict';

var beautifyHtml = require('js-beautify').html;
var changeCase = require('change-case');
var cheerio = require('cheerio');
var fs = require('fs');
var gutil = require('gulp-util');
var Handlebars = require('handlebars');
var junk = require('junk');
var markdown = require('marked');
var mkpath = require('mkpath');
var path = require('path');
var matter = require('gray-matter');
var glob = require('glob');

/**
 * Compiled component/structure/etc data
 * @type {Object}
 */
var data;


// configure marked
markdown.setOptions({
	langPrefix: 'language-'
});


// configure beautifier
var beautifyOptions = {
	'indent_size': 1,
	'indent_char': '    ',
	'indent_with_tabs': true
};


/**
 * Register each component and structure as a helper in Handlebars
 * This turns each item into a helper so that we can
 * include them in other files.
 */
var registerHelper = function (item) {

	Handlebars.registerHelper(item.id, function (context) {


		var helperClasses = context.hash['class'] || '';

		// get helper classes if passed in
	//	var helperClasses = (typeof arguments[0] === 'string') ? arguments[0] : '';

		//Re render including hash if required
		var template = Handlebars.compile(item.raw);
		item.content = beautifyHtml(template(context.hash), beautifyOptions);

		// init cheerio
		var $ = cheerio.load(item.content);

		// add helper classes to first element
		$('*').first().addClass(helperClasses);

		return new Handlebars.SafeString($.html());
	});

};


/**
 * Register all custom helpers in helpers directory
 */
var registerCustomHelpers = function () {

	var helpers = fs.readdirSync('src/toolkit/helpers/'),
		js;

	for (var i = helpers.length - 1; i >= 0; i--) {
		js = require('../src/toolkit/helpers/' + helpers[i]);
		js.register(Handlebars);
	}
};



registerCustomHelpers();


/**
 * Leverage current fs.readdirSync to read sub-dirs.
 * @param dir
 * @param files_
 * @returns {*|Array}
 */
var  getFiles = function(dir, files_){
	files_ = files_ || [];
	if (typeof files_ === 'undefined') files_=[];
	var files = fs.readdirSync(dir).filter(junk.not);
	for(var i in files){
		if (!files.hasOwnProperty(i)) continue;
		var name = dir+'/'+files[i];
		//var name = files[i];
		if (fs.statSync(name).isDirectory()){
			getFiles(name,files_);
		} else {
			files_.push(files[i]);
		}
	}
	return files_;
};




/**
 * Block iteration
 * @description Repeat a block a given amount of times.
 * @example
 * {{#iterate 20}}
 *   <li>List Item</li>
 * {{/iterate}}
 */
Handlebars.registerHelper('iterate', function (n, block) {
	var accum = '';
	for (var i = 0; i < n; ++i) {
		accum += block.fn(i);
	}
	return accum;
});


/**
 * Parse a directory of files
 * @param {Sting} dir The directory that contains .html and .md files to be parsed
 * @return {Function} A stream
 */
var parse = function (dir) {


	// create key if it doesn't exist
	if (!data[dir]) {
		data[dir] = {};
	}


	// get directory contents - parse sub-directories.
	//var raw = fs.readdirSync('src/toolkit/' + dir ).filter(junk.not);
	var raw = getFiles('src/toolkit/' + dir);

	// create an array of file names
	var fileNames = raw.map(function (e, i) {
		return e.replace(path.extname(e), '');
	});

	// de-dupe file names (both .html and .md present)
	var items = fileNames.filter(function (e, i, a) {
		return a.indexOf(e) === i;
	});



	// iterate over each item, parse, add to item object
	for (var i = 0, length = items.length; i < length; i++) {

		var item = {};

		item.id = items[i];
		item.name = changeCase.titleCase(item.id.replace(/-/ig, ' '));


		//Apply aditional properties for search
		if(dir === 'templates') {
			item.url = 'template-' + item.id + '.html';
			item.target = '_blank';
		} else {
			item.url = dir + '.html#' + item.id;
			item.target = '_self';
		}



		try {

			// Find all elements in sub folders and return url. Not ideal but works, based on the current structure.
			var itemLocation  = glob.sync('src/toolkit/' + dir + '/**/' + items[i] + '.hbs');

			// compile templates
			var content = fs.readFileSync(itemLocation[0], 'utf8').replace(/(\s*(\r?\n|\r))+$/, '');

			var template = Handlebars.compile(matter(content).content);
			item.raw = content;
			item.content = beautifyHtml(template(), beautifyOptions);
			item.meta = matter(content).data;

			// register the helper
			registerHelper(item);

		} catch (e) {}

		try {
			var notes = fs.readFileSync('src/toolkit/' + dir + '/' + items[i] + '.md', 'utf8');
			item.notes = markdown(notes);
		} catch (e) {}

		data[dir][item.id.replace(/-/g, '')] = item;
	}



};


module.exports = function (opts, cb) {

	data = {};

	// iterate over each "materials" directory
	for (var i = 0, length = opts.materials.length; i < length; i++) {
		parse(opts.materials[i]);
	}

	// write the json file
	mkpath.sync(path.dirname(opts.dest));

	fs.writeFile(opts.dest, JSON.stringify(data), function (err) {
		if (err) {
			gutil.log(err);
		} else {
			cb();
		}
	});

};
