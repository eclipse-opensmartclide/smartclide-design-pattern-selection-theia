import data from './data.json';
import {Functions} from './functions';
import { MessageService } from '@theia/core';
import { HelloBackendService } from '../common/protocol';


interface Textfield{
	ident: number;
	value: string;
};


export class BehavioralPatterns{

    static functions = new Functions();
	static values = JSON.parse(JSON.stringify(data));
	
    behavioralPatternsWizard(divCont: HTMLDivElement, messageService: MessageService, helloBackendService: HelloBackendService){
			divCont.innerHTML = "";
			let divCont1 = document.createElement('div');
			BehavioralPatterns.functions.radioQuestion('<br> Do you need an Object that will handle requests for executing an action? <br>', 'Yes', 'No', 'radio31', 'radio32', divCont);

			let radio31 = document.getElementById('radio31') as HTMLInputElement;
            radio31.addEventListener('click', async (e: Event) =>{
				divCont1.innerHTML = "";
                let divCont2 = document.createElement('div');
				BehavioralPatterns.functions.radioQuestion('<br>Is the recepient of the request known? <br>', 'Yes', 'No', 'radio311', 'radio312', divCont1);
				let radio311 = document.getElementById('radio311') as HTMLInputElement;
				radio311.addEventListener('click', async (e: Event) =>{
					divCont2.innerHTML = "";
					let divCont3 = document.createElement('div');
					BehavioralPatterns.functions.radioQuestion('<br>Is the receiver part of a comple component, whose internal structure you want to hide? <br>', 'Yes', 'No', 'radio3111', 'radio3112', divCont2);
					let radio3111 = document.getElementById("radio3111") as HTMLInputElement;
					radio3111.addEventListener('click', async(e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						BehavioralPatterns.functions.textfieldQuestion('<br> Insert the name of the Mediator, the interface that declares the connection method<br>', 1, 'text', 'Mediator name', 'txtboxMediator', 'infoField', 'buttonNext', divCont3);
						let buttonNext = document.getElementById('buttonNext') as HTMLButtonElement;
						buttonNext.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							let divCont5 = document.createElement('div');
							BehavioralPatterns.functions.textfieldQuestion('<br>How many Concrete Mediators(classes that implement the connection in a diffirent way) exist? <br>',  1, 'number', '1', 'numOfConcreteMediators', '', 'buttonNext1', divCont4);;
							let buttonNext1 = document.getElementById('buttonNext1') as HTMLButtonElement;
							buttonNext1.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								let divCont6 = document.createElement('div');
								BehavioralPatterns.functions.textfieldQuestion("<br> Insert the names of the Concrete Mediators <br>", parseInt((document.getElementById('numOfConcreteMediators') as HTMLInputElement).value), 'text', "Subclass's name ", 'txtboxConcreteImplementation', 'infoField', 'buttonNext2', divCont5);
								let buttonNext2 = document.getElementById('buttonNext2') as HTMLButtonElement;
								buttonNext2.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									BehavioralPatterns.functions.textfieldQuestion('<br>How many Components(classes that need to be connected) exist? <br>',  1, 'number', '1', 'numOfConmponents', '', 'buttonNext3', divCont4);;
									let buttonNext3 = document.getElementById('buttonNext3') as HTMLButtonElement;
									buttonNext3.addEventListener('click', async (e: Event) =>{
										divCont5.innerHTML = "";
										let divCont6 = document.createElement('div');
										BehavioralPatterns.functions.textfieldQuestion("<br> Insert the names of the Concrete Components <br>", parseInt((document.getElementById('numOfConmponents') as HTMLInputElement).value), 'text', "Subclass's name ", 'txtboxConcreteImplementation', 'infoField', 'buttonNext4', divCont5);
										let buttonNext4 = document.getElementById('buttonNext4') as HTMLButtonElement;
										buttonNext4.addEventListener('click', async (e: Event) =>{
											divCont6.innerHTML = "";
											let divCont7 = document.createElement('div');
											BehavioralPatterns.functions.createLabel('<br> <b>Mediator Pattern</b>  ', '', divCont7);
											BehavioralPatterns.functions.createButton('Get Code', 'getcodeBridgePattern', divCont7);
											let buttonCodeBP = document.getElementById('getcodeBridgePattern') as HTMLButtonElement;
											buttonCodeBP.addEventListener('click', async (e: Event) =>{
											});
											divCont6.append(divCont7);
										});
										
									});
									
								});
								divCont5.append(divCont6);
							});
							divCont4.appendChild(divCont5);
						});
						divCont3.appendChild(divCont4);
					});
					let radio3112 = document.getElementById("radio3112") as HTMLInputElement;
					radio3112.addEventListener('click', async(e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						BehavioralPatterns.functions.radioQuestion('<br> Do you prefer to handle differnt requests as objects, instead of methods? <br>', 'Yes', 'No', 'radio31121', 'radio31122', divCont3);
						let radio31121 = document.getElementById("radio31121") as HTMLInputElement;
						radio31121.addEventListener('click', async(e: Event) =>{
							divCont4.innerHTML = "";
							let divCont4b = document.createElement('div');
							BehavioralPatterns.functions.textfieldQuestion('<br> Insert the name of the Sender, the class that initiates the requests. <br>', 1, 'text', "Sender's name", 'txtboxInvoker', '', 'buttonNext4', divCont4);
							let buttonNext4 = document.getElementById('buttonNext4') as HTMLButtonElement;
							buttonNext4.addEventListener('click', async (e: Event) =>{
							  divCont4b.innerHTML = "";
							  let divCont5 = document.createElement('div');
							  BehavioralPatterns.functions.textfieldQuestion('<br> Insert the name of the Receiver, the class that accepts the requests. <br>', 1, 'text', "Receiver's name", 'txtboxReceiver', '', 'buttonNext4b', divCont4b);
							  let buttonNext4b = document.getElementById('buttonNext4b') as HTMLButtonElement;
							  buttonNext4b.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								let divCont6 = document.createElement('div');
								BehavioralPatterns.functions.textfieldQuestion('<br> Insert the name of the Command, the interface that declares the executing command <br>', 1, 'text', "Command's name", 'txtboxCommand', '', 'buttonNext5', divCont5);
								let buttonNext5 = document.getElementById('buttonNext5') as HTMLButtonElement;
								buttonNext5.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									let divCont7 = document.createElement('div');
									BehavioralPatterns.functions.textfieldQuestion('<br> How many Concrete Commands are there (classes that implement different executing commands)? <br>', 1, 'number', "1", 'numOfConcreteCommands', '', 'buttonNext6', divCont6);
									let buttonNext6 = document.getElementById('buttonNext6') as HTMLButtonElement;
									buttonNext6.addEventListener('click', async (e: Event) =>{
										divCont7.innerHTML = "";
										let divCont8 = document.createElement('div');
										BehavioralPatterns.functions.textfieldQuestion('<br> Insert the names of the Concrete Commands <br>', parseInt((document.getElementById('numOfConcreteCommands') as HTMLInputElement).value), 'text', "Concrete Command's name", 'txtboxConcreteCommand', '', 'buttonNext7', divCont7);
										let buttonNext7 = document.getElementById('buttonNext7') as HTMLButtonElement;
										buttonNext7.addEventListener('click', async (e: Event) =>{
											divCont8.innerHTML = "";
											let divCont9 = document.createElement('div');
											BehavioralPatterns.functions.textfieldQuestion('<br> Insert the name of the executing command(method) of each Concrete Command <br>', parseInt((document.getElementById('numOfConcreteCommands') as HTMLInputElement).value), 'text', "Method of Concrete Command", 'txtboxConcreteCommandMethod', '', 'buttonNext8', divCont8);
											let buttonNext8 = document.getElementById('buttonNext8') as HTMLButtonElement;
											buttonNext8.addEventListener('click', async (e: Event) =>{
												divCont9.innerHTML = "";
												let divCont10 = document.createElement('div');
												BehavioralPatterns.functions.textfieldQuestion('<br> Insert the type and the parameter of the executing command(method) of each Concrete Command <br>', parseInt((document.getElementById('numOfConcreteCommands') as HTMLInputElement).value), 'text', "Type and Parameter of Method", 'txtboxConcreteCommandMethodParameter', '', 'buttonNext9', divCont9);
												let buttonNext9 = document.getElementById('buttonNext9') as HTMLButtonElement;
												buttonNext9.addEventListener('click', async (e: Event) =>{
													divCont10.innerHTML = "";
													BehavioralPatterns.functions.createLabel('<br> <b>Command Pattern</b>  ', '', divCont10);
													BehavioralPatterns.functions.createButton('Get Code', 'getcodeCommandPattern', divCont10);
													let buttonCodeCP = document.getElementById('getcodeCommandPattern') as HTMLButtonElement;
													buttonCodeCP.addEventListener('click', async (e: Event) =>{
														let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check
														let textfield1:  Textfield={ ident: 1, value: (document.getElementById('txtboxReceiver')as HTMLInputElement).value };
														let textfield2:  Textfield={ ident: 1, value: (document.getElementById('txtboxInvoker')as HTMLInputElement).value };
														let textfield3:  Textfield={ ident: 1, value: (document.getElementById('txtboxCommand')as HTMLInputElement).value };
														textfieldArray.push(textfield1);
														textfieldArray.push(textfield2);
														textfieldArray.push(textfield3);
														
															BehavioralPatterns.values["Command"].values["Receiver"].name = (document.getElementById('txtboxReceiver')as HTMLInputElement).value;
															BehavioralPatterns.values["Command"].values["Invoker"].name = (document.getElementById('txtboxInvoker')as HTMLInputElement).value;
															BehavioralPatterns.values["Command"].values["Command"].name = (document.getElementById('txtboxCommand')as HTMLInputElement).value;
															for (var i=1; i<=parseInt((document.getElementById('numOfConcreteCommands') as HTMLInputElement).value); i++){
																BehavioralPatterns.values["Command"].values["ConcreteCommand"+i] = { "name":"", "extension":1};
																BehavioralPatterns.values["Command"].values["ConcreteCommand"+i].name = (document.getElementById('txtboxConcreteCommand'+i)as HTMLInputElement).value;
																BehavioralPatterns.values["Command"].values["ConcreteCommand"+i+"Method"] = { "name":"", "extension":0};
																BehavioralPatterns.values["Command"].values["ConcreteCommand"+i+"Method"].name = (document.getElementById('txtboxConcreteCommandMethod'+i)as HTMLInputElement).value;
																BehavioralPatterns.values["Command"].values["ConcreteCommand"+i+"MethodParameter"] = { "name":"", "extension":0};
																BehavioralPatterns.values["Command"].values["ConcreteCommand"+i+"MethodParameter"].name = (document.getElementById('txtboxConcreteCommandMethodParameter'+i)as HTMLInputElement).value;
																let textfield1:  Textfield={ ident: 1, value: (document.getElementById('txtboxConcreteCommand'+i)as HTMLInputElement).value };
																let textfield2:  Textfield={ ident: 2, value: (document.getElementById('txtboxConcreteCommandMethod'+i)as HTMLInputElement).value };
																let textfield3:  Textfield={ ident: 3, value: (document.getElementById('txtboxConcreteCommandMethodParameter'+i)as HTMLInputElement).value };
																textfieldArray.push(textfield1);
																textfieldArray.push(textfield2);
																textfieldArray.push(textfield3);
															}
															console.log(JSON.stringify(BehavioralPatterns.values["Command"]));

														let message = BehavioralPatterns.functions.checkInputs(textfieldArray);
														if (message == "Input is valid"){
															BehavioralPatterns.functions.checkMessage(await helloBackendService.codeGeneration(window.location.href, BehavioralPatterns.values["Command"].values, "Command"), messageService);
														}else{
															messageService.info(message);
														}
													});
												});	
												divCont9.appendChild(divCont10);
											});	
											divCont8.appendChild(divCont9);
										});	
										divCont7.appendChild(divCont8);
									});	
									divCont6.appendChild(divCont7);
								});	
								divCont5.appendChild(divCont6);
							  });	
							  divCont4b.appendChild(divCont5);
							});	
							divCont4.appendChild(divCont4b);	
						});
						let radio31122 = document.getElementById("radio31122") as HTMLInputElement;
						radio31122.addEventListener('click', async(e: Event) =>{
							divCont4.innerHTML = "";
							BehavioralPatterns.functions.createLabel('<br> There is no pattern <br>', '', divCont4);	
						});
						divCont3.appendChild(divCont4);
					});
                    divCont2.appendChild(divCont3);
                });
                let radio312= document.getElementById('radio312') as HTMLInputElement;
				radio312.addEventListener('click', async (e: Event) =>{
					divCont2.innerHTML = "";
					let divCont3 = document.createElement('div');
					BehavioralPatterns.functions.textfieldQuestion('<br> Insert the name of the interface that handles the requests<br>', 1, 'text', 'Handler name', 'txtboxHandler', '', 'buttonNext', divCont2);
					let buttonNext = document.getElementById("buttonNext") as HTMLInputElement;
					buttonNext.addEventListener('click', async(e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						BehavioralPatterns.functions.textfieldQuestion('<br> How many Concrete Handlers exist? <br>', 1, 'number', '1', 'numOfConcreteHandlers','', 'buttonNext1', divCont3);
						let buttonNext1 = document.getElementById('buttonNext1') as HTMLButtonElement;
						buttonNext1.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							let divCont5 = document.createElement('div');
							BehavioralPatterns.functions.textfieldQuestion('<br>Insert the names of the Concrete Handlers. <br>', parseInt((document.getElementById('numOfConcreteHandlers') as HTMLInputElement).value) , 'text', "Concrete Handler's name", 'txtboxConcreteHandler', '', 'buttonNext2', divCont4);
							let buttonNext2 = document.getElementById('buttonNext2') as HTMLButtonElement;
							buttonNext2.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								BehavioralPatterns.functions.createLabel('<br> <b>Chain of Responsibility Pattern</b>  ', '', divCont5);
								BehavioralPatterns.functions.createButton('Get Code', 'getcodeChainOfResponsibilityPattern', divCont5);
								let buttonCodeCORP = document.getElementById('getcodeChainOfResponsibilityPattern') as HTMLButtonElement;
								buttonCodeCORP.addEventListener('click', async (e: Event) =>{
									let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check
									let textfield1:  Textfield={ ident: 1, value: (document.getElementById('txtboxHandler')as HTMLInputElement).value };
									BehavioralPatterns.values["ChainOfResponsibility"].values["Handler"].name = (document.getElementById('txtboxHandler')as HTMLInputElement).value;
									textfieldArray.push(textfield1);
									for (var i=1; i<=parseInt((document.getElementById('numOfConcreteHandlers') as HTMLInputElement).value); i++){
										BehavioralPatterns.values["ChainOfResponsibility"].values["ConcreteHandler"+i] = { "name":"", "extension":1};
										BehavioralPatterns.values["ChainOfResponsibility"].values["ConcreteHandler"+i].name = (document.getElementById('txtboxConcreteHandler'+i)as HTMLInputElement).value;
										let textfield:  Textfield={ ident: 1, value: (document.getElementById('txtboxConcreteHandler'+i)as HTMLInputElement).value };
										textfieldArray.push(textfield);
									}
									console.log(JSON.stringify(BehavioralPatterns.values["ChainOfResponsibility"]));

								let message = BehavioralPatterns.functions.checkInputs(textfieldArray);
								if (message == "Input is valid"){
									BehavioralPatterns.functions.checkMessage(await helloBackendService.codeGeneration(window.location.href, BehavioralPatterns.values["ChainOfResponsibility"].values, "ChainOfResponsibility"), messageService);
								}else{
									messageService.info(message);
								}			
								});
							});
							divCont4.appendChild(divCont5);
						});
						divCont3.appendChild(divCont4);
					});
					divCont2.appendChild(divCont3);
                });
				divCont1.appendChild(divCont2);
            });
			
            let radio32 = document.getElementById('radio32') as HTMLInputElement;
            radio32.addEventListener('click', async (e: Event) =>{	
				divCont1.innerHTML = "";
				let divCont2 = document.createElement('div');
				BehavioralPatterns.functions.radioQuestion('<br>Do you need varying implementations of algorithms, executed under different conditions? <br>', 'Yes', 'No', 'radio321', 'radio322', divCont1);
				let radio321 = document.getElementById('radio321') as HTMLInputElement;
				radio321.addEventListener('click', async (e: Event) =>{
					divCont2.innerHTML = "";
					let divCont3 = document.createElement('div');
					BehavioralPatterns.functions.radioQuestion('<br>Are the varying implementations based on an existing implementention, being extended in different ways? <br>', 'Yes', 'No', 'radio3211', 'radio3212', divCont2);
					let radio3211 = document.getElementById('radio3211') as HTMLInputElement;
					radio3211.addEventListener('click', async (e: Event) =>{
						//VISITOR
					});
					let radio3212 = document.getElementById('radio3212') as HTMLInputElement;
					radio3212.addEventListener('click', async (e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						BehavioralPatterns.functions.radioQuestion('<br>Are the varying implementations part of a common skeleton algoruithm? <br>', 'Yes', 'No', 'radio32121', 'radio32122', divCont3);
						let radio32121 = document.getElementById('radio32121') as HTMLInputElement;
						radio32121.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							let divCont5 = document.createElement('div');
							BehavioralPatterns.functions.textfieldQuestion('<br>Insert the name of the Abstract Class, the class that declares the states of an object or the steps of an algorithm <br>', 1, 'text', 'Abstract Class name', 'txtboxAbstractClass', '', 'buttonNext', divCont4);
							let buttonNext = document.getElementById('buttonNext') as HTMLInputElement;
							buttonNext.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								let divCont6 = document.createElement('div');
								
								BehavioralPatterns.functions.textfieldQuestion('<br> How many states/steps exist? <br>', 1, 'number', '1', 'numOfSteps', '', 'buttonNextb', divCont5);
								let buttonNextb = document.getElementById('buttonNextb') as HTMLButtonElement;
								buttonNextb.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									let divCont7 = document.createElement('div');
									BehavioralPatterns.functions.textfieldQuestion('<br>Insert the names of the states/steps <br>',  parseInt((document.getElementById('numOfSteps') as HTMLInputElement).value), 'text', 'State/Step name', 'txtboxAbstractClassMethod', '', 'buttonNext1', divCont6);;
									let buttonNext1 = document.getElementById('buttonNext1') as HTMLButtonElement;
									buttonNext1.addEventListener('click', async (e: Event) =>{
										divCont7.innerHTML = "";
										let divCont8 = document.createElement('div');
										BehavioralPatterns.functions.textfieldQuestion("<br>How many Concrete Classes(classes that implement the states/steps in a different way) exist? <br>", 1, 'number', "1", 'numOfConcreteClasses', '', 'buttonNext2', divCont7);
										let buttonNext2 = document.getElementById('buttonNext2') as HTMLButtonElement;
										buttonNext2.addEventListener('click', async (e: Event) =>{
											divCont8.innerHTML = "";
											let divCont9 = document.createElement('div');
											BehavioralPatterns.functions.textfieldQuestion('<br>Insert the names of the Concrete Classes <br>', parseInt((document.getElementById('numOfConcreteClasses') as HTMLInputElement).value) , 'text', "Concrete Classe's name", 'txtboxConcreteClass', '', 'buttonNext3', divCont8);
											let buttonNext3 = document.getElementById('buttonNext3') as HTMLButtonElement;
											buttonNext3.addEventListener('click', async (e: Event) =>{
												divCont9.innerHTML = "";
													BehavioralPatterns.functions.createLabel('<br> <b>Template Method Pattern</b>  ', '', divCont9);
													BehavioralPatterns.functions.createButton('Get Code', 'getcodeTemplateMethodPattern', divCont9);
													let buttonCodeTMP = document.getElementById('getcodeTemplateMethodPattern') as HTMLButtonElement;
													buttonCodeTMP.addEventListener('click', async (e: Event) =>{
														let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check
														let textfield1:  Textfield={ ident: 1, value: (document.getElementById('txtboxAbstractClass')as HTMLInputElement).value };
														textfieldArray.push(textfield1);
														BehavioralPatterns.values["TemplateMethod"].values["AbstractClass"].name = (document.getElementById('txtboxAbstractClass')as HTMLInputElement).value;
														for (var i=1; i<=parseInt((document.getElementById('numOfSteps') as HTMLInputElement).value); i++){
															BehavioralPatterns.values["TemplateMethod"].values["AbstractClassMethod"+i] = { "name":"", "extension":0};
															BehavioralPatterns.values["TemplateMethod"].values["AbstractClassMethod"+i].name = (document.getElementById('txtboxAbstractClassMethod'+i)as HTMLInputElement).value;
															let textfield:  Textfield={ ident: 2, value: (document.getElementById('txtboxAbstractClassMethod'+i)as HTMLInputElement).value };
															textfieldArray.push(textfield);
														}
														for (var i=1; i<=parseInt((document.getElementById('numOfConcreteClasses') as HTMLInputElement).value); i++){
															BehavioralPatterns.values["TemplateMethod"].values["ConcreteClass"+i] = { "name":"", "extension":1};
															BehavioralPatterns.values["TemplateMethod"].values["ConcreteClass"+i].name = (document.getElementById('txtboxConcreteClass'+i)as HTMLInputElement).value;
															let textfield:  Textfield={ ident: 1, value: (document.getElementById('txtboxConcreteClass'+i)as HTMLInputElement).value };
															textfieldArray.push(textfield);
														}
															console.log(JSON.stringify(BehavioralPatterns.values["TemplateMethod"]));

														let message = BehavioralPatterns.functions.checkInputs(textfieldArray);
														if (message == "Input is valid"){
															BehavioralPatterns.functions.checkMessage(await helloBackendService.codeGeneration(window.location.href, BehavioralPatterns.values["TemplateMethod"].values, "TemplateMethod"), messageService);
														}else{
															messageService.info(message);
														}
													
													});
											});
											divCont8.append(divCont9);
										});
										divCont7.append(divCont8);
									});
									divCont6.appendChild(divCont7);
								});
								divCont5.appendChild(divCont6);
							});
							divCont4.appendChild(divCont5);
						});
						let radio32122 = document.getElementById('radio32122') as HTMLInputElement;
						radio32122.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							let divCont5 = document.createElement('div');
							BehavioralPatterns.functions.radioQuestion('<br>Implement different implementation with polymorphisms? <br>', 'Yes', 'No', 'radio321221', 'radio321222', divCont4);
							let radio321221 = document.getElementById('radio321221') as HTMLInputElement;
							radio321221.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								let divCont6 = document.createElement('div');
								
								BehavioralPatterns.functions.textfieldQuestion('<br> Insert the name of the Context (the class that communicates with the object only via the strategy interface)<br>', 1, 'text', 'Context name', 'txtboxContext', '', 'buttonNext', divCont5);
								let buttonNext = document.getElementById('buttonNext') as HTMLButtonElement;
								buttonNext.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									let divCont7 = document.createElement('div');
									BehavioralPatterns.functions.textfieldQuestion('<br>Insert the name of the Strategy (the interface that is used for the Context to execute different strategies) <br>',  1, 'text', 'Strategy name', 'txtboxStrategy', '', 'buttonNext1', divCont6);;
									let buttonNext1 = document.getElementById('buttonNext1') as HTMLButtonElement;
									buttonNext1.addEventListener('click', async (e: Event) =>{
										divCont7.innerHTML = "";
										let divCont8 = document.createElement('div');
										BehavioralPatterns.functions.textfieldQuestion("<br> Insert the name of the Strategy Method <br>", 1, 'text', "Strategy's Method ", 'txtboxStrategyMethod', '', 'buttonNext2', divCont7);
										let buttonNext2 = document.getElementById('buttonNext2') as HTMLButtonElement;
										buttonNext2.addEventListener('click', async (e: Event) =>{
											divCont8.innerHTML = "";
											let divCont9 = document.createElement('div');
											BehavioralPatterns.functions.textfieldQuestion('<br>How many Concrete Strategies(classes that implement different variations of an algorithm the context uses) exist? <br>',  1, 'number', '1', 'numOfConcreteStrategies', '', 'buttonNext3', divCont8);
											let buttonNext3 = document.getElementById('buttonNext3') as HTMLButtonElement;
											buttonNext3.addEventListener('click', async (e: Event) =>{
												divCont9.innerHTML = "";
												let divCont10 = document.createElement('div');
												BehavioralPatterns.functions.textfieldQuestion("<br> Insert the names of the Concrete Strategies <br>", parseInt((document.getElementById('numOfConcreteStrategies') as HTMLInputElement).value), 'text', "Concrete Strategy's name ", 'txtboxConcreteStrategy', '', 'buttonNext4', divCont9);
												let buttonNext4 = document.getElementById('buttonNext4') as HTMLButtonElement;
												buttonNext4.addEventListener('click', async (e: Event) =>{
													divCont10.innerHTML = "";
													let divCont11 = document.createElement('div');
													BehavioralPatterns.functions.createLabel('<br> <b>Strategy Pattern</b>  ', '', divCont10);
													BehavioralPatterns.functions.createButton('Get Code', 'getcodeStrategyPattern', divCont10);
													let buttonCodeSP = document.getElementById('getcodeStrategyPattern') as HTMLButtonElement;
													buttonCodeSP.addEventListener('click', async (e: Event) =>{
														let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check
														let textfield1:  Textfield={ ident: 1, value: (document.getElementById('txtboxContext')as HTMLInputElement).value };
														let textfield2:  Textfield={ ident: 1, value: (document.getElementById('txtboxStrategy')as HTMLInputElement).value };
														let textfield3:  Textfield={ ident: 2, value: (document.getElementById('txtboxStrategyMethod')as HTMLInputElement).value };
														textfieldArray.push(textfield1);
														textfieldArray.push(textfield2);
														textfieldArray.push(textfield3);
														
															BehavioralPatterns.values["Strategy"].values["Context"].name = (document.getElementById('txtboxContext')as HTMLInputElement).value;
															BehavioralPatterns.values["Strategy"].values["Strategy"].name = (document.getElementById('txtboxStrategy')as HTMLInputElement).value;
															BehavioralPatterns.values["Strategy"].values["StrategyMethod"].name = (document.getElementById('txtboxStrategyMethod')as HTMLInputElement).value;
															for (var i=1; i<=parseInt((document.getElementById('numOfConcreteStrategies') as HTMLInputElement).value); i++){
																BehavioralPatterns.values["Strategy"].values["ConcreteStrategy"+i] = { "name":"", "extension":0};
																BehavioralPatterns.values["Strategy"].values["ConcreteStrategy"+i].name = (document.getElementById('txtboxConcreteStrategy'+i)as HTMLInputElement).value;
																let textfield:  Textfield={ ident: 1, value: (document.getElementById('txtboxConcreteStrategy'+i)as HTMLInputElement).value };
																textfieldArray.push(textfield);
															}
															console.log(JSON.stringify(BehavioralPatterns.values["Strategy"]));

														let message = BehavioralPatterns.functions.checkInputs(textfieldArray);
														if (message == "Input is valid"){
															BehavioralPatterns.functions.checkMessage(await helloBackendService.codeGeneration(window.location.href, BehavioralPatterns.values["Strategy"].values, "Strategy"), messageService);
														}else{
															messageService.info(message);
														}
													});
													divCont10.append(divCont11);
												});
												divCont9.append(divCont10);
											});
											divCont8.append(divCont9);
										});
										divCont7.append(divCont8);
									});
									divCont6.appendChild(divCont7);
								});
								divCont5.appendChild(divCont6);
							});
							let radio321222 = document.getElementById('radio321222') as HTMLInputElement;
							radio321222.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								BehavioralPatterns.functions.createLabel('<br> There is no pattern <br>', '', divCont5);
							});
							divCont4.appendChild(divCont5);
						});
						divCont3.appendChild(divCont4);
					});
					divCont2.appendChild(divCont3);
				});
				let radio322 = document.getElementById('radio322') as HTMLInputElement;
				radio322.addEventListener('click', async (e: Event) =>{
					divCont2.innerHTML = "";
					let divCont3 = document.createElement('div');
					BehavioralPatterns.functions.radioQuestion('<br>Do you need to manage an object with differnt states? <br>', 'Yes', 'No', 'radio3221', 'radio3222', divCont2);
					let radio3221 = document.getElementById('radio3221') as HTMLInputElement;
					radio3221.addEventListener('click', async (e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						BehavioralPatterns.functions.radioQuestion('<br>Do you need every state of the Object to be saved, offering the implementation of "undo"? <br>', 'Yes', 'No', 'radio32211', 'radio32212', divCont3);
						let radio32211 = document.getElementById('radio32211') as HTMLInputElement;
						radio32211.addEventListener('click', async (e: Event) =>{
							//Memento
						});
						let radio32212 = document.getElementById('radio32212') as HTMLInputElement;
						radio32212.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							let divCont5 = document.createElement('div');
							BehavioralPatterns.functions.radioQuestion('<br>Do you need the change of state to be broadcasted to intersted parties <br>', 'Yes', 'No', 'radio322121', 'radio322122', divCont4);
							let radio322121 = document.getElementById('radio322121') as HTMLInputElement;
							radio322121.addEventListener('click', async (e: Event) =>{
								//Observer
							});
							let radio322122 = document.getElementById('radio322122') as HTMLInputElement;
							radio322122.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								let divCont6 = document.createElement('div');
								BehavioralPatterns.functions.radioQuestion('<br>Handle diverse states through inheritance? <br>', 'Yes', 'No', 'radio3221221', 'radio3221222', divCont5);
								let radio3221221 = document.getElementById('radio3221221') as HTMLInputElement;
								radio3221221.addEventListener('click', async (e: Event) =>{
									//State
								});
								let radio3221222 = document.getElementById('radio3221222') as HTMLInputElement;
								radio3221222.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									BehavioralPatterns.functions.createLabel('<br> There is no pattern <br>', '', divCont6);
								});
								divCont5.appendChild(divCont6);

							});
							divCont4.appendChild(divCont5);
						});

						divCont3.appendChild(divCont4);
					});
					let radio3222 = document.getElementById('radio3222') as HTMLInputElement;
					radio3222.addEventListener('click', async (e: Event) =>{
						divCont3.innerHTML = "";
						BehavioralPatterns.functions.createLabel('<br> There is no pattern <br>', '', divCont3);
					});
					divCont2.appendChild(divCont3);
				});
				divCont1.appendChild(divCont2);
            });

            divCont.appendChild(divCont1);
		}
    } 
