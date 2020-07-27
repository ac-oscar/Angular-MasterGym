import { DocumentReference } from '@angular/fire/firestore';

export class CheckIn {
    date: Date;
    endDate: Date;
    customer: DocumentReference;
    prices: DocumentReference;
    subTotal: number;
    isv: number;
    total: number;

    constructor() {
        this.date = null;
        this.endDate = null;
        this.customer = this.customer;
        this.prices = this.prices;
        this.subTotal = this.subTotal;
        this.isv = this.isv;
        this.total = this.total;
    }


    validate(): any {
        let response = {
            isValid: false,
            msg: ''
        }

        if (this.customer == null || this.customer == undefined) {
            response.isValid = false;
            response.msg = 'Please select a customer'
            return response;
        }
        if (this.prices == null || this.prices == undefined) {
            response.isValid = false;
            response.msg = 'You have not selected a price'
            return response;
        }
        if (this.date == null || this.date == undefined) {
            response.isValid = false;
            response.msg = 'No start date given'
            return response;
        }
        if (this.endDate == null || this.endDate == undefined) {
            response.isValid = false;
            response.msg = 'No end date given'
            return response;
        }


        if (this.subTotal <= 0 || this.subTotal == undefined) {
            response.isValid = false;
            response.msg = 'Could not calculate subtotal'
            return response;
        }

        if (this.isv <= 0 || this.isv == undefined) {
            response.isValid = false;
            response.msg = 'Could not calculate isv'
            return response;
        }
        if (this.total <= 0 || this.total == undefined) {
            response.isValid = false;
            response.msg = 'Could not calculate total'
            return response;
        }
        
        response.isValid = true;
        return response;
    }
}