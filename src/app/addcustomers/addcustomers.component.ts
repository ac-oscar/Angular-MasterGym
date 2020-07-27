import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MsgsService } from '../services/msgs.service';


@Component({
  selector: 'app-addcustomers',
  templateUrl: './addcustomers.component.html',
  styleUrls: ['./addcustomers.component.scss']
})
export class AddcustomersComponent implements OnInit {

  customerForm: FormGroup;
  uploadPercentage: number = 0;
  imgUrl: string = ''
  isEditable: boolean = false;
  id: string;

  formError = {
    'name': '',
    'lastname': '',
    'email': '',
    'dateOfBirth': '',
    'imgUrl': ''
  };

  validationMessages = {
    'name': { 'required': 'Name is required.' },
    'lastname': { 'required': 'Lastname is required.' },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
    'dateOfBirth': { 'required': 'Date of Bitrh is required.' },
    'imgUrl': { 'required': 'imgUrl is required.' }
  };

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private msg: MsgsService) { }

  ngOnInit() {
    this.createForm();
    this.isEditableCustomer();
  }

  private createForm(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      identification: [''],
      dateOfBirth: ['', Validators.required],
      phone: [''],
      imgUrl: ['', Validators.required]
    })

    this.customerForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  private isEditableCustomer(): void {
    this.id = this.activeRoute.snapshot.params.customerId;

    if (this.id != undefined) {
      this.isEditable = true;
      this.db.doc<any>('customers' + '/' + this.id).valueChanges().subscribe((customer) => {


        this.customerForm.setValue({
          name: customer.name,
          lastname: customer.lastname,
          email: customer.email,
          dateOfBirth: new Date(customer.dateOfBirth.seconds * 1000).toISOString().substr(0, 10),
          phone: customer.phone,
          identification: customer.identification,
          imgUrl: ''
        })

        this.imgUrl = customer.imgUrl;

      });
    }
  }

  private onValueChanged(data?: any) {
    if (!this.customerForm) { return; }

    const form = this.customerForm;

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

  addCutomer() {
    this.customerForm.value.imgUrl = this.imgUrl;
    this.customerForm.value.dateOfBirth = new Date(this.customerForm.value.dateOfBirth);

    this.db.collection('customers').add(this.customerForm.value).then(() => {
      this.msg.success('Correct!', 'Record successfully added');
      this.customerForm.reset();

    }).catch(() => {
      this.msg.error('Error!', 'Something wrong happened');
    })
  }


  updateCustomer() {
    this.customerForm.value.imgUrl = this.imgUrl;
    this.customerForm.value.dateOfBirth = new Date(this.customerForm.value.dateOfBirth);

    this.db.doc('customers/' + this.id).update(this.customerForm.value).then(() => {
      this.msg.success('Correct!', 'Record successfully updated');
      this.customerForm.reset();

    }).catch(() => {
      this.msg.error('Error!', 'Something wrong happened');
    })
  }

  uploadImage(evento) {
    let files = evento.target.files;

    if (files.length > 0) {
      let name = new Date().getTime().toString();
      let fl = files[0];
      let extension = fl.name.toString().substring(fl.name.toString().lastIndexOf('.'));
      let route = 'customers/' + name + extension;

      const reference = this.storage.ref(route);
      const task = reference.put(fl);

      task.then((response) => {
        reference.getDownloadURL().subscribe((url) => {
          this.imgUrl = url;
        })
      });

      task.percentageChanges().subscribe((percentage) => {
        this.uploadPercentage = parseInt(percentage.toString());
      })
    }
  }

}
