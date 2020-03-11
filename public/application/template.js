/** @format */
/*
	This is an empty template/component file.
	Use this to build your own components or expand the example app.
*/

// import components
import { app } from '../scripts/app.js'; // the app is imported by default
import { store } from '../application/ovr-store'; // import the store -> you can delete this if you don't need it

export default {
	template: {
		render(m) {
			return `
				<template>
					
				</template>
			`;
		}
	},

	props: {},

	style() {
		return `
			<style scoped>
				
			</style>
		`;
	}
};

// As this is a regular JS File, you can add JS whereever you want. The JS will be executed as soon as the file is imported by another file.
