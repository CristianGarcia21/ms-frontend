import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NaturalPerson } from 'src/app/models/natural-person.model';
import { NaturalPersonService } from 'src/app/services/natural-person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  natural_person: NaturalPerson;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private naturalPersonService: NaturalPersonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.natural_person = { id: 0, cedula: "", birth_date: new Date(), company_id: 0, client_id: 0, user_id: 0 };
    this.mode = 0;
    this.configFormGroup();
    this.trySend = false;
  }

  ngOnInit(): void {
    const currentUrl = this.activatedRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      console.log(this.mode);
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      console.log(this.mode);
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      console.log(this.mode);
    }
    if (this.activatedRoute.snapshot.params.id) {
      this.natural_person.id = this.activatedRoute.snapshot.params.id;
      this.getNaturalPerson(this.natural_person.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      cedula: ['', [Validators.required]],
    birth_date: ['', [Validators.required]],
    company_id: ['', [Validators.required]],
    client_id: ['', [Validators.required]],
    user_id: ['', [Validators.required]]
    });
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getNaturalPerson(id: number) {
    this.naturalPersonService.view(id).subscribe((data) => {
      this.natural_person = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.naturalPersonService.create(this.natural_person).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["natural-person/list"]);
    });
  }

  update() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.naturalPersonService.update(this.natural_person).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["natural-person/list"]);
    });
  }
}
