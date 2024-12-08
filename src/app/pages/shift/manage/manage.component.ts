import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Shift } from 'src/app/models/shift.model';
import { ShiftService } from 'src/app/services/shift.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  shift: Shift;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private shiftService: ShiftService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.shift = { id: 0, start_time: new Date(), end_time: new Date(), start_mileage: 0, end_mileage: 0 };
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
      this.shift.id = this.activatedRoute.snapshot.params.id;
      this.getClients(this.shift.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group(
      {
        start_time: ["", [Validators.required]],
        end_time: ["", [Validators.required, this.endDateAfterStartDateValidator()]],
        start_mileage: ["", [Validators.required]],
        end_mileage: ["", [Validators.required, this.validateMileage()]],
        driver_id: ["", [Validators.required]],
      });

  }

  validateMileage() {
    return(control: AbstractControl) => {
      const startMileage = this.theFormGroup?.get('start_mileage')?.value;
      const endMileage = control.value;

      if (startMileage !== null && endMileage !== null && endMileage <= startMileage) {
        return { endMileageNotGreater: true };
      }
      return null;
    }
  }


  endDateAfterStartDateValidator() {
    return (control: AbstractControl) => {
      const startDate = this.theFormGroup?.get('start_time')?.value;
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

  getClients(id: number) {
    this.shiftService.view(id).subscribe((data) => {
      this.shift = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error");
      return;
    }

    const formData = { ...this.theFormGroup.value };

    // Convertir las fechas al formato 'yyyy-MM-dd'
    formData.start_time = this.formatDate(new Date(formData.start_time));
    formData.end_time = this.formatDate(new Date(formData.end_time));

    console.log('Datos ajustados enviados:', formData);

    this.shiftService.create(formData).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["shifts/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error");
      return;
    }

    // Crear una copia de los datos del formulario
    const formData = { ...this.theFormGroup.value };

    // Asegurarse de que las fechas estén en el formato correcto
    formData.start_time = this.formatDate(new Date(formData.start_time));
    formData.end_time = this.formatDate(new Date(formData.end_time));

    // Agregar el ID desde el objeto `shift`
    const id = this.shift.id;

    if (!id) {
      console.error('Error: No se encontró un ID válido para la actualización.');
      Swal.fire("Error", "No se encontró un ID válido para la actualización", "error");
      return;
    }

    console.log('Datos ajustados enviados para actualización:', { id, ...formData });

    // Llamar al servicio con el ID y los datos del formulario
    this.shiftService.update({ id, ...formData }).subscribe(
      (data) => {
        Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
        this.router.navigate(["shifts/list"]);
      },
      (error) => {
        console.error("Error durante la actualización:", error);
        Swal.fire("Error", "No se pudo actualizar el registro", "error");
      }
    );
  }
  
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes ajustado y con ceros
    const day = String(date.getDate()).padStart(2, '0'); // Día con ceros

    return `${year}-${month}-${day}`; // Formato 'yyyy-MM-dd'
  }
}
