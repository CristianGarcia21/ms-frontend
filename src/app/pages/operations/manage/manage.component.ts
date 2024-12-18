import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipality } from 'src/app/models/municipality.model';
import { Operations } from 'src/app/models/operations.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { MunicipalityService } from 'src/app/services/municipality.service';
import { OperationService } from 'src/app/services/operation.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  operation: Operations;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  municipalities: Municipality[] = [];
  vehicles: Vehicle[] = [];

  constructor(
    private operationService: OperationService,
    private municipalityService: MunicipalityService,
    private vehicleService: VehicleService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.operation = { id: 0, municipality_id: 0, vehicle_id: 0 };
    this.mode = 0;
    this.trySend = false;
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      const id = this.activateRoute.snapshot.params.id
      this.getOperation(id)
    }
    this.loadMunicipalities();
    this.loadVehicles();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      municipality_id: ['', [Validators.required, Validators.min(1)]], // Número mayor a 0
      vehicle_id: ['', [Validators.required, Validators.min(1)]] // Número mayor a 0
    });
  }

  loadMunicipalities() {
    this.municipalityService.list().subscribe(data => {
      this.municipalities = data;
    });
  }

  loadVehicles() {
    this.vehicleService.list().subscribe(data => {
      this.vehicles = data;
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getOperation(id: number) {
    this.operationService.view(id).subscribe(data => {
      this.operation = data
      // this.theFormGroup.patchValue(this.operation); // Actualizar el formulario con los datos del vehículo
    })
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingresa correctamente los datos solicitados', 'error');
      return;
    }

    const formData = {
      municipality_id: Number(this.theFormGroup.get('municipality_id')?.value),
      vehicle_id: Number(this.theFormGroup.get('vehicle_id')?.value),
      // otros campos...
    };

    this.operationService.create(formData).subscribe({
      next: () => {
        Swal.fire('Creado', 'El registro ha sido creado.', 'success');
        this.router.navigate(['operations/list']);
      },
      error: (err) => {
        console.error('Error creating operation:', err);
        Swal.fire('Error', 'No se pudo crear el registro', 'error');
      }
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingresa correctamente los datos solicitados', 'error');
      return;
    }

    const formData = {
      municipality_id: Number(this.theFormGroup.get('municipality_id')?.value),
      vehicle_id: Number(this.theFormGroup.get('vehicle_id')?.value),
      // otros campos...
    };

    this.operationService.update(this.operation.id!, formData).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'El registro ha sido actualizado.', 'success');
        this.router.navigate(['operations/list']);
      },
      error: (err) => {
        console.error('Error updating operation:', err);
        Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
      }
    });
  }
}

