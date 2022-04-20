import data from './data.json';
import {Functions} from './functions';
import { MessageService } from '@theia/core';
import { HelloBackendService } from '../common/protocol';


/*interface Textfield{
	ident: number;
	value: string;
};*/


export class BehavioralPatterns{

    static functions = new Functions();
	static values = JSON.parse(JSON.stringify(data));
	
    behavioralPatternsWizard(divCont: HTMLDivElement, messageService: MessageService, helloBackendService: HelloBackendService){
			divCont.innerHTML = "";
			let divCont1 = document.createElement('div');
			BehavioralPatterns.functions.radioQuestion('<br> Do you need an Object that will handle requests for executing an action? <br>', 'Yes', 'No', 'radio31', 'radio32', divCont);

			let radio31 = document.getElementById('radio31') as HTMLInputElement;
            radio31.addEventListener('click', async (e: Event) =>{
                let divCont2 = document.createElement('div');
				BehavioralPatterns.functions.radioQuestion('<br>Is the recepient of the request known? <br>', 'Yes', 'No', 'radio311', 'radio312', divCont1);
				let radio311 = document.getElementById('radio311') as HTMLInputElement;
				radio311.addEventListener('click', async (e: Event) =>{
					divCont2.innerHTML = "";
					let divCont3 = document.createElement('div');
					BehavioralPatterns.functions.radioQuestion('<br>Is the receiver part of a comple component, whose internal structure you want to hide? <br>', 'Yes', 'No', 'radio3111', 'radio3112', divCont2);
					let radio3111 = document.getElementById("radio3111") as HTMLInputElement;
					radio3111.addEventListener('click', async(e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						BehavioralPatterns.functions.textfieldQuestion('<br> Insert the name of the Mediator, the interface that declares the connection method<br>', 1, 'text', 'Mediator name', 'txtboxMediator', 'infoField', 'buttonNext', divCont3);
						let buttonNext = document.getElementById('buttonNext') as HTMLButtonElement;
						buttonNext.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							let divCont5 = document.createElement('div');
							BehavioralPatterns.functions.textfieldQuestion('<br>How many Concrete Mediators(classes that implement the connection in a diffirent way) exist? <br>',  1, 'number', '1', 'numOfConcreteMediators', '', 'buttonNext1', divCont4);;
							let buttonNext1 = document.getElementById('buttonNext1') as HTMLButtonElement;
							buttonNext1.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								let divCont6 = document.createElement('div');
								BehavioralPatterns.functions.textfieldQuestion("<br> Insert the names of the Concrete Mediators <br>", parseInt((document.getElementById('numOfConcreteMediators') as HTMLInputElement).value), 'text', "Subclass's name ", 'txtboxConcreteImplementation', 'infoField', 'buttonNext2', divCont5);
								let buttonNext2 = document.getElementById('buttonNext2') as HTMLButtonElement;
								buttonNext2.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									BehavioralPatterns.functions.textfieldQuestion('<br>How many Components(classes that need to be connected) exist? <br>',  1, 'number', '1', 'numOfConmponents', '', 'buttonNext3', divCont4);;
									let buttonNext3 = document.getElementById('buttonNext3') as HTMLButtonElement;
									buttonNext3.addEventListener('click', async (e: Event) =>{
										divCont5.innerHTML = "";
										let divCont6 = document.createElement('div');
										BehavioralPatterns.functions.textfieldQuestion("<br> Insert the names of the Concrete Components <br>", parseInt((document.getElementById('numOfConmponents') as HTMLInputElement).value), 'text', "Subclass's name ", 'txtboxConcreteImplementation', 'infoField', 'buttonNext4', divCont5);
										let buttonNext4 = document.getElementById('buttonNext4') as HTMLButtonElement;
										buttonNext4.addEventListener('click', async (e: Event) =>{
											divCont6.innerHTML = "";
											let divCont7 = document.createElement('div');
											BehavioralPatterns.functions.createLabel('<br> <b>Mediator Pattern</b>  ', '', divCont7);
											BehavioralPatterns.functions.createButton('Get Code', 'getcodeBridgePattern', divCont7);
											let buttonCodeBP = document.getElementById('getcodeBridgePattern') as HTMLButtonElement;
											buttonCodeBP.addEventListener('click', async (e: Event) =>{
											});
											divCont6.append(divCont7);
										});
										
									});
									
								});
								divCont5.append(divCont6);
							});
							divCont4.appendChild(divCont5);
						});
						divCont3.appendChild(divCont4);
					});
					let radio3112 = document.getElementById("radio3112") as HTMLInputElement;
					radio3112.addEventListener('click', async(e: Event) =>{
						
					});
                    divCont2.appendChild(divCont3);
                });
                let radio312= document.getElementById('radio312') as HTMLInputElement;
				radio312.addEventListener('click', async (e: Event) =>{
                });
				divCont1.appendChild(divCont2);
            });
			
            let radio32 = document.getElementById('radio32') as HTMLInputElement;
            radio32.addEventListener('click', async (e: Event) =>{	

            });

            divCont.appendChild(divCont1);
		}
    } 
