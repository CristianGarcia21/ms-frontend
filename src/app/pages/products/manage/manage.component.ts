import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { log } from "node:console";
import { Client } from "src/app/models/client.model";
import { Lot } from "src/app/models/lot.model";
import { Product } from "src/app/models/product.model";
import { ClientService } from "src/app/services/client.service";
import { LotService } from "src/app/services/lot.service";
import { ProductService } from "src/app/services/product.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  products: Product;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  clients: Client[] = [];
  lots: Lot[] = [];

  constructor(
    private productService: ProductService,
    private clientService: ClientService,
    private lotService: LotService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.products = { id: 0, description: "", weight: 0, size: 0, type: "" };
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
      this.products.id = this.activatedRoute.snapshot.params.id;
      this.getProducts(this.products.id);
    }
    this.loadClients();
    this.loadLots();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      description: ["", [Validators.required]],
      weight: [0, [Validators.required, Validators.min(1)]],
      size: [0, [Validators.required, Validators.min(1)]],
      type: ["",[
          Validators.required,
          Validators.pattern(/^(perecedero|no perecedero|líquido|otro)$/),
        ],],
      client_id: [null, [Validators.required]],
      lot_id: [null, [Validators.required]],
    });
  }

  loadClients() {
    this.clientService.list().subscribe(data => {
      this.clients = data;
      console.log(this.clients);
    });
  }

  loadLots() {
    this.lotService.list().subscribe(data => {
      this.lots = data;
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getProducts(id: number) {
    this.productService.view(id).subscribe((data) => {
      this.products = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingresa correctamente los datos solicitados",
        "error"
      );
      return;
    }
    const formData = {
      description: this.theFormGroup.get('description')?.value,
      weight: Number(this.theFormGroup.get('weight')?.value),
      size: Number(this.theFormGroup.get('size')?.value),
      type: this.theFormGroup.get('type')?.value,
      client_id: Number(this.theFormGroup.get('client_id')?.value),
      lot_id: Number(this.theFormGroup.get('lot_id')?.value),
    };
    this.productService.create(formData).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["products/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingresa correctamente los datos solicitados",
        "error"
      );
      return;
    }
    const formData = {
      description: this.theFormGroup.get('description')?.value,
      weight: Number(this.theFormGroup.get('weight')?.value),
      size: Number(this.theFormGroup.get('size')?.value),
      type: this.theFormGroup.get('type')?.value,
      client_id: Number(this.theFormGroup.get('client_id')?.value),
      lot_id: Number(this.theFormGroup.get('lot_id')?.value),
    };

    this.productService.update(formData).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["products/list"]);
    });
  }
}
