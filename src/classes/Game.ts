import { Person } from './Person';
import { Snapshot } from "./Snapshot";

const personsAmount = 250;
const moveSpeed = .05;

function calculateOffset(personA: Person, personB: Person): {difX: number, difY: number} {
    const angleBtoA = Math.atan2(personA.y - personB.y, personA.x - personB.x);
    const distance = Math.sqrt(Math.pow(personA.x - personB.x, 2) + Math.pow(personA.y - personB.y, 2));
    const colorDif = personA.color.difference(personB.color);
    // const fear = (1 - distance) * (Math.abs(colorDif - 20) + 5)/180;
    const fear = 0.1*(1 - distance) + 0.4*(Math.abs(colorDif - 20)/180 + 2);
    const dif = {
        difX: Math.cos(angleBtoA) * fear,
        difY: Math.sin(angleBtoA) * fear
    };

    const angleToCenter = Math.atan2(0.5 - personA.y, 0.5 - personA.x);
    const forceToCenter = Math.pow(Math.pow(personA.x - 0.5, 2) + Math.pow(personA.y - 0.5, 2), 0.5)*2.5;
    dif.difX += Math.cos(angleToCenter) * forceToCenter;
    dif.difY += Math.sin(angleToCenter) * forceToCenter;

    return dif;
}

export class Game {
    public unzoomRate: number; // How much to multiply the position of the persons by.

    private canvas: HTMLCanvasElement;
    private snapshots: Snapshot[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        this.unzoomRate = Math.min(canvas.clientWidth, canvas.clientHeight) - 80;
        const snap = new Snapshot();
        this.snapshots.push(snap);
        for (let i = 0; i < personsAmount; i++) {
            snap.persons.push(Person.getRandom());
        }
    }

    public generateLastSnapshot(): void {
        const oldSnap = this.snapshots[this.snapshots.length - 1]
        const snap = oldSnap.clone();
        this.snapshots.push(snap);
        oldSnap.persons.forEach((person, i) => {
            let xDif = 0;
            let yDif = 0;
            oldSnap.persons.forEach((otherperson, j) => {
                if (i !== j) {
                    const fear = calculateOffset(person, otherperson);
                    xDif += fear.difX;
                    yDif += fear.difY;
                }
            });
            snap.persons[i].x = Math.min(Math.max(person.x + xDif * moveSpeed / personsAmount, 0), 1)
            snap.persons[i].y = Math.min(Math.max(person.y + yDif * moveSpeed / personsAmount, 0), 1)
        });
    }

    public redraw(snap: Snapshot = this.snapshots[this.snapshots.length - 1]): void {
        const ctx = this.canvas.getContext("2d")!;
        ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        const cornerX = this.canvas.clientWidth / 2 - this.unzoomRate/2;
        const cornerY = this.canvas.clientHeight / 2 - this.unzoomRate/2;
        snap.persons.forEach(person => {
            ctx.fillStyle = person.color.toHTML();
            ctx.fillRect(cornerX + Math.floor(person.x * this.unzoomRate - 2), cornerY + Math.floor(person.y * this.unzoomRate - 2), 5, 5);
        });
    }
}