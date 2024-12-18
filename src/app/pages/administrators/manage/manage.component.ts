import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { User } from 'src/app/models/user.model';
import { AdministratorService } from 'src/app/services/administrator.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  admin: Admin;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  users: User[] = [];

  constructor(
    private adminService: AdministratorService,
    private userServices: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.admin = { id: 0, name: "", status: false, email: "", password: "" };
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
      this.admin.id = this.activatedRoute.snapshot.params.id;
      this.getAdmins(this.admin.id);
    }
    this.loadUsers();
  }

  loadUsers() {
    this.userServices.list().subscribe((data) => {
      this.users = data;
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      name: ["",[Validators.required, Validators.minLength(3)],],
      status: ["", [Validators.required] ],
      email: ["", [Validators.required, Validators.email],],
      password: ["",[Validators.required, Validators.minLength(6) ],],
      user_id: ["",[Validators.required ],],
    });
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getAdmins(id: number) {
    this.adminService.view(id).subscribe((data) => {
      this.admin = data;
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

    this.adminService.create(formData).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["administrators/list"]);
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

    this.adminService.update(this.admin.id!, formData).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["administrators/list"]);
    });
  }

}
