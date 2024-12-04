import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Client } from "src/app/models/client.model";
import { ClientService } from "src/app/services/client.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  clients: Client;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.clients = { id: 0, address: "", city: "", zip_code: "", user_id: "" };
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
      this.clients.id = this.activatedRoute.snapshot.params.id;
      this.getClients(this.clients.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      address: ["",[Validators.required, Validators.minLength(3)],],
      city: ["", [Validators.required, Validators.minLength(3)] ],
      zip_code: ["", [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)],],
      user_id: ["",[Validators.required, Validators.pattern(/^[a-f\d]{24}$/i), ],],
    });
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getClients(id: number) {
    this.clientService.view(id).subscribe((data) => {
      this.clients = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.clientService.create(this.clients).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["clients/list"]);
    });
  }

  update() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.clientService.update(this.clients).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["theaters/list"]);
    });
  }
}
