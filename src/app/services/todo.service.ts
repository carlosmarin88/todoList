import { Injectable } from "@angular/core";
import { Lista } from "../models/lista.model";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  listas: Lista[] = [];

  constructor() {
    console.log("Servicio inicializado");
    this.cargarStorage();
    /*
      const lista1 = new Lista('Recolectar piedras del infinito');
      const lista2 = new Lista('Héroes a desaparecer');
      this.listas.push(lista1, lista2);
*/
    console.log(this.listas);
  }

  public crearLista(titulo: string) {
    const nuevaListta = new Lista(titulo);
    this.listas.push(nuevaListta);
    this.guardarStorage();

    return nuevaListta.id;
  }

  public obtenerLista(id: string | number) {
    id = Number(id);
    return this.listas.find((listaData) => listaData.id === id);
  }

  public borrarLista(idLista: number) {
    this.listas = this.listas.filter((listaData) => listaData.id !== idLista);
    this.guardarStorage();
  }

  public editarLista(listaEditada: Lista) {
    this.listas.forEach((listaData) => {
      if (listaData.id === listaEditada.id) {
        listaData.titulo = listaEditada.titulo;
      }
    });
    this.guardarStorage();
  }

  public guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  public cargarStorage() {
    if (localStorage.getItem("data")) {
      this.listas = JSON.parse(localStorage.getItem("data"));
    }
  }
}
