"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = (function () {
    function Node(name) {
        this.name = name;
        this.parent = null;
        this.childs = [];
        this.inputs = [];
        this.outputs = [];
    }
    Node.prototype.getName = function () {
        return this.name;
    };
    Node.prototype.addInput = function (input) {
        if (this.inputs.filter(function (value) {
            return (value.getName() === input.getName());
        }).length > 0) {
            return false;
        }
        this.inputs.push(input);
        return true;
    };
    Node.prototype.removeInput = function (name) {
        var i = 0;
        while (i < this.inputs.length && this.inputs[i].getName() !== name) {
            i++;
        }
        if (i < this.inputs.length)
            this.inputs = this.inputs.slice(i, 1);
        return (i < this.inputs.length);
    };
    Node.prototype.addOutput = function (output) {
        if (this.outputs.filter(function (value) {
            return (value.getName() === output.getName());
        }).length > 0) {
            return false;
        }
        this.outputs.push(output);
        return true;
    };
    Node.prototype.removeOutput = function (name) {
        var i = 0;
        while (i < this.outputs.length && this.outputs[i].getName() !== name) {
            i++;
        }
        if (i < this.outputs.length)
            this.outputs = this.outputs.slice(i, 1);
        return (i < this.outputs.length);
    };
    Node.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    Node.prototype.addChild = function (child) {
        if (this.childs.filter(function (value) {
            return (value.getName() === child.getName());
        }).length > 0) {
            return false;
        }
        this.childs.push(child);
        return true;
    };
    Node.prototype.removeChild = function (name) {
        var i = 0;
        while (i < this.childs.length && this.childs[i].getName() !== name) {
            i++;
        }
        if (i < this.childs.length)
            this.childs = this.childs.slice(i, 1);
        return (i < this.childs.length);
    };
    Node.prototype.isRoot = function () {
        return this.parent === null;
    };
    Node.prototype.isLeaf = function () {
        return this.childs.length === 0;
    };
    Node.prototype.setInputs = function (inputs) {
        this.inputs = inputs;
    };
    Node.prototype.getInputs = function () {
        return this.inputs;
    };
    Node.prototype.setOutputs = function (outputs) {
        this.outputs = outputs;
    };
    Node.prototype.getOutputs = function () {
        return this.outputs;
    };
    return Node;
}());
exports.default = Node;
//# sourceMappingURL=Node.js.map