import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Municipality } from 'src/app/models/municipality.model';
import { MunicipalityService } from 'src/app/services/municipality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  Municipalities : Municipality[]

  constructor(
    private municipalityService: MunicipalityService,
    private router: Router
  ) {
    this.Municipalities= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.municipalityService.list().subscribe(data => {
      this.Municipalities = data
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
        this.municipalityService.delete(id).subscribe(data=>{
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
    this.router.navigate(['municipalities/view/'+id])
  }

  update(id:number){
    this.router.navigate(['municipalities/update/'+id])
  }

  create(){
    this.router.navigate(['municipalities/create'])
  }
}
