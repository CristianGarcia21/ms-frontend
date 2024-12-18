import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from 'src/app/models/contract.model';
import { Route } from 'src/app/models/route.model';
import { ContractService } from 'src/app/services/contract.service';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  Contract : Contract[]
  routes: Route[];
  selectedContractId: number | null;

  constructor(
    private contractService: ContractService,
    private routeService: RouteService,
    private router: Router
  ) {
    this.Contract= []
    this.routes = [];
    this.selectedContractId = null;
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.contractService.list().subscribe(data => {
      this.Contract = data
    })
  }

  showRoutes(contractId: number) {
    if (this.selectedContractId === contractId) {
      this.selectedContractId = null; // Ocultar rutas si ya están visibles
    } else {
      this.selectedContractId = contractId;
      this.routeService.listRoutesByContract(contractId).subscribe(data => {
        this.routes = data;
        console.log('Routes loaded for contract:', this.routes);
      });
    }
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
    this.router.navigate(['contracts/view/'+id])
  }

  update(id:number){
    this.router.navigate(['contracts/update/'+id])
  }

  create(){
    this.router.navigate(['contracts/create'])
  }

}
