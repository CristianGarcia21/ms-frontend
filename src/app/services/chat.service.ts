import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = `${environment.url_ms_logica}/chats`;
  private messagesUrl = `${environment.url_ms_logica}/messages`;

  constructor(private http: HttpClient) {}

  // Obtener todos los chats
  getChats(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener mensajes de un chat específico
  getMessages(chatId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.messagesUrl}/${chatId}`);
  }

  // Crear un nuevo chat
  startChat(userEmail: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email: userEmail });
  }

  // Enviar mensaje a través del WebSocket
  sendSocketMessage(chatId: number, userId: string, content: string): void {
    // Lógica para enviar el mensaje a través de WebSocket
  }

  // Unirse a un chat a través del WebSocket
  joinChat(chatId: number): void {
    // Lógica para unirse al WebSocket
  }

  // Escuchar mensajes nuevos
  listenForNewMessages(): Observable<any> {
    // Lógica para escuchar nuevos mensajes
    return new Observable(); // Cambia esto con la lógica de WebSocket
  }
}
