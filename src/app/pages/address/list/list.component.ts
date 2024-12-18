import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  addressses : Address[]

  constructor(
    private addressService: AddressService,
    private router: Router
  ) {
    this.addressses= []
   }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.addressService.list().subscribe(data => {
      console.log(data);
      this.addressses = data;
    });
  }

  delete(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Realmente quieres eliminar este elemento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.addressService.delete(id).subscribe(data=>{
          this.ngOnInit()
          Swal.fire({
            title: "Eliminado!",
            text: "El elemento a sido eliminado.",
            icon: "success"
          });
        })
      }
    });
  }

  view(id:number){
    this.router.navigate(['addresses/view/'+id])
  }

  update(id:number){
    this.router.navigate(['addresses/update/'+id])
  }

  create(){
    this.router.navigate(['addresses/create'])
  }
}
