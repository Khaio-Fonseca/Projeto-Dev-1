import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../cliente';
import { IconsService } from '../../../shared/util/icons.service';
import { NomeRefService } from '../../../shared/util/att-nome-ref.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss'],
})
export class ClienteCadastroComponent implements OnInit {

  clienteForm: FormGroup = new FormGroup({});
  emailError: string = 'Digite um CNPJ/CPF válido';
  nomeError: string = 'Insira um nome para seu cliente';
  openIconUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private IconsService: IconsService,
    public nomeRefService: NomeRefService,
    private ngbAlert: NgbAlert
  ) {}

  ngOnInit(): void {
    this.openIconUrl = this.IconsService.getIconUrl('icon-obrigatorio');
    this.clienteForm = this.fb.group({
      inputIdentificacao: ['', [Validators.required]],
      inputNome: ['', [Validators.required]],
      inputRef: ['', [Validators.required]],
    });

    this.clienteForm.get('inputIdentificacao')!.valueChanges.subscribe(value => {
      this.atualizarNomeRef(value);
    });

  }


  private atualizarNomeRef(valor: string) {
    this.nomeRefService.atualizarNomeRef(valor);
  }



  // atualizarNomeRef(valor: string) {
  //   const valorSemPontos = valor.replace(/\./g, '');
  //   this.mostrarDivInputRef = valorSemPontos.length === 11 || valorSemPontos.length === 14;
  //   switch (valorSemPontos.length) {
  //     case 11:
  //       this.nome_ref = 'Nome da mãe';
  //       this.placeholder = 'Insira o nome da mãe do cliente';
  //       break;
  //     case 14:
  //       this.nome_ref = 'Nome fantasia';
  //       this.placeholder = 'Insira o nome fantasia do CNPJ';
  //       break;
  //     default:
  //       this.nome_ref = '';
  //       this.placeholder = '';
  //       break;
  //   }


  OnSubmit(): void {
    if (this.clienteForm.valid) {
      const cliente: Cliente = {
        identificacao: this.clienteForm.value.inputIdentificacao,
        nome: this.clienteForm.value.inputNome,
        nome_ref: this.clienteForm.value.inputRef,
      };

      this.clienteService.createCliente(cliente).subscribe(
        (data: Cliente) => {
          console.log(data);
          this.clienteForm.reset();
          this.router.navigate(['/profile/cliente/editar/' + data.id]);

          // Aciona o alerta usando a API do NgBootstrap
          this.ngbAlert.close(); // Fecha o alerta se estiver aberto
          this.ngbAlert.type = 'success';
          this.ngbAlert.dismissible = true;
          // this.ngbAlert.open('Cliente adicionado com sucesso!');

        },
        (error: any) => {
          console.log(cliente);
          console.log(error);
          // Aciona o alerta usando a API do NgBootstrap
          this.ngbAlert.close(); // Fecha o alerta se estiver aberto
          this.ngbAlert.type = 'danger';
          this.ngbAlert.dismissible = true;
          // this.ngbAlert.open('Erro ao adicionar cliente. Erro: ' + error);
          
        }
      );
    } else {
      console.log('Erro no formulário. Verifique os campos.');
    }
  }

  voltar() {
    this.router.navigate(['users/profile/cliente/']);
  }



}
