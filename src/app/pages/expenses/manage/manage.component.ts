import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { Expenses } from 'src/app/models/expenses.model';
import { Owner } from 'src/app/models/owner.model';
import { Receipt } from 'src/app/models/receipt.model';
import { Service } from 'src/app/models/service.model';
import { DriverService } from 'src/app/services/driver.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { OwnerService } from 'src/app/services/owner.service';
import { ReceiptService } from 'src/app/services/receipt.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  expenses: Expenses;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  owners: Owner[] = [];
  services: Service[] = [];
  drivers: Driver[] = [];
  receipts: Receipt[] = [];
  

  constructor(
    private expensesService: ExpensesService,
    private ownerService: OwnerService,
    private serviceService: ServiceService,
    private driverService: DriverService,
    private receiptService: ReceiptService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.expenses = { id: 0, amount: 0, description: "", date: new Date() };
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
      this.expenses.id = this.activatedRoute.snapshot.params.id;
      this.getExpenses(this.expenses.id);
    }
    this.loadOwners();
    this.loadServices();
    this.loadDrivers();
    this.loadReceipts();
  }

  loadOwners() {
    this.ownerService.list().subscribe(data => {
      this.owners = data;
    });
  }

  loadServices() {
    this.serviceService.list().subscribe(data => {
      this.services = data;
    });
  }

  loadDrivers() {
    this.driverService.list().subscribe(data => {
      this.drivers = data;
    });
  }

  loadReceipts() {
    this.receiptService.list().subscribe(data => {
      this.receipts = data;
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      amount: ["",[Validators.required, Validators.min(1)],],
      description: ["", [Validators.required, Validators.maxLength(255)] ],
      date: ["", [Validators.required],],
      owner_id: ["",[Validators.required ],],
      service_id: ["",[Validators.required ],],
      driver_id: ["",[Validators.required ],],
      receipt_id: ["",[Validators.required ],],
    });
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getExpenses(id: number) {
    this.expensesService.view(id).subscribe((data) => {
      this.expenses = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    const formData = { ...this.theFormGroup.value };

    // Asegúrate de formatear la fecha en 'YYYY-MM-DD'
    formData.date = this.formatDate(new Date(formData.date));


    console.log('Datos ajustados enviados:', formData);

    this.expensesService.create(formData).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["expenses/list"]);
    });
  }

  update() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    const formData = { ...this.theFormGroup.value };

    // Asegúrate de formatear la fecha en 'YYYY-MM-DD'
    formData.date = this.formatDate(new Date(formData.date));


    this.expensesService.update(formData).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["expenses/list"]);
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
