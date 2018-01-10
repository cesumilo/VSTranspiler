"use strict";
/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */
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
exports.__esModule = true;
var Node_1 = require("./graph/Node");
var Gate_1 = require("./graph/Gate");
var Graph_1 = require("./graph/Graph");
var AddNode = /** @class */ (function (_super) {
    __extends(AddNode, _super);
    function AddNode(name) {
        return _super.call(this, name) || this;
    }
    AddNode.prototype.compute = function () {
        var output = this.outputs[0];
        var a = this.inputs[0];
        var b = this.inputs[1];
        output.setValue(a.getValue() + b.getValue());
        console.log(output);
        return (this.isLeaf() ? null : this.childs[0]);
    };
    return AddNode;
}(Node_1["default"]));
var SubtractNode = /** @class */ (function (_super) {
    __extends(SubtractNode, _super);
    function SubtractNode(name) {
        return _super.call(this, name) || this;
    }
    SubtractNode.prototype.compute = function () {
        var output = this.outputs[0];
        var a = this.inputs[0];
        var b = this.inputs[1];
        output.setValue(a.getValue() - b.getValue());
        console.log(output);
        return (this.isLeaf() ? null : this.childs[0]);
    };
    return SubtractNode;
}(Node_1["default"]));
function main() {
    var graph = new Graph_1["default"]("graph");
    var addNode = new AddNode("add node");
    var subNode = new SubtractNode("sub node");
    var a = new Gate_1["default"]("a");
    var b = new Gate_1["default"]("b");
    var c = new Gate_1["default"]("b");
    var addResult = new Gate_1["default"]("addResult");
    var subtractResult = new Gate_1["default"]("subtractResult");
    addNode.addOutput(addResult);
    subNode.addOutput(subtractResult);
    graph.addNode(addNode);
    graph.addNode(subNode);
    graph.addInput(a);
    graph.addInput(b);
    graph.addReference(subNode.getName(), addResult);
    graph.addReference(subNode.getName(), c);
    graph.addLink(addNode.getName(), subNode.getName());
    a.setValue(10);
    b.setValue(10);
    c.setValue(5);
    graph.compute();
    var output = graph.getOutputs()[0];
    console.log("10 + 10 - 5 = ", output.getValue());
}
main();
