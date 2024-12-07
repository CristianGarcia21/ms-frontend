import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lot } from 'src/app/models/lot.model';
import { LotService } from 'src/app/services/lot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  lot : Lot[]

  constructor(
    private lotService: LotService,
    private router: Router
  ) {
    this.lot= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.lotService.list().subscribe(data => {
      this.lot = data
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
        this.lotService.delete(id).subscribe(data=>{
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
    this.router.navigate(['lots/view/'+id])
  }

  update(id:number){
    this.router.navigate(['lots/update/'+id])
  }

  create(){
    this.router.navigate(['lots/create'])
  }
}
