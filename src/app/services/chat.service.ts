import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebSocketService } from './web-socket.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = `${environment.url_ms_logica}/chats`;

  constructor(
    private http: HttpClient,
    private socket: WebSocketService
  ) {}

  // Obtener la lista de chats
  getChats(): Observable<any[]> {
    const mongoUserId = JSON.parse(localStorage.getItem('session') || '{}')?._id; // El ID de seguridad
    const userUrl = `${environment.url_ms_logica}/users/${mongoUserId}`; // Endpoint para buscar usuario por ID de seguridad

    console.log('Llamando al endpoint con userId:', mongoUserId);

    return new Observable<any[]>((observer) => {
      this.http.get<any>(userUrl).subscribe({
        next: (user) => {
          const logicUserId = user.id; // ID del usuario en lógica (número)
          const chatUrl = `${this.baseUrl}/chats?userId=${logicUserId}`; // Endpoint de chats con ID de lógica

          console.log('Llamando al endpoint de chats con logicUserId:', logicUserId);
          this.http.get<any[]>(chatUrl).subscribe({
            next: (chats) => {
              observer.next(chats);
              observer.complete();
            },
            error: (err) => observer.error(err),
          });
        },
        error: (err) => observer.error(err),
      });
    });
  }


  // Obtener los mensajes de un chat específico
  getMessages(chat_id: number): Observable<any> {
    console.log('Llamando a la API con chatId:', chat_id); // Agregar log
    return this.http.get<any>(`${environment.url_ms_logica}/messages/${chat_id}`);
  }

  // Iniciar un nuevo chat
  startChat(user2Email: string): Observable<any> {
    const url = `${this.baseUrl}/start`;
    const user1Email = JSON.parse(localStorage.getItem('session') || '{}')?.email;
    console.log('Iniciando chat con user1Email:', user1Email, 'y user2Email:', user2Email);

    return this.http.post<any>(url, { user1Email, user2Email });
  }

  // Enviar un mensaje a través del WebSocket
  sendSocketMessage(chatId: number, mongoUserId: string | null, content: string): void {
    if (!chatId || !mongoUserId || !content) {
      console.error('Datos incompletos para enviar mensaje:', {
        chatId,
        mongoUserId,
        content,
      });
      return;
    }

    const userUrl = `${environment.url_ms_logica}/users/${mongoUserId}`; // Endpoint para obtener el ID de lógica

    console.log('Obteniendo el ID de lógica con mongoUserId:', mongoUserId);

    // Obtener el ID de lógica antes de emitir el mensaje
    this.http.get<any>(userUrl).subscribe({
      next: (user) => {
        const logicUserId = user.id; // ID del usuario en lógica (numérico)

        console.log('Enviando mensaje con logicUserId:', logicUserId);

        // Emitir el mensaje con el ID de lógica
        this.socket.emit('sendMessage', {
          chatId,
          userId: logicUserId,
          content,
        });
      },
      error: (err) => {
        console.error('Error al obtener el ID de lógica:', err);
      },
    });
  }


  // Unirse a un chat por WebSocket
  joinChat(chatId: number): void {
    this.socket.emit('joinChat', chatId);
  }

  // Escuchar nuevos mensajes desde el WebSocket
  listenForNewMessages(): Observable<any> {
    return this.socket.listen('newMessage');
  }

  deleteChat(chatId: number): Observable<void> {
    const url = `${this.baseUrl}/${chatId}`; // Endpoint para eliminar chat
    return this.http.delete<void>(url);
  }

}
