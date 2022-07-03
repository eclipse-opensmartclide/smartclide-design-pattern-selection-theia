/*******************************************************************************
 * Copyright (C) 2021-2022 University of Macedonia
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
import { JsonRpcServer } from '@theia/core/lib/common/messaging';

export const BackendService = Symbol('BackendService');
export const BACKEND_PATH = '/services/Backend';

export interface BackendService {
	getMethods(getUrl: string, fileName:string): Promise<string[]>;
    getFileNames(url: string): Promise<string[]>;
    codeGeneration(cName : string, jsonObj: string, statePatternSelection: string): Promise<string>;
    
}
export const BackendWithClientService = Symbol('BackendWithClient');
export const BACKEND_WITH_CLIENT_PATH = '/services/withClient';

export interface BackendWithClientService extends JsonRpcServer<BackendClient> {
    greet(): Promise<string>
}
export const BackendClient = Symbol('BackendClient');
export interface BackendClient {
    getName(): Promise<string>;
}
