import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NaturalPerson } from 'src/app/models/natural-person.model';
import { NaturalPersonService } from 'src/app/services/natural-person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  natural_persons: NaturalPerson[] = []

  constructor(
    private naturalPersonService: NaturalPersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.naturalPersonService.list().subscribe(data => {
      this.natural_persons = data
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
        this.naturalPersonService.delete(id).subscribe(data=>{
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
    this.router.navigate(['natural-person/view/'+id])
  }

  update(id:number){
    this.router.navigate(['natural-person/update/'+id])
  }

  create(){
    this.router.navigate(['natural-person/create'])
  }

}
