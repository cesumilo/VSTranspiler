/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */

import Gate from './Gate';
import ITranspiler from './ITranspiler';
import Dictionary from '../src/shared/Dictionary';

abstract class Node {

    constructor(name: string, isFork: boolean = false) {
        this.name = name;
        this.previous = null;
        this.next = null;
        this.alternative = null;
        this.isFork = isFork;
        this.computed = false;
    }

    getName(): string {
        return this.name;
    }

    addInput<T>(gate: Gate<T>): void {
        this.inputs.push(gate);
    }

    getInput<T>(idx: number): Gate<T> {
        if (idx >= this.inputs.length)
            return null;
        return this.inputs[idx];
    }

    removeInput(idx: number): boolean {
        if (idx < this.inputs.length)
            this.inputs = this.inputs.slice(idx, 1);
        return (idx < this.inputs.length);
    }

    addOutput<T>(name: string): void {
        this.outputs.push(new Gate<T>(name));
    }

    getOutput<T>(idx: number): Gate<T> {
        if (idx >= this.outputs.length)
            return null;
        return this.outputs[idx];
    }

    setNextNode(node: Node): void {
        this.next = node;
    }

    readyToCompute(): boolean {
        for (let i = 0; i < this.inputs.length; i++) {
            if (this.inputs[i])
        }
    }

    activate(): void {
        const result = this.transform();

        if (this.isFork) {
            if (result)
                this.next.activate();
            else
                this.alternative.activate();
        } else {
            this.next.activate();
        }
    }

    transpile(language: string, pretty: boolean = false): string {
        if (pretty)
            return this.transpilers.getValue(language).pretty();
        return this.transpilers.getValue(language).compact();
    }

    abstract transform(): boolean

    private name: string;
    private inputs: Array<any>;
    private outputs: Array<any>;
    private next: Node;
    private alternative: Node;
    private previous: Node;
    private computed: boolean;
    private isFork: boolean;

    protected transpilers: Dictionary<string, ITranspiler>;
}

export default Node;