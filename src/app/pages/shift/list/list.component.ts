import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shift } from 'src/app/models/shift.model';
import { ShiftService } from 'src/app/services/shift.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  shift : Shift[]

  constructor(
    private shiftService: ShiftService,
    private router: Router
  ) {
    this.shift= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.shiftService.list().subscribe(data => {
      this.shift = data
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
        this.shiftService.delete(id).subscribe(data=>{
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
    this.router.navigate(['shifts/view/'+id])
  }

  update(id:number){
    this.router.navigate(['shifts/update/'+id])
  }

  create(){
    this.router.navigate(['shifts/create'])
  }

  formatDate(date: string): string {
    return formatDate(date, 'dd/MM/yyyy', 'en-US');
  }

}
