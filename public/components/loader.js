/** @format */
/*
	This is an empty template/component file.
	Use this to build your own components or expand the example app.
*/

// import components
import { app } from '../scripts/app.js'; // the app is imported by default
import { store } from '../application/ovr-store.js'; // import the store -> you can delete this if you don't need it

export default {
	template: {
		render(m) {
			return `
				<template>
					<div class="loader-Container">
						<span class="loader-Circle"></span>
					</div>
				</template>
			`;
		}
	},

	props: {},

	style() {
		return `
			<style>
				.loader-Container{
					height: 50px;
					width: 50px;
					border-radius: 50%;   

					display: flex; 
					justify-content: center; 
					align-items: center; 

					background: var(--colorDark); 
				}

				.loader-Circle{
					display: block; 
					width: 30px; 
					height: 30px; 
					border: 2px solid var(--colorLightTrans); 
					border-left-color: transparent; 
					border-right-color: transparent; 
					border-radius: 50%; 

					animation: loaderSpin 1s ease infinite;
				}

				@keyframes loaderSpin{
					from {transform: rotate(0deg)}
					to {transform: rotate(360deg)}
				}
			</style>
		`;
	}
};

// As this is a regular JS File, you can add JS whereever you want. The JS will be executed as soon as the file is imported by another file.
