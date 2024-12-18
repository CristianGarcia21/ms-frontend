import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { SecurityService } from "../services/security.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const excludedRoutes = ["/login", "/two-factor", "forgot-password"]; // Rutas que no requieren token
    const token = this.securityService.activeUserSession?.token; // Token del usuario logueado

    // Verifica si la URL está excluida
    if (excludedRoutes.some((route) => request.url.includes(route))) {
      console.log("Excluyendo token para la ruta:", request.url);
      return next.handle(request); // No se adjunta el token
    }

    // Si el token existe, adjuntarlo a la solicitud
    let authRequest = request;
    if (token) {
      console.log("Adjuntando token a la solicitud:", token);
      authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Procesar la solicitud con el token
    return next.handle(authRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          Swal.fire({
            title: "No está autorizado",
            text: "Inicie sesión nuevamente.",
            icon: "error",
            timer: 5000,
          });
          this.securityService.logout(); // Cerrar sesión si no está autorizado
          this.router.navigateByUrl("/login");
        } else if (err.status === 400) {
          Swal.fire({
            title: "Solicitud incorrecta",
            text: "Existe un error, contacte al administrador.",
            icon: "error",
            timer: 5000,
          });
        } else if (err.status === 500) {
          Swal.fire({
            title: "Error del servidor",
            text: "Inténtelo más tarde.",
            icon: "error",
            timer: 5000,
          });
        }
        return throwError(() => err);
      })
    );
  }
}
