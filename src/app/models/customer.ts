import { DocumentReference } from '@angular/fire/firestore';

export class Customer{
    id:string;
    name: string;
    lastname: string;
    email: string;
    dateOfBirth: Date;
    imgUrl: string;
    phone: number;
    identification: string;
    ref: DocumentReference;
    visible: boolean;
}