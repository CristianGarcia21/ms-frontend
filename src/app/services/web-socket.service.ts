import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService extends Socket {
  constructor() {
    super({
      url: environment.url_ms_logica, // Cambia por la URL de tu backend
      options: {
        transports: ['websocket'], // Forzar WebSocket
      },
    });
  }

  // Escuchar eventos desde el servidor
  listen(eventName: string) {
    return this.fromEvent(eventName);
  }

  // Emitir eventos al servidor (si es necesario)
  emit(eventName: string, data: any) {
    this.ioSocket.emit(eventName, data);
  }
}
