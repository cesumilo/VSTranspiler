/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */

import IGate from './IGate';

/** Generic class representing a Gate */
class Gate<T> implements IGate {

    /**
     * Creates a new Gate with a given name.
     * @param {string} name contains the name of the new gate
     */
    constructor(name: string) {
        this.name = name;
        this.value = null;
        this.computed = false;
    }

    /**
     * Sets the internal gate's value of type T.
     * @param {T} value contains the new gate's value
     */
    setValue(value: T): void {
        this.value = value;
        this.computed = true;
    }

    /**
     * Resets the internal state of the gate.
     * The value is set to null and the boolean "computed" is set to false.
     */
    reset(): void {
        this.value = null;
        this.computed = false;
    }

    /**
     * Returns the internal gate's value of type T
     * @returns {T} returns the internal value of type T
     */
    getValue(): T {
        return this.value;
    }

    /**
     * Allows to know if the gate is computed.
     * @returns {boolean} true if the gate has been computed, otherwise false
     */
    isComputed(): boolean {
        return this.computed;
    }

    /**
     * Returns the gate's name.
     * @returns {string} returns the gate's name
     */
    getName(): string {
        return this.name;
    }

    private name: string;
    private value: T;
    private computed: boolean;
}

export default Gate;