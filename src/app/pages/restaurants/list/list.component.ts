import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  Restaurants : Restaurant[]

  constructor(
    private restaurantServices: RestaurantService,
    private router: Router
  ) {
    this.Restaurants= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.restaurantServices.list().subscribe(data => {
      this.Restaurants = data
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
        this.restaurantServices.delete(id).subscribe(data=>{
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
    this.router.navigate(['restaurants/view/'+id])
  }

  update(id:number){
    this.router.navigate(['restaurants/update/'+id])
  }

  create(){
    this.router.navigate(['restaurants/create'])
  }

}
