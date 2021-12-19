import * as React from 'react';

import { injectable, postConstruct, inject } from 'inversify';
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';

import { HelloBackendService } from '../common/protocol';
import data from './data.json';
import explanation from './explanation.json';

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
	static textBoxValues: Array<string> = [];
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
				<button id="btn-wizard" type="button" title='Wizard' onClick={_a => this.runWizard()}>Wizard</button>
				<br /> 
				<br />
				<button id="btn-get-code" type="button" title='Assign roles to classes and methods' onClick={_a => this.runprocess()}>Assign roles to classes and methods</button>
				<br /> 
				<div id="show_pattern"> 
					
				</div>
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
						<button id ="btnFinalize" type="button" title='Get the code according to the pattern'  onClick={_a => this.buttonClick2((document.getElementById('show_pattern_table') as HTMLTableElement).rows.length)}> Get Code </button>
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
			//await this.helloBackendService.main();
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
			let num = table.rows.length;
			txtbox.onchange = function () { 
				extensionWidget.textBoxValues[num-1] = txtbox.value;
			};
			txtbox.autocomplete = "off";
			txtbox.placeholder = key;
			if (!key.includes("Method")){
				txtbox.addEventListener('keypress', (e: KeyboardEvent) =>{
					this.showSuggestions(txtbox.value, extensionWidget.res, ( e.target as Element).id);
					});
				let suggestions = document.createElement("div");
				suggestions.id = "suggestions"+table.rows.length;
				suggestions.className = "suggestions";
				cell2.appendChild(suggestions);
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
				console.log("count-Add Product"+count);
				label = this.updateLabel(key.substring(3,), count+1);

				newValues[label] = {name:"",extension:0};
				extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;	
				this.insertCells(table, label);
				var numProd = (this.countKeys(values, "ConcreteProduct") / count);// number of "Products" in each Product
				for(let j = 0 ; j < numProd; j++ ){
					console.log(1)
					let labelProduct = "ConcreteProduct"+ (count+1) + "."+(j+1);
					newValues[labelProduct]= { "name":"", "extension":0};
					extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
					this.insertCells(table, labelProduct);
				}
				console.log(JSON.stringify(extensionWidget.data[extensionWidget.state.statePatternSelection].values))
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
				console.log(JSON.stringify(extensionWidget.data[extensionWidget.state.statePatternSelection].values))

			}
		}else if(extensionWidget.state.statePatternSelection=="Builder" && key.includes("Product")){
			let labelConBuilder = this.updateLabel("ConcreteBuilder ", count+1);

			newValues[label] =  { "name":"", "extension":0};
			newValues[labelConBuilder] = { "name":"", "extension":0};
			extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;	
			this.insertCells(table, label); 
			this.insertCells(table, labelConBuilder); 
		}else if(extensionWidget.state.statePatternSelection=="FactoryMethod") {
			let labelConPro = this.updateLabel("ConcreteProduct ", count+1);
			
			newValues[label] = { "name":"", "extension":0};
			newValues[labelConPro] = { "name":"", "extension":0};
			extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
			this.insertCells(table, label);				 
			this.insertCells(table, labelConPro); 
		}else if(extensionWidget.state.statePatternSelection=="Decorator" && key.includes("ConcreteDecorator")) {
			console.log("label1" + key.substr(3,));
			let labelConDec = this.updateLabel(key.substr(3,), (count/2+1));
			console.log("label2" + labelConDec);
			let labelmethod = labelConDec + "Method";
			
			newValues[label] =  { "name":"", "extension":0};
			newValues[labelmethod] = { "name":"", "extension":0};
			extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;	
			this.insertCells(table, labelConDec); 
			this.insertCells(table, labelmethod); 
		}else if(extensionWidget.state.statePatternSelection=="Flyweight") {	 
			let label = this.updateLabel(key.substr(3,), count/2+1); 
			let labelAttr = label + "Attribute";

			newValues[label] = {"name":"", "extension":0};
			newValues[labelAttr] = {"name":"", "extension":1};
			extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
			this.insertCells(table, label);
			this.insertCells(table, labelAttr);
		}else if(extensionWidget.state.statePatternSelection=="Command"){
			if(key.includes("MethodParameter")){
				let count = 0;
				key = key.substr(3,);
				let nkey = key.substr(0, key.length-1);
				console.log("key.length "+key.length);
				console.log("nkey "+nkey);
				Object.keys(newValues).forEach((vkey) =>{
					if(vkey.includes(nkey)){
						count ++;
					}
				});
				console.log("count "+count);
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

	async buttonClick2 (rows : number):Promise<void>{
		if (!this.checkEmptyInputs(rows)){
			this.messageService.info("You need to give name for ALL the classes!");
		}else{
			if (this.checkInputs() == "Inputs are valid"){
				if (extensionWidget.state.statePatternSelection=="Adapter"){
					let adapteeName = (document.getElementById("txtbox4") as HTMLInputElement).value;
					var getUrl = window.location.href;
					var methodNames = await this.helloBackendService.getMethods(getUrl, adapteeName);
					console.log(methodNames);
					if (extensionWidget.res.includes(adapteeName)){
						//call function to get methods (methodNames) of adapteeName class 
						
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
				this.messageService.info("Inputs are invalid");
			}
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
	//autocomplete
	showSuggestions(value: string, table: string[], id: string){
		let res = document.getElementById("suggestions"+id.substr(6,))as HTMLElement;
		
  		let list = '';
  		let terms = this.autocompleteMatch(value, table);
  		for (var i=0; i<terms.length; i++) {
    		list += '<li>' + terms[i] + '</li>';
  		}
  		res.innerHTML = "<ul id='list" + id.substr(6,) + "'> "+ list + "</ul>";
		let ul = document.getElementById("list"+id.substr(6,))as HTMLElement;
		let input = document.getElementById("txtbox"+id.substr(6,))as HTMLInputElement;
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
			this.showSuggestions((document.getElementById("txtbox"+id.substr(6,))as HTMLInputElement).value, table, ( e.target as Element).id);
		});

	}
	//autocomplete
	autocompleteMatch(input: string, table: string[]) {
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

	updateJsonObject(){
		let table = document.getElementById('show_pattern_table') as HTMLTableElement;
		for(let i = 0 ; i < table.rows.length ; i++){
			let label = (document.getElementById( 'label'+ (i + 1) ) as HTMLLabelElement).innerHTML;
			let txtbox = (document.getElementById( 'txtbox'+ (i + 1) ) as HTMLInputElement).value;
			extensionWidget.data[extensionWidget.state.statePatternSelection].values[label].name = txtbox;
			}
	}

	checkInputs(){
		let count = 0;
		const table = document.getElementById('show_pattern_table') as HTMLTableElement;
		if (this.checkInputsForSameValues()){
			return ("Inputs are invalid");
		}else{
			for(let i = 0 ; i < table.rows.length; i++){
				const txtbox = (document.getElementById( 'txtbox'+ (i + 1) ) as HTMLInputElement).value;
				const labelvalue = (document.getElementById( 'label'+ (i + 1) ) as HTMLElement).innerHTML;
				if (labelvalue.includes("Method")){
					if(txtbox.match("^([a-z]{1}[a-zA-Z]*[0-9]*)$")){//camel writing names of methods
						count++;
					}
				}else {
					if(txtbox.match("^([A-Z]{1}[a-zA-Z]*[0-9]*)$")){//general case
						count++;
					}
				}
			}
			return (count==(table.rows.length) ? "Inputs are valid" : "Inputs are invalid")
		}	
	}
	//method that checks for duplicate values
	checkInputsForSameValues(){
		const uniqueElements = extensionWidget.textBoxValues;
		let resultToReturn = false;
		for (let i = 0; i < uniqueElements.length; i++) { // nested for loop
			for (let j = 0; j < uniqueElements.length; j++) {
				// prevents the element from comparing with itself
				if (i != j) {
					// check if elements' values are equal
					if (uniqueElements[i] == uniqueElements[j] && uniqueElements[i]!=undefined) {
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
		return(resultToReturn) 
	}

	
	refreshPage(table: HTMLTableElement){
		table.innerHTML = "";
		(document.getElementById("btn-get-code") as HTMLButtonElement).style.visibility = 'visible';
		//(document.getElementById("elements") as HTMLElement).style.visibility = 'hidden';
		(document.getElementById("result") as HTMLElement).style.visibility = 'hidden';
	}

	runWizard(){
		(document.getElementById("issues") as HTMLElement).style.visibility = 'hidden';
		(document.getElementById("issues") as HTMLElement).style.height = '0px';
		let divWiz = document.getElementById('divWiz') as HTMLDivElement;
		divWiz.style.marginLeft = '10px';
		let divCont = document.createElement('div');
		createLabel('Choose the type of the pattern: <br>', 'label0', divWiz);
		createLabel('Creational', 'label1', divWiz)
		createInput('', 'radio1', '', 'patternTypes', 'radio', divWiz);
		let radio1 = document.getElementById('radio1') as HTMLInputElement;
		radio1.onclick = function(){	
				divCont.innerHTML = "";
				let divCont2 = document.createElement('div');
				createLabel('<br> Do you want to create a completely new object or to create one by reusing an existing one?<br>', 'label4', divCont);
				createLabel('Create new object', 'label11',divCont);
				createInput('', 'radio11', '', 'new_existed', 'radio', divCont);
				let radio11 = document.getElementById('radio11') as HTMLInputElement;
				radio11.onclick = function(){	
						divCont2.innerHTML = "";
						let divCont3 = document.createElement('div');
						createLabel('<br> Give the name of the Product that you want to create (Let X the name of the product)<br>', 'labelQuestion3', divCont2);
						createInput('Product name', 'product_name', 'infoField', '', 'text', divCont2);
						createButton('Next', 'buttonNext1', divCont2);
						let buttonNext1 = document.getElementById('buttonNext1') as HTMLButtonElement;
						buttonNext1.onclick = function(){
							divCont3.innerHTML = "";
							let divCont4 = document.createElement('div');
							createLabel('<br> Does the Product has sub-categories (Concrete Products)? <br>', 'labelQuestion4', divCont3);
							createLabel('Yes', 'label31', divCont3);
							createInput('', 'radio31', '', 'yes_no', 'radio', divCont3);
							let radio31 = document.getElementById('radio31') as HTMLInputElement;
							radio31.onclick = function(){
								divCont4.innerHTML = "";
								let divCont5 = document.createElement('div');
								createLabel('<br> How many sub-categories exist? <br>', 'labelQuestion5', divCont4);
								createInput('0', 'subcategoriesNum', '', '', 'number', divCont4);
								createButton('Next', 'buttonNext2', divCont4);
								let buttonNext2 = document.getElementById('buttonNext2') as HTMLButtonElement;
								buttonNext2.onclick = function(){
									divCont5.innerHTML = "";
									let divCont6 = document.createElement('div');
									createLabel('<br> Please give the names of the Concrete Products <br>', 'labelQuestion6', divCont5);
									let num = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
									for (var i=1; i<=num; i++){
										createInput('Concrete Product name '+i, 'txtConcreteProductsName'+i, 'infoField', '', 'text', divCont5);
									}
									createButton('Next', 'buttonNext3', divCont5);
									let buttonNext3 = document.getElementById('buttonNext3') as HTMLButtonElement;
									buttonNext3.onclick = function(){
										divCont6.innerHTML = "";
										let divCont7 = document.createElement('div');
										createLabel('<br> Can the Products be classified in a Family? <br>', 'labelQuestion7', divCont6);
										createLabel('Yes', 'label61', divCont6);
										createInput('', 'radio61', '', 'yes_no', 'radio', divCont6);
										let radio61 = document.getElementById('radio61') as HTMLInputElement;
										radio61.onclick = function(){
											divCont7.innerHTML = "";
											let divCont8 = document.createElement('div');
											createLabel('<br> How many Families of Products exist? <br>', 'labelQuestion8', divCont7);
											createInput('0', 'familiesNum', '', '', 'number', divCont7);
											createButton('Next', 'buttonNext4', divCont7);
											let buttonNext4 = document.getElementById('buttonNext4') as HTMLButtonElement;
											buttonNext4.onclick = function(){
												divCont8.innerHTML = "";
												let divCont9 = document.createElement('div');
												createLabel('<br> Please give the names of the Components <br>', 'labelQuestion9', divCont8);
												let num = parseInt((document.getElementById('familiesNum') as HTMLInputElement).value);
												for (var i=1; i<=num; i++){
													createInput('Component name '+i, 'txtComponentName', 'infoField', '', 'text', divCont8);
												}
												createButton('Next', 'buttonNext5', divCont8);
												let buttonNext5 = document.getElementById('buttonNext5') as HTMLButtonElement;
												buttonNext5.onclick = function(){
													createLabel('<br> Abstract Factory Pattern   ', 'labelQuestion10', divCont9);
													createButton('Get Code', 'getcodeAbstractFactoryPattern', divCont9);
													let buttonCodeAFP = document.getElementById('getcodeAbstractFactoryPattern') as HTMLButtonElement;
													buttonCodeAFP.onclick = function(){
														//code generation
													}
												}
												divCont8.appendChild(divCont9);
											}
											divCont7.appendChild(divCont8);
										}
										createLabel('No', 'label62', divCont6);
										createInput('', 'radio62', '', 'yes_no', 'radio', divCont6);
										let radio62 = document.getElementById('radio62') as HTMLInputElement;
										radio62.onclick = function(){
											divCont7.innerHTML = "";
											let divCont8 = document.createElement('div');
											createLabel('<br> Can Product be created as series of steps which is different in every subcategory? <br>', 'labelQuestion11', divCont7);
											createLabel('Yes', 'label71', divCont7);
											createInput('', 'radio71', '', 'yes_no', 'radio', divCont7);
											let radio71 = document.getElementById('radio71') as HTMLInputElement;
											radio71.onclick = function(){
												divCont8.innerHTML = "";
												let divCont9 = document.createElement('div');
												createLabel('<br> How many Steps are involved ?  <br>', 'labelQuestion12', divCont8);
												createInput('0', 'stepsNum', '', '', 'number', divCont8);
												createButton('Next', 'buttonNext6', divCont8);
												let buttonNext6 = document.getElementById('buttonNext6') as HTMLButtonElement;
												buttonNext6.onclick = function(){
													divCont9.innerHTML = "";
													let divCont10 = document.createElement('div');
													createLabel('<br> Please give the name of the steps  <br>', 'labelQuestion13', divCont9);
													let num = parseInt((document.getElementById('stepsNum') as HTMLInputElement).value);
													for (var i=1; i<=num; i++){
														createInput('Step name '+i, 'txtStepName'+i, 'infoField', 'txtStepsName', 'text', divCont9);
													}
													createButton('Next', 'buttonNext7', divCont9);
													let buttonNext7 = document.getElementById('buttonNext7') as HTMLButtonElement;
													buttonNext7.onclick = function(){
														createLabel('<br> Builder Pattern   ', 'labelPattern1', divCont10);
														createButton('Get Code', 'getcodeBuildPattern', divCont10);
														let buttonCodeBP = document.getElementById('getcodeBuildPattern') as HTMLButtonElement;
														buttonCodeBP.onclick = function(){
														//code generation
														}
													}
													divCont9.appendChild(divCont10);
												}
												divCont8.appendChild(divCont9);
											}
											createLabel('No', 'label72', divCont7);
											createInput('', 'radio72', '', 'yes_no', 'radio', divCont7);
											let radio72 = document.getElementById('radio72') as HTMLInputElement;
											radio72.onclick = function(){
												divCont8.innerHTML = "";
												let divCont9 = document.createElement('div');
												createLabel('<br> What is the name of the Creator (e.g., Oven) of Product? <br>', 'labelQuestion14', divCont8);
												createInput('Creator name', 'txtCreatorName', 'infoField', 'txtCreatorName', 'text', divCont8);
												createButton('Next', 'buttonNext8', divCont8);
												let buttonNext8 = document.getElementById('buttonNext8') as HTMLButtonElement;
												buttonNext8.onclick = function(){
													createLabel('<br> Factory Method Pattern   ', 'labelQuestion15', divCont9);
													createButton('Get Code', 'getcodeFactoryMethodPattern', divCont9);
													let buttonCodeFMP = document.getElementById('getcodeFactoryMethodPattern') as HTMLButtonElement;
													buttonCodeFMP.onclick = function(){
														//code generation
													}
												}
												divCont8.appendChild(divCont9);
											}
											divCont7.appendChild(divCont8);
										}
										divCont6.appendChild(divCont7);										
									}
									divCont5.appendChild(divCont6);
								}
								divCont4.appendChild(divCont5);
							}
							createLabel('No', 'label32', divCont3);
							createInput('', 'radio32', '', 'yes_no', 'radio', divCont3);
							let radio32 = document.getElementById('radio32') as HTMLInputElement;
							radio32.onclick = function(){
								divCont4.innerHTML = "";
								createLabel('<br> There is no pattern <br>', 'labelQuestion16', divCont4);
							}
							divCont3.appendChild(divCont4);
						}
						divCont2.appendChild(divCont3);
				}
				createLabel('Reuse an existing one', 'label12', divCont);
				createInput('', 'radio12', '', 'new_existed', 'radio', divCont);
				let radio12 = document.getElementById('radio12') as HTMLInputElement;
				radio12.onclick = function(){	
					divCont2.innerHTML = "";
					createLabel('<br> You chose existed <br>', 'labelQuestion17', divCont2);
				}
				divCont.appendChild(divCont2);
		}
		createLabel('Structural', 'label2', divWiz);
		createInput('', 'radio2', '', 'patternTypes', 'radio', divWiz);
		let radio2 = document.getElementById('radio2') as HTMLInputElement;
		radio2.onclick = function(){
			divCont.innerHTML = "";
			createLabel('<br> Do you want to ... <br>', 'labelQuestion18', divCont);
		}
		createLabel('Behavioral', 'label3', divWiz);
		createInput('', 'radio3', '', 'patternTypes', 'radio', divWiz);
		let radio3 = document.getElementById('radio3') as HTMLInputElement;
		radio3.onclick = function(){
			divCont.innerHTML = "";
			createLabel('<br> Do you want to ... <br>', 'labelQuestion19', divCont);
		}
		
		divWiz.appendChild(divCont);
	}

	insertInputsAbstractFactory():void{
		let values = JSON.parse(JSON.stringify(extensionWidget.data[extensionWidget.state.statePatternSelection].values));
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
				console.log(key + " "+values[key].name);
			}
		});
		extensionWidget.data[extensionWidget.state.statePatternSelection].values = values;
	}
	insertInputsFactoryMethod():void{
		let values = JSON.parse(JSON.stringify(extensionWidget.data[extensionWidget.state.statePatternSelection].values));
		let listofConCreators:string[] = [];
		Object.keys(values).forEach((key)=>{
			if(key.includes("ConcreteCreator")) {
				values[key].name = values[key].name + values.Creator.name;
				listofConCreators.push(values[key].name);
			}
		});
		Object.keys(values).forEach((key)=>{
			if(key.includes("ConcreteProduct")){
				var numofConCreator = key.match(/\d/g);
				values[key].name = listofConCreators[Number(numofConCreator)-1].split('Dialog')[0] + values.Product.name;
			}
		});
		extensionWidget.data[extensionWidget.state.statePatternSelection].values = values;
		console.log(JSON.stringify(extensionWidget.data[extensionWidget.state.statePatternSelection].values))
	}
	insertInputsBuilder():void{
		let values = JSON.parse(JSON.stringify(extensionWidget.data[extensionWidget.state.statePatternSelection].values));
		let listofProducts:string[] = [];
		Object.keys(values).forEach((key)=>{
			if(key.includes("Product")) listofProducts.push(values[key].name);
		});
		console.log(listofProducts)
		Object.keys(values).forEach((key)=>{
			if(key.includes("ConcreteBuilder")){
				var numofConBuilder = key.match(/\d/g);
				values[key].name = listofProducts[Number(numofConBuilder)-1] + "Builder";
			}
		});
		extensionWidget.data[extensionWidget.state.statePatternSelection].values = values;
	}
	checkEmptyInputs(rows : number): boolean{
		let flag = true; 
		let i = 0;
		while (i<rows && flag==true){
			const txtvalue = (document.getElementById("txtbox"+(i+1)) as HTMLInputElement).value;
			const label = (document.getElementById("label"+(i+1)) as HTMLLabelElement).innerHTML;
			if (txtvalue=="" && !label.includes("ConcreteProduct")) 
				flag = false; //the inputs have to be non empty except for the input whose label contains the ConcreteProduct role
			else {
				i ++;
			}
		}
		return flag;
	}
	check(key: string){
		return (!key.includes("ConcreteProduct") || extensionWidget.state.statePatternSelection!="AbstractFactory") && (!key.includes("ConcreteProduct") || extensionWidget.state.statePatternSelection!="FactoryMethod") && (!key.includes("ConcreteBuilder") || extensionWidget.state.statePatternSelection!="Builder")
	}
}

function createLabel(innerMessage: string, id: string, parent: HTMLElement){
	let labelQuestion = document.createElement('label');
	labelQuestion.innerHTML = innerMessage;
	labelQuestion.id = id;
	parent.appendChild(labelQuestion);
}

function createInput(innerMessage: string, id: string, classname: string, name: string, type: string, parent: HTMLElement){
	let inputField = document.createElement('input');
	inputField.innerHTML = innerMessage;
	inputField.id = id;
	if (!id.includes('radio') && !id.includes('Num')){
		inputField.className = classname;
	}
	inputField.name = name;
	inputField.type = type;
	parent.appendChild(inputField);
}

function createButton(innerMessage: string, id: string, parent: HTMLElement){
	let button = document.createElement('button');
	button.innerHTML = innerMessage;
	button.id = id;
	parent.appendChild(button);
}
