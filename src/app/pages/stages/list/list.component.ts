import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stage } from 'src/app/models/stage.model';
import { StageService } from 'src/app/services/stage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  stages : Stage[]

  constructor(
    private stageService: StageService,
    private router: Router
  ) {
    this.stages= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.stageService.list().subscribe(data => {
      this.stages = data
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
        this.stageService.delete(id).subscribe(data=>{
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
    this.router.navigate(['stages/view/'+id])
  }

  update(id:number){
    this.router.navigate(['stages/update/'+id])
  }

  create(){
    this.router.navigate(['stages/create'])
  }

}
