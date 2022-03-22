import * as React from 'react';

import { injectable, postConstruct, inject } from 'inversify';
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';

import { HelloBackendService } from '../common/protocol';
import data from './data.json';
import explanation from './explanation.json';

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
						<option value="ChainofResponsibility">Chain of Responsibility</option>
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

			(document.getElementById("result") as HTMLElement).style.visibility = 'visible';
			(document.getElementById('image') as HTMLImageElement).className = extensionWidget.state.statePatternSelection;
			(document.getElementById('description') as HTMLElement).innerHTML = extensionWidget.explanation[extensionWidget.state.statePatternSelection].description;
			(document.getElementById('example') as HTMLElement).innerHTML = extensionWidget.explanation[extensionWidget.state.statePatternSelection].example;

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
		if(this.check(key)){
			let index = 0;
			for (var i=0; i<table.rows.length; i++){
				let label = (document.getElementById( 'label'+ (i + 1) ) as HTMLLabelElement).innerHTML;
				if (key>label) index++;
			}
			let row = table.insertRow(index);
			let cell1 = row.insertCell(0);
			let cell2 = row.insertCell(1);
			cell2.id = "cell2";
			let label = document.createElement("label");
			label.id = "label"+ table.rows.length;
			label.innerHTML = key;
	
			let txtbox = document.createElement("input");
			txtbox.id = "txtbox"+ table.rows.length;
			txtbox.autocomplete = "off";
			txtbox.placeholder = key;
			if (!key.includes("Method")){
				let suggestions = document.createElement("div");
				suggestions.id = "suggestions"+table.rows.length;
				suggestions.className = "suggestions";
				cell2.appendChild(suggestions);
				txtbox.addEventListener('keypress', (e: KeyboardEvent) =>{
					showSuggestions(txtbox.value, extensionWidget.res, ( e.target as Element).id);
					});
			}
			cell1.appendChild(label);
			cell2.appendChild(txtbox);
			if(extensionWidget.data[extensionWidget.state.statePatternSelection].values[key].extension==1){
				let cell3 = row.insertCell(2);
				let t3 = document.createElement("button");
				t3.innerHTML = "+";
				t3.id = "btn"+ key;
				cell3.appendChild(t3);
				t3.addEventListener('click', (event) => {
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
			let message = this.checkInputs(textfieldArray);
			if (message.includes("Input is valid")){
				if (extensionWidget.state.statePatternSelection=="Adapter"){
					let adapteeName = (document.getElementById("txtbox4") as HTMLInputElement).value;
					var getUrl = window.location.href;
					var methodNames = await this.helloBackendService.getMethods(getUrl, adapteeName);
					if (extensionWidget.res.includes(adapteeName)){
						let methodName = (document.getElementById("txtbox5") as HTMLInputElement).value;
						if (methodNames.includes(methodName)){
							this.updateJsonObject();
							this.messageService.info("Well done! Code is coming...");
							await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection);
						}else{
							this.messageService.info("For Adaptee method you need to choose a method name that already exists in Adaptee class: "+methodNames);
						}
					}else{
						this.messageService.info("For Adaptee you need to choose a class name that already exists: "+extensionWidget.res);
					}
				}else if(extensionWidget.state.statePatternSelection == "AbstractFactory"){
					this.updateJsonObject();
					this.insertInputsAbstractFactory();
					this.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection));
				}else if(extensionWidget.state.statePatternSelection == "FactoryMethod"){
					this.updateJsonObject();
					this.insertInputsFactoryMethod();
					this.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection));
				}else if(extensionWidget.state.statePatternSelection == "Builder"){
					this.updateJsonObject();
					this.insertInputsBuilder();
					this.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection));
				}else{
					this.updateJsonObject();
					this.checkMessage(await this.helloBackendService.codeGeneration(window.location.href, extensionWidget.data[extensionWidget.state.statePatternSelection].values, extensionWidget.state.statePatternSelection));
				}
			}else{
				this.messageService.info(message);
			}
		
	}
	checkMessage(message: string){
		if(message!=""){
			this.messageService.info("Something went wrong");
		}else{
			this.messageService.info("Code generation has been completed");
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
	
	updateJsonObject(){
		let table = document.getElementById('show_pattern_table') as HTMLTableElement;
		for(let i = 0 ; i < table.rows.length ; i++){
			let label = (document.getElementById( 'label'+ (i + 1) ) as HTMLLabelElement).innerHTML;
			let txtbox = (document.getElementById( 'txtbox'+ (i + 1) ) as HTMLInputElement).value;
			extensionWidget.data[extensionWidget.state.statePatternSelection].values[label].name = txtbox;
			}
	}

	checkInputs(array: Array<Textfield>){
		let returncode1 = this.checkEmptyInputs(array);
		let returncode2 = this.checkWritingInput(array);
		let returncode3 = this.checkInputsForSameValues(array);
		if (returncode1+returncode2+returncode3==0){
			return "Input is valid";
		}else if (returncode1==1){
			return "You need to fill all the fields!";
		}else if (returncode2==2){
			return "Class's name must start with a capital letter!";
		}else if (returncode2==3){
			return "Method's name must follow camel writing!";
		}else if (returncode2==4){
			return "Attribute's name must contain only small letters!";
		}else {
			return "There are duplicated names in the fields!";
		}	
	}

	//method that checks the writing of class name, method name and attribute name
	checkWritingInput(array: Array<Textfield>){
		for(let i = 0 ; i < array.length; i++){
			let txtbox = array[i].value;
			let labelcode = array[i].ident;
			if (labelcode == 1 && !txtbox.match("^([A-Z]{1}[a-zA-Z]*[0-9]*)$")){ //class case
					return 2;
			}
			if (labelcode == 2 && !txtbox.match("^[a-z]+[a-z|0-9]*([A-Z][a-z|0-9]*)*")){ //method case
					return 3;
			}
			if (labelcode == 3 && !txtbox.match("^([a-z]*[0-9]*)$")){ //attribute case
					return 4;
			}	
		}
		return 0;
	}

	//method that checks for duplicate values
	checkInputsForSameValues(array: Array<Textfield>){
		let resultToReturn = false;
		for (let i = 0; i < array.length; i++) { // nested for loop
			for (let j = 0; j < array.length; j++) {
				// prevents the element from comparing with itself
				if (i != j) {
					// check if elements' values are equal
					if (array[i].value == array[j].value && array[i].value!=undefined) {
						// duplicate element present                  
						resultToReturn = true;
						// terminate inner loop
						break;
					}
				}
			}
			// terminate outer loop                                                                      
			if (resultToReturn) {
				break;
			}
		}
		if (!resultToReturn){
			return 0;
		}else{
			return 5;
		}
	}

	//method that search for empty textfields
	checkEmptyInputs(array: Array<Textfield>){
		for (var i=0; i<array.length; i++){
			if (array[i].value == "") return 1;
		}
		return 0;
	}

	check(key: string){
		return (!key.includes("ConcreteProduct") || extensionWidget.state.statePatternSelection!="AbstractFactory") && (!key.includes("ConcreteCreator") || extensionWidget.state.statePatternSelection!="FactoryMethod") && (!key.includes("ConcreteBuilder") || extensionWidget.state.statePatternSelection!="Builder")
	}

	refreshPage(table: HTMLTableElement){
		table.innerHTML = "";
		(document.getElementById("btn-get-code") as HTMLButtonElement).style.visibility = 'visible';
		(document.getElementById("elements") as HTMLElement).style.visibility = 'hidden';
		window.location.reload();
	}

	insertInputsAbstractFactory():void{
		let values = JSON.parse(JSON.stringify(extensionWidget.data["AbstractFactory"].values));
		let listofFamily: string[] = [];
		let listofProducts:string[] = [];
		Object.keys(values).forEach((key)=>{
			if(key.includes("Family")){
				values[key].name = values[key].name + "Factory";
				listofFamily.push(values[key].name);
			}else if(key.includes("Product") && !key.includes("ConcreteProduct")){
				listofProducts.push(values[key].name);
			}
			
		});
		Object.keys(values).forEach((key)=>{
			if(key.includes("ConcreteProduct")){
				let array = key.split('.');
				var numberofProduct = array[0].replace(/\D/g,'');
				values[key].name = listofFamily[Number(array[1])-1].split("Factory")[0]+listofProducts[Number(numberofProduct)-1];
			}
		});
		extensionWidget.data["AbstractFactory"].values = values;
	}
	
	insertInputsBuilder():void{
		let values = JSON.parse(JSON.stringify(extensionWidget.data["Builder"].values));
		let listofProducts:string[] = [];
		Object.keys(values).forEach((key)=>{
			if(key.includes("Product")) listofProducts.push(values[key].name);
		});
		Object.keys(values).forEach((key)=>{
			if(key.includes("ConcreteBuilder")){
				var numofConBuilder = key.match(/\d/g);
				values[key].name = listofProducts[Number(numofConBuilder)-1] + "Builder";
			}
		});
		extensionWidget.data["Builder"].values = values;
	}
	
	insertInputsFactoryMethod():void{
		let values = JSON.parse(JSON.stringify(extensionWidget.data["FactoryMethod"].values));
		let listofConProducts:string[] = [];
		Object.keys(values).forEach((key)=>{
			if(key.includes("ConcreteProduct")) {
				values[key].name = values[key].name + values.Product.name;
				listofConProducts.push(values[key].name);
			}
		});
		Object.keys(values).forEach((key)=>{
			if(key.includes("ConcreteCreator")){
				var numofConProduct = key.match(/\d/g);
				values[key].name = listofConProducts[Number(numofConProduct)-1].split(values.Product.name)[0] + values.Creator.name;
			}
		});
		extensionWidget.data["FactoryMethod"].values = values;
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
		createLabel('Choose the type of the pattern: <br>', 'label0', divWiz);
		createLabel('Creational', 'label1', divWiz)
		createInput('', 'radio1', '', 'patternTypes', 'radio', divWiz);
		let radio1 = document.getElementById('radio1') as HTMLInputElement;
		radio1.addEventListener('click', async (e: Event) =>{	
				divCont.innerHTML = "";
				let divCont2 = document.createElement('div');
				radioQuestion('<br> Do you want to create a completely new object or to create one by reusing an existing one?<br>', 'Create new object', 'Reuse an existing one', 'radio11', 'radio12', divCont);
				let radio11 = document.getElementById('radio11') as HTMLInputElement;
				radio11.addEventListener('click', async (e: Event) =>{	
						divCont2.innerHTML = "";
						let divCont3 = document.createElement('div');
						textfieldQuestion('<br> Give the name of the Product that you want to create <br>', 1, 'text', 'Product name', 'txtboxProduct_name', 'infoField', 'buttonNext1', divCont2);
						let buttonNext1 = document.getElementById('buttonNext1') as HTMLButtonElement;
						buttonNext1.addEventListener('click', async (e: Event) =>{
							divCont3.innerHTML = "";
							let divCont4 = document.createElement('div');
							radioQuestion('<br> Does the Product has sub-categories (ConcreteProducts)?  <br>', 'Yes', 'No', 'radio31', 'radio32', divCont3);
							let radio31 = document.getElementById('radio31') as HTMLInputElement;
							radio31.addEventListener('click', async (e: Event) =>{
								divCont4.innerHTML = "";
								let divCont5 = document.createElement('div');
								textfieldQuestion('<br> How many sub-categories (ConcreteProducts) exist? <br>', 1, 'number', '2', 'subcategoriesNum', '', 'buttonNext2', divCont4);
								let numCat = document.getElementById('subcategoriesNum') as HTMLInputElement;
								numCat.min = '2';
								let buttonNext2 = document.getElementById('buttonNext2') as HTMLButtonElement;
								buttonNext2.addEventListener('click', async (e: Event) =>{
									divCont5.innerHTML = "";
									let divCont6 = document.createElement('div');
									let num = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
									textfieldQuestion('<br> Please give the names of the sub-categories (ConcreteProducts) <br>', num, 'text', 'Concrete Product name ', 'txtboxConcreteProductsName', 'infoField', 'buttonNext3', divCont5);
									let buttonNext3 = document.getElementById('buttonNext3') as HTMLButtonElement;
									buttonNext3.addEventListener('click', async (e: Event) =>{
										divCont6.innerHTML = "";
										let divCont7 = document.createElement('div');
										radioQuestion('<br> Can the Products be classified in a Family? <br>', 'Yes', 'No', 'radio61', 'radio62', divCont6);
										let radio61 = document.getElementById('radio61') as HTMLInputElement;
										radio61.addEventListener('click', async (e: Event) =>{
											divCont7.innerHTML = "";
											let divCont8 = document.createElement('div');
											textfieldQuestion('<br> How many Families of Products exist? <br>', 1, 'number', '2', 'familiesNum', '', 'buttonNext4', divCont7);
											let numFam = document.getElementById('familiesNum') as HTMLInputElement;
											numFam.min = '2';
											let buttonNext4 = document.getElementById('buttonNext4') as HTMLButtonElement;
											buttonNext4.addEventListener('click', async (e: Event) =>{
												divCont8.innerHTML = "";
												let divCont9 = document.createElement('div');
												let num = parseInt((document.getElementById('familiesNum') as HTMLInputElement).value);
												textfieldQuestion('<br> Please give the names of the Components (Families) <br>', num, 'text', 'Component name ', 'txtboxComponentName', 'infoField', 'buttonNext5', divCont8);
												let buttonNext5 = document.getElementById('buttonNext5') as HTMLButtonElement;
												buttonNext5.addEventListener('click', async (e: Event) =>{
													divCont9.innerHTML = "";
													createLabel('<br> <b>Abstract Factory Pattern</b>   ', 'labelPattern0', divCont9);
													createButton('Get Code', 'getcodeAbstractFactoryPattern', divCont9);
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
														this.insertInputsAbstractFactory();
														let message = this.checkInputs(textfieldArray);
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
											radioQuestion('<br> Can Product be created as series of steps which is different in every subcategory? <br>', 'Yes', 'No', 'radio71', 'radio72', divCont7);
											let radio71 = document.getElementById('radio71') as HTMLInputElement;
											radio71.addEventListener('click', async (e: Event) =>{
												divCont8.innerHTML = "";
												let divCont9 = document.createElement('div');
												textfieldQuestion('<br> How many Steps are involved ?  <br>', 1, 'number', '1', 'stepsNum', '', 'buttonNext6', divCont8);
												let buttonNext6 = document.getElementById('buttonNext6') as HTMLButtonElement;
												buttonNext6.addEventListener('click', async (e: Event) =>{
													divCont9.innerHTML = "";
													let divCont10 = document.createElement('div');
													let num = parseInt((document.getElementById('stepsNum') as HTMLInputElement).value);
													textfieldQuestion('<br> Please give the name of the steps  <br>', num, 'text', 'Step name ', 'txtboxStepName', 'infoField', 'buttonNext7', divCont9);
													let buttonNext7 = document.getElementById('buttonNext7') as HTMLButtonElement;
													buttonNext7.addEventListener('click', async (e: Event) =>{
														divCont10.innerHTML = "";
														createLabel('<br> <b>Builder Pattern</b>   ', 'labelPattern1', divCont10);
														createButton('Get Code', 'getcodeBuilderPattern', divCont10);
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
															this.insertInputsBuilder();
															let message = this.checkInputs(textfieldArray);
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
												textfieldQuestion('<br> What is the name of the Creator (e.g., Oven) of Product? <br>', 1, 'text', 'Creator name', 'txtboxCreatorName', 'infoField', 'buttonNext8', divCont8);
												let buttonNext8 = document.getElementById('buttonNext8') as HTMLButtonElement;
												buttonNext8.addEventListener('click', async (e: Event) =>{
													divCont9.innerHTML = "";
													createLabel('<br> <b>Factory Method Pattern</b>   ', 'labelPattern2', divCont9);
													createButton('Get Code', 'getcodeFactoryMethodPattern', divCont9);
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
															this.insertInputsFactoryMethod();															
															let message = this.checkInputs(textfieldArray);																
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
								createLabel('<br> There is no pattern <br>', 'labelQuestion16', divCont4);
							});
							divCont3.appendChild(divCont4);
						});
						divCont2.appendChild(divCont3);
				});
				let radio12 = document.getElementById('radio12') as HTMLInputElement;
				radio12.addEventListener('click', async (e: Event) =>{	
					divCont2.innerHTML = "";
					let divCont3 = document.createElement('div');
					radioQuestion('<br> Do you want the object to be unique or clone? <br>', 'Unique', 'Cloned', 'radio121', 'radio122', divCont2);
					let radio121 = document.getElementById('radio121') as HTMLInputElement;
					radio121.addEventListener('click', async (e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						textfieldQuestion('<br> Please provide the name of the Single class <br>', 1, 'text', 'Singleton name', 'txtboxSingletonName', 'infoField', 'buttonNext9', divCont3);
						let buttonNext9 = document.getElementById('buttonNext9') as HTMLButtonElement;
						buttonNext9.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							createLabel('<br> <b>Singleton Pattern</b>   ', 'labelPattern3', divCont4);
							createButton('Get Code', 'getcodeSingletonPattern', divCont4);
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
						textfieldQuestion('<br> Give the name of the Product that you want to create clones from  <br>', 1, 'text', 'Product name', 'txtboxProductName', 'infoField', 'buttonNext10', divCont3);
						let buttonNext10 = document.getElementById('buttonNext10') as HTMLButtonElement;
						buttonNext10.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							let divCont5 = document.createElement('div');
							radioQuestion('<br> Does the Product has sub-categories (Concrete Prototypes)? <br>', 'Yes', 'No', 'radio1221', 'radio1222', divCont4);
							let radio1221 = document.getElementById('radio1221') as HTMLInputElement;
							radio1221.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								let divCont6 = document.createElement('div');
								textfieldQuestion('<br> How many sub-categories exist? <br>', 1, 'number', '1', 'subcategoriesNum', '', 'buttonNext11', divCont5);
								let buttonNext11 = document.getElementById('buttonNext11') as HTMLButtonElement;
								buttonNext11.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									let divCont7 = document.createElement('div');
									let num = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
									textfieldQuestion('<br> Please give the names of the Concrete Prototypes <br>', num, 'text', 'Concrete Prototype name ', 'txtboxConcretePrototypesName', 'infoField', 'buttonNext12', divCont6);
									let buttonNext12 = document.getElementById('buttonNext12') as HTMLButtonElement;
									buttonNext12.addEventListener('click', async (e: Event) =>{
										divCont7.innerHTML = "";
										createLabel('<br> <b>Prototype Pattern</b>   ', 'labelPattern4', divCont7);
										createButton('Get Code', 'getcodePrototypePattern', divCont7);
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
											let message = this.checkInputs(textfieldArray);
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
								createLabel('<br> There is no pattern <br>', 'labelQuestion22', divCont5);
							});
							divCont4.appendChild(divCont5);
						});
						divCont3.appendChild(divCont4);
					});
					divCont2.appendChild(divCont3);
				});
				divCont.appendChild(divCont2);
		});
		createLabel('Structural', 'label2', divWiz);
		createInput('', 'radio2', '', 'patternTypes', 'radio', divWiz);
		let radio2 = document.getElementById('radio2') as HTMLInputElement;
		radio2.addEventListener('click', async (e: Event) =>{
			divCont.innerHTML = "";
			let divCont1 = document.createElement('div');
			radioQuestion('<br> Do you need to implement a function that requires information from 2 different hierarchies? <br>', 'Yes', 'No', 'radio21', 'radio22', divCont);

			let radio21 = document.getElementById('radio21') as HTMLInputElement;
			radio21.addEventListener('click', async (e: Event) =>{
				divCont1.innerHTML = "";
				
			});
			let radio22 = document.getElementById('radio22') as HTMLInputElement;
			radio22.addEventListener('click', async (e: Event) =>{
				divCont1.innerHTML = "";
				let divCont2 = document.createElement('div');
				radioQuestion('<br>Is any of  your objects a composite one (i.e. comprised of simple objects), which however needs to be treated uniformly along with simple objects?<br>', 'Yes', 'No', 'radio221', 'radio222', divCont1);
				let radio221 = document.getElementById('radio221') as HTMLInputElement;
				radio221.addEventListener('click', async (e: Event) =>{
					divCont2.innerHTML = "";
					let divCont3 = document.createElement('div');
					textfieldQuestion('<br> What is the name Interface representing both Composite and Simple objects? <br>', 1, 'text', 'Interface name', '', 'infoField', 'buttonNext', divCont2);
					let buttonNext = document.getElementById('buttonNext') as HTMLButtonElement;
					buttonNext.addEventListener('click', async (e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						textfieldQuestion('<br> How many common functionalities does the Interface offer? <br>', 1, 'number', '1', 'numOfInterfaceMethods', '', 'buttonNext1', divCont3);
						let buttonNext1 = document.getElementById('buttonNext1') as HTMLButtonElement;
						buttonNext1.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							let divCont5 = document.createElement('div');
							textfieldQuestion('<br> Insert the name of each functionality <br>', parseInt((document.getElementById('numOfInterfaceMethods') as HTMLInputElement).value), 'text', 'Functionality name ', 'numOfInterfaceMethods', '', 'buttonNext2', divCont4);
							let buttonNext2 = document.getElementById('buttonNext2') as HTMLButtonElement;
							buttonNext2.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								let divCont6 = document.createElement('div');
								textfieldQuestion('<br> How many types of Simple objects exist? <br>', 1, 'number', '1', 'numOfSimpleObjectsTypes', '', 'buttonNext3', divCont5);
								let buttonNext3 = document.getElementById('buttonNext3') as HTMLButtonElement;
								buttonNext3.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									let divCont7 = document.createElement('div');
									textfieldQuestion('<br> Insert the names of the Simple objects <br>', parseInt((document.getElementById('numOfSimpleObjectsTypes') as HTMLInputElement).value), 'text', 'Simple Object name ', 'numOfSimpleObjectsTypes', '', 'buttonNext4', divCont6);
									let buttonNext4 = document.getElementById('buttonNext4') as HTMLButtonElement;
									buttonNext4.addEventListener('click', async (e: Event) =>{
										divCont7.innerHTML = "";
										let divCont8 = document.createElement('div');
										radioQuestion('<br>Are there different layers that extend the behaviour of the Composite object? <br>', 'Yes', 'No', 'radio2211', 'radio2212', divCont7);
										let radio2211 = document.getElementById('radio2211') as HTMLInputElement;
										radio2211.addEventListener('click', async (e: Event) =>{
											divCont8.innerHTML = "";
											let divCont9 = document.createElement('div');
											textfieldQuestion('<br>What is the name of the Decorator class? <br>', 1, 'text', 'Decorator name', '', 'infoField', 'buttonNext5', divCont8 );
											let buttonNext5 = document.getElementById('buttonNext5') as HTMLButtonElement;
											buttonNext5.addEventListener('click', async (e: Event) =>{
												
				
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
						divCont3.appendChild(divCont4);
					});
					divCont2.appendChild(divCont3);
				});
				let radio222 = document.getElementById('radio222') as HTMLInputElement;
				radio222.addEventListener('click', async (e: Event) =>{
					divCont2.innerHTML = "";
					let divCont3 = document.createElement('div');
					radioQuestion('<br>Do you want to communicate  (reuse or hide the complexity) of an exiting artifact (class or subsystem)? <br>', 'Yes', 'No', 'radio2221', 'radio2222', divCont2);
					let radio2221 = document.getElementById('radio2221') as HTMLInputElement;
					radio2221.addEventListener('click', async (e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						radioQuestion('<br>Communicate with one class or subsystem? <br>', 'One', 'Subsystem', 'radio22211', 'radio22212', divCont3);
						let radio22211 = document.getElementById('radio22211') as HTMLInputElement;
						radio22211.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							let divCont5 = document.createElement('div');
							radioQuestion('<br>Do you need an interface in order to reduce memory usage? <br>', 'Yes', 'No', 'radio222111', 'radio222112', divCont4);
							let radio222111 = document.getElementById('radio222111') as HTMLInputElement;
							radio222111.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								//let divCont6 = document.createElement('div');
								//radioQuestion('<br>Do you need an interface in order to reduce memory usage? <br>', 'Yes', 'No', 'radio222111', 'radio222112', divCont4);
							
							});
							let radio222112 = document.getElementById('radio222112') as HTMLInputElement;
							radio222112.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								let divCont6 = document.createElement('div');
								radioQuestion('<br>Are you unable to change the interface of the existing class? <br>', 'Yes', 'No', 'radio2221121', 'radio2221122', divCont5);
								let radio2221121 = document.getElementById('radio2221121') as HTMLInputElement;
								radio2221121.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									//let divCont7 = document.createElement('div');
									radioQuestion('<br>Are you unable to change the interface of the existing class? <br>', 'Yes', 'No', 'radio2221121', 'radio2221121', divCont6);
								
							
								});
								let radio2221122 = document.getElementById('radio2221122') as HTMLInputElement;
								radio2221122.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									createLabel('There is no pattern.', '', divCont6);							
								});
								divCont5.appendChild(divCont6);
							});
							divCont4.appendChild(divCont5);
						});
						let radio22212 = document.getElementById('radio22212') as HTMLInputElement;
						radio22212.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							//let divCont5 = document.createElement('div');
							//radioQuestion('<br>Communicate with one class or subsystem? <br>', 'One', 'Subsystem', 'radio22211', 'radio22212', divCont4);
							
						});
						divCont3.appendChild(divCont4);
					});
					let radio2222 = document.getElementById('radio2222') as HTMLInputElement;
					radio2222.addEventListener('click', async (e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						radioQuestion('<br>Do you need access control for the some service class? <br>', 'Yes', 'No', 'radio22221', 'radio22222', divCont2);
						let radio22221 = document.getElementById('radio22221') as HTMLInputElement;
						radio22221.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							//let divCont5 = document.createElement('div');
							//radioQuestion('<br>Do you need access control for the some service class? <br>', 'Yes', 'No', 'radio22221', 'radio22222', divCont2);
						
						});
						let radio22222 = document.getElementById('radio22222') as HTMLInputElement;
						radio22222.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							createLabel('There is no pattern.', '', divCont4);						
						});
						divCont3.appendChild(divCont4);
					});
					divCont2.appendChild(divCont3);
				});
				divCont1.appendChild(divCont2);
			});
			divCont.appendChild(divCont1);
		});
		createLabel('Behavioral', 'label3', divWiz);
		createInput('', 'radio3', '', 'patternTypes', 'radio', divWiz);
		let radio3 = document.getElementById('radio3') as HTMLInputElement;
		radio3.addEventListener('click', async (e: Event) =>{
			divCont.innerHTML = "";
			createLabel('<br> Do you want to ... <br>', 'labelQuestion19', divCont);
		});
		
		divWiz.appendChild(divCont);
	}	
}

function radioQuestion(questionLabel: string, labelRadio1: string, labelRadio2: string, radioId1: string, radioId2: string, parent: HTMLElement){
	createLabel(questionLabel, '', parent);
	createLabel(labelRadio1, '', parent);
	createInput('', radioId1, '', 'yes_no', 'radio', parent);
	createLabel(labelRadio2, '', parent);
	createInput('', radioId2, '', 'yes_no', 'radio', parent);
}

function textfieldQuestion(questionLabel: string, num: number, inputType: string, inputMessage: string, inputId: string, inputClassname: string, buttonId: string, parent: HTMLElement){
	createLabel(questionLabel, '', parent);
	if (num==1){
		createInput(inputMessage, inputId, inputClassname, inputId, inputType, parent);
	}else{
		for (let i=1; i<=num; i++){
			createInput(inputMessage+i, inputId+i, inputClassname, inputId+i, inputType, parent);
		}
	}
	createButton('Next', buttonId, parent);
}

function createLabel(innerMessage: string, id: string, parent: HTMLElement){
	let labelQuestion = document.createElement('label');
	labelQuestion.innerHTML = innerMessage;
	labelQuestion.id = id;
	parent.appendChild(labelQuestion);
}

function createInput(innerMessage: string, id: string, classname: string, name: string, type: string, parent: HTMLElement){
	let inputField = document.createElement('input');
	inputField.placeholder = innerMessage;
	inputField.id = id;
	if (!id.includes('radio') && !id.includes('Num')){
		inputField.className = classname;
		if (!id.includes('Method')){
			inputField.pattern = "^([A-Z]{1}[a-zA-Z]*[0-9]*)$";
		}else{
			inputField.pattern = "^([a-z]{1}[a-zA-Z]*[0-9]*)$"; //camel
		}
		let suggestions = document.createElement("div");
		suggestions.id = "suggestions"+id.substring(6,);
		suggestions.className = "suggestions";
		parent.appendChild(suggestions);
		inputField.addEventListener('keypress', (e: KeyboardEvent) =>{
			showSuggestions(inputField.value, extensionWidget.res, ( e.target as Element).id);
			});
		inputField.autocomplete = "off";
	}
	inputField.name = name;
	inputField.type = type;
	parent.appendChild(inputField);
}
//autocomplete
function showSuggestions(value: string, table: string[], id: string){
	let res = document.getElementById("suggestions"+id.substring(6,))as HTMLElement;
		
  		let list = '';
  		let terms = autocompleteMatch(value, table);
  		for (var i=0; i<terms.length; i++) {
    		list += '<li>' + terms[i] + '</li>';
  		}
  		res.innerHTML = "<ul id='list" + id.substring(6,) + "'> "+ list + "</ul>";
		let ul = document.getElementById("list"+id.substring(6,))as HTMLElement;
		let input = document.getElementById("txtbox"+id.substring(6,))as HTMLInputElement;
		ul.onclick = function(event) {
			input.value = (event.target as HTMLLIElement).innerHTML ;
			res.style.visibility = 'hidden';
		}	
		let hideBlock = function(){
			res.style.visibility = 'hidden';
		};
		ul.addEventListener('mouseleave', hideBlock);
		input.addEventListener('keypress', (e: KeyboardEvent) =>{
			res.style.visibility = 'visible';
			showSuggestions((document.getElementById("txtbox"+id.substring(6,))as HTMLInputElement).value, table, ( e.target as Element).id);
		});

}
//autocomplete
function autocompleteMatch(input: string, table: string[]) {
	if (input == '') {
		return [];
	  }
	  let reg = new RegExp('^' + input);
	  return table.filter(function(term) {
		  if (term.match(reg)) {
			return term;
		  }
	  });
}

function createButton(innerMessage: string, id: string, parent: HTMLElement){
	let button = document.createElement('button');
	button.innerHTML = innerMessage;
	button.id = id;
	parent.appendChild(button);
}


