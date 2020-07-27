import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MsgsService } from '../services/msgs.service';
import { Price } from '../models/price';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {
  priceForm: FormGroup;
  prices: Price[] = new Array<Price>();
  isToEdit: boolean = false;
  id: string;

  formError = {
    'name': '',
    'cost': '',
    'duration': '',
    'durationType': ''
  };

  validationMessages = {
    'name': { 'required': 'Name is required' },
    'cost': { 'required': 'Cost is required.' },
    'duration': { 'required': 'Duration is required.' },
    'durationType': { 'required': 'DurationType is required.' }
  };

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private msg: MsgsService
  ) { }

  ngOnInit() {
    this.createForm();
    this.showPrices();
  }

  private createForm(): void {
    this.priceForm = this.fb.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      duration: ['', Validators.required],
      durationType: ['', Validators.required]
    });

    this.priceForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  private onValueChanged(data?: any) {
    if (!this.priceForm) { return; }

    const form = this.priceForm;

    for (const field in this.formError) {
      if (this.formError.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formError[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];

          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formError[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  showPrices() {
    this.db.collection<Price>('prices').get().subscribe((response) => {
      this.prices.length = 0;

      response.docs.forEach((dato) => {
        let precio = dato.data() as Price;
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.prices.push(precio)
      });
    })
  }

  addPrice(){
    this.db.collection<Price>('prices').add(this.priceForm.value).then(()=>{
      this.msg.success('Correct!', 'Record successfully added');
      this.priceForm.reset();
      this.showPrices();

    }).catch(()=>{
      this.msg.error('Error!', 'Something wrong happened');
    })
  }

  setUpdatePrice(price: Price)
  {
    this.isToEdit = true;

    this.priceForm.setValue({
      name: price.name,
      cost: price.cost,
      duration: price.duration,
      durationType: price.durationType
    });

    this.id = price.id;
  }


  updatePrice(){
    this.db.doc('prices/' + this.id).update(this.priceForm.value).then(()=>{
      this.msg.success('Correct!', 'record successfully updated')
      this.priceForm.reset();
      this.isToEdit = false;
      this.showPrices();

    }).catch(()=>{
      this.msg.error('Error!', 'Something wrong happened');
    })
  }

}
