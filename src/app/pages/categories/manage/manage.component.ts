import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  category: Category;
  categories: Category[] = [];
  parentCategories: Category[] = [];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.category = { id: 0, name: "" };
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

    // Cargar todas las categorías al inicio
    this.loadCategories();

    if (this.activatedRoute.snapshot.params.id) {
      this.category.id = this.activatedRoute.snapshot.params.id;
      this.getCategory(this.category.id);
    }
  }

  loadCategories() {
    this.categoryService.list().subscribe(data => {
      this.categories = data; // Guardar todas las categorías
      this.parentCategories = data.filter(category => category.parent_id === null); // Filtrar principales
    });
  }

  getCategoryName(id: number): string {
    // Buscar el nombre de la categoría en todas las categorías cargadas
    const category = this.categories.find(category => category.id === id);
    return category ? category.name : 'Desconocida';
  }


  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      parent_id: [null] // Por defecto, ninguna categoría seleccionada
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getCategory(id: number) {
    this.categoryService.view(id).subscribe((data) => {
      this.category = data;
      this.theFormGroup.patchValue(data); // Actualizar formulario con los datos
    });
  }

  loadParentCategories() {
    this.categoryService.list().subscribe(data => {
      this.categories = data.filter(category => category.parent_id === null); // Solo categorías principales
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error");
      return;
    }

    const formData = this.theFormGroup.value;
    if (formData.parent_id === "") {
      formData.parent_id = null; // Convertir "" a null si no se selecciona una categoría
    }

    this.categoryService.create(formData).subscribe(() => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["categories/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error");
      return;
    }

    const formData = this.theFormGroup.value;
    if (formData.parent_id === "") {
      formData.parent_id = null; // Convertir "" a null si no se selecciona una categoría
    }

    this.categoryService.update({ ...this.category, ...formData }).subscribe(() => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["categories/list"]);
    });
  }
}
