import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  //mostrar las busquedas anteriores dando click en cada uno de sus botones correspondientes
  buscar(termino:string){
    this.gifsService.buscarGifs(termino)
  }


  get historial(){
    return this.gifsService.historial;
  }
  constructor(private gifsService:GifsService){}

 }
