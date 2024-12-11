import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  payment: Payment;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.payment = { id: 0, amount: 0, start_date: new Date(), end_date: new Date(), status: false };
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
      this.payment.id = this.activatedRoute.snapshot.params.id;
      this.getPayment(this.payment.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      amount: ["",[Validators.required, Validators.min(1)],],
      start_date: ["", [Validators.required] ],
      end_date: ['',[Validators.required, this.endDateAfterStartDateValidator() ]],
      status: ["",[Validators.required, ],],
      contract_id: ["",[Validators.required ],],
      receipt_id: ["",[Validators.required ],],
    });
  }

  endDateAfterStartDateValidator() {
    return (control: AbstractControl) => {
      const startDate = this.theFormGroup?.get('start_date')?.value;
      const endDate = control.value;

      if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
        return { endDateBeforeStartDate: true }; // Error personalizado
      }
      return null; // Válido
    };
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getPayment(id: number) {
    this.paymentService.view(id).subscribe((data) => {
      this.payment = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    const formattedData = {
      ...this.theFormGroup.value,
      start_date: formatDate(this.theFormGroup.get('start_date')?.value, 'yyyy-MM-dd', 'en-US'),
      end_date: formatDate(this.theFormGroup.get('end_date')?.value, 'yyyy-MM-dd', 'en-US'),
    }
    this.paymentService.create(formattedData).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["payments/list"]);
    });
  }

  update() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    const formattedData = {
      ...this.theFormGroup.value,
      start_date: formatDate(this.theFormGroup.get('start_date')?.value, 'yyyy-MM-dd', 'en-US'),
      end_date: formatDate(this.theFormGroup.get('end_date')?.value, 'yyyy-MM-dd', 'en-US'),
    }
    this.paymentService.update(formattedData).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["payments/list"]);
    });
  }

}
