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
            for (var i = 0; i < extensionWidget_1.res.length; i++) {
                var lastW = extensionWidget_1.res[i].lastIndexOf("/");
                var file = extensionWidget_1.res[i].substr(lastW + 1);
                file = file.substr(0, file.indexOf("."));
                console.log(file);
                extensionWidget_1.res[i] = file;
            }
            console.log("FRONT " + extensionWidget_1.res);
            //show the JSON values for the chosen key-pattern
            var values = extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values; //data[extensionWidget.state.statePatternSelection];
            var table = document.getElementById('show_pattern_table');
            Object.keys(values).forEach((key) => {
                var row = this.insertCells(table, key);
                if (values[key].extension == 1) {
                    var cell3 = row.insertCell(2);
                    var t3 = document.createElement("button");
                    t3.innerHTML = "+";
                    t3.id = "btn" + key;
                    cell3.appendChild(t3);
                    t3.addEventListener('click', (event) => {
                        this.buttonClick(table, event.target.id, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values, "");
                    });
                }
                if (("classes" in values[key]) == true) {
                    var classes = values[key]["classes"];
                    Object.keys(classes).forEach((key1) => {
                        var row = this.insertCells(table, key1);
                        if (classes[key1].extension == 1) {
                            var cell3 = row.insertCell(2);
                            var t3 = document.createElement("button");
                            t3.innerHTML = "+";
                            t3.id = "btn" + key1;
                            cell3.appendChild(t3);
                            t3.addEventListener('click', (event) => {
                                console.log("key " + key);
                                console.log(JSON.stringify(extensionWidget_1.data[extensionWidget_1.state.statePatternSelection]));
                                this.buttonClick(table, event.target.id, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values[key].classes);
                                console.log("RUNPROCESS " + JSON.stringify(extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values));
                            });
                        }
                    });
                }
            });
            var d = document.getElementById("result");
            var b = document.createElement("button");
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
    //update the state
    updateSelection(e) {
        const key = e.currentTarget.name;
        extensionWidget_1.state[key] = e.currentTarget.value;
    }
    //update the state
    updateInput(e) {
        const key = e.currentTarget.name;
        extensionWidget_1.state[key] = e.currentTarget.value;
    }
    insertCells(table, key) {
        var row = table.insertRow(table.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var t1 = document.createElement("label");
        t1.id = "label" + table.rows.length;
        t1.innerHTML = key;
        var t2 = document.createElement("input");
        t2.id = "txtbox" + table.rows.length;
        var num = table.rows.length;
        t2.onchange = function () {
            extensionWidget_1.textBoxValues[num - 1] = t2.value;
        };
        t2.placeholder = key;
        cell1.appendChild(t1);
        cell2.appendChild(t2);
        return row;
    }
    //when button is clicked adds one label and one input of the specific class that the user wants to insert one more 
    buttonClick(table, key, values, classes) {
        console.log(JSON.stringify(values));
        if (extensionWidget_1.state.statePatternSelection == "Abstract Factory") {
            if (key.includes("AbstractProduct")) {
                var newValues = JSON.parse(JSON.stringify(values));
                var count = this.countKeys(values, key.substr(3));
                console.log(key.substr(3), count);
                var labelAbstrProd = this.updateLabel(key.substr(3), count);
                newValues[labelAbstrProd] = { name: "", extension: 1, classes: {} };
                //JSON.stringify({ "name":"", "extension":1 });
                //newValues[labelAbstrProd]["classes"] = JSON.stringify({"dff":""});
                var row = this.insertCells(table, labelAbstrProd);
                var cell3 = row.insertCell(2);
                var t3 = document.createElement("button");
                t3.innerHTML = "+";
                t3.id = "btn" + labelAbstrProd;
                cell3.appendChild(t3);
                console.log("classes " + JSON.stringify(newValues[labelAbstrProd]["classes"]));
                var count2 = this.countKeys(newValues[key.substr(3)]["classes"], "Product") - 1;
                console.log("count " + count2);
                for (var j = 0; j < count2; j++) {
                    var labelProduct = "Product" + count + "." + (j + 1);
                    var row = this.insertCells(table, labelProduct);
                    newValues[labelAbstrProd]["classes"][labelProduct] = JSON.stringify({ "name": "", "extension": 1 });
                }
                t3.addEventListener('click', (event) => {
                    this.buttonClick(table, event.target.id, values, "");
                });
            }
            else {
                var count = this.countKeys(classes, key.substr(3));
                var labelConFactory = this.updateLabel("ConcreteFactory ", count);
                var row = this.insertCells(table, labelConFactory);
                var cell3 = row.insertCell(2);
                var t3 = document.createElement("button");
                t3.innerHTML = "+";
                t3.id = "btn" + labelConFactory;
                cell3.appendChild(t3);
                var newValues = JSON.parse(JSON.stringify(values));
                var numAbstrProd = this.countKeys(newValues, "AbstractProduct") - 1;
                console.log("AbstrProd " + numAbstrProd);
                newValues["AbstractFactory"]["classes"][labelConFactory] = JSON.stringify({ "name": "", "extension": 1 });
                for (var j = 0; j < numAbstrProd; j++) {
                    var labelProduct = "Product" + (j + 1) + "." + count;
                    var row = this.insertCells(table, labelProduct);
                    newValues["AbstractProduct" + (j + 1)]["classes"][labelProduct] = JSON.stringify({ "name": "", "extension": 1 });
                }
            }
        }
        else if (extensionWidget_1.state.statePatternSelection == "Builder") {
            if (key.includes("Product")) {
                var count = this.countKeys(values, key.substr(3));
            }
            else {
                var count = this.countKeys(classes, key.substr(3));
            }
            var labelProduct = this.updateLabel("Product ", count);
            var labelConBuilder = this.updateLabel("ConcreteBuilder ", count);
            var newValues = JSON.parse(JSON.stringify(values));
            newValues[labelProduct] = JSON.stringify({ "name": "", "extension": 1 });
            newValues["Builder"]["classes"][labelConBuilder] = JSON.stringify({ "name": "", "extension": 1 });
            var row = this.insertCells(table, labelProduct);
            var cell3 = row.insertCell(2);
            var t3 = document.createElement("button");
            t3.innerHTML = "+";
            t3.id = "btn" + labelProduct;
            cell3.appendChild(t3);
            var row = this.insertCells(table, labelConBuilder);
            var cell3 = row.insertCell(2);
            var t4 = document.createElement("button");
            t4.innerHTML = "+";
            t4.id = "btn" + labelConBuilder;
            cell3.appendChild(t4);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Command") {
            if (key.includes("Receiver")) {
                var count = this.countKeys(values, key.substr(3));
            }
            else {
                var count = this.countKeys(classes, key.substr(3));
            }
            var labelReceiver = this.updateLabel("Receiver ", count);
            var labelConCommand = this.updateLabel("ConcreteCommand ", count);
            var row = this.insertCells(table, labelReceiver);
            var cell3 = row.insertCell(2);
            var t3 = document.createElement("button");
            t3.innerHTML = "+";
            t3.id = "btn" + labelReceiver;
            cell3.appendChild(t3);
            var row = this.insertCells(table, labelConCommand);
            var cell3 = row.insertCell(2);
            var t4 = document.createElement("button");
            t4.innerHTML = "+";
            t4.id = "btn" + labelConCommand;
            cell3.appendChild(t4);
            //inserts new attributes in json
            var newValues = JSON.parse(JSON.stringify(values));
            newValues[labelReceiver] = JSON.stringify({ "name": "", "extension": 1 });
            newValues["Command"]["classes"][labelConCommand] = JSON.stringify({ "name": "", "extension": 1 });
            console.log(JSON.stringify(newValues));
            t3.addEventListener('click', (event) => {
                this.buttonClick(table, event.target.id, values, classes);
            });
            t4.addEventListener('click', (event) => {
                this.buttonClick(table, event.target.id, values, classes);
            });
        }
        else if (extensionWidget_1.state.statePatternSelection == "Iterator") {
            var count = this.countKeys(classes, key.substr(3));
            var labelConAggregate = this.updateLabel("ConcreteAggregate ", count);
            var labelConIterator = this.updateLabel("ConcreteIterator ", count);
            //button insertion 
            var row = this.insertCells(table, labelConAggregate);
            var cell3 = row.insertCell(2);
            var t3 = document.createElement("button");
            t3.innerHTML = "+";
            t3.id = "btn" + labelConAggregate;
            cell3.appendChild(t3);
            //button insertion
            var row = this.insertCells(table, labelConIterator);
            var cell3 = row.insertCell(2);
            var t4 = document.createElement("button");
            t4.innerHTML = "+";
            t4.id = "btn" + labelConIterator;
            cell3.appendChild(t4);
            var newValues = JSON.parse(JSON.stringify(values));
            newValues["Aggregate"]["classes"][labelConAggregate] = JSON.stringify({ "name": "", "extension": 1 }); //attribute "classes" in Aggreagate attribute gets new json value
            newValues["Iterator"]["classes"][labelConIterator] = JSON.stringify({ "name": "", "extension": 1 });
            console.log(JSON.stringify(newValues));
            t3.addEventListener('click', (event) => {
                this.buttonClick(table, event.target.id, values, classes);
            });
            t4.addEventListener('click', (event) => {
                this.buttonClick(table, event.target.id, values, classes);
            });
        }
        else {
            if (classes == "") {
                var count = this.countKeys(values, key.substr(3));
                var label = this.updateLabel(key.substr(3), count);
                var newValues = JSON.parse(JSON.stringify(values));
                newValues[label] = JSON.stringify({ "name": "", "extension": 1 }); //attribute "classes" in Aggreagate attribute gets new json value
            }
            else {
                var count = this.countKeys(classes, key.substr(3));
                var label = this.updateLabel(key.substr(3), count);
                var newClasses = JSON.parse(JSON.stringify(classes));
                newClasses[label] = JSON.stringify({ "name": "", "extension": 1 });
            }
            var row = this.insertCells(table, label);
            var cell3 = row.insertCell(2);
            var t3 = document.createElement("button");
            t3.innerHTML = "+";
            t3.id = "btn" + label;
            cell3.appendChild(t3);
            t3.addEventListener('click', (event) => {
                this.buttonClick(table, event.target.id, values, classes);
            });
        }
        //console.log(JSON.stringify(newValues));
        extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
    }
    buttonClick2(rows) {
        if (rows != extensionWidget_1.textBoxValues.length) {
            this.messageService.info("You need to give name for ALL the classes!");
        }
        else {
            this.messageService.info("Well done! Code is coming...");
        }
    }
    updateLabel(value, count) {
        if (value.includes('.')) {
            return value.substring(0, value.length - 2) + '.' + count;
        }
        return value.slice(0, -1) + count;
    }
    countKeys(values, keyString) {
        let count = 0;
        keyString = keyString.slice(0, -1);
        Object.keys(values).forEach((key) => {
            if (key.includes(keyString)) {
                count++;
            }
        });
        return count + 1;
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