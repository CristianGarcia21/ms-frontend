import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departament } from 'src/app/models/departament.model';
import { Municipality } from 'src/app/models/municipality.model';
import { DepartamentService } from 'src/app/services/departament.service';
import { MunicipalityService } from 'src/app/services/municipality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  municipality: Municipality;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  departments: Departament[] = [];

  constructor(
    private municipalityService: MunicipalityService,
    private departamentService: DepartamentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.municipality = { id: 0, name: ""};
    this.mode = 0;
    this.configFormGroup();
    this.trySend = false;
  }

  ngOnInit(): void {
    this.departamentService.list().subscribe((data) => {
      this.departments = data.map(dep => ({
        ...dep,
        id: +dep.id // Convertir el ID a número si es necesario
      }));
    });
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
      this.municipality.id = this.activatedRoute.snapshot.params.id;
      this.getClients(this.municipality.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      name: ["",[Validators.required, Validators.minLength(3)],],
      department_id: ['', [Validators.required]],
    });
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getClients(id: number) {
    this.municipalityService.view(id).subscribe((data) => {
      this.municipality = data;

      this.theFormGroup.patchValue({
        name: this.municipality.name,
        department_id: this.municipality.department_id,
      });

    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingresa correctamente los datos solicitados', 'error');
      return;
    }

    const formData = {
      name: this.theFormGroup.get('name')?.value,
      department_id: this.theFormGroup.get('department_id')?.value,
    };

    this.municipalityService.create(formData).subscribe(() => {
      Swal.fire('Creado', 'El registro ha sido creado.', 'success');
      this.router.navigate(['municipalities/list']);
    });
  }


  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingresa correctamente los datos solicitados', 'error');
      return;
    }

    const formData = {
      id: this.municipality.id,
      name: this.theFormGroup.get('name')?.value,
      department_id: this.theFormGroup.get('department_id')?.value,
    };

    this.municipalityService.update(formData).subscribe(() => {
      Swal.fire('Actualizado', 'El registro ha sido actualizado.', 'success');
      this.router.navigate(['municipalities/list']);
    });
  }

  getDepartmentName(departmentId: number | null | undefined): string {
    if (!departmentId) {
      return 'Sin departamento';
    }
    const department = this.departments.find((dep) => dep.id === +departmentId);
    return department ? department.name : 'Sin departamento';
  }



}
