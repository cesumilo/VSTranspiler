/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */

import IGate from './IGate';

/** Abstract class representing a Node in a Graph */
abstract class Node {

    /**
     * Creates a new Node.
     * @param {string} name contains the node's name
     */
    constructor(name: string) {
        this.name = name;
        this.parent = null;
        this.childs = [];
        this.inputs = [];
        this.outputs = [];
    }

    /**
     * Returns the node's name.
     * @returns {string} returns the node's name
     */
    getName(): string {
        return this.name;
    }

    /**
     * Adds a new input to the current node.
     * @param {IGate} input contains the input gate to add
     * @returns {boolean} true if the input gate has been added, otherwise false
     */
    addInput(input: IGate): boolean {
        if (this.inputs.filter((value) => {
            return (value.getName() === input.getName());
        }).length > 0) {
            return false;
        }

        this.inputs.push(input);
        return true;
    }

    /**
     * Removes an existing input from the node.
     * @param {string} name contains the name of the input gate
     * @returns {boolean} true if the input gate has been removed, otherwise false
     */
    removeInput(name: string): boolean {
        let i = 0;

        while (i < this.inputs.length && this.inputs[i].getName() !== name) {
            i++;
        }

        if (i < this.inputs.length)
            this.inputs = this.inputs.slice(i, 1);

        return (i < this.inputs.length);
    }

    /**
     * Adds a new output to the current node.
     * @param {IGate} output contains the output gate to add
     * @returns {boolean} true if the output gate has been added, otherwise false
     */
    addOutput(output: IGate): boolean {
        if (this.outputs.filter((value) => {
                return (value.getName() === output.getName());
            }).length > 0) {
            return false;
        }

        this.outputs.push(output);
        return true;
    }

    /**
     * Removes an existing output from the node.
     * @param {string} name contains the name of the output gate to remove
     * @returns {boolean} true if the output gate has been removed, otherwise false
     */
    removeOutput(name: string): boolean {
        let i = 0;

        while (i < this.outputs.length && this.outputs[i].getName() !== name) {
            i++;
        }

        if (i < this.outputs.length)
            this.outputs = this.outputs.slice(i, 1);

        return (i < this.outputs.length);
    }

    /**
     * Sets the parent of the current node.
     * @param {Node} parent contains the parent node object
     */
    setParent(parent: Node): void {
        this.parent = parent;
    }

    /**
     * Adds a new child to the current node.
     * @param {Node} child contains the new child node object
     * @returns {boolean} true if the child has been added, otherwise false
     */
    addChild(child: Node): boolean {
        if (this.childs.filter((value) => {
                return (value.getName() === child.getName());
            }).length > 0) {
            return false;
        }

        this.childs.push(child);
        return true;
    }

    /**
     * Removes an existing child node from the current node.
     * @param {string} name contains the name of the child node
     * @returns {boolean} true if the child node has been removed, otherwise false
     */
    removeChild(name: string): boolean {
        let i = 0;

        while (i < this.childs.length && this.childs[i].getName() !== name) {
            i++;
        }

        if (i < this.childs.length)
            this.childs = this.childs.slice(i, 1);

        return (i < this.childs.length);
    }

    /**
     * Allows to know if the node if the root of a graph.
     * @returns {boolean} true if it has no parent node, otherwise false
     */
    isRoot(): boolean {
        return this.parent === null;
    }

    /**
     * Allows to know if the node is a leaf of the graph,
     * @returns {boolean} true if it has no children nodes, otherwise false
     */
    isLeaf(): boolean {
        return this.childs.length === 0;
    }

    /**
     * Sets the inputs of the node.
     * @param {Array<IGate>} inputs contains an array of input gates
     */
    setInputs(inputs: Array<IGate>): void {
        this.inputs = inputs;
    }

    /**
     * Returns the inputs of the node.
     * @returns {Array<IGate>} return the inputs array
     */
    getInputs(): Array<IGate> {
        return this.inputs;
    }

    /**
     * Sets the outputs of the node.
     * @param {Array<IGate>} outputs contains an array of output gates
     */
    setOutputs(outputs: Array<IGate>): void {
        this.outputs = outputs;
    }

    /**
     * Returns the outputs of the node.
     * @returns {Array<IGate>} return the outputs array
     */
    getOutputs(): Array<IGate> {
        return this.outputs;
    }

    /**
     * Abstract method that has to be defined to compute the output result of the node.
     * @returns {Node} returns the following node if there is, otherwise null
     */
    abstract compute(): Node;

    private name: string;
    private parent: Node;
    protected childs: Array<Node>;
    protected inputs: Array<IGate>;
    protected outputs: Array<IGate>;
}

export default Node;