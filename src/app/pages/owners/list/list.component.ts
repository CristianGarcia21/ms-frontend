import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  owners : Owner[]

  constructor(
    private ownerService: OwnerService,
    private router: Router
  ) {
    this.owners= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.ownerService.list().subscribe(data => {
      this.owners = data
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
        this.ownerService.delete(id).subscribe(data=>{
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
    this.router.navigate(['owners/view/'+id])
  }

  update(id:number){
    this.router.navigate(['owners/update/'+id])
  }

  create(){
    this.router.navigate(['owners/create'])
  }

}
