import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lot } from 'src/app/models/lot.model';
import { Route } from 'src/app/models/route.model';
import { LotService } from 'src/app/services/lot.service';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  lots: Lot;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  routes: Route[] = [];

  constructor(
    private lotService: LotService,
    private routeService: RouteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.lots = { id: 0, quantity: 0, total_weight: 0, type: "", size: 0 };
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
      this.lots.id = this.activatedRoute.snapshot.params.id;
      this.getClients(this.lots.id);
    }
    this.loadRoutes();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      quantity: ["", [Validators.required, Validators.min(1)]],
      total_weight: ["", [Validators.required, Validators.min(1)]],
      type: ["", [Validators.required]], 
      size: ["", [Validators.required, Validators.min(1)]],
      route_id: ["", [Validators.required]],
    });
  }

  loadRoutes() {
    this.routeService.list().subscribe(data => {
      this.routes = data;
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getClients(id: number) {
    this.lotService.view(id).subscribe((data) => {
      this.lots = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingresa correctamente los datos solicitados', 'error');
      return;
    }

    const formData = {
      quantity: Number(this.theFormGroup.get('quantity')?.value),
      total_weight: Number(this.theFormGroup.get('total_weight')?.value),
      type: this.theFormGroup.get('type')?.value,
      size: Number(this.theFormGroup.get('size')?.value),
      route_id: Number(this.theFormGroup.get('route_id')?.value)
    };

    this.lotService.create(formData).subscribe({
      next: () => {
        Swal.fire('Creado', 'El registro ha sido creado.', 'success');
        this.router.navigate(['lots/list']);
      },
      error: (err) => {
        console.error('Error creating lot:', err);
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
      quantity: Number(this.theFormGroup.get('quantity')?.value),
      total_weight: Number(this.theFormGroup.get('total_weight')?.value),
      type: this.theFormGroup.get('type')?.value,
      size: Number(this.theFormGroup.get('size')?.value),
      route_id: Number(this.theFormGroup.get('route_id')?.value)
    };

    this.lotService.update(this.lots.id!, formData).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'El registro ha sido actualizado.', 'success');
        this.router.navigate(['lots/list']);
      },
      error: (err) => {
        console.error('Error updating lot:', err);
        Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
      }
    });
  }

}
