import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  vehicle: Vehicle;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.vehicle = {
      id: 0,
      plate: '',
      brand: '',
      type_vehicle: '',
      load_capacity: 0,
      latitude: 0,
      longitude: 0,
    };
    this.mode = 0;
    this.trySend = false;
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.activatedRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    if (this.activatedRoute.snapshot.params.id) {
      const id = this.activatedRoute.snapshot.params.id;
      this.getVehicle(id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      plate: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]+$/)]],
      brand: ['', [Validators.required, Validators.minLength(2)]],
      type_vehicle: ['', [Validators.required, Validators.minLength(3)]],
      load_capacity: ['', [Validators.required, Validators.min(1)]],
      latitude: [
        '',
        [Validators.required, Validators.min(-90), Validators.max(90)],
      ],
      longitude: [
        '',
        [Validators.required, Validators.min(-180), Validators.max(180)],
      ],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getVehicle(id: number) {
    this.vehicleService.view(id).subscribe((data) => {
      this.vehicle = data;
      this.theFormGroup.patchValue(this.vehicle); // Actualizar el formulario con los datos del vehículo
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        'Error en el formulario',
        'Ingresa correctamente los datos solicitados',
        'error'
      );
      return;
    }

    const formData = this.theFormGroup.value; // Obtenemos los datos del formulario
    this.vehicleService.create(formData).subscribe(() => {
      Swal.fire('Creado', 'El registro ha sido creado', 'success');
      this.router.navigate(['vehicles/list']);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        'Error en el formulario',
        'Ingresa correctamente los datos solicitados',
        'error'
      );
      return;
    }

    const formData = { ...this.vehicle, ...this.theFormGroup.value }; // Combinamos los datos del formulario con el modelo
    this.vehicleService.update(formData).subscribe(() => {
      Swal.fire('Actualizado', 'El registro ha sido actualizado', 'success');
      this.router.navigate(['vehicles/list']);
    });
  }
}
