import { extensionWidget } from "./extension-widget";
import { MessageService } from '@theia/core';
import { inject } from 'inversify';

interface Textfield{
	ident: number;
	value: string;
  };

export class Functions{
    @inject(MessageService)
    protected readonly messageService!: MessageService;

    radioQuestion(questionLabel: string, labelRadio1: string, labelRadio2: string, radioId1: string, radioId2: string, parent: HTMLElement){
        this.createLabel(questionLabel, '', parent);
        this.createLabel(labelRadio1, '', parent);
        this.createInput('', radioId1, '', 'yes_no', 'radio', parent);
        this.createLabel(labelRadio2, '', parent);
        this.createInput('', radioId2, '', 'yes_no', 'radio', parent);
    }
    
    textfieldQuestion(questionLabel: string, num: number, inputType: string, inputMessage: string, inputId: string, inputClassname: string, buttonId: string, parent: HTMLElement){
        this.createLabel(questionLabel, '', parent);
        if (num==1){
            this.createInput(inputMessage, inputId, inputClassname, inputId, inputType, parent);
        }else{
            for (let i=1; i<=num; i++){
                this.createInput(inputMessage+i, inputId+i, inputClassname, inputId+i, inputType, parent);
            }
        }
        this.createButton('Next', buttonId, parent);
    }
    
    createLabel(innerMessage: string, id: string, parent: HTMLElement){
        let labelQuestion = document.createElement('label');
        labelQuestion.innerHTML = innerMessage;
        labelQuestion.id = id;
        parent.appendChild(labelQuestion);
    }
    
    createInput(innerMessage: string, id: string, classname: string, name: string, type: string, parent: HTMLElement){
        let inputField = document.createElement('input');
        inputField.placeholder = innerMessage;
        inputField.id = id;
        if (!id.includes('radio') && !id.includes('Num')){
            inputField.className = classname;
            if (!innerMessage.includes("Method") || !innerMessage.includes("step")){
                let suggestions = document.createElement("div");
                suggestions.id = "suggestions"+id.substring(6,);
                console.log("suggestions"+id.substring(6,));
                suggestions.className = "suggestions";
                parent.appendChild(suggestions);
                inputField.addEventListener('keypress', (e: KeyboardEvent) =>{
                    this.showSuggestions(inputField.value, extensionWidget.res, ( e.target as Element).id);
                });
            }
            inputField.autocomplete = "off";
        }
        inputField.name = name;
        inputField.type = type;
        parent.appendChild(inputField);
    }
    //autocomplete
    showSuggestions(value: string, table: string[], id: string){
        let res = document.getElementById("suggestions"+id.substring(6,))as HTMLElement;
            
              let list = '';
              let terms = this.autocompleteMatch(value, table);
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
                this.showSuggestions((document.getElementById("txtbox"+id.substring(6,))as HTMLInputElement).value, table, ( e.target as Element).id);
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
    
    createButton(innerMessage: string, id: string, parent: HTMLElement){
        let button = document.createElement('button');
        button.innerHTML = innerMessage;
        button.id = id;
        parent.appendChild(button);
    }

    checkMessage(message: string){
		if(message!=""){
			this.messageService.info("Something went wrong");
		}else{
			this.messageService.info("Code generation has been completed");
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
    updateJsonObject(){
		let table = document.getElementById('show_pattern_table') as HTMLTableElement;
		for(let i = 0 ; i < table.rows.length ; i++){
			let label = (document.getElementById( 'label'+ (i + 1) ) as HTMLLabelElement).innerHTML;
			let txtbox = (document.getElementById( 'txtbox'+ (i + 1) ) as HTMLInputElement).value;
			extensionWidget.data[extensionWidget.state.statePatternSelection].values[label].name = txtbox;
			}
	}

	


}