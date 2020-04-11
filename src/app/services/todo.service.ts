import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  listas: Lista[] = [];

  constructor() {
      console.log('Servicio inicializado');
      this.cargarStorage();
/*
      const lista1 = new Lista('Recolectar piedras del infinito');
      const lista2 = new Lista('Héroes a desaparecer');
      this.listas.push(lista1, lista2);
*/
      console.log(this.listas);
    }

  public getLista() {
    return this.listas;
  }

  public crearLista(titulo: string) {

    const nuevaListta = new Lista(titulo);
    this.listas.push(nuevaListta);
    this.guardarStorage();
  }

  public guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  public cargarStorage() {

      if  (localStorage.getItem('data')) {
        this.listas = JSON.parse(localStorage.getItem('data'));
      }
  }
}
