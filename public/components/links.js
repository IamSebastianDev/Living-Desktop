/** @format */
/*
	This is an empty template/component file.
	Use this to build your own components or expand the example app.
*/

// import components
import { app } from '../scripts/app.js'; // the app is imported by default
import { store } from '../application/ovr-store.js'; // import the store -> you can delete this if you don't need it

const fetchLinkData = async link => {
	return await fetch(
		`https://api.linkpreview.net/?key=5dedf580b99bbd7dbbf97d5b7816a6a0a5e9dab2ba670&q=${link}`,
		{
			mode: 'cors',
			credentials: 'same-origin'
		}
	)
		.then(res => res.json())
		.then(data => data)
		.catch(err => console.log(err));
};

export default {
	template: {
		render(m) {
			return `
				<template>
					<div class="links-Container">
					<div class="links-add">
						<input placeholder="${this.link || `Url...`}" ${m.bind(
				'change',
				() => {
					this.link = event.target.value;
				},
				{ passive: true }
			)}>
						<button ${m.bind(
							'click',
							async () => {
								if (this.link) {
									let linkData = await fetchLinkData(
										this.link
									);

									if (!linkData.error) {
										this.links.push({
											_id: Date.now().toString(),
											...linkData
										});
									} else {
										console.log(linkData);
										alert(
											`Hey, something went wrong while fetching the links. Got an errorcode ${linkData.error}!`
										);
									}

									localStorage.setItem(
										'links',
										JSON.stringify(this.links)
									);

									window.dispatchEvent(new Event('render'));

									delete this.link;
								}
							},
							{
								matches: false
							}
						)} class="links-Icon links-AddButton"><i class="material-icons">add</i></button>
					</div>
						${m.forEach(
							'elem',
							this.links,
							`<a ${m.bind(
								'contextmenu',
								() => {
									event.preventDefault();
									this.links = this.links.filter(
										elem =>
											event.target.dataset.linkid ||
											event.target.parentElement.dataset
												.linkid != elem._id
									);

									localStorage.setItem(
										'links',
										JSON.stringify(this.links)
									);

									return false;
								},
								{ matches: false }
							)} data-linkid="@elem._id@" href="@elem.url@" class="links-Icon" target="_blank"><img src="@elem.image@"></a>`
						)}

						<button class="links-Icon"><i class="material-icons">menu</i></button>
					</div>
				</template>
			`;
		}
	},

	props: {
		links: JSON.parse(localStorage.getItem('links')) || []
	},

	style() {
		return `
			<style>
				.links-Container{
					height: 100%; 
					margin-right: 40px; 

					display: flex; 
					justify-content: center; 
					align-items: center; 

					color: var(--colorLight); 
					font-size: 1.6rem; 
					letter-spacing: 1.3px; 
				}

				.links-add{
					height: 50px; 
					max-width: 50px; 

					overflow: hidden; 

					display: flex; 
					justify-content: flex-end;
					align-items: center;  

					background: var(--colorDark); 
					border-radius: 25px; 

					transition: var(--transition); 
				}

				.links-add input{	
					font-size: 1.6rem; 
					background: none; 
					padding: 5px 10px 5px 25px; 
					border: none; 
					outline: none; 

					color: var(--colorLight); 
				}

				.links-add:hover{
					max-width: 450px;
				}



				.links-Icon{
					padding: 0; 
					margin: 0 10px; 

					height: 50px; 
					width: 50px;
					border-radius: 50%; 
					
					border: none; 
					outline: none; 

					flex-shrink: 0; 

					background: var(--colorDarkTrans);

					box-shadow: var(--standardShadow); 
					transition: var(--transition); 

					overflow: hidden; 

					cursor: pointer; 
				}

				.links-AddButton{
					margin: 0px 0px 0px 10px; 
					background: unset;
					box-shadow: unset; 
				}

				.links-Icon:hover{
					background: var(--colorDark);
				}

				.links-Icon i{
					color: var(--colorLight); 
				}

				.links-Icon img{
					opacity: 0.5;
					height: 100%; 
					width: 100%; 
					object-fit: cover;

					border-radius: 50%; 

					transition: var(--transition); 
				}
				.links-Icon img:hover{
					opacity: 1;
				}
			</style>
		`;
	}
};

// As this is a regular JS File, you can add JS whereever you want. The JS will be executed as soon as the file is imported by another file.
