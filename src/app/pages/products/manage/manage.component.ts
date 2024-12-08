import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/models/product.model";
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

  constructor(
    private productService: ProductService,
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
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      weight: ["", [Validators.required, Validators.min(1)]],
      size: ["", [Validators.required, Validators.min(1)]],
      type: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(perecedero|no perecedero|líquido|otro)$/),
        ],
      ],
      lot_id: ["", [Validators.required]],
      client_id: ["", [Validators.required]],
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
    this.productService.create(this.products).subscribe((data) => {
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
    this.productService.update(this.products).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["products/list"]);
    });
  }
}
