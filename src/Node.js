"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gate_1 = require("./Gate");
var Node = (function () {
    function Node(name, isFork) {
        if (isFork === void 0) { isFork = false; }
        this.name = name;
        this.previous = null;
        this.next = null;
        this.alternative = null;
        this.isFork = isFork;
        this.computed = false;
    }
    Node.prototype.getName = function () {
        return this.name;
    };
    Node.prototype.addInput = function (gate) {
        this.inputs.push(gate);
    };
    Node.prototype.getInput = function (idx) {
        if (idx >= this.inputs.length)
            return null;
        return this.inputs[idx];
    };
    Node.prototype.removeInput = function (idx) {
        if (idx < this.inputs.length)
            this.inputs = this.inputs.slice(idx, 1);
        return (idx < this.inputs.length);
    };
    Node.prototype.addOutput = function (name) {
        this.outputs.push(new Gate_1.default(name));
    };
    Node.prototype.getOutput = function (idx) {
        if (idx >= this.outputs.length)
            return null;
        return this.outputs[idx];
    };
    Node.prototype.setNextNode = function (node) {
        this.next = node;
    };
    Node.prototype.readyToCompute = function () {
        for (var i = 0; i < this.inputs.length; i++) {
            if (this.inputs[i])
                ;
        }
    };
    Node.prototype.activate = function () {
        var result = this.transform();
        if (this.isFork) {
            if (result)
                this.next.activate();
            else
                this.alternative.activate();
        }
        else {
            this.next.activate();
        }
    };
    Node.prototype.transpile = function (language, pretty) {
        if (pretty === void 0) { pretty = false; }
        if (pretty)
            return this.transpilers.getValue(language).pretty();
        return this.transpilers.getValue(language).compact();
    };
    return Node;
}());
exports.default = Node;
//# sourceMappingURL=Node.js.map