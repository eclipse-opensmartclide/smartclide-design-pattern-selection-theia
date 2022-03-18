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
			
			extensionWidget.functions.createLabel(key,"label"+ table.rows.length,table);
			extensionWidget.functions.createInput(key, "txtbox"+ table.rows.length,"", "txtbox"+ table.rows.length,"text",table)

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
					this.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection));
				}else if(extensionWidget.state.statePatternSelection == "FactoryMethod"){
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = extensionWidget.functions.updateJsonObject(extensionWidget.data[extensionWidget.state.statePatternSelection].values);
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = extensionWidget.functions.insertInputsFactoryMethod(extensionWidget.data["FactoryMethod"].values);
					this.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection));
				}else if(extensionWidget.state.statePatternSelection == "Builder"){
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = extensionWidget.functions.updateJsonObject(extensionWidget.data[extensionWidget.state.statePatternSelection].values);
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = extensionWidget.functions.insertInputsBuilder(extensionWidget.data["Builder"].values);
					this.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection));
				}else{
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = extensionWidget.functions.updateJsonObject(extensionWidget.data[extensionWidget.state.statePatternSelection].values);
					this.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection));
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
	checkMessage(message: string){
		if(message!=""){
			this.messageService.info("Something went wrong");
		}else{
			this.messageService.info("Code generation has been completed");
		}
	}
	async runWizard(){
		(document.getElementById('issues') as HTMLDivElement).style.visibility = 'hidden';
		(document.getElementById('issues') as HTMLDivElement).style.height = '0';
		(document.getElementById('result') as HTMLDivElement).style.height = '0';

		var getUrl = window.location.href;
		extensionWidget.res = await this.helloBackendService.sayHelloTo(getUrl);
		
		let divWiz = document.getElementById('divWiz') as HTMLDivElement;
		divWiz.style.marginLeft = '10px';
		let divCont = document.createElement('div');
		extensionWidget.functions.createLabel('Choose the type of the pattern: <br>', 'label0', divWiz);
		extensionWidget.functions.createLabel('Creational', 'label1', divWiz)
		extensionWidget.functions.createInput('', 'radio1', '', 'patternTypes', 'radio', divWiz);
		let radio1 = document.getElementById('radio1') as HTMLInputElement;
		radio1.addEventListener('click', async (e: Event) =>{	
				divCont.innerHTML = "";
				let divCont2 = document.createElement('div');
				extensionWidget.functions.radioQuestion('<br> Do you want to create a completely new object or to create one by reusing an existing one?<br>', 'Create new object', 'Reuse an existing one', 'radio11', 'radio12', divCont);
				let radio11 = document.getElementById('radio11') as HTMLInputElement;
				radio11.addEventListener('click', async (e: Event) =>{	
						divCont2.innerHTML = "";
						let divCont3 = document.createElement('div');
						extensionWidget.functions.textfieldQuestion('<br> Give the name of the Product that you want to create <br>', 1, 'text', 'Product name', 'txtboxProduct_name', 'infoField', 'buttonNext1', divCont2);
						let buttonNext1 = document.getElementById('buttonNext1') as HTMLButtonElement;
						buttonNext1.addEventListener('click', async (e: Event) =>{
							divCont3.innerHTML = "";
							let divCont4 = document.createElement('div');
							extensionWidget.functions.radioQuestion('<br> Does the Product has sub-categories (ConcreteProducts)?  <br>', 'Yes', 'No', 'radio31', 'radio32', divCont3);
							let radio31 = document.getElementById('radio31') as HTMLInputElement;
							radio31.addEventListener('click', async (e: Event) =>{
								divCont4.innerHTML = "";
								let divCont5 = document.createElement('div');
								extensionWidget.functions.textfieldQuestion('<br> How many sub-categories (ConcreteProducts) exist? <br>', 1, 'number', '2', 'subcategoriesNum', '', 'buttonNext2', divCont4);
								let numCat = document.getElementById('subcategoriesNum') as HTMLInputElement;
								numCat.min = '2';
								let buttonNext2 = document.getElementById('buttonNext2') as HTMLButtonElement;
								buttonNext2.addEventListener('click', async (e: Event) =>{
									divCont5.innerHTML = "";
									let divCont6 = document.createElement('div');
									let num = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
									extensionWidget.functions.textfieldQuestion('<br> Please give the names of the sub-categories (ConcreteProducts) <br>', num, 'text', 'Concrete Product name ', 'txtboxConcreteProductsName', 'infoField', 'buttonNext3', divCont5);
									let buttonNext3 = document.getElementById('buttonNext3') as HTMLButtonElement;
									buttonNext3.addEventListener('click', async (e: Event) =>{
										divCont6.innerHTML = "";
										let divCont7 = document.createElement('div');
										extensionWidget.functions.radioQuestion('<br> Can the Products be classified in a Family? <br>', 'Yes', 'No', 'radio61', 'radio62', divCont6);
										let radio61 = document.getElementById('radio61') as HTMLInputElement;
										radio61.addEventListener('click', async (e: Event) =>{
											divCont7.innerHTML = "";
											let divCont8 = document.createElement('div');
											extensionWidget.functions.textfieldQuestion('<br> How many Families of Products exist? <br>', 1, 'number', '2', 'familiesNum', '', 'buttonNext4', divCont7);
											let numFam = document.getElementById('familiesNum') as HTMLInputElement;
											numFam.min = '2';
											let buttonNext4 = document.getElementById('buttonNext4') as HTMLButtonElement;
											buttonNext4.addEventListener('click', async (e: Event) =>{
												divCont8.innerHTML = "";
												let divCont9 = document.createElement('div');
												let num = parseInt((document.getElementById('familiesNum') as HTMLInputElement).value);
												extensionWidget.functions.textfieldQuestion('<br> Please give the names of the Components (Families) <br>', num, 'text', 'Component name ', 'txtboxComponentName', 'infoField', 'buttonNext5', divCont8);
												let buttonNext5 = document.getElementById('buttonNext5') as HTMLButtonElement;
												buttonNext5.addEventListener('click', async (e: Event) =>{
													divCont9.innerHTML = "";
													extensionWidget.functions.createLabel('<br> <b>Abstract Factory Pattern</b>   ', 'labelPattern0', divCont9);
													extensionWidget.functions.createButton('Get Code', 'getcodeAbstractFactoryPattern', divCont9);
													let buttonCodeAFP = document.getElementById('getcodeAbstractFactoryPattern') as HTMLButtonElement;
													buttonCodeAFP.addEventListener('click', async (e: Event) =>{
														let infoList = document.getElementsByClassName('infoField') as HTMLCollection;	
														let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check													
														extensionWidget.data["AbstractFactory"].values["AbstractFactory"].name = (infoList.item(0) as HTMLInputElement).value;
														let textfield:  Textfield={ ident: 1, value: (infoList.item(0) as HTMLInputElement).value };
														textfieldArray.push(textfield);
														let numCat = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
														let numFam = parseInt((document.getElementById('familiesNum') as HTMLInputElement).value);
														for (var i=1; i<=numCat; i++){
															extensionWidget.data["AbstractFactory"].values["Product"+i] = { "name":"", "extension":0};
															let v1 = (infoList.item(i) as HTMLInputElement).value;
															extensionWidget.data["AbstractFactory"].values["Product"+i].name = v1;
															let textfield:  Textfield={ ident: 1, value: v1 };
															textfieldArray.push(textfield);
															for (var j=1; j<=numFam; j++){
																extensionWidget.data["AbstractFactory"].values["ConcreteProduct"+i+"."+j] = { "name":"", "extension":0};
															}
														}
														for (var j=1; j<=numFam; j++){
															extensionWidget.data["AbstractFactory"].values["Family"+j] = { "name":"", "extension":0};
															let v2 = (infoList.item(i) as HTMLInputElement).value;
															extensionWidget.data["AbstractFactory"].values["Family"+j].name = v2;
															let textfield:  Textfield={ ident: 1, value: v2 };
															textfieldArray.push(textfield);
															i++;
														}
														extensionWidget.functions.insertInputsAbstractFactory(extensionWidget.data["AbstractFactory"].values);
														let message = extensionWidget.functions.checkInputs(textfieldArray);
														if (message == "Input is valid"){
															this.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data["AbstractFactory"].values, "AbstractFactory"));
														}else{
															this.messageService.info(message);
														}
													});
												});
												divCont8.appendChild(divCont9);
											});
											divCont7.appendChild(divCont8);
										});
										let radio62 = document.getElementById('radio62') as HTMLInputElement;
										radio62.addEventListener('click', async (e: Event) =>{
											divCont7.innerHTML = "";
											let divCont8 = document.createElement('div');
											extensionWidget.functions.radioQuestion('<br> Can Product be created as series of steps which is different in every subcategory? <br>', 'Yes', 'No', 'radio71', 'radio72', divCont7);
											let radio71 = document.getElementById('radio71') as HTMLInputElement;
											radio71.addEventListener('click', async (e: Event) =>{
												divCont8.innerHTML = "";
												let divCont9 = document.createElement('div');
												extensionWidget.functions.textfieldQuestion('<br> How many Steps are involved ?  <br>', 1, 'number', '1', 'stepsNum', '', 'buttonNext6', divCont8);
												let buttonNext6 = document.getElementById('buttonNext6') as HTMLButtonElement;
												buttonNext6.addEventListener('click', async (e: Event) =>{
													divCont9.innerHTML = "";
													let divCont10 = document.createElement('div');
													let num = parseInt((document.getElementById('stepsNum') as HTMLInputElement).value);
													extensionWidget.functions.textfieldQuestion('<br> Please give the name of the steps  <br>', num, 'text', 'Step name ', 'txtboxStepName', 'infoField', 'buttonNext7', divCont9);
													let buttonNext7 = document.getElementById('buttonNext7') as HTMLButtonElement;
													buttonNext7.addEventListener('click', async (e: Event) =>{
														divCont10.innerHTML = "";
														extensionWidget.functions.createLabel('<br> <b>Builder Pattern</b>   ', 'labelPattern1', divCont10);
														extensionWidget.functions.createButton('Get Code', 'getcodeBuilderPattern', divCont10);
														let buttonCodeBP = document.getElementById('getcodeBuilderPattern') as HTMLButtonElement;
														buttonCodeBP.addEventListener('click', async (e: Event) =>{
															let infoList = document.getElementsByClassName('infoField');
															let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check															
															let v = (document.getElementById('txtboxProduct_name') as HTMLInputElement).value + "Builder";
															extensionWidget.data["Builder"].values["Builder"].name = v;
															let textfield:  Textfield={ ident: 1, value: v };
															textfieldArray.push(textfield);
															extensionWidget.data["Builder"].values["Director"].name = "Director";
															let numCat = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
															let numSteps = parseInt((document.getElementById('stepsNum') as HTMLInputElement).value);
															for (var i=1; i<=numCat; i++){
																extensionWidget.data["Builder"].values["ConcreteProduct"+i] = { "name":"", "extension":0};
																let v1 = (infoList.item(i) as HTMLInputElement).value;
																extensionWidget.data["Builder"].values["ConcreteProduct"+i].name = v1;
																let textfield:  Textfield={ ident: 1, value: v1 };
																textfieldArray.push(textfield);
																extensionWidget.data["Builder"].values["ConcreteBuilder"+i] = { "name":"", "extension":0};
															}
															for (var j=1; j<=numSteps; j++){
																extensionWidget.data["Builder"].values["BuilderMethod"+j] = { "name":"", "extension":0};
																let v2 = (infoList.item(i) as HTMLInputElement).value;
																extensionWidget.data["Builder"].values["BuilderMethod"+j].name = v2;
																let textfield:  Textfield={ ident: 2, value: v2 };
																textfieldArray.push(textfield);
																i++;
															}
															extensionWidget.functions.insertInputsBuilder(extensionWidget.data["Builder"].values);
															let message = extensionWidget.functions.checkInputs(textfieldArray);
															if (message == "Input is valid"){
																this.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data["Builder"].values, "Builder"));
															}else{
																this.messageService.info(message);
															}
														});
													});
													divCont9.appendChild(divCont10);
												});
												divCont8.appendChild(divCont9);
											});
											let radio72 = document.getElementById('radio72') as HTMLInputElement;
											radio72.addEventListener('click', async (e: Event) =>{
												divCont8.innerHTML = "";
												let divCont9 = document.createElement('div');
												extensionWidget.functions.textfieldQuestion('<br> What is the name of the Creator (e.g., Oven) of Product? <br>', 1, 'text', 'Creator name', 'txtboxCreatorName', 'infoField', 'buttonNext8', divCont8);
												let buttonNext8 = document.getElementById('buttonNext8') as HTMLButtonElement;
												buttonNext8.addEventListener('click', async (e: Event) =>{
													divCont9.innerHTML = "";
													extensionWidget.functions.createLabel('<br> <b>Factory Method Pattern</b>   ', 'labelPattern2', divCont9);
													extensionWidget.functions.createButton('Get Code', 'getcodeFactoryMethodPattern', divCont9);
													let buttonCodeFMP = document.getElementById('getcodeFactoryMethodPattern') as HTMLButtonElement;
													buttonCodeFMP.addEventListener('click', async (e: Event) =>{
															let infoList = document.getElementsByClassName('infoField');
															let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check
															extensionWidget.data["FactoryMethod"].values["Product"].name = (infoList.item(0) as HTMLInputElement).value;
															let textfield:  Textfield={ ident: 1, value: (infoList.item(0) as HTMLInputElement).value };
															textfieldArray.push(textfield);
															let numCat = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
															for (var i=1; i<=numCat; i++){
																extensionWidget.data["FactoryMethod"].values["ConcreteProduct"+i] = { "name":"", "extension":0};
																let v1 = (infoList.item(i) as HTMLInputElement).value;
																extensionWidget.data["FactoryMethod"].values["ConcreteProduct"+i].name = v1;
																let textfield:  Textfield={ ident: 1, value: v1 };
																textfieldArray.push(textfield);
																extensionWidget.data["FactoryMethod"].values["ConcreteCreator"+i] = { "name":"", "extension":0};
															}
															extensionWidget.data["FactoryMethod"].values["Creator"].name = (infoList.item(i) as HTMLInputElement).value;
															let textfield2:  Textfield={ ident: 1, value: (infoList.item(i) as HTMLInputElement).value };
															textfieldArray.push(textfield2);
															this.insertInputsFactoryMethod(extensionWidget.data["FactoryMethod"].values);															
															let message = extensionWidget.functions.checkInputs(textfieldArray);																
															if (message == "Input is valid"){
																this.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data["FactoryMethod"].values, "FactoryMethod"));
															}else{
																this.messageService.info(message);
															}
													});
												});
												divCont8.appendChild(divCont9);
											});
											divCont7.appendChild(divCont8);
										});
										divCont6.appendChild(divCont7);										
									});
									divCont5.appendChild(divCont6);
								});
								divCont4.appendChild(divCont5);
							});				
							let radio32 = document.getElementById('radio32') as HTMLInputElement;
							radio32.addEventListener('click', async (e: Event) =>{
								divCont4.innerHTML = "";
								extensionWidget.functions.createLabel('<br> There is no pattern <br>', 'labelQuestion16', divCont4);
							});
							divCont3.appendChild(divCont4);
						});
						divCont2.appendChild(divCont3);
				});
				let radio12 = document.getElementById('radio12') as HTMLInputElement;
				radio12.addEventListener('click', async (e: Event) =>{	
					divCont2.innerHTML = "";
					let divCont3 = document.createElement('div');
					extensionWidget.functions.radioQuestion('<br> Do you want the object to be unique or clone? <br>', 'Unique', 'Cloned', 'radio121', 'radio122', divCont2);
					let radio121 = document.getElementById('radio121') as HTMLInputElement;
					radio121.addEventListener('click', async (e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						extensionWidget.functions.textfieldQuestion('<br> Please provide the name of the Single class <br>', 1, 'text', 'Singleton name', 'txtboxSingletonName', 'infoField', 'buttonNext9', divCont3);
						let buttonNext9 = document.getElementById('buttonNext9') as HTMLButtonElement;
						buttonNext9.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							extensionWidget.functions.createLabel('<br> <b>Singleton Pattern</b>   ', 'labelPattern3', divCont4);
							extensionWidget.functions.createButton('Get Code', 'getcodeSingletonPattern', divCont4);
							let buttonCodeSP = document.getElementById('getcodeSingletonPattern') as HTMLButtonElement;
							buttonCodeSP.addEventListener('click', async (e: Event) =>{
								let singlName = (document.getElementById('txtboxSingletonName') as HTMLInputElement).value;
								extensionWidget.data["Singleton"].values["Singleton"].name = singlName;
								if (singlName==""){
									this.messageService.info("You need to fill all the fields!");
								}else if (!singlName.match("^([A-Z]{1}[a-zA-Z]*[0-9]*)$")){
									this.messageService.info("Class's name must start with a capital letter!");
								}else{
									this.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data["Singleton"].values, "Singleton"));
								}
							});
						});
						divCont3.appendChild(divCont4);
					});
					let radio122 = document.getElementById('radio122') as HTMLInputElement;
					radio122.addEventListener('click', async (e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						extensionWidget.functions.textfieldQuestion('<br> Give the name of the Product that you want to create clones from  <br>', 1, 'text', 'Product name', 'txtboxProductName', 'infoField', 'buttonNext10', divCont3);
						let buttonNext10 = document.getElementById('buttonNext10') as HTMLButtonElement;
						buttonNext10.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							let divCont5 = document.createElement('div');
							extensionWidget.functions.radioQuestion('<br> Does the Product has sub-categories (Concrete Prototypes)? <br>', 'Yes', 'No', 'radio1221', 'radio1222', divCont4);
							let radio1221 = document.getElementById('radio1221') as HTMLInputElement;
							radio1221.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								let divCont6 = document.createElement('div');
								extensionWidget.functions.textfieldQuestion('<br> How many sub-categories exist? <br>', 1, 'number', '1', 'subcategoriesNum', '', 'buttonNext11', divCont5);
								let buttonNext11 = document.getElementById('buttonNext11') as HTMLButtonElement;
								buttonNext11.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									let divCont7 = document.createElement('div');
									let num = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
									extensionWidget.functions.textfieldQuestion('<br> Please give the names of the Concrete Prototypes <br>', num, 'text', 'Concrete Prototype name ', 'txtboxConcretePrototypesName', 'infoField', 'buttonNext12', divCont6);
									let buttonNext12 = document.getElementById('buttonNext12') as HTMLButtonElement;
									buttonNext12.addEventListener('click', async (e: Event) =>{
										divCont7.innerHTML = "";
										extensionWidget.functions.createLabel('<br> <b>Prototype Pattern</b>   ', 'labelPattern4', divCont7);
										extensionWidget.functions.createButton('Get Code', 'getcodePrototypePattern', divCont7);
										let buttonCodePP = document.getElementById('getcodePrototypePattern') as HTMLButtonElement;
										buttonCodePP.addEventListener('click', async (e: Event) =>{
											let infoList = document.getElementsByClassName('infoField');
											let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check
											extensionWidget.data["Prototype"].values["Prototype"].name = (infoList.item(0) as HTMLInputElement).value;
											let textfield:  Textfield={ ident: 1, value: (infoList.item(0) as HTMLInputElement).value };
											textfieldArray.push(textfield);
											let numCat = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
											for (var i=1; i<=numCat; i++){
												extensionWidget.data["Prototype"].values["ConcretePrototype"+i] = { "name":"", "extension":0};
												let v1 = (infoList.item(i) as HTMLInputElement).value;
												extensionWidget.data["Prototype"].values["ConcretePrototype"+i].name = v1;
												let textfield:  Textfield={ ident: 1, value: v1 };
												textfieldArray.push(textfield);
											}
											let message = extensionWidget.functions.checkInputs(textfieldArray);
											if (message == "Input is valid"){											
												this.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data["Prototype"].values, "Prototype"));
											}else{
												this.messageService.info(message);
											}
										});
									});
									divCont6.appendChild(divCont7);
								});
								divCont5.appendChild(divCont6);
							});
							let radio1222 = document.getElementById('radio1222') as HTMLInputElement;
							radio1222.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								extensionWidget.functions.createLabel('<br> There is no pattern <br>', 'labelQuestion22', divCont5);
							});
							divCont4.appendChild(divCont5);
						});
						divCont3.appendChild(divCont4);
					});
					divCont2.appendChild(divCont3);
				});
				divCont.appendChild(divCont2);
		});
		extensionWidget.functions.createLabel('Structural', 'label2', divWiz);
		extensionWidget.functions.createInput('', 'radio2', '', 'patternTypes', 'radio', divWiz);
		let radio2 = document.getElementById('radio2') as HTMLInputElement;
		radio2.addEventListener('click', async (e: Event) =>{
			divCont.innerHTML = "";
			extensionWidget.functions.createLabel('<br> Do you want to ... <br>', 'labelQuestion18', divCont);
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
	

