import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  formError = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
    'password': {
      'required': 'Password is required.'
    }
  };

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private spinner: NgxSpinnerService,
    private msj: MensajesService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['',
        [
          Validators.required, Validators.email
        ]
      ],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }

    const form = this.loginForm;

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

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
        .then(() => this.spinner.hide()).catch((error) => {
          this.msj.mensajeAdvertencia('Login Error', error.message);
          this.spinner.hide();
        })
    }
    else {
      this.msj.mensajeAdvertencia('Login Error', 'Please make sure information given is correct');
    }

  }

}
