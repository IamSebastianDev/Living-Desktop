/** @format */
/*
	This is an empty template/component file.
	Use this to build your own components or expand the example app.
*/

// import components
import { app } from '../scripts/app.js'; // the app is imported by default
import { store } from '../application/ovr-store.js'; // import the store -> you can delete this if you don't need it

const fetchWeather = () => {
	console.log('winner winner chicken dinner');
	let key = '7f0e0a9358d7853f176ffbce49c11ce1';

	navigator.geolocation.getCurrentPosition(
		async pos => {
			let data = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${key}&units=metric`
			).then(data => data.json());
			console.log(data);

			if (data.cod === 429) {
				data = {
					main: {
						temp: 0
					},
					weather: [
						{
							main: '--',
							id: 802
						}
					]
				};
			}

			store.set('weather', data);

			window.dispatchEvent(new Event('render'));
		},
		err => {
			console.log(err);
		}
	);
};

fetchWeather();

export default {
	template: {
		render(m) {
			return `
				<template>
					<div class="weather-Container">
						<span
							>${
								store.get('weather')
									? store
											.get('weather')
											.main.temp.toFixed(1)
											.replace('.', ',')
									: '--'
							}°c
							-
							${store.get('weather') ? store.get('weather').weather[0].main : '--'}</span
						>
						${
							store.get('weather')
								? `<i class="owf owf-${
										store.get('weather').weather[0].id
								  } owf-lg"></i>`
								: ''
						}
						<button class="weather-Refresh" ${m.bind('click', fetchWeather, {
							matches: false
						})}><i class="material-icons">refresh</i></button>
					</div>

				</template>
			`;
		}
	},

	props: {
		data: {}
	},

	style() {
		return `
			<style>
				.weather-Container{
					height: 100%; 
					margin-left: 40px; 
					padding: 0 15px; 

					display: flex; 
					justify-content: center; 
					align-items: center; 
					

					border-radius: 25px; 
					background: var(--colorDarkTrans); 

					box-shadow: var(--standardShadow);

					color: var(--colorLight); 
					font-size: 1.6rem; 
					letter-spacing: 1.3px; 

					backdrop-filter: blur(5px); 
					-webkit-backdrop-filter: blur(5px); 
				}

				.weather-Container i {
					margin-left: 10px; 
				}
				
				.weather-Refresh{
					margin: 0 0 0 10px; 
					padding: 0;

					background: none; 
					border: none; 
					outline: none; 

					filter: brightness(0.8); 
					transition: var(--transition); 

					cursor: pointer; 
				}

				.weather-Refresh:hover{
					filter: brightness(1); 
				}

				.weather-Refresh:focus{
					outline: none; 
				}

				.weather-Refresh i{
					margin: 0; 
					padding: 0; 
					color: var(--colorLight); 
				}

			</style>
		`;
	}
};

// As this is a regular JS File, you can add JS whereever you want. The JS will be executed as soon as the file is imported by another file.
