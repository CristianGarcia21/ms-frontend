import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/models/owner.model';
import { VehicleOwner } from 'src/app/models/vehicle-owner.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { OwnerService } from 'src/app/services/owner.service';
import { VehicleOwnerService } from 'src/app/services/vehicle-owner.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  vehiOwner: VehicleOwner;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  vehicles: Vehicle[] = [];
  owners: Owner[] = [];

  constructor(
    private vehiOwnerService: VehicleOwnerService,
    private vehicleService: VehicleService,
    private ownerService: OwnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.vehiOwner = { id: 0, status: "" };
    this.mode = 0;
    this.configFormGroup();
    this.trySend = false;
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
      this.vehiOwner.id = this.activatedRoute.snapshot.params.id;
      this.getVehiOwners(this.vehiOwner.id);
    }
    this.loadVehicles();
    this.loadOwners();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      vehicle_id: ["",[Validators.required],],
      owner_id: ["", [Validators.required] ],
      status: ["",[Validators.required, Validators.pattern(/^(activo|inactivo)$/), ],],

    });
  }

  loadVehicles() {
    this.vehicleService.list().subscribe(data => {
      this.vehicles = data;
    });
  }

  loadOwners() {
    this.ownerService.list().subscribe(data => {
      this.owners = data;
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getVehiOwners(id: number) {
    this.vehiOwnerService.view(id).subscribe((data) => {
      this.vehiOwner = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error");
      return;
    }

    const formData = { ...this.theFormGroup.value };

    console.log('Datos ajustados enviados:', formData);

    this.vehiOwnerService.create(formData).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["vehicle-owners/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error");
      return;
    }

    const formData = { ...this.theFormGroup.value };

    console.log('Datos ajustados enviados:', formData);

    this.vehiOwnerService.update(this.vehiOwner.id!, formData).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["vehicle-owners/list"]);
    });
  }

}
