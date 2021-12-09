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
				<button id="btn-wizard" type="button" title='Wizard' onClick={_a => this.runWizard()}>Wizard</button>
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
						<img id = "image" alt= "Class Diagram " ></img>
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

			//show the JSON values for the chosen key-pattern
			let values = extensionWidget.data[extensionWidget.state.statePatternSelection].values; //data[extensionWidget.state.statePatternSelection];
			var table = document.getElementById('show_pattern_table') as HTMLTableElement;
			Object.keys(values).forEach(async (key) =>{
				this.insertCells(table, key);
				let values = extensionWidget.data[extensionWidget.state.statePatternSelection].values;
				if(values[key].extension==1){
					let cell3 = this.insertCell(2);
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
			await this.helloBackendService.main();
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
		console.log(label + "   count: " + count);
		if(extensionWidget.state.statePatternSelection=="AbstractFactory"){
			if(key.includes("AbstractProduct")){
				newValues[label] = JSON.stringify({name:"",extension:0});
				this.insertCells(table, label);
				var numProd = (this.countKeys(values, "Product") / count)-1;// number of "Products" in each AbstractProduct
				console.log(numProd);
				for(let j = 0 ; j < numProd; j++ ){
					let labelProduct = "Product"+ (count+1) + "."+(j+1);
					console.log(labelProduct);
					this.insertCells(table, labelProduct);
					newValues[labelProduct]= JSON.stringify({ "name":"", "extension":0});
				}
			}else{
				this.insertCells(table, label);
				let numAbstrProd = this.countKeys(newValues, "AbstractProduct"); 
				newValues[label] =  JSON.stringify({ "name":"", "extension":0});
				for(let j = 0; j < numAbstrProd ; j++){
					let labelProduct = "Product"+(j+1)+"." + (count+1);
					this.insertCells(table, labelProduct);
					newValues[labelProduct] = JSON.stringify({ "name":"", "extension":0});
				}	
			}
		}else if(extensionWidget.state.statePatternSelection=="Builder" && key.includes("Product")){
			let labelConBuilder = this.updateLabel("ConcreteBuilder ", count+1);

			newValues[label] =  JSON.stringify({ "name":"", "extension":0});
			newValues[labelConBuilder] = JSON.stringify({ "name":"", "extension":0});
				
			this.insertCells(table, label); 
			this.insertCells(table, labelConBuilder); 
		}else if(extensionWidget.state.statePatternSelection=="Factory Method") {
			let labelConCreator = this.updateLabel("ConcreteCreator ", count+1);

			newValues[label] =  JSON.stringify({ "name":"", "extension":0});
			newValues[labelConCreator] = JSON.stringify({ "name":"", "extension":0});
			
			this.insertCells(table, label);				 
			this.insertCells(table, labelConCreator); 
		}else if(extensionWidget.state.statePatternSelection=="Decorator" && key.includes("ConcreteDecorator")) {
			console.log("label1" + key.substr(3,));
			let labelConDec = this.updateLabel(key.substr(3,), (count/2+1));
			console.log("label2" + labelConDec);
			let labelmethod = labelConDec + "Method";
			
			newValues[label] =  JSON.stringify({ "name":"", "extension":0});
			newValues[labelmethod] = JSON.stringify({ "name":"", "extension":0});
				
			this.insertCells(table, labelConDec); 
			this.insertCells(table, labelmethod); 
		}else if(extensionWidget.state.statePatternSelection=="Flyweight") {	 
			let label = this.updateLabel(key.substr(3,), count/2+1); 
			let labelAttr = label + "Attribute";

			newValues[label] = JSON.stringify({"name":"", "extension":0});
			newValues[labelAttr] = JSON.stringify({"name":"", "extension":1});

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
				newValues[label] = JSON.stringify({"name":"", "extension":0});
				this.insertCells(table, label);
			}else{
				let count2 = this.countKeys(values, "MethodParameter");
				let labelConCommand = this.updateLabel("ConcreteCommand ", (count-count2)/2+1);
				let labelConComMeth = labelConCommand + "Method";
				let labelConComMethParam = labelConCommand + "MethodParameter1";

				this.insertCells(table, labelConCommand); 
				this.insertCells(table, labelConComMeth);
				this.insertCells(table, labelConComMethParam);

				newValues[labelConCommand] = JSON.stringify({ "name":"", "extension":0});
				newValues[labelConComMeth] =  JSON.stringify({ "name":"", "extension":0});
				newValues[labelConComMethParam] = JSON.stringify({ "name":"", "extension":1});
			}
		}else{
			newValues[label] = JSON.stringify({"name":"", "extension":0});
			this.insertCells(table, label); 
		}
		extensionWidget.data[extensionWidget.state.statePatternSelection].values = newValues;
		console.log(JSON.stringify(newValues));
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
		window.location.reload();
	}

	runWizard(){
		(document.getElementById("issues") as HTMLElement).style.visibility = 'hidden';
		(document.getElementById("issues") as HTMLElement).style.height = '0px';
		let divWiz = document.getElementById('divWiz') as HTMLDivElement;
		divWiz.style.marginLeft = '10px';
		let divCont = document.createElement('div');
		let myForm = document.createElement('form');
		createLabel('Choose the type of the pattern: <br>', 'label0', divWiz);
		createLabel('Creational', 'label1', divWiz)
		let radio1 = document.createElement('input');
		radio1.name = 'patternTypes';
		radio1.id = 'radioCreatonal';
		radio1.type = 'radio';
		radio1.onclick = function(){	
				divCont.innerHTML = "";
				let divCont2 = document.createElement('div');
				createLabel('<br> Do you want to create a completely new object or to create one by reusing an existing one?<br>', 'label4', divCont);
				createLabel('Create new object', 'label11',divCont);
				let radio11 = document.createElement('input');
				radio11.name = 'new_existed';
				radio11.type = 'radio';
				radio11.onclick = function(){	
						divCont2.innerHTML = "";
						let divCont3 = document.createElement('div');
						createLabel('<br> Give the name of the Product that you want to create (Let X the name of the product)<br>', 'labelQuestion3', divCont2);
						let prodName = document.createElement('input');
						prodName.name = 'txtPoductName';
						prodName.type = 'text';
						let buttonNext = document.createElement('button');
						buttonNext.innerHTML = 'Next';
						buttonNext.onclick = function(){
							divCont3.innerHTML = "";
							let divCont4 = document.createElement('div');
							createLabel('<br> Does the Product has sub-categories (Concrete Products)? <br>', 'labelQuestion4', divCont3);
							createLabel('Yes', 'label31', divCont3);
							let radio31 = document.createElement('input');
							radio31.name = 'yes_no';
							radio31.type = 'radio';
							radio31.onclick = function(){
								divCont4.innerHTML = "";
								let divCont5 = document.createElement('div');
								createLabel('<br> How many sub-categories exist? <br>', 'labelQuestion5', divCont4);
								let subNum = document.createElement('input');
								subNum.id = 'subcategoriesNum';
								subNum.type = 'number';
								let buttonNext = document.createElement('button');
								buttonNext.innerHTML = 'Next';
								buttonNext.onclick = function(){
									divCont5.innerHTML = "";
									let divCont6 = document.createElement('div');
									createLabel('<br> Please give the names of the Concrete Products <br>', 'labelQuestion6', divCont5);
									let num = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
									for (var i=1; i<=num; i++){
										let field = document.createElement('input');
										field.name = 'txtConcreteProductsName';
										field.type = 'text';
										divCont5.appendChild(field);
									}
									let buttonNext = document.createElement('button');
									buttonNext.innerHTML = 'Next';
									buttonNext.onclick = function(){
										divCont6.innerHTML = "";
										let divCont7 = document.createElement('div');
										createLabel('<br> Can the Products be classified in a Family? <br>', 'labelQuestion7', divCont6);
										createLabel('Yes', 'label61', divCont6);
										let radio61 = document.createElement('input');
										radio61.name = 'yes_no';
										radio61.type = 'radio';
										radio61.onclick = function(){
											divCont7.innerHTML = "";
											let divCont8 = document.createElement('div');
											createLabel('<br> How many Families of Products exist? <br>', 'labelQuestion8', divCont7);
											let famNum = document.createElement('input');
											famNum.id = 'familiesNum';
											famNum.type = 'number';
											let buttonNext = document.createElement('button');
											buttonNext.innerHTML = 'Next';
											buttonNext.onclick = function(){
												divCont8.innerHTML = "";
												let divCont9 = document.createElement('div');
												createLabel('<br> Please give the names of the Components <br>', 'labelQuestion9', divCont8);
												let num = parseInt((document.getElementById('familiesNum') as HTMLInputElement).value);
												for (var i=1; i<=num; i++){
													let field = document.createElement('input');
													field.name = 'txtComponentsName';
													field.type = 'text';
													divCont8.appendChild(field);
												}
												let buttonNext = document.createElement('button');
												buttonNext.innerHTML = 'Next';
												buttonNext.onclick = function(){
													createLabel('<br> Abstract Factory Pattern ', 'labelQuestion10', divCont9);
													let buttonCode = document.createElement('button');
													buttonCode.innerHTML = 'Get Code';
													buttonCode.onclick = function(){
														//code generation
													}
													divCont9.appendChild(buttonCode);
												}
												divCont8.appendChild(buttonNext);
												divCont8.appendChild(divCont9);
											}
											divCont7.appendChild(famNum);divCont7.appendChild(buttonNext);
											divCont7.appendChild(divCont8);
										}
										createLabel('No', 'label62', divCont6);
										let radio62 = document.createElement('input');
										radio62.name = 'yes_no';
										radio62.type = 'radio';
										radio62.onclick = function(){
											divCont7.innerHTML = "";
											let divCont8 = document.createElement('div');
											createLabel('<br> Can Product be created as series of steps which is different in every subcategory? <br>', 'labelQuestion11', divCont7);
											createLabel('Yes', 'label71', divCont7);
											let radio71 = document.createElement('input');
											radio71.name = 'yes_no';
											radio71.type = 'radio';
											radio71.onclick = function(){
												divCont8.innerHTML = "";
												let divCont9 = document.createElement('div');
												createLabel('<br> How many Steps are involved ?  <br>', 'labelQuestion12', divCont8);
												let stepsNum = document.createElement('input');
												stepsNum.id = 'stepsNum';
												stepsNum.type = 'number';
												let buttonNext = document.createElement('button');
												buttonNext.innerHTML = 'Next';
												buttonNext.onclick = function(){
													divCont9.innerHTML = "";
													let divCont10 = document.createElement('div');
													createLabel('<br> Please give the name of the steps  <br>', 'labelQuestion13', divCont9);
													let num = parseInt((document.getElementById('stepsNum') as HTMLInputElement).value);
													for (var i=1; i<=num; i++){
														let field = document.createElement('input');
														field.name = 'txtStepsName';
														field.type = 'text';
														divCont9.appendChild(field);
													}
													let buttonNext = document.createElement('button');
													buttonNext.innerHTML = 'Next';
													buttonNext.onclick = function(){
														createLabel('<br> Builder Pattern ', 'labelPattern1', divCont10);
														let buttonCode = document.createElement('button');
														buttonCode.innerHTML = 'Get Code';
														buttonCode.onclick = function(){
															//code generation
														}
														divCont10.appendChild(buttonCode);
													}
													divCont9.appendChild(buttonNext);
													divCont9.appendChild(divCont10);
												}
												divCont8.appendChild(stepsNum);divCont8.appendChild(buttonNext);
												divCont8.appendChild(divCont9);
											}
											createLabel('No', 'label72', divCont7);
											let radio72 = document.createElement('input');
											radio72.name = 'yes_no';
											radio72.type = 'radio';
											radio72.onclick = function(){
												divCont8.innerHTML = "";
												let divCont9 = document.createElement('div');
												createLabel('<br> What is the name of the Creator (e.g., Oven) of Product? <br>', 'labelQuestion14', divCont8);
												let field = document.createElement('input');
												field.id = 'txtCreatorName';
												field.type = 'text';
												let buttonNext = document.createElement('button');
												buttonNext.innerHTML = 'Next';
												buttonNext.onclick = function(){
													createLabel('<br> Factory Method Pattern', 'labelQuestion15', divCont9);
													let buttonCode = document.createElement('button');
													buttonCode.innerHTML = 'Get Code';
													buttonCode.onclick = function(){
														//code generation
													}
													divCont9.appendChild(buttonCode);
												}
												divCont8.appendChild(field);divCont8.appendChild(buttonNext);
												divCont8.appendChild(divCont9);
											}
											divCont7.appendChild(radio71);divCont7.appendChild(radio72);
											divCont7.appendChild(divCont8);
										}
										divCont6.appendChild(radio61);divCont6.appendChild(radio62);
										divCont6.appendChild(divCont7);										
									}
									divCont5.appendChild(buttonNext);divCont5.appendChild(divCont6);
								}
								divCont4.appendChild(subNum);divCont4.appendChild(buttonNext);
								divCont4.appendChild(divCont5);
							}
							createLabel('No', 'label32', divCont3);
							let radio32 = document.createElement('input');
							radio32.name = 'yes_no';
							radio32.type = 'radio';
							radio32.onclick = function(){
								divCont4.innerHTML = "";
								createLabel('<br> There is no pattern <br>', 'labelQuestion16', divCont4);
							}
							divCont3.appendChild(radio31);divCont3.appendChild(radio32);
							divCont3.appendChild(divCont4);
						}
						divCont2.appendChild(prodName);divCont2.appendChild(buttonNext);
						divCont2.appendChild(divCont3);
				}
				createLabel('Reuse an existing one', 'label12', divCont);
				let radio12 = document.createElement('input');
				radio12.name = 'new_existed';
				radio12.type = 'radio';
				radio12.onclick = function(){	
					divCont2.innerHTML = "";
					createLabel('<br> You chose existed <br>', 'labelQuestion17', divCont2);
				}
				divCont.appendChild(radio11);
				divCont.appendChild(radio12);
				divCont.appendChild(divCont2);
		}
		createLabel('Structural', 'label2', divWiz);
		let radio2 = document.createElement('input');
		radio2.name = 'patternTypes';
		radio2.type = 'radio';
		radio2.onclick = function(){
			divCont.innerHTML = "";
			createLabel('<br> Do you want to ... <br>', 'labelQuestion18', divCont);
		}
		createLabel('Behavioral', 'label3', divWiz);
		let radio3 = document.createElement('input');
		radio3.name = 'patternTypes';
		radio3.type = 'radio';
		radio3.onclick = function(){
			divCont.innerHTML = "";
			createLabel('<br> Do you want to blablabla <br>', 'labelQuestion19', divCont);
		}
		myForm.appendChild(radio1);
		myForm.appendChild(radio2);
		myForm.appendChild(radio3);
		
		divWiz.appendChild(myForm);
		divWiz.appendChild(divCont);

	}

}

function createLabel(innerMesagge: string, id: string, parent: HTMLElement){
	let labelQuestion = document.createElement('label');
	labelQuestion.innerHTML = innerMesagge;
	labelQuestion.id = id;
	parent.appendChild(labelQuestion);
}
