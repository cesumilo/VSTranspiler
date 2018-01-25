/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */

import Node from './Node';
import Dictionary from "../shared/Dictionary";
import IGate from "./IGate";

/** Class representing a Graph */
class Graph extends Node {

    /**
     * Create a new Node in the Graph.
     * @param {string} name contains the name of the created Graph
     */
    constructor(name: string) {
        super(name);

        this.network = new Dictionary();
    }

    /**
     * Adds a new Node in the Graph.
     * @param {Node} node contains the given node to add in the Graph
     * @returns {boolean} true if the node has been added, otherwise false
     */
    addNode(node: Node): boolean {
        const containsKey = this.network.containsKey(node.getName());

        if (containsKey === false) {
            this.network.add(node.getName(), node);
        }
        return containsKey;
    }

    /**
     * Removes a node from the Graph.
     * @param {string} name contains the node's name to remove from the Graph
     * @returns {boolean} true if the node has been removed, otherwise false
     */
    removeNode(name: string): boolean {
        const containsKey = this.network.containsKey(name);

        if (containsKey === true) {
            this.network.remove(name);
        }
        return containsKey;
    }

    /**
     * Adds a new link between two existing nodes.
     * @param {string} parent contains the name of the node with the outgoing connection
     * @param {string} child contains the name of the node with the ingoing connection
     * @returns {boolean} true if the connection has been made, otherwise false
     */
    addLink(parent: string, child: string): boolean {
        const containsKeys = this.network.containsKey(parent) && this.network.containsKey(child);

        if (containsKeys) {
            this.network.getValue(parent).addChild(this.network.getValue(child));
            this.network.getValue(child).setParent(this.network.getValue(parent));
        }
        return containsKeys;
    }

    /**
     * Removes a link between two existing nodes.
     * @param {string} parent contains the name of the node with the outgoing connection
     * @param {string} child contains the name of the node with the ingoing connection
     * @returns {boolean} true if the connection has been removed, otherwise false
     */
    removelink(parent: string, child: string): boolean {
        let removedChild = false;
        const containsKeys = this.network.containsKey(parent) && this.network.containsKey(child);

        if (containsKeys) {
            removedChild = this.network.getValue(parent).removeChild(child);
            this.network.getValue(child).setParent(null);
        }
        return containsKeys && removedChild;
    }

    /**
     * Adds a reference to a node.
     * @param {string} node contains the node's name to which adding the reference (Gate)
     * @param {IGate} value contains the given gate to add to the node
     * @returns {boolean} true if the reference has been added, otherwise false
     */
    addReference(node: string, value: IGate): boolean {
        let addedValue = false;
        const containsKey = this.network.containsKey(node);

        if (containsKey) {
            addedValue = this.network.getValue(node).addInput(value);
        }
        return containsKey && addedValue;
    }

    /**
     * Removes a reference from a node.
     * @param {string} node contains the node's name to which removing the reference (Gate)
     * @param {string} value contains the gate's name to remove
     * @returns {boolean} true if the reference has been removed, otherwise false
     */
    removeReference(node: string, value: string): boolean {
        let removedValue = false;
        const containsKey = this.network.containsKey(node);

        if (containsKey) {
            removedValue = this.network.getValue(node).removeInput(value);
        }
        return containsKey && removedValue;
    }

    /**
     * Resolve the graph and computes the output value.
     * @returns {Node} the outgoing node to which the graph is connected
     */
    compute(): Node {
        let current = this.network.values().filter((value) => value.isRoot())[0];

        current.setInputs(this.inputs);

        while (!current.isLeaf()) {
            current = current.compute();
        }

        current.compute();
        this.setOutputs(current.getOutputs());

        return (this.isLeaf() ? null : this.childs[0]);
    }

    private network: Dictionary<string, Node>;
}

export default Graph;