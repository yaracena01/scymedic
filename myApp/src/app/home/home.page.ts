import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Cliente } from '../interface/icliente';
import { AlertController, ToastController, LoadingController   } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  id: number;
  nombre: string;

  clientes: Cliente[] = [];

  constructor(
    public api: ApiService, 
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController ){}

  ngOnInit(){
    this.getAllCliente();
  }

  async getAllCliente(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
    });
    
    await loading.present();
    this.api.getAllCliente()
    .subscribe(async cli=>{
      this.clientes = cli;
      await loading.dismiss();
    });
  }

  getClienteId(id: number){
    this.api.getClienteId(id)    
    .subscribe(async (cli)=>{
      this.openAlertEdit(cli);
    })
  }
 
  async openAlertEdit(cliente : Cliente){
    const alert = await this.alertCtrl.create({
      header: "Actualizar Cliente!",
      inputs:[
        {
          placeholder: 'Id',
          name: 'Id',
          type: 'number',
          value: cliente.id
          
        },
        {
          placeholder: 'nombre',
          name: 'nombre',
          type: 'text',
          value: cliente.nombre
          
        },
      
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm cancel');
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            this.updateCliente(data.Id, data.nombre);
          }
        }
      ]
    });  
    await alert.present();   
  }
 
  async openAlert(){
    const alert = await this.alertCtrl.create({
      header: "Nuevo Cliente!",
      inputs:[
        {
          placeholder: 'nombre',
          name: 'nombre',
          type: 'text',
          
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm cancel');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data);
            this.createCliente(data.nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  createCliente(nombre: string){
    const cliente = {
      nombre: nombre
    };
    this.api.createCliente(cliente).subscribe((newCliente) =>{
      this.clientes.unshift(newCliente);
    });
  };

  updateCliente(id: number, nombre: string){
    const cliente = {
      id: id,
      nombre: nombre
    };
    this.api.updateCliente(cliente).subscribe(()=>{
      this.getAllCliente();
      this.presentToast('El cliente fue actualizado satisfactoriamente.');
    });
  }

  deleteCliente(id: number, index: number) {
    this.api.deleteCliente(id)
    .subscribe(() => {
      this.getAllCliente();
      this.presentToast('El cliente ha sido removido satisfactoriamente.');
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }
}
