import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  pendientes: any;
  @Input() terminada;

  constructor(
    private router: Router,
    public deseosService: DeseosService
  ) {
    this.pendientes = this.terminada ? this.deseosService.obtenerTerminadas() : this.deseosService.listas;
  }

  ngOnInit() {}

  ir(lista){
    this.router.navigateByUrl('/tabs/tab' + (this.terminada ? '2' : '1') + '/agregar/'+lista.id);
  }
}
