import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleOwner } from 'src/app/models/vehicle-owner.model';
import { VehicleOwnerService } from 'src/app/services/vehicle-owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  vehiOwner: VehicleOwner;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private vehiOwnerService: VehicleOwnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.vehiOwner = { id: 0, status: "" };
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
      this.vehiOwner.id = this.activatedRoute.snapshot.params.id;
      this.getVehiOwners(this.vehiOwner.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      vehicle_id: ["",[Validators.required],],
      owner_id: ["", [Validators.required] ],
      status: ["",[Validators.required, Validators.pattern(/^(activo|inactivo)$/), ],],

    });
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getVehiOwners(id: number) {
    this.vehiOwnerService.view(id).subscribe((data) => {
      this.vehiOwner = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.vehiOwnerService.create(this.vehiOwner).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["vehicle_owners/list"]);
    });
  }

  update() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.vehiOwnerService.update(this.vehiOwner).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["vehicle_owners/list"]);
    });
  }

}
