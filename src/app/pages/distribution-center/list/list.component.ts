import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DistributionCenter } from 'src/app/models/distribution-center.model';
import { DistriXCenterService } from 'src/app/services/distri-xcenter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  distriXcenter : DistributionCenter[]

  constructor(
    private distriXcenterService: DistriXCenterService,
    private router: Router
  ) {
    this.distriXcenter= []
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.distriXcenterService.list().subscribe(data => {
      this.distriXcenter = data
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
        this.distriXcenterService.delete(id).subscribe(data=>{
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
    this.router.navigate(['distribution_centers/view/'+id])
  }

  update(id:number){
    this.router.navigate(['distribution_centers/update/'+id])
  }

  create(){
    this.router.navigate(['distribution_centers/create'])
  }

}
