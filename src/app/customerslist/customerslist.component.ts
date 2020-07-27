import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-customerslist',
  templateUrl: './customerslist.component.html',
  styleUrls: ['./customerslist.component.scss']
})
export class CustomerslistComponent implements OnInit {

  customers: any[] = new Array<any>();

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.customers.length = 0;

    this.db.collection('customers').get().subscribe((response) => {
      response.docs.forEach((item) => {
        let customer = item.data();
        customer.id = item.id;
        customer.ref = item.ref;
        this.customers.push(customer)
      })

    })
  }

}
