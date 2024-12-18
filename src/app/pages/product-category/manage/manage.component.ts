import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { ProductCategory } from 'src/app/models/product-category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  productCategory: ProductCategory;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.productCategory = { id: 0};
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
      this.productCategory.id = this.activatedRoute.snapshot.params.id;
      this.getProductXCategory(this.productCategory.id);
    }
    this.loadProducts();
    this.loadCategories();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      product_id: ["",[Validators.required],],
      category_id: ["", [Validators.required] ],

    });
  }

  loadProducts() {
    this.productService.list().subscribe(data => {
      this.products = data;
    });
  }

  loadCategories() {
    this.categoryService.list().subscribe(data => {
      this.categories = data;
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getProductXCategory(id: number) {
    this.productCategoryService.view(id).subscribe((data) => {
      this.productCategory = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingresa correctamente los datos solicitados', 'error');
      return;
    }

    const formData = {
      product_id: Number(this.theFormGroup.get('product_id')?.value),
      category_id: Number(this.theFormGroup.get('category_id')?.value)
    };

    this.productCategoryService.create(formData).subscribe({
      next: () => {
        Swal.fire('Creado', 'El registro ha sido creado.', 'success');
        this.router.navigate(['product-categories/list']);
      },
      error: (err) => {
        console.error('Error creating product category:', err);
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
      product_id: Number(this.theFormGroup.get('product_id')?.value),
      category_id: Number(this.theFormGroup.get('category_id')?.value)
    };

    this.productCategoryService.update(this.productCategory.id!, formData).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'El registro ha sido actualizado.', 'success');
        this.router.navigate(['product-categories/list']);
      },
      error: (err) => {
        console.error('Error updating product category:', err);
        Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
      }
    });
  }

}
