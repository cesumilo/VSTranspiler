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
var Node_1 = require("./Node");
var Dictionary_1 = require("../shared/Dictionary");
var Graph = /** @class */ (function (_super) {
    __extends(Graph, _super);
    function Graph(name) {
        var _this = _super.call(this, name) || this;
        _this.network = new Dictionary_1["default"]();
        return _this;
    }
    Graph.prototype.addNode = function (node) {
        var containsKey = this.network.containsKey(node.getName());
        if (containsKey === false) {
            this.network.add(node.getName(), node);
        }
        return containsKey;
    };
    Graph.prototype.removeNode = function (name) {
        var containsKey = this.network.containsKey(name);
        if (containsKey === true) {
            this.network.remove(name);
        }
        return containsKey;
    };
    Graph.prototype.addLink = function (parent, child) {
        var containsKeys = this.network.containsKey(parent) && this.network.containsKey(child);
        if (containsKeys) {
            this.network.getValue(parent).addChild(this.network.getValue(child));
            this.network.getValue(child).setParent(this.network.getValue(parent));
        }
        return containsKeys;
    };
    Graph.prototype.removelink = function (parent, child) {
        var removedChild = false;
        var containsKeys = this.network.containsKey(parent) && this.network.containsKey(child);
        if (containsKeys) {
            removedChild = this.network.getValue(parent).removeChild(child);
            this.network.getValue(child).setParent(null);
        }
        return containsKeys && removedChild;
    };
    Graph.prototype.addReference = function (node, value) {
        var addedValue = false;
        var containsKey = this.network.containsKey(node);
        if (containsKey) {
            addedValue = this.network.getValue(node).addInput(value);
        }
        return containsKey && addedValue;
    };
    Graph.prototype.removeReference = function (node, value) {
        var removedValue = false;
        var containsKey = this.network.containsKey(node);
        if (containsKey) {
            removedValue = this.network.getValue(node).removeInput(value);
        }
        return containsKey && removedValue;
    };
    Graph.prototype.compute = function () {
        var current = this.network.values().filter(function (value) { return value.isRoot(); })[0];
        current.setInputs(this.inputs);
        while (!current.isLeaf()) {
            current = current.compute();
        }
        current.compute();
        this.setOutputs(current.getOutputs());
        return (this.isLeaf() ? null : this.childs[0]);
    };
    return Graph;
}(Node_1["default"]));
exports["default"] = Graph;
