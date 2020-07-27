import { DocumentReference } from '@angular/fire/firestore';

export class Price{
    id: string;
    name: string;
    cost: number;
    duration: number;
    durationType:number;
    ref: DocumentReference
}