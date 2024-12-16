import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private service: SecurityService) {
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
    this.service.login(this.theUser).subscribe({
      next:(data) => {
        console.log("Respuesta: "+JSON.stringify(data));
        
      },
      error: (error) => {
        Swal.fire("Autenticación invlálida", "El correo o la contraseña son incorrectos", "error");
      }
    })
  }

}
