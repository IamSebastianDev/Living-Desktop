/** @format */

/*

	Welcome to ø.VR! ø.VR is a small SPA framework. It's minimalist (barebones), pretty fast and dependency free.
	In contrast to most other Frameworks. ø.VR doesn't need to be compiled. 
	You can basically include it in your webpage at any time, and start using it. 

	v. 0.9

*/

// import dependencies
import { app } from '../scripts/app.js';

// import mainView
import ovrView from '../routes/landingPage.js';

// set the ovr app as default export
export default class OVR {
	/*

		The Constructor gets called when the app is instantiated in the ovr.js file
		@arg: appOp is an object that contains all the options for the app
			@appOp.stylesheets is an array of stylesheets that are appended to the head
			@appOp.pagetitle is a string that contains the title for the page
			@appOp.author contains the Authors name
	
	*/
	constructor(appOp) {
		this.appOp = appOp;

		// append stylesheets to the head
		appOp.stylesheets.forEach(sheet => {
			let link = document.createElement('link');
			link.href = sheet;
			link.rel = 'stylesheet';

			document.querySelector('head').appendChild(link);
		});

		// set the title of the page
		appOp.pagetitle != undefined
			? (document.querySelector('head title').textContent =
					appOp.pagetitle)
			: null;

		// add the author to the page
		appOp.author != undefined
			? (document.querySelector('head meta[name="author"]').content =
					appOp.author)
			: null;

		// add a custom meta tag to the head, that shows that the site was built using OVR
		if (appOp.engineTag) {
			let tag = document.createElement('meta');
			tag.name = 'generator';
			tag.content = 'Build with ØV.R.';
			document.querySelector('head').appendChild(tag);
		}

		/*
			EVENTS.

			The events array "s" holds all the events objects, that get added through a bind method during render
			The reset method resets the array and empties it. 
		*/

		this.events = {
			s: [],
			reset() {
				this.s = [];
			}
		};

		/*
			This section contains the methods that are passed into the templates

				@insert: insert lets you nest components.
				@bind: bind lets you tie DOM Elements to props.
				@forEach: lets you iterate of arrays (of Objects).

		*/

		// component register
		this.componentRegister = 0;

		this.methods = {
			// static method to insert/nest components
			insert(component, passedProps) {
				/* 
					The insert method is passed into the rendering functions and is used to mount components and bind the props. 
					It is also used to extract and append the styles if they have them
				*/

				// add the passed down props to the components props -> DO NOT CREATE A NEW INSTANCE USING THE SPREAD OPERATOR!
				Object.assign(component.props, passedProps);

				// increase the component register to indicate a component was added
				app.componentRegister++;
				let componentID = app.componentRegister;
				let componentScoped = false;

				// extract the css from the template, if it exists
				if (component.style) {
					// find the first style tag on the page, which should be the style created by the render() function
					// 		@note: the style tag will be created even if the ovr-view file does not have a style function

					let style = document.querySelector('style');

					// then append the style string without the style tags to the style tag already existing
					let string = document.createDocumentFragment();
					// get style string
					let content = component.style.call(component.props);

					// check if style is supposed to be scoped
					if (content.includes('<style scoped>')) {
						componentScoped = true;
						content = content
							.toString()
							.split('<style scoped>')[1] // remove style tag
							.split('</style>')[0] // remove style tag
							.replace(/\s\./gim, `._${componentID}`) // scope classes
							.replace(/\s\#\D.{1,}\ \{/gim, match => {
								return match.replace('#', `#_${componentID}`);
							}); // scope ids
					} else {
						content = content
							.toString()
							.split('<style>')[1] // remove style tag
							.split('</style>')[0]; // remove style tag
					}

					// append textContent and style
					string.textContent = content;
					style.appendChild(string);
				}

				// extract the template string from the template
				let string = component.template.render.call(
					component.props,
					app.methods
				);

				// return the html with either scoped or nonscoped classes and ids
				if (componentScoped) {
					return string
						.split('<template>')[1]
						.split('</template>')[0]
						.replace(/class="[^_]/gim, match => {
							return match.replace(
								/class="[^global]/gim,
								atch => {
									return atch.replace(
										/class="/gim,
										`class="_${componentID}`
									);
								}
							);
						})
						.replace(/class=".[^"]{1,}"/gim, match => {
							// check for multiple classes on the string
							return match.replace(/ [^global]/gim, atch => {
								return atch.replace(/ /gim, ` _${componentID}`); // prefixing classes with global- will prevent the css parser from changing the class name
							});
						})
						.replace(/[^-]id="/gim, `id="_${componentID}`)
						.replace(/\t/gim, ''); // return the string split between the template components;
				} else {
					return string
						.split('<template>')[1]
						.split('</template>')[0];
				}
			},

			/*
	
				The bind method is used to make the templates reactive. 
					@note: the bind method takes a "type"-string and a "handler"-callback function as arguments. 
					@note: you can add a optional Object, and set passive to true to stop the page from rendering, and matches to false, if you want to fire the event on child elements of the bound element to!

			*/

			bind(type, handler, optional = { passive: false, matches: true }) {
				/*
					Create a new reference ID, depending on the amount of ev listeners existing.
					Each listener should have its own id, so that it can be checked by one ev-listener
				*/

				let evRef = `evRef${app.events.s.length}`;

				// create the event object, that holds all the informations. This is used in the clean up step to remove the existing ev-listeners

				let event = new Object();

				if (optional.matches) {
					event = {
						type: type,
						evRef(event) {
							// The callback checks if the target's bind-id is correct.
							// If it is, it calls the handler function reference,
							// And calls for a rerender of the page.

							if (
								event.target.matches(`[data-bind="${evRef}"]`)
							) {
								handler();
								if (!optional.passive) {
									dispatchEvent(new Event('render'));
								}
							}
						}
					};
				} else if (!optional.matches) {
					event = {
						type: type,
						evRef(event) {
							// The callback checks if the target's bind-id is correct.
							// If it is, it calls the handler function reference,
							// And calls for a rerender of the page.

							if (
								event.target.closest(`[data-bind="${evRef}"]`)
							) {
								handler();
								if (!optional.passive) {
									dispatchEvent(new Event('render'));
								}
							}
						}
					};
				}

				// the event is pushed into the events.store to be accessible by the cleanup step

				app.events.s.push(event);

				// the ev-listener is created with the type and the callback function

				window.addEventListener(event.type, event.evRef);

				// the bind method then returns a string that is used on the DOM as identifier for the ev-listeners

				return `data-bind="${evRef}"`;
			},

			/*
				The forEach method is used to iterate over arrays and return a string per iteration
					@the forEach method takes three required arguments and one optional argument
					@itt: the name of the iterator you want to use (string)
					@arr: the array you want to itterator over (array);	 
					@str: the String you want to return. (string)
					@options: is an object that takes properties to define the behaviour of the method
						@sep: The character used in the string as seperator, @ by default
						@start: The index the operation starts on, by default 0
						@end: The index the operation ends on, by default the end of the array

			*/

			forEach(itt, arr, str, options = {}) {
				// declare defaults for options
				options.sep = options.sep || '@';
				options.start = options.start || 0;
				options.end = options.end || arr.length;

				// split the string at the first seperator instance
				let splitString = str.split(`${options.sep}${itt}`);

				// initalise a array to filter the property names into
				let propertyNames = [];

				// filter
				splitString.forEach(string => {
					if (string.includes(options.sep)) {
						if (string.split(options.sep)[0] != '') {
							propertyNames.push(string.split(options.sep)[0]);
						}
					}
				});

				// remove the leading dot
				propertyNames = propertyNames.map(string =>
					string.substring(1)
				);

				// @note: at this stage, we have our itt and the properties we want to access.
				//console.log(arr[0][propertyNames[0]]);

				// we now need to extract the remaining parts of the string, stripped of the itt.properties

				splitString = str.split(options.sep);

				let stringParts = splitString.filter(
					elem => elem.indexOf(itt) != 0
				);

				// beginn constructing the output

				// the output string needs to constructed differently depening on if the passed array contains objects or just values

				if (propertyNames.length != 0) {
					// return object with properties
					return arr
						.map((elem, index) => {
							// checking index on request
							if (index < options.start || index > options.end) {
								return;
							}

							// mapping the array,
							let lineString = stringParts // creating the linestring per array element
								.map((part, index) => {
									return `${part}${
										elem[propertyNames[index]] != undefined
											? elem[propertyNames[index]]
											: ''
									}`;
								})
								.join(''); // joining the returned array to a string
							return lineString;
						})
						.join(''); // joinging and return all the strings together
				} else {
					// return the pure array
					return arr
						.map((elem, index) => {
							// checking index on request
							if (index < options.start || index > options.end) {
								return;
							}

							// mapping the array,
							let lineString = stringParts // creating the linestring per array element
								.map((part, index) => {
									return `${part}${
										index != stringParts.length - 1
											? elem
											: ''
									}`;
								})
								.join(''); // joining the returned array to a string
							return lineString;
						})
						.join('');
				}
			},

			/*
				m.addGlobal can be used to add a global event listener not attached to an element, that still has access to the props
			*/

			addGlobal(type, handler, optional = {}) {
				// create a new event type
				let event = new Object();

				event = {
					type: type,
					evRef() {
						handler();
						if (!optional.passive) {
							window.dispatchEvent(new Event('render'));
						}
					}
				};

				// the event is pushed into the events.store to be accessible by the cleanup step

				app.events.s.push(event);

				// the ev-listener is created with the type and the callback function

				window.addEventListener(event.type, event.evRef);

				return '';
			}
		};

		/*

			create a Router instance
				@note: The Router instance is only created if the router option is set to true & the file is in the applications folder.
				@note: the currentRoute needs to be set to your starting template, if you're not using the router

		*/

		this.Router = {
			currentRoute: ovrView
		};

		if (appOp.router.use) {
			import('./ovr-router.js')
				.then(
					res =>
						(this.Router = new res.OVR_Router(
							appOp.router.path,
							appOp.router.routes
						))
				)
				.catch(err => console.log(err));
		}

		/*
			Attach a ev-listener to the window object, that listens for the custom render event that is dispatched by the bind method
		*/

		window.addEventListener('render', this.render.bind(this));
	}
	// render method
	async render() {
		console.time('render');
		/* 

			øVR ueses the DOMParser api to parse HTML.
			The route.template render method is called with the route as scope, so that the render method
			has access to the props inside the template. 
			It then returns a HTML string that is then parsed using the DOM Parser
			The Parser returns a Document Fragment, which content gets then appended to the DOM tag 

		*/
		// set the route to the current Route found by the Router
		let route = this.Router.currentRoute;
		// find the tag the app is using to append the content
		let selector = document.querySelector(this.appOp.customSelector);

		// check if the selector exists, if not, terminate render
		if (!document.querySelector(this.appOp.customSelector)) {
			this.appOp.logging
				? console.log(
						`There is no HTML-tag named "${this.appOp.customSelector}"`
				  )
				: null;
			return;
		}

		/*
			The cleanup step is important, so that we don't render content twice to the page. 
			First all values are retrieved from elements that are bound in a state
			It also removes all the event listeners from the page, so that there are no memory leaks.
		*/

		while (selector.lastElementChild) {
			selector.lastElementChild.remove();
		}

		// remove event listeners
		this.events.s.forEach(event => {
			window.removeEventListener(event.type, event.evRef);
		});

		// reset the event block
		this.events.reset();

		// reset component registry
		this.componentRegister = 0;

		// create new parser instance
		let parser = new DOMParser();

		// render the style to the page

		/* 

			You can define styles directly in your templates / components, 
			those style are then added to the page. 

				@note: Those styles are optionally scoped to the component or template
				@note: Styles have access to their own props 

		*/

		// check if a style tag exitsts in the ovr-view template
		if (!route.style) {
			//if not, create the empty style tags
			let styles = document.createElement('style');

			// and append them to the app
			document
				.querySelector(this.appOp.customSelector)
				.appendChild(styles);

			// then exit the function
			return;
		}

		// call the style of the template to return the style as a string
		//	@note: props are also passed to the style function, that means you can use your props inside your css!
		let style = await route.style.call(route.props).replace(/\t/gim, '');

		// parse the style
		let parsedStyle = parser
			.parseFromString(style, 'text/html')
			.querySelector('style');

		// the parsed style now contains the style nodes

		// append the contents of the Document Fragment
		selector.appendChild(parsedStyle);

		// call the route template renderer, to receive a string to parse
		let templateString = route.template.render
			.call(route.props, this.methods)
			.replace(/\t/gim, '');

		// then parse the route using the parser instance
		let parsedView = parser
			.parseFromString(templateString, 'text/html')
			.querySelector('template'); // the template part of the parsed html gets extracted

		// the parsedView contains now a "Document Fragment"

		// append the contents of the Document Fragment

		selector.appendChild(parsedView.content);

		console.timeEnd('render');
	}
}
