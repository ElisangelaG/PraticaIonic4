
import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router'
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { threadId } from 'worker_threads';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userLogin: User = {};
  public userRegister: User = {}
  private loading: any;
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router,
    private auth: UserService

  ) { }

  ngOnInit() {
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({ message: 'Preparando... ' })
    return this.loading.present();
  }

  async login() {
    await this.presentLoading();
    try {
      await this.auth.login(this.userLogin);
      this.router.navigateByUrl('/sintomas')
    } catch (error) {
      this.presentToast(error.message)
    } finally {
      this.loading.dismiss();
    }
  }

  async register() {
    await this.presentLoading();
    try {
      await this.auth.register(this.userRegister)
    } catch (error) {
      this.presentToast(error.message)
    } finally {
      this.loading.dismiss();
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({ message, duration: 5000 });
    toast.present();
  }
}