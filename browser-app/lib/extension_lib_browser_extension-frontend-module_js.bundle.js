(self["webpackChunkbrowser_app"] = self["webpackChunkbrowser_app"] || []).push([["extension_lib_browser_extension-frontend-module_js"],{

/***/ "../extension/lib/browser/data.json":
/*!******************************************!*\
  !*** ../extension/lib/browser/data.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"AbstractFactory":{"values":{"AbstractFactory":{"name":"","extension":0},"Family1":{"name":"","extension":1},"Family2":{"name":"","extension":0},"ConcreteProduct1":{"name":"","extension":1},"Product1.1":{"name":"","extension":0},"Product1.2":{"name":"","extension":0},"ConcreteProduct2":{"name":"","extension":0},"Product2.1":{"name":"","extension":0},"Product2.2":{"name":"","extension":0}}},"Builder":{"values":{"Director":{"name":"","extension":0},"Builder":{"name":"","extension":0},"BuilderMethod1":{"name":"","extension":1},"ConcreteBuilder1":{"name":"","extension":0},"Product1":{"name":"","extension":1}}},"FactoryMethod":{"values":{"Creator":{"name":"","extension":0},"ConcreteCreator1":{"name":"","extension":0},"Product":{"name":"","extension":0},"ConcreteProduct1":{"name":"","extension":1}}},"Prototype":{"values":{"Prototype":{"name":"","extension":0},"Object1":{"name":"","extension":1}}},"Singleton":{"values":{"Singleton":{"name":"","extension":0}}},"Adapter":{"values":{"Client Interface":{"name":"","extension":0},"Adapter":{"name":"","extension":0},"AdapterMethod":{"name":"","extension":0},"Adaptee":{"name":"","extension":0},"AdapteeMethod":{"name":"","extension":0}}},"Bridge":{"values":{"Abstraction":{"name":"","extension":0},"AbstractionMethod":{"name":"","extension":0},"RefinedAbstraction1":{"name":"","extension":1},"Implementation":{"name":"","extension":0},"ImplementationMethod":{"name":"","extension":0},"ConcreteImplementation1":{"name":"","extension":1}}},"Composite":{"values":{"Component":{"name":"","extension":0},"ComponentMethod":{"name":"","extension":0},"ConcreteComponent1":{"name":"","extension":1},"Composite":{"name":"","extension":0}}},"Decorator":{"values":{"Component":{"name":"","extension":0},"ComponentMethod":{"name":"","extension":0},"ConcreteComponent1":{"name":"","extension":1},"Decorator":{"name":"","extension":0},"ConcreteDecorator1":{"name":"","extension":1},"ConcreteDecorator1Method":{"name":"","extension":0}}},"Facade":{"values":{"Facade":{"name":"","extension":0},"AdditionalFacade1":{"name":"","extension":1}}},"Flyweight":{"values":{"FlyweightFactory":{"name":"","extension":0},"Flyweight":{"name":"","extension":0},"ConcreteFlyweight1":{"name":"","extension":1},"ConcreteFlyweight1Attribute":{"name":"","extension":0},"Client":{"name":"","extension":0}}},"Proxy":{"values":{"ServiceInterface":{"name":"","extension":0},"ServiceInterfaceMethod":{"name":"","extension":0},"Service":{"name":"","extension":0},"Proxy":{"name":"","extension":0}}},"ChainofResponsibility":{"values":{"Handler":{"name":"","extension":0},"ConcreteHandler1":{"name":"","extension":1}}},"Command":{"values":{"Receiver":{"name":"","extension":0},"Invoker":{"name":"","extension":0},"Command":{"name":"","extension":0},"ConcreteCommand1":{"name":"","extension":1},"ConcreteCommand1Method":{"name":"","extension":0},"ConcreteCommand1MethodParameter1":{"name":"","extension":1}}},"Interpreter":{"values":{"Context":{"name":"","extension":0},"AbstractExpression":{"name":"","extension":0},"TerminalExpression1":{"name":"","extension":1},"NonterminalExpression1":{"name":"","extension":1}}},"Mediator":{"values":{"Mediator":{"name":"","extension":0},"ConcreteMediator1":{"name":"","extension":1},"Component1":{"name":"","extension":1},"Component2":{"name":"","extension":0}}},"Memento":{"values":{"Originator":{"name":"","extension":0},"OriginatorAttribute1":{"name":"","extension":1},"Memento":{"name":"","extension":0},"MementoAttribute1":{"name":"","extension":1},"Caretaker":{"name":"","extension":0}}},"Observer":{"values":{"Subject":{"name":"","extension":0},"ConcreteSubject1":{"name":"","extension":1},"Observer":{"name":"","extension":0},"ConcreteObserver1":{"name":"","extension":1}}},"State":{"values":{"Context":{"name":"","extension":0},"State":{"name":"","extension":0},"ConcreteState1":{"name":"","extension":1}}},"Strategy":{"values":{"Context":{"name":"","extension":0},"Strategy":{"name":"","extension":0},"StrategyMethod":{"name":"","extension":0},"ConcreteStrategy1":{"name":"","extension":1}}},"TemplateMethod":{"values":{"AbstractClass":{"name":"","extension":0},"AbstractClassMethod1":{"name":"","extension":1},"ConcreteClass1":{"name":"","extension":1}}},"Visitor":{"values":{"Visitor":{"name":"","extension":0},"ConcreteVisitor1":{"name":"","extension":1},"Element":{"name":"","extension":0},"ConcreteElement1":{"name":"","extension":1},"ConcreteElement2":{"name":"","extension":0}}}}');

/***/ }),

/***/ "../extension/lib/browser/explanation.json":
/*!*************************************************!*\
  !*** ../extension/lib/browser/explanation.json ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"AbstractFactory":{"description":"Abstract Factory lets you produce families of related objects without specifying their concrete classes.","example":"Example: Consider a case that you want to develop a system that creates various types of furniture (e.g., Chairs and Sofas). Furniture belong to two families (e.g., Victorian and Modern. For each family, a dedicated factory class is developed, being responsible for creating the concrete type of each product."},"Builder":{"description":"Builder is a creational design pattern that lets you construct complex objects step by step (by ConcreteBuilders methods). The pattern allows you to produce different types and representations of an object (Product) using the same construction code.","example":"Example: Consider a case that you want to build cars and their manuals. The client can delegate the assembly to the director class, which knows how to use a builder to construct several models of cars. As a car model diverse from another, the same way a manual diverse from car to car. So you can use the same builder for constructing both Car and Manual, but you need another ConcreteBuilder (CarManualBuilder) to describe car parts. Finally, you get from the ConcreteBuilders the final products (Car and Manual)."},"FactoryMethod":{"description":"Factory Method provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects (ConcreteProducts) that will be created.","example":"Example: Factory Method can be used for creating cross-platform UI elements without coupling the client code to concrete UI classes.ConcreteCreators (WindowsDialog and WebDialog) override the base factory method (Dialog) so it returns a different type of product (WindowsButton or HTMLButton)."},"Prototype":{"description":"Prototype lets you copy existing objects without making your code dependent on their classes.","example":"Example: Consider the case that you want to produce exact copies of geometric objects, without coupling the code to their classes. All shape classes (Rectangle and Circle) follow the same interface (Shape), which provides a cloning method. A subclass may call the parent’s cloning method before copying its own field values to the resulting object."},"Singleton":{"description":"Singleton lets you ensure that a class has only one instance, while providing a global access point to this instance.Just like a global variable, the Singleton pattern lets you access some object from anywhere in the program. However, it also protects that instance from being overwritten by other code.","example":"Example: The database connection class acts as a Singleton. This class doesn’t have a public constructor (Database()), so the only way to get its object is to call the getInstance() method. This method caches the first created object and returns it in all subsequent calls."},"Adapter":{"description":"Adapter allows objects with incompatible interfaces to collaborate. Τhe adapter implements the interface of one object and wraps the other one.","example":"Example: Consider the case that you have a SquarePeg and you need to fit it in a RoundHole. You need to create an adapter, which receives calls from the client (RoundHole) via the adapter interface (RoundPeg) and translates them into calls to the wrapped service object (SquarePeg) in a format it can understand"},"Bridge":{"description":"Bridge lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.","example":"Example: Consider a case that you need to remotely control more than one device. Instead of creating a different class for controlling every device, you can create a bridge between Remote (Abstraction) and Device (Implementation), which allows you to hande many devices by the Device interface."},"Composite":{"description":"Composite lets you compose objects into tree structures and then work with these structures as if they were individual objects.","example":"Example: Consider the case that you need to draw an image consisted of dots or circles.  A compound shape (CompoundGraphic) passes the request recursively to all its children and “sums up” the result."},"Decorator":{"description":"Decorator lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.","example":"Example: The application wraps the data source object (FileDataSource) with a pair of decorators (EncryptionDecorator and CompressionDecorator). Both wrappers change the way the data is written to and read from the disk. Just before the data is written to disk, the decorators encrypt and compress it. Right after the data is read from disk, it goes through the same decorators, which decompress and decode it. "},"Facade":{"description":"Facade is a simplified interface to a library, a framework, or any other complex set of classes(complex subsystem) and provides only the features that the client cares about.","example":"Example: Consider a case you want your code to interact with a complex video conversion framework. A facade class encapsulates that functionality and hides it from the rest of the code."},"Flyweight":{"description":"","example":""},"Proxy":{"description":"","example":""},"ChainofResponsibility":{},"Command":{"description":"","example":""},"Interpeter":{"description":"","example":""},"Iterator":{"description":"","example":""},"Mediator":{"description":"","example":""},"Memento":{"description":"","example":""},"Observer":{"description":"","example":""},"State":{"description":"","example":""},"Strategy":{"description":"","example":""},"TemplateMethod":{"description":"","example":""},"Visitor":{"description":"","example":""}}');

/***/ }),

/***/ "../extension/src/browser/style/img/AbstractFactoryIcon.jpg":
/*!******************************************************************!*\
  !*** ../extension/src/browser/style/img/AbstractFactoryIcon.jpg ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ab84da3818bcb2f28ccb..jpg";

/***/ }),

/***/ "../extension/src/browser/style/img/AdapterIcon.jpg":
/*!**********************************************************!*\
  !*** ../extension/src/browser/style/img/AdapterIcon.jpg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0a17945d72c03c04273c..jpg";

/***/ }),

/***/ "../extension/src/browser/style/img/BridgeIcon.jpg":
/*!*********************************************************!*\
  !*** ../extension/src/browser/style/img/BridgeIcon.jpg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "8137fb52632a86d7c037..jpg";

/***/ }),

/***/ "../extension/src/browser/style/img/BuilderIcon.jpg":
/*!**********************************************************!*\
  !*** ../extension/src/browser/style/img/BuilderIcon.jpg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "46cfd581428cc3061e59..jpg";

/***/ }),

/***/ "../extension/src/browser/style/img/CompositeIcon.jpg":
/*!************************************************************!*\
  !*** ../extension/src/browser/style/img/CompositeIcon.jpg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "37d1b01e0a96837f023c..jpg";

/***/ }),

/***/ "../extension/src/browser/style/img/DecoratorIcon.jpg":
/*!************************************************************!*\
  !*** ../extension/src/browser/style/img/DecoratorIcon.jpg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "4b83a266267417554fea..jpg";

/***/ }),

/***/ "../extension/src/browser/style/img/PrototypeIcon.jpg":
/*!************************************************************!*\
  !*** ../extension/src/browser/style/img/PrototypeIcon.jpg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "81f123ed48bc8ef24775..jpg";

/***/ }),

/***/ "../extension/src/browser/style/img/SingletonIcon.jpg":
/*!************************************************************!*\
  !*** ../extension/src/browser/style/img/SingletonIcon.jpg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "774412fc12308efad6e1..jpg";

/***/ }),

/***/ "../node_modules/css-loader/index.js!../extension/src/browser/style/index.css":
/*!************************************************************************************!*\
  !*** ../node_modules/css-loader/index.js!../extension/src/browser/style/index.css ***!
  \************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var escape = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/url/escape.js */ "../node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.id, "#widget-container{\r\n  max-width: 100%;\r\n}\r\n#widget-container h2 {\r\n    color: var(--theia-ui-font-color1);\r\n    font-size: 12px;\r\n    font-weight: 400;\r\n    padding: 10px;\r\n    text-transform: uppercase;\r\n}\r\n\r\n#issues input{\r\n\tmargin-left: 10px;\r\n\tbackground: transparent;\r\n    border: none;\r\n    color: white;\r\n\r\n    max-width: 100%;\r\n    height: 20px;\r\n\r\n}\r\n\r\n#TD{\r\n\tdisplay: none;\r\n\tmargin-left: 10px;\r\n\tmargin-top: 20px;\r\n}\r\n#show_pattern_table td {\r\n\twidth: 200px;\r\n}\r\n#issues{\r\n\tmargin-left: 10px;\r\n  margin-right: 10px;\r\n  max-width: 100%;\r\n}\r\n\r\n.divIssue{\r\n\tborder-style: solid;\r\n    border-width: thin;\r\n    margin: 5px;\r\n\tpadding: 2px;\r\n\tborder-color: #6a6a6a;\r\n}\r\n\r\n.divIssue i{\r\n    font-size: 12px;\r\n}\r\n\r\n.divIssue span{\r\n\tfloat: right;\r\n}\r\n\r\n.divIssue p{\r\n\tdisplay: block;\r\n    font-size: 13px;\r\n\tmargin: auto;\r\n\tmargin-top: 3px;\r\n}\r\n.btn-get-classes{\r\n\tdisplay: hidden;\r\n}\r\n\r\n.suggestions {\r\n  border: 1px #ccc;\r\n  margin-left: 10px;\r\n  margin-top: 25px;\r\n  width:190px;\r\n  position: absolute;\r\n  background-color: #3c3c3c;\r\n  padding-left: 2px;\r\n}\r\n.suggestions ul {\r\n  list-style-type: none;\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n.suggestions ul li {\r\n  padding: 3px 0;\r\n}\r\n.suggestions ul li:hover {\r\n  background: #eee;\r\n}\r\n#btnFinalize{\r\n  margin-left: 10px;\r\n}\r\n#image{\r\n  max-width: 100%;\r\n  height: auto;\r\n}\r\n#elements{\r\n  max-width: 100%;\r\n  visibility: hidden;\r\n}\r\n.AbstractFactory{\r\n  content : url(" + escape(__webpack_require__(/*! ./img/AbstractFactoryIcon.jpg */ "../extension/src/browser/style/img/AbstractFactoryIcon.jpg")) + ");\r\n}\r\n.Adapter{\r\n  content : url(" + escape(__webpack_require__(/*! ./img/AdapterIcon.jpg */ "../extension/src/browser/style/img/AdapterIcon.jpg")) + ");\r\n}\r\n.Bridge{\r\n  content : url(" + escape(__webpack_require__(/*! ./img/BridgeIcon.jpg */ "../extension/src/browser/style/img/BridgeIcon.jpg")) + ");\r\n}\r\n.Builder{\r\n  content : url(" + escape(__webpack_require__(/*! ./img/BuilderIcon.jpg */ "../extension/src/browser/style/img/BuilderIcon.jpg")) + ");\r\n}\r\n.Composite{\r\n  content : url(" + escape(__webpack_require__(/*! ./img/CompositeIcon.jpg */ "../extension/src/browser/style/img/CompositeIcon.jpg")) + ");\r\n}\r\n.Decorator{\r\n  content : url(" + escape(__webpack_require__(/*! ./img/DecoratorIcon.jpg */ "../extension/src/browser/style/img/DecoratorIcon.jpg")) + ");\r\n}\r\n.FactoryMethod{\r\n  content : url(" + escape(__webpack_require__(/*! ./img/AdapterIcon.jpg */ "../extension/src/browser/style/img/AdapterIcon.jpg")) + ");\r\n}\r\n.Prototype{\r\n  content : url(" + escape(__webpack_require__(/*! ./img/PrototypeIcon.jpg */ "../extension/src/browser/style/img/PrototypeIcon.jpg")) + ");\r\n}\r\n.Singleton{\r\n  content : url(" + escape(__webpack_require__(/*! ./img/SingletonIcon.jpg */ "../extension/src/browser/style/img/SingletonIcon.jpg")) + ");\r\n}\r\n\r\n#divWiz input{\r\n  margin-right: 20px;\r\n}\r\n\r\n\r\n", ""]);

// exports


/***/ }),

/***/ "../extension/lib/browser/extension-contribution.js":
/*!**********************************************************!*\
  !*** ../extension/lib/browser/extension-contribution.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extensionContribution = exports.extensionCommand = void 0;
const inversify_1 = __webpack_require__(/*! inversify */ "../node_modules/inversify/lib/inversify.js");
const extension_widget_1 = __webpack_require__(/*! ./extension-widget */ "../extension/lib/browser/extension-widget.js");
const browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "../node_modules/@theia/core/lib/browser/index.js");
exports.extensionCommand = { id: 'extension-widget:command' };
let extensionContribution = class extensionContribution extends browser_1.AbstractViewContribution {
    /**
     * `AbstractViewContribution` handles the creation and registering
     *  of the widget including commands, menus, and keybindings.
     *
     * We can pass `defaultWidgetOptions` which define widget properties such as
     * its location `area` (`main`, `left`, `right`, `bottom`), `mode`, and `ref`.
     *
     */
    constructor() {
        super({
            widgetId: extension_widget_1.extensionWidget.ID,
            widgetName: extension_widget_1.extensionWidget.LABEL,
            defaultWidgetOptions: { area: 'left' },
            toggleCommandId: exports.extensionCommand.id
        });
    }
    /**
     * Example command registration to open the widget from the menu, and quick-open.
     * For a simpler use case, it is possible to simply call:
     ```ts
        super.registerCommands(commands)
     ```
     *
     * For more flexibility, we can pass `OpenViewArguments` which define
     * options on how to handle opening the widget:
     *
     ```ts
        toggle?: boolean
        activate?: boolean;
        reveal?: boolean;
     ```
     *
     * @param commands
     */
    registerCommands(commands) {
        commands.registerCommand(exports.extensionCommand, {
            execute: () => super.openView({ activate: false, reveal: true })
        });
    }
    /**
     * Example menu registration to contribute a menu item used to open the widget.
     * Default location when extending the `AbstractViewContribution` is the `View` main-menu item.
     *
     * We can however define new menu path locations in the following way:
     ```ts
        menus.registerMenuAction(CommonMenus.HELP, {
            commandId: 'id',
            label: 'label'
        });
     ```
     *
     * @param menus
     */
    registerMenus(menus) {
        super.registerMenus(menus);
    }
};
extensionContribution = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], extensionContribution);
exports.extensionContribution = extensionContribution;
/*
export const ExtensionCommand = {
    id: 'Extension.command',
    label: "Say Hello"
};

@injectable()
export class ExtensionCommandContribution implements CommandContribution {

    constructor(
        @inject(HelloBackendWithClientService) private readonly helloBackendWithClientService: HelloBackendWithClientService,
        @inject(HelloBackendService) private readonly helloBackendService: HelloBackendService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(SayHelloViaBackendCommandWithCallBack, {
            execute: () => this.helloBackendWithClientService.greet().then(r => console.log(r))
        });
        registry.registerCommand(SayHelloViaBackendCommand, {
            execute: () => this.helloBackendService.sayHelloTo('World').then(r => console.log(r))
        });
    }
}

@injectable()
export class ExtensionMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: ExtensionCommand.id,
            label: ExtensionCommand.label
        });
    }
}
*/ 


/***/ }),

/***/ "../extension/lib/browser/extension-frontend-module.js":
/*!*************************************************************!*\
  !*** ../extension/lib/browser/extension-frontend-module.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const inversify_1 = __webpack_require__(/*! inversify */ "../node_modules/inversify/lib/inversify.js");
const extension_widget_1 = __webpack_require__(/*! ./extension-widget */ "../extension/lib/browser/extension-widget.js");
const extension_contribution_1 = __webpack_require__(/*! ./extension-contribution */ "../extension/lib/browser/extension-contribution.js");
const browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "../node_modules/@theia/core/lib/browser/index.js");
const protocol_1 = __webpack_require__(/*! ../common/protocol */ "../extension/lib/common/protocol.js");
const browser_2 = __webpack_require__(/*! @theia/core/lib/browser */ "../node_modules/@theia/core/lib/browser/index.js");
__webpack_require__(/*! ../../src/browser/style/index.css */ "../extension/src/browser/style/index.css");
exports.default = new inversify_1.ContainerModule(bind => {
    browser_1.bindViewContribution(bind, extension_contribution_1.extensionContribution);
    bind(browser_1.FrontendApplicationContribution).toService(extension_contribution_1.extensionContribution);
    bind(extension_widget_1.extensionWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(ctx => ({
        id: extension_widget_1.extensionWidget.ID,
        createWidget: () => ctx.container.get(extension_widget_1.extensionWidget)
    })).inSingletonScope();
    bind(protocol_1.HelloBackendService).toDynamicValue(ctx => {
        const connection = ctx.container.get(browser_2.WebSocketConnectionProvider);
        return connection.createProxy(protocol_1.HELLO_BACKEND_PATH);
    }).inSingletonScope();
    bind(protocol_1.HelloBackendWithClientService).toDynamicValue(ctx => {
        const connection = ctx.container.get(browser_2.WebSocketConnectionProvider);
        const backendClient = ctx.container.get(protocol_1.BackendClient);
        return connection.createProxy(protocol_1.HELLO_BACKEND_WITH_CLIENT_PATH, backendClient);
    }).inSingletonScope();
});


/***/ }),

/***/ "../extension/lib/browser/extension-widget.js":
/*!****************************************************!*\
  !*** ../extension/lib/browser/extension-widget.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extensionWidget = void 0;
const React = __importStar(__webpack_require__(/*! react */ "../node_modules/react/index.js"));
const inversify_1 = __webpack_require__(/*! inversify */ "../node_modules/inversify/lib/inversify.js");
const alert_message_1 = __webpack_require__(/*! @theia/core/lib/browser/widgets/alert-message */ "../node_modules/@theia/core/lib/browser/widgets/alert-message.js");
const react_widget_1 = __webpack_require__(/*! @theia/core/lib/browser/widgets/react-widget */ "../node_modules/@theia/core/lib/browser/widgets/react-widget.js");
const core_1 = __webpack_require__(/*! @theia/core */ "../node_modules/@theia/core/lib/common/index.js");
const protocol_1 = __webpack_require__(/*! ../common/protocol */ "../extension/lib/common/protocol.js");
const data_json_1 = __importDefault(__webpack_require__(/*! ./data.json */ "../extension/lib/browser/data.json"));
const explanation_json_1 = __importDefault(__webpack_require__(/*! ./explanation.json */ "../extension/lib/browser/explanation.json"));
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
                    React.createElement("table", { id: "show_pattern_table" }),
                    React.createElement("div", { id: "elements" },
                        React.createElement("button", { id: "btnFinalize", type: "button", title: 'Get the code according to the pattern', onClick: _a => this.buttonClick2(document.getElementById('show_pattern_table').rows.length) }, " Get Code "),
                        React.createElement("p", { id: 'description' }),
                        React.createElement("p", { id: 'example' }),
                        React.createElement("img", { id: "image", alt: "Class Diagram " })))),
            React.createElement("div", { id: "divWiz" }));
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
            document.getElementById("elements").style.visibility = 'visible';
            document.getElementById('image').className = extensionWidget_1.state.statePatternSelection;
            document.getElementById('description').innerHTML = extensionWidget_1.explanation[extensionWidget_1.state.statePatternSelection].description;
            document.getElementById('example').innerHTML = extensionWidget_1.explanation[extensionWidget_1.state.statePatternSelection].example;
            await this.helloBackendService.main();
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
        let divCont = document.createElement('div');
        let myForm = document.createElement('form');
        let labelQuestion = document.createElement('label');
        labelQuestion.innerHTML = 'Choose the type of the pattern: <br>';
        let label1 = document.createElement('label');
        label1.innerHTML = 'Creational';
        let radio1 = document.createElement('input');
        radio1.name = 'patternTypes';
        radio1.id = 'radioCreatonal';
        radio1.type = 'radio';
        radio1.onclick = function () {
            divCont.innerHTML = "";
            let divCont2 = document.createElement('div');
            let labelQuestion = document.createElement('label');
            labelQuestion.innerHTML = '<br> Do you want to create a completely new object or to create one by  reusing an existing one?<br>';
            let label11 = document.createElement('label');
            label11.innerHTML = 'Create new object';
            let radio11 = document.createElement('input');
            radio11.name = 'new_existed';
            radio11.type = 'radio';
            radio11.onclick = function () {
                divCont2.innerHTML = "";
                let divCont3 = document.createElement('div');
                let labelQuestion = document.createElement('label');
                labelQuestion.innerHTML = '<br> Give the name of the Product that you want to create (Let X the name of the product)<br>';
                let prodName = document.createElement('input');
                prodName.type = 'text';
                let buttonNext = document.createElement('button');
                buttonNext.innerHTML = 'Next';
                buttonNext.onclick = function () {
                    divCont3.innerHTML = "";
                    let divCont4 = document.createElement('div');
                    let labelQuestion = document.createElement('label');
                    labelQuestion.innerHTML = '<br> Does the Product has sub-categories (Concrete Products)? <br>';
                    let label31 = document.createElement('label');
                    label31.innerHTML = 'Yes';
                    let radio31 = document.createElement('input');
                    radio31.name = 'yes_no';
                    radio31.type = 'radio';
                    radio31.onclick = function () {
                        divCont4.innerHTML = "";
                        let divCont5 = document.createElement('div');
                        let labelQuestion = document.createElement('label');
                        labelQuestion.innerHTML = '<br> How many sub-categories exist? <br>';
                        let subNum = document.createElement('input');
                        subNum.id = 'subcategoriesNum';
                        subNum.type = 'number';
                        let buttonNext = document.createElement('button');
                        buttonNext.innerHTML = 'Next';
                        buttonNext.onclick = function () {
                            divCont5.innerHTML = "";
                            let divCont6 = document.createElement('div');
                            let labelQuestion = document.createElement('label');
                            labelQuestion.innerHTML = '<br> Please give the names of the Concrete Products <br>';
                            divCont5.appendChild(labelQuestion);
                            let num = parseInt(document.getElementById('subcategoriesNum').value);
                            for (var i = 1; i <= num; i++) {
                                let field = document.createElement('input');
                                field.id = 'txtfield' + i;
                                field.type = 'text';
                                divCont5.appendChild(field);
                            }
                            let buttonNext = document.createElement('button');
                            buttonNext.innerHTML = 'Next';
                            buttonNext.onclick = function () {
                                divCont6.innerHTML = "";
                                let divCont7 = document.createElement('div');
                                let labelQuestion = document.createElement('label');
                                labelQuestion.innerHTML = '<br> Can the Products be classified in a Family? <br>';
                                let label61 = document.createElement('label');
                                label61.innerHTML = 'Yes';
                                let radio61 = document.createElement('input');
                                radio61.name = 'yes_no';
                                radio61.type = 'radio';
                                radio61.onclick = function () {
                                    divCont7.innerHTML = "";
                                    let divCont8 = document.createElement('div');
                                    let labelQuestion = document.createElement('label');
                                    labelQuestion.innerHTML = '<br> How many Families of Products exist? <br>';
                                    let famNum = document.createElement('input');
                                    famNum.id = 'familiesNum';
                                    famNum.type = 'number';
                                    let buttonNext = document.createElement('button');
                                    buttonNext.innerHTML = 'Next';
                                    buttonNext.onclick = function () {
                                        divCont8.innerHTML = "";
                                        let labelQuestion = document.createElement('label');
                                        labelQuestion.innerHTML = '<br> Please give the names of the Components <br>';
                                        divCont8.appendChild(labelQuestion);
                                        let num = parseInt(document.getElementById('familiesNum').value);
                                        for (var i = 1; i <= num; i++) {
                                            let field = document.createElement('input');
                                            field.id = 'txtfield' + i;
                                            field.type = 'text';
                                            divCont8.appendChild(field);
                                        }
                                        let buttonNext = document.createElement('button');
                                        buttonNext.innerHTML = 'Next';
                                        buttonNext.onclick = function () {
                                            let labelQuestion = document.createElement('label');
                                            labelQuestion.innerHTML = '<br> Abstract Factory Pattern ';
                                            let buttonCode = document.createElement('button');
                                            buttonCode.innerHTML = 'Get Code';
                                            buttonCode.onclick = function () {
                                                //code generation
                                            };
                                            divCont8.appendChild(labelQuestion);
                                            divCont8.appendChild(buttonCode);
                                        };
                                        divCont8.appendChild(buttonNext);
                                    };
                                    divCont7.appendChild(labelQuestion);
                                    divCont7.appendChild(famNum);
                                    divCont7.appendChild(buttonNext);
                                    divCont7.appendChild(divCont8);
                                };
                                let label62 = document.createElement('label');
                                label62.innerHTML = 'No';
                                let radio62 = document.createElement('input');
                                radio62.name = 'yes_no';
                                radio62.type = 'radio';
                                radio62.onclick = function () {
                                    divCont7.innerHTML = "";
                                    let divCont8 = document.createElement('div');
                                    let labelQuestion = document.createElement('label');
                                    labelQuestion.innerHTML = '<br> Can Product be created as series of steps which is different in every subcategory? <br>';
                                    let label71 = document.createElement('label');
                                    label71.innerHTML = 'Yes';
                                    let radio71 = document.createElement('input');
                                    radio71.name = 'yes_no';
                                    radio71.type = 'radio';
                                    radio71.onclick = function () {
                                        let labelQuestion = document.createElement('label');
                                        labelQuestion.innerHTML = '<br> How many Steps are involved ?  <br>';
                                        let stepsNum = document.createElement('input');
                                        stepsNum.id = 'stepsNum';
                                        stepsNum.type = 'number';
                                        let buttonNext = document.createElement('button');
                                        buttonNext.innerHTML = 'Next';
                                        buttonNext.onclick = function () {
                                            let labelQuestion = document.createElement('label');
                                            labelQuestion.innerHTML = '<br> Please give the name of the steps  <br>';
                                            divCont8.appendChild(labelQuestion);
                                            let num = parseInt(document.getElementById('stepsNum').value);
                                            for (var i = 1; i <= num; i++) {
                                                let field = document.createElement('input');
                                                field.id = 'txtfield' + i; //name
                                                field.type = 'text';
                                                divCont8.appendChild(field);
                                            }
                                            let buttonNext = document.createElement('button');
                                            buttonNext.innerHTML = 'Next';
                                            buttonNext.onclick = function () {
                                                let labelQuestion = document.createElement('label');
                                                labelQuestion.innerHTML = '<br> Builder Pattern ';
                                                let buttonCode = document.createElement('button');
                                                buttonCode.innerHTML = 'Get Code';
                                                buttonCode.onclick = function () {
                                                    //code generation
                                                };
                                                divCont8.appendChild(labelQuestion);
                                                divCont8.appendChild(buttonCode);
                                            };
                                            divCont8.appendChild(buttonNext);
                                        };
                                        divCont8.appendChild(labelQuestion);
                                        divCont8.appendChild(stepsNum);
                                        divCont8.appendChild(buttonNext);
                                    };
                                    let label72 = document.createElement('label');
                                    label72.innerHTML = 'No';
                                    let radio72 = document.createElement('input');
                                    radio72.name = 'yes_no';
                                    radio72.type = 'radio';
                                    radio72.onclick = function () {
                                        let labelQuestion = document.createElement('label');
                                        labelQuestion.innerHTML = '<br> What is the name of the Creator (e.g., Oven) of Product? <br>';
                                        let field = document.createElement('input');
                                        field.id = 'txtfield';
                                        field.type = 'text';
                                        let buttonNext = document.createElement('button');
                                        buttonNext.innerHTML = 'Next';
                                        buttonNext.onclick = function () {
                                            let labelQuestion = document.createElement('label');
                                            labelQuestion.innerHTML = '<br> Factory Method Pattern';
                                            let buttonCode = document.createElement('button');
                                            buttonCode.innerHTML = 'Get Code';
                                            buttonCode.onclick = function () {
                                                //code generation
                                            };
                                            divCont8.appendChild(labelQuestion);
                                            divCont8.appendChild(buttonCode);
                                        };
                                        divCont8.appendChild(labelQuestion);
                                        divCont8.appendChild(field);
                                        divCont8.appendChild(buttonNext);
                                    };
                                    divCont7.appendChild(labelQuestion);
                                    divCont7.appendChild(label71);
                                    divCont7.appendChild(radio71);
                                    divCont7.appendChild(label72);
                                    divCont7.appendChild(radio72);
                                    divCont7.appendChild(divCont8);
                                };
                                divCont6.appendChild(labelQuestion);
                                divCont6.appendChild(label61);
                                divCont6.appendChild(radio61);
                                divCont6.appendChild(label62);
                                divCont6.appendChild(radio62);
                                divCont6.appendChild(divCont7);
                            };
                            divCont5.appendChild(buttonNext);
                            divCont5.appendChild(divCont6);
                        };
                        divCont4.appendChild(labelQuestion);
                        divCont4.appendChild(subNum);
                        divCont4.appendChild(buttonNext);
                        divCont4.appendChild(divCont5);
                    };
                    let label32 = document.createElement('label');
                    label32.innerHTML = 'No';
                    let radio32 = document.createElement('input');
                    radio32.name = 'yes_no';
                    radio32.type = 'radio';
                    radio32.onclick = function () {
                        divCont4.innerHTML = "";
                        let labelQuestion = document.createElement('label');
                        labelQuestion.innerHTML = '<br> There is no pattern <br>';
                        divCont4.appendChild(labelQuestion);
                    };
                    divCont3.appendChild(labelQuestion);
                    divCont3.appendChild(label31);
                    divCont3.appendChild(radio31);
                    divCont3.appendChild(label32);
                    divCont3.appendChild(radio32);
                    divCont3.appendChild(divCont4);
                };
                divCont2.appendChild(labelQuestion);
                divCont2.appendChild(prodName);
                divCont2.appendChild(buttonNext);
                divCont2.appendChild(divCont3);
            };
            let label12 = document.createElement('label');
            label12.innerHTML = 'Reuse an existing one';
            let radio12 = document.createElement('input');
            radio12.name = 'new_existed';
            radio12.type = 'radio';
            radio12.onclick = function () {
                divCont2.innerHTML = "";
                let labelQuestion = document.createElement('label');
                labelQuestion.innerHTML = '<br> You chose existed <br>';
                divCont2.appendChild(labelQuestion);
            };
            divCont.appendChild(labelQuestion);
            divCont.appendChild(label11);
            divCont.appendChild(radio11);
            divCont.appendChild(label12);
            divCont.appendChild(radio12);
            divCont.appendChild(divCont2);
        };
        let label2 = document.createElement('label');
        label2.innerHTML = 'Structural';
        let radio2 = document.createElement('input');
        radio2.name = 'patternTypes';
        radio2.type = 'radio';
        radio2.onclick = function () {
            divCont.innerHTML = "";
            let labelQuestion = document.createElement('label');
            labelQuestion.innerHTML = '<br> Do you want to ... <br>';
            divCont.appendChild(labelQuestion);
        };
        let label3 = document.createElement('label');
        label3.innerHTML = 'Behavioral';
        let radio3 = document.createElement('input');
        radio3.name = 'patternTypes';
        radio3.type = 'radio';
        radio3.onclick = function () {
            divCont.innerHTML = "";
            let labelQuestion = document.createElement('label');
            labelQuestion.innerHTML = '<br> Do you want to blablabla <br>';
            divCont.appendChild(labelQuestion);
        };
        myForm.appendChild(label1);
        myForm.appendChild(radio1);
        myForm.appendChild(label2);
        myForm.appendChild(radio2);
        myForm.appendChild(label3);
        myForm.appendChild(radio3);
        divWiz.appendChild(labelQuestion);
        divWiz.appendChild(myForm);
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


/***/ }),

/***/ "../extension/lib/common/protocol.js":
/*!*******************************************!*\
  !*** ../extension/lib/common/protocol.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackendClient = exports.HELLO_BACKEND_WITH_CLIENT_PATH = exports.HelloBackendWithClientService = exports.HELLO_BACKEND_PATH = exports.HelloBackendService = void 0;
exports.HelloBackendService = Symbol('HelloBackendService');
exports.HELLO_BACKEND_PATH = '/services/helloBackend';
exports.HelloBackendWithClientService = Symbol('BackendWithClient');
exports.HELLO_BACKEND_WITH_CLIENT_PATH = '/services/withClient';
exports.BackendClient = Symbol('BackendClient');


/***/ }),

/***/ "../node_modules/@theia/core/lib/browser/widgets/alert-message.js":
/*!************************************************************************!*\
  !*** ../node_modules/@theia/core/lib/browser/widgets/alert-message.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AlertMessage = void 0;
const React = __webpack_require__(/*! react */ "../node_modules/react/index.js");
const widget_1 = __webpack_require__(/*! ./widget */ "../node_modules/@theia/core/lib/browser/widgets/widget.js");
const AlertMessageIcon = {
    INFO: widget_1.codicon('info'),
    SUCCESS: widget_1.codicon('pass'),
    WARNING: widget_1.codicon('warning'),
    ERROR: widget_1.codicon('error')
};
class AlertMessage extends React.Component {
    render() {
        return React.createElement("div", { className: 'theia-alert-message-container' },
            React.createElement("div", { className: `theia-${this.props.type.toLowerCase()}-alert` },
                React.createElement("div", { className: 'theia-message-header' },
                    React.createElement("i", { className: AlertMessageIcon[this.props.type] }),
                    "\u00A0",
                    this.props.header),
                React.createElement("div", { className: 'theia-message-content' }, this.props.children)));
    }
}
exports.AlertMessage = AlertMessage;


/***/ }),

/***/ "../extension/src/browser/style/index.css":
/*!************************************************!*\
  !*** ../extension/src/browser/style/index.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_index_js_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/index.js!./index.css */ "../node_modules/css-loader/index.js!../extension/src/browser/style/index.css");
/* harmony import */ var _node_modules_css_loader_index_js_index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_index_js_index_css__WEBPACK_IMPORTED_MODULE_1__);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_css_loader_index_js_index_css__WEBPACK_IMPORTED_MODULE_1___default()), options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_css_loader_index_js_index_css__WEBPACK_IMPORTED_MODULE_1___default().locals) || {});

/***/ })

}]);
//# sourceMappingURL=extension_lib_browser_extension-frontend-module_js.bundle.js.map