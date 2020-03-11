/** @format */

/*

	This is the mainview of your over app

	The template consists of three things. 
        @template: The template section is where you can define your HTML
        @props: This is where you should put your data, that you want to access inside your Template HTML (and css if you want)
        @style: This is where you can put in your styles. Those get rendered to the HTML, so they superceed your stylesheets.

*/

// import components
import { app } from '../scripts/app.js'; // the app is imported by default
import { store } from '../application/ovr-store.js';

export default {
	/*
		This is the template part of the view.
		You can define your HTML here, it will then be rendered to the app tag
			@note: you have access to the over Methods using the m.[method] argument.
			@note: if you do not have a return `<template> </template>` string, the render will fail
			@note: you have access to your props using this.[properyname] inside a ${} expression. 
		
		-- if you want to take a closer look, read about template literals

			@note: to use nested components, use the m.insert method, pass in the imported name of the component,
				   the insert method does the rest
				   -- the insert method accepts a object as second parameter, that you can use to pass in props

			@note: You can use inline styles inside your HTML
	*/

	template: {
		render(m) {
			return `
				<template>
					<h1>${this.title}</h1>
				</template>
			`;
		}
	},

	/*
		props get passed into here
	 	props are scoped to the template they're in.
			@note: You can still access them by referencing them directly using 
				   import the template and access them via <import>.props.<key>
			@note: Props can be anything, strings, numbers, booleans, functions
	*/

	props: { title: 'Hello World!' },

	/*
		The styles you define here will be added to the style tag inside the app tag. 
		Styling them here is a pure convinience - the templates will render without a style method. 
		Styles can also be optionally scoped. Please note, that feature is currently under development and has a million edgecases.
		I have planed to write a complete CSS Parser that will create a proper scoped style.
			@note: Styles inside the style method will override styles inside your stylesheets
			@note: You have acces to your props inside the style function using this.[properyname] inside a ${} expression.
	*/

	style() {
		return `
			<style scoped>
				
			</style>
		`;
	}
};
