/*******************************************************************************
 * Copyright (C) 2021-2022 University of Macedonia
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
import {Method} from './Method';
import {Attribute} from './Attribute';

export abstract class patternParticipatingClass {
	protected hasArrayList : boolean;
    protected cName : string;
    protected mList : Array<Method>;
    protected aList: Array<Attribute>;

    constructor(cn: string){
        this.cName = cn;
		this.mList = [];
		this.aList = [];
    }

    public abstract writeToFile(rootUri : string) :string;
    public writeMethods(rootUri : string):void {
        for (let i=0; i<this.mList.length; i++) {
			this.mList[i].writeToFile(this.cName, rootUri);
		}		
    }
    public writeAttributes(rootUri : string): void {
		for (let i=0; i<this.aList.length; i++) {
			this.aList[i].writeToFile(this.cName, rootUri);
		}		
	}	
	
	public abstract importArrayList(rootUri: string, declaration : string): void ;
	public addAttribute(a: Attribute): void {
		this.aList.push(a);		
	}  

	public addMethod(m: Method): void {
		this.mList.push(m);		
	}  
	public sethasArrayList(){
		this.hasArrayList = true;
	}	
}
