import {patternParticipatingClass} from './patternParticipatingClass';
import {abstractClass} from './abstractClass';
//import {Attribute} from './Attribute';
//import {Method} from './Method';
//import {ConcreteClass} from './ConcreteClass';
//import { NonHierarchyClass } from './NonHierarchyClass';
//import { MidHierarchyClass } from './MidHierarchyClass';
import { ConcreteClass } from './ConcreteClass';
import { NonHierarchyClass } from './NonHierarchyClass';
import { Attribute } from './Attribute';
import { Method } from './Method';




interface Object{
    object :Array<patternParticipatingClass>;
}
export class CodeGenerator {
	
	
	public AbstractFactory(jsonObj: string): Array<patternParticipatingClass>  {
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));
		Object.keys(obj).forEach((key) =>{
			if(key.includes("AbstractFactory")){
				let file1 :patternParticipatingClass = new abstractClass(obj[key].name);
				Object.keys(obj).forEach((key)=>{
					if(key.includes("Product") && !key.includes("AbstractProduct")){
						file1.addMethod(new Method("create"+obj[key],obj[key], true, "public", "",[]));
					}
				})
				this.fillPromise(ppc, file1);
			}else if(key.includes("Family")){
				let file2 :patternParticipatingClass = new NonHierarchyClass(obj[key].name);
				Object.keys(obj).forEach((key)=>{
					if(key.includes("Product") && !key.includes("AbstractProduct")){
						file2.addMethod(new Method("create"+obj[key],obj[key], true, "public", "",[]));
					}
				})
				this.fillPromise(ppc, file2);
			}else if(key.includes("AbstractProduct")){
				let file3 :patternParticipatingClass = new NonHierarchyClass(obj[key].name);
				this.fillPromise(ppc, file3);
			}else{
				let array = key.split('.');
				var num = array[0].replace(/\D/g,'');
				let variable ="";
				Object.keys(obj).forEach((key)=>{
					if(key == "AbstractProduct"+num){
						variable = obj[key].name;
					}
				})
				let file4 :patternParticipatingClass = new ConcreteClass(obj[key].name,variable);
				this.fillPromise(ppc, file4);
			}
		});
		return ppc.object;		
	}
	public Builder(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));
		Object.keys(obj).forEach((key)=>{
			if(key == "Director"){
				let file :patternParticipatingClass = new NonHierarchyClass(obj[key].name);
				file.addAttribute(new Attribute("builder",obj.Builder.name,"private"));
				file.addMethod(new Method(obj[key].name, obj[key].name, true, "public", "",[new Attribute("builder",obj.Builder.name,"private")]));
				this.fillPromise(ppc, file);
			}else if (key == "Builder"){
				let file2 : patternParticipatingClass = new abstractClass(obj[key].name);
				file2.addMethod(new Method("reset","void",true,"public","",[]));
				Object.keys(obj).forEach((key)=>{
					if(key.includes("BuilderMethod")){
						file2.addMethod(new Method(obj[key].name, "void",true, "public","",[]));
					}
				});
				this.fillPromise(ppc, file2);
			}else if(key.includes("ConcreteBuilder")){
				let file3 : patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Builder.name);
				Object.keys(obj).forEach((key)=>{
					if(key.includes("BuilderMethod")){
						file3.addMethod(new Method(obj[key].name, "void",true, "public","",[]));
					}
				});
				this.fillPromise(ppc, file3);
			}else{
				if(key.includes("BuilderMethod")== false){
`					let file4 : patternParticipatingClass = new NonHierarchyClass(obj[key].name);
					this.fillPromise(ppc, file4);`
				}
			}
		});
		return ppc.object;}
	public FactoryMethod(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));
		Object.keys(obj).forEach((key)=>{
			if(key == "Creator"){
				let file1 : patternParticipatingClass = new NonHierarchyClass(obj[key].name);
				file1.addMethod(new Method("create"+obj.Product.name,obj.Product.name,false,"public","",[]));
				this.fillPromise(ppc, file1);
			}else if(key.includes("ConcreteCreator")){
				let file2 : patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Creator.name);
				Object.keys(obj).forEach((innerkey)=>{
					var match = key.match(/\d/g);
					var innermatch = innerkey.match(/\d/g);
					if(innerkey.includes("ConcreteProduct") && match === innermatch){
						console.log("inner")
						file2.addMethod(new Method("create"+obj.Product.name,obj.Product.name,false,"public","\n \t \t return new "+ obj[innerkey].name + innermatch+";",[]));
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
		file1.addMethod(new Method("getInstance",obj.Singleton.name, false, "private", "\t \t if(instance == null) { \n \t\t instance = new "+obj.Singleton.name +"();\n \t \t}\n \t \t return instance;",[]));
		this.fillPromise(ppc, file1);
		return ppc.object;
	}public Prototype(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));
		Object.keys(obj).forEach((key)=>{
			if(key == "Prototype"){
				let file1 :patternParticipatingClass = new abstractClass(obj.Prototype.name);
				file1.addMethod(new Method("clone",obj.Prototype.name, false,"public","",[]))
				this.fillPromise(ppc, file1);
			}else{
				let file2 :patternParticipatingClass = new ConcreteClass(obj[key].name,obj.Prototype.name);
				file2.addMethod(new Method("clone",obj.Prototype.name, false,"public","\n \t \t return new "+obj[key].name + "(this);",[]));
				file2.addMethod(new Method("concrete"+obj[key].name,obj.Prototype.name, false,"public","\n \t \t this.field1 = prototype.field",[new Attribute("prototype",obj.Prototype.name,"public")]));
				this.fillPromise(ppc, file2);
			}
		});
	
		return ppc.object;
	}public Adapter(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}public Bridge(jsonObj: string): Array<patternParticipatingClass>  {		
		let ppc : Object ={object: []}
		let obj = JSON.parse(JSON.stringify(jsonObj));
		Object.keys(obj).forEach((key) =>{
			if(key.includes("RefinedAbstraction")){
				let file1 :patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Abstraction.name);
				this.fillPromise(ppc, file1);
			}else if(key.includes("ConcreteImplementor")){
				let file2 :patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Implementor.name);
				file2.addAttribute(new Attribute("variable", "string", "private"))
				this.fillPromise(ppc, file2);
			}else if(key.includes("Implementor")){
				let file3 :patternParticipatingClass = new abstractClass(obj[key].name);
				this.fillPromise(ppc, file3);
			}else{
				let file4 :patternParticipatingClass = new abstractClass(obj[key].name);
				this.fillPromise(ppc, file4);
			}
		});
		return ppc.object;		
	}
	public Composite(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}	
	public Decorator(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}	
	public Facade(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}	
	public Flyweight(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}	
	public Proxy(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}	
	public ChainofResponsibility(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}	
	public Command(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}
	public Interpreter(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
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
