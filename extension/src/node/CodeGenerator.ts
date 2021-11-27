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
				this.fillPromise(ppc, file1);
			}else if(key.includes("ConcreteFactory")){
				let file2 :patternParticipatingClass = new NonHierarchyClass(obj[key].name);
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
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;}
	public FactoryMethod(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;}
	public Singleton(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}
	public Adapter(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;
	}
	public Prototype(jsonObj: string): Array<patternParticipatingClass>{
		let ppc : Object ={object: []}
		//let obj = JSON.parse(JSON.stringify(jsonObj));
		return ppc.object;}	
	public Bridge(jsonObj: string): Array<patternParticipatingClass>  {		
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
