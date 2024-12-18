import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Insurances } from 'src/app/models/insurances.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { InsurancesService } from 'src/app/services/insurances.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  insurances: Insurances;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  vehicles: Vehicle[] = [];

  constructor(
    private insurancesServices: InsurancesService,
    private vehicleService: VehicleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.insurances = { id: 0, insurance_company: "", policy_number: "", start_date: new Date(), end_date: new Date(), amount: 0, status: false };
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
      this.insurances.id = this.activatedRoute.snapshot.params.id;
      this.getInsurances(this.insurances.id);
    }
    this.loadVehicles();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      insurance_company: ["",[Validators.required, Validators.minLength(3)],],
      policy_number: ["", [Validators.required, Validators.minLength(5)] ],
      start_date: ["", [Validators.required],],
      end_date: ["",[Validators.required, this.endDateAfterStartDateValidator() ],],
      amount: ["",[Validators.required, Validators.min(1), ],],
      status: ["",[Validators.required],],
      vehicle_id: ["", [Validators.required],],
    });
  }

  loadVehicles() {
    this.vehicleService.list().subscribe(data => {
      this.vehicles = data;
    });
  }

  formatDate(date: string): string {
    return formatDate(date, 'dd/MM/yyyy', 'en-US'); // Cambia el formato según tus necesidades
  }

  endDateAfterStartDateValidator() {
    return (control: AbstractControl) => {
      const startDate = this.theFormGroup?.get('start_date')?.value;
      const endDate = control.value;

      if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
        return { endDateBeforeStartDate: true };
      }
      return null;
    };
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getInsurances(id: number) {
    this.insurancesServices.view(id).subscribe((data) => {
      this.insurances = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingresa correctamente los datos solicitados', 'error');
      return;
    }

    const formData = {
      insurance_company: this.theFormGroup.get('insurance_company')?.value,
      policy_number: this.theFormGroup.get('policy_number')?.value,
      start_date: this.theFormGroup.get('start_date')?.value,
      end_date: this.theFormGroup.get('end_date')?.value,
      amount: Number(this.theFormGroup.get('amount')?.value),
      status: this.theFormGroup.get('status')?.value,
      vehicle_id: Number(this.theFormGroup.get('vehicle_id')?.value)
    };

    this.insurancesServices.create(formData).subscribe({
      next: () => {
        Swal.fire('Creado', 'El registro ha sido creado.', 'success');
        this.router.navigate(['insurances/list']);
      },
      error: (err) => {
        console.error('Error creating insurance:', err);
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
      insurance_company: this.theFormGroup.get('insurance_company')?.value,
      policy_number: this.theFormGroup.get('policy_number')?.value,
      start_date: this.theFormGroup.get('start_date')?.value,
      end_date: this.theFormGroup.get('end_date')?.value,
      amount: Number(this.theFormGroup.get('amount')?.value),
      status: this.theFormGroup.get('status')?.value,
      vehicle_id: Number(this.theFormGroup.get('vehicle_id')?.value)
    };

    this.insurancesServices.update(this.insurances.id!, formData).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'El registro ha sido actualizado.', 'success');
        this.router.navigate(['insurances/list']);
      },
      error: (err) => {
        console.error('Error updating insurance:', err);
        Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
      }
    });
  }
}
