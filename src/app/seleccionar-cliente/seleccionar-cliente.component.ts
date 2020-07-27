import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../models/customer';


@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes: Customer[] = new Array<Customer>();
  @Input('nombre')  nombre: string;
  @Output('seleccionoCliente') seleccionoCliente = new EventEmitter();
  @Output('canceloCliente') canceloCliente = new EventEmitter();
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection<any>('clientes').get().subscribe((resultados)=>{
      this.clientes.length = 0;
      resultados.docs.forEach((item)=>{
        let cliente: any = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.visible = false;
        this.clientes.push(cliente);
      })
    })


  }


  buscarClientes(nombre: string)
  {
    this.clientes.forEach((cliente)=>{
      if(cliente.name.toLowerCase().includes(nombre.toLowerCase()))
      {
        cliente.visible = true;
      }
      else
      {
        cliente.visible = false;
      }
    })
  }

  seleccionarCliente(cliente:Customer)
  {
    this.nombre = cliente.name + ' ' + cliente.lastname;
    this.clientes.forEach((cliente)=>{
      cliente.visible = false;
    })
  
    this.seleccionoCliente.emit(cliente)
  }

  cancelarCliente()
  {
    this.nombre = undefined;
    this.canceloCliente.emit();
  }
}
