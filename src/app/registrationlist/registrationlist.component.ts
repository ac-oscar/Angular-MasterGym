import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registrationlist',
  templateUrl: './registrationlist.component.html',
  styleUrls: ['./registrationlist.component.scss']
})
export class RegistrationlistComponent implements OnInit {

  inscriptions: any[] = [];
  constructor(private db: AngularFirestore) { }


  ngOnInit() {
    this.inscriptions.length = 0;
    this.db.collection('checkIn').get().subscribe((response) => {

      response.forEach((data) => {
        let record = data.data();
        record.id = data.id;

        this.db.doc(data.data().customer.path).get().subscribe((customer) => {
          record.getCustomer = customer.data();
          record.date = new Date(record.date.seconds * 1000);
          record.endDate = new Date(record.endDate.seconds * 1000);

          this.inscriptions.push(record);
        })
      })
    })
  }

}
