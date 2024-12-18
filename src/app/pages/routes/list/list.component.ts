import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from 'src/app/models/route.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { RouteService } from 'src/app/services/route.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  route : Route[]
  vehicles: Vehicle[];

  constructor(
    private routeService: RouteService,
    private vehicleService: VehicleService,
    private router: Router
  ) {
    this.route= []
    this.vehicles = [];
   }

  ngOnInit(): void {
    this.list()
    this.loadVehicles();
  }

  list(){
    this.routeService.list().subscribe(data => {
      this.route = data
    })
  }
  loadVehicles() {
    this.vehicleService.list().subscribe(data => {
      this.vehicles = data;
    });
  }

  getVehiclePlate(vehicleId: number): string {
    const vehicle = this.vehicles.find(veh => veh.id === vehicleId);
    return vehicle ? vehicle.plate : 'Unknown Vehicle';
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
        this.routeService.delete(id).subscribe(data=>{
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
    this.router.navigate(['routes/view/'+id])
  }

  update(id:number){
    this.router.navigate(['routes/update/'+id])
  }

  create(){
    this.router.navigate(['routes/create'])
  }

}
