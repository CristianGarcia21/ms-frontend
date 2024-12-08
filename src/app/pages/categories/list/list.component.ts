import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  categories: Category[] = [];
  parentCategories: Category[] = [];
  activeCategory: Category | null = null;
  subcategories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.categoryService.list().subscribe(data => {
      this.categories = data;
      this.parentCategories = this.categories.filter(category => category.parent_id === null);
    });
  }

  toggleSubcategories(category: Category) {
    if (this.activeCategory?.id === category.id) {
      this.activeCategory = null; // Ocultar subcategorías si la categoría activa es la misma
      this.subcategories = [];
    } else {
      this.activeCategory = category;
      this.subcategories = this.categories.filter(sub => sub.parent_id === category.id);
    }
  }

  delete(id: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Realmente quieres eliminar este elemento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        this.categoryService.delete(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire({
            title: "Eliminado!",
            text: "El elemento ha sido eliminado.",
            icon: "success"
          });
        });
      }
    });
  }

  view(id: number) {
    this.router.navigate(['categories/view/' + id]);
  }

  update(id: number) {
    this.router.navigate(['categories/update/' + id]);
  }

  create() {
    this.router.navigate(['categories/create']);
  }
}
