/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */

import Node from './Node';
import Dictionary from "../shared/Dictionary";

class Graph extends Node {

    constructor(name: string) {
        super(name);
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

    compute(): void {
        let root = this.network.values().filter((value) => value.isRoot())[0];
        let leaf = this.network.values().filter((value) => value.isLeaf())[0];

        root.setInputs(this.inputs);
        this.setOutputs(leaf.getOutputs());

        let opened = this.network.values().filter((value) => value.isReady() && value.isComputed());
        let closed = this.network.values().filter((value) => value.isReady() === false);

        while (closed.length > 0) {
            for (let i = 0; i < opened.length; i++) {
                opened[i].compute();
                opened[i].hasComputed();
            }

            opened = this.network.values().filter((value) => value.isReady() && value.isComputed());
            closed = this.network.values().filter((value) => value.isReady() === false);
        }
    }

    reset(): void {
        super.reset();
        for (let i = 0; i < this.network.values().length; i++) {
            this.network.values()[i].reset();
        }
    }

    private network: Dictionary<string, Node>;
}

export default Graph;