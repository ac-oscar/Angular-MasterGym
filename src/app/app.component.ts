import { Component } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import { User } from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MasterGym';
  user: User;
  loading: boolean = true;

  constructor(private afAuth: AngularFireAuth)
  {  
    this.afAuth.auth.createUserWithEmailAndPassword
    this.afAuth.user.subscribe((user)=>{

      this.loading = false;
      this.user = user;
    });
  }
 

}
