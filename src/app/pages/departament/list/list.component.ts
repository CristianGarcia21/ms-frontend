import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departament } from 'src/app/models/departament.model';
import { Municipality } from 'src/app/models/municipality.model';
import { DepartamentService } from 'src/app/services/departament.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  Departament: Departament[] = [];
  municipalities: Municipality[] = []; 
  activeDepartment: Departament | null = null;

  constructor(
    private departamentService: DepartamentService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.departamentService.list().subscribe(data => {
      this.Departament = data;
    });
  }

  delete(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Realmente quieres eliminar este elemento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.departamentService.delete(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire({
            title: "Eliminado!",
            text: "El elemento ha sido eliminado.",
            icon: "success"
          });
        });
      }
    });
  }

  view(id: number) {
    this.router.navigate(['departaments/view/' + id]);
  }

  update(id: number) {
    this.router.navigate(['departaments/update/' + id]);
  }

  create() {
    this.router.navigate(['departaments/create']);
  }

  toggleMunicipalities(department: Departament) {
    if (this.activeDepartment?.id === department.id) {
      // Si el departamento ya está activo, colapsa la lista
      this.activeDepartment = null;
      this.municipalities = [];
    } else {
      // Si no, expande la lista y carga los municipios
      this.activeDepartment = department;
      this.departamentService.getMunicipalities(department.id).subscribe((data) => {
        this.municipalities = data;
      });
    }
  }
}
