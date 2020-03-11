/** @format */

class OVR_Router {
	constructor(path, routes) {
		// instantiate the routes obj, add all the routes passed into it to the obj
		this.routes = { index: path, ...routes };

		// set the index/inital route
		this.path = this.routes.index;

		// instantiate the current Route
		this.currentRoute = this.path.template;

		/* 

            Add the ev-listeners to the window object that handle the page load

        */

		window.addEventListener('hashchange', this.handleRequest.bind(this)); // fires when the hash is changed
		window.addEventListener('load', this.handleRequest.bind(this)); // fires when the page is loaded / refreshed
	}

	/*

        The handleRequest method looks for hash on the location object

    */

	handleRequest() {
		let pageTitle = document.querySelector('head title');

		/*

            The function begins with creating the request object.
            Req Obj contains    --hash (destination), 
                                --body (URI encoded params),
                                --state -> The request state is set to true if a match is found

        */

		let request = {
			hash: window.location.hash.split('?')[0],
			body: new URLSearchParams(window.location.search),
			state: false
		};

		// then check the hashes for a match

		Object.values(this.routes).forEach(route => {
			// set all states to false to deactivte the routes
			route.state = false;

			// check if a hash matches
			if (route.hash === request.hash) {
				/*
                    If a hash matches, the Router sets the state to true, 
                    sets the request state to true to indicate a match was found,
					and adds the corresponding template to the current Route
					
					?and passes the req.body into the route props
                */

				route.state = true;
				request.state = true;

				// change the title of the webpage, if there is a title in the route object
				if (route.title != undefined) {
					pageTitle.textContent = route.title;
				}

				this.currentRoute = route.template;

				// url search params are converted from the URL into an object that is then attached to props.reqBody

				this.currentRoute.props.reqBody = Object.fromEntries(
					request.body
				);
			}
		});

		// check if a request was found!
		if (!request.state) {
			// if not, reset to home path and console.log(404)
			this.currentRoute = this.path.template;
			this.currentRoute.state = true;
			console.log('404: Route not found!');
		}

		// reset the scroll location to top
		window.scrollTo(0, 0);

		// emit a render event to beginn rendering the new page
		window.dispatchEvent(new Event('render'));
	}
}

export { OVR_Router };
