import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  pendientes: Lista[] = [];
  
  constructor(
    public deseosService: DeseosService,
    private router: Router,
    public alertController: AlertController
  ) {
    this.pendientes = this.deseosService.listas;
  }

  async agregarLista(){
    
    const alert = await this.alertController.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'nombre de la lista'
        }
      ],
      buttons: [{
        text:'Cancelar',
        role:'cancel'
      }, {
          text: 'Ok',
          handler: (data) => {
            if(data.titulo){
              const id= this.deseosService.crearLista(data.titulo);
              this.router.navigateByUrl('tabs/tab1/agregar/'+id);
            }
          }
        }]
    });

    alert.present();
  }

}
