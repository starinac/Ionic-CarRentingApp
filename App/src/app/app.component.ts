import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {  Events } from '@ionic/angular';

import { Pages } from './interfaces/pages';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public appPages: Array<Pages>;
  public name: string = "empty";
  public address: string = "empty";
  public users = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private Events: Events,
    private loginService: LoginService
  ) {
    this.appPages = [
      {
        title: 'Home',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'About',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      },

      {
        title: 'App Settings',
        url: '/settings',
        direct: 'forward',
        icon: 'cog'
      }
    ];
    this.Events.subscribe('refresh-name', (fullname) =>{
      this.name = fullname;
    });

    this.Events.subscribe('refresh-adress', (address) =>{
      this.address = address;
    });
    
    // for (let i = 0; i < this.users.length; i++) {
    //   if (this.users[i].userId == this.loginService.IdUser) {
    //     this.name = this.users[i].name;
    //     this.address = this.users[i].adress;
    //   }
      
    // }
    this.initializeApp();
  }

  ngOnInit(){
  }

  ionViewWillEnter() {
    this.name = this.loginService.fullname;
    this.address = this.loginService.adress;
  }

  izmeni() {
    this.name = this.loginService.fullname;
    this.address = this.loginService.adress;
  }


  updateUser(user){
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].userId == this.loginService.IdUser) {
        this.loginService.updateUser(this.users[i].userId, user).subscribe();
      }
      
    }
  }

  getUsers(){
    this.loginService.getUsers().subscribe(users =>{
      this.users = users;
      console.log(this.users);
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => {});
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.loginService.logOut();
    this.navCtrl.navigateRoot('/');
  }
}
