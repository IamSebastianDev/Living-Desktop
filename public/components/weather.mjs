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
					<div class="weather-Container">
						<p>Weather in</p>
						<span class="weather-Location"
							>${this.weather.location}</span
						>
						<p>-</p>
						<span class="weather-Temp">${this.weather.temp}°c</span>
						<p>
							-
						</p>
						<span class="weather-Desc">${this.weather.desc}</span
						><img
							class="weather-Icon"
							src="https://openweathermap.org/img/wn/${this.weather.icon}@2x.png"
						/>
					</div>
				</template>
			`;
		}
	},

	props: {
		weather: {
			location: 'Munich',
			temp: 14.1,
			desc: 'Clouds',
			icon: '03n'
		}
	},

	style() {
		return `
			<style scoped>
				.weather-Container {
                    display: flex;
                    flex-direction: row; 
                    justify-content: center; 
                    align-items: center; 

                    color: var(--light); 
                    font-size: 1.6rem; 
                }

                .weather-Container p{
                    margin: auto 4px;
                }

                .weather-Location{
                    font-weight: 700; 
                    text-transform: uppercase;
                }

                .weather-Icon{
                    height: 30px; 
                    width: 30px; 
                }
			</style>
		`;
	}
};

// As this is a regular JS File, you can add JS whereever you want. The JS will be executed as soon as the file is imported by another file.
