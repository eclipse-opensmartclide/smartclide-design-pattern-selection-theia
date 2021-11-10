import * as React from 'react';

import { injectable, postConstruct, inject } from 'inversify';
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';

import { HelloBackendService } from '../common/protocol';
import data from './data.json';



@injectable()
export class extensionWidget extends ReactWidget {
	
	[x: string]: any;

    static readonly ID = 'extension:widget';
    static readonly LABEL = 'Extension Widget';
	
    static state = {
		statePatternSelection: '',
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
	static textBoxValues: Array<string> = [];
	static res: string[];
	static data = JSON.parse(JSON.stringify(data));
	
	protected render(): React.ReactNode {
		const header = `Choose a Design Pattern and get the code. `;
		
		return <div id='widget-container'>
		<AlertMessage type='INFO' header={header} />
		<div id='issues'>
				<br />
				<select id="drop-down-patterns" onChange={this.updateSelection} name="statePatternSelection">
						<option id="empty-choice" value="Choose_pattern">Choose pattern</option>
					<optgroup label="Creational">
						<option value="Abstract Factory">Abstract Factory</option>
						<option value="Builder">Builder</option>
						<option value="Factory Method">Factory Method</option>
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
						<option value="Chain of Responsibility">Chain of Responsibility</option>
						<option value="Command">Command</option>
						<option value="Interpreter">Interpreter</option>
						<option value="Iterator">Iterator</option>
						<option value="Mediator">Mediator</option>
						<option value="Memento">Memento</option>
						<option value="Observer">Observer</option>
						<option value="State">State</option>
						<option value="Strategy">Strategy</option>
						<option value="Template Method">Template Method</option>
						<option value="Visitor">Visitor</option>
					</optgroup>
				</select><br /> 
				<br /> 
				<button id="btn-get-code" type="button" title='Get the code according to the pattern' onClick={_a => this.runprocess()}> Get Code </button>
				<br /> 
				<div id="show_pattern"> 
					
				</div>
				<br /> 
				<div id="result">
					<table id="show_pattern_table">
					</table>
				</div>
			</div>
			</div>
	}
	
    protected async runprocess(): Promise<void> {
		if (extensionWidget.state.statePatternSelection!="Choose_pattern" && extensionWidget.state.statePatternSelection!=""){
			(document.getElementById("btn-get-code") as HTMLButtonElement).style.visibility = 'hidden';

			var getUrl = window.location.href;
			extensionWidget.res = await this.helloBackendService.sayHelloTo(getUrl);
			for (let i=0; i<extensionWidget.res.length; i++){
            	let lastW = extensionWidget.res[i].lastIndexOf("/");
				let file = extensionWidget.res[i].substr(lastW+1);
				file = file.substr(0, file.indexOf("."));
				extensionWidget.res[i] = file;  
			}

			//show the JSON values for the chosen key-pattern
			let values = extensionWidget.data[extensionWidget.state.statePatternSelection].values; //data[extensionWidget.state.statePatternSelection];
			var table = document.getElementById('show_pattern_table') as HTMLTableElement;
			Object.keys(values).forEach((key) =>{
				let row = this.insertCells(table, key);
				if(values[key].extension==1){
					let cell3 = row.insertCell(2);
					let t3 = document.createElement("button");
					t3.innerHTML = "+";
					t3.id = "btn"+ key;
					cell3.appendChild(t3);
					t3.addEventListener('click', (event) => {
						this.extensionButtonClick(table, ( event.target as Element).id, extensionWidget.data[extensionWidget.state.statePatternSelection].values);
					});	
				}
			});
			let d = document.getElementById("result") as HTMLElement;
			let b = document.createElement("button");
			b.id = "btnFinalize";
			b.innerHTML = "Finally Get Code";
			b.addEventListener('click', (_event) => {
				this.buttonClick2(table.rows.length);							
			});
			d.appendChild(b);  
		}else{
			this.messageService.info('You need to choose a software pattern!');
		}
	}

    //update the state of dropdown
    updateSelection(e:React.ChangeEvent<HTMLSelectElement>){
		const key =  e.currentTarget.name as keyof typeof extensionWidget.state;
		extensionWidget.state[key]  = e.currentTarget.value;
	}
	
	insertCells(table: HTMLTableElement, key: string){
		let index = 0;
		for (var i=0; i<table.rows.length; i++){
			let label = (document.getElementById( 'label'+ (i + 1) ) as HTMLLabelElement).innerHTML;
			if (key>label) index++;
			console.log(key>label);
		}
		let row = table.insertRow(index);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let t1 = document.createElement("label");
		t1.id = "label"+ table.rows.length;
		t1.innerHTML = key;

		let t2 = document.createElement("input");
		t2.id = "txtbox"+ table.rows.length;
		let num = table.rows.length;
		t2.onchange = function () {  
			extensionWidget.textBoxValues[num-1] = t2.value;
		};
		t2.autocomplete = "off";
		t2.placeholder = key;
		t2.addEventListener('keypress', (e: KeyboardEvent) =>{
			this.showSuggestions(t2.value, ( e.target as Element).id);
		});
		let t3 = document.createElement("div");
		t3.id = "suggestions"+table.rows.length;
		t3.className = "suggestions";
		
		cell1.appendChild(t1);
		cell2.appendChild(t2);
		cell2.appendChild(t3);
		return row;
	}
	//when button is clicked adds one label and one input of the specific class that the user wants to insert one more 
	extensionButtonClick (table: HTMLTableElement, key: string, values: string) {
		let newValues = JSON.parse(JSON.stringify(values));
		let count = this.countKeys(values, key.substr(3, ));
		if(extensionWidget.state.statePatternSelection=="Abstract Factory"){
			if(key.includes("AbstractProduct")){
				let labelAbstrProd = this.updateLabel(key.substr(3,), count+1);
				newValues[labelAbstrProd] = JSON.stringify({name:"",extension:1});
				this.insertCells(table, labelAbstrProd);
				var numProd = (this.countKeys(values, "Product") / count) - 1;// number of "Products"
				for(let j = 0 ; j < numProd; j++ ){
					let labelProduct = "Product"+ (count+1) + "."+(j+1);
					this.insertCells(table, labelProduct);
					newValues[labelProduct]= JSON.stringify({ "name":"", "extension":1});
				}
			}else{
				let labelConFactory = this.updateLabel("ConcreteFactory ", count+1);
				this.insertCells(table, labelConFactory);
				
				let numAbstrProd = this.countKeys(newValues, "AbstractProduct"); 
				newValues[labelConFactory] =  JSON.stringify({ "name":"", "extension":1});
				for(let j = 0; j < numAbstrProd ; j++){
					let labelProduct = "Product"+(j+1)+"." + (count+1);
					this.insertCells(table, labelProduct);
					newValues[labelProduct] = JSON.stringify({ "name":"", "extension":1});
				}	
			}
		}else if(extensionWidget.state.statePatternSelection=="Builder"){
			let labelProduct = this.updateLabel("Product ", count+1);
			let labelConBuilder = this.updateLabel("ConcreteBuilder ", count+1);

			newValues[labelProduct] =  JSON.stringify({ "name":"", "extension":1});
			newValues[labelConBuilder] = JSON.stringify({ "name":"", "extension":1});
						 
			this.insertCells(table, labelConBuilder); 
			this.insertCells(table, labelProduct);
		}else if(extensionWidget.state.statePatternSelection=="Factory Method") {
			let labelProduct = this.updateLabel("ConcreteProduct ", count+1);
			let labelConCreator = this.updateLabel("ConcreteCreator ", count+1);

			newValues[labelProduct] =  JSON.stringify({ "name":"", "extension":1});
			newValues[labelConCreator] = JSON.stringify({ "name":"", "extension":1});
						 
			this.insertCells(table, labelConCreator); 
			this.insertCells(table, labelProduct);
		}else if(extensionWidget.state.statePatternSelection=="Adapter") {
			let labelAdapter = this.updateLabel("Adapter ", count+1);
			let labelAdaptee = this.updateLabel("Adaptee ", count+1);

			newValues[labelAdapter] =  JSON.stringify({ "name":"", "extension":1});
			newValues[labelAdaptee] = JSON.stringify({ "name":"", "extension":1});
						 
			this.insertCells(table, labelAdapter); 
			this.insertCells(table, labelAdaptee);	
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
			let label = this.updateLabel(key.substr(3, ), count+1);
			newValues[label] = JSON.stringify({"name":"", "extension":1});
			this.insertCells(table, label); 
		}
		extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
	}

	buttonClick2 (rows : number):void{
		if (rows!=extensionWidget.textBoxValues.length){
			this.messageService.info("You need to give name for ALL the classes!");
		}else{
			if (this.checkInputs() == "Inputs are valid"){
				this.updateJsonObject();
				this.messageService.info("Well done! Code is coming...");
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
		keyString = keyString.slice(0, -1)
		Object.keys(values).forEach((key) =>{
			if(key.includes(keyString)){
				count ++;
			}
		});
		return count;
	}
	//autocomplete
	showSuggestions(value: string, id: string){
		let res = document.getElementById("suggestions"+id.substr(6,))as HTMLElement;
		
  		let list = '';
  		let terms = this.autocompleteMatch(value);
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
			this.showSuggestions((document.getElementById("txtbox"+id.substr(6,))as HTMLInputElement).value, ( e.target as Element).id);
		});

	}
	//autocomplete
	autocompleteMatch(input: string) {
		if (input == '') {
			return [];
	  	}
	  	let reg = new RegExp('^' + input);
	  	return extensionWidget.res.filter(function(term) {
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
				if(txtbox.match("^([A-Z]{1}[a-zA-Z]*[0-9]*)$")){
					count++;
				}
			}
			return (count==table.rows.length ? "Inputs are valid" : "Inputs are invalid")
		}
		
	}
	checkInputsForSameValues(){
		//return (extensionWidget.textBoxValues.every( (val, i, arr) => val === arr[0] ) ) ;
		return extensionWidget.textBoxValues.some((val, i) => extensionWidget.textBoxValues.indexOf(val) !== i);
	}

}
