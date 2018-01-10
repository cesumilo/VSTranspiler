/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */

import Node from './graph/Node';
import Gate from './graph/Gate';

class AddNode extends Node {

    constructor(name: string) {
        super(name);
    }

    compute(): void {
        let output = this.outputs[0] as Gate<number>;
        let a = this.inputs[0] as Gate<number>;
        let b = this.inputs[1] as Gate<number>;

        output.setValue(a.getValue() + b.getValue());
    }
}

class SubstractNode extends Node {

    constructor(name: string) {
        super(name);
    }

    compute(): void {
        let output = this.outputs[0] as Gate<number>;
        let a = this.inputs[0] as Gate<number>;
        let b = this.inputs[1] as Gate<number>;

        output.setValue(a.getValue() - b.getValue());
    }
}

function main() {
    let addNode: AddNode = new AddNode("add node");
    let subNode: SubstractNode = new SubstractNode("sub node");

    let a: Gate<number> = new Gate<number>("a");
    let b: Gate<number> = new Gate<number>("b");
    let addResult: Gate<number> = new Gate<number>("addResult");
    let substractResult: Gate<number> = new Gate<number>("substractResult");

    addNode.addInput(a);
    addNode.addInput(b);
    addNode.addOutput(addResult);
    addNode.addChild(subNode);

    subNode.setParent(addNode);
    subNode.addInput(b);
    subNode.addInput(addResult);
    subNode.addOutput(substractResult);

    a.setValue(10);
    b.setValue(10);

    console.log("a is computed:", a.isComputed(), a.getValue());
    console.log("b is computed:", b.isComputed(), b.getValue());
}

main();