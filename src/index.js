"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = require("./graph/Node");
var Gate_1 = require("./graph/Gate");
var AddNode = (function (_super) {
    __extends(AddNode, _super);
    function AddNode(name) {
        return _super.call(this, name) || this;
    }
    AddNode.prototype.compute = function () {
        var output = this.outputs[0];
        var a = this.inputs[0];
        var b = this.inputs[1];
        output.setValue(a.getValue() + b.getValue());
    };
    return AddNode;
}(Node_1.default));
var SubstractNode = (function (_super) {
    __extends(SubstractNode, _super);
    function SubstractNode(name) {
        return _super.call(this, name) || this;
    }
    SubstractNode.prototype.compute = function () {
        var output = this.outputs[0];
        var a = this.inputs[0];
        var b = this.inputs[1];
        output.setValue(a.getValue() - b.getValue());
    };
    return SubstractNode;
}(Node_1.default));
function main() {
    var addNode = new AddNode("add node");
    var subNode = new SubstractNode("sub node");
    var a = new Gate_1.default("a");
    var b = new Gate_1.default("b");
    var addResult = new Gate_1.default("addResult");
    var substractResult = new Gate_1.default("substractResult");
    addNode.addInput(a);
    addNode.addInput(b);
    addNode.addOutput(addResult);
    addNode.addChild(subNode);
    subNode.setParent(addNode);
    subNode.addInput(b);
    subNode.addInput(addResult);
    subNode.addOutput(substractResult);
    a.setValue(10);
    b.setValue(10);
    console.log("a is computed:", a.isComputed(), a.getValue());
    console.log("b is computed:", b.isComputed(), b.getValue());
}
main();
//# sourceMappingURL=index.js.map