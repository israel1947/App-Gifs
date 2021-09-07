import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Gifs, SerchGifsResponsive } from '../interfacess/interface.gifs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  //llave de la api
  private apiKey:string ='UzTbxV7RLEd5M5k715oZv5ICgkwjL8iq';
  private servicioUrl:string='https://api.giphy.com/v1/gifs';

  private _historial:string[]= [];

  //cambiar el valor de any por su resultado correspondiente. Gifs es el valor correspondiente, de SerchGifsResponsive que se encuentra en el arcchivo de interface. este contiene la paginacio, arreglo, y la meta del archivo.
  public resultado:Gifs[]=[];
  
  get historial(){
    return [...this._historial];
  }

  // hacer peticiones http
  constructor(private http: HttpClient){

    //mostrar historial de busqueda en el navegador sin que se borreo una vez se recarge el navegador
    if( localStorage.getItem('historial') ){
      this._historial=JSON.parse( localStorage.getItem('historial')!);
    }

    //guardar resultados de la ultima busqueda
    if(localStorage.getItem('resultado') ){
      this.resultado=JSON.parse( localStorage.getItem('resultado')!);
    }

  }

  buscarGifs(query:string){

    //mostrar el historial todo en minuscula
     query= query.trim().toLocaleLowerCase();

    //no mostrar la misma  busqueda 2 veces en el historial
    if(!this._historial.includes( query )){
      this._historial.unshift( query );

      //esto hace que el limite a  mostrar sea de 10 busquedas en el historial
      this._historial =this._historial.splice(0,10)

      //grabar la informacion el el LocalStorage(JSON.stringify: convierte un objeto o valor de JavaScript en una cadena de texto)
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    //
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);


    //hacer el llamado de la API
    this.http.get<SerchGifsResponsive>(`${this.servicioUrl}/search`, { params:params } )
    .subscribe((resp) =>{
     // console.log(resp.data);
      this.resultado=resp.data;

       //guardar resultados de la ultima busqueda en el localstorage
       localStorage.setItem('resultado', JSON.stringify (this.resultado) );
    })


  }
}
