import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'node:console';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  theUser: User;

  constructor(private service: SecurityService, private router: Router) {
    this.theUser = {
      email: '',
      password: ''
    }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  login() {
    console.log("Usuario: "+JSON.stringify(this.theUser));
    
    this.service.login(this.theUser).subscribe({
      next:(data) => {
        console.log("Respuesta: "+JSON.stringify(data));
        this.router.navigate(['/two-factor'])
        Swal.fire({
                    title: "Logueado con exito!",
                    text: "Sigue con el proceso de Segundo factor.",
                    icon: "success"
                  });
      },
      error: (error) => {
        Swal.fire("Autenticación invlálida", "El correo o la contraseña son incorrectos", "error");
        console.log("Error: "+JSON.stringify(error));
      }
    })
  }

}
