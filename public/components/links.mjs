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
		`http://api.linkpreview.net/?key=5dedf580b99bbd7dbbf97d5b7816a6a0a5e9dab2ba670&q=${link}`,
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
                    <div class="links-Input">
                        <input placeholder="Enter a URL" type="text" ${m.bind(
							'change',
							() => {
								this.link = event.target.value;
							},
							{ passive: true }
						)}>
                        <button ${m.bind('click', async () => {
							if (this.link) {
								await this.links.push({
									id: JSON.stringify(Date.now()),
									...(await fetchLinkData(this.link))
								});

								localStorage.setItem(
									'links',
									JSON.stringify(this.links)
								);

								window.dispatchEvent(new Event('render'));

								delete this.link;
							}
						})}>&#10011;</button>
                        </div>
                        <div class="links-List">
                            ${m.forEach(
								'elem',
								this.links,
								`<a href="@elem.url@" data-linkid='@elem.id@'>
								<img src="@elem.image@">
                                <p>@elem.title@</p>
                                <button ${m.bind('click', () => {
									event.preventDefault();
									this.links = this.links.filter(
										elem =>
											event.target.parentElement.dataset
												.linkid != elem.id
									);

									localStorage.setItem(
										'links',
										JSON.stringify(this.links)
									);
								})}>&#10005;</button>
                            </a>`
							)}
                        </div>
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
			<style scoped>
				.links-Container{
					margin: 100px 10px 80px;
					
					display: flex; 
					flex-direction: column; 
					justify-content: flex-start; 
					align-items: center; 

					grid-area: links

				}
				
				.links-Input{
					display: flex; 
					justify-content: center;
					align-items: center;

					width: 100%; 
					margin-bottom: 10px; 

					background: var(--dark);
					border-radius: 5px;

					backdrop-filter: blur(30px);
					-webkit-backdrop-filter: blur(30px);

					box-shadow: var(--shadow);
				}

				.links-Input input{

					font-size: 1.6rem;
					font-weight: 300;
					font-family: "Comfortaa", sans-serif;

					color: var(--light); 

					padding: 15px 10px;
					width: 100%;

					background: none;
					border: none;
				}

				.links-Input input:focus {
					outline: none;
				}

				.links-Input button{

					background: transparent; 
					border: none; 
					border-radius: 0px 5px 5px 0px;

					padding: 15px 15px;

					font-size: 1.8rem;
					font-weight: 300;
					font-family: "Comfortaa", sans-serif;

					color: var(--light); 

					cursor: pointer; 

					transition: 0.3s ease; 
				}

				.links-Input button:hover{
					text-shadow: 0px 2px 2px rgba(0,0,0,0.5);  
					color: var(--accent);
				}

				.links-Input button:focus {
					outline: none; 
				}

				.links-List{
					width: 100%;

					font-size: 1.4rem;
					font-weight: 300;
					font-family: "Comfortaa", sans-serif;
					line-height: 1.8rem;

					color: var(--light); 

					overflow-Y: scroll;
					overflow-X: visible; 
				}
				.links-List::-webkit-scrollbar {
					display: none; // Safari and Chrome
				}

				.links-List img{
					height: 45px; 
					width: 45px; 

					object-fit: contain; 
				}

				.links-List a{
					display: flex; 
					justify-content: space-between; 

					margin: 10px 0px; 
					padding: 10px; 
					height: auto; 

					color: var(--lightColor); 
					text-decoration: none; 

					background: var(--dark); 
					backdrop-filter: blur(30px); 
					-webkit-backdrop-filter: blur(30px); 

					border-radius: 5px; 
					box-shadow: var(--shadow); 
				}

				.links-List p{
					padding: 0 8px 0 0; 
					margin: auto 0; 

					word-break: break-word;
					word-wrap: break-word;
				}

				.links-List button {
					padding: 0px 0px 0px 10px;

					background: none; 

					border: none; 
					border-left: 0.5px solid rgba(255,255,255,0.25); 

					color: var(--light); 
					font-weight: 300; 
					font-size: 2rem; 

					user-select: none; 
					-webkit-user-select: none; 
					 
					cursor: pointer;
					transition: 0.3s ease;
				}

				.links-List button:hover{
					color: var(--accent); 
					text-shadow: 0px 2px 4px rgba(0,0,0,0.5); 
				}

				.links-List button:focus{
					outline: none; 
				}

			</style>
		`;
	}
};

// As this is a regular JS File, you can add JS whereever you want. The JS will be executed as soon as the file is imported by another file.
