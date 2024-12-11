import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleDrivers } from 'src/app/models/vehicle-drivers.model';
import { VehicleDriversService } from 'src/app/services/vehicle-drivers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  vehiDriver : VehicleDrivers[]

  constructor(
    private vehiDriveService: VehicleDriversService,
    private router: Router
  ) {
    this.vehiDriver= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.vehiDriveService.list().subscribe(data => {
      this.vehiDriver = data
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
        this.vehiDriveService.delete(id).subscribe(data=>{
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
    this.router.navigate(['vehicle_drivers/view/'+id])
  }

  update(id:number){
    this.router.navigate(['vehicle_drivers/update/'+id])
  }

  create(){
    this.router.navigate(['vehicle_drivers/create'])
  }

}
