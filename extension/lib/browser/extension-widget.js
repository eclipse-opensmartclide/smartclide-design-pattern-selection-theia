"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var extensionWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensionWidget = void 0;
const React = __importStar(require("react"));
const inversify_1 = require("inversify");
const alert_message_1 = require("@theia/core/lib/browser/widgets/alert-message");
const react_widget_1 = require("@theia/core/lib/browser/widgets/react-widget");
const core_1 = require("@theia/core");
const protocol_1 = require("../common/protocol");
const data_json_1 = __importDefault(require("./data.json"));
const explanation_json_1 = __importDefault(require("./explanation.json"));
let extensionWidget = extensionWidget_1 = class extensionWidget extends react_widget_1.ReactWidget {
    async init() {
        this.id = extensionWidget_1.ID;
        this.title.label = extensionWidget_1.LABEL;
        this.title.caption = extensionWidget_1.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-info-circle';
        this.update();
    }
    render() {
        const header = `Choose a Design Pattern and get the code. `;
        return React.createElement("div", { id: 'widget-container' },
            React.createElement(alert_message_1.AlertMessage, { type: 'INFO', header: header }),
            React.createElement("div", { id: 'issues' },
                React.createElement("br", null),
                React.createElement("select", { id: "drop-down-patterns", onChange: this.updateSelection, name: "statePatternSelection" },
                    React.createElement("option", { id: "empty-choice", value: "Choose_pattern" }, "Choose pattern"),
                    React.createElement("optgroup", { label: "Creational" },
                        React.createElement("option", { value: "AbstractFactory" }, "Abstract Factory"),
                        React.createElement("option", { value: "Builder" }, "Builder"),
                        React.createElement("option", { value: "FactoryMethod" }, "Factory Method"),
                        React.createElement("option", { value: "Prototype" }, "Prototype"),
                        React.createElement("option", { value: "Singleton" }, "Singleton")),
                    React.createElement("optgroup", { label: "Structural" },
                        React.createElement("option", { value: "Adapter" }, "Adapter"),
                        React.createElement("option", { value: "Bridge" }, "Bridge"),
                        React.createElement("option", { value: "Composite" }, "Composite"),
                        React.createElement("option", { value: "Decorator" }, "Decorator"),
                        React.createElement("option", { value: "Facade" }, "Facade"),
                        React.createElement("option", { value: "Flyweight" }, "Flyweight"),
                        React.createElement("option", { value: "Proxy" }, "Proxy")),
                    React.createElement("optgroup", { label: "Behavioral" },
                        React.createElement("option", { value: "ChainofResponsibility" }, "Chain of Responsibility"),
                        React.createElement("option", { value: "Command" }, "Command"),
                        React.createElement("option", { value: "Interpreter" }, "Interpreter"),
                        React.createElement("option", { value: "Iterator" }, "Iterator"),
                        React.createElement("option", { value: "Mediator" }, "Mediator"),
                        React.createElement("option", { value: "Memento" }, "Memento"),
                        React.createElement("option", { value: "Observer" }, "Observer"),
                        React.createElement("option", { value: "State" }, "State"),
                        React.createElement("option", { value: "Strategy" }, "Strategy"),
                        React.createElement("option", { value: "TemplateMethod" }, "Template Method"),
                        React.createElement("option", { value: "Visitor" }, "Visitor"))),
                React.createElement("button", { id: "btn-refresh", type: "button", title: 'Refresh', onClick: _a => this.refreshPage(document.getElementById('show_pattern_table')) },
                    " ",
                    React.createElement("i", { className: "fa fa-refresh" })),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("button", { id: "btn-get-code", type: "button", title: 'Assign roles to classes and methods', onClick: _a => this.runprocess() }, "Assign roles to classes and methods"),
                React.createElement("br", null),
                React.createElement("div", { id: "show_pattern" }),
                React.createElement("br", null),
                React.createElement("div", { id: "result" },
                    React.createElement("table", { id: "show_pattern_table" }),
                    React.createElement("div", { id: "elements" },
                        React.createElement("button", { id: "btnFinalize", type: "button", title: 'Get the code according to the pattern', onClick: _a => this.buttonClick2(document.getElementById('show_pattern_table').rows.length) }, " Get Code "),
                        React.createElement("p", { id: 'description' }),
                        React.createElement("p", { id: 'example' }),
                        React.createElement("img", { id: "image", alt: "Class Diagram " })))));
    }
    async runprocess() {
        if (extensionWidget_1.state.statePatternSelection != "Choose_pattern" && extensionWidget_1.state.statePatternSelection != "") {
            document.getElementById("btn-get-code").style.visibility = 'hidden';
            var getUrl = window.location.href;
            extensionWidget_1.res = await this.helloBackendService.sayHelloTo(getUrl);
            //show the JSON values for the chosen key-pattern
            let values = extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values; //data[extensionWidget.state.statePatternSelection];
            var table = document.getElementById('show_pattern_table');
            Object.keys(values).forEach(async (key) => {
                this.insertCells(table, key);
            });
            document.getElementById("elements").style.visibility = 'visible';
            document.getElementById('image').className = extensionWidget_1.state.statePatternSelection;
            document.getElementById('description').innerHTML = extensionWidget_1.explanation[extensionWidget_1.state.statePatternSelection].description;
            document.getElementById('example').innerHTML = extensionWidget_1.explanation[extensionWidget_1.state.statePatternSelection].example;
        }
        else {
            this.messageService.info('You need to choose a software pattern!');
        }
    }
    //update the state of dropdown
    updateSelection(e) {
        const key = e.currentTarget.name;
        extensionWidget_1.state[key] = e.currentTarget.value;
    }
    insertCells(table, key) {
        if (this.check(key)) {
            let index = 0;
            for (var i = 0; i < table.rows.length; i++) {
                let label = document.getElementById('label' + (i + 1)).innerHTML;
                if (key > label)
                    index++;
            }
            let row = table.insertRow(index);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell2.id = "cell2";
            let label = document.createElement("label");
            label.id = "label" + table.rows.length;
            label.innerHTML = key;
            let txtbox = document.createElement("input");
            txtbox.id = "txtbox" + table.rows.length;
            let num = table.rows.length;
            txtbox.onchange = function () {
                extensionWidget_1.textBoxValues[num - 1] = txtbox.value;
            };
            txtbox.autocomplete = "off";
            txtbox.placeholder = key;
            if (!key.includes("Method")) {
                txtbox.addEventListener('keypress', (e) => {
                    this.showSuggestions(txtbox.value, extensionWidget_1.res, e.target.id);
                });
                let suggestions = document.createElement("div");
                suggestions.id = "suggestions" + table.rows.length;
                suggestions.className = "suggestions";
                cell2.appendChild(suggestions);
            }
            cell1.appendChild(label);
            cell2.appendChild(txtbox);
            let values = extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values;
            if (values[key].extension == 1) {
                let cell3 = row.insertCell(2);
                let t3 = document.createElement("button");
                t3.innerHTML = "+";
                t3.id = "btn" + key;
                cell3.appendChild(t3);
                t3.addEventListener('click', (event) => {
                    this.extensionButtonClick(table, event.target.id, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values);
                });
            }
        }
    }
    //when button is clicked adds one label and one input of the specific class that the user wants to insert one more 
    extensionButtonClick(table, key, values) {
        let newValues = JSON.parse(JSON.stringify(values));
        let count = this.countKeys(values, key.substr(3));
        let label = this.updateLabel(key.substr(3), count + 1);
        console.log(label + "   count: " + count);
        if (extensionWidget_1.state.statePatternSelection == "AbstractFactory") {
            if (key.includes("Product") && !key.includes("ConcreteProduct")) {
                newValues[label] = { name: "", extension: 0 };
                this.insertCells(table, label);
                var numProd = (this.countKeys(values, "ConcreteProduct") / count) - 1; // number of "Products" in each Product
                console.log(numProd);
                for (let j = 0; j < numProd; j++) {
                    let labelProduct = "ConcreteProduct" + (count + 1) + "." + (j + 1);
                    console.log(labelProduct);
                    this.insertCells(table, labelProduct);
                    newValues[labelProduct] = { "name": "", "extension": 0 };
                }
            }
            else {
                this.insertCells(table, label);
                let numProd = this.countKeys(newValues, "Product");
                newValues[label] = { "name": "", "extension": 0 };
                for (let j = 0; j < numProd; j++) {
                    let labelProduct = "ConcreteProduct" + (j + 1) + "." + (count + 1);
                    this.insertCells(table, labelProduct);
                    newValues[labelProduct] = { "name": "", "extension": 0 };
                }
            }
        }
        else if (extensionWidget_1.state.statePatternSelection == "Builder" && key.includes("Product")) {
            let labelConBuilder = this.updateLabel("ConcreteBuilder ", count + 1);
            newValues[label] = { "name": "", "extension": 0 };
            newValues[labelConBuilder] = { "name": "", "extension": 0 };
            this.insertCells(table, label);
            this.insertCells(table, labelConBuilder);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Factory Method") {
            let labelConCreator = this.updateLabel("ConcreteCreator ", count + 1);
            newValues[label] = { "name": "", "extension": 0 };
            newValues[labelConCreator] = { "name": "", "extension": 0 };
            this.insertCells(table, label);
            this.insertCells(table, labelConCreator);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Decorator" && key.includes("ConcreteDecorator")) {
            console.log("label1" + key.substr(3));
            let labelConDec = this.updateLabel(key.substr(3), (count / 2 + 1));
            console.log("label2" + labelConDec);
            let labelmethod = labelConDec + "Method";
            newValues[label] = { "name": "", "extension": 0 };
            newValues[labelmethod] = { "name": "", "extension": 0 };
            this.insertCells(table, labelConDec);
            this.insertCells(table, labelmethod);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Flyweight") {
            let label = this.updateLabel(key.substr(3), count / 2 + 1);
            let labelAttr = label + "Attribute";
            newValues[label] = { "name": "", "extension": 0 };
            newValues[labelAttr] = { "name": "", "extension": 1 };
            this.insertCells(table, label);
            this.insertCells(table, labelAttr);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Command") {
            if (key.includes("MethodParameter")) {
                let count = 0;
                key = key.substr(3);
                let nkey = key.substr(0, key.length - 1);
                console.log("key.length " + key.length);
                console.log("nkey " + nkey);
                Object.keys(newValues).forEach((vkey) => {
                    if (vkey.includes(nkey)) {
                        count++;
                    }
                });
                console.log("count " + count);
                let label = this.updateLabel(key, count + 1);
                newValues[label] = { "name": "", "extension": 0 };
                this.insertCells(table, label);
            }
            else {
                let count2 = this.countKeys(values, "MethodParameter");
                let labelConCommand = this.updateLabel("ConcreteCommand ", (count - count2) / 2 + 1);
                let labelConComMeth = labelConCommand + "Method";
                let labelConComMethParam = labelConCommand + "MethodParameter1";
                this.insertCells(table, labelConCommand);
                this.insertCells(table, labelConComMeth);
                this.insertCells(table, labelConComMethParam);
                newValues[labelConCommand] = { "name": "", "extension": 0 };
                newValues[labelConComMeth] = { "name": "", "extension": 0 };
                newValues[labelConComMethParam] = { "name": "", "extension": 1 };
            }
        }
        else {
            newValues[label] = { "name": "", "extension": 0 };
            this.insertCells(table, label);
        }
        extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
        console.log(JSON.stringify(newValues));
    }
    async buttonClick2(rows) {
        if (!this.checkEmptyInputs(rows)) {
            this.messageService.info("You need to give name for ALL the classes!");
        }
        else {
            if (this.checkInputs() == "Inputs are valid") {
                if (extensionWidget_1.state.statePatternSelection == "Adapter") {
                    let adapteeName = document.getElementById("txtbox4").value;
                    var getUrl = window.location.href;
                    var methodNames = await this.helloBackendService.getMethods(getUrl, adapteeName);
                    console.log(methodNames);
                    if (extensionWidget_1.res.includes(adapteeName)) {
                        //call function to get methods (methodNames) of adapteeName class 
                        let methodName = document.getElementById("txtbox5").value;
                        if (methodNames.includes(methodName)) {
                            this.updateJsonObject();
                            this.messageService.info("Well done! Code is coming...");
                            await this.helloBackendService.codeGeneration(window.location.href, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values, extensionWidget_1.state.statePatternSelection);
                        }
                        else {
                            this.messageService.info("For Adaptee method you need to choose a method name that already exists in Adaptee class: " + methodNames);
                        }
                    }
                    else {
                        this.messageService.info("For Adaptee you need to choose a class name that already exists: " + extensionWidget_1.res);
                    }
                }
                else if (extensionWidget_1.state.statePatternSelection == "AbstractFactory") {
                    this.updateJsonObject();
                    this.insertInputsAbstractFactory();
                    this.messageService.info("Well done! Code is coming...");
                    await this.helloBackendService.codeGeneration(window.location.href, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values, extensionWidget_1.state.statePatternSelection);
                }
                else if (extensionWidget_1.state.statePatternSelection == "FactoryMethod") {
                    this.updateJsonObject();
                    this.insertInputsFactoryMethod();
                    this.messageService.info("Well done! Code is coming...");
                    await this.helloBackendService.codeGeneration(window.location.href, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values, extensionWidget_1.state.statePatternSelection);
                }
                else if (extensionWidget_1.state.statePatternSelection == "Builder") {
                    this.updateJsonObject();
                    this.insertInputsBuilder();
                    this.messageService.info("Well done! Code is coming...");
                    await this.helloBackendService.codeGeneration(window.location.href, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values, extensionWidget_1.state.statePatternSelection);
                }
                else {
                    this.updateJsonObject();
                    this.messageService.info("Well done! Code is coming...");
                    await this.helloBackendService.codeGeneration(window.location.href, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values, extensionWidget_1.state.statePatternSelection);
                }
            }
            else {
                this.messageService.info("Inputs are invalid");
            }
        }
    }
    updateLabel(value, count) {
        return (value.includes('.') ? value.substring(0, value.length - 2) + '.' + count : value.slice(0, -1) + count);
    }
    countKeys(values, keyString) {
        let count = 0;
        let str = keyString.replace(/\d/g, ''); //removes the numbers from the string and returns a new one
        Object.keys(values).forEach((key) => {
            if (key.includes(str)) {
                count++;
            }
        });
        return count;
    }
    //autocomplete
    showSuggestions(value, table, id) {
        let res = document.getElementById("suggestions" + id.substr(6));
        let list = '';
        let terms = this.autocompleteMatch(value, table);
        for (var i = 0; i < terms.length; i++) {
            list += '<li>' + terms[i] + '</li>';
        }
        res.innerHTML = "<ul id='list" + id.substr(6) + "'> " + list + "</ul>";
        let ul = document.getElementById("list" + id.substr(6));
        let input = document.getElementById("txtbox" + id.substr(6));
        ul.onclick = function (event) {
            input.value = event.target.innerHTML;
            res.style.visibility = 'hidden';
        };
        let hideBlock = function () {
            res.style.visibility = 'hidden';
        };
        ul.addEventListener('mouseleave', hideBlock);
        input.addEventListener('keypress', (e) => {
            res.style.visibility = 'visible';
            this.showSuggestions(document.getElementById("txtbox" + id.substr(6)).value, table, e.target.id);
        });
    }
    //autocomplete
    autocompleteMatch(input, table) {
        if (input == '') {
            return [];
        }
        let reg = new RegExp('^' + input);
        return table.filter(function (term) {
            if (term.match(reg)) {
                return term;
            }
        });
    }
    updateJsonObject() {
        let table = document.getElementById('show_pattern_table');
        for (let i = 0; i < table.rows.length; i++) {
            let label = document.getElementById('label' + (i + 1)).innerHTML;
            let txtbox = document.getElementById('txtbox' + (i + 1)).value;
            console.log(txtbox);
            if (txtbox != undefined)
                extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values[label].name = txtbox;
        }
    }
    checkInputs() {
        let count = 0;
        const table = document.getElementById('show_pattern_table');
        if (this.checkInputsForSameValues()) {
            return ("Inputs are invalid");
        }
        else {
            for (let i = 0; i < table.rows.length; i++) {
                const txtbox = document.getElementById('txtbox' + (i + 1)).value;
                const labelvalue = document.getElementById('label' + (i + 1)).innerHTML;
                if (labelvalue.includes("Method")) {
                    if (txtbox.match("^([a-z]{1}[a-zA-Z]*[0-9]*)$")) { //camel writing names of methods
                        count++;
                    }
                }
                else {
                    if (txtbox.match("^([A-Z]{1}[a-zA-Z]*[0-9]*)$")) { //general case
                        count++;
                    }
                }
            }
            return (count == (table.rows.length) ? "Inputs are valid" : "Inputs are invalid");
        }
    }
    //method that checks for duplicate values
    checkInputsForSameValues() {
        const uniqueElements = extensionWidget_1.textBoxValues;
        let resultToReturn = false;
        for (let i = 0; i < uniqueElements.length; i++) { // nested for loop
            for (let j = 0; j < uniqueElements.length; j++) {
                // prevents the element from comparing with itself
                if (i != j) {
                    // check if elements' values are equal
                    if (uniqueElements[i] == uniqueElements[j] && uniqueElements[i] != undefined) {
                        // duplicate element present                  
                        resultToReturn = true;
                        // terminate inner loop
                        break;
                    }
                }
            }
            // terminate outer loop                                                                      
            if (resultToReturn) {
                break;
            }
        }
        return (resultToReturn);
    }
    refreshPage(table) {
        table.innerHTML = "";
        document.getElementById("btn-get-code").style.visibility = 'visible';
        document.getElementById("elements").style.visibility = 'hidden';
    }
    insertInputsAbstractFactory() {
        let values = JSON.parse(JSON.stringify(extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values));
        let listofFamily = [];
        let listofProducts = [];
        Object.keys(values).forEach((key) => {
            if (key.includes("Family")) {
                listofFamily.push(values[key].name);
            }
            else if (key.includes("Product") && !key.includes("ConcreteProduct")) {
                listofProducts.push(values[key].name);
            }
        });
        Object.keys(values).forEach((key) => {
            if (key.includes("ConcreteProduct")) {
                let array = key.split('.');
                var numberofProduct = array[0].replace(/\D/g, '');
                values[key].name = listofFamily[Number(array[1]) - 1].split("Factory")[0] + listofProducts[Number(numberofProduct) - 1];
                console.log(key + " " + values[key].name);
            }
        });
        extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = values;
    }
    insertInputsFactoryMethod() {
        let values = JSON.parse(JSON.stringify(extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values));
        let listofConCreators = [];
        Object.keys(values).forEach((key) => {
            if (key.includes("ConcreteCreator"))
                listofConCreators.push(values[key].name);
        });
        Object.keys(values).forEach((key) => {
            if (key.includes("ConcreteProduct")) {
                var numofConCreator = key.match(/\d/g);
                values[key].name = listofConCreators[Number(numofConCreator) - 1].split('Dialog')[0] + values.Product.name;
            }
        });
        extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = values;
    }
    insertInputsBuilder() {
        let values = JSON.parse(JSON.stringify(extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values));
        let listofProducts = [];
        Object.keys(values).forEach((key) => {
            if (key.includes("Product"))
                listofProducts.push(values[key].name);
        });
        console.log(listofProducts);
        Object.keys(values).forEach((key) => {
            if (key.includes("ConcreteBuilder")) {
                var numofConBuilder = key.match(/\d/g);
                values[key].name = listofProducts[Number(numofConBuilder) - 1] + "Builder";
            }
        });
        extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = values;
    }
    checkEmptyInputs(rows) {
        let flag = true;
        let i = 0;
        while (i < rows && flag == true) {
            const txtvalue = document.getElementById("txtbox" + (i + 1)).value;
            const label = document.getElementById("label" + (i + 1)).innerHTML;
            if (txtvalue == "" && !label.includes("ConcreteProduct"))
                flag = false; //the inputs have to be non empty except for the input whose label contains the ConcreteProduct role
            else {
                i++;
            }
        }
        return flag;
    }
    check(key) {
        return (!key.includes("ConcreteProduct") || extensionWidget_1.state.statePatternSelection != "AbstractFactory") && (!key.includes("ConcreteProduct") || extensionWidget_1.state.statePatternSelection != "FactoryMethod") && (!key.includes("ConcreteBuilder") || extensionWidget_1.state.statePatternSelection != "Builder");
    }
};
extensionWidget.ID = 'extension:widget';
extensionWidget.LABEL = 'Extension Widget';
extensionWidget.state = {
    statePatternSelection: ''
};
extensionWidget.textBoxValues = [];
extensionWidget.data = JSON.parse(JSON.stringify(data_json_1.default));
extensionWidget.explanation = JSON.parse(JSON.stringify(explanation_json_1.default));
__decorate([
    inversify_1.inject(core_1.MessageService),
    __metadata("design:type", core_1.MessageService)
], extensionWidget.prototype, "messageService", void 0);
__decorate([
    inversify_1.inject(protocol_1.HelloBackendService),
    __metadata("design:type", Object)
], extensionWidget.prototype, "helloBackendService", void 0);
__decorate([
    inversify_1.postConstruct(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], extensionWidget.prototype, "init", null);
extensionWidget = extensionWidget_1 = __decorate([
    inversify_1.injectable()
], extensionWidget);
exports.extensionWidget = extensionWidget;
//# sourceMappingURL=extension-widget.js.map