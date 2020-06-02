import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  listas: any;
  @Input() terminada;

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
          cssClass: 'secondary'
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
            alert.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }
}
