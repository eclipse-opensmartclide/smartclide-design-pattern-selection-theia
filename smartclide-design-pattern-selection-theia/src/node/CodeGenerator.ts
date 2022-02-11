import {patternParticipatingClass} from './patternParticipatingClass';
import {abstractClass} from './abstractClass';
import { MidHierarchyClass } from './MidHierarchyClass';
import { ConcreteClass } from './ConcreteClass';
import { NonHierarchyClass } from './NonHierarchyClass';
import { Attribute } from './Attribute';
import { Method } from './Method';


interface Object{
    object :Array<patternParticipatingClass>;
}
export class CodeGenerator {
	//Creational Patterns
	public AbstractFactory(jsonObj: string): Array<patternParticipatingClass>  {
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1 :patternParticipatingClass = new abstractClass(obj.AbstractFactory.name);
		Object.keys(obj).forEach((innerkey)=>{
			if(innerkey.includes("Product") && !innerkey.includes("ConcreteProduct")){
				file1.addMethod(new Method("create"+obj[innerkey].name,obj[innerkey].name, true, "public", "",[]));
			}
		});
		this.fillPromise(ppc, file1);

		Object.keys(obj).forEach((key) =>{
			if(key.includes("Family")){
				let file2 :patternParticipatingClass =  new ConcreteClass(obj[key].name, obj.AbstractFactory.name) ;
				Object.keys(obj).forEach((innerkey)=>{
					if(innerkey.includes("Product") && !innerkey.includes("ConcreteProduct")){
						let first = obj[key].name.split("Factory")[0];
						file2.addMethod(new Method("create"+obj[innerkey].name,obj[innerkey].name, false, "public", "\t \t return new "+first+obj[innerkey].name+"();",[]));
					}
				});
				this.fillPromise(ppc, file2);
			}else if(key.includes("Product") && !key.includes("ConcreteProduct") ){
				let file3 :patternParticipatingClass = new NonHierarchyClass(obj[key].name);
				this.fillPromise(ppc, file3);
			}else if(key.includes("ConcreteProduct")){
				let array = key.split('.');
				var num = array[0].replace(/\D/g,''); // the number before the '.' states the existing class that the class we are creating going to inheritance from it 
				let variable ="";
				Object.keys(obj).forEach((key)=>{
					if(key == "Product"+num){
						variable = obj[key].name;
					}
				})
				let file4 :patternParticipatingClass = new ConcreteClass(obj[key].name,variable);
				this.fillPromise(ppc, file4);
			}else{

			}
		});
		return ppc.object;		
	}
	public Builder(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));
		let file :patternParticipatingClass = new NonHierarchyClass(obj.Director.name);
		file.addAttribute(new Attribute("builder",obj.Builder.name,"private"));
		file.addMethod(new Method(obj.Director.name, obj.Director.name, false, "public", "\t \t this.builder = builder;",[new Attribute("builder",obj.Builder.name,"private")]));
		this.fillPromise(ppc, file);

		let file2 : patternParticipatingClass = new abstractClass(obj.Builder.name);
		file2.addMethod(new Method("reset","void",true,"public","",[]));
		Object.keys(obj).forEach((key)=>{
			if(key.includes("BuilderMethod")){
				file2.addMethod(new Method(obj[key].name, "void",true, "public","",[]));
			}
		});
		this.fillPromise(ppc, file2);

		Object.keys(obj).forEach((key)=>{
			if(key.includes("ConcreteBuilder")){
				let file3 : patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Builder.name);
				let attributeName = "";
				Object.keys(obj).forEach((innerkey)=>{
					var match = key.match(/\d/g);
					var innermatch = innerkey.match(/\d/g);
					if (innerkey.includes("Product") && (innermatch != null && match !=null && innermatch.join()=== match.join())){
						file3.addAttribute(new Attribute(obj[innerkey].name.toLowerCase(),obj[innerkey].name,"private"));
						attributeName = obj[innerkey].name;
					}else if(innerkey.includes("BuilderMethod")){
						file3.addMethod(new Method(obj[innerkey].name, "void",false, "public","",[]));
					}else{

					}
				});
				file3.addMethod(new Method("reset","void",false,"public","\t \t this."+attributeName.toLowerCase()+" = new "+attributeName+"();",[]));
				this.fillPromise(ppc, file3);
			}else{
				if(!key.includes("BuilderMethod") && !key.includes("Director") && !key.includes("Builder")){
					let file4 : patternParticipatingClass = new NonHierarchyClass(obj[key].name);
					this.fillPromise(ppc, file4);
				}					
				
			}
		});
		return ppc.object;
	}
	//method that creates the files for the factory method design pattern
	public FactoryMethod(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));
		Object.keys(obj).forEach((key)=>{
			if(key == "Creator"){
				let file1 : patternParticipatingClass = new NonHierarchyClass(obj[key].name);
				file1.addMethod(new Method("create"+obj.Product.name,obj.Product.name,true,"public","",[]));
				this.fillPromise(ppc, file1);
			}else if(key.includes("ConcreteCreator")){
				let file2 : patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Creator.name);
				Object.keys(obj).forEach((innerkey)=>{
					var match = key.match(/\d/g);
					var innermatch = innerkey.match(/\d/g);
					//in order to create the method we have to get the name of the "ConcreteProduct" that is going to be returned in the method
					if(innerkey.includes("ConcreteProduct") && (innermatch != null && match !=null && innermatch.join()=== match.join())){
							file2.addMethod(new Method("create"+obj.Product.name, obj.Product.name, false, "public", "\t \t return new "+ obj[innerkey].name + ";",[]));
					}
				});
				this.fillPromise(ppc, file2);
			}else if(key == "Product"){
				let file3 : patternParticipatingClass = new abstractClass(obj[key].name);
				this.fillPromise(ppc, file3);
			}else{
				let file4 : patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Product.name);
				this.fillPromise(ppc, file4);
			}
		});
		return ppc.object;
	}
	public Singleton(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1 :patternParticipatingClass = new NonHierarchyClass(obj.Singleton.name);
		file1.addAttribute(new Attribute("instance",obj.Singleton.name,"private"));
		file1.addMethod(new Method(obj.Singleton.name,"", false, "private", "\t \t instance  =  new "+obj.Singleton.name + "();",[]));
		file1.addMethod(new Method("getInstance",obj.Singleton.name, false, "private", "\t \t if(instance == null) { \n \t \t instance = new "+obj.Singleton.name +"();\n \t \t}\n \t \t return instance;",[]));
		this.fillPromise(ppc, file1);
		
		return ppc.object;
	}
	public Prototype(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1 :patternParticipatingClass = new abstractClass(obj.Prototype.name);
		file1.addMethod(new Method("clone",obj.Prototype.name, true,"public","",[]))
		this.fillPromise(ppc, file1);

		Object.keys(obj).forEach((key)=>{
			if(key.includes("ConcretePrototype")){
				let file2 :patternParticipatingClass = new ConcreteClass(obj[key].name,obj.Prototype.name);
				file2.addMethod(new Method("clone",obj.Prototype.name, false,"public","\t \t return new "+obj[key].name + "(this);",[]));
				this.fillPromise(ppc, file2);
			}
		});
	
		return ppc.object;
	}
	//Structural Patterns
	public Adapter(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1 :patternParticipatingClass = new abstractClass(obj.ClientInterface.name);
		file1.addMethod(new Method(obj.AdapterMethod.name,"void",true,"public","",[]));
		this.fillPromise(ppc, file1);

		let file2 :patternParticipatingClass = new ConcreteClass(obj.Adapter.name, obj.ClientInterface.name);
		file2.addAttribute(new Attribute(obj.Adaptee.name.toLowerCase(),obj.Adaptee.name,"private"));
		file2.addMethod(new Method(obj.AdapterMethod.name,"void",false,"public","",[]));
		this.fillPromise(ppc, file2);

		let file3 : patternParticipatingClass = new NonHierarchyClass(obj.Adaptee.name);
		this.fillPromise(ppc, file3)
		return ppc.object;
	}
	public Bridge(jsonObj: string): Array<patternParticipatingClass>  {		
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1 :patternParticipatingClass = new NonHierarchyClass(obj.Abstraction.name);
		file1.addAttribute(new Attribute(obj.Implementation.name.toLowerCase(), obj.Implementation.name, "private"));
		file1.addMethod(new Method(obj.AbstractionMethod.name, "void", false, "public", "", []));
		this.fillPromise(ppc, file1);

		let file2 :patternParticipatingClass = new abstractClass(obj.Implementation.name);
		file2.addMethod(new Method(obj.ImplementationMethod.name, "void", true, "public", "", []));
		this.fillPromise(ppc, file2);
		Object.keys(obj).forEach((key) =>{
			if(key.includes("RefinedAbstraction")){
				let file3 :patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Abstraction.name);
				file3.addMethod(new Method(obj.AbstractionMethod.name, "void", false, "public", "", []));
				this.fillPromise(ppc, file3);
			}else if(key.includes("ConcreteImplementation")){
				let file4 :patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Implementation.name);
				file4.addMethod(new Method(obj.ImplementationMethod.name, "void", false, "public", "",[]));
				this.fillPromise(ppc, file4);
			}else{

			}
		});
		return ppc.object;		
	}
	public Composite(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));
		Object.keys(obj).forEach((key)=>{
			if(key=="Component"){
				let file1 :patternParticipatingClass = new abstractClass(obj[key].name);
				file1.addMethod(new Method(obj.ComponentMethod.name,"void",true, "public", "",[]));
				this.fillPromise(ppc, file1);
			}else if(key.includes("ConcreteComponent")){
				let file2 :patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Component.name);
				file2.addMethod(new Method(obj.ComponentMethod.name,"void",false, "public", "",[]));
				this.fillPromise(ppc, file2);
			}else if(key == ("Composite")){
				let file3 :patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Component.name);
				file3.addAttribute(new Attribute("children", "ArrayList<"+obj.Component.name+">", "private"));
				//constructor
				file3.addMethod(new Method(obj.Composite.name,"",false,"public","\t \t children = new ArrayList<"+obj.Component.name +">();",[]));
				file3.addMethod(new Method(obj.ComponentMethod.name,"void",false, "public", "",[]));
				file3.addMethod(new Method("add","void",false,"public","",[new Attribute("c",obj.Composite.name,"")]));
				file3.addMethod(new Method("remove","void",false,"public","",[new Attribute("c",obj.Composite.name,"")]));
				file3.addMethod(new Method("getChildern","ArrayList<"+obj.Component.name+">",false,"public","",[]));
				this.fillPromise(ppc, file3);
			}
		});
		return ppc.object;
	}	
	public Decorator(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1 :patternParticipatingClass = new abstractClass(obj.Component.name);
		file1.addMethod(new Method(obj.ComponentMethod.name,"void",true, "public", "",[]));
		this.fillPromise(ppc, file1);

		let file2 :patternParticipatingClass = new MidHierarchyClass(obj.Decorator, obj.Component.name);
		file2.addMethod(new Method(obj.Decorator.name,"",false, "public", "\t \t this."+obj.Component.name.toLowerCase()+" = "+obj.Component.name.toLowerCase()+";",[new Attribute(obj.Component.name.toLowerCase(), obj.Component.name, "")]));
		file2.addMethod(new Method(obj.ComponentMethod.name,"void",false, "public", "\t \t this."+obj.Component.name.toLowerCase()+"."+obj.ComponentMethod.name+"();",[]));
		this.fillPromise(ppc, file2);

		Object.keys(obj).forEach((key)=>{
			if(key.includes("ConcreteComponent")){
				let file3 :patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Component.name);
				file3.addMethod(new Method(obj.ComponentMethod.name,"void",false, "public", "",[]));
				this.fillPromise(ppc, file3);
			}else if(key.includes("ConcreteDecorator")){
				let file4 :patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Decorator.name);
				file4.addMethod(new Method(obj.ComponentMethod.name,"void",false, "public", "\t \t super(); \n \t \t "+obj.ConcreteDecorator1Method.name+"();",[]));
				file4.addMethod(new Method(obj.ConcreteDecorator1Method.name, "void", false, "public","",[]));
				this.fillPromise(ppc, file4);
			}else {

			}
		})
		return ppc.object;
	}	
	public Facade(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));
		let file1 :patternParticipatingClass = new NonHierarchyClass(obj.Facade.name);
		
		Object.keys(obj).forEach((key)=>{
			if(key.includes("AdditionalFacade")){
				let file2 :patternParticipatingClass = new NonHierarchyClass(obj[key].name);
				file1.addAttribute(new Attribute(obj[key].name.toLowerCase(),obj[key].name,"private"));
				this.fillPromise(ppc, file2);
			}
		});
		this.fillPromise(ppc, file1);
		return ppc.object;
	}	
	public Flyweight(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1 :patternParticipatingClass = new NonHierarchyClass(obj.Flyweight.name);
		file1.addAttribute(new Attribute("cache","ArrayList<"+obj.Flyweight.name+">", "private")); //list of Flyweights
		file1.addMethod(new Method(obj.Flyweight.name,'',false,"public","\t \t this.cache = new ArrayList<"+obj.Flyweight.name+">",[])); //constructor of FlyweightFactory class
		file1.addMethod(new Method("getFlyweight",obj.Flyweight.name,false,"public","",[new Attribute("key","string","")])); //δεν έχω συμπληρώσει το body της μεθόδου
		this.fillPromise(ppc, file1);

		let file2 :patternParticipatingClass = new NonHierarchyClass(obj.Flyweight.name);
		file2.addAttribute(new Attribute(obj.ConcreteFlyweight1Attribute.name,"string", "private")); 
		this.fillPromise(ppc, file2);

		Object.keys(obj).forEach((key)=>{
			if(key.includes("ConcreteFlyweight") && !key.includes("ConcreteFlyweight1Attribute")){
				let file3 : patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Flyweight.name);
				this.fillPromise(ppc, file3);
			}
		});
		let file4 :patternParticipatingClass = new NonHierarchyClass(obj.Client.name); 
		this.fillPromise(ppc, file4);

		return ppc.object;
	}	
	public Proxy(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1 :patternParticipatingClass = new abstractClass(obj.ServiceInterface.name);
		file1.addMethod(new Method(obj.ServiceInterfaceMethod.name,"void",true,"public","",[]));
		this.fillPromise(ppc, file1);

		let file2 :patternParticipatingClass = new ConcreteClass(obj.Service.name ,obj.ServiceInterface.name);
		file2.addMethod(new Method(obj.ServiceInterfaceMethod.name,"void",false,"public","",[]));
		this.fillPromise(ppc, file2);
		
		let file3 :patternParticipatingClass = new ConcreteClass(obj.Proxy.name ,obj.ServiceInterface.name);
		file3.addAttribute(new Attribute(obj.Service.name.toLowerCase(), obj.Service.name, "private"))
		file3.addMethod(new Method(obj.Proxy.name,"",false,"public","\t \t this."+obj.Service.name.toLowerCase()+"=" + obj.Service.name.toLowerCase()+";",[new Attribute(obj.Service.name.toLowerCase(), obj.Service.name, "")]));
		file3.addMethod(new Method("checkAccess","",false,"public","\t \t this."+obj.Service.name.toLowerCase()+"=" + obj.Service.name.toLowerCase()+";",[new Attribute(obj.Service.name.toLowerCase(), obj.Service.name, "")]));
		file3.addMethod(new Method(obj.ServiceInterfaceMethod.name,"void",false,"public","\t \t if(this.checkAccess){\n \t \t \t \t this."+obj.Service.name.toLowerCase()+"."+obj.ServiceInterfaceMethod.name+"();\n \t \t} ",[]));
		this.fillPromise(ppc, file3);

		return ppc.object;
	}	

	//Behavioral Patterns
	public ChainofResponsibility(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1 :patternParticipatingClass = new abstractClass(obj.Handler.name);
		file1.addMethod(new Method("setNext","void",true,"public","",[new Attribute((obj.Handler.name).charAt() ,obj.Handler.name,"")]));
		file1.addMethod(new Method("handle","void",true,"public","",[new Attribute("request","","")]));
		this.fillPromise(ppc, file1);

		Object.keys(obj).forEach((key)=>{
			if(key.includes("ConcreteHandler")){
				let file2 : patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Handler.name);
				this.fillPromise(ppc, file2);
			}
		});
		return ppc.object;
	}	
	public Command(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1 :patternParticipatingClass = new NonHierarchyClass(obj.Receiver.name);
		this.fillPromise(ppc, file1);

		let file2 :patternParticipatingClass = new NonHierarchyClass(obj.Invoker.name);
		this.fillPromise(ppc, file2);

		let file3 :patternParticipatingClass = new abstractClass(obj.Command.name);
		//file3.addMethod(new Method(obj.ConcreteCommand1Method.name,))
		this.fillPromise(ppc, file3);

		Object.keys(obj).forEach((key)=>{
			if(key.includes("ConcreteCommand") && !key.includes("ConcreteCommand1Method") && !key.includes("ConcreteCommand1MethodParameter1")){
				let file4 : patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Command.name);
				file4.addAttribute(new Attribute((obj.Receiver.name).toLowerCase, obj.Receiver.name, ""));

				var aList: Array<Attribute> = [];
				aList.push(new Attribute((obj.Receiver.name).toLowerCase(),obj.Receiver.name,""));	
				Object.keys(obj).forEach((innerkey)=>{
					if(innerkey.includes("ConcreteCommand1MethodParameter")){
						file4.addAttribute(new Attribute(obj[key].name, "string", ""));
						aList.push(new Attribute(obj[key].name, "string", ""));
					}
				});
				file4.addMethod(new Method(obj[key].name,"",false,"private","\t \t this."+(obj.Receiver.name).toLowerCase+" = "+(obj.Receiver.name).toLowerCase +"; \n \t \t",aList));
				//concreteCommandMethod?

				this.fillPromise(ppc, file4);

			}
		});

		return ppc.object;
	}
	public Interpreter(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1 :patternParticipatingClass =  new abstractClass(obj.Mediator.name);
		this.fillPromise(ppc, file1);
		
		Object.keys(obj).forEach((key)=>{
			if(key.includes("ConcreteMediator")){
				let file2 : patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Mediator.name);
				this.fillPromise(ppc, file2);
			}else if(key.includes("Component")){
				let file3 : patternParticipatingClass = new NonHierarchyClass(obj[key].name);
				this.fillPromise(ppc, file3);
			}else{

			}
		});
		return ppc.object;
	}	
	public Mediator(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}	
	public Memento(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}		
	public Observer(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}	
	public State(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}	
	public Strategy(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}	
	public TemplateMethod(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}	
	public Visitor(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}	
	fillPromise(labelObj: Object, item: patternParticipatingClass){
        labelObj.object.push(item);
        
    }
}
