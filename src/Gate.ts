/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */

import IGate from './IGate';

class Gate<T> implements IGate {

    constructor(name: string) {
        this.value = null;
        this.name = name;
        this.isCompute = false;
    }

    getName(): string {
        return this.name;
    }

    set(arg: T): void {
        this.value = arg;
        this.isCompute = true;
    }

    reset(): void {
        this.isCompute = false;
        this.value = null;
    }

    get(): T {
        return this.value;
    }

    isComputed(): boolean {
        return this.isCompute;
    }

    name: string;
    value: T;
    isCompute: boolean;
}

export default Gate;