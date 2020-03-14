/** @format */

// import components
import { app } from '../scripts/app.js'; // the app is imported by default
import { store } from '../application/ovr-store.js';

// importing components
import weather from '../components/weather.mjs';
import tasks from '../components/tasks.mjs';
import links from '../components/links.mjs';

export default {
	template: {
		render(m) {
			return `
				<template>
					<div class="container-FullWidth">
						<div class="topBar-FullWidth">
						${m.insert(weather)}
						</div>
						<div class="container-Content">
							${m.insert(tasks)}
							${m.insert(links)}
						</div>
					</div>
				</template>
			`;
		}
	},
	props: {},
	style() {
		return `
			<style scoped>
				
				.container-FullWidth {
					width: 100vw; 
					height: 100vh; 


				}

				.topBar-FullWidth {
					position: fixed;
					top: 0; 
					left: 0; 
					
					width: 100vw; 
					height: 75px; 


					display: flex; 
					justify-content: center; 
					align-items: center; 

				}

				.container-Content {
					width: auto; 
					padding: 0 50px; 
					height: 100vh; 

					display: grid; 
					grid-template-columns: 1fr 2fr 1fr;
					grid-template-rows: 100vh; 

					grid-template-areas: "tasks . links" 
				}

			</style>
		`;
	}
};
