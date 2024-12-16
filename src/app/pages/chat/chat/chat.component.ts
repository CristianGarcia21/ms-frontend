import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chats: any[] = [];
  messages: any[] = [];
  currentChatId: number | null = null;
  userEmail: string = ''; // Para buscar el usuario
  newMessage: string = ''; // Para escribir mensajes
  userId: string | null = null; // Obtener el userId del localStorage

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id'); // Obtener el userId del localStorage
    this.loadChats();
  }

  // Cargar la lista de chats
  loadChats(): void {
    this.chatService.getChats().subscribe((data) => {
      this.chats = data;
    });
  }

  // Cargar mensajes del chat seleccionado
  loadMessages(chatId: number): void {
    this.currentChatId = chatId;
    this.chatService.getMessages(chatId).subscribe((data) => {
      this.messages = data;
    });

    this.chatService.joinChat(chatId);
    this.chatService.listenForNewMessages().subscribe((newMessage) => {
      if (newMessage.chatId === chatId) {
        this.messages.push(newMessage);
      }
    });
  }

  // Iniciar un nuevo chat
  startChat(): void {
    if (this.userEmail.trim() === '') {
      alert('Por favor, ingresa un correo válido.');
      return;
    }

    this.chatService.startChat(this.userEmail).subscribe(
      (newChat) => {
        this.chats.push(newChat);
        this.loadMessages(newChat.id);
      },
      (error) => {
        console.error('Error al iniciar el chat:', error);
      }
    );
  }

    // Método para refrescar la lista de chats
    refreshChats(): void {
      this.loadChats();
    }
  // Enviar mensaje
  sendMessage(): void {
    if (this.currentChatId && this.newMessage.trim() !== '') {
      this.chatService.sendSocketMessage(this.currentChatId, this.userId, this.newMessage);
      this.newMessage = ''; // Limpiar el campo de entrada
    }
  }

}
