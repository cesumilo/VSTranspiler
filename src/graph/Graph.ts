/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */

import Node from './Node';
import Dictionary from "../shared/Dictionary";
import IGate from "./IGate";

class Graph extends Node {

    constructor(name: string) {
        super(name);

        this.network = new Dictionary();
    }

    addNode(node: Node): boolean {
        const containsKey = this.network.containsKey(node.getName());

        if (containsKey === false) {
            this.network.add(node.getName(), node);
        }
        return containsKey;
    }

    removeNode(name: string): boolean {
        const containsKey = this.network.containsKey(name);

        if (containsKey === true) {
            this.network.remove(name);
        }
        return containsKey;
    }

    addLink(parent: string, child: string): boolean {
        const containsKeys = this.network.containsKey(parent) && this.network.containsKey(child);

        if (containsKeys) {
            this.network.getValue(parent).addChild(this.network.getValue(child));
            this.network.getValue(child).setParent(this.network.getValue(parent));
        }
        return containsKeys;
    }

    removelink(parent: string, child: string): boolean {
        let removedChild = false;
        const containsKeys = this.network.containsKey(parent) && this.network.containsKey(child);

        if (containsKeys) {
            removedChild = this.network.getValue(parent).removeChild(child);
            this.network.getValue(child).setParent(null);
        }
        return containsKeys && removedChild;
    }

    addReference(node: string, value: IGate): boolean {
        let addedValue = false;
        const containsKey = this.network.containsKey(node);

        if (containsKey) {
            addedValue = this.network.getValue(node).addInput(value);
        }
        return containsKey && addedValue;
    }

    removeReference(node: string, value: string): boolean {
        let removedValue = false;
        const containsKey = this.network.containsKey(node);

        if (containsKey) {
            removedValue = this.network.getValue(node).removeInput(value);
        }
        return containsKey && removedValue;
    }

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