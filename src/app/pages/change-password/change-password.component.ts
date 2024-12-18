import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(private service: SecurityService, private router: Router) {
    this.email = this.service.getSessionData()?.email || '';
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  ngOnInit(): void {
  }

  changePassword() {
    // Validar que todos los campos estén llenos
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      Swal.fire(
        "Campos requeridos",
        "Por favor, complete todos los campos",
        "warning"
      );
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.newPassword !== this.confirmPassword) {
      Swal.fire(
        "Error",
        "La nueva contraseña y su confirmación no coinciden",
        "error"
      );
      return;
    }

    // Validar que la nueva contraseña sea diferente a la actual
    if (this.currentPassword === this.newPassword) {
      Swal.fire(
        "Error",
        "La nueva contraseña debe ser diferente a la actual",
        "warning"
      );
      return;
    }

    this.service.changePassword(this.email, this.currentPassword, this.newPassword).subscribe({
      next: (data) => {
        console.log("Respuesta: " + JSON.stringify(data));
        Swal.fire({
          title: "Contraseña actualizada",
          text: "Tu contraseña ha sido actualizada exitosamente",
          icon: "success"
        }).then(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      error: (error) => {
        Swal.fire(
          "Error",
          error.error || "Ocurrió un error al cambiar la contraseña. Por favor, inténtalo nuevamente.",
          "error"
        );
        console.log("Error: " + JSON.stringify(error));
      }
    });
  }
}
