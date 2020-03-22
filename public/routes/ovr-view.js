/** @format */

// import components
import { app } from '../scripts/app.js'; // the app is imported by default
import { store } from '../application/ovr-store.js';

import taskContainer from '../components/task-Container.js';
import weather from '../components/weather.js';
import links from '../components/links.js';

export default {
	template: {
		render(m) {
			return `
				<template>
					<div class="container">
						<div class="container-TopRow">
							<button>
								<i class="material-icons">chevron_left</i>
							</button>

							<span class="global-BoldText">Today</span>
							<span>Tomorrow</span>
							<span>Weekend</span>
							<span>Next week</span>
							<span>Next month</span>

							<button>
								<i class="material-icons">chevron_right</i>
							</button>
						</div>
						<div></div>
							${m.insert(taskContainer, { key: 'today' })}
							${m.insert(taskContainer, { key: 'tomorrow' })}
							${m.insert(taskContainer, { key: 'weekend' })}
							${m.insert(taskContainer, { key: 'week' })}
							${m.insert(taskContainer, { key: 'month' })}
						<div></div>
						<div class="container-BottomRow">
						${m.insert(weather)}
						${m.insert(links)}
						</div>
					</div>


				</template>
			`;
		}
	},

	props: {
		keys: ['today', 'tomorrow', 'weekend', 'week', 'month']
	},

	style() {
		return `
			<style scoped>
				.container {
					width: 100vw;
					height: 100vh;

					overflow: hidden;

					background: var(--colorDark);
					background-image: url('https://picsum.photos/1920/1080');
					background-attachment: fixed;
					background-position: center;
					background-size: cover;

					display: grid;
					grid-template-columns: 30px repeat(5, 1fr) 30px;
					grid-template-rows: 50px 1fr;
					grid-column-gap: 16px;

					justify-items: center;
				}

				.container-TopRow {
					width: 100%;
					height: 100%;

					grid-column: 1 / 8;

					display: grid;
					grid-template-columns: 30px repeat(5, 1fr) 30px;
					grid-column-gap: 16px;
					justify-items: center;
					align-items: center;

					font-size: 1.6em;
					color: var(--colorLight);

					background: var(--colorDarkTrans);
					backdrop-filter: blur(5px);
					-webkit-backdrop-filter: blue(5px);
				}

				.container-TopRow button {
					width: 100%;
					height: 100%;

					display: flex;
					justify-content: center;
					align-items: center;

					padding: 0;
					margin: 0;

					border: none;
					background: none;
					outline: none;

					color: var(--colorLight);
					cursor: pointer;
					transition: var(--transition);
				}

				.container-TopRow button:hover {
					color: var(--colorRed);
				}

				.container-TopRow i {
					font-size: 3em;
				}

				.container-BottomRow{
					position: fixed; 
					bottom: 20px;
					
					height: 50px; 
					width: 100vw; 

					display: flex; 
					flex-direction: row; 
					justify-content: space-between; 
					align-items: center; 
				}

				
			</style>
		`;
	}
};
