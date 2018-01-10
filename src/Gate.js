"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gate = (function () {
    function Gate(name) {
        this.value = null;
        this.name = name;
        this.isCompute = false;
    }
    Gate.prototype.getName = function () {
        return this.name;
    };
    Gate.prototype.set = function (arg) {
        this.value = arg;
        this.isCompute = true;
    };
    Gate.prototype.reset = function () {
        this.isCompute = false;
        this.value = null;
    };
    Gate.prototype.get = function () {
        return this.value;
    };
    Gate.prototype.isComputed = function () {
        return this.isCompute;
    };
    return Gate;
}());
exports.default = Gate;
//# sourceMappingURL=Gate.js.map