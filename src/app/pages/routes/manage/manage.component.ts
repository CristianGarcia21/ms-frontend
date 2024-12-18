import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from 'src/app/models/contract.model';
import { Route } from 'src/app/models/route.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ContractService } from 'src/app/services/contract.service';
import { RouteService } from 'src/app/services/route.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  route: Route;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  vehicles: Vehicle[];
  contracts: Contract[];

  constructor(
    private routeService: RouteService,
    private vehicleService: VehicleService,
    private contractService: ContractService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.route = { id: 0, contract_id: 0, vehicle_id: 0};
    this.mode = 0;
    this.configFormGroup();
    this.trySend = false;
    this.vehicles = [];
    this.contracts = [];
  }

  ngOnInit(): void {
    const currentUrl = this.activatedRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      console.log(this.mode);
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activatedRoute.snapshot.params.id) {
      this.route.id = this.activatedRoute.snapshot.params.id;
      this.getRoute(this.route.id);
    }
    this.loadVehicles();
    this.loadContracts();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      contract_id: ["",[Validators.required, Validators.min(1)],],
      vehicle_id: ["", [Validators.required, Validators.min(1)] ],
    });
  }
  loadVehicles() {
    this.vehicleService.list().subscribe(data => {
      this.vehicles = data;
    });
  }

  loadContracts() {
    this.contractService.list().subscribe(data => {
      this.contracts = data;
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getRoute(id: number) {
    this.routeService.view(id).subscribe((data) => {
      this.route = data;
      this.theFormGroup.patchValue(this.route);
    });
  }

  create() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.routeService.create(this.route).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["routes/list"]);
    });
  }

  update() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.routeService.update(this.route).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["routes/list"]);
    });
  }
}
