import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Insurances } from 'src/app/models/insurances.model';
import { InsurancesService } from 'src/app/services/insurances.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  insurances : Insurances[]

  constructor(
    private insurancesServices: InsurancesService,
    private router: Router
  ) {
    this.insurances= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.insurancesServices.list().subscribe(data => {
      this.insurances = data
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
        this.insurancesServices.delete(id).subscribe(data=>{
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
    this.router.navigate(['insurances/view/'+id])
  }

  update(id:number){
    this.router.navigate(['insurances/update/'+id])
  }

  create(){
    this.router.navigate(['insurances/create'])
  }

  formatDate(date: string): string {
    return formatDate(date, 'dd/MM/yyyy', 'en-US'); // Cambia el formato según tus necesidades
  }

}
