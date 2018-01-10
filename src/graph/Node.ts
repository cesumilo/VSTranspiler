/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */

import IGate from './IGate';

abstract class Node {

    constructor(name: string) {
        this.name = name;
        this.computed = false;
        this.parent = null;
        this.childs = [];
        this.inputs = [];
        this.outputs = [];
    }

    getName(): string {
        return this.name;
    }

    addInput(input: IGate): boolean {
        if (this.inputs.filter((value) => {
            return (value.getName() === input.getName());
        }).length > 0) {
            return false;
        }

        this.inputs.push(input);
        return true;
    }

    removeInput(name: string): boolean {
        let i = 0;

        while (i < this.inputs.length && this.inputs[i].getName() !== name) {
            i++;
        }

        if (i < this.inputs.length)
            this.inputs = this.inputs.slice(i, 1);

        return (i < this.inputs.length);
    }

    addOutput(output: IGate): boolean {
        if (this.outputs.filter((value) => {
                return (value.getName() === output.getName());
            }).length > 0) {
            return false;
        }

        this.inputs.push(output);
        return true;
    }

    removeOutput(name: string): boolean {
        let i = 0;

        while (i < this.outputs.length && this.outputs[i].getName() !== name) {
            i++;
        }

        if (i < this.outputs.length)
            this.outputs = this.outputs.slice(i, 1);

        return (i < this.outputs.length);
    }

    setParent(parent: Node): void {
        this.parent = parent;
    }

    addChild(child: Node): boolean {
        if (this.childs.filter((value) => {
                return (value.getName() === child.getName());
            }).length > 0) {
            return false;
        }

        this.childs.push(child);
        return true;
    }

    removeChild(name: string): boolean {
        let i = 0;

        while (i < this.childs.length && this.childs[i].getName() !== name) {
            i++;
        }

        if (i < this.childs.length)
            this.childs = this.childs.slice(i, 1);

        return (i < this.childs.length);
    }

    isRoot(): boolean {
        return this.parent === null;
    }

    isLeaf(): boolean {
        return this.childs.length === 0;
    }

    isReady(): boolean {
        return (this.inputs.filter((value) => {
            return (value.isComputed() === false);
        }).length === 0);
    }

    isComputed(): boolean {
        return this.computed;
    }

    hasComputed(): void {
        this.computed = true;
    }

    setInputs(inputs: Array<IGate>): void {
        this.inputs = inputs;
    }

    getInputs(): Array<IGate> {
        return this.inputs;
    }

    setOutputs(outputs: Array<IGate>): void {
        this.outputs = outputs;
    }

    getOutputs(): Array<IGate> {
        return this.outputs;
    }

    reset(): void {
        this.computed = false;
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].reset();
        }
    }

    abstract compute(): void;

    private name: string;
    private computed: boolean;
    private parent: Node;
    private childs: Array<Node>;
    protected inputs: Array<IGate>;
    protected outputs: Array<IGate>;
}

export default Node;