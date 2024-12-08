import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  hotel: Hotel;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.hotel = { id: 0, name: "", address: "", phone: "", email: "", status:'' };
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
      this.hotel.id = this.activatedRoute.snapshot.params.id;
      this.getClients(this.hotel.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      name: ["",[Validators.required, Validators.minLength(3)],],
      address: ["",[Validators.required, Validators.minLength(3)],],
      phone: ["", [Validators.required, Validators.minLength(10)] ],
      email: ["", [Validators.required, Validators.email,],],
      status: ["",[Validators.required, Validators.minLength(3) ],],
      service_id: ["",[Validators.required ],],
    });
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getClients(id: number) {
    this.hotelService.view(id).subscribe((data) => {
      this.hotel = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.hotelService.create(this.hotel).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["hotels/list"]);
    });
  }

  update() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingresa correctamente los datos solicitados", "error")
      return
    }
    this.hotelService.update(this.hotel).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["hotels/list"]);
    });
  }

}
