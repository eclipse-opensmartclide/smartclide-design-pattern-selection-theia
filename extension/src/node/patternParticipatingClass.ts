import {Method} from './Method';
import {Attribute} from './Attribute';

export abstract class patternParticipatingClass {
    protected cName : string;
    protected mList : Array<Method>;
    protected aList: Array<Attribute>;

    constructor(cn: string){
        this.cName = cn;
    }

    public abstract writeToFile() :void;
    public writeMethods():void {
        for (let i=0; i<this.mList.length; i++) {
			this.mList[i].writeToFile();
		}		
    }
    public writeAttributes(): void {
		for (let i=0; i<this.aList.length; i++) {
			this.aList[i].writeToFile();
		}		
	}	
	
	public addAttribute(a: Attribute): void {
		this.aList.push(a);		
	}  

	public addMethod(m: Method): void {
		this.mList.push(m);		
	}  	
}