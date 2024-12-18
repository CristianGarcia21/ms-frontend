import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { User } from 'src/app/models/user.model';
import { DriverService } from 'src/app/services/driver.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  driver: Driver;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  users: User[] = [];

  constructor(
    private driverService: DriverService,
    private userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.driver = { id: 0, license: "", name: "", email: "", status: "" };
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
      this.driver.id = this.activatedRoute.snapshot.params.id;
      this.getDriver(this.driver.id);
    }
    this.loadUsers();
  }

  loadUsers() {
    this.userService.list().subscribe((data) => {
      this.users = data;
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      license: ["",[Validators.required,Validators.minLength(6),Validators.maxLength(10),Validators.pattern(/^\d+$/), ],],
      name: ["", [Validators.required, Validators.minLength(3)] ],
      email: ["", [Validators.required, Validators.email],],
      status: ["",[Validators.required, Validators.pattern(/^(activo|inactivo)$/), ],],
      user_id: ["",[Validators.required ],],
    });
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getDriver(id: number) {
    this.driverService.view(id).subscribe((data) => {
      this.driver = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error");
      return;
    }

    const formData = { ...this.theFormGroup.value };

    console.log('Datos ajustados enviados:', formData);

    this.driverService.create(formData).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["drivers/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error");
      return;
    }

    const formData = { ...this.theFormGroup.value };

    console.log('Datos ajustados enviados:', formData);

    this.driverService.update(this.driver.id!, formData).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["drivers/list"]);
    });
  }

}
