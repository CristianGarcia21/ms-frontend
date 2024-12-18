import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from 'src/app/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { Client } from 'src/app/models/client.model';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  contract: Contract;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  client:Client[] = []

  constructor(
    private contracService: ContractService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.contract = { id: 0, start_date: new Date(), end_date: new Date(), amount: 0, estate: false };
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
      this.contract.id = this.activatedRoute.snapshot.params.id;
      this.getClients(this.contract.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      start_date: ['',[Validators.required]],
      end_date: ['',[Validators.required, this.endDateAfterStartDateValidator() ]],
      amount: ['',[Validators.required,Validators.min(1)]],
      estate: ['',[Validators.required] ],
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

  getClients(id: number) {
    this.contracService.view(id).subscribe((data) => {
      this.contract = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    // Formatear las fechas antes de enviar
  const formattedData = {
    ...this.theFormGroup.value,
    start_date: formatDate(this.theFormGroup.get('start_date')?.value, 'yyyy-MM-dd', 'en-US'),
    end_date: formatDate(this.theFormGroup.get('end_date')?.value, 'yyyy-MM-dd', 'en-US'),
  };
  console.log(formattedData);

    this.contracService.create(formattedData).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["contracts/list"]);
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
      id: this.contract.id,
      start_date: formatDate(this.theFormGroup.get('start_date')?.value, 'yyyy-MM-dd', 'en-US'),
      end_date: formatDate(this.theFormGroup.get('end_date')?.value, 'yyyy-MM-dd', 'en-US'),
    };
    console.log('Datos enviados al backend:', formattedData);
    this.contracService.update(formattedData).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["contracts/list"]);
    });
  }

}
