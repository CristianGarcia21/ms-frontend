import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  service: Service;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.service = { id: 0, name: "", description: "", price: 0, status: "" };
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
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activatedRoute.snapshot.params.id) {
      this.service.id = this.activatedRoute.snapshot.params.id;
      this.getServices(this.service.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      name: ["",[Validators.required, Validators.minLength(3)],],
      description: ["", [Validators.required, Validators.maxLength(255)] ],
      price: ["", [Validators.required, Validators.min(1)],],
      status: ["",[Validators.required, Validators.pattern(/^(activo|inactivo)$/), ],],
      administrator_id: ["",[Validators.required ],],
    });
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getServices(id: number) {
    this.serviceService.view(id).subscribe((data) => {
      this.service = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.serviceService.create(this.service).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["services/list"]);
    });
  }

  update() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.serviceService.update(this.service).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["services/list"]);
    });
  }

}
