import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Company } from 'src/app/models/company.model';
import { ClientService } from 'src/app/services/client.service';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  companies: Company;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  clients: Client[] = [];

  constructor(
    private companyService: CompanyService,
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.companies = { id: 0, name: "", nit: "" };
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
      this.companies.id = this.activatedRoute.snapshot.params.id;
      this.getCompanies(this.companies.id);
    }
    this.loadClients();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ["",[Validators.required, Validators.minLength(3)],],
      nit: ["", [Validators.required,Validators.pattern(/^\d{5,15}-\d{1}$/),], ],
      client_id: ["", [Validators.required],],
    });
  }

  loadClients() {
    this.clientService.list().subscribe(data => {
      this.clients = data;
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getCompanies(id: number) {
    this.companyService.view(id).subscribe((data) => {
      this.companies = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingresa correctamente los datos solicitados', 'error');
      return;
    }

    const formData = {
      name: this.theFormGroup.get('name')?.value,
      nit: this.theFormGroup.get('nit')?.value,
      client_id: Number(this.theFormGroup.get('client_id')?.value)
    };

    this.companyService.create(formData).subscribe({
      next: () => {
        Swal.fire('Creado', 'El registro ha sido creado.', 'success');
        this.router.navigate(['companies/list']);
      },
      error: (err) => {
        console.error('Error creating company:', err);
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
      name: this.theFormGroup.get('name')?.value,
      nit: this.theFormGroup.get('nit')?.value,
      client_id: Number(this.theFormGroup.get('client_id')?.value)
    };

    this.companyService.update(this.companies.id!, formData).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'El registro ha sido actualizado.', 'success');
        this.router.navigate(['companies/list']);
      },
      error: (err) => {
        console.error('Error updating company:', err);
        Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
      }
    });
  }
}
