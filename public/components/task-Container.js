/** @format */
/*
	This is an empty template/component file.
	Use this to build your own components or expand the example app.
*/

// import components
import { app } from '../scripts/app.js'; // the app is imported by default
import { store } from '../application/ovr-store.js'; // import the store -> you can delete this if you don't need it

import taskInput from './weather.js';

export default {
	template: {
		render(m) {
			this.getTasks(this.key);
			return `
				<template>
					<div class="task-Container">
						<div class="task-Input">
							<input class="task-Textfield" placeholder="Enter your Task" ${m.bind(
								'change',
								() => {
									this.task.input = event.target.value;
								},
								{ passive: true }
							)}/>
							<div class="task-ColorSelect">
								<input
									checked
									type="radio"
									name="color-Select-${this.key}"
									value="var(--colorDarkTrans)"
									style="background: var(--colorDark)"
									${m.bind(
										'change',
										() => {
											this.task.color =
												event.target.value;
										},
										{ passive: true }
									)}
								/>

								<input
									type="radio"
									name="color-Select-${this.key}"
									value="var(--colorRed)"
									style="background: var(--colorRed)"
									${m.bind(
										'change',
										() => {
											this.task.color =
												event.target.value;
										},
										{ passive: true }
									)}
								/>

								<input
									type="radio"
									name="color-Select-${this.key}"
									value="var(--colorBlue)"
									style="background: var(--colorBlue)"
									${m.bind(
										'change',
										() => {
											this.task.color =
												event.target.value;
										},
										{ passive: true }
									)}
								/>

								<input
									type="radio"
									name="color-Select-${this.key}"
									value="var(--colorGreen)"
									style="background: var(--colorGreen)"
									${m.bind(
										'change',
										() => {
											this.task.color =
												event.target.value;
										},
										{ passive: true }
									)}
								/>
							</div>
							<button class="test" ${m.bind(
								'click',
								this.saveTasks.bind(this),
								{
									matches: false
								},
								{ ...this }
							)}><i class="material-icons">add</i></button>
						</div>
						<div class="task-List">
						${m.forEach(
							'elem',
							this[this.key],
							`<div class="task" data-id="@elem._id@" style="color: @elem.textColor@; background:@elem.color@"><p data-completed="@elem.completed@">@elem.body@</p><div class="task-controls" style="border-color: @elem.textColor@"><button ${m.bind(
								'click',
								this.deleteTask.bind(this),
								{ matches: false },
								{
									...this
								}
							)}><i style="color: @elem.textColor@" class="material-icons">clear</i></button>
							<button ${m.bind(
								'click',
								this.checkTask.bind(this),
								{ matches: false },
								{ ...this }
							)}><i style="color: @elem.textColor@" class="material-icons">@elem.checkbox@</i></button></div></div>`
						)}
						</div>
					</div>
				</template>
			`;
		}
	},

	props: {
		task: {
			color: 'var(--colorDarkTrans)'
		},
		getTasks(key) {
			this[key] = JSON.parse(localStorage.getItem(key)) || [];
		},
		saveTasks(self) {
			console.log(self);
			if (self.task.input && self.task.color) {
				self[self.key].push({
					_id: Date.now().toString(),
					body: self.task.input,
					color: self.task.color,
					textColor:
						self.task.color === 'var(--colorDarkTrans)'
							? 'var(--colorLight)'
							: 'var(--colorDark)',
					completed: false,
					checkbox: 'check_box_outline_blank'
				});
			}

			localStorage.setItem(self.key, JSON.stringify(self[self.key]));

			self.task.input = undefined;
		},
		deleteTask(self) {
			let id =
				event.target.parentElement.parentElement.parentElement.dataset
					.id || event.target.parentElement.parentElement.dataset.id;

			self[self.key] = self[self.key].filter(elem => id != elem._id);

			localStorage.setItem(self.key, JSON.stringify(self[self.key]));
		},
		checkTask(self) {
			let id =
				event.target.parentElement.parentElement.parentElement.dataset
					.id || event.target.parentElement.parentElement.dataset.id;

			self[self.key].forEach(elem => {
				if (elem._id === id) {
					if (elem.completed) {
						elem.checkbox = 'check_box_outline_blank';
						elem.completed = false;
					} else {
						elem.checkbox = 'check_box';
						elem.completed = true;
					}
				}
			});

			localStorage.setItem(self.key, JSON.stringify(self[self.key]));
		},
		taskList: []
	},

	style() {
		return `
			<style>
				.task-Container{

					width: 100%; 
					padding: 10px 0 90px;
					
					display: flex; 
					flex-direction: column; 
					justify-content: flex-start;
					align-items: center; 

				}

				.task-List {
					margin-top: 10px; 

					width: 100%; 
					height: calc(100vh - 120px - 90px); 

					overflow-y: scroll; 
				}

				.task-List::-webkit-scrollbar {
					display: none; // Safari and Chrome
				}

				.task-Input{
					width: 100%; 
					max-height: 50px; 
					min-height: 50px; 

					display: flex; 
					flex-direction: row; 
					justify-content: center;
					align-items: center; 

					border-radius: 5px; 

					background: var(--colorDarkTrans);

					opacity: 0.5;
					transition: var(--transition); 
				}

				.task-Input:hover, .task-Input:focus{
					opacity: 1;
					background: var(--colorLight); 
					color: var(--colorDark); 

					box-shadow: var(--focusShadow)
				}

				.task-ColorSelect{
					margin-left: auto; 

					user-select: none;
					-webkit-user-select: none; 
				}

				.task-Input input[type="radio"]{
					-webkit-appearance: none;
					-moz-appearance: none;
					appearance: none;

					width: 12px; 
					height: 12px;

					margin: 2px; 


					border-radius: 6px;  
					opacity: 0.6; 
				}

				.task-Textfield{
					font-size: 1.6rem; 
					padding: 10px;

					background: none; 
					border: none; 

				}

				.task-Textfield:focus{
					outline: none; 
				}

				.task-Input input[type="radio"]:checked {
					opacity: 1; 
				}
				.task-Input input[type="radio"]:focus {
					outline: none; 
				}

				.task-Input button {
					background: none; 
					border: none; 
					color: var(--colorDark)
					opacity: 0.6;
					transition: var(--transition); 

					user-select: none;
					-webkit-user-select: none;
				}

				.task-Input button:hover{
					opacity: 1; 
				}
				.task-Input button:focus{
					outline: none; 
				}

				.task{
					padding: 10px 0; 
					margin-bottom: 10px; 
					width: 100%; 

					display: flex; 
					flex-direction: row; 
					justify-content: space-between; 

					border-radius: 5px; 

				}

				.task p{
					padding: 0px;
					margin: 0px 10px; 
					font-size: 1.6em;
					
					word-break: break-word;
					word-wrap: break-word;

					align-self: center; 
				}

				.task p[data-completed="true"]{
					text-decoration: line-through;
				}

				.task-controls{
					
					display: flex; 
					flex-direction: column; 
					align-items: center; 
					justify-content: center; 

					border-left: 1px solid var(--colorDarkTrans); 
				}

				.task-controls button{
					background: none; 
					border: none; 

					user-select: none; 
					-webkit-user-select: none; 
					
					
					opacity: 0.5;
					 
					cursor: pointer;
					transition: var(--transition);
				}

				.task-controls button:hover {
					opacity: 1;
				}

				.task-controls button:focus {
					outline: none; 
				}

				.task-controls button i{

					font-size: 1.6rem; 
				}


			</style>
		`;
	}
};

// As this is a regular JS File, you can add JS whereever you want. The JS will be executed as soon as the file is imported by another file.
