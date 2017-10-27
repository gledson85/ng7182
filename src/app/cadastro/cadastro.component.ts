import { FotoComponent } from './../foto/foto.component';
import { Component } from '@angular/core';
import { FotoService } from "./../servicos/foto.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'cadastro',
  templateUrl: 'cadastro.component.html'
})
export class CadastroComponent {

  foto = new FotoComponent()
  mensagem: string = ''

  constructor(
     private servico: FotoService
    ,private rota: ActivatedRoute
    ,private roteamento: Router
  )
  {


    this.rota.params.subscribe(
        parametros => {

            if(parametros.id){
            
                this.servico
                .buscarPorId(parametros.id)
                .subscribe(
                    resposta => {
                        this.foto = resposta.json()
                    }
                )
  
            }
          
        }
    )

  }

  salvar(evento: Event){

    evento.preventDefault()

    if(this.foto._id){
        this.servico.atualizar(this.foto)
                    .subscribe(
                      () => {

                        this.mensagem = `Foto ${this.foto.titulo} alterada com sucesso`

                        setTimeout(
                          () => {
                            this.roteamento.navigate([''])
                          }
                          , 3000

                        )

                      }
                    )
    }
    else {
        this.servico.cadastrar(this.foto)
                    .subscribe(
                      () => {
                        
                        this.mensagem = `Foto ${this.foto.titulo} inserida com sucesso`

                        setTimeout(
                          () => {
                            this.mensagem = ''
                            this.foto = new FotoComponent()
                          }
                          ,2000
                        )
                        
                      }
                    )

    }

    
  }

}
