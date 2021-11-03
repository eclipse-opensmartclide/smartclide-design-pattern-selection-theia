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
			console.log("FRONT " + extensionWidget.res);

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
						this.buttonClick(table, ( event.target as Element).id, extensionWidget.data[extensionWidget.state.statePatternSelection].values, "");
					});	
				}
				if (("classes" in values[key]) == true){
					var classes = values[key]["classes"];
					Object.keys(classes).forEach((key1) =>{
						var row = this.insertCells(table, key1);
						if(classes[key1].extension==1){
							var cell3 = row.insertCell(2);
							var t3 = document.createElement("button");
							t3.innerHTML = "+";
							t3.id = "btn"+ key1;
							cell3.appendChild(t3);
							t3.addEventListener('click', (event) => {
								console.log("key " + key);
								console.log(JSON.stringify(extensionWidget.data[extensionWidget.state.statePatternSelection]));
								this.buttonClick(table, ( event.target as Element).id, extensionWidget.data[extensionWidget.state.statePatternSelection].values,
												extensionWidget.data[extensionWidget.state.statePatternSelection].values[key].classes);
								
								console.log("RUNPROCESS " + JSON.stringify(extensionWidget.data[extensionWidget.state.statePatternSelection].values));
								
								 								
							});	
						}

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

    //update the state
    updateSelection(e:React.ChangeEvent<HTMLSelectElement>){
		const key =e.currentTarget.name as keyof typeof extensionWidget.state;
		extensionWidget.state[key]  = e.currentTarget.value;
		
		
	}
	 //update the state
	 updateInput(e:React.ChangeEvent<HTMLInputElement>){
		const key =e.currentTarget.name as keyof typeof extensionWidget.state;
		extensionWidget.state[key]  = e.currentTarget.value;
		
	}
	
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
		t2.placeholder = key;
		cell1.appendChild(t1);
		cell2.appendChild(t2);
		return row;
	}
	//when button is clicked adds one label and one input of the specific class that the user wants to insert one more 
	buttonClick (table: HTMLTableElement, key: string, values: string, classes: string) {
		console.log(JSON.stringify(values));
		if(extensionWidget.state.statePatternSelection=="Abstract Factory"){
			if(key.includes("AbstractProduct")){
				var newValues = JSON.parse(JSON.stringify(values));
				var count = this.countKeys(values, key.substr(3,));
				console.log(key.substr(3,), count);
				var labelAbstrProd = this.updateLabel(key.substr(3,), count);
				newValues[labelAbstrProd] ={name:"",extension:1,classes:{}};
				//JSON.stringify({ "name":"", "extension":1 });
				//newValues[labelAbstrProd]["classes"] = JSON.stringify({"dff":""});
				var row = this.insertCells(table, labelAbstrProd);
				var cell3 = row.insertCell(2);
				var t3 = document.createElement("button");
				t3.innerHTML = "+";
				t3.id = "btn"+ labelAbstrProd;
				cell3.appendChild(t3);

				console.log("classes " + JSON.stringify(newValues[labelAbstrProd]["classes"]));
				var count2 = this.countKeys(newValues[key.substr(3,)]["classes"], "Product")-1;
				console.log("count "+count2);
				for(var j=0;j<count2;j++){
					var labelProduct = "Product"+count+"."+(j+1);
					var row = this.insertCells(table, labelProduct);
					newValues[labelAbstrProd]["classes"][labelProduct]= JSON.stringify({ "name":"", "extension":1});
				}
				
				t3.addEventListener('click', (event) => {
						this.buttonClick(table, ( event.target as Element).id, values, "");
					});	
			}else{
				var count = this.countKeys(classes, key.substr(3,));
				var labelConFactory = this.updateLabel("ConcreteFactory ", count);
				var row = this.insertCells(table, labelConFactory);
				var cell3 = row.insertCell(2);
				var t3 = document.createElement("button");
				t3.innerHTML = "+";
				t3.id = "btn"+ labelConFactory;
				cell3.appendChild(t3);

				var newValues = JSON.parse(JSON.stringify(values));
				var numAbstrProd = this.countKeys(newValues, "AbstractProduct")-1;
				console.log("AbstrProd " + numAbstrProd);
				newValues["AbstractFactory"]["classes"][labelConFactory] =  JSON.stringify({ "name":"", "extension":1});
				for(var j=0;j<numAbstrProd;j++){
					var labelProduct = "Product"+(j+1)+"."+count;
					var row = this.insertCells(table, labelProduct);
					newValues["AbstractProduct"+(j+1)]["classes"][labelProduct]= JSON.stringify({ "name":"", "extension":1});
				}
				
			}
		}else if(extensionWidget.state.statePatternSelection=="Builder"){
			if(key.includes("Product")){
				var count = this.countKeys(values, key.substr(3, ));
			}else{
				var count = this.countKeys(classes, key.substr(3, ));
			}

			var labelProduct = this.updateLabel("Product ", count);
			var labelConBuilder = this.updateLabel("ConcreteBuilder ", count);

			var newValues = JSON.parse(JSON.stringify(values));
			newValues[labelProduct] =  JSON.stringify({ "name":"", "extension":1});
			newValues["Builder"]["classes"][labelConBuilder] = JSON.stringify({ "name":"", "extension":1});
			
			var row = this.insertCells(table, labelProduct); 
			var cell3 = row.insertCell(2);
			var t3 = document.createElement("button");
			t3.innerHTML = "+";
			t3.id = "btn"+ labelProduct;
			cell3.appendChild(t3);
			
			var row = this.insertCells(table, labelConBuilder); 
			var cell3 = row.insertCell(2);
			var t4 = document.createElement("button");
			t4.innerHTML = "+";
			t4.id = "btn"+ labelConBuilder;
			cell3.appendChild(t4);
			
		}else if(extensionWidget.state.statePatternSelection=="Command"){
			if(key.includes("Receiver")){
				var count = this.countKeys(values, key.substr(3, ));
			}else{
				var count = this.countKeys(classes, key.substr(3, ));
			}
			
			var labelReceiver = this.updateLabel("Receiver ", count);
			var labelConCommand = this.updateLabel("ConcreteCommand ", count);

			var row = this.insertCells(table, labelReceiver); 
			var cell3 = row.insertCell(2);
			var t3 = document.createElement("button");
			t3.innerHTML = "+";
			t3.id = "btn"+ labelReceiver;
			cell3.appendChild(t3);
			
			var row = this.insertCells(table, labelConCommand); 
			var cell3 = row.insertCell(2);
			var t4 = document.createElement("button");
			t4.innerHTML = "+";
			t4.id = "btn"+ labelConCommand;
			cell3.appendChild(t4);

			//inserts new attributes in json
			var newValues = JSON.parse(JSON.stringify(values));
			newValues[labelReceiver] =  JSON.stringify({ "name":"", "extension":1});
			newValues["Command"]["classes"][labelConCommand] = JSON.stringify({ "name":"", "extension":1});
			console.log(JSON.stringify(newValues))
			
			t3.addEventListener('click', (event) => {
				this.buttonClick(table, ( event.target as Element).id, values, classes);
			});	
			
			t4.addEventListener('click', (event) => {
				this.buttonClick(table, ( event.target as Element).id, values, classes);
			});	
		}else if(extensionWidget.state.statePatternSelection=="Iterator"){
			var count = this.countKeys(classes, key.substr(3, ));
			var labelConAggregate = this.updateLabel("ConcreteAggregate ", count);
			var labelConIterator = this.updateLabel("ConcreteIterator ", count);

			//button insertion 
			var row = this.insertCells(table, labelConAggregate); 
			var cell3 = row.insertCell(2);
			var t3 = document.createElement("button");
			t3.innerHTML = "+";
			t3.id = "btn"+ labelConAggregate;
			cell3.appendChild(t3);

			//button insertion
			var row = this.insertCells(table, labelConIterator); 
			var cell3 = row.insertCell(2);
			var t4 = document.createElement("button");
			t4.innerHTML = "+";
			t4.id = "btn"+ labelConIterator;
			cell3.appendChild(t4);
			
			var newValues = JSON.parse(JSON.stringify(values));
			newValues["Aggregate"]["classes"][labelConAggregate] = JSON.stringify( { "name":"", "extension":1});//attribute "classes" in Aggreagate attribute gets new json value
			newValues["Iterator"]["classes"][labelConIterator] = JSON.stringify({ "name":"", "extension":1});
				
			console.log(JSON.stringify(newValues));

			t3.addEventListener('click', (event) => {
				this.buttonClick(table, ( event.target as Element).id, values, classes);
			});	
			
			t4.addEventListener('click', (event) => {
				this.buttonClick(table, ( event.target as Element).id, values, classes);
			});	
		}else{
			
			if(classes==""){
				var count = this.countKeys(values, key.substr(3, ));
				var label = this.updateLabel(key.substr(3, ), count);
				var newValues = JSON.parse(JSON.stringify(values));
				newValues[label] = JSON.stringify( { "name":"", "extension":1});//attribute "classes" in Aggreagate attribute gets new json value
			}else{
				var count = this.countKeys(classes, key.substr(3, ));
				var label = this.updateLabel(key.substr(3, ), count);
				var newClasses = JSON.parse(JSON.stringify(classes));
				newClasses[label] = JSON.stringify({"name":"", "extension":1});
			}
			var row = this.insertCells(table, label); 
			var cell3 = row.insertCell(2);
			var t3 = document.createElement("button");
			t3.innerHTML = "+";
			t3.id = "btn"+ label;
			cell3.appendChild(t3);
			t3.addEventListener('click', (event) => {
				this.buttonClick(table, ( event.target as Element).id, values, classes);
			});	
		}
		//console.log(JSON.stringify(newValues));
		extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
	}

	buttonClick2 (rows : number):void{
		if (rows!=extensionWidget.textBoxValues.length){
			this.messageService.info("You need to give name for ALL the classes!");
		}else{
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
		return count+1;
	}
}


