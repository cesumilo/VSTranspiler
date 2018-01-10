/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */

import IGate from './IGate';

class Gate<T> implements IGate {

    constructor(name: string) {
        this.name = name;
        this.value = null;
        this.computed = false;
    }

    setValue(value: T): void {
        this.value = value;
        this.computed = true;
    }

    reset(): void {
        this.value = null;
        this.computed = false;
    }

    getValue(): T {
        return this.value;
    }

    isComputed(): boolean {
        return this.computed;
    }

    getName(): string {
        return this.name;
    }

    private name: string;
    private value: T;
    private computed: boolean;
}

export default Gate;