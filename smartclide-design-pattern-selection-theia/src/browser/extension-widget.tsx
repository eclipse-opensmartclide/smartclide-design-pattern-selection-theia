import * as React from 'react';

import { injectable, postConstruct, inject } from 'inversify';
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';

import { HelloBackendService } from '../common/protocol';
import data from './data.json';
import explanation from './explanation.json';
import {Functions} from './functions';
import { CreationalPatterns } from './CreationalPatternsWizard';
import { StructuralPatterns} from './StructuralPatternsWizard';

interface Textfield{
	ident: number;
	value: string;
};

@injectable()
export class extensionWidget extends ReactWidget {
	
	[x: string]: any;

    static readonly ID = 'smartclide-design-pattern-selection-theia:widget';
    static readonly LABEL = 'Smartclide Design Pattern Selection';
	
    static state = {
		statePatternSelection: ''
	}
	
    @inject(MessageService)
    protected readonly messageService!: MessageService;
	@inject(HelloBackendService)
	protected readonly helloBackendService: HelloBackendService;
    

	@postConstruct()
	protected async init(): Promise < void> {
		this.id = extensionWidget.ID;
		this.title.label = extensionWidget.LABEL;
		this.title.caption = extensionWidget.LABEL;
		this.title.closable = true;
		this.title.iconClass = 'fa fa-info-circle';
		this.update();
	}
	
	static setState: any;
	static res: string[];
	static methodNames: string[];
	
	static data = JSON.parse(JSON.stringify(data));
	static explanation = JSON.parse(JSON.stringify(explanation));

	static functions = new Functions();
	static creationalPatterns = new CreationalPatterns();
	static structuralPatterns = new StructuralPatterns();
	protected render(): React.ReactNode {
		const header = `Choose a Design Pattern and get the code. `;
		
		return <div id='widget-container'>
		<AlertMessage type='INFO' header={header} />
		
		<div id='issues'>
				<br />
				<select id="drop-down-patterns" onChange={this.updateSelection } name="statePatternSelection">
						<option id="empty-choice" value="Choose_pattern">Choose pattern</option>
					<optgroup label="Creational">
						<option value="AbstractFactory">Abstract Factory</option>
						<option value="Builder">Builder</option>
						<option value="FactoryMethod">Factory Method</option>
						<option value="Prototype">Prototype</option>
						<option value="Singleton">Singleton</option>
					</optgroup>
					<optgroup label="Structural">
						<option value="Adapter">Adapter</option>
						<option value="Bridge">Bridge</option>
						<option value="Composite">Composite</option>
						<option value="Decorator">Decorator</option>
						<option value="Facade">Facade</option>
						<option value="Flyweight">Flyweight</option>
						<option value="Proxy">Proxy</option>
					</optgroup>
					<optgroup label="Behavioral">
						<option value="ChainOfResponsibility">Chain of Responsibility</option>
						<option value="Command">Command</option>
						<option value="Interpreter">Interpreter</option>
						<option value="Iterator">Iterator</option>
						<option value="Mediator">Mediator</option>
						<option value="Memento">Memento</option>
						<option value="Observer">Observer</option>
						<option value="State">State</option>
						<option value="Strategy">Strategy</option>
						<option value="TemplateMethod">Template Method</option>
						<option value="Visitor">Visitor</option>
					</optgroup>
				</select>
				<button id="btn-refresh" type="button" title='Refresh' onClick={_a => this.refreshPage(document.getElementById('show_pattern_table') as HTMLTableElement)}> <i className = "fa fa-refresh" ></i></button>
				<br /> 
				<br /> 
				<button id="btn-get-code" type="button" title='Assign roles to classes and methods' onClick={_a => this.runprocess()}>Assign roles to classes and methods</button>
				<button id="btn-wizard" type="button" title='Wizard' onClick={_a => this.runWizard()}>Wizard</button>
				<br />
				<br />
				<div id="result">
					<fieldset>
						<details>
							<summary id={'description'}></summary>
							<p id={'example'}></p>
							<img id = "image" alt= "Class Diagram " ></img>
						</details>
					</fieldset>
					<table id="show_pattern_table">
					</table>
					<div id="elements">
						<button id ="btnFinalize" type="button" title='Get the code according to the pattern'  onClick={_a => this.buttonClick2((document.getElementById('show_pattern_table') as HTMLTableElement))}> Get Code </button>
					</div>
				</div>
			</div>

			<div id="divWiz">

			</div>
			</div>
	}
	
    protected async runprocess(): Promise<void> {
		if (extensionWidget.state.statePatternSelection!="Choose_pattern" && extensionWidget.state.statePatternSelection!=""){
			(document.getElementById("btn-get-code") as HTMLButtonElement).style.visibility = 'hidden';
			(document.getElementById("btn-wizard") as HTMLButtonElement).style.visibility = 'hidden';

			var getUrl = window.location.href;
			extensionWidget.res = await this.helloBackendService.sayHelloTo(getUrl);
			extensionWidget.functions.setClassNames(extensionWidget.res);
			
			(document.getElementById("result") as HTMLElement).style.visibility = 'visible';
			(document.getElementById('image') as HTMLImageElement).className = extensionWidget.state.statePatternSelection;
			(document.getElementById('description') as HTMLElement).innerHTML = "<b>"+extensionWidget.state.statePatternSelection.split(/(?=[A-Z])/).join(" ")+"</b> "+extensionWidget.explanation[extensionWidget.state.statePatternSelection].description;
			(document.getElementById('example') as HTMLElement).innerHTML = "<b>Example:</b> "+extensionWidget.explanation[extensionWidget.state.statePatternSelection].example;

			//show the JSON values for the chosen key-pattern
			let values = extensionWidget.data[extensionWidget.state.statePatternSelection].values; //data[extensionWidget.state.statePatternSelection];
			var table = document.getElementById('show_pattern_table') as HTMLTableElement;
			Object.keys(values).forEach(async (key) =>{
				this.insertCells(table, key);
			});

		}else{
			this.messageService.info('You need to choose a software pattern!');
		}
	}
	

    //update the state of dropdown
    updateSelection(e:React.ChangeEvent<HTMLSelectElement>){
		const key =  e.currentTarget.name as keyof typeof extensionWidget.state;
		extensionWidget.state[key]  = e.currentTarget.value;
	}
	
	insertCells(table: HTMLTableElement, key: string,){
		if(extensionWidget.functions.check(key, extensionWidget.state.statePatternSelection)){
			let index = 0;
			for (var i=0; i<table.rows.length; i++){
				let label = (document.getElementById( 'label'+ (i + 1) ) as HTMLLabelElement).innerHTML;
				if (key>label) index++;
			}
			let row = table.insertRow(index);
			let cell1 = row.insertCell(0);
			let cell2 = row.insertCell(1);
			cell2.id = "cell2";
			
			extensionWidget.functions.createLabel(key,"label"+ table.rows.length,cell1);
			extensionWidget.functions.createInput(key, "txtbox"+ table.rows.length,"", "txtbox"+ table.rows.length,"text",cell2)

			cell1.appendChild((document.getElementById('label'+ table.rows.length) as HTMLInputElement));
			cell2.appendChild((document.getElementById('txtbox'+ table.rows.length) as HTMLInputElement));
			if(extensionWidget.data[extensionWidget.state.statePatternSelection].values[key].extension==1){
				let cell3 = row.insertCell(2);
				extensionWidget.functions.createButton("+","btn"+ key,table)
				cell3.appendChild(document.getElementById("btn"+ key) as HTMLButtonElement);
				(document.getElementById("btn"+ key) as HTMLButtonElement).addEventListener('click', (event) => {
					this.extensionButtonClick(table, ( event.target as Element).id, extensionWidget.data[extensionWidget.state.statePatternSelection].values);
				});	
			}	
		}
	}
	//when button is clicked adds one label and one input of the specific class that the user wants to insert one more 
	extensionButtonClick (table: HTMLTableElement, key: string, values: string) {
		let newValues = JSON.parse(JSON.stringify(values));
		let count = this.countKeys(values, key.substring(3, ));
		let label = this.updateLabel(key.substring(3,), count+1);
		if(extensionWidget.state.statePatternSelection=="AbstractFactory"){
			if(key.includes("Product") && !key.includes("ConcreteProduct")){
				count = count - this.countKeys(values,"ConcreteProduct");
				label = this.updateLabel(key.substring(3,), count+1);
				newValues[label] = {name:"",extension:0};
				extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;	
				this.insertCells(table, label);
				var numProd = (this.countKeys(values, "ConcreteProduct") / count);// number of "Products" in each Product
				for(let j = 0 ; j < numProd; j++ ){
					let labelProduct = "ConcreteProduct"+ (count+1) + "."+(j+1);
					newValues[labelProduct]= { "name":"", "extension":0};
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
					this.insertCells(table, labelProduct);
				}
			}else{
				newValues[label] =  { "name":"", "extension":0};
				extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;	
				this.insertCells(table, label);

				let numProd = this.countKeys(newValues, "Product")-this.countKeys(values,"ConcreteProduct"); 
				for(let j = 0; j < numProd ; j++){
					let labelProduct = "ConcreteProduct"+(j+1)+"." + (count+1);
					newValues[labelProduct] = { "name":"", "extension":0};
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;	
					this.insertCells(table, labelProduct);
				}
			}
		}else if(extensionWidget.state.statePatternSelection=="Builder" && key.includes("Product")){
			let labelConBuilder = this.updateLabel("ConcreteBuilder ", count+1);

			newValues[label] =  { "name":"", "extension":0};
			newValues[labelConBuilder] = { "name":"", "extension":0};
			extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;	
			this.insertCells(table, label); 
			this.insertCells(table, labelConBuilder); 
		}else if(extensionWidget.state.statePatternSelection=="FactoryMethod") {
			let labelConCr = this.updateLabel("ConcreteCreator ", count+1);
			
			newValues[label] = { "name":"", "extension":0};
			newValues[labelConCr] = { "name":"", "extension":0};
			extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
			this.insertCells(table, label);				 
			this.insertCells(table, labelConCr); 
		}else if(extensionWidget.state.statePatternSelection=="Decorator" && key.includes("ConcreteDecorator")) {
			let labelConDec = this.updateLabel(key.substring(3,), (count/2+1));
			let labelmethod = labelConDec + "Method";
			
			newValues[label] =  { "name":"", "extension":0};
			newValues[labelmethod] = { "name":"", "extension":0};
			extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;	
			this.insertCells(table, labelConDec); 
			this.insertCells(table, labelmethod); 
		}else if(extensionWidget.state.statePatternSelection=="Flyweight") {	 
			let label = this.updateLabel(key.substring(3,), count/2+1); 
			let labelAttr = label + "Attribute";

			newValues[label] = {"name":"", "extension":0};
			newValues[labelAttr] = {"name":"", "extension":1};
			extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
			this.insertCells(table, label);
			this.insertCells(table, labelAttr);
		}else if(extensionWidget.state.statePatternSelection=="Command"){
			if(key.includes("MethodParameter")){
				let count = 0;
				key = key.substring(3,);
				let nkey = key.substring(0, key.length-1);
				Object.keys(newValues).forEach((vkey) =>{
					if(vkey.includes(nkey)){
						count ++;
					}
				});
				let label = this.updateLabel(key, count+1);
				newValues[label] = {"name":"", "extension":0};
				extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
				this.insertCells(table, label);
			}else{
				let count2 = this.countKeys(values, "MethodParameter");
				let labelConCommand = this.updateLabel("ConcreteCommand ", (count-count2)/2+1);
				let labelConComMeth = labelConCommand + "Method";
				let labelConComMethParam = labelConCommand + "MethodParameter1";

				newValues[labelConCommand] = { "name":"", "extension":0};
				newValues[labelConComMeth] =  { "name":"", "extension":0};
				newValues[labelConComMethParam] = { "name":"", "extension":1};
				extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
				this.insertCells(table, labelConCommand); 
				this.insertCells(table, labelConComMeth);
				this.insertCells(table, labelConComMethParam);

				
			}
		}else{
			newValues[label] = {"name":"", "extension":0};
			extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
			this.insertCells(table, label); 
		}
		
		
	}

	async buttonClick2 (table: HTMLTableElement):Promise<void>{
			let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check
			for (var i=0; i<table.rows.length; i++){
				let label = (document.getElementById('label'+(i+1)) as HTMLLabelElement).innerHTML;
				let v = (document.getElementById('txtbox'+(i+1)) as HTMLInputElement).value;
				if (label.includes('Method') && !label.includes('FactoryMethod')){
					let textfield:  Textfield={ ident: 2, value: v };
					textfieldArray.push(textfield);
				}else if (label.includes('Attribute')) {
					let textfield:  Textfield={ ident: 3, value: v };
					textfieldArray.push(textfield);
				}else{
					let textfield:  Textfield={ ident: 1, value: v };
					textfieldArray.push(textfield);
				}
			}
			let message = extensionWidget.functions.checkInputs(textfieldArray);
			if (message.includes("Input is valid")){
				if (extensionWidget.state.statePatternSelection=="Adapter"){
					let adapteeName = (document.getElementById("txtbox4") as HTMLInputElement).value;
					var getUrl = window.location.href;
					var methodNames = await this.helloBackendService.getMethods(getUrl, adapteeName);
					if (extensionWidget.res.includes(adapteeName)){
						let methodName = (document.getElementById("txtbox5") as HTMLInputElement).value;
						if (methodNames.includes(methodName)){
							extensionWidget.data[extensionWidget.state.statePatternSelection].values = extensionWidget.functions.updateJsonObject(extensionWidget.data[extensionWidget.state.statePatternSelection].values);
							this.messageService.info("Well done! Code is coming...");
							await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection);
						}else{
							this.messageService.info("For Adaptee method you need to choose a method name that already exists in Adaptee class: "+methodNames);
						}
					}else{
						this.messageService.info("For Adaptee you need to choose a class name that already exists: "+extensionWidget.res);
					}
				}else if(extensionWidget.state.statePatternSelection == "AbstractFactory"){
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = extensionWidget.functions.updateJsonObject(extensionWidget.data[extensionWidget.state.statePatternSelection].values);
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = extensionWidget.functions.insertInputsAbstractFactory(extensionWidget.data["AbstractFactory"].values);
					extensionWidget.functions.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection), this.messageService);
				}else if(extensionWidget.state.statePatternSelection == "FactoryMethod"){
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = extensionWidget.functions.updateJsonObject(extensionWidget.data[extensionWidget.state.statePatternSelection].values);
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = extensionWidget.functions.insertInputsFactoryMethod(extensionWidget.data["FactoryMethod"].values);
					extensionWidget.functions.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection), this.messageService);
				}else if(extensionWidget.state.statePatternSelection == "Builder"){
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = extensionWidget.functions.updateJsonObject(extensionWidget.data[extensionWidget.state.statePatternSelection].values);
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = extensionWidget.functions.insertInputsBuilder(extensionWidget.data["Builder"].values);
					extensionWidget.functions.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection), this.messageService);
				}else{
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = extensionWidget.functions.updateJsonObject(extensionWidget.data[extensionWidget.state.statePatternSelection].values);
					extensionWidget.functions.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection), this.messageService);
				}
			}else{
				this.messageService.info(message);
			}
		
	}
	
	updateLabel(value: string, count: number){
		return (value.includes('.') ? value.substring(0,value.length-2) + '.' + count : value.slice(0,-1) + count);
	}

	countKeys(values: string, keyString: string){
		let count = 0;
		let str = keyString.replace(/\d/g, ''); //removes the numbers from the string and returns a new one
		Object.keys(values).forEach((key) =>{
			if(key.includes(str)){
				count ++;
			}
		});
		return count;
	}
	
	async runWizard(){
		(document.getElementById('issues') as HTMLDivElement).style.visibility = 'hidden';
		(document.getElementById('issues') as HTMLDivElement).style.height = '0';
		(document.getElementById('result') as HTMLDivElement).style.height = '0';

		var getUrl = window.location.href;
		extensionWidget.res = await this.helloBackendService.sayHelloTo(getUrl);
		extensionWidget.functions.setClassNames(extensionWidget.res);
		
		let divWiz = document.getElementById('divWiz') as HTMLDivElement;
		divWiz.style.marginLeft = '10px';
		let divCont = document.createElement('div');
		extensionWidget.functions.createLabel('Choose the type of the pattern: <br>', 'label0', divWiz);
		extensionWidget.functions.createLabel('Creational', 'label1', divWiz)
		extensionWidget.functions.createInput('', 'radio1', '', 'patternTypes', 'radio', divWiz);
		let radio1 = document.getElementById('radio1') as HTMLInputElement;
		radio1.addEventListener('click', async (e: Event) =>{	
			extensionWidget.creationalPatterns.creationalPatternswizard(divCont, this.messageService);
		});
		extensionWidget.functions.createLabel('Structural', 'label2', divWiz);
		extensionWidget.functions.createInput('', 'radio2', '', 'patternTypes', 'radio', divWiz);
		let radio2 = document.getElementById('radio2') as HTMLInputElement;
		radio2.addEventListener('click', async (e: Event) =>{
			extensionWidget.structuralPatterns.structuralPatternsWizard(divCont, this.messageService);
		});	
		extensionWidget.functions.createLabel('Behavioral', 'label3', divWiz);
		extensionWidget.functions.createInput('', 'radio3', '', 'patternTypes', 'radio', divWiz);
		let radio3 = document.getElementById('radio3') as HTMLInputElement;
		radio3.addEventListener('click', async (e: Event) =>{
			divCont.innerHTML = "";
			extensionWidget.functions.createLabel('<br> Do you want to ... <br>', 'labelQuestion19', divCont);
		});
		
		divWiz.appendChild(divCont);
	}	
}			
	

