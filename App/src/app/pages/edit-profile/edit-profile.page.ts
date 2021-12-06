import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  public name: string;
  public email: string;
  public address: string;

  public newName: string;
  public newEmail: string;
  public newAddress: string;

  public users = [];
  
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public LoginService: LoginService
    ) {
      
     }

  ngOnInit() {
    this.name = this.LoginService.fullname;
    this.email = this.LoginService.email;
    this.address = this.LoginService.adress;
  }

  ionViewDidEnter(){
    this.name = this.LoginService.fullname;
    this.email = this.LoginService.email;
    this.address = this.LoginService.adress;
  }

  async sendData() {

    this.LoginService.editUser(this.newName,this.newEmail,this.newAddress);


    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        cssClass: 'bg-profile',
        message: 'Your Data was Edited!',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      this.navCtrl.navigateForward('/home-results');
    });
  }

}
