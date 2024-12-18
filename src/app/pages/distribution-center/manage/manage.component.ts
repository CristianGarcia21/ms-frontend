import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { DistributionCenter } from 'src/app/models/distribution-center.model';
import { Municipality } from 'src/app/models/municipality.model';
import { AddressService } from 'src/app/services/address.service';
import { DistriXCenterService } from 'src/app/services/distri-xcenter.service';
import { MunicipalityService } from 'src/app/services/municipality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  distriXcenter: DistributionCenter;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  municipalities: Municipality[];
  addresses: Address[];
  filteredAddresses: any[];

  constructor(
    private distriXcenterService: DistriXCenterService,
    private addressService: AddressService,
    private municipalityService: MunicipalityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.distriXcenter = { id: 0, name: ""};
    this.mode = 0;
    this.configFormGroup();
    this.trySend = false;
    this.municipalities = [];
    this.addresses = [];
    this.filteredAddresses = [];
  }

  ngOnInit(): void {
    const currentUrl = this.activatedRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      console.log(this.mode);
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activatedRoute.snapshot.params.id) {
      this.distriXcenter.id = this.activatedRoute.snapshot.params.id;
      this.getDistributionCenter(this.distriXcenter.id);
    }
    this.loadMunicipalities();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ["",[Validators.required, Validators.minLength(3)],],
      address_id: ["", [Validators.required] ],
      municipality_id: ["", [Validators.required],],
    });
    this.theFormGroup.get('municipality_id').valueChanges.subscribe(value => {
      this.loadAddressesByMunicipality(value);
    });
  }

  loadMunicipalities() {
    this.municipalityService.list().subscribe(data => {
      this.municipalities = data;
    });
  }

  loadAddressesByMunicipality(municipalityId: number) {
    this.addressService.listByMunicipality(municipalityId).subscribe(data => {
      this.filteredAddresses = data;
    });
  }


  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getDistributionCenter(id: number) {
    this.distriXcenterService.view(id).subscribe((data) => {
      this.distriXcenter = data;
      this.theFormGroup.patchValue(this.distriXcenter);
      this.loadAddressesByMunicipality(this.distriXcenter.municipality_id);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error");
      return;
    }

    this.distriXcenterService.create(this.theFormGroup.value).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["distribution_centers/list"]);
    }, error => {
      console.error('Error creating distribution center:', error);
      Swal.fire("Error", "No se pudo crear el registro", "error");
    });
  }

  update() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.distriXcenterService.update(this.distriXcenter).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["distribution_centers/list"]);
    });
  }
}
