import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {
    this.loadStorage();
  }

  crearLista(titulo: string){
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.saveStorage();

    return nuevaLista.id;
  }

  saveStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  loadStorage(){
    if (localStorage.getItem('data')){
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
  }

  obtenerLista(id: string | number){
    id = Number(id);
    return this.listas.find(function(x){
      return x.id == id;
    })
  }

  obtenerTerminadas(){
    let terminadas = this.listas.filter(function(x){
      return x.terminada;
    })

    return terminadas;
  }
}
