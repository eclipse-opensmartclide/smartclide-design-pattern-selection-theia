import data from './data.json';
import {Functions} from './functions';
import { MessageService } from '@theia/core';
import { HelloBackendService } from '../common/protocol';


/*interface Textfield{
	ident: number;
	value: string;
};
*/

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
					BehavioralPatterns.functions.textfieldQuestion('<br> Insert the name of the Mediator, the interface that declares the connection method<br>', 1, 'text', 'Mediator name', 'txtboxMediator', 'infoField', 'buttonNext', divCont2);
					let buttonNext = document.getElementById('buttonNext') as HTMLButtonElement;
                    buttonNext.addEventListener('click', async (e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						BehavioralPatterns.functions.textfieldQuestion('<br> How many Concrete Mediators(classes that implement the connection in a different way) exist? <br>', 1, 'number', '1', 'subcategoriesNum', '', 'buttonNext1', divCont3);
						let buttonNext1 = document.getElementById('buttonNext1') as HTMLButtonElement;
						buttonNext1.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
                        });
                        divCont3.append(divCont4);
                    }); 
                    divCont2.appendChild(divCont3);
                });
                let radio312= document.getElementById('radio312') as HTMLInputElement;
				radio312.addEventListener('click', async (e: Event) =>{
                });

            });
            let radio32 = document.getElementById('radio32') as HTMLInputElement;
            radio32.addEventListener('click', async (e: Event) =>{	

            });
            divCont.appendChild(divCont1);
    } 
}