import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from 'src/app/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';
import { ClientService } from 'src/app/services/client.service';
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
  clients: Client[] = [];

  constructor(
    private contractService: ContractService,
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.contract = { id: 0, start_date: new Date(), end_date: new Date(), amount: 0, estate: false, client_id: 0 };
    this.mode = 0;
    this.configFormGroup();
    this.trySend = false;
  }

  ngOnInit(): void {
    const currentUrl = this.activatedRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activatedRoute.snapshot.params.id) {
      this.contract.id = this.activatedRoute.snapshot.params.id;
      this.getContract(this.contract.id);
    }
    this.loadClients();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      start_date: [formatDate(this.contract.start_date, 'yyyy-MM-dd', 'en'), [Validators.required]],
      end_date: [formatDate(this.contract.end_date, 'yyyy-MM-dd', 'en'), [Validators.required]],
      amount: [this.contract.amount, [Validators.required, Validators.min(1)]],
      estate: [this.contract.estate],
      client_id: [null, [Validators.required]]
    });
  }

  loadClients() {
    this.clientService.list().subscribe(data => {
      this.clients = data;
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getContract(id: number) {
    this.contractService.view(id).subscribe((data) => {
      this.contract = data;
      this.theFormGroup.patchValue({
        start_date: formatDate(this.contract.start_date, 'yyyy-MM-dd', 'en'),
        end_date: formatDate(this.contract.end_date, 'yyyy-MM-dd', 'en'),
        amount: this.contract.amount,
        estate: this.contract.estate,
        client_id: this.contract.client_id
      });
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingresa correctamente los datos solicitados', 'error');
      return;
    }

    const formData = {
      start_date: this.theFormGroup.get('start_date')?.value,
      end_date: this.theFormGroup.get('end_date')?.value,
      amount: Number(this.theFormGroup.get('amount')?.value),
      estate: this.theFormGroup.get('estate')?.value,
      client_id: Number(this.theFormGroup.get('client_id')?.value),
    };

    this.contractService.create(formData).subscribe({
      next: () => {
        Swal.fire('Creado', 'El registro ha sido creado.', 'success');
        this.router.navigate(['contracts/list']);
      },
      error: (err) => {
        console.error('Error creating contract:', err);
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
      start_date: this.theFormGroup.get('start_date')?.value,
      end_date: this.theFormGroup.get('end_date')?.value,
      amount: Number(this.theFormGroup.get('amount')?.value),
      estate: this.theFormGroup.get('estate')?.value,
      client_id: Number(this.theFormGroup.get('client_id')?.value),
    };

    this.contractService.update(this.contract.id!, formData).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'El registro ha sido actualizado.', 'success');
        this.router.navigate(['contracts/list']);
      },
      error: (err) => {
        console.error('Error updating contract:', err);
        Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
      }
    });
  }
}