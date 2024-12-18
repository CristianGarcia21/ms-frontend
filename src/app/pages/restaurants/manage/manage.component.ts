import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Service } from 'src/app/models/service.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  restaurants: Restaurant;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  services:Service[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private serviceService: ServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.restaurants = { id: 0, name: "", address: "", phone: "" };
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
      this.restaurants.id = this.activatedRoute.snapshot.params.id;
      this.getRestaurants(this.restaurants.id);
    }
    this.loadServices();
  }

  loadServices() {
    this.serviceService.list().subscribe((data) => {
      this.services = data;
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      name: ["",[Validators.required, Validators.minLength(3)],],
      address: ["", [Validators.required, Validators.minLength(3)] ],
      phone: ["", [Validators.required, Validators.minLength(10)] ],
      service_id: ["",[Validators.required ],],
    });
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getRestaurants(id: number) {
    this.restaurantService.view(id).subscribe((data) => {
      this.restaurants = data;
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

    this.restaurantService.create(formData).subscribe((data) => {
      Swal.fire("Creado", "El registro ha sido creado", "success");
      this.router.navigate(["restaurants/list"]);
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

    this.restaurantService.update(this.restaurants.id!, formData).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["restaurants/list"]);
    });
  }

}
