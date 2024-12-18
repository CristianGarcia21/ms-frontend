import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { Lot } from 'src/app/models/lot.model';
import { Route } from 'src/app/models/route.model';
import { Stage } from 'src/app/models/stage.model';
import { AddressService } from 'src/app/services/address.service';
import { LotService } from 'src/app/services/lot.service';
import { RouteService } from 'src/app/services/route.service';
import { StageService } from 'src/app/services/stage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  stages: Stage;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  routes: Route[] = [];
  lots: Lot[] = [];
  address: Address[] = [];

  constructor(
    private stageService: StageService,
    private routeService: RouteService,
    private lotService: LotService,
    private addressService: AddressService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.stages = { id: 0, order: 0 };
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
      this.stages.id = this.activatedRoute.snapshot.params.id;
      this.getStages(this.stages.id);
    }
    this.loadRoutes();
    this.loadLots();
    this.loadAddress();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      order: ["",[Validators.required, Validators.min(1)],],
      address_id: ["", [Validators.required] ],
      route_id: ["", [Validators.required],],
      lot_id: ["",[Validators.required, ],],
    });
  }
  loadRoutes() {
    this.routeService.list().subscribe(data => {
      this.routes = data;
    });
  }

  loadLots() {
    this.lotService.list().subscribe(data => {
      this.lots = data;
    });
  }

  loadAddress() {
    this.addressService.list().subscribe(data => {
      this.address = data;
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getStages(id: number) {
    this.stageService.view(id).subscribe((data) => {
      this.stages = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingresa correctamente los datos solicitados', 'error');
      return;
    }

    const formData = {
      order: Number(this.theFormGroup.get('order')?.value),
      address_id: Number(this.theFormGroup.get('address_id')?.value),
      route_id: Number(this.theFormGroup.get('route_id')?.value),
      lot_id: Number(this.theFormGroup.get('lot_id')?.value)
    };

    this.stageService.create(formData).subscribe({
      next: () => {
        Swal.fire('Creado', 'El registro ha sido creado.', 'success');
        this.router.navigate(['stages/list']);
      },
      error: (err) => {
        console.error('Error creating stage:', err);
        Swal.fire('Error', 'No se pudo crear el registro', 'error');
      }
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingresa correctamente los datos solicitados', 'error');
      return;
    }

    const formData = {
      order: Number(this.theFormGroup.get('order')?.value),
      address_id: Number(this.theFormGroup.get('address_id')?.value),
      route_id: Number(this.theFormGroup.get('route_id')?.value),
      lot_id: Number(this.theFormGroup.get('lot_id')?.value)
    };

    this.stageService.update(this.stages.id!, formData).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'El registro ha sido actualizado.', 'success');
        this.router.navigate(['stages/list']);
      },
      error: (err) => {
        console.error('Error updating stage:', err);
        Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
      }
    });
  }
}
