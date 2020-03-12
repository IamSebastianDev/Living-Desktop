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
                    <div class="tasks-Container">
                    <div class="tasks-Input">
                        <input autofocus placeholder="Enter your task..." type="text" ${m.bind(
							'change',
							() => {
								this.task = event.target.value;
							},
							{ passive: true }
						)}>
                        <button ${m.bind('click', () => {
							if (this.task) {
								this.tasks.push({
									id: JSON.stringify(Date.now()),
									body: this.task
								});

								localStorage.setItem(
									'tasks',
									JSON.stringify(this.tasks)
								);

								delete this.task;
							}
						})}>Submit</button>
                        </div>
                        <div class="tasks-List">
                            ${m.forEach(
								'elem',
								this.tasks,
								`<div data-taskID='@elem.id@'>
                                <p>@elem.body@</p>
                                <button ${m.bind('click', () => {
									this.tasks = this.tasks.filter(
										elem =>
											event.target.parentElement.dataset
												.taskid != elem.id
									);

									localStorage.setItem(
										'tasks',
										JSON.stringify(this.tasks)
									);
								})}>&#10005;</button>
                            </div>`
							)}
                        </div>
                    </div>
				</template>
			`;
		}
	},

	props: {
		tasks: JSON.parse(localStorage.getItem('tasks')) || []
	},

	style() {
		return `
			<style scoped>
				.tasks-Container{
					margin: ${this.tasks.length === 0 ? '13.5px' : '140px'} 10px 80px;
					
					display: flex; 
					flex-direction: column; 
					justify-content: flex-start; 
					align-items: center; 

				}
				
				.tasks-Input{
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

				.tasks-Input input{

					font-size: 1.6rem;
					font-weight: 300;
					font-family: "Comfortaa", sans-serif;

					color: var(--light); 

					padding: 15px 10px;
					width: 100%;

					background: none;
					border: none;
				}

				.tasks-Input input:focus {
					outline: none;
				}

				.tasks-Input button{

					background: rgba(0,0,0,0.25); 
					border: none; 
					border-radius: 0px 5px 5px 0px;

					padding: 15px 25px;

					font-size: 1.6rem;
					font-weight: 300;
					font-family: "Comfortaa", sans-serif;

					color: var(--light); 

					cursor: pointer; 

					transition: 0.3s ease; 
				}

				.tasks-Input button:hover{
					text-shadow: 0px 2px 2px rgba(0,0,0,0.5);  
					color: var(--accent);
					padding: 15px 35px;
				}

				.tasks-Input button:focus {
					outline: none; 
				}

				.tasks-List{
					width: 100%;

					font-size: 1.4rem;
					font-weight: 300;
					font-family: "Comfortaa", sans-serif;
					line-height: 1.8rem;

					color: var(--light); 

					overflow-Y: scroll;
				}
				.tasks-List::-webkit-scrollbar {
					display: none; // Safari and Chrome
				}

				.tasks-List div{
					display: flex; 
					justify-content: space-between; 

					margin: 10px 0px; 
					padding: 10px; 
					height: auto; 

					background: var(--dark); 
					backdrop-filter: blur(30px); 
					-webkit-backdrop-filter: blur(30px); 

					border-radius: 5px; 
					box-shadow: var(--shadow); 
				}

				.tasks-List p{
					padding: 0 8px 0 0; 
					margin: auto 0; 

					word-break: break-all;
					word-wrap: break-word;
				}

				.tasks-List button {
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

				.tasks-List button:hover{
					color: var(--accent); 
					text-shadow: 0px 2px 4px rgba(0,0,0,0.5); 
				}

				.tasks-List button:focus{
					outline: none; 
				}

			</style>
		`;
	}
};

// As this is a regular JS File, you can add JS whereever you want. The JS will be executed as soon as the file is imported by another file.
