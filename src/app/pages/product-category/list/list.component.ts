import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  productCategory : ProductCategory[]

  constructor(
    private productCategoryService: ProductCategoryService,
    private router: Router
  ) {
    this.productCategory= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.productCategoryService.list().subscribe(data => {
      this.productCategory = data
    })
  }

  delete(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Realmente quieres eliminar este elemento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productCategoryService.delete(id).subscribe(data=>{
          this.ngOnInit()
          Swal.fire({
            title: "Eliminado!",
            text: "El elemento a sido eliminado.",
            icon: "success"
          });
        })
      }
    });
  }

  view(id:number){
    this.router.navigate(['product_category/view/'+id])
  }

  update(id:number){
    this.router.navigate(['product_category/update/'+id])
  }

  create(){
    this.router.navigate(['product_category/create'])
  }
}
