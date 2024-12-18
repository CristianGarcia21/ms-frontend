import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';
import { Route } from 'src/app/models/route.model';
import { RouteService } from 'src/app/services/route.service';
import { OperationService } from 'src/app/services/operation.service';
import { Operation } from 'ol/source/Raster';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  vehicles: Vehicle[];
  routes: Route[];
  operations: Operation[];
  selectedVehicleIdForRoutes: number | null;
  selectedVehicleIdForOperations: number | null;

  constructor(
    private vehicleService: VehicleService,
    private operationService: OperationService,
    private routeService: RouteService,
    private router: Router
  ) {
    this.vehicles = [];
    this.routes = [];
    this.operations = [];
    this.selectedVehicleIdForRoutes = null;
    this.selectedVehicleIdForOperations = null;
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.vehicleService.list().subscribe(data => {
      this.vehicles = data;
    });
    console.log(this.vehicles);
  }

  showRoutes(vehicleId: number) {
    if (this.selectedVehicleIdForRoutes === vehicleId) {
      this.selectedVehicleIdForRoutes = null; // Ocultar rutas si ya están visibles
      this.routes = [];
    } else {
      this.selectedVehicleIdForRoutes = vehicleId;
      this.routeService.listByVehicle(vehicleId).subscribe(data => {
        this.routes = data;
        console.log('Routes loaded for vehicle:', this.routes);
      });
    }
  }

  showOperations(vehicleId: number) {
    if (this.selectedVehicleIdForOperations === vehicleId) {
      this.selectedVehicleIdForOperations = null; // Ocultar operaciones si ya están visibles
      this.operations = [];
    } else {
      this.selectedVehicleIdForOperations = vehicleId;
      this.operationService.listByVehicle(vehicleId).subscribe(data => {
        this.operations = data;
        console.log('Operations loaded for vehicle:', this.operations);
      });
    }
  }

  delete(id: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Realmente quieres eliminar este elemento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehicleService.delete(id).subscribe(data => {
          this.ngOnInit();
          Swal.fire({
            title: "Eliminado!",
            text: "El elemento ha sido eliminado.",
            icon: "success"
          });
        });
      }
    });
  }

  view(id: number) {
    this.router.navigate(['vehicles/view/' + id]);
  }

  update(id: number) {
    this.router.navigate(['vehicles/update/' + id]);
  }

  create() {
    this.router.navigate(['vehicles/create']);
  }
}