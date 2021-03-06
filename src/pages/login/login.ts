import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { SignupPage } from '../signup/signup';
import { Dashboard } from '../dashboard/dashboard';


@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  userName: string;
  password: string;
  tempFirebaseData: any;


  constructor(public navCtrl: NavController, public af: AngularFire, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.userName = "", this.password = "";
  }

  goToSignUpPage() {
    this.navCtrl.push(SignupPage);
  }

  loginFirebase() {

    this.tempFirebaseData = this.af.auth.login({ email: this.userName, password: this.password },
      { provider: AuthProviders.Password, method: AuthMethods.Password })

    return new Promise((resolve, reject) => resolve(this.tempFirebaseData));

  }

  loader() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loading.present();
    
    this.loginFirebase().then((res) => {
        loading.dismiss();
        this.navCtrl.push(Dashboard);
    },

      (err) => {
          loading.dismiss();
          console.log("Error " + err);
      let toast = this.toastCtrl.create({
          message: err,
          duration: 3000,
          position: 'top'
        })

        toast.present().then((done) => {
              
        })

      })
  }

}
