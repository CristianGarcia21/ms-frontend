import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { DistributionCenter } from 'src/app/models/distribution-center.model';
import { Municipality } from 'src/app/models/municipality.model';
import { AddressService } from 'src/app/services/address.service';
import { DistriXCenterService } from 'src/app/services/distri-xcenter.service';
import { MunicipalityService } from 'src/app/services/municipality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  distriXcenter : DistributionCenter[]
  addresses: Address[];
  municipalities: Municipality[];

  constructor(
    private distriXcenterService: DistriXCenterService,
    private addressService: AddressService,
    private municipalityService: MunicipalityService,
    private router: Router
  ) {
    this.distriXcenter= []
    this.addresses = [];
    this.municipalities = [];
   }

  ngOnInit(): void {
    this.list()
    this.loadAddresses();
    this.loadMunicipalities();
  }

  list(){
    this.distriXcenterService.list().subscribe(data => {
      this.distriXcenter = data
    })
  }

  loadAddresses() {
    this.addressService.list().subscribe(data => {
      this.addresses = data;
    });
  }

  loadMunicipalities() {
    this.municipalityService.list().subscribe(data => {
      this.municipalities = data;
    });
  }

  getAddressName(addressId: number): string {
    const address = this.addresses.find(addr => addr.id === addressId);
    return address ? address.street : 'Unknown Address';
  }

  getMunicipalityName(municipalityId: number): string {
    const municipality = this.municipalities.find(mun => mun.id === municipalityId);
    return municipality ? municipality.name : 'Unknown Municipality';
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
