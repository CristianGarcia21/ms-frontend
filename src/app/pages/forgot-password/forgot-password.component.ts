import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string; // Para almacenar el correo ingresado por el usuario
  message: string = ''; // Para mostrar mensajes de éxito o error

  constructor(private service: SecurityService, private router: Router) { 
    this.email = ''
  }

  ngOnInit(): void { 
  }

  forgotPassword() {
    // Create a request object similar to the login structure
  
    if (this.email) {
      this.service.forgotPassword(this.email).subscribe({
        next: (data) => {
          console.log("Respuesta: " + JSON.stringify(data));
          this.router.navigate(['/login']);
          Swal.fire({
            title: "Solicitud procesada",
            text: "Si el correo existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña",
            icon: "success"
          });
        },
        error: (error) => {
          Swal.fire(
            "Error", 
            "Ocurrió un error al procesar la solicitud. Por favor, inténtalo nuevamente.", 
            "error"
          );
          console.log("Error: " + JSON.stringify(error));
        }
      });
    } else {
      Swal.fire(
        "Campo requerido", 
        "Por favor, ingresa un correo electrónico válido", 
        "warning"
      );
    }
  }

}
