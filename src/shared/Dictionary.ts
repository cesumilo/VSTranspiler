/**
 * Created by cesumilo
 * Author: Guillaume ROBIN <robinguillaume.pro@gmail.com>
 * Date: 10/01/2018
 * Licence: All rights reserved @ Guillaume ROBIN <robinguillaume.pro@gmail.com>
 */

class Dictionary<T extends number | string, U> {
    private _keys: T[] = [];
    private _values: U[] = [];

    private static undefinedKeyErrorMessage: string = "Key is either undefined, null or an empty string.";

    private static isEitherUndefinedNullOrStringEmpty(object: any): boolean {
        return (typeof object) === "undefined" || object === null || object.toString() === "";
    }

    private checkKeyAndPerformAction(action: { (key: T, value?: U): void | U | boolean }, key: T, value?: U): void | U | boolean {

        if (Dictionary.isEitherUndefinedNullOrStringEmpty(key)) {
            throw new Error(Dictionary.undefinedKeyErrorMessage);
        }

        return action(key, value);
    }

    public add(key: T, value: U): void {

        let addAction = (key: T, value: U): void => {
            if (this.containsKey(key)) {
                throw new Error("An element with the same key already exists in the dictionary.");
            }

            this._keys.push(key);
            this._values.push(value);
        };

        this.checkKeyAndPerformAction(addAction, key, value);
    }

    public remove(key: T): boolean {

        let removeAction = (key: T): boolean => {
            if (!this.containsKey(key)) {
                return false;
            }

            let index = this._keys.indexOf(key);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);

            return true;
        };

        return <boolean>(this.checkKeyAndPerformAction(removeAction, key));
    }

    public getValue(key: T): U {

        let getValueAction = (key: T): U => {
            if (!this.containsKey(key)) {
                return null;
            }

            let index = this._keys.indexOf(key);
            return this._values[index];
        };

        return <U>this.checkKeyAndPerformAction(getValueAction, key);
    }

    public containsKey(key: T): boolean {

        let containsKeyAction = (key: T): boolean => {
            return this._keys.indexOf(key) !== -1;
        };

        return <boolean>this.checkKeyAndPerformAction(containsKeyAction, key);
    }

    public changeValueForKey(key: T, newValue: U): void {

        let changeValueForKeyAction = (key: T, newValue: U): void => {
            if (!this.containsKey(key)) {
                throw new Error("In the dictionary there is no element with the given key.");
            }

            let index = this._keys.indexOf(key);
            this._values[index] = newValue;
        };

        this.checkKeyAndPerformAction(changeValueForKeyAction, key, newValue);
    }

    public keys(): T[] {
        return this._keys;
    }

    public values(): U[] {
        return this._values;
    }

    public count(): number {
        return this._values.length;
    }
}

export default Dictionary;