import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Lot } from 'src/app/models/lot.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: Product[] = [];
  lots: Lot[] = [];
  selectedProductId: number | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.productService.list().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  showLots(productId: number) {
    if (this.selectedProductId === productId) {
      this.selectedProductId = null; // Ocultar lotes si ya están visibles
      this.lots = [];
    } else {
      this.selectedProductId = productId;
      this.productService.listLotsByProduct(productId).subscribe({
        next: (data) => {
          this.lots = Array.isArray(data) ? data : [data]; // Asegurar que sea un array
          console.log('Lots loaded for product:', this.lots);
          this.cdr.detectChanges(); // Forzar la actualización de la vista
        },
        error: (err) => {
          console.error(`Error loading lots for product ${productId}:`, err);
          this.lots = [];
        }
      });
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
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire("Eliminado!", "El elemento ha sido eliminado.", "success");
        });
      }
    });
  }

  view(id: number) {
    this.router.navigate(['products/view/' + id]);
  }

  update(id: number) {
    this.router.navigate(['products/update/' + id]);
  }

  create() {
    this.router.navigate(['products/create']);
  }
}
