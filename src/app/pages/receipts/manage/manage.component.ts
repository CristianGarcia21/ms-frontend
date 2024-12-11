import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Receipt } from 'src/app/models/receipt.model';
import { ReceiptService } from 'src/app/services/receipt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  receipt: Receipt;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private receiptService: ReceiptService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.receipt = { id: 0, customer_id: 0, total_amount: 0, status: false};
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
      this.receipt.id = this.activatedRoute.snapshot.params.id;
      this.getReceipt(this.receipt.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      customer_id: [0,[Validators.required, Validators.min(1)],],
      total_amount: [0, [Validators.required]],
      status: [false,[Validators.required],],
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getReceipt(id: number) {
    this.receiptService.view(id).subscribe((data) => {
      this.receipt = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    } 
    this.receiptService.create(this.receipt).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["receipts/list"]);
    });
  }

  update() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.receiptService.update(this.receipt).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["receipts/list"]);
    });
  }

}
