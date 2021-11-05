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
			for (var i=0; i<extensionWidget.res.length; i++){
            	var lastW = extensionWidget.res[i].lastIndexOf("/");
				var file = extensionWidget.res[i].substr(lastW+1);
				file = file.substr(0, file.indexOf("."));
				console.log(file);
				extensionWidget.res[i] = file;  
			}

			//show the JSON values for the chosen key-pattern
			var values = extensionWidget.data[extensionWidget.state.statePatternSelection].values; //data[extensionWidget.state.statePatternSelection];
			var table = document.getElementById('show_pattern_table') as HTMLTableElement;
			Object.keys(values).forEach((key) =>{
				var row = this.insertCells(table, key);
				if(values[key].extension==1){
					var cell3 = row.insertCell(2);
					var t3 = document.createElement("button");
					t3.innerHTML = "+";
					t3.id = "btn"+ key;
					cell3.appendChild(t3);
					t3.addEventListener('click', (event) => {
						this.buttonClick(table, ( event.target as Element).id, extensionWidget.data[extensionWidget.state.statePatternSelection].values);
					});	
				}
			});
			var d = document.getElementById("result") as HTMLElement;
			var b = document.createElement("button");
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
		const key =e.currentTarget.name as keyof typeof extensionWidget.state;
		extensionWidget.state[key]  = e.currentTarget.value;
	}
	/* //update the state 
	 updateInput(e:React.ChangeEvent<HTMLInputElement>){
		const key =e.currentTarget.name as keyof typeof extensionWidget.state;
		extensionWidget.state[key]  = e.currentTarget.value;
	}*/
	
	insertCells(table: HTMLTableElement, key: string){
		var row = table.insertRow(table.rows.length);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var t1 = document.createElement("label");
		t1.id = "label"+ table.rows.length;
		t1.innerHTML = key;

		var t2 = document.createElement("input");
		t2.id = "txtbox"+ table.rows.length;
		var num = table.rows.length;
		t2.onchange = function () {  
			extensionWidget.textBoxValues[num-1] = t2.value;
		};
		t2.autocomplete = "off";
		t2.placeholder = key;
		t2.addEventListener('keypress', (e: KeyboardEvent) =>{
			this.showSuggestions(t2.value, ( e.target as Element).id);
		});
		var t3 = document.createElement("div");
		t3.id = "suggestions"+table.rows.length;
		t3.className = "suggestions";
		
		cell1.appendChild(t1);
		cell2.appendChild(t2);
		cell2.appendChild(t3);
		return row;
	}
	//when button is clicked adds one label and one input of the specific class that the user wants to insert one more 
	buttonClick (table: HTMLTableElement, key: string, values: string) {
		var newValues = JSON.parse(JSON.stringify(values));
		var count = this.countKeys(values, key.substr(3, ));
		if(extensionWidget.state.statePatternSelection=="Abstract Factory"){
			if(key.includes("AbstractProduct")){
				var numAbstrProd = this.countKeys(values, key.substr(3,));
				var labelAbstrProd = this.updateLabel(key.substr(3,), numAbstrProd+1);
				newValues[labelAbstrProd] = JSON.stringify({name:"",extension:1});
				
				var numProd = (this.countKeys(values, "Product")-1) / numAbstrProd;
				for(var j = 0 ; j < numProd ; j++ ){
					var labelProduct = "Product"+(numAbstrProd+1)+"."+(j+1);
					this.insertCells(table, labelProduct);
					newValues[labelProduct]= JSON.stringify({ "name":"", "extension":1});
				}
			}else{
				var numConFactory = this.countKeys(values, key.substr(3,)) ;//values?? newValues??
				var labelConFactory = this.updateLabel("ConcreteFactory ", numConFactory);
				this.insertCells(table, labelConFactory);
				
				var numAbstrProd = this.countKeys(newValues, "AbstractProduct")+1; //??
				newValues[labelConFactory] =  JSON.stringify({ "name":"", "extension":1});
				for(var j = 0; j < numAbstrProd ; j++){
					var labelProduct = "Product"+(j+1)+"." + numConFactory;
					this.insertCells(table, labelProduct);
					newValues[labelProduct] = JSON.stringify({ "name":"", "extension":1});
				}	
			}
		}else if(extensionWidget.state.statePatternSelection=="Builder"){
			var labelProduct = this.updateLabel("Product ", count+1);
			var labelConBuilder = this.updateLabel("ConcreteBuilder ", count+1);

			newValues[labelProduct] =  JSON.stringify({ "name":"", "extension":1});
			newValues[labelConBuilder] = JSON.stringify({ "name":"", "extension":1});
			
			this.insertCells(table, labelProduct); 
			this.insertCells(table, labelConBuilder); 
		
		}else if(extensionWidget.state.statePatternSelection=="Command"){
			var labelReceiver = this.updateLabel("Receiver ", count);
			var labelConCommand = this.updateLabel("ConcreteCommand ", count);

			this.insertCells(table, labelReceiver); 	
			this.insertCells(table, labelConCommand); 

			//inserts new attributes in json object
			newValues[labelReceiver] =  JSON.stringify({ "name":"", "extension":1});
			newValues[labelConCommand] = JSON.stringify({ "name":"", "extension":1});
			
		}else if(extensionWidget.state.statePatternSelection=="Iterator"){
			var labelConAggregate = this.updateLabel("ConcreteAggregate ", count+1);
			var labelConIterator = this.updateLabel("ConcreteIterator ", count+1);
		
			this.insertCells(table, labelConAggregate); 
			this.insertCells(table, labelConIterator); 
			//inserts new attributes in json object
			newValues[labelConAggregate] = JSON.stringify( { "name":"", "extension":1});
			newValues[labelConIterator] = JSON.stringify({ "name":"", "extension":1});

		}else{
			var label = this.updateLabel(key.substr(3, ), count+1);
			newValues[label] = JSON.stringify({"name":"", "extension":1});
			this.insertCells(table, label); 
		}
		extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
	}

	buttonClick2 (rows : number):void{
		if (rows!=extensionWidget.textBoxValues.length){
			this.messageService.info("You need to give name for ALL the classes!");
		}else{
			this.updateJsonObject();
			this.messageService.info("Well done! Code is coming...");
		}
	}

	updateLabel(value: string, count: number){
		if (value.includes('.')){
			return value.substring(0,value.length-2) + '.' + count;
		}
		return value.slice(0,-1) + count;
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

	showSuggestions(value: string, id: string){
		var res = document.getElementById("suggestions"+id.substr(6,))as HTMLElement;
		
  		let list = '';
  		let terms = this.autocompleteMatch(value);
  		for (var i=0; i<terms.length; i++) {
    		list += '<li>' + terms[i] + '</li>';
  		}
  		res.innerHTML = "<ul id='list" + id.substr(6,) + "'> "+ list + "</ul>";
		var ul = document.getElementById("list"+id.substr(6,))as HTMLElement;
		var input = document.getElementById("txtbox"+id.substr(6,))as HTMLInputElement;
		ul.onclick = function(event) {
			input.value = (event.target as HTMLLIElement).innerHTML ;
			res.style.visibility = 'hidden';
		}	
		var hideBlock = function(){
			res.style.visibility = 'hidden';
		};
		ul.addEventListener('mouseleave', hideBlock);
		input.addEventListener('keypress', (e: KeyboardEvent) =>{
			res.style.visibility = 'visible';
			this.showSuggestions((document.getElementById("txtbox"+id.substr(6,))as HTMLInputElement).value, ( e.target as Element).id);
		});

	}

	autocompleteMatch(input: string) {
		if (input == '') {
			return [];
	  	}
	  	var reg = new RegExp('^' + input);
	  	return extensionWidget.res.filter(function(term) {
		  	if (term.match(reg)) {
				return term;
		 	 }
	 	 });
	}

	updateJsonObject(){
		var table = document.getElementById('show_pattern_table') as HTMLTableElement;
		var length = table.rows.length;
		for(var i = 0 ; i < length ; i++){
			var label = (document.getElementById( 'label'+ (i + 1) ) as HTMLLabelElement).innerHTML;
			var txtbox = (document.getElementById( 'txtbox'+ (i + 1) ) as HTMLInputElement).value;
			extensionWidget.data[extensionWidget.state.statePatternSelection].values[label].name = txtbox;
		}
	}
}


