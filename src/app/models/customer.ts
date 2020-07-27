import { DocumentReference } from '@angular/fire/firestore';

export class Customer {
    id: string;
    name: string;
    lastname: string;
    email: string;
    dateOfBirth: Date;
    imgUrl: string;
    phone: number;
    identification: string;
    ref: DocumentReference;
    visible: boolean;

    constructor() {
        this.id = this.id;
        this.name = this.name;
        this.lastname = this.lastname;
        this.email = this.email;
        this.dateOfBirth = this.dateOfBirth;
        this.imgUrl = this.imgUrl;
        this.phone = this.phone;
        this.identification = this.identification;
        this.ref = this.ref;
        this.visible = true;
    };
}