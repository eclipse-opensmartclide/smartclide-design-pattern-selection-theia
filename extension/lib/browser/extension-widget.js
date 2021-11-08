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
                        React.createElement("option", { value: "Abstract Factory" }, "Abstract Factory"),
                        React.createElement("option", { value: "Builder" }, "Builder"),
                        React.createElement("option", { value: "Factory Method" }, "Factory Method"),
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
                        React.createElement("option", { value: "Chain of Responsibility" }, "Chain of Responsibility"),
                        React.createElement("option", { value: "Command" }, "Command"),
                        React.createElement("option", { value: "Interpreter" }, "Interpreter"),
                        React.createElement("option", { value: "Iterator" }, "Iterator"),
                        React.createElement("option", { value: "Mediator" }, "Mediator"),
                        React.createElement("option", { value: "Memento" }, "Memento"),
                        React.createElement("option", { value: "Observer" }, "Observer"),
                        React.createElement("option", { value: "State" }, "State"),
                        React.createElement("option", { value: "Strategy" }, "Strategy"),
                        React.createElement("option", { value: "Template Method" }, "Template Method"),
                        React.createElement("option", { value: "Visitor" }, "Visitor"))),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("button", { id: "btn-get-code", type: "button", title: 'Get the code according to the pattern', onClick: _a => this.runprocess() }, " Get Code "),
                React.createElement("br", null),
                React.createElement("div", { id: "show_pattern" }),
                React.createElement("br", null),
                React.createElement("div", { id: "result" },
                    React.createElement("table", { id: "show_pattern_table" }))));
    }
    async runprocess() {
        if (extensionWidget_1.state.statePatternSelection != "Choose_pattern" && extensionWidget_1.state.statePatternSelection != "") {
            document.getElementById("btn-get-code").style.visibility = 'hidden';
            var getUrl = window.location.href;
            extensionWidget_1.res = await this.helloBackendService.sayHelloTo(getUrl);
            for (let i = 0; i < extensionWidget_1.res.length; i++) {
                let lastW = extensionWidget_1.res[i].lastIndexOf("/");
                let file = extensionWidget_1.res[i].substr(lastW + 1);
                file = file.substr(0, file.indexOf("."));
                extensionWidget_1.res[i] = file;
            }
            //show the JSON values for the chosen key-pattern
            let values = extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values; //data[extensionWidget.state.statePatternSelection];
            var table = document.getElementById('show_pattern_table');
            Object.keys(values).forEach((key) => {
                let row = this.insertCells(table, key);
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
            });
            let d = document.getElementById("result");
            let b = document.createElement("button");
            b.id = "btnFinalize";
            b.innerHTML = "Finally Get Code";
            b.addEventListener('click', (_event) => {
                this.buttonClick2(table.rows.length);
            });
            d.appendChild(b);
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
        let row = table.insertRow(table.rows.length);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let t1 = document.createElement("label");
        t1.id = "label" + table.rows.length;
        t1.innerHTML = key;
        let t2 = document.createElement("input");
        t2.id = "txtbox" + table.rows.length;
        let num = table.rows.length;
        t2.onchange = function () {
            extensionWidget_1.textBoxValues[num - 1] = t2.value;
        };
        t2.autocomplete = "off";
        t2.placeholder = key;
        t2.addEventListener('keypress', (e) => {
            this.showSuggestions(t2.value, e.target.id);
        });
        let t3 = document.createElement("div");
        t3.id = "suggestions" + table.rows.length;
        t3.className = "suggestions";
        cell1.appendChild(t1);
        cell2.appendChild(t2);
        cell2.appendChild(t3);
        return row;
    }
    //when button is clicked adds one label and one input of the specific class that the user wants to insert one more 
    extensionButtonClick(table, key, values) {
        let newValues = JSON.parse(JSON.stringify(values));
        let count = this.countKeys(values, key.substr(3));
        if (extensionWidget_1.state.statePatternSelection == "Abstract Factory") {
            if (key.includes("AbstractProduct")) {
                let labelAbstrProd = this.updateLabel(key.substr(3), count + 1);
                newValues[labelAbstrProd] = JSON.stringify({ name: "", extension: 1 });
                this.insertCells(table, labelAbstrProd);
                var numProd = (this.countKeys(values, "Product") / count) - 1; // number of "Products"
                for (let j = 0; j < numProd; j++) {
                    let labelProduct = "Product" + (count + 1) + "." + (j + 1);
                    this.insertCells(table, labelProduct);
                    newValues[labelProduct] = JSON.stringify({ "name": "", "extension": 1 });
                }
            }
            else {
                let labelConFactory = this.updateLabel("ConcreteFactory ", count + 1);
                this.insertCells(table, labelConFactory);
                let numAbstrProd = this.countKeys(newValues, "AbstractProduct");
                newValues[labelConFactory] = JSON.stringify({ "name": "", "extension": 1 });
                for (let j = 0; j < numAbstrProd; j++) {
                    let labelProduct = "Product" + (j + 1) + "." + (count + 1);
                    this.insertCells(table, labelProduct);
                    newValues[labelProduct] = JSON.stringify({ "name": "", "extension": 1 });
                }
            }
        }
        else if (extensionWidget_1.state.statePatternSelection == "Builder") {
            let labelProduct = this.updateLabel("Product ", count + 1);
            let labelConBuilder = this.updateLabel("ConcreteBuilder ", count + 1);
            newValues[labelProduct] = JSON.stringify({ "name": "", "extension": 1 });
            newValues[labelConBuilder] = JSON.stringify({ "name": "", "extension": 1 });
            this.insertCells(table, labelConBuilder);
            this.insertCells(table, labelProduct);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Factory Method") {
            let labelProduct = this.updateLabel("ConcreteProduct ", count + 1);
            let labelConCreator = this.updateLabel("ConcreteCreator ", count + 1);
            newValues[labelProduct] = JSON.stringify({ "name": "", "extension": 1 });
            newValues[labelConCreator] = JSON.stringify({ "name": "", "extension": 1 });
            this.insertCells(table, labelConCreator);
            this.insertCells(table, labelProduct);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Adapter") {
            let labelAdapter = this.updateLabel("Adapter ", count + 1);
            let labelAdaptee = this.updateLabel("Adaptee ", count + 1);
            newValues[labelAdapter] = JSON.stringify({ "name": "", "extension": 1 });
            newValues[labelAdaptee] = JSON.stringify({ "name": "", "extension": 1 });
            this.insertCells(table, labelAdapter);
            this.insertCells(table, labelAdaptee);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Flyweight") {
            let label;
            if (key.includes("UnsharedConcreteFlyweight")) {
                label = this.updateLabel(key.substr(3), count + 1);
            }
            else {
                var numConFly = count - this.countKeys(values, "UnsharedConcreteFlyweight"); // number of "ConcreteFlyweight"
                console.log("count  " + count);
                console.log("UnsharedConcreteFlyweight   " + this.countKeys(values, "UnsharedConcreteFlyweight"));
                label = this.updateLabel(key.substr(3), numConFly + 1);
            }
            newValues[label] = JSON.stringify({ "name": "", "extension": 1 });
            this.insertCells(table, label);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Command") {
            var labelReceiver = this.updateLabel("Receiver ", count);
            var labelConCommand = this.updateLabel("ConcreteCommand ", count);
            this.insertCells(table, labelReceiver);
            this.insertCells(table, labelConCommand);
            //inserts new attributes in json object
            newValues[labelReceiver] = JSON.stringify({ "name": "", "extension": 1 });
            newValues[labelConCommand] = JSON.stringify({ "name": "", "extension": 1 });
        }
        else if (extensionWidget_1.state.statePatternSelection == "Iterator") {
            let labelConAggregate = this.updateLabel("ConcreteAggregate ", count + 1);
            let labelConIterator = this.updateLabel("ConcreteIterator ", count + 1);
            this.insertCells(table, labelConAggregate);
            this.insertCells(table, labelConIterator);
            //inserts new attributes in json object
            newValues[labelConAggregate] = JSON.stringify({ "name": "", "extension": 1 });
            newValues[labelConIterator] = JSON.stringify({ "name": "", "extension": 1 });
        }
        else {
            let label = this.updateLabel(key.substr(3), count + 1);
            newValues[label] = JSON.stringify({ "name": "", "extension": 1 });
            this.insertCells(table, label);
        }
        extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
    }
    buttonClick2(rows) {
        if (rows != extensionWidget_1.textBoxValues.length) {
            this.messageService.info("You need to give name for ALL the classes!");
        }
        else {
            if (this.checkInputs() == "Inputs are valid") {
                this.updateJsonObject();
                this.messageService.info("Well done! Code is coming...");
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
        keyString = keyString.slice(0, -1);
        Object.keys(values).forEach((key) => {
            if (key.includes(keyString)) {
                count++;
            }
        });
        return count;
    }
    //autocomplete
    showSuggestions(value, id) {
        let res = document.getElementById("suggestions" + id.substr(6));
        let list = '';
        let terms = this.autocompleteMatch(value);
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
            this.showSuggestions(document.getElementById("txtbox" + id.substr(6)).value, e.target.id);
        });
    }
    //autocomplete
    autocompleteMatch(input) {
        if (input == '') {
            return [];
        }
        let reg = new RegExp('^' + input);
        return extensionWidget_1.res.filter(function (term) {
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
                if (txtbox.match("^([A-Z]{1}[a-zA-Z]*[0-9]*)$")) {
                    count++;
                }
            }
            return (count == table.rows.length ? "Inputs are valid" : "Inputs are invalid");
        }
    }
    checkInputsForSameValues() {
        //return (extensionWidget.textBoxValues.every( (val, i, arr) => val === arr[0] ) ) ;
        return extensionWidget_1.textBoxValues.some((val, i) => extensionWidget_1.textBoxValues.indexOf(val) !== i);
    }
};
extensionWidget.ID = 'extension:widget';
extensionWidget.LABEL = 'Extension Widget';
extensionWidget.state = {
    statePatternSelection: '',
};
extensionWidget.textBoxValues = [];
extensionWidget.data = JSON.parse(JSON.stringify(data_json_1.default));
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