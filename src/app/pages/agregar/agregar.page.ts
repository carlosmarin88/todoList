import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

   listaSeleccionada: Lista;

   nombreItem: string;

  constructor(private todoService: TodoService,
              private route: ActivatedRoute) {

    const idLista = route.snapshot.paramMap.get('listaId');

    this.listaSeleccionada = todoService.obtenerLista(idLista);

    console.log('la lista seleccionada', this.listaSeleccionada);
  }

  ngOnInit() {
  }

  public agregarItem() {
    console.log('nombreItem', this.nombreItem);
    if (!this.nombreItem || this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.listaSeleccionada.items.push(nuevoItem);
    this.nombreItem = '';
    this.todoService.guardarStorage();
  }

  public checkTarea(item: ListaItem) {

    const pendientes = this.listaSeleccionada.items
    .filter( itemData => !itemData.completado).length;

    if (pendientes === 0) {
      this.listaSeleccionada.terminadaEn = new Date();
      this.listaSeleccionada.completada = true;
    } else {
      this.listaSeleccionada.terminadaEn = null;
      this.listaSeleccionada.completada = false;
    }

    this.todoService.guardarStorage();
  }

  public borrar(i: number) {
    this.listaSeleccionada.items.splice(i, 1);
    this.todoService.guardarStorage();
  }

}
