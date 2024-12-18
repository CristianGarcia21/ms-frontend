import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';
import { Route } from 'src/app/models/route.model';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  vehicle : Vehicle[]
  routes: Route[];
  selectedVehicleId: number | null;

  constructor(
    private vehicleService: VehicleService,
    private routeService: RouteService,
    private router: Router
  ) {
    this.vehicle= []
    this.routes = [];
    this.selectedVehicleId = null;
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.vehicleService.list().subscribe(data => {
      this.vehicle = data
    })
    console.log(this.vehicle);
  }

  showRoutes(vehicleId: number) {
    if (this.selectedVehicleId === vehicleId) {
      this.selectedVehicleId = null; // Ocultar rutas si ya están visibles
    } else {
      this.selectedVehicleId = vehicleId;
      this.routeService.listByVehicle(vehicleId).subscribe(data => {
        this.routes = data;
        console.log('Routes loaded for vehicle:', this.routes);
      });
    }
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
        this.vehicleService.delete(id).subscribe(data=>{
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
    this.router.navigate(['vehicles/view/'+id])
  }

  update(id:number){
    this.router.navigate(['vehicles/update/'+id])
  }

  create(){
    this.router.navigate(['vehicles/create'])
  }
}
