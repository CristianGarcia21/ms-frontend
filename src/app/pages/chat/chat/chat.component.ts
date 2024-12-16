import { Component, OnInit } from '@angular/core';
import { log } from 'node:console';
import { ChatService } from 'src/app/services/chat.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chats: any[] = [];
  messages: any[] = [];
  currentChatId: number | null = null;
  userEmail: string = ''; // Correo para buscar al usuario
  newMessage: string = ''; // Mensaje nuevo
  userId: string | null = null; // ID del usuario actual desde localStorage

  constructor(private chatService: ChatService, private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadChats();
    this.resolveLogicUserId()
  }

  resolveLogicUserId(): void {
    const mongoUserId = JSON.parse(localStorage.getItem('session') || '{}')?._id;
    this.usersService.getLogicUserIdByMongoId(mongoUserId).subscribe({
      next: (user) => {
        this.userId = user.id; // Guardar el ID de lógica
        console.log('ID de lógica del usuario actual:', this.userId);
      },
      error: (err) => console.error('Error al obtener el ID de lógica:', err),
    });
  }

  // Cargar la lista de chats
  loadChats(): void {
    console.log('Cargando chats...');
    this.chatService.getChats().subscribe({
      next: (data) => {

        this.chats = data.map((chat) => {
          const otherUser = chat.user1.user_id === this.userId ? chat.user2 : chat.user1;
          return {
            ...chat,
            otherUser, // Agregar información del otro usuario
          };
        });
      },
      error: (err) => console.error('Error al cargar chats:', err),
    });
  }


  // Cargar los mensajes del chat seleccionado
  loadMessages(chatId: number): void {
    this.currentChatId = chatId;

    this.chatService.getMessages(chatId).subscribe({
      next: (data) => {
        console.log('Mensajes cargados:', data);
        this.messages = data;
        console.log();


        // Iniciar la escucha de nuevos mensajes en tiempo real
        this.chatService.listenForNewMessages().subscribe((newMessage) => {
          console.log('Nuevo mensaje recibido:', newMessage);
          if (newMessage.chatId === chatId) {
            this.messages.push(newMessage); // Agregar mensaje al chat actual
          }
        });
      },
      error: (err) => console.error('Error al cargar mensajes para el chat ID:', chatId, err),
    });

    this.chatService.joinChat(chatId); // Unirse a la sala del WebSocket
  }


  // Iniciar un nuevo chat
  startChat(): void {
    if (this.userEmail.trim() === '') {
      alert('Por favor, ingresa un correo válido.');
      return;
    }

    console.log('Iniciando un nuevo chat con el usuario:', this.userEmail);

    this.chatService.startChat(this.userEmail).subscribe({
      next: (newChat) => {
        console.log('Nuevo chat iniciado o encontrado:', newChat);

        // Agregar el chat a la lista de chats si no está ya presente
        const existingChat = this.chats.find(chat => chat.id === newChat.id);
        if (!existingChat) {
          const otherUser = newChat.user1.user_id === this.userId ? newChat.user2 : newChat.user1;
          this.chats.push({
            ...newChat,
            otherUser,
          });
        }

        // Cargar los mensajes del chat iniciado
        this.loadMessages(newChat.id);
      },
      error: (err) => {
        console.error('Error al iniciar chat:', err);
        alert('No se pudo iniciar el chat. Verifica la información e inténtalo nuevamente.');
      },
    });
  }

  // Enviar un mensaje
  sendMessage(): void {
    console.log('Enviando mensaje...');

    if (this.currentChatId && this.newMessage.trim() !== '') {
      const mongoUserId = JSON.parse(localStorage.getItem('session') || '{}')?._id; // ID de seguridad (MongoDB)
      this.chatService.sendSocketMessage(this.currentChatId, mongoUserId, this.newMessage);
      this.newMessage = ''; // Limpiar el input
    } else {
      console.warn('No se puede enviar el mensaje. Falta información.');
    }
  }

  deleteChat(chatId: number, event: Event): void {
    // Evitar que el evento haga otras acciones (como seleccionar el chat)
    event.stopPropagation();

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Realmente quieres eliminar este chat?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.chatService.deleteChat(chatId).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'El chat ha sido eliminado.', 'success');
            this.loadChats(); // Recargar la lista de chats
          },
          error: (err) => {
            console.error('Error al eliminar chat:', err);
            Swal.fire('Error', 'No se pudo eliminar el chat.', 'error');
          },
        });
      }
    });
  }

}
