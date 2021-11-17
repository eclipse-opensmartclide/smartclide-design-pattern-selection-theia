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

    static readonly ID = 'extension:widget';
    static readonly LABEL = 'Extension Widget';
	
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
				<select id="drop-down-patterns" onChange={this.updateSelection} name="statePatternSelection">
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
				<br /> 
				<div id="show_pattern"> 
					
				</div>
				<br /> 
				<div id="result">
					
					<table id="show_pattern_table">
					</table>
					<div id="elements">
						<button id ="btnFinalize" type="button" title='Get the code according to the pattern'  onClick={_a => this.buttonClick2((document.getElementById('show_pattern_table') as HTMLTableElement).rows.length)}> Get Code </button>
						<p id={'description'}></p>
						<p id={'example'}></p>
						<img id = {'image'} alt= "Class Diagram " ></img>
					</div>
				</div>
			</div>
			</div>
	}
	
    protected async runprocess(): Promise<void> {
		if (extensionWidget.state.statePatternSelection!="Choose_pattern" && extensionWidget.state.statePatternSelection!=""){
			(document.getElementById("btn-get-code") as HTMLButtonElement).style.visibility = 'hidden';

			var getUrl = window.location.href;
			extensionWidget.res = await this.helloBackendService.sayHelloTo(getUrl);

			//show the JSON values for the chosen key-pattern
			let values = extensionWidget.data[extensionWidget.state.statePatternSelection].values; //data[extensionWidget.state.statePatternSelection];
			var table = document.getElementById('show_pattern_table') as HTMLTableElement;
			Object.keys(values).forEach(async (key) =>{
				let row = this.insertCells(table, key);
				if(values[key].extension==1){
					let cell3 = (await row).insertCell(2);
					let t3 = document.createElement("button");
					t3.innerHTML = "+";
					t3.id = "btn"+ key;
					cell3.appendChild(t3);
					t3.addEventListener('click', (event) => {
						this.extensionButtonClick(table, ( event.target as Element).id, extensionWidget.data[extensionWidget.state.statePatternSelection].values);
					});	
				}
			});
			(document.getElementById("elements") as HTMLElement).style.visibility = 'visible';
			(document.getElementById('image') as HTMLImageElement).className = extensionWidget.state.statePatternSelection;
			(document.getElementById('description') as HTMLElement).innerHTML = extensionWidget.explanation[extensionWidget.state.statePatternSelection].description;
			(document.getElementById('example') as HTMLElement).innerHTML = extensionWidget.explanation[extensionWidget.state.statePatternSelection].example;
			await this.helloBackendService.main('hello');
		}else{
			this.messageService.info('You need to choose a software pattern!');
		}
	}

    //update the state of dropdown
    updateSelection(e:React.ChangeEvent<HTMLSelectElement>){
		const key =  e.currentTarget.name as keyof typeof extensionWidget.state;
		extensionWidget.state[key]  = e.currentTarget.value;
	}
	
	async insertCells(table: HTMLTableElement, key: string){
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
		
		return row;
	}
	//when button is clicked adds one label and one input of the specific class that the user wants to insert one more 
	extensionButtonClick (table: HTMLTableElement, key: string, values: string) {
		let newValues = JSON.parse(JSON.stringify(values));
		let count = this.countKeys(values, key.substr(3, ));
		let label = this.updateLabel(key.substr(3,), count+1);
		if(extensionWidget.state.statePatternSelection=="Abstract Factory"){
			if(key.includes("AbstractProduct")){
				newValues[label] = JSON.stringify({name:"",extension:1});
				this.insertCells(table, label);
				var numProd = (this.countKeys(values, "Product") / count) - 1;// number of "Products"
				for(let j = 0 ; j < numProd; j++ ){
					let labelProduct = "Product"+ (count+1) + "."+(j+1);
					this.insertCells(table, labelProduct);
					newValues[labelProduct]= JSON.stringify({ "name":"", "extension":1});
				}
			}else{
				this.insertCells(table, label);
				
				let numAbstrProd = this.countKeys(newValues, "AbstractProduct"); 
				newValues[label] =  JSON.stringify({ "name":"", "extension":1});
				for(let j = 0; j < numAbstrProd ; j++){
					let labelProduct = "Product"+(j+1)+"." + (count+1);
					this.insertCells(table, labelProduct);
					newValues[labelProduct] = JSON.stringify({ "name":"", "extension":1});
				}	
			}
		}else if(extensionWidget.state.statePatternSelection=="Builder"){
			let labelConBuilder = this.updateLabel("ConcreteBuilder ", count+1);

			newValues[label] =  JSON.stringify({ "name":"", "extension":1});
			newValues[labelConBuilder] = JSON.stringify({ "name":"", "extension":1});
			
			this.insertCells(table, label); 
			this.insertCells(table, labelConBuilder); 
		}else if(extensionWidget.state.statePatternSelection=="Factory Method") {
			let labelProduct = this.updateLabel("ConcreteProduct ", count+1);
			let labelConCreator = this.updateLabel("ConcreteCreator ", count+1);

			newValues[labelProduct] =  JSON.stringify({ "name":"", "extension":1});
			newValues[labelConCreator] = JSON.stringify({ "name":"", "extension":1});
						 
			this.insertCells(table, labelConCreator); 
			this.insertCells(table, labelProduct);	
		}else if(extensionWidget.state.statePatternSelection=="Flyweight") {
			let label;
			if(key.includes("UnsharedConcreteFlyweight")){
				label = this.updateLabel(key.substr(3, ), count+1);
				 
			}else{
				var numConFly = count - this.countKeys(values, "UnsharedConcreteFlyweight");// number of "ConcreteFlyweight"
				label = this.updateLabel(key.substr(3, ), numConFly+1);
			}
			newValues[label] = JSON.stringify({"name":"", "extension":1});
			this.insertCells(table, label);
		}else if(extensionWidget.state.statePatternSelection=="Command"){
			var labelReceiver = this.updateLabel("Receiver ", count+1);
			var labelConCommand = this.updateLabel("ConcreteCommand ", count+1);

			this.insertCells(table, labelReceiver); 	
			this.insertCells(table, labelConCommand); 

			//inserts new attributes in json object
			newValues[labelReceiver] =  JSON.stringify({ "name":"", "extension":1});
			newValues[labelConCommand] = JSON.stringify({ "name":"", "extension":1});
			
		}else if(extensionWidget.state.statePatternSelection=="Iterator"){
			let labelConAggregate = this.updateLabel("ConcreteAggregate ", count+1);
			let labelConIterator = this.updateLabel("ConcreteIterator ", count+1);
		
			this.insertCells(table, labelConAggregate); 
			this.insertCells(table, labelConIterator); 
			//inserts new attributes in json object
			newValues[labelConAggregate] = JSON.stringify( { "name":"", "extension":1});
			newValues[labelConIterator] = JSON.stringify({ "name":"", "extension":1});

		}else{
			newValues[label] = JSON.stringify({"name":"", "extension":1});
			this.insertCells(table, label); 
		}
		extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
	}

	async buttonClick2 (rows : number):Promise<void>{
		let flag = true;
		let i=0;
		while (i<rows && flag==true){
			const txtvalue = (document.getElementById("txtbox"+(i+1)) as HTMLInputElement).value;
			if (txtvalue=="") flag = false;
			i++;
		}
		if (!flag){
			this.messageService.info("You need to give name for ALL the classes!");
		}else{
			console.log("front1");
			if (this.checkInputs() == "Inputs are valid"){
				console.log("front2");
				if (extensionWidget.state.statePatternSelection=="Adapter"){
					let adapteeName = (document.getElementById("txtbox4") as HTMLInputElement).value;
					var getUrl = window.location.href;
					console.log("front3");
					var methodNames = await this.helloBackendService.getMethods(getUrl, adapteeName);
					console.log(methodNames);
					if (extensionWidget.res.includes(adapteeName)){
						//call function to get methods (methodNames) of adapteeName class 
						
						let methodName = (document.getElementById("txtbox5") as HTMLInputElement).value;
						if (methodNames.includes(methodName)){
							this.updateJsonObject();
							this.messageService.info("Well done! Code is coming...");
						}else{
							this.messageService.info("For Adaptee method you need to choose a method name that already exists in Adaptee class: "+methodNames);
						}
					}else{
						this.messageService.info("For Adaptee you need to choose a class name that already exists: "+extensionWidget.res);
					}
				}else{
					this.updateJsonObject();
					this.messageService.info("Well done! Code is coming...");
				}
			}else{
				this.messageService.info("Inputs are invalid");
			}
		}
	}

	updateLabel(value: string, count: number){
		return (value.includes('.') ? value.substring(0,value.length-2) + '.' + count : value.slice(0,-1) + count);
	}

	countKeys(values: string, keyString: string){
		let count = 0;
		let string = keyString.replace(/\d/g, ''); //removes the numbers from the string and returns a new one
		Object.keys(values).forEach((key) =>{
			if(key.includes(string)){
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
				}else{
					if(txtbox.match("^([A-Z]{1}[a-zA-Z]*[0-9]*)$")){
						count++;
					}
				}
			}
			return (count==table.rows.length ? "Inputs are valid" : "Inputs are invalid")
		}	
	}

	checkInputsForSameValues(){
		const uniqueElements = new Set(extensionWidget.textBoxValues);
		return uniqueElements.size<extensionWidget.textBoxValues.length ? true : false;
    	
	}
	refreshPage(table: HTMLTableElement){
		table.innerHTML = "";
		(document.getElementById("btn-get-code") as HTMLButtonElement).style.visibility = 'visible';
		(document.getElementById("elements") as HTMLElement).style.visibility = 'hidden';

	}

}


