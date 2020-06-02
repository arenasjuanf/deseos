import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  listas: any;
  @Input() terminada;
  @ViewChild(IonList, {static: false}) lista: IonList;
  constructor(
    private router: Router,
    public deseosService: DeseosService,
    public alertController: AlertController
  ) {
    this.listas = this.deseosService.listas;
  }

  ngOnInit() {}

  ir(lista){
    console.log(this.terminada);
    this.router.navigateByUrl('/tabs/tab' + (this.terminada ? '2' : '1') + '/agregar/'+lista.id);
  }

  async delete(lista: Lista){

    const alert = await this.alertController.create({

      header: 'Borrar Lista',
      message: 'Desea eliminar esta lista?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Si',
          role: 'ok',
          cssClass: 'primary',
          handler: () => {
            const pos = this.deseosService.listas.indexOf(lista);
            if (pos != -1) {
              this.deseosService.listas.splice(pos, 1);
            }
            this.deseosService.saveStorage();
            this.lista.closeSlidingItems();
            alert.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

  async edit(lista){

    const posicion = this.deseosService.listas.indexOf(lista);

    const alert = await this.alertController.create({
      header: 'Nombre de la lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nuevo Nombre',
          value: lista.titulo
        }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Ok',
        handler: (data) => {
          if(data.titulo && posicion !== -1){
            this.deseosService.listas[posicion].titulo = data.titulo;
            this.deseosService.saveStorage();
          }
          this.lista.closeSlidingItems();
        }
      }]
    });

    alert.present();
  }
}
