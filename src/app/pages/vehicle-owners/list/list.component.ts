import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleOwner } from 'src/app/models/vehicle-owner.model';
import { VehicleOwnerService } from 'src/app/services/vehicle-owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  vehiOwner : VehicleOwner[]

  constructor(
    private vehiOwnerService: VehicleOwnerService,
    private router: Router
  ) {
    this.vehiOwner= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.vehiOwnerService.list().subscribe(data => {
      this.vehiOwner = data
    })
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
        this.vehiOwnerService.delete(id).subscribe(data=>{
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
    this.router.navigate(['vehicle_owners/view/'+id])
  }

  update(id:number){
    this.router.navigate(['vehicle_owners/update/'+id])
  }

  create(){
    this.router.navigate(['vehicle_owners/create'])
  }

}
