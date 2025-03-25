import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { CreditoRequest } from './request/credito.request';
import { CreditoService } from '../../services/credito.service';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { CreditoResponse } from './response/credito.response';
import { ToastModule } from 'primeng/toast';
import { UsuarioResponse } from './response/usuario.response';
import { UsuarioRequest } from './request/usuario.request';
import { AutoComplete } from 'primeng/autocomplete';
import { DatePickerModule } from 'primeng/datepicker';
import { MantCreditoRequest } from './request/mantCredito.request';
import { CardModule } from 'primeng/card';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}


@Component({
  selector: 'app-credito',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Aquí lo importas directamente
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    TableModule,
    DialogModule,
    MessageModule,
    ToastModule,
    AutoComplete,
    DatePickerModule,
    CardModule
  ],
  providers: [MessageService],
  templateUrl: './credito.component.html',
  styleUrl: './credito.component.css',
})
export class CreditoComponent implements OnInit, OnDestroy {
  creditosTable: CreditoResponse[] = [];
  usuarios: UsuarioResponse[] = [];
  items: any[] = [];
  group!: FormGroup; // Declaramos el FormGroup
  visible: boolean = false;
  creditoForm!: FormGroup;
  selectedUserName: string = '';
  usuarioUnico = false;
  deudaTotal:number = 0;

  constructor(private fb: FormBuilder,private readonly creditoService: CreditoService,private messageService: MessageService ) {}

  ngOnInit(): void {
    this.inicializaFormulario();
    this.listaUsuarios();
    this.listaCredito();
  }

  inicializaFormulario() {
    this.group = new FormGroup({
      nombre_usuario: new FormControl('', Validators.required),
    });

    this.creditoForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      monto: new FormControl(null, [Validators.required, Validators.min(1)]),
      descripcion: new FormControl('', Validators.maxLength(200)),
      fecha_vencimiento: new FormControl('', Validators.required),
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.group.valid) {
      console.log(this.group.value);
    }
  }

  showDialog() {
    this.visible = true;
  }

  guardarCredito() {
    if (this.creditoForm.valid) {
      console.log('Guardando crédito:', this.creditoForm.value);
      this.visible = false; // Cierra el diálogo después de guardar
    }
  }

  ngOnDestroy(): void {
    this.creditoForm.reset();
  }

  listaCredito() {
    const values = this.group.value;
    console.log('Values', values);
    this.creditosTable = [];
    this.deudaTotal = 0; // Reseteamos la deuda total antes de calcular

    const request: CreditoRequest = {
      p_id_usuario: values.nombre_usuario?.id || null,
    };

    this.usuarioUnico = request.p_id_usuario !== null;

    this.creditoService.listaCredito(request).subscribe(
      (response) => {
        this.creditosTable = response;

        if (this.usuarioUnico) {
          this.deudaTotal = 0; // ✅ Reiniciar la deuda antes de sumar
          for (let i = 0; i < response.length; i++) {
            this.deudaTotal += Number(response[i].monto_pendiente); // ✅ Convertir a número para evitar concatenación
            console.log('Deuda total:', this.deudaTotal);
          }
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Búsqueda exitosa',
          detail: 'Se encontraron los créditos',
        });
      },
      (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se encontraron los créditos',
        });
      }
    );
}

  listaUsuarios() {
    this.usuarios = [];
    const request: UsuarioRequest = {
      filtro_nombre: "",
    };
    this.creditoService.listaUsuarios(request).subscribe(
      (response) => {
        this.usuarios = response
        console.log('Usuarios', this.usuarios);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.items = this.usuarios.filter(user => user.nombre.toLowerCase().includes(query));
  }


  mantCredito(){
    const values = this.creditoForm.value;
    const request:MantCreditoRequest = {
      p_accion: 'I',
      p_id_usuario: values.usuario.id,
      p_monto_total: values.monto,
      p_monto_pagado: 0,
      p_cod_estado: '001',
      p_descripcion: values.descripcion,
      p_fecha_vencimiento: values.fecha_vencimiento
    };

    this.creditoService.mantCredito(request).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Credito guardado',
          detail: 'Se guardo el credito',
        });
        this.creditoForm.reset();
      },
      (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo guardar el credito',
        });
      }
    );
  }

}
