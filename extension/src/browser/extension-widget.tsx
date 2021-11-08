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
				if(values[key].insertMethods){
					if (values[key].insertMethods==1){
						var keys = Object.keys(values[key]);
						let row = this.insertCells(table, keys[3]);
						let cell3 = row.insertCell(2);
						let t3 = document.createElement("button");
						t3.innerHTML = "+";
						t3.id = "btn" + '-' + key + '-' + keys[3];
						cell3.appendChild(t3);
						t3.addEventListener('click', (event) => {
							this.extensionButtonClick(table, ( event.target as Element).id, extensionWidget.data[extensionWidget.state.statePatternSelection].values);
							console.log("NEW VALUES: "+ JSON.stringify(extensionWidget.data[extensionWidget.state.statePatternSelection].values));
						});	
						
					}else{
						var keys = Object.keys(values[key]);
						this.insertCells(table, keys[3]);
					}
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
		let row = table.insertRow(table.rows.length);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
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
		txtbox.addEventListener('keypress', (e: KeyboardEvent) =>{
			this.showSuggestions(txtbox.value, ( e.target as Element).id);
		});

		let suggestions = document.createElement("div");
		suggestions.id = "suggestions"+table.rows.length;
		suggestions.className = "suggestions";
		
		cell1.appendChild(label);
		cell2.appendChild(txtbox);
		cell2.appendChild(suggestions);
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

		}else if(key.substr(3,).includes("method")){
			var string = key.split('-');
			let countMethods = this.countKeys(newValues[string[1]],"method")
			let labelMethod = this.updateLabel("method ", countMethods+1);
			this.insertCells(table, labelMethod);
			newValues[string[1]][labelMethod] = "";
		}else{
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
		console.log(typeof values)
		let string = keyString.replace(/\d/g, ''); //removes the numbers from the string and returns a new one
		Object.keys(values).forEach((key) =>{
			if(key.includes(string)){
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
				const label = (document.getElementById( 'label'+ (i + 1) ) as HTMLLabelElement).innerHTML;
				if(txtbox.match("^([A-Z]{1}[a-zA-Z]*[0-9]*)$")){
					count++;
				}
				/*if(extensionWidget.state.statePatternSelection=="Adapter" && extensionWidget.data[extensionWidget.state.statePatternSelection].values[label].method1){

				}*/
			}
			return (count==table.rows.length ? "Inputs are valid" : "Inputs are invalid")
		}
		
	}
	checkInputsForSameValues(){
		//return (extensionWidget.textBoxValues.every( (val, i, arr) => val === arr[0] ) ) ;
		return extensionWidget.textBoxValues.some((val, i) => extensionWidget.textBoxValues.indexOf(val) !== i);
	}
}


