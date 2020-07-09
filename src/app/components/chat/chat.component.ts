import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{

  texto = '';
  mensajeSubcription: Subscription;
  mensajes: any[] = [];
  elemento: HTMLElement;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.elemento = document.getElementById('chat-mensajes');
    this.mensajeSubcription =  this.chatService.getMessages().subscribe(msg =>{
      this.mensajes.push(msg);

      setTimeout(() =>{
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },50);
    });
  }

  ngOnDestroy(){
    this.mensajeSubcription.unsubscribe();
  }

  enviar(){

    if(this.texto.trim().length === 0){
      return;
    }
    this.chatService.sendMessage(this.texto);
    this.texto = '';

  }

}
