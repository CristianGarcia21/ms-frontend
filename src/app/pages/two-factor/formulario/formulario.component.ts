import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent  {
  email: string = ''; // Puedes obtener esto del localStorage o de un paso anterior
  code2FA: string = '';

  constructor(private securityService: SecurityService, private router: Router) {}

  verifyCode(): void {
    this.securityService.verify2FA(this.email, this.code2FA).subscribe({
      next: (response) => {
        // Guardar token en localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('session', JSON.stringify(response));
        Swal.fire('Éxito', 'Autenticación 2FA completada', 'success');

        // Redirigir al dashboard o a la página principal
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        Swal.fire('Error', 'Código 2FA inválido o expirado', 'error');
        console.error('Error en la verificación 2FA:', error);
      }
    });
  }
}
