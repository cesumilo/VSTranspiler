/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */

/** Interface representing an IGate */
interface IGate {

    /**
     * Allows to know if the gate has been computed.
     * @returns {boolean} true if the gate has been computed, otherwise false
     */
    isComputed(): boolean;

    /**
     * Returns the gate's name.
     * @returns {string} return the gate's name
     */
    getName(): string;

    /**
     * Resets the internal state of the gate.
     */
    reset(): void;
}

export default IGate;