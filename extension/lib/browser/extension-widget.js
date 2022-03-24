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
                React.createElement("button", { id: "btn-wizard", type: "button", title: 'Wizard', onClick: _a => this.runWizard() }, "Wizard"),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("button", { id: "btn-get-code", type: "button", title: 'Assign roles to classes and methods', onClick: _a => this.runprocess() }, "Assign roles to classes and methods"),
                React.createElement("br", null),
                React.createElement("div", { id: "show_pattern" }),
                React.createElement("br", null),
                React.createElement("div", { id: "result" },
                    React.createElement("fieldset", null,
                        React.createElement("details", null,
                            React.createElement("summary", { id: 'description' }),
                            React.createElement("p", { id: 'example' }),
                            React.createElement("img", { id: "image", alt: "Class Diagram " }))),
                    React.createElement("table", { id: "show_pattern_table" }),
                    React.createElement("div", { id: "elements" },
                        React.createElement("button", { id: "btnFinalize", type: "button", title: 'Get the code according to the pattern', onClick: _a => this.buttonClick2(document.getElementById('show_pattern_table').rows.length) }, " Get Code ")))),
            React.createElement("div", { id: "divWiz" }));
    }
    async runprocess() {
        if (extensionWidget_1.state.statePatternSelection != "Choose_pattern" && extensionWidget_1.state.statePatternSelection != "") {
            document.getElementById("btn-get-code").style.visibility = 'hidden';
            var getUrl = window.location.href;
            extensionWidget_1.res = await this.helloBackendService.sayHelloTo(getUrl);
            document.getElementById("result").style.visibility = 'visible';
            document.getElementById('image').className = extensionWidget_1.state.statePatternSelection;
            document.getElementById('description').innerHTML = extensionWidget_1.explanation[extensionWidget_1.state.statePatternSelection].description;
            document.getElementById('example').innerHTML = extensionWidget_1.explanation[extensionWidget_1.state.statePatternSelection].example;
            //show the JSON values for the chosen key-pattern
            let values = extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values; //data[extensionWidget.state.statePatternSelection];
            var table = document.getElementById('show_pattern_table');
            Object.keys(values).forEach(async (key) => {
                this.insertCells(table, key);
                let values = extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values;
                if (values[key].extension == 1) {
                    let cell3 = this.insertCell(2);
                    let t3 = document.createElement("button");
                    t3.innerHTML = "+";
                    t3.id = "btn" + key;
                    cell3.appendChild(t3);
                    t3.addEventListener('click', (event) => {
                        this.extensionButtonClick(table, event.target.id, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values);
                    });
                }
            });
            //await this.helloBackendService.main();
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
        return row;
    }
    //when button is clicked adds one label and one input of the specific class that the user wants to insert one more 
    extensionButtonClick(table, key, values) {
        let newValues = JSON.parse(JSON.stringify(values));
        let count = this.countKeys(values, key.substr(3));
        let label = this.updateLabel(key.substr(3), count + 1);
        console.log(label + "   count: " + count);
        if (extensionWidget_1.state.statePatternSelection == "AbstractFactory") {
            if (key.includes("AbstractProduct")) {
                newValues[label] = JSON.stringify({ name: "", extension: 0 });
                this.insertCells(table, label);
                var numProd = (this.countKeys(values, "Product") / count) - 1; // number of "Products" in each AbstractProduct
                console.log(numProd);
                for (let j = 0; j < numProd; j++) {
                    let labelProduct = "Product" + (count + 1) + "." + (j + 1);
                    console.log(labelProduct);
                    this.insertCells(table, labelProduct);
                    newValues[labelProduct] = JSON.stringify({ "name": "", "extension": 0 });
                }
            }
            else {
                this.insertCells(table, label);
                let numAbstrProd = this.countKeys(newValues, "AbstractProduct");
                newValues[label] = JSON.stringify({ "name": "", "extension": 0 });
                for (let j = 0; j < numAbstrProd; j++) {
                    let labelProduct = "Product" + (j + 1) + "." + (count + 1);
                    this.insertCells(table, labelProduct);
                    newValues[labelProduct] = JSON.stringify({ "name": "", "extension": 0 });
                }
            }
        }
        else if (extensionWidget_1.state.statePatternSelection == "Builder" && key.includes("Product")) {
            let labelConBuilder = this.updateLabel("ConcreteBuilder ", count + 1);
            newValues[label] = JSON.stringify({ "name": "", "extension": 0 });
            newValues[labelConBuilder] = JSON.stringify({ "name": "", "extension": 0 });
            this.insertCells(table, label);
            this.insertCells(table, labelConBuilder);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Factory Method") {
            let labelConCreator = this.updateLabel("ConcreteCreator ", count + 1);
            newValues[label] = JSON.stringify({ "name": "", "extension": 0 });
            newValues[labelConCreator] = JSON.stringify({ "name": "", "extension": 0 });
            this.insertCells(table, label);
            this.insertCells(table, labelConCreator);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Decorator" && key.includes("ConcreteDecorator")) {
            console.log("label1" + key.substr(3));
            let labelConDec = this.updateLabel(key.substr(3), (count / 2 + 1));
            console.log("label2" + labelConDec);
            let labelmethod = labelConDec + "Method";
            newValues[label] = JSON.stringify({ "name": "", "extension": 0 });
            newValues[labelmethod] = JSON.stringify({ "name": "", "extension": 0 });
            this.insertCells(table, labelConDec);
            this.insertCells(table, labelmethod);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Flyweight") {
            let label = this.updateLabel(key.substr(3), count / 2 + 1);
            let labelAttr = label + "Attribute";
            newValues[label] = JSON.stringify({ "name": "", "extension": 0 });
            newValues[labelAttr] = JSON.stringify({ "name": "", "extension": 1 });
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
                newValues[label] = JSON.stringify({ "name": "", "extension": 0 });
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
                newValues[labelConCommand] = JSON.stringify({ "name": "", "extension": 0 });
                newValues[labelConComMeth] = JSON.stringify({ "name": "", "extension": 0 });
                newValues[labelConComMethParam] = JSON.stringify({ "name": "", "extension": 1 });
            }
        }
        else {
            newValues[label] = JSON.stringify({ "name": "", "extension": 0 });
            this.insertCells(table, label);
        }
        extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
        console.log(JSON.stringify(newValues));
    }
    async buttonClick2(rows) {
        let flag = true;
        let i = 0;
        while (i < rows && flag == true) {
            const txtvalue = document.getElementById("txtbox" + (i + 1)).value;
            if (txtvalue == "")
                flag = false;
            i++;
        }
        if (!flag) {
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
                        }
                        else {
                            this.messageService.info("For Adaptee method you need to choose a method name that already exists in Adaptee class: " + methodNames);
                        }
                    }
                    else {
                        this.messageService.info("For Adaptee you need to choose a class name that already exists: " + extensionWidget_1.res);
                    }
                }
                else {
                    this.updateJsonObject();
                    this.messageService.info("Well done! Code is coming...");
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
                    if (txtbox.match("^([A-Z]{1}[a-zA-Z]*[0-9]*)$")) {
                        count++;
                    }
                }
            }
            return (count == table.rows.length ? "Inputs are valid" : "Inputs are invalid");
        }
    }
    checkInputsForSameValues() {
        const uniqueElements = new Set(extensionWidget_1.textBoxValues);
        return uniqueElements.size < extensionWidget_1.textBoxValues.length ? true : false;
    }
    refreshPage(table) {
        table.innerHTML = "";
        document.getElementById("btn-get-code").style.visibility = 'visible';
        document.getElementById("elements").style.visibility = 'hidden';
        window.location.reload();
    }
    runWizard() {
        document.getElementById("issues").style.visibility = 'hidden';
        document.getElementById("issues").style.height = '0px';
        let divWiz = document.getElementById('divWiz');
        divWiz.style.marginLeft = '10px';
        let divCont = document.createElement('div');
        createLabel('Choose the type of the pattern: <br>', 'label0', divWiz);
        createLabel('Creational', 'label1', divWiz);
        createInput('', 'radio1', '', 'patternTypes', 'radio', divWiz);
        let radio1 = document.getElementById('radio1');
        radio1.onclick = function () {
            divCont.innerHTML = "";
            let divCont2 = document.createElement('div');
            createLabel('<br> Do you want to create a completely new object or to create one by reusing an existing one?<br>', 'label4', divCont);
            createLabel('Create new object', 'label11', divCont);
            createInput('', 'radio11', '', 'new_existed', 'radio', divCont);
            let radio11 = document.getElementById('radio11');
            radio11.onclick = function () {
                divCont2.innerHTML = "";
                let divCont3 = document.createElement('div');
                createLabel('<br> Give the name of the Product that you want to create (Let X the name of the product)<br>', 'labelQuestion3', divCont2);
                createInput('Product name', 'product_name', 'infoField', '', 'text', divCont2);
                createButton('Next', 'buttonNext1', divCont2);
                let buttonNext1 = document.getElementById('buttonNext1');
                buttonNext1.onclick = function () {
                    divCont3.innerHTML = "";
                    let divCont4 = document.createElement('div');
                    createLabel('<br> Does the Product has sub-categories (Concrete Products)? <br>', 'labelQuestion4', divCont3);
                    createLabel('Yes', 'label31', divCont3);
                    createInput('', 'radio31', '', 'yes_no', 'radio', divCont3);
                    let radio31 = document.getElementById('radio31');
                    radio31.onclick = function () {
                        divCont4.innerHTML = "";
                        let divCont5 = document.createElement('div');
                        createLabel('<br> How many sub-categories exist? <br>', 'labelQuestion5', divCont4);
                        createInput('0', 'subcategoriesNum', '', '', 'number', divCont4);
                        createButton('Next', 'buttonNext2', divCont4);
                        let buttonNext2 = document.getElementById('buttonNext2');
                        buttonNext2.onclick = function () {
                            divCont5.innerHTML = "";
                            let divCont6 = document.createElement('div');
                            createLabel('<br> Please give the names of the Concrete Products <br>', 'labelQuestion6', divCont5);
                            let num = parseInt(document.getElementById('subcategoriesNum').value);
                            for (var i = 1; i <= num; i++) {
                                createInput('Concrete Product name ' + i, 'txtConcreteProductsName' + i, 'infoField', '', 'text', divCont5);
                            }
                            createButton('Next', 'buttonNext3', divCont5);
                            let buttonNext3 = document.getElementById('buttonNext3');
                            buttonNext3.onclick = function () {
                                divCont6.innerHTML = "";
                                let divCont7 = document.createElement('div');
                                createLabel('<br> Can the Products be classified in a Family? <br>', 'labelQuestion7', divCont6);
                                createLabel('Yes', 'label61', divCont6);
                                createInput('', 'radio61', '', 'yes_no', 'radio', divCont6);
                                let radio61 = document.getElementById('radio61');
                                radio61.onclick = function () {
                                    divCont7.innerHTML = "";
                                    let divCont8 = document.createElement('div');
                                    createLabel('<br> How many Families of Products exist? <br>', 'labelQuestion8', divCont7);
                                    createInput('0', 'familiesNum', '', '', 'number', divCont7);
                                    createButton('Next', 'buttonNext4', divCont7);
                                    let buttonNext4 = document.getElementById('buttonNext4');
                                    buttonNext4.onclick = function () {
                                        divCont8.innerHTML = "";
                                        let divCont9 = document.createElement('div');
                                        createLabel('<br> Please give the names of the Components <br>', 'labelQuestion9', divCont8);
                                        let num = parseInt(document.getElementById('familiesNum').value);
                                        for (var i = 1; i <= num; i++) {
                                            createInput('Component name ' + i, 'txtComponentName', 'infoField', '', 'text', divCont8);
                                        }
                                        createButton('Next', 'buttonNext5', divCont8);
                                        let buttonNext5 = document.getElementById('buttonNext5');
                                        buttonNext5.onclick = function () {
                                            createLabel('<br> Abstract Factory Pattern ', 'labelQuestion10', divCont9);
                                            createButton('Get Code', 'getcodeAbstractFactoryPattern', divCont9);
                                            let buttonCodeAFP = document.getElementById('getcodeAbstractFactoryPattern');
                                            buttonCodeAFP.onclick = function () {
                                                //code generation
                                            };
                                        };
                                        divCont8.appendChild(divCont9);
                                    };
                                    divCont7.appendChild(divCont8);
                                };
                                createLabel('No', 'label62', divCont6);
                                createInput('', 'radio62', '', 'yes_no', 'radio', divCont6);
                                let radio62 = document.getElementById('radio62');
                                radio62.onclick = function () {
                                    divCont7.innerHTML = "";
                                    let divCont8 = document.createElement('div');
                                    createLabel('<br> Can Product be created as series of steps which is different in every subcategory? <br>', 'labelQuestion11', divCont7);
                                    createLabel('Yes', 'label71', divCont7);
                                    createInput('', 'radio71', '', 'yes_no', 'radio', divCont7);
                                    let radio71 = document.getElementById('radio71');
                                    radio71.onclick = function () {
                                        divCont8.innerHTML = "";
                                        let divCont9 = document.createElement('div');
                                        createLabel('<br> How many Steps are involved ?  <br>', 'labelQuestion12', divCont8);
                                        createInput('0', 'stepsNum', '', '', 'number', divCont8);
                                        createButton('Next', 'buttonNext6', divCont8);
                                        let buttonNext6 = document.getElementById('buttonNext6');
                                        buttonNext6.onclick = function () {
                                            divCont9.innerHTML = "";
                                            let divCont10 = document.createElement('div');
                                            createLabel('<br> Please give the name of the steps  <br>', 'labelQuestion13', divCont9);
                                            let num = parseInt(document.getElementById('stepsNum').value);
                                            for (var i = 1; i <= num; i++) {
                                                createInput('Step name ' + i, 'txtStepName' + i, 'infoField', 'txtStepsName', 'text', divCont9);
                                            }
                                            createButton('Next', 'buttonNext7', divCont9);
                                            let buttonNext7 = document.getElementById('buttonNext7');
                                            buttonNext7.onclick = function () {
                                                createLabel('<br> Builder Pattern ', 'labelPattern1', divCont10);
                                                createButton('Get Code', 'getcodeBuildPattern', divCont10);
                                                let buttonCodeBP = document.getElementById('getcodeBuildPattern');
                                                buttonCodeBP.onclick = function () {
                                                    //code generation
                                                };
                                            };
                                            divCont9.appendChild(divCont10);
                                        };
                                        divCont8.appendChild(divCont9);
                                    };
                                    createLabel('No', 'label72', divCont7);
                                    createInput('', 'radio72', '', 'yes_no', 'radio', divCont7);
                                    let radio72 = document.getElementById('radio72');
                                    radio72.onclick = function () {
                                        divCont8.innerHTML = "";
                                        let divCont9 = document.createElement('div');
                                        createLabel('<br> What is the name of the Creator (e.g., Oven) of Product? <br>', 'labelQuestion14', divCont8);
                                        createInput('Creator name', 'txtCreatorName', 'infoField', 'txtCreatorName', 'text', divCont8);
                                        createButton('Next', 'buttonNext8', divCont8);
                                        let buttonNext8 = document.getElementById('buttonNext8');
                                        buttonNext8.onclick = function () {
                                            createLabel('<br> Factory Method Pattern', 'labelQuestion15', divCont9);
                                            createButton('Get Code', 'getcodeFactoryMethodPattern', divCont9);
                                            let buttonCodeFMP = document.getElementById('getcodeFactoryMethodPattern');
                                            buttonCodeFMP.onclick = function () {
                                                //code generation
                                            };
                                        };
                                        divCont8.appendChild(divCont9);
                                    };
                                    divCont7.appendChild(divCont8);
                                };
                                divCont6.appendChild(divCont7);
                            };
                            divCont5.appendChild(divCont6);
                        };
                        divCont4.appendChild(divCont5);
                    };
                    createLabel('No', 'label32', divCont3);
                    createInput('', 'radio32', '', 'yes_no', 'radio', divCont3);
                    let radio32 = document.getElementById('radio32');
                    radio32.onclick = function () {
                        divCont4.innerHTML = "";
                        createLabel('<br> There is no pattern <br>', 'labelQuestion16', divCont4);
                    };
                    divCont3.appendChild(divCont4);
                };
                divCont2.appendChild(divCont3);
            };
            createLabel('Reuse an existing one', 'label12', divCont);
            createInput('', 'radio12', '', 'new_existed', 'radio', divCont);
            let radio12 = document.getElementById('radio12');
            radio12.onclick = function () {
                divCont2.innerHTML = "";
                createLabel('<br> You chose existed <br>', 'labelQuestion17', divCont2);
            };
            divCont.appendChild(divCont2);
        };
        createLabel('Structural', 'label2', divWiz);
        createInput('', 'radio2', '', 'patternTypes', 'radio', divWiz);
        let radio2 = document.getElementById('radio2');
        radio2.onclick = function () {
            divCont.innerHTML = "";
            createLabel('<br> Do you want to ... <br>', 'labelQuestion18', divCont);
        };
        createLabel('Behavioral', 'label3', divWiz);
        createInput('', 'radio3', '', 'patternTypes', 'radio', divWiz);
        let radio3 = document.getElementById('radio3');
        radio3.onclick = function () {
            divCont.innerHTML = "";
            createLabel('<br> Do you want to ... <br>', 'labelQuestion19', divCont);
        };
        divWiz.appendChild(divCont);
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
function createLabel(innerMessage, id, parent) {
    let labelQuestion = document.createElement('label');
    labelQuestion.innerHTML = innerMessage;
    labelQuestion.id = id;
    parent.appendChild(labelQuestion);
}
function createInput(innerMessage, id, classname, name, type, parent) {
    let inputField = document.createElement('input');
    inputField.innerHTML = innerMessage;
    inputField.id = id;
    if (!id.includes('radio') && !id.includes('Num')) {
        inputField.className = classname;
    }
    inputField.name = name;
    inputField.type = type;
    parent.appendChild(inputField);
}
function createButton(innerMessage, id, parent) {
    let button = document.createElement('button');
    button.innerHTML = innerMessage;
    button.id = id;
    parent.appendChild(button);
}
//# sourceMappingURL=extension-widget.js.map