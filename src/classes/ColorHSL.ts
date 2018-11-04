import * as CSS from "csstype";

function mod(a: number, n: number): number {
    return (a % n + n) % n;
}

function modDif(angleA: number, angleB: number, range: number = 360): number {
    return mod((angleA - angleB + range/2), range) - range/2;
}

/*function absDif(numA: number, numB: number) {
    return Math.abs(numA - numB);
}*/

export class ColorHSL {
    public static getRandom(): ColorHSL {
        return new ColorHSL(Math.random() * 360, 100, 50);
        // return new ColorHSL(Math.random() * 360, Math.random() * 100, Math.random() * 100);
    }

    /**
     * Hue ranging from 0 to 360.
     * @type {number}
     * @memberof Color
     */
    public hue: number;
    /**
     * Saturation ranging from 0% to 100%.
     * @type {number}
     * @memberof Color
     */
    public saturation: number;
    /**
     * Lightness ranging from 0% to 100%.
     * @type {number}
     * @memberof Color
     */
    public lightness: number;

    constructor(hue: number = 0, saturation: number = 100, lightness: number = 50) {
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
    }

    public toHTML(): CSS.Color {
        return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    }

    public difference(color: ColorHSL): number {
        // return (modDif(this.hue, color.hue, 360)/180 + absDif(this.lightness, color.lightness)/100 + absDif(this.saturation, color.saturation)/100)/3;
        return modDif(this.hue, color.hue, 360);
    }
}