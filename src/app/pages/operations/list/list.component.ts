import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Municipality } from 'src/app/models/municipality.model';
import { Operations } from 'src/app/models/operations.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { MunicipalityService } from 'src/app/services/municipality.service';
import { OperationService } from 'src/app/services/operation.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  operations: Operations[]
  vehicles: Vehicle[];
  municipalities: Municipality[];

  constructor(
    private operationService: OperationService,
    private vehicleService: VehicleService,
    private municipalityService: MunicipalityService,
    private router: Router
  ) {
    this.operations = []
    this.vehicles = [];
    this.municipalities = [];
  }

  ngOnInit(): void {
    this.list()
    this.loadVehicles();
    this.loadMunicipalities();
  }

  loadVehicles() {
    this.vehicleService.list().subscribe(data => {
      this.vehicles = data;
    });
  }

  loadMunicipalities() {
    this.municipalityService.list().subscribe(data => {
      this.municipalities = data;
    });
  }

  getVehiclePlate(vehicleId: number): string {
    const vehicle = this.vehicles.find(veh => veh.id === vehicleId);
    return vehicle ? vehicle.plate : 'Unknown Vehicle';
  }

  getMunicipalityName(municipalityId: number): string {
    const municipality = this.municipalities.find(mun => mun.id === municipalityId);
    return municipality ? municipality.name : 'Unknown Municipality'; 
  }
  
  list(){
    this.operationService.list().subscribe(data => {
      this.operations = data
      console.log(data);
      
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
        this.operationService.delete(id).subscribe(data=>{
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
    this.router.navigate(['operations/view/'+id])
  }

  update(id:number){
    this.router.navigate(['operations/update/'+id])
  }

  create(): void {
    this.router.navigate(['operations/create']);
  }

}
