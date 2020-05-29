import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista;
  nombreItem = '';
  constructor(
  private deseosService: DeseosService,
  private route: ActivatedRoute,
  public toastController: ToastController) {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.lista =this.deseosService.obtenerLista(id);
    }
  }

  async presentToast(borrar?) {
    const toast = await this.toastController.create({
      message: 'Item ' + (borrar ? 'Borrado' : 'Agregado'),
      duration: 1500,
      color: 'tertiary'
    });
    toast.present();
  }


  ngOnInit() {

  }

  agregarItem(){
    if(this.nombreItem){
      const nuevoItem = new ListaItem(this.nombreItem);
      this.lista.items.push(nuevoItem);
      this.presentToast();
      this.nombreItem = '';
      this.deseosService.saveStorage();
    }
  }

  cambioCheck(item: ListaItem){
    this.revisarCompletados();
    this.deseosService.saveStorage();
  }

  delete(posicion){
    this.lista.items.splice(posicion,1);
    this.presentToast(true);
    this.revisarCompletados();
    this.deseosService.saveStorage();
  }

  revisarCompletados(){
    const pendientes = this.lista.items.filter(function (elem) {
      return !elem.completado;
    })

    if (!pendientes.length && this.lista.items.length > 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      delete this.lista.terminadaEn;
      this.lista.terminada = false;
    }
  }
}
