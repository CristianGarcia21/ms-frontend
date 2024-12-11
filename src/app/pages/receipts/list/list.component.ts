import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Receipt } from 'src/app/models/receipt.model';
import { ReceiptService } from 'src/app/services/receipt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  receipts : Receipt[]

  constructor(
    private receiptService: ReceiptService,
    private router: Router
  ) {
    this.receipts= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.receiptService.list().subscribe(data => {
      this.receipts = data
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
        this.receiptService.delete(id).subscribe(data=>{
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
    this.router.navigate(['receipts/view/'+id])
  }

  update(id:number){
    this.router.navigate(['receipts/update/'+id])
  }

  create(){
    this.router.navigate(['receipts/create'])
  }
}
