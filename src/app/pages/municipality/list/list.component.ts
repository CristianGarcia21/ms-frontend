import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Municipality } from 'src/app/models/municipality.model';
import { MunicipalityService } from 'src/app/services/municipality.service';
import { AddressService } from 'src/app/services/address.service';
import Swal from 'sweetalert2';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  Municipalities: Municipality[] = [];
  selectedAddresses: Address[] = [];
  activeMunicipality: Municipality | null = null;

  constructor(
    private municipalityService: MunicipalityService,
    private addressService: AddressService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.municipalityService.list().subscribe(data => {
      this.Municipalities = data;
    });
  }

  delete(id: number): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Realmente quieres eliminar este elemento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.municipalityService.delete(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire({
            title: "Eliminado!",
            text: "El elemento ha sido eliminado.",
            icon: "success"
          });
        });
      }
    });
  }

  view(id: number): void {
    this.router.navigate(['municipalities/view/' + id]);
  }

  update(id: number): void {
    this.router.navigate(['municipalities/update/' + id]);
  }

  create(): void {
    this.router.navigate(['municipalities/create']);
  }

  showAddresses(municipality: Municipality): void {
    this.municipalityService.getAddresses(municipality.id!).subscribe((addresses) => {
      this.selectedAddresses = addresses;
      this.activeMunicipality = municipality;
    });
  }

  toggleMunicipalities(municipality: Municipality): void {
    if (this.activeMunicipality?.id === municipality.id) {
      this.activeMunicipality = null;
      this.selectedAddresses = [];
    } else {
      console.log(`Mostrando direcciones para municipio: ${municipality.name}`);
      this.municipalityService.getAddresses(municipality.id!).subscribe((addresses) => {
        this.selectedAddresses = addresses;
        this.activeMunicipality = municipality;
      });
    }
  }

}
