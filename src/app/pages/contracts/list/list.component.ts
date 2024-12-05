import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from 'src/app/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  Contract : Contract[]

  constructor(
    private contractService: ContractService,
    private router: Router
  ) {
    this.Contract= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.contractService.list().subscribe(data => {
      this.Contract = data
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
        this.contractService.delete(id).subscribe(data=>{
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
    this.router.navigate(['departaments/view/'+id])
  }

  update(id:number){
    this.router.navigate(['departaments/update/'+id])
  }

  create(){
    this.router.navigate(['departaments/create'])
  }

}
