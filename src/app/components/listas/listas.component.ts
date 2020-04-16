import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Lista } from '../../models/lista.model';
import { TodoService } from 'src/app/services/todo.service';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  @Input() terminada = true;

  @ViewChild(IonList, null) listaHtml: IonList;

  constructor(public todoService: TodoService,
              private router: Router,
              private alertCtrl: AlertController) {

  }


  public listaSeleccionada(listaSelec: Lista) {
    let redirectAgregar = null;

    if (this.terminada) {
      redirectAgregar = 'tab2';
    } else {
      redirectAgregar = 'tab1';
    }
    this.router.navigateByUrl(`tabs/${redirectAgregar}/agregar/${listaSelec.id}`);
  }

  public borrarLista(idLista: number) {
   this.todoService.borrarLista(idLista);
  }

  public async editarTitulo(lista: Lista, item: IonItemSliding) {

    const editarTitulo = await this.alertCtrl.create({
      header: 'Editar titulo de la lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
              console.log('Cancelar la edicion de la lista');
              this.listaHtml.closeSlidingItems();
            }
        },
        {
          text: 'Editar',
          handler: (data) => {
            console.log('informacion del formulario', data);
            if (data.titulo.length === 0) {
              return;
            }
            lista.titulo = data.titulo;
            this.todoService.editarLista(lista);
            this.listaHtml.closeSlidingItems();
            // item.close();
          }
        },
      ]
    });

    await editarTitulo.present();
  }

}
