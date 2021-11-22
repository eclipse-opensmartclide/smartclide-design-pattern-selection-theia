import {patternParticipatingClass} from './patternParticipatingClass';
import {abstractClass} from './abstractClass';
import {Attribute} from './Attribute';
import {Method} from './Method';
//import {ConcreteClass} from './ConcreteClass';

interface Object{
    //[x: string]: any;
    object :Array<patternParticipatingClass>;
}
export class CodeGenerator {
	
	public BridgeFactory(): Array<patternParticipatingClass>  {		
		let ppc : Object ={object: []}

		// Building first hierarchy
		let abstraction : patternParticipatingClass = new abstractClass("Employee");
		abstraction.addAttribute(new Attribute("pmnt", "Payment", "private"));
		abstraction.addMethod(new Method("calcPayroll", "double", true, "public", ""));
		this.fillPromise(ppc, abstraction);

		/*let refinedAbstraction1 : patternParticipatingClass = new ConcreteClass("Technical", "Employee");
		refinedAbstraction1.addMethod(new Method("calcPayroll", "double", false, "public", " \t\t return pmnt.calcTechnical();"));
		this.fillPromise(ppc, refinedAbstraction1);

		let refinedAbstraction2 : patternParticipatingClass = new ConcreteClass("PM", "Employee");
		refinedAbstraction2.addMethod(new Method("calcPayroll", "double", false, "public", " \t\t return pmnt.calcPM();"));
		this.fillPromise(ppc, refinedAbstraction2);

		// Building first hierarchy
		let implementor : patternParticipatingClass = new abstractClass("Payment");
		implementor.addMethod(new Method("calcTechnical", "double", true, "public", ""));
		implementor.addMethod(new Method("calcPM", "double", true, "public", ""));
		this.fillPromise(ppc, implementor);

		let convreteImplementor1 : patternParticipatingClass = new ConcreteClass("Salary", "Payment");
		convreteImplementor1.addMethod(new Method("calcTechnical", "double", false, "public", " \t\t return 800;"));
		convreteImplementor1.addMethod(new Method("calcPM", "double", false, "public", " \t\t return 1200;"));
		this.fillPromise(ppc, convreteImplementor1);

		let convreteImplementor2 :patternParticipatingClass  = new ConcreteClass("PerHour", "Payment");
		convreteImplementor2.addAttribute(new Attribute("hours", "int", "private"));
		convreteImplementor2.addMethod(new Method("calcTechnical", "double", false, "public", " \t\t return hours*10;"));
		convreteImplementor2.addMethod(new Method("calcPM", "double", false, "public", " \t\t return hours*25;"));
		this.fillPromise(ppc, convreteImplementor2);
		console.log("ppc " + ppc.object);	*/
		return ppc.object;		
	}
	fillPromise(labelObj: Object, item: patternParticipatingClass){
        labelObj.object.push(item);
        
    }
}
