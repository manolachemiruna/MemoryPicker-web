import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  password: string;
  Cpassword: string;
  hide: boolean;
  passwordNotMatch: string;
  passwordMessage: string;
  sent: boolean;
  constructor(private route: ActivatedRoute, private afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.hide = true;
    this.passwordNotMatch = null;
    this.passwordMessage = null;
    this.sent = false;
  }

  change()
  {
    if (this.password === this.Cpassword) {
      this.setPassword(this.password);
      setTimeout(() => {this.passwordNotMatch=null;this.sent = true;this.passwordMessage = sessionStorage.getItem('passwordMessage')}, 1000);
      console.log(this.passwordMessage);
    } else { this.passwordNotMatch = 'The passwords that you entered do not match,please try again!'; }
  }

  setPassword(password)
  {

  const code = this.route.snapshot.queryParams['oobCode'];

  this.afAuth.confirmPasswordReset(code, password)
    .then(
      () => {
        console.log("Password Changed");
        sessionStorage.setItem('passwordMessage', "Password successfully changed!");
      },
    error => {
      this.eventAuthError.next(error);
      sessionStorage.setItem('passwordMessage', "An error occured while changing your password,please try again!");
    }
    );

  }

}
