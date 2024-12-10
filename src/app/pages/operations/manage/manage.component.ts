import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operations } from 'src/app/models/operations.model';
import { OperationService } from 'src/app/services/operation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  operation: Operations;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private operationService: OperationService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.operation = { id: 0, municipality_id: 0, vehicle_id: 0 };
    this.mode = 0;
    this.trySend = false;
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      const id = this.activateRoute.snapshot.params.id
      this.getOperation(id)
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      municipality_id: ['', [Validators.required, Validators.min(1)]], // Número mayor a 0
      vehicle_id: ['', [Validators.required, Validators.min(1)]] // Número mayor a 0
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getOperation(id: number) {
    this.operationService.view(id).subscribe(data => {
      this.operation = data
      // this.theFormGroup.patchValue(this.operation); // Actualizar el formulario con los datos del vehículo
    })
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        'Error en el formulario',
        'Ingresa correctamente los datos solicitados',
        'error'
      );
      return;
    }

    const formData = this.theFormGroup.value; // Obtenemos los datos del formulario
    this.operationService.create(formData).subscribe(() => {
      Swal.fire('Creado', 'El registro ha sido creado', 'success');
      this.router.navigate(['operations/list']);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingresa correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.operationService.update(this.operation).subscribe((data) => {
      Swal.fire("Actualizado", "El registro ha sido actualizado", "success");
      this.router.navigate(["operations/list"]);
    });
  }
}

