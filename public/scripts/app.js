/** @format */

// import OVR
import OVR from '../application/ovr.js';

// import template files for use with router here
import ovrView from '../routes/ovr-view.js';
//

// create options dictonary for the app instantion
let options = {
	// Link the stylesheets your app needs
	// @note: you can also append the stylesheets directly in the html file
	stylesheets: ['./styles/ovr_style.css'],

	// You can define your page title here
	// @note: you can also change the title directly in your HTML file, and set this to undefined
	pagetitle: undefined,

	// You can add the authors name here
	// @note: you can also change this directly in your HTML file, and set this to undefined
	author: undefined,

	// If you want / need, you can define a custom selector here. Default is "app"
	// @note: This property should usualy not be changed, unless you know what you're doing.
	customSelector: 'app',

	// This adds a custom HTML5 Meta tag that shows that the site is built with OVR
	// if you want to disable this, you can set it to "false"
	engineTag: true,

	/* 
		If you want to use ø.VR - Router ->
		@note: set "use" to true to enable router;
	 	@note: set "path" to the page you want to load as standard (index)
		@note: set "routes" to the routes you want to have
		@note: the routes objects should follow the schema: name: {hash: "#<your hash here>", template: <your imported template here>}
		@note: the routes object can have a optional "title" property, which will change your page title. 
	*/
	router: {
		use: false
	},

	// enables logging
	logging: true
};

// create new instance
let app = new OVR(options);
app.appOp.logging ? console.log(app) : null;

// dispatch the first render event to beginn rendering the page
//	@note: the event only needs to be dispatched if the router is disabled

document.addEventListener(
	'DOMContentLoaded',
	function() {
		!app.appOp.router.use
			? window.dispatchEvent(new Event('render'))
			: null;
	},
	false
);

// export the app
export { app };
