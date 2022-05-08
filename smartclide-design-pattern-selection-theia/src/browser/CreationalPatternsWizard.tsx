import data from './data.json';

import { Functions } from './functions';
import { MessageService } from '@theia/core';
import { HelloBackendService } from '../common/protocol';

interface Textfield{
	ident: number;
	value: string;
  };

export class CreationalPatterns{


    static functions = new Functions();
	static values = JSON.parse(JSON.stringify(data));

    creationalPatternswizard(divCont: HTMLDivElement, messageService: MessageService, helloBackendService: HelloBackendService){
		divCont.innerHTML = "";
		let divCont2 = document.createElement('div');
		CreationalPatterns.functions.radioQuestion('<br> Do you want to create a completely new object or to create one by reusing an existing one?<br>', 'Create new object', 'Reuse an existing one', 'radio11', 'radio12', divCont);
		let radio11 = document.getElementById('radio11') as HTMLInputElement;
		radio11.addEventListener('click', async (e: Event) =>{	
				divCont2.innerHTML = "";
				let divCont3 = document.createElement('div');
				CreationalPatterns.functions.textfieldQuestion('<br> Give the name of the Product that you want to create <br>', 1, 'text', 'Product name', 'txtboxProduct_name', 'infoField', 'buttonNext1', divCont2);
				let buttonNext1 = document.getElementById('buttonNext1') as HTMLButtonElement;
				buttonNext1.addEventListener('click', async (e: Event) =>{
					divCont3.innerHTML = "";
					let divCont4 = document.createElement('div');
					CreationalPatterns.functions.radioQuestion('<br> Does the Product has sub-categories (ConcreteProducts)?  <br>', 'Yes', 'No', 'radio31', 'radio32', divCont3);
					let radio31 = document.getElementById('radio31') as HTMLInputElement;
					radio31.addEventListener('click', async (e: Event) =>{
						divCont4.innerHTML = "";
						let divCont5 = document.createElement('div');
						CreationalPatterns.functions.textfieldQuestion('<br> How many sub-categories (ConcreteProducts) exist? <br>', 1, 'number', '2', 'subcategoriesNum', '', 'buttonNext2', divCont4);
						let numCat = document.getElementById('subcategoriesNum') as HTMLInputElement;
						numCat.min = '2';
						let buttonNext2 = document.getElementById('buttonNext2') as HTMLButtonElement;
						buttonNext2.addEventListener('click', async (e: Event) =>{
							divCont5.innerHTML = "";
							let divCont6 = document.createElement('div');
							let num = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
							CreationalPatterns.functions.textfieldQuestion('<br> Please give the names of the sub-categories (ConcreteProducts) <br>', num, 'text', 'Concrete Product name ', 'txtboxConcreteProductsName', 'infoField', 'buttonNext3', divCont5);
							let buttonNext3 = document.getElementById('buttonNext3') as HTMLButtonElement;
							buttonNext3.addEventListener('click', async (e: Event) =>{
								divCont6.innerHTML = "";
								let divCont7 = document.createElement('div');
								CreationalPatterns.functions.radioQuestion('<br> Can the Products be classified in a Family? <br>', 'Yes', 'No', 'radio61', 'radio62', divCont6);
								let radio61 = document.getElementById('radio61') as HTMLInputElement;
								radio61.addEventListener('click', async (e: Event) =>{
									divCont7.innerHTML = "";
									let divCont8 = document.createElement('div');
									CreationalPatterns.functions.textfieldQuestion('<br> How many Families of Products exist? <br>', 1, 'number', '2', 'familiesNum', '', 'buttonNext4', divCont7);
									let buttonNext4 = document.getElementById('buttonNext4') as HTMLButtonElement;
									buttonNext4.addEventListener('click', async (e: Event) =>{
										divCont8.innerHTML = "";
										let divCont9 = document.createElement('div');
										let num = parseInt((document.getElementById('familiesNum') as HTMLInputElement).value);
										CreationalPatterns.functions.textfieldQuestion('<br> Please give the names of the Components (Families) <br>', num, 'text', 'Component name ', 'txtboxComponentName', 'infoField', 'buttonNext5', divCont8);
										let buttonNext5 = document.getElementById('buttonNext5') as HTMLButtonElement;
										buttonNext5.addEventListener('click', async (e: Event) =>{
											divCont9.innerHTML = "";
											CreationalPatterns.functions.createLabel('<br> <b>Abstract Factory Pattern</b>   ', 'labelPattern0', divCont9);
											CreationalPatterns.functions.createButton('Get Code', 'getcodeAbstractFactoryPattern', divCont9);
											let buttonCodeAFP = document.getElementById('getcodeAbstractFactoryPattern') as HTMLButtonElement;
											buttonCodeAFP.addEventListener('click', async (e: Event) =>{
												let infoList = document.getElementsByClassName('infoField') as HTMLCollection;	
												let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check													
												CreationalPatterns.values["AbstractFactory"].values["AbstractFactory"].name = (infoList.item(0) as HTMLInputElement).value;
												let textfield:  Textfield={ ident: 1, value: (infoList.item(0) as HTMLInputElement).value };
												textfieldArray.push(textfield);
												let numCat = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
												let numFam = parseInt((document.getElementById('familiesNum') as HTMLInputElement).value);
												for (var i=1; i<=numCat; i++){
													CreationalPatterns.values["AbstractFactory"].values["Product"+i] = { "name":"", "extension":0};
													let v1 = (infoList.item(i) as HTMLInputElement).value;
													CreationalPatterns.values["AbstractFactory"].values["Product"+i].name = v1;
													let textfield:  Textfield={ ident: 1, value: v1 };
													textfieldArray.push(textfield);
													for (var j=1; j<=numFam; j++){
														CreationalPatterns.values["AbstractFactory"].values["ConcreteProduct"+i+"."+j] = { "name":"", "extension":0};
													}
												}
												for (var j=1; j<=numFam; j++){
													CreationalPatterns.values["AbstractFactory"].values["Family"+j] = { "name":"", "extension":0};
													let v2 = (infoList.item(i) as HTMLInputElement).value;
													CreationalPatterns.values["AbstractFactory"].values["Family"+j].name = v2;
													let textfield:  Textfield={ ident: 1, value: v2 };
													textfieldArray.push(textfield);
													i++;
												}
												
												let message = CreationalPatterns.functions.checkInputsOnSubmit(1);
												if (message == "Input is valid"){
													CreationalPatterns.functions.insertInputsAbstractFactory(CreationalPatterns.values["AbstractFactory"].values);
													CreationalPatterns.functions.checkMessage(await helloBackendService.codeGeneration(window.location.href, CreationalPatterns.values["AbstractFactory"].values, "AbstractFactory"), messageService);
												}else{
													messageService.info(message);
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
									CreationalPatterns.functions.radioQuestion('<br> Can Product be created as series of steps which is different in every subcategory? <br>', 'Yes', 'No', 'radio71', 'radio72', divCont7);
									let radio71 = document.getElementById('radio71') as HTMLInputElement;
									radio71.addEventListener('click', async (e: Event) =>{
										divCont8.innerHTML = "";
										let divCont9 = document.createElement('div');
										CreationalPatterns.functions.textfieldQuestion('<br> How many Steps are involved ?  <br>', 1, 'number', '1', 'stepsNum', '', 'buttonNext6', divCont8);
										let buttonNext6 = document.getElementById('buttonNext6') as HTMLButtonElement;
										buttonNext6.addEventListener('click', async (e: Event) =>{
											divCont9.innerHTML = "";
											let divCont10 = document.createElement('div');
											let num = parseInt((document.getElementById('stepsNum') as HTMLInputElement).value);
											CreationalPatterns.functions.textfieldQuestion('<br> Please give the name of the steps  <br>', num, 'text', 'Step name ', 'txtboxStepName', 'infoField', 'buttonNext7', divCont9);
											let buttonNext7 = document.getElementById('buttonNext7') as HTMLButtonElement;
											buttonNext7.addEventListener('click', async (e: Event) =>{
												divCont10.innerHTML = "";
												CreationalPatterns.functions.createLabel('<br> <b>Builder Pattern</b>   ', 'labelPattern1', divCont10);
												CreationalPatterns.functions.createButton('Get Code', 'getcodeBuilderPattern', divCont10);
												let buttonCodeBP = document.getElementById('getcodeBuilderPattern') as HTMLButtonElement;
												buttonCodeBP.addEventListener('click', async (e: Event) =>{
													let infoList = document.getElementsByClassName('infoField');
													let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check															
													let v = (document.getElementById('txtboxProduct_name') as HTMLInputElement).value + "Builder";
													CreationalPatterns.values["Builder"].values["Builder"].name = v;
													let textfield:  Textfield={ ident: 1, value: v };
													textfieldArray.push(textfield);
													CreationalPatterns.values["Builder"].values["Director"].name = "Director";
													let numCat = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
													let numSteps = parseInt((document.getElementById('stepsNum') as HTMLInputElement).value);
													for (var i=1; i<=numCat; i++){
														CreationalPatterns.values["Builder"].values["ConcreteProduct"+i] = { "name":"", "extension":0};
														let v1 = (infoList.item(i) as HTMLInputElement).value;
														CreationalPatterns.values["Builder"].values["ConcreteProduct"+i].name = v1;
														let textfield:  Textfield={ ident: 1, value: v1 };
														textfieldArray.push(textfield);
														CreationalPatterns.values["Builder"].values["ConcreteBuilder"+i] = { "name":"", "extension":0};
													}
													for (var j=1; j<=numSteps; j++){
														CreationalPatterns.values["Builder"].values["BuilderMethod"+j] = { "name":"", "extension":0};
														let v2 = (infoList.item(i) as HTMLInputElement).value;
														CreationalPatterns.values["Builder"].values["BuilderMethod"+j].name = v2;
														let textfield:  Textfield={ ident: 2, value: v2 };
														textfieldArray.push(textfield);
														i++;
													}
													
													let message = CreationalPatterns.functions.checkInputsOnSubmit(1);
													if (message == "Input is valid"){
														CreationalPatterns.functions.insertInputsBuilder(CreationalPatterns.values["Builder"].values);
														CreationalPatterns.functions.checkMessage(await helloBackendService.codeGeneration(window.location.href, CreationalPatterns.values["Builder"].values, "Builder"), messageService);
													}else{
														messageService.info(message);
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
										CreationalPatterns.functions.textfieldQuestion('<br> What is the name of the Creator (e.g., Oven) of Product? <br>', 1, 'text', 'Creator name', 'txtboxCreatorName', 'infoField', 'buttonNext8', divCont8);
										let buttonNext8 = document.getElementById('buttonNext8') as HTMLButtonElement;
										buttonNext8.addEventListener('click', async (e: Event) =>{
											divCont9.innerHTML = "";
											CreationalPatterns.functions.createLabel('<br> <b>Factory Method Pattern</b>   ', 'labelPattern2', divCont9);
											CreationalPatterns.functions.createButton('Get Code', 'getcodeFactoryMethodPattern', divCont9);
											let buttonCodeFMP = document.getElementById('getcodeFactoryMethodPattern') as HTMLButtonElement;
											buttonCodeFMP.addEventListener('click', async (e: Event) =>{
													let infoList = document.getElementsByClassName('infoField');
													let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check
													CreationalPatterns.values["FactoryMethod"].values["Product"].name = (infoList.item(0) as HTMLInputElement).value;
													let textfield:  Textfield={ ident: 1, value: (infoList.item(0) as HTMLInputElement).value };
													textfieldArray.push(textfield);
													let numCat = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
													for (var i=1; i<=numCat; i++){
														CreationalPatterns.values["FactoryMethod"].values["ConcreteProduct"+i] = { "name":"", "extension":0};
														let v1 = (infoList.item(i) as HTMLInputElement).value;
														CreationalPatterns.values["FactoryMethod"].values["ConcreteProduct"+i].name = v1;
														let textfield:  Textfield={ ident: 1, value: v1 };
														textfieldArray.push(textfield);
														CreationalPatterns.values["FactoryMethod"].values["ConcreteCreator"+i] = { "name":"", "extension":0};
													}
													CreationalPatterns.values["FactoryMethod"].values["Creator"].name = (infoList.item(i) as HTMLInputElement).value;
													let textfield2:  Textfield={ ident: 1, value: (infoList.item(i) as HTMLInputElement).value };
													textfieldArray.push(textfield2);
													console.log(JSON.stringify(CreationalPatterns.values["FactoryMethod"]));;											
													let message = CreationalPatterns.functions.checkInputsOnSubmit(1);																
													if (message == "Input is valid"){
														CreationalPatterns.functions.insertInputsFactoryMethod(CreationalPatterns.values["FactoryMethod"].values);	
														CreationalPatterns.functions.checkMessage(await helloBackendService.codeGeneration(window.location.href, CreationalPatterns.values["FactoryMethod"].values, "FactoryMethod"),messageService);
													}else{
														messageService.info(message);
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
						CreationalPatterns.functions.createLabel('<br> There is no pattern <br>', 'labelQuestion16', divCont4);
					});
					divCont3.appendChild(divCont4);
				});
				divCont2.appendChild(divCont3);
		});
		let radio12 = document.getElementById('radio12') as HTMLInputElement;
		radio12.addEventListener('click', async (e: Event) =>{	
			divCont2.innerHTML = "";
			let divCont3 = document.createElement('div');
			CreationalPatterns.functions.radioQuestion('<br> Do you want the object to be unique or clone? <br>', 'Unique', 'Cloned', 'radio121', 'radio122', divCont2);
			let radio121 = document.getElementById('radio121') as HTMLInputElement;
			radio121.addEventListener('click', async (e: Event) =>{
				divCont3.innerHTML = "";
				let divCont4 = document.createElement('div');
				CreationalPatterns.functions.textfieldQuestion('<br> Please provide the name of the Single class <br>', 1, 'text', 'Singleton name', 'txtboxSingletonName', 'infoField', 'buttonNext9', divCont3);
				let buttonNext9 = document.getElementById('buttonNext9') as HTMLButtonElement;
				buttonNext9.addEventListener('click', async (e: Event) =>{
					divCont4.innerHTML = "";
					CreationalPatterns.functions.createLabel('<br> <b>Singleton Pattern</b>   ', 'labelPattern3', divCont4);
					CreationalPatterns.functions.createButton('Get Code', 'getcodeSingletonPattern', divCont4);
					let buttonCodeSP = document.getElementById('getcodeSingletonPattern') as HTMLButtonElement;
					buttonCodeSP.addEventListener('click', async (e: Event) =>{
						let singlName = (document.getElementById('txtboxSingletonName') as HTMLInputElement).value;
						CreationalPatterns.values["Singleton"].values["Singleton"].name = singlName;
						if (singlName==""){
							messageService.info("You need to fill all the fields!");
						}else if (!singlName.match("^([A-Z]{1}[a-zA-Z]*[0-9]*)$")){
							messageService.info("Class's name must start with a capital letter!");
						}else{
							CreationalPatterns.functions.checkMessage(await helloBackendService.codeGeneration(window.location.href, CreationalPatterns.values["Singleton"].values, "Singleton"), messageService);
						}
					});
				});
				divCont3.appendChild(divCont4);
			});
			let radio122 = document.getElementById('radio122') as HTMLInputElement;
			radio122.addEventListener('click', async (e: Event) =>{
				divCont3.innerHTML = "";
				let divCont4 = document.createElement('div');
				CreationalPatterns.functions.textfieldQuestion('<br> Give the name of the Product that you want to create clones from  <br>', 1, 'text', 'Product name', 'txtboxProductName', 'infoField', 'buttonNext10', divCont3);
				let buttonNext10 = document.getElementById('buttonNext10') as HTMLButtonElement;
				buttonNext10.addEventListener('click', async (e: Event) =>{
					divCont4.innerHTML = "";
					let divCont5 = document.createElement('div');
					CreationalPatterns.functions.radioQuestion('<br> Does the Product has sub-categories (Concrete Prototypes)? <br>', 'Yes', 'No', 'radio1221', 'radio1222', divCont4);
					let radio1221 = document.getElementById('radio1221') as HTMLInputElement;
					radio1221.addEventListener('click', async (e: Event) =>{
						divCont5.innerHTML = "";
						let divCont6 = document.createElement('div');
						CreationalPatterns.functions.textfieldQuestion('<br> How many sub-categories exist? <br>', 1, 'number', '1', 'subcategoriesNum', '', 'buttonNext11', divCont5);
						let buttonNext11 = document.getElementById('buttonNext11') as HTMLButtonElement;
						buttonNext11.addEventListener('click', async (e: Event) =>{
							divCont6.innerHTML = "";
							let divCont7 = document.createElement('div');
							let num = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
							CreationalPatterns.functions.textfieldQuestion('<br> Please give the names of the Concrete Prototypes <br>', num, 'text', 'Concrete Prototype name ', 'txtboxConcretePrototypesName', 'infoField', 'buttonNext12', divCont6);
							let buttonNext12 = document.getElementById('buttonNext12') as HTMLButtonElement;
							buttonNext12.addEventListener('click', async (e: Event) =>{
								divCont7.innerHTML = "";
								CreationalPatterns.functions.createLabel('<br> <b>Prototype Pattern</b>   ', 'labelPattern4', divCont7);
								CreationalPatterns.functions.createButton('Get Code', 'getcodePrototypePattern', divCont7);
								let buttonCodePP = document.getElementById('getcodePrototypePattern') as HTMLButtonElement;
								buttonCodePP.addEventListener('click', async (e: Event) =>{
									let infoList = document.getElementsByClassName('infoField');
									let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check
									CreationalPatterns.values["Prototype"].values["Prototype"].name = (infoList.item(0) as HTMLInputElement).value;
									let textfield:  Textfield={ ident: 1, value: (infoList.item(0) as HTMLInputElement).value };
									textfieldArray.push(textfield);
									let numCat = parseInt((document.getElementById('subcategoriesNum') as HTMLInputElement).value);
									for (var i=1; i<=numCat; i++){
										CreationalPatterns.values["Prototype"].values["ConcretePrototype"+i] = { "name":"", "extension":0};
										let v1 = (infoList.item(i) as HTMLInputElement).value;
										CreationalPatterns.values["Prototype"].values["ConcretePrototype"+i].name = v1;
										let textfield:  Textfield={ ident: 1, value: v1 };
										textfieldArray.push(textfield);
									}
									let message = CreationalPatterns.functions.checkInputsOnSubmit(1);
									if (message == "Input is valid"){											
										CreationalPatterns.functions.checkMessage(await helloBackendService.codeGeneration(window.location.href, CreationalPatterns.values["Prototype"].values, "Prototype"), messageService);
									}else{
										messageService.info(message);
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
						CreationalPatterns.functions.createLabel('<br> There is no pattern <br>', 'labelQuestion22', divCont5);
					});
					divCont4.appendChild(divCont5);
				});
				divCont3.appendChild(divCont4);
			});
			divCont2.appendChild(divCont3);
		});
		divCont.appendChild(divCont2);

	}		

}