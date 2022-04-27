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
								BehavioralPatterns.functions.textfieldQuestion("<br> Insert the names of the Concrete Mediators <br>", parseInt((document.getElementById('numOfConcreteMediators') as HTMLInputElement).value), 'text', "Concrete Mediator's name ", 'txtboxConcreteImplementation', 'infoField', 'buttonNext2', divCont5);
								let buttonNext2 = document.getElementById('buttonNext2') as HTMLButtonElement;
								buttonNext2.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									let divCont7 = document.createElement('div');
									BehavioralPatterns.functions.textfieldQuestion('<br>How many Components(classes that need to be connected) exist? <br>',  1, 'number', '1', 'numOfConmponents', '', 'buttonNext3', divCont6);;
									let buttonNext3 = document.getElementById('buttonNext3') as HTMLButtonElement;
									buttonNext3.addEventListener('click', async (e: Event) =>{
										divCont7.innerHTML = "";
										let divCont8 = document.createElement('div');
										BehavioralPatterns.functions.textfieldQuestion("<br> Insert the names of the Components <br>", parseInt((document.getElementById('numOfConmponents') as HTMLInputElement).value), 'text', "Concrete Component's name ", 'txtboxConcreteImplementation', 'infoField', 'buttonNext4', divCont7);
										let buttonNext4 = document.getElementById('buttonNext4') as HTMLButtonElement;
										buttonNext4.addEventListener('click', async (e: Event) =>{
											divCont8.innerHTML = "";
											BehavioralPatterns.functions.createLabel('<br> <b>Mediator Pattern</b>  ', '', divCont8);
											BehavioralPatterns.functions.createButton('Get Code', 'getcodeMediatorPattern', divCont8);
											let buttonCodeMP = document.getElementById('getcodeMediatorPattern') as HTMLButtonElement;
											buttonCodeMP.addEventListener('click', async (e: Event) =>{
												//Mediator ?? Θελει σιγουρα δυο Components?????
												let infoList = document.getElementsByClassName('infoField') as HTMLCollection;	
												let textfieldArray: Array<Textfield> = []; //array with textfield-values for input check
												BehavioralPatterns.values["Mediator"].values["Mediator"].name = (infoList.item(0) as HTMLInputElement).value;
												let textfield:  Textfield={ ident: 1, value: (infoList.item(0) as HTMLInputElement).value };
												textfieldArray.push(textfield);
												console.log(JSON.stringify(BehavioralPatterns.values["Mediator"]));
												let numConMed = parseInt((document.getElementById('numOfConcreteMediators') as HTMLInputElement).value);
												for (var j=1; j<=numConMed; j++){
													BehavioralPatterns.values["Mediator"].values["ConcreteMediator"+j] = { "name":"", "extension":1};
													let v1 = (infoList.item(j) as HTMLInputElement).value;
													BehavioralPatterns.values["Mediator"].values["ConcreteMediator"+j].name = v1;
													let textfield:  Textfield={ ident: 1, value: v1 };
													textfieldArray.push(textfield);
												}
												let numComp = parseInt((document.getElementById('numOfConmponents') as HTMLInputElement).value);
												console.log(numComp)
												for (var j=1; j<=numComp; j++){
													BehavioralPatterns.values["Mediator"].values["Component"+j] = { "name":"", "extension":1};
													let v2 = (infoList.item(j) as HTMLInputElement).value;
													BehavioralPatterns.values["Mediator"].values["Component"+j].name = v2;
													let textfield:  Textfield={ ident: 1, value: v2 };
													textfieldArray.push(textfield);
												}
												console.log(JSON.stringify(BehavioralPatterns.values["Mediator"]));
												let message = BehavioralPatterns.functions.checkInputs(textfieldArray);
												if (message == "Input is valid"){
													BehavioralPatterns.functions.checkMessage(await helloBackendService.codeGeneration(window.location.href, BehavioralPatterns.values["Mediator"].values, "Mediator"), messageService);
												}else{
													messageService.info(message);
												}
											});
											
										});
										divCont7.append(divCont8);
									});
									divCont6.append(divCont7);
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
                });
				divCont1.appendChild(divCont2);
            });
			
            let radio32 = document.getElementById('radio32') as HTMLInputElement;
            radio32.addEventListener('click', async (e: Event) =>{	

            });

            divCont.appendChild(divCont1);
		}
    } 
