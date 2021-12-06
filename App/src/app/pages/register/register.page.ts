import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;
  name: string;
  password: string;
  fullname: string;
  email: string;
  user: any = { 'fullname': '', 'password': '', 'email': ''};

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public loginService: LoginService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fullname': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required, Validators.email
      ])],
      'password': [null, Validators.compose([
        Validators.required, Validators.minLength(7)
      ])]
    });
  }

//   registerUser() {
//     // this.user = {'fullname': this.user.fullname, 'password': this.password, 'email': this.email}
// console.log(this.user)
//     // let user = this.onRegisterForm.value;
//     this.loginService.registerUser(this.user);
//         this.navCtrl.navigateRoot('/');
 
//   }

  onRegister() {
    this.loadingCtrl.create({message: 'Registering...'})
    .then((loadingEl) => {
      loadingEl.present();

      this.loginService.register(this.onRegisterForm.value).subscribe(resData => {
        console.log("Registracija uspela");
        console.log(resData);
        this.loginService.rememberUser().subscribe();
        loadingEl.dismiss();
        this.navCtrl.navigateRoot('/');
      })
    });
    
  }


  // async signUp() {
  //   const loader = await this.loadingCtrl.create({
  //     duration: 2000
  //   });

  //   loader.present();
  //   loader.onWillDismiss().then(() => {
  //     this.navCtrl.navigateRoot('/home-results');
  //   });
  // }

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
}
