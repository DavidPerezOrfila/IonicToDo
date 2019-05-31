import { Lista } from 'src/app/models/lista.model';
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeseosService } from './../../services/deseos.service';
import { IonList, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {
  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor (public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController) {
    }
listaSeleccionada(lista: Lista) {
  if (this.terminada) {
    this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
  } else {
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  }
}
async editarLista(lista: Lista) {

  const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [{
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            if (data.titulo.lenght === 0) {
              return;
            }
            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
  });
  alert.present();
}

borrarLista(lista: Lista) {
  this.deseosService.borrarLista(lista);
}

}
