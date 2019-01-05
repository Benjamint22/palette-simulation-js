import { ICloneable } from './ICloneable';
import { Person } from './Person';

export class Snapshot implements ICloneable {
    public persons: Person[];

    constructor(persons: Person[] = []) {
        this.persons = persons;
    }

    public clone(): Snapshot {
        const persons: Person[] = [];
        this.persons.forEach(person => {
            persons.push(person.clone());
        });
        return new Snapshot(persons);
    }
}