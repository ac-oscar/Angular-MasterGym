import { Component, OnInit } from '@angular/core';
import { CheckIn } from '../models/checkin';
import { Customer } from '../models/customer';
import { AngularFirestore } from '@angular/fire/firestore';
import { Price } from '../models/price';
import { MsgsService } from '../services/msgs.service';

enum durationType {
  Day = 1,
  Week = 2,
  Fortnight = 3,
  Month = 4,
  Year = 5
};

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {

  checkIn: CheckIn = new CheckIn();
  customerSelected: Customer = new Customer();
  selectedPrice: Price = new Price();
  priceId: string = 'null';
  prices: Price[] = new Array<Price>();

  constructor(
    private db: AngularFirestore,
    private msg: MsgsService
  ) { }

  ngOnInit() {
    this.db.collection('prices').get().subscribe((resultado) => {
      resultado.docs.forEach((item) => {
        let price = item.data() as Price;
        price.id = item.id;
        price.ref = item.ref;
        this.prices.push(price)
      })
    })
  }

  assignCustomer(customer: Customer) {
    this.checkIn.customer = customer.ref;
    this.customerSelected = customer;
  }

  deleteCustomer() {
    this.customerSelected = new Customer();
    this.checkIn.customer = undefined;
  }


  saveChanges() {
    if (this.checkIn.validate().isValid) {
      let registerToAdd = {
        date: this.checkIn.date,
        endDate: this.checkIn.endDate,
        customer: this.checkIn.customer,
        prices: this.checkIn.prices,
        subTotal: this.checkIn.subTotal,
        isv: this.checkIn.isv,
        total: this.checkIn.total
      };

      this.db.collection('checkIn').add(registerToAdd).then((response) => {
        this.checkIn = new CheckIn();
        this.customerSelected = new Customer();
        this.selectedPrice = new Price();
        this.priceId = 'null'
        this.msg.success('Correct!', 'Record successfully saved')
      })
    }
    else {
      this.msg.warning('Warning', this.checkIn.validate().msg)
    }

  }

  selectPrice(id: string) {
    if (id != "null") {
      this.selectedPrice = this.prices.find(x => x.id == id);
      this.checkIn.prices = this.selectedPrice.ref;

      this.checkIn.subTotal = this.selectedPrice.cost;
      this.checkIn.isv = this.checkIn.subTotal * 0.15;
      this.checkIn.total = this.checkIn.subTotal + this.checkIn.isv;

      this.checkIn.date = new Date();

      switch (parseInt(this.selectedPrice.durationType.toString())) {
        case durationType.Day: {
          let days: number = this.selectedPrice.duration;
          let endDate =
            new Date(this.checkIn.date.getFullYear(), this.checkIn.date.getMonth(), this.checkIn.date.getDate() + days)
          this.checkIn.endDate = endDate;
          break;
        }
        case durationType.Week: {
          let days: number = this.selectedPrice.duration;
          let endDate =
            new Date(this.checkIn.date.getFullYear(), this.checkIn.date.getMonth(), this.checkIn.date.getDate() + days)
          this.checkIn.endDate = endDate;
          break;
        }
        case durationType.Fortnight: {
          let days: number = this.selectedPrice.duration;
          let endDate =
            new Date(this.checkIn.date.getFullYear(), this.checkIn.date.getMonth(), this.checkIn.date.getDate() + days)
          this.checkIn.endDate = endDate;
          break;
        }
        case durationType.Month: {
          let year: number = this.checkIn.date.getFullYear();
          let months = this.checkIn.date.getMonth();
          let days: number = this.checkIn.date.getDate()
          let endDate =
            new Date(year, months, days + this.selectedPrice.duration)
          this.checkIn.endDate = endDate;
          break;
        }
        case durationType.Year: {
          let year: number = this.checkIn.date.getFullYear();
          let months = this.checkIn.date.getMonth();
          let days: number = this.checkIn.date.getDate()
          let endDate =
            new Date(year, months, days + this.selectedPrice.duration)
          this.checkIn.endDate = endDate;
          break;
        }
        default: {
          console.log("invalid");
        }
      }
    }
    else {
      this.selectedPrice = new Price();
      this.checkIn.date = null;
      this.checkIn.endDate = null;
      this.checkIn.prices = null;
      this.checkIn.subTotal = 0;
      this.checkIn.isv = 0;
      this.checkIn.total = 0;
    }
  }

}
