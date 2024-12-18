import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { VehicleDrivers } from 'src/app/models/vehicle-drivers.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { DriverService } from 'src/app/services/driver.service';
import { VehicleDriversService } from 'src/app/services/vehicle-drivers.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  vehiDrive: VehicleDrivers;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  vehicles: Vehicle[] = [];
  drivers: Driver[] = [];

  constructor(
    private vehiDriveService: VehicleDriversService,
    private vehicleService: VehicleService,
    private driverService: DriverService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.vehiDrive = { id: 0, status: "" };
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
      this.vehiDrive.id = this.activatedRoute.snapshot.params.id;
      this.getClients(this.vehiDrive.id);
    }
    this.loadVehicles();
    this.loadDrivers();
  }

  loadVehicles() {
    this.vehicleService.list().subscribe(data => {
      this.vehicles = data;
    });
  }

  loadDrivers() {
    this.driverService.list().subscribe(data => {
      this.drivers = data;
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      vehicle_id: ["",[Validators.required],],
      driver_id: ["", [Validators.required] ],
      status: ["",[Validators.required, Validators.pattern(/^(activo|inactivo)$/), ],],

    });
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getClients(id: number) {
    this.vehiDriveService.view(id).subscribe((data) => {
      this.vehiDrive = data;
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

    this.vehiDriveService.create(formData).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["vehicle-drivers/list"]);
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

    this.vehiDriveService.update(this.vehiDrive.id!, formData).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["vehicle-drivers/list"]);
    });
  }

}
