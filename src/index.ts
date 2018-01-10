/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */

import Node from './graph/Node';
import Gate from './graph/Gate';
import Graph from './graph/Graph';

class AddNode extends Node {

    constructor(name: string) {
        super(name);
    }

    compute(): Node {
        let output = this.outputs[0] as Gate<number>;
        let a = this.inputs[0] as Gate<number>;
        let b = this.inputs[1] as Gate<number>;

        output.setValue(a.getValue() + b.getValue());
        console.log(output);

        return (this.isLeaf() ? null : this.childs[0]);
    }
}

class SubtractNode extends Node {

    constructor(name: string) {
        super(name);
    }

    compute(): Node {
        let output = this.outputs[0] as Gate<number>;
        let a = this.inputs[0] as Gate<number>;
        let b = this.inputs[1] as Gate<number>;

        output.setValue(a.getValue() - b.getValue());
        console.log(output);

        return (this.isLeaf() ? null : this.childs[0]);
    }
}

function main() {
    let graph: Graph = new Graph("graph");

    let addNode: AddNode = new AddNode("add node");
    let subNode: SubtractNode = new SubtractNode("sub node");

    let a: Gate<number> = new Gate<number>("a");
    let b: Gate<number> = new Gate<number>("b");
    let c: Gate<number> = new Gate<number>("b");

    let addResult: Gate<number> = new Gate<number>("addResult");
    let subtractResult: Gate<number> = new Gate<number>("subtractResult");

    addNode.addOutput(addResult);
    subNode.addOutput(subtractResult);

    graph.addNode(addNode);
    graph.addNode(subNode);

    graph.addInput(a);
    graph.addInput(b);

    graph.addReference(subNode.getName(), addResult);
    graph.addReference(subNode.getName(), c);

    graph.addLink(addNode.getName(), subNode.getName());

    a.setValue(10);
    b.setValue(10);
    c.setValue(5);

    graph.compute();
    let output = graph.getOutputs()[0] as Gate<number>;
    console.log("10 + 10 - 5 = ", output.getValue());
}

main();