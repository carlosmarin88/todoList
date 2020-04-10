import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  listas: Lista[] = [];

  constructor() {
      console.log('Servicio inicializado');
      const lista1 = new Lista('Recolectar piedras del infinito');
      const lista2 = new Lista('Héroes a desaparecer');
      this.listas.push(lista1, lista2);

      console.log(this.listas);
    }

  public getLista() {
    return this.listas;
  }
}
