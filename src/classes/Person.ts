import { ColorHSL } from './ColorHSL';
import { ICloneable } from './ICloneable';

export class Person implements ICloneable {
    public static getRandom(): Person {
        return new Person(Math.random(), Math.random(), ColorHSL.getRandom());
    }

    public x: number;
    public y: number;
    public color: ColorHSL;

    constructor(x: number = 0, y: number = 0, color: ColorHSL = new ColorHSL(0, 0, 100)) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public clone(): Person {
        return new Person(this.x, this.y, this.color);
    }
}