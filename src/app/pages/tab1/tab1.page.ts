import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  listasTodo: Lista[] = [];

  constructor(public todoService: TodoService,
              private router: Router) {
    this.listasTodo = todoService.getLista();
  }

  public agregarLista(){
    this.router.navigateByUrl('tabs/tab1/agregar');
  }

}
