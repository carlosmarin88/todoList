import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public todoService: TodoService,
              private router: Router,
              private alertCtrl: AlertController) {
  }

  public async agregarLista() {

    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
              console.log('Cancelar creación de lista');
            }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log('informacion del formulario', data);
            if (data.titulo.length === 0) {
              return;
            }
            // Crear la lista
            const idLista = this.todoService.crearLista(data.titulo);
            this.router.navigateByUrl(`tabs/tab1/agregar/${idLista}`);
          }
        },
      ]
    });

    await alert.present();
  }
}
