import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-selectcustomer',
  templateUrl: './selectcustomer.component.html',
  styleUrls: ['./selectcustomer.component.scss']
})
export class SelectcustomerComponent implements OnInit {

  customers: Customer[] = new Array<Customer>();
  @Input('name') name: string;
  @Output('customerSelected') customerSelected = new EventEmitter();
  @Output('customerCanceled') customerCanceled = new EventEmitter();

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection<any>('customers').get().subscribe((response) => {
      this.customers.length = 0;

      response.docs.forEach((item) => {
        let customer: any = item.data();
        customer.id = item.id;
        customer.ref = item.ref;
        customer.visible = true;
        this.customers.push(customer);
      });
    });
  }

  findCustomer(name: string) {
    this.customers.forEach((customer) => {
      if (customer.name.toLowerCase().includes(name.toLowerCase())) {
        customer.visible = true;
      }
      else {
        customer.visible = false;
      }
    })
  }

  selectCustomer(customer: Customer) {
    this.name = customer.name + ' ' + customer.lastname;
    this.customers.forEach((customer) => {
      customer.visible = false;
    })

    this.customerSelected.emit(customer)
  }

  cancelCustomer() {
    this.name = undefined;

    this.customers.forEach((customer) => {
      customer.visible = true;
    });

    this.customerCanceled.emit();
  }

}
