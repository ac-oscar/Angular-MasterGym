import { DocumentReference } from '@angular/fire/firestore';

export class Prices{
    id: number;
    duration: number;
    name: string;
    durationType: number;
    cost: number;
    ref: DocumentReference;
}