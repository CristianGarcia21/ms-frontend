import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expenses } from 'src/app/models/expenses.model';
import { ExpensesService } from 'src/app/services/expenses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  expenses : Expenses[]

  constructor(
    private expensesService: ExpensesService,
    private router: Router
  ) {
    this.expenses= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.expensesService.list().subscribe(data => {
      this.expenses = data
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
        this.expensesService.delete(id).subscribe(data=>{
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
    this.router.navigate(['expenses/view/'+id])
  }

  update(id:number){
    this.router.navigate(['expenses/update/'+id])
  }

  create(){
    this.router.navigate(['expenses/create'])
  }

  formatDate(date: string): string {
    return formatDate(date, 'dd/MM/yyyy', 'en-US');
  }

}
