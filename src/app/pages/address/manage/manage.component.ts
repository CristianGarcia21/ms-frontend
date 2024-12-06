import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { Municipality } from 'src/app/models/municipality.model';
import { AddressService } from 'src/app/services/address.service';
import { DepartamentService } from 'src/app/services/departament.service';
import { MunicipalityService } from 'src/app/services/municipality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  address: Address;
  mode: number;
  theFormGroup!: FormGroup; // Usamos ! para indicar que se inicializará antes de usar
  trySend: boolean = false;
  municipalities: Municipality[] = [];

  constructor(
    private municipalityService: MunicipalityService,
    private addressService: AddressService,
    private departamentService: DepartamentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.address = { id: 0, street: '', number: 0, neighborhood: '' };
    this.mode = 0;
  }

  ngOnInit(): void {
    console.log('Iniciando ngOnInit...');


    this.municipalityService.list().subscribe((municipalities) => {
      console.log('Municipios cargados:', municipalities);

      this.municipalities = municipalities.map((municipality) => {
        if (municipality.department_id) {
          console.log('Buscando departamento para municipio:', municipality.name, 'con department_id:', municipality.department_id);

          this.departamentService.view(municipality.department_id).subscribe((department) => {
            console.log('Departamento encontrado:', department);

            municipality.department = department;
          });
        } else {
          console.warn('Municipio sin departamento:', municipality.name);
        }
        return municipality;
      });
    });


    this.configFormGroup();

    const currentUrl = this.activatedRoute.snapshot.url.join('/');
    console.log('URL actual:', currentUrl);


    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    console.log('Modo configurado:', this.mode);


    if (this.activatedRoute.snapshot.params.id) {
      const id = this.activatedRoute.snapshot.params.id;
      console.log('ID del elemento:', id);
      this.getAddress(id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      street: ['', [Validators.required, Validators.minLength(3)]],
      number: ['', [Validators.required, Validators.min(1)]],
      neighborhood: ['', [Validators.required, Validators.minLength(3)]],
      municipality_id: ['', [Validators.required]],
      department: [''],
    });
  }




  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getAddress(id: number) {
    this.addressService.view(id).subscribe((data) => {
      this.address = data;

      this.theFormGroup.patchValue({
        street: this.address.street,
        number: this.address.number,
        neighborhood: this.address.neighborhood,
        municipality_id: this.address.municipality_id,
        department: this.address.department,
      });
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingresa correctamente los datos solicitados', 'error');
      return;
    }

    const selectedMunicipality = this.municipalities.find(
      (m) => m.id === +this.theFormGroup.get('municipality_id')?.value
    );

    const formData = {
      street: this.theFormGroup.get('street')?.value,
      number: this.theFormGroup.get('number')?.value,
      neighborhood: this.theFormGroup.get('neighborhood')?.value,
      municipality_id: selectedMunicipality?.id,
      department: selectedMunicipality?.department?.name,
    };

    console.log('Datos enviados al backend:', formData);

    this.addressService.create(formData).subscribe(() => {
      Swal.fire('Creado', 'El registro ha sido creado.', 'success');
      this.router.navigate(['addresses/list']);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingresa correctamente los datos solicitados', 'error');
      return;
    }

    const formData = {
      ...this.theFormGroup.value,
      id: this.address.id,
      department: this.theFormGroup.get('department')?.value,
    };

    this.addressService.update(formData).subscribe(() => {
      Swal.fire('Actualizado', 'El registro ha sido actualizado.', 'success');
      this.router.navigate(['addresses/list']);
    });
  }

  getMunicipalityName(municipalityId: number | null | undefined): string {
    const municipality = this.municipalities.find((mun) => mun.id === municipalityId);
    return municipality?.name || 'Sin municipio';
  }

  getDepartmentName(municipalityId: number | null | undefined): string {
    const municipality = this.municipalities.find((mun) => mun.id === municipalityId);
    return municipality?.department?.name || 'Sin departamento';
  }

  navigateToList(): void {
  this.router.navigate(['addresses/list']);
}

}


