/**
 * Pass the Fabricator views through Handlebars
 */

'use strict';

// modules
var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');
var through = require('through2');


/**
 * Contents of data.json
 * @type {Object}
 */
var data;


/**
 * Register partials with Handlebars
 */
var registerPartials = function () {

	var partials = fs.readdirSync('src/toolkit/views/partials'),
		hbs;

	for (var i = partials.length - 1; i >= 0; i--) {
		hbs = fs.readFileSync('src/toolkit/views/partials/' + partials[i], 'utf-8');
		Handlebars.registerPartial(partials[i].replace(/.hbs/, ''), hbs);
	}
};


/**
 * Assemble standard views (e.g. components, structures, documentation)
 */
var assembleFabricator = function (file, enc, cb) {

	// augment data object
	data.fabricator = true;

	// template pages
	var source = file.contents.toString(),
		template = Handlebars.compile(source),
		html = template(data);


	// save as file buffer
	file.contents = new Buffer(html);

	this.push(file);

	cb();

};


/**
 * Inject body content into layout
 * @param layout
 * @param body
 * @returns {XML|*|string|void}
 */
var injectBody = function (layout, body) {
	return layout.replace(/\{{\s*body\s*}}/g, body);
};



/**
 * Assemble templates
 */
var assembleTemplates = function (file, enc, cb) {

	// augment data object
	data.fabricator = false;

	// use the filename as the key value lookup in the data.json object
	var key = path.basename(file.path, '.hbs').replace(/-/g, '');
	var pageMeta = data.templates[key].meta || data;

	//Todo - Check to ensure layout has been referenced. if not throw error

	if(pageMeta.layout) {
		//Todo - Check to ensure there is a layout key if not throw error
		var layoutRaw = data.layouts[pageMeta.layout].raw,
			source = injectBody(layoutRaw, data.templates[key].content);
	} else {
		 throw new Error('Need to define a layout within the page e.g. \n---\nlayout: layoutname\n---');
	}

	// template
	var template = Handlebars.compile(source),
		html = template(pageMeta);

	// save as file buffer
	file.contents = new Buffer(html);

	this.push(file);

	cb();

};

module.exports = function (opts) {
	data = JSON.parse(fs.readFileSync(opts.data));
	registerPartials();
	return through.obj((opts.template) ? assembleTemplates : assembleFabricator);
};
