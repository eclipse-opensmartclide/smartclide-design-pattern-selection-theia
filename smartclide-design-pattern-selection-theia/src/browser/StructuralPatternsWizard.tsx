
import { inject } from 'inversify';
import {Functions} from './functions';
import { MessageService } from '@theia/core';
import { HelloBackendService } from '../common/protocol';



export class StructuralPatterns{
    @inject(MessageService)
    protected readonly messageService!: MessageService;
	@inject(HelloBackendService)
	protected readonly helloBackendService: HelloBackendService;

    static functions = new Functions();
    structuralPatternsWizard(divCont: HTMLDivElement, messageService: MessageService){
			divCont.innerHTML = "";
			let divCont1 = document.createElement('div');
			StructuralPatterns.functions.radioQuestion('<br> Do you need to implement a function that requires information from 2 different hierarchies? <br>', 'Yes', 'No', 'radio21', 'radio22', divCont);

			let radio21 = document.getElementById('radio21') as HTMLInputElement;
			radio21.addEventListener('click', async (e: Event) =>{
				divCont1.innerHTML = "";
				
			});
			let radio22 = document.getElementById('radio22') as HTMLInputElement;
			radio22.addEventListener('click', async (e: Event) =>{
				divCont1.innerHTML = "";
				let divCont2 = document.createElement('div');
				StructuralPatterns.functions.radioQuestion('<br>Is any of  your objects a composite one (i.e. comprised of simple objects), which however needs to be treated uniformly along with simple objects?<br>', 'Yes', 'No', 'radio221', 'radio222', divCont1);
				let radio221 = document.getElementById('radio221') as HTMLInputElement;
				radio221.addEventListener('click', async (e: Event) =>{
					divCont2.innerHTML = "";
					let divCont3 = document.createElement('div');
					StructuralPatterns.functions.textfieldQuestion('<br> What is the name Interface representing both Composite and Simple objects? <br>', 1, 'text', 'Interface name', 'txtboxInterface', 'infoField', 'buttonNext', divCont2);
					let buttonNext = document.getElementById('buttonNext') as HTMLButtonElement;
					buttonNext.addEventListener('click', async (e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						StructuralPatterns.functions.textfieldQuestion('<br> How many common functionalities does the Interface offer? <br>', 1, 'number', '1', 'numOfInterfaceMethods', '', 'buttonNext1', divCont3);
						let buttonNext1 = document.getElementById('buttonNext1') as HTMLButtonElement;
						buttonNext1.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							let divCont5 = document.createElement('div');
							StructuralPatterns.functions.textfieldQuestion('<br> Insert the name of each functionality <br>', parseInt((document.getElementById('numOfInterfaceMethods') as HTMLInputElement).value), 'text', 'Functionality name ', 'txtboxFunctionalities', 'infoField', 'buttonNext2', divCont4);
							let buttonNext2 = document.getElementById('buttonNext2') as HTMLButtonElement;
							buttonNext2.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								let divCont6 = document.createElement('div');
								StructuralPatterns.functions.textfieldQuestion('<br> How many types of Simple objects exist? <br>', 1, 'number', '1', 'numOfSimpleObjectsTypes', '', 'buttonNext3', divCont5);
								let buttonNext3 = document.getElementById('buttonNext3') as HTMLButtonElement;
								buttonNext3.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									let divCont7 = document.createElement('div');
									StructuralPatterns.functions.textfieldQuestion('<br> Insert the names of the Simple objects <br>', parseInt((document.getElementById('numOfSimpleObjectsTypes') as HTMLInputElement).value), 'text', 'Simple Object name ', 'txtboxSimpleObjects', 'infoField', 'buttonNext4', divCont6);
									let buttonNext4 = document.getElementById('buttonNext4') as HTMLButtonElement;
									buttonNext4.addEventListener('click', async (e: Event) =>{
										divCont7.innerHTML = "";
										let divCont8 = document.createElement('div');
										StructuralPatterns.functions.radioQuestion('<br>Are there different layers that extend the behaviour of the Composite object? <br>', 'Yes', 'No', 'radio2211', 'radio2212', divCont7);
										let radio2211 = document.getElementById('radio2211') as HTMLInputElement;
										radio2211.addEventListener('click', async (e: Event) =>{
											divCont8.innerHTML = "";
											let divCont9 = document.createElement('div');
											StructuralPatterns.functions.textfieldQuestion('<br>What is the name of the Decorator class? <br>', 1, 'text', 'Decorator name', 'txtDecorator', 'infoField', 'buttonNext5', divCont8 );
											let buttonNext5 = document.getElementById('buttonNext5') as HTMLButtonElement;
											buttonNext5.addEventListener('click', async (e: Event) =>{
												divCont9.innerHTML = "";
												let divCont10 = document.createElement('div');
												StructuralPatterns.functions.textfieldQuestion('<br>How many concrete Decorators exist? <br>', 1, 'number', '1', 'numOfConcreteDecorators', '', 'buttonNext6', divCont9);		
												let buttonNext6 = document.getElementById('buttonNext6') as HTMLButtonElement;
												buttonNext6.addEventListener('click', async (e: Event) =>{
													divCont10.innerHTML = "";
													let divCont11 = document.createElement('div');
													StructuralPatterns.functions.textfieldQuestion('<br> Insert the names of the Concrete Decorators and their functions <br> ', parseInt((document.getElementById('numOfConcreteDecorators') as HTMLInputElement).value), 'text', 'Concrete Decorator name ', '', 'infoField', '', divCont10 ); 
													StructuralPatterns.functions.textfieldQuestion('', parseInt((document.getElementById('numOfConcreteDecorators') as HTMLInputElement).value), 'text', 'Function of Concrete Decorator ', '', 'infoField', 'buttonNext7', divCont10 ); 
													let buttonNext7 = document.getElementById('buttonNext7') as HTMLButtonElement;
													buttonNext7.addEventListener('click', async (e: Event) =>{
														divCont11.innerHTML = "";
														StructuralPatterns.functions.createLabel('<br> <b>Decorator Pattern</b>  ', '', divCont11);
														StructuralPatterns.functions.createButton('Get Code', 'getcodeDecoratorPattern', divCont11);
														let buttonCodeDP = document.getElementById('getcodeDecoratorPattern') as HTMLButtonElement;
														buttonCodeDP.addEventListener('click', async (e: Event) =>{
															//DECORATOR
														});
													});	
													divCont10.appendChild(divCont11);
												});
												divCont9.appendChild(divCont10);
											});
											divCont8.appendChild(divCont9);
										});
										let radio2212 = document.getElementById('radio2212') as HTMLInputElement;
										radio2212.addEventListener('click', async (e: Event) =>{
											divCont8.innerHTML = "";
											let divCont9 = document.createElement('div');
											StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the Composite class <br>', 1, 'text', 'Composite name', '', 'infoField', 'buttonNext8', divCont8);
											let buttonNext8 = document.getElementById('buttonNext6') as HTMLButtonElement;
											buttonNext8.addEventListener('click', async (e: Event) =>{
												divCont9.innerHTML = "";
												StructuralPatterns.functions.createLabel('<br> <b>Composite Pattern</b>  ', '', divCont9);
												StructuralPatterns.functions.createButton('Get Code', 'getcodeCompositePattern', divCont9);
												let buttonCodeCP = document.getElementById('getcodeCompositePattern') as HTMLButtonElement;
												buttonCodeCP.addEventListener('click', async (e: Event) =>{
													//COMPOSITE
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
						divCont3.appendChild(divCont4);
					});
					divCont2.appendChild(divCont3);
				});
				let radio222 = document.getElementById('radio222') as HTMLInputElement;
				radio222.addEventListener('click', async (e: Event) =>{
					divCont2.innerHTML = "";
					let divCont3 = document.createElement('div');
					StructuralPatterns.functions.radioQuestion('<br>Do you want to communicate  (reuse or hide the complexity) of an exiting artifact (class or subsystem)? <br>', 'Yes', 'No', 'radio2221', 'radio2222', divCont2);
					let radio2221 = document.getElementById('radio2221') as HTMLInputElement;
					radio2221.addEventListener('click', async (e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						StructuralPatterns.functions.radioQuestion('<br>Communicate with one class or subsystem? <br>', 'One', 'Subsystem', 'radio22211', 'radio22212', divCont3);
						let radio22211 = document.getElementById('radio22211') as HTMLInputElement;
						radio22211.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							let divCont5 = document.createElement('div');
							StructuralPatterns.functions.radioQuestion('<br>Do you need an interface in order to reduce memory usage? <br>', 'Yes', 'No', 'radio222111', 'radio222112', divCont4);
							let radio222111 = document.getElementById('radio222111') as HTMLInputElement;
							radio222111.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								let divCont6 = document.createElement('div');
								StructuralPatterns.functions.textfieldQuestion('<br>What is the name of the Flyweight Factory class that creates and manages Flyweight object? <br>', 1, 'text', 'Flyweight Factory name', 'txtboxFlyweightFactory', 'infoField', 'buttonNext9', divCont5);
								let buttonNext9 = document.getElementById('buttonNext9') as HTMLButtonElement;
								buttonNext9.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									let divCont7 = document.createElement('div');	
									StructuralPatterns.functions.textfieldQuestion('<br>What is the name of the Flyweight? <br>', 1, 'text', 'Flyweight name', 'txtboxFlyweight', 'infoField', 'buttonNext10', divCont6);
									let buttonNext10 = document.getElementById('buttonNext10') as HTMLButtonElement;
									buttonNext10.addEventListener('click', async (e: Event) =>{
										divCont7.innerHTML = "";
										let divCont8 = document.createElement('div');	
										StructuralPatterns.functions.textfieldQuestion('<br>How many Concrete Flyweights exist? <br>', 1, 'number', '1', 'numOfConcreteFlyweights', '', 'buttonNext11', divCont7);
										let buttonNext11 = document.getElementById('buttonNext11') as HTMLButtonElement;
										buttonNext11.addEventListener('click', async (e: Event) =>{
											divCont8.innerHTML = "";
											let divCont9 = document.createElement('div');	
											StructuralPatterns.functions.textfieldQuestion('<br>Insert the names of the Concrete Flyweights <br>', parseInt((document.getElementById('numOfConcreteFlyweights') as HTMLInputElement).value), 'text', 'Concrete Flyweight name', 'txtboxConcreteFlyweight', 'infoField', 'buttonNext12', divCont8);
											let buttonNext12 = document.getElementById('buttonNext12') as HTMLButtonElement;
											buttonNext12.addEventListener('click', async (e: Event) =>{
												divCont9.innerHTML = "";
												let divCont10 = document.createElement('div');	
												StructuralPatterns.functions.textfieldQuestion('<br>Insert the type and the name of the attribute (state) of Concrete Flyweight (with a space between) <br>', 1, 'text', "Concrete Flyweight's Attribute name", 'txtboxAttribute', 'infoField', 'buttonNext13', divCont9);
												let buttonNext13 = document.getElementById('buttonNext13') as HTMLButtonElement;
												buttonNext13.addEventListener('click', async (e: Event) =>{
													divCont10.innerHTML = "";
													let divCont11 = document.createElement('div');	
													StructuralPatterns.functions.textfieldQuestion('<br>What is the name of the Client? <br>', 1, 'text', "Client name", 'txtboxClient', 'infoField', 'buttonNext15', divCont10);
													let buttonNext15 = document.getElementById('buttonNext15') as HTMLButtonElement;
													buttonNext15.addEventListener('click', async (e: Event) =>{
														divCont11.innerHTML = "";
														StructuralPatterns.functions.createLabel('<br> <b>Flyweight Pattern</b>  ', '', divCont11);
														StructuralPatterns.functions.createButton('Get Code', 'getcodeFlyweightPattern', divCont11);
														let buttonCodeFP = document.getElementById('getcodeFlyweightPattern') as HTMLButtonElement;
														buttonCodeFP.addEventListener('click', async (e: Event) =>{
															//FLYWEIGHT
														});
													});
													divCont10.appendChild(divCont11);
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
							let radio222112 = document.getElementById('radio222112') as HTMLInputElement;
							radio222112.addEventListener('click', async (e: Event) =>{
								divCont5.innerHTML = "";
								let divCont6 = document.createElement('div');
								StructuralPatterns.functions.radioQuestion('<br>Are you unable to change the interface of the existing class? <br>', 'Yes', 'No', 'radio2221121', 'radio2221122', divCont5);
								let radio2221121 = document.getElementById('radio2221121') as HTMLInputElement;
								radio2221121.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									let divCont7 = document.createElement('div');
									StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the existing class, that needs to be adapted <br>', 1, 'text', 'Existing Class name', 'txtboxService', 'infoField', 'buttonNext16', divCont6);
									let buttonNext16 = document.getElementById('buttonNext16') as HTMLButtonElement;
									buttonNext16.addEventListener('click', async (e: Event) =>{
										divCont7.innerHTML = "";
										let divCont8 = document.createElement('div');
										StructuralPatterns.functions.textfieldQuestion("<br>Insert the name of the existing class' method that client needs to use <br>", 1, 'text', 'Existing Method name', 'txtboxServiceMethod', 'infoField', 'buttonNext17', divCont7);
										let buttonNext17 = document.getElementById('buttonNext17') as HTMLButtonElement;
										buttonNext17.addEventListener('click', async (e: Event) =>{
											divCont8.innerHTML = "";
											let divCont9 = document.createElement('div');
											StructuralPatterns.functions.textfieldQuestion("<br>Insert the name of the Adapter <br>", 1, 'text', 'Adapter name', 'txtboxAdapter', 'infoField', 'buttonNext18', divCont8);
											let buttonNext18 = document.getElementById('buttonNext18') as HTMLButtonElement;
											buttonNext18.addEventListener('click', async (e: Event) =>{
												divCont9.innerHTML = "";
												let divCont10 = document.createElement('div');
												StructuralPatterns.functions.textfieldQuestion("<br>Insert the name of the Adapter method that will wrap the method of the existing class <br>", 1, 'text', "Adapter's Method name", 'txtboxAdapterMethod', 'infoField', 'buttonNext19', divCont9);
												let buttonNext19 = document.getElementById('buttonNext19') as HTMLButtonElement;
												buttonNext19.addEventListener('click', async (e: Event) =>{
													divCont10.innerHTML = "";
													StructuralPatterns.functions.createLabel('<br> <b>Adapter Pattern</b>  ', '', divCont10);
													StructuralPatterns.functions.createButton('Get Code', 'getcodeAdapterPattern', divCont10);
													let buttonCodeAP = document.getElementById('getcodeAdapterPattern') as HTMLButtonElement;
													buttonCodeAP.addEventListener('click', async (e: Event) =>{
														//ADAPTER
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
								let radio2221122 = document.getElementById('radio2221122') as HTMLInputElement;
								radio2221122.addEventListener('click', async (e: Event) =>{
									divCont6.innerHTML = "";
									StructuralPatterns.functions.createLabel('<br>There is no pattern. <br>', '', divCont6);							
								});
								divCont5.appendChild(divCont6);
							});
							divCont4.appendChild(divCont5);
						});
						let radio22212 = document.getElementById('radio22212') as HTMLInputElement;
						radio22212.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							//let divCont5 = document.createElement('div');
							//StructuralPatterns.functions.radioQuestion('<br>Communicate with one class or subsystem? <br>', 'One', 'Subsystem', 'radio22211', 'radio22212', divCont4);
							
						});
						divCont3.appendChild(divCont4);
					});
					let radio2222 = document.getElementById('radio2222') as HTMLInputElement;
					radio2222.addEventListener('click', async (e: Event) =>{
						divCont3.innerHTML = "";
						let divCont4 = document.createElement('div');
						StructuralPatterns.functions.radioQuestion('<br>Do you need access control for the some service class? <br>', 'Yes', 'No', 'radio22221', 'radio22222', divCont3);
						let radio22221 = document.getElementById('radio22221') as HTMLInputElement;
						radio22221.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							//let divCont5 = document.createElement('div');
							//StructuralPatterns.functions.radioQuestion('<br>Do you need access control for the some service class? <br>', 'Yes', 'No', 'radio22221', 'radio22222', divCont2);
						
						});
						let radio22222 = document.getElementById('radio22222') as HTMLInputElement;
						radio22222.addEventListener('click', async (e: Event) =>{
							divCont4.innerHTML = "";
							StructuralPatterns.functions.createLabel('<br>There is no pattern. <br>', '', divCont4);						
						});
						divCont3.appendChild(divCont4);
					});
					divCont2.appendChild(divCont3);
				});
				divCont1.appendChild(divCont2);
			});
			divCont.appendChild(divCont1);
		
    } 
}