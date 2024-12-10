import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Operations } from 'src/app/models/operations.model';
import { OperationService } from 'src/app/services/operation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  operations: Operations[]

  constructor(
    private operationService: OperationService,
    private router: Router
  ) {
    this.operations = []
  }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.operationService.list().subscribe(data => {
      this.operations = data
      console.log(data);
      
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
        this.operationService.delete(id).subscribe(data=>{
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
    this.router.navigate(['operations/view/'+id])
  }

  update(id:number){
    this.router.navigate(['operations/update/'+id])
  }

  create(): void {
    this.router.navigate(['operations/create']);
  }

}
