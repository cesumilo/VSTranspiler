"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gate = (function () {
    function Gate(name) {
        this.name = name;
        this.value = null;
        this.computed = false;
    }
    Gate.prototype.setValue = function (value) {
        this.value = value;
        this.computed = true;
    };
    Gate.prototype.reset = function () {
        this.value = null;
        this.computed = false;
    };
    Gate.prototype.getValue = function () {
        return this.value;
    };
    Gate.prototype.isComputed = function () {
        return this.computed;
    };
    Gate.prototype.getName = function () {
        return this.name;
    };
    return Gate;
}());
exports.default = Gate;
//# sourceMappingURL=Gate.js.map