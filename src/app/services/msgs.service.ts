import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MsgsService {

  constructor() { }

  success(titulo: string, mensaje: string)
  {
    Swal.fire({
      title:titulo,
      text: mensaje,
      type: 'success'
    })
  }

  warning(titulo: string, mensaje: string)
  {
    Swal.fire({
      title:titulo,
      text: mensaje,
      type: 'warning'
    })
  }


  error(titulo: string, mensaje: string)
  {
    Swal.fire({
      title:titulo,
      text: mensaje,
      type: 'error'
    })
  }
}
