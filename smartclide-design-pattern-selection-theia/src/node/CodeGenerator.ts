import { patternParticipatingClass } from './patternParticipatingClass';
import { abstractClass } from './abstractClass';
import { MidHierarchyClass } from './MidHierarchyClass';
import { ConcreteClass } from './ConcreteClass';
import { NonHierarchyClass } from './NonHierarchyClass';
import { Attribute } from './Attribute';
import { Method } from './Method';

interface Object {
	object: Array<patternParticipatingClass>;
}
export class CodeGenerator {
	//Creational Patterns
	public AbstractFactory(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1: patternParticipatingClass = new abstractClass(obj.AbstractFactory.name);
		Object.keys(obj).forEach((innerkey) => {
			if (innerkey.includes("Product") && !innerkey.includes("ConcreteProduct")) {
				file1.addMethod(new Method("create" + obj[innerkey].name, obj[innerkey].name, true, "public", "", []));
			}
		});
		this.fillPromise(ppc, file1);

		Object.keys(obj).forEach((key) => {
			if (key.includes("Family")) {
				let file2: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.AbstractFactory.name);
				Object.keys(obj).forEach((innerkey) => {
					if (innerkey.includes("Product") && !innerkey.includes("ConcreteProduct")) {
						let first = obj[key].name.split("Factory")[0];
						file2.addMethod(new Method("create" + obj[innerkey].name, obj[innerkey].name, false, "public", "\t \t return new " + first + obj[innerkey].name + "();", []));
					}
				});
				this.fillPromise(ppc, file2);
			} else if (key.includes("Product") && !key.includes("ConcreteProduct")) {
				let file3: patternParticipatingClass = new NonHierarchyClass(obj[key].name);
				this.fillPromise(ppc, file3);
			} else if (key.includes("ConcreteProduct")) {
				let array = key.split('.');
				var num = array[0].replace(/\D/g, ''); // the number before the '.' states the existing class that the class we are creating going to inheritance from it 
				let variable = "";
				Object.keys(obj).forEach((key) => {
					if (key == "Product" + num) {
						variable = obj[key].name;
					}
				})
				let file4: patternParticipatingClass = new ConcreteClass(obj[key].name, variable);
				this.fillPromise(ppc, file4);
			} else {

			}
		});
		return ppc.object;
	}
	public Builder(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));
		let file: patternParticipatingClass = new NonHierarchyClass(obj.Director.name);
		file.addAttribute(new Attribute("builder", obj.Builder.name, "private"));
		file.addMethod(new Method(obj.Director.name, obj.Director.name, false, "public", "\t \t this.builder = builder;", [new Attribute("builder", obj.Builder.name, "private")]));
		this.fillPromise(ppc, file);

		let file2: patternParticipatingClass = new abstractClass(obj.Builder.name);
		file2.addMethod(new Method("reset", "void", true, "public", "", []));
		Object.keys(obj).forEach((key) => {
			if (key.includes("BuilderMethod")) {
				file2.addMethod(new Method(obj[key].name, "void", true, "public", "", []));
			}
		});
		this.fillPromise(ppc, file2);

		Object.keys(obj).forEach((key) => {
			if (key.includes("ConcreteBuilder")) {
				let file3: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Builder.name);
				let attributeName = "";
				Object.keys(obj).forEach((innerkey) => {
					var match = key.match(/\d/g);
					var innermatch = innerkey.match(/\d/g);
					if (innerkey.includes("Product") && (innermatch != null && match != null && innermatch.join() === match.join())) {
						file3.addAttribute(new Attribute(obj[innerkey].name.toLowerCase(), obj[innerkey].name, "private"));
						attributeName = obj[innerkey].name;
					} else if (innerkey.includes("BuilderMethod")) {
						file3.addMethod(new Method(obj[innerkey].name, "void", false, "public", "", []));
					} else {

					}
				});
				file3.addMethod(new Method("reset", "void", false, "public", "\t \t this." + attributeName.toLowerCase() + " = new " + attributeName + "();", []));
				this.fillPromise(ppc, file3);
			} else {
				if (!key.includes("BuilderMethod") && !key.includes("Director") && !key.includes("Builder")) {
					let file4: patternParticipatingClass = new NonHierarchyClass(obj[key].name);
					this.fillPromise(ppc, file4);
				}

			}
		});
		return ppc.object;
	}
	//method that creates the files for the factory method design pattern
	public FactoryMethod(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));
		Object.keys(obj).forEach((key) => {
			if (key == "Creator") {
				let file1: patternParticipatingClass = new NonHierarchyClass(obj[key].name);
				file1.addMethod(new Method("create" + obj.Product.name, obj.Product.name, true, "public", "", []));
				this.fillPromise(ppc, file1);
			} else if (key.includes("ConcreteCreator")) {
				let file2: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Creator.name);
				Object.keys(obj).forEach((innerkey) => {
					var match = key.match(/\d/g);
					var innermatch = innerkey.match(/\d/g);
					//in order to create the method we have to get the name of the "ConcreteProduct" that is going to be returned in the method
					if (innerkey.includes("ConcreteProduct") && (innermatch != null && match != null && innermatch.join() === match.join())) {
						file2.addMethod(new Method("create" + obj.Product.name, obj.Product.name, false, "public", "\t \t return new " + obj[innerkey].name + ";", []));
					}
				});
				this.fillPromise(ppc, file2);
			} else if (key == "Product") {
				let file3: patternParticipatingClass = new abstractClass(obj[key].name);
				this.fillPromise(ppc, file3);
			} else {
				let file4: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Product.name);
				this.fillPromise(ppc, file4);
			}
		});
		return ppc.object;
	}
	public Singleton(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1: patternParticipatingClass = new NonHierarchyClass(obj.Singleton.name);
		file1.addAttribute(new Attribute("instance", obj.Singleton.name, "private"));
		file1.addMethod(new Method(obj.Singleton.name, "", false, "private", "\t\t instance  =  new " + obj.Singleton.name + "();", []));
		file1.addMethod(new Method("getInstance", obj.Singleton.name, false, "private", "\t \t if(instance == null) { \n \t \t instance = new " + obj.Singleton.name + "();\n \t \t}\n \t \t return instance;", []));
		this.fillPromise(ppc, file1);

		return ppc.object;
	}
	public Prototype(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1: patternParticipatingClass = new abstractClass(obj.Prototype.name);
		file1.addMethod(new Method("clone", obj.Prototype.name, true, "public", "", []))
		this.fillPromise(ppc, file1);

		Object.keys(obj).forEach((key) => {
			if (key.includes("ConcretePrototype")) {
				let file2: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Prototype.name);
				file2.addMethod(new Method("clone", obj.Prototype.name, false, "public", "\t \t return new " + obj[key].name + "(this);", []));
				this.fillPromise(ppc, file2);
			}
		});

		return ppc.object;
	}
	//Structural Patterns
	public Adapter(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1: patternParticipatingClass = new abstractClass(obj.ClientInterface.name);
		file1.addMethod(new Method(obj.AdapterMethod.name, "void", true, "public", "", []));
		this.fillPromise(ppc, file1);

		let file2: patternParticipatingClass = new ConcreteClass(obj.Adapter.name, obj.ClientInterface.name);
		file2.addAttribute(new Attribute(obj.Adaptee.name.toLowerCase(), obj.Adaptee.name, "private"));
		file2.addMethod(new Method(obj.AdapterMethod.name, "void", false, "public", "", []));
		this.fillPromise(ppc, file2);

		let file3: patternParticipatingClass = new NonHierarchyClass(obj.Adaptee.name);
		this.fillPromise(ppc, file3)
		return ppc.object;
	}
	public Bridge(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1: patternParticipatingClass = new NonHierarchyClass(obj.Abstraction.name);
		file1.addAttribute(new Attribute(obj.Implementation.name.toLowerCase(), obj.Implementation.name, "private"));
		file1.addMethod(new Method(obj.AbstractionMethod.name, "void", false, "public", "", []));
		this.fillPromise(ppc, file1);

		let file2: patternParticipatingClass = new abstractClass(obj.Implementation.name);
		file2.addMethod(new Method(obj.ImplementationMethod.name, "void", true, "public", "", []));
		this.fillPromise(ppc, file2);
		Object.keys(obj).forEach((key) => {
			if (key.includes("RefinedAbstraction")) {
				let file3: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Abstraction.name);
				file3.addMethod(new Method(obj.AbstractionMethod.name, "void", false, "public", "", []));
				this.fillPromise(ppc, file3);
			} else if (key.includes("ConcreteImplementation")) {
				let file4: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Implementation.name);
				file4.addMethod(new Method(obj.ImplementationMethod.name, "void", false, "public", "", []));
				this.fillPromise(ppc, file4);
			} else {

			}
		});
		return ppc.object;
	}
	public Composite(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));
		let file1: patternParticipatingClass = new abstractClass(obj.Component.name);

		let file3: patternParticipatingClass = new ConcreteClass(obj.Composite.name, obj.Component.name);
		file3.sethasArrayList();
		file3.addAttribute(new Attribute("children", "ArrayList<" + obj.Component.name + ">", "private"));
		//constructor
		file3.addMethod(new Method(obj.Composite.name, "", false, "public", "\t\t children = new ArrayList<" + obj.Component.name + ">();", []));
		file3.addMethod(new Method("add", "void", false, "public", "", [new Attribute("c", obj.Composite.name, "")]));
		file3.addMethod(new Method("remove", "void", false, "public", "", [new Attribute("c", obj.Composite.name, "")]));
		file3.addMethod(new Method("getChildern", "ArrayList<" + obj.Component.name + ">", false, "public", "\t\t return (children); ", []));

		var cList: Array<patternParticipatingClass> = [];//list of Concrete Component classes
		var mList: Array<Method> = [];//list of Composite's methods
		Object.keys(obj).forEach((key) => {
			if (key.includes("ConcreteComponent")) {
				let file2: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Component.name);
				cList.push(file2);
			} else if (key.includes("ComponentMethod")) {
				file1.addMethod(new Method(obj[key].name, "void", true, "public", "", []));
				file3.addMethod(new Method(obj[key].name, "void", false, "public", "", []));
				mList.push(new Method(obj[key].name, "void", false, "public", "", []));
			}
		});
		for (var i = 0; i < cList.length; i++) {
			for (var j = 0; j < mList.length; j++) {
				cList[i].addMethod(mList[j]);
			}
			this.fillPromise(ppc, cList[i]);
		}
		this.fillPromise(ppc, file1);
		this.fillPromise(ppc, file3);
		return ppc.object;
	}
	public Decorator(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1: patternParticipatingClass = new abstractClass(obj.Component.name);
		file1.addMethod(new Method(obj.ComponentMethod1.name, "void", true, "public", "", []));


		let file2: patternParticipatingClass = new MidHierarchyClass(obj.Decorator, obj.Component.name);
		file2.addMethod(new Method(obj.Decorator.name, "", false, "public", "\t \t this." + obj.Component.name.toLowerCase() + " = " + obj.Component.name.toLowerCase() + ";", [new Attribute(obj.Component.name.toLowerCase(), obj.Component.name, "")]));
		var cList: Array<patternParticipatingClass> = [];//list of Concrete Component classes
		var mList: Array<Method> = [];//list of Component's methods
		Object.keys(obj).forEach((key) => {
			if (key.includes("ConcreteComponent")) {
				let file3: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Component.name);
				cList.push(file3);
			} else if (key.includes("ConcreteDecorator")) {
				let file4: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Decorator.name);
				file4.addMethod(new Method(obj.ConcreteDecorator1Method.name, "void", false, "public", "", []));
				cList.push(file4);
			} else if (key.includes("ComponentMethod")) {
				file2.addMethod(new Method(obj[key].name, "void", false, "public", "", []));
				file1.addMethod(new Method(obj[key].name, "void", false, "public", "", []));
				mList.push(new Method(obj[key].name, "void", false, "public", "", []))
			}
		})
		this.fillPromise(ppc, file1);;
		for (var i = 0; i < cList.length; i++) {
			for (var j = 0; j < mList.length; j++) {
				cList[i].addMethod(mList[j]);
			}
			this.fillPromise(ppc, cList[i]);
		}
		this.fillPromise(ppc, file2);
		return ppc.object;
	}
	public Facade(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));
		let file1: patternParticipatingClass = new NonHierarchyClass(obj.Facade.name);

		Object.keys(obj).forEach((key) => {
			if (key.includes("FacadeMethod")) {
				file1.addMethod(new Method(obj[key].name.toLowerCase(), "void", false, "public", "", []));
			}
		});
		this.fillPromise(ppc, file1);
		return ppc.object;
	}
	public Flyweight(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1: patternParticipatingClass = new NonHierarchyClass(obj.FlyweightFactory.name);
		file1.sethasArrayList();
		file1.addAttribute(new Attribute("cache", "ArrayList<" + obj.Flyweight.name + ">", "private")); //list of Flyweights
		file1.addMethod(new Method(obj.Flyweight.name, '', false, "public", "\t \t this.cache = new ArrayList<" + obj.Flyweight.name + ">", [])); //constructor of FlyweightFactory class
		file1.addMethod(new Method("getFlyweight", obj.Flyweight.name, false, "public", "", [new Attribute("key", "string", "")])); //δεν έχω συμπληρώσει το body της μεθόδου
		this.fillPromise(ppc, file1);

		let file2: patternParticipatingClass = new NonHierarchyClass(obj.Flyweight.name);
		file2.addAttribute(new Attribute(obj.ConcreteFlyweight1Attribute.name, "", "private"));
		this.fillPromise(ppc, file2);

		Object.keys(obj).forEach((key) => {
			if (key.includes("ConcreteFlyweight") && !key.includes("ConcreteFlyweight1Attribute")) {
				let file3: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Flyweight.name);
				this.fillPromise(ppc, file3);
			}
		});
		let file4: patternParticipatingClass = new NonHierarchyClass(obj.Client.name);
		this.fillPromise(ppc, file4);

		return ppc.object;
	}
	public Proxy(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1: patternParticipatingClass = new abstractClass(obj.ServiceInterface.name);
		file1.addMethod(new Method(obj.ServiceInterfaceMethod.name, "void", true, "public", "", []));
		this.fillPromise(ppc, file1);

		let file2: patternParticipatingClass = new ConcreteClass(obj.Service.name, obj.ServiceInterface.name);
		file2.addMethod(new Method(obj.ServiceInterfaceMethod.name, "void", false, "public", "", []));
		this.fillPromise(ppc, file2);

		let file3: patternParticipatingClass = new ConcreteClass(obj.Proxy.name, obj.ServiceInterface.name);
		file3.addAttribute(new Attribute(obj.Service.name.toLowerCase(), obj.Service.name, "private"))
		file3.addMethod(new Method(obj.Proxy.name, "", false, "public", "\t \t this." + obj.Service.name.toLowerCase() + "=" + obj.Service.name.toLowerCase() + ";", [new Attribute(obj.Service.name.toLowerCase(), obj.Service.name, "")]));
		file3.addMethod(new Method("checkAccess", "void", false, "public", "", [new Attribute(obj.Service.name.toLowerCase(), obj.Service.name, "")]));
		file3.addMethod(new Method(obj.ServiceInterfaceMethod.name, "void", false, "public", "\t \t if(this.checkAccess){\n \t \t \t \t this." + obj.Service.name.toLowerCase() + "." + obj.ServiceInterfaceMethod.name + "();\n \t \t} ", []));
		this.fillPromise(ppc, file3);

		return ppc.object;
	}

	//Behavioral Patterns
	public ChainOfResponsibility(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1: patternParticipatingClass = new abstractClass(obj.Handler.name);
		file1.addMethod(new Method("setNext", "void", true, "public", "", [new Attribute((obj.Handler.name).charAt(), obj.Handler.name, "")]));
		file1.addMethod(new Method("handle", "void", true, "public", "", [new Attribute("request", "", "")]));
		this.fillPromise(ppc, file1);

		Object.keys(obj).forEach((key) => {
			if (key.includes("ConcreteHandler")) {
				let file2: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Handler.name);
				file2.addMethod(new Method("setNext", "void", false, "public", "", [new Attribute((obj.Handler.name).charAt(), obj.Handler.name, "")]));
				file2.addMethod(new Method("handle", "void", false, "public", "", [new Attribute("request", "", "")]));
				this.fillPromise(ppc, file2);
			}
		});
		return ppc.object;
	}
	public Command(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1: patternParticipatingClass = new NonHierarchyClass(obj.Receiver.name);
		this.fillPromise(ppc, file1);

		let file2: patternParticipatingClass = new NonHierarchyClass(obj.Invoker.name);
		file2.addMethod(new Method("setCommand", "void", false, "public", "", [new Attribute(obj.Command.name.charAt(), obj.Command.name, "")]));
		file2.addMethod(new Method("executeCommand", "void", true, "public", "", []));
		this.fillPromise(ppc, file2);

		let file3: patternParticipatingClass = new abstractClass(obj.Command.name);
		//file3.addMethod(new Method(obj.ConcreteCommand1Method.name,))
		this.fillPromise(ppc, file3);

		Object.keys(obj).forEach((key) => {
			if (key.includes("ConcreteCommand") && !key.includes("Method")) {
				let file4: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Command.name);
				file4.addAttribute(new Attribute((obj.Receiver.name).toLowerCase(), obj.Receiver.name, ""));

				var aList: Array<Attribute> = [];
				aList.push(new Attribute((obj.Receiver.name).toLowerCase(), obj.Receiver.name, ""));
				Object.keys(obj).forEach((innerkey) => {
					if (innerkey.includes("MethodParameter")) {
						file4.addAttribute(new Attribute(obj[innerkey].name, "", "private"));
						aList.push(new Attribute(obj[innerkey].name, "", ""));
					} else {
						if (innerkey.includes("Method")) {
							file3.addMethod(new Method(obj[innerkey].name, "void", true, "public", "", []));
							file4.addMethod(new Method(obj[innerkey].name, "void", false, "public", "", []));
						}
					}
				});

				file4.addMethod(new Method(obj[key].name, "", false, "private", "\t \t this." + (obj.Receiver.name).toLowerCase() + " = " + (obj.Receiver.name).toLowerCase() + "; \n \t \t", aList));
				//concreteCommandMethod?

				this.fillPromise(ppc, file4);

			}
		});

		return ppc.object;
	}
	public Mediator(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }

		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1: patternParticipatingClass = new abstractClass(obj.Mediator.name);
		file1.addMethod(new Method("notify", "void", true, "public", "", []))
		this.fillPromise(ppc, file1);
		var cList: Array<patternParticipatingClass> = [];//list of ConcreteMediators
		var mList: Array<string> = [];
		Object.keys(obj).forEach((key) => {
			if (key.includes("ConcreteMediator")) {
				let file2: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Mediator.name);
				file2.addMethod(new Method("notify", "void", false, "public", "", []))
				cList.push(file2);
				this.fillPromise(ppc, file2);
			} else if (key.includes("Component")) {
				let file3: patternParticipatingClass = new NonHierarchyClass(obj[key].name);
				let attribute = obj.Mediator.name.toLowerCase();
				file3.addAttribute(new Attribute(attribute.charAt(0), obj.Mediator.name, "private"))
				mList.push(obj[key].name);
				this.fillPromise(ppc, file3);
			} else {

			}
		});
		for (var i = 0; i < cList.length; i++) {
			for (var j = 0; j < mList.length; j++) {
				cList[i].addAttribute(new Attribute(mList[j], mList[j], "private"));

			}
		}
		return ppc.object;
	}
	public Memento(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1: patternParticipatingClass = new NonHierarchyClass(obj.Originator.name);
		let file2: patternParticipatingClass = new NonHierarchyClass(obj.Memento.name);
		let file3: patternParticipatingClass = new NonHierarchyClass(obj.Caretaker.name);
		file3.sethasArrayList();
		Object.keys(obj).forEach((key) => {
			if (key.includes("OriginatorAttribute")) {
				file1.addAttribute(new Attribute(obj[key].name, "", "private"));
			} else if (key.includes("MementoAttribute")) {
				file2.addAttribute(new Attribute(obj[key].name, "", "private"));
			} else {

			}
		});
		file2.addMethod(new Method(obj.Memento.name, "", false, "private", "", []));//memento constructor
		file2.addMethod(new Method("getState", "string", false, "private", "", []));

		file1.addMethod(new Method("save", obj.Memento.name, false, "public", "", []));
		file1.addMethod(new Method("restore", "void", false, "public", "", [new Attribute(obj.Memento.name.charAt(0), obj.Memento.name, "")]));

		file3.addAttribute(new Attribute(obj.Originator.name.toLowerCase(), obj.Originator.name, "private"));
		file3.addAttribute(new Attribute("history", "ArrayList<" + obj.Memento.name + ">", "private"));
		let attribute = obj.Memento.name.toLowerCase();
		file3.addMethod(new Method("doSomething", "void", false, "public", "\t \t " + obj.Memento.name + "" + attribute.charAt(0) + " =  " + (obj.Originator.name).toLowerCase() + ".save();\n \t \t history.push(m);", []));
		file3.addMethod(new Method("undo", "void", false, "public", "\t \t " + obj.Memento.name + "" + (attribute.charAt(0)) + " =  history.remove();\n \t \t " + (obj.Originator.name).toLowerCase() + ".restore(m);", []));

		this.fillPromise(ppc, file1);
		this.fillPromise(ppc, file2);
		this.fillPromise(ppc, file3);
		return ppc.object;
	}
	public Observer(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));
		let file1: patternParticipatingClass = new NonHierarchyClass(obj.Subject.name);
		file1.sethasArrayList();
		file1.addAttribute(new Attribute(obj.Observer.name.toLowerCase() + 's', "ArrayList<" + obj.Observer.name + ">", "private"));
		file1.addMethod(new Method("attach", "void", false, "public", "\t \t " + obj.Observer.name.toLowerCase() + "s.add(" + obj.Observer.name.toLowerCase().charAt(0) + ");", [new Attribute(obj.Observer.name.toLowerCase().charAt(0), obj.Observer.name, "")]));
		file1.addMethod(new Method("detach", "void", false, "public", "\t \t " + obj.Observer.name.toLowerCase() + "s.remove(" + obj.Observer.name.toLowerCase().charAt(0) + ");", [new Attribute(obj.Observer.name.toLowerCase().charAt(0), obj.Observer.name, "")]));
		file1.addMethod(new Method("notify", "void", false, "public", "\t \t for(int i=0; i<" + obj.Observer.name.toLowerCase() + "s.size(); i++){\n \t \t \t this." + obj.Observer.name.toLowerCase() + "s.get(i).update();", []));

		let file2: patternParticipatingClass = new abstractClass(obj.Observer.name);
		file2.addMethod(new Method("update", "void", true, "public", "", []));
		Object.keys(obj).forEach((key) => {
			if (key.includes("ConcreteSubject")) {
				let file3: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Subject.name);
				file3.addAttribute(new Attribute(obj.Subject.name.toLowerCase() + "State", "string", "private"));
				file3.addMethod(new Method("getState", "string", false, "public", "\t \t return (this." + obj.Subject.name.toLowerCase() + "State);", []));
				file3.addMethod(new Method("setState", "void", false, "public", "\t \t this." + obj.Subject.name.toLowerCase() + "State = state;", [new Attribute("state", "string", "")]));
				this.fillPromise(ppc, file3);
			} else if (key.includes("ConcreteObserver")) {
				let file4: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Observer.name);
				file4.addAttribute(new Attribute(obj.Observer.name.toLowerCase() + "State", "string", "private"));
				this.fillPromise(ppc, file4);
			} else {

			}
		});
		this.fillPromise(ppc, file1);
		this.fillPromise(ppc, file2);
		return ppc.object;
	}
	public State(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));
		let file1: patternParticipatingClass = new NonHierarchyClass(obj.Context.name);
		file1.addAttribute(new Attribute(obj.State.name.toLowerCase(), obj.State.name, "private"));

		file1.addMethod(new Method(obj.Context.name, "", false, "public", "\t \t this." + obj.State.name.toLowerCase() + " = " + obj.State.name.toLowerCase() + ";", [new Attribute(obj.State.name.toLowerCase(), obj.State.name, "")]));
		file1.addMethod(new Method("changeState", "void", false, "public", "\t \t this." + obj.State.name.toLowerCase() + " = " + obj.State.name.toLowerCase() + ";", [new Attribute(obj.State.name.toLowerCase(), obj.State.name, "")]));
		let file2: patternParticipatingClass = new abstractClass(obj.State.name);

		Object.keys(obj).forEach((key) => {
			if (key.includes("ConcreteState")) {
				let file3: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.State.name);
				file3.addAttribute(new Attribute(obj.Context.name.toLowerCase(), obj.Context.name, "private"));
				file3.addMethod(new Method("setContext", "void", false, "public", "\t \t this." + obj.Context.name.toLowerCase() + " = " + obj.Context.name.toLowerCase() + ";", [new Attribute(obj.Context.name.toLowerCase(), obj.Context.name, "")]));
				this.fillPromise(ppc, file3);
			}
		});
		this.fillPromise(ppc, file1);
		this.fillPromise(ppc, file2);

		return ppc.object;
	}
	public Strategy(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));
		let file1: patternParticipatingClass = new NonHierarchyClass(obj.Context.name);
		file1.addAttribute(new Attribute(obj.Strategy.name.toLowerCase(), obj.Strategy.name, "private"));
		file1.addMethod(new Method("set" + obj.Strategy.name, "void", false, "public", "\t\t this." + obj.Strategy.name.toLowerCase() + " = " + obj.Strategy.name.toLowerCase() + ";", [new Attribute(obj.Strategy.name.toLowerCase(), obj.Strategy.name, "")]));
		file1.addMethod(new Method("doSomething", "void", false, "public", "\t \t this." + obj.Strategy.name.toLowerCase() + "." + obj.StrategyMethod.name + "()", []));
		this.fillPromise(ppc, file1);

		let file2: patternParticipatingClass = new abstractClass(obj.Strategy.name);
		file2.addMethod(new Method(obj.StrategyMethod.name, "void", true, "public", "", []));
		this.fillPromise(ppc, file2);

		Object.keys(obj).forEach((key) => {
			if (key.includes("ConcreteStrategy")) {
				let file3: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Strategy.name);
				file3.addMethod(new Method(obj.StrategyMethod.name, "void", false, "public", "", []));
				this.fillPromise(ppc, file3);

			}
		});
		return ppc.object;
	}
	public TemplateMethod(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));

		let file1: patternParticipatingClass = new NonHierarchyClass(obj.AbstractClass.name);
		file1.addMethod(new Method("templateMethod", "void", false, "public", "", []))
		var cList: Array<patternParticipatingClass> = [];//list of ConcreteClass
		var mList: Array<Method> = [];//list of AbstractClass methods
		Object.keys(obj).forEach((key) => {
			if (key.includes("ConcreteClass")) {
				let file2: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.AbstractClass.name);
				cList.push(file2);
			} else if (key.includes("AbstractClassMethod")) {
				file1.addMethod(new Method(obj[key].name, "void", true, "public", "", []));
				mList.push(new Method(obj[key].name, "void", false, "public", "", []));
			} else {

			}
		});
		for (var i = 0; i < cList.length; i++) {
			for (var j = 0; j < mList.length; j++) {
				cList[i].addMethod(mList[j]); // each one ConcreteClass has a method 
			}
			this.fillPromise(ppc, cList[i]);
		}
		this.fillPromise(ppc, file1);
		return ppc.object;
	}
	public Visitor(jsonObj: string): Array<patternParticipatingClass> {
		let ppc: Object = { object: [] }
		let obj = JSON.parse(JSON.stringify(jsonObj));
		let file1: patternParticipatingClass = new abstractClass(obj.Visitor.name);

		this.fillPromise(ppc, file1);

		let file2: patternParticipatingClass = new abstractClass(obj.Element.name);
		file2.addMethod(new Method("accept", "void", true, "public", "", [new Attribute(obj.Visitor.name.toLowerCase().charAt(0), obj.Visitor.name, "")]))
		this.fillPromise(ppc, file2);
		var cList: Array<patternParticipatingClass> = [];//list of ConcreteVisitors
		var eList: Array<Method> = [];//list of ConcreteElement method 
		Object.keys(obj).forEach((key) => {
			if (key.includes("ConcreteVisitor")) {
				let file3: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Visitor.name);
				cList.push(file3);
				//this.fillPromise(ppc, file3);
			} else if (key.includes("ConcreteElement")) {
				let file4: patternParticipatingClass = new ConcreteClass(obj[key].name, obj.Element.name);
				file1.addMethod(new Method("visit" + obj[key].name, "void", true, "public", "", [new Attribute(obj[key].name.toLowerCase().charAt(0), obj[key].name, "")]));
				file4.addMethod(new Method("accept", "void", false, "public", "", [new Attribute(obj.Visitor.name.toLowerCase().charAt(0), obj.Visitor.name, "")]));
				file4.addMethod(new Method("feature", "void", false, "public", "", []));
				eList.push(new Method("visit" + obj[key].name, "void", false, "public", "", [new Attribute(obj[key].name.toLowerCase().charAt(0), obj[key].name, "")]));
				this.fillPromise(ppc, file4);
			} else {

			}
		});

		for (var i = 0; i < cList.length; i++) {
			for (var j = 0; j < eList.length; j++) {
				cList[i].addMethod(eList[j]); // each one ConcreteVisitor has a method for each one ConcreteElement
			}
			this.fillPromise(ppc, cList[i]);
		}

		let file5: patternParticipatingClass = new abstractClass(obj.Visitor.name);
		this.fillPromise(ppc, file5);
		return ppc.object;
	}
	fillPromise(labelObj: Object, item: patternParticipatingClass) {
		labelObj.object.push(item);

	}
}
