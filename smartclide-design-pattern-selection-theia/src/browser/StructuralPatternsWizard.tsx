
import { inject } from 'inversify';
import {Functions} from './functions';
import { MessageService } from '@theia/core';
import { HelloBackendService } from '../common/protocol';



export class StructuralPatterns{
    @inject(MessageService)
    protected readonly messageService!: MessageService;
	@inject(HelloBackendService)
	protected readonly helloBackendService: HelloBackendService;

    static functions = new Functions();
    structuralPatternswizard(){
        let divCont = document.getElementById('divCont') as HTMLDivElement;
		divCont.innerHTML = "";
		let divCont2 = document.createElement('div');
		StructuralPatterns.functions.radioQuestion('<br> Do you need to implement a function that requires information from two different hierarchies?<br>', 'Yes', 'No', 'radio11', 'radio12', divCont);
		let radio11 = document.getElementById('radio11') as HTMLInputElement;
		radio11.addEventListener('click', async (e: Event) =>{	
				divCont2.innerHTML ="";
        });
    } 
}