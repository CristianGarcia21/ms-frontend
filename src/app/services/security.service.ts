import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private baseUrl = `${environment.url_ms_security}/api/public/security`;

  // Variable famosa. Permite que los componentes reciban actualizaciones cuando el usuario
  // inicie o cierre sesión
  theUser = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    this.verifyActualSession();
  }

  /**
  * Realiza la petición al backend con el correo y la contraseña
  * para verificar si existe o no en la plataforma
  * @param user JSON con la información de correo y contraseña
  * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
  */
  login(user: User): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<any>(url, user);
  }

  /**
  * Guarda la sesión del usuario en el local storage.
  * @param dataSesion Respuesta del backend con los datos de la sesión.
  */
  saveSession(dataSesion: any) {
    // Ajustar la estructura del objeto a la actual en el local storage
    const sessionData = {
      name: dataSesion.name,
      email: dataSesion.email,
      password: '',
      token: dataSesion.token,
      _id: dataSesion._id,
      role: dataSesion.role
    };
    console.log('Guardando sesión:', JSON.stringify(dataSesion));
    localStorage.setItem('session', JSON.stringify(sessionData));
    localStorage.setItem('token', dataSesion.token); // Guardar el token separado si es necesario
    this.setUser(sessionData);
  }

  /**
  * Permite actualizar la información del usuario
  * que acabó de validarse correctamente.
  * @param user Información del usuario logueado.
  */
  setUser(user: User) {
    this.theUser.next(user);
  }

  /**
  * Permite obtener la información del usuario como observable.
  * @returns Observable con los datos del usuario.
  */
  getUser(): Observable<User | null> {
    return this.theUser.asObservable();
  }

  /**
  * Permite obtener la información del usuario
  * que tiene la sesión activa.
  * @returns Usuario con la sesión activa.
  */
  public get activeUserSession(): User | null {
    return this.theUser.value;
  }

  /**
  * Permite cerrar la sesión del usuario
  * que estaba previamente logueado.
  */
  logout() {
    localStorage.removeItem('session');
    localStorage.removeItem('token');
    this.setUser(null);
  }

  /**
  * Verifica si actualmente en el local storage
  * existe información de un usuario previamente logueado.
  */
  verifyActualSession() {
    let actualSession = this.getSessionData();
    if (actualSession) {
      this.setUser(actualSession);
    }
  }

  /**
  * Verifica si hay una sesión activa.
  * @returns Boolean indicando si existe sesión.
  */
  existSession(): boolean {
    return localStorage.getItem('session') ? true : false;
  }

  /**
  * Permite obtener los datos de la sesión activa en el
  * local storage.
  * @returns Objeto con los datos de la sesión.
  */
  getSessionData(): User | null {
    const sessionString = localStorage.getItem('session');
    return sessionString ? JSON.parse(sessionString) : null;
  }

  /**
  * Verifica el código 2FA ingresado por el usuario.
  * @param email Correo del usuario
  * @param code2FA Código de 2FA ingresado
  * @returns Observable con la respuesta del backend
  */
  verify2FA(email: string, code2FA: string): Observable<any> {
    const url = `${this.baseUrl}/verify-2fa`;
    const body = { email, code2FA };
    return this.http.post<any>(url, body);
  }
}
