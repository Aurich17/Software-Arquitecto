import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
// import { CreditoService } from '../../services/credito.service';
// import { CreditoRequest } from '../credito/request/credito.request';
// import { MantCreditoRequest } from '../credito/request/mantCredito.request';
// import { UsuarioRequest } from '../credito/request/usuario.request';
// import { CreditoResponse } from '../credito/response/credito.response';
import { UsuarioResponse } from '../credito/response/usuario.response';
// import { GoogleAuthService } from '../../services/google-auth.service';
// import { GoogleDriveService } from '../../services/google-drive.service';
import { CorteLaserService } from '../../services/corte-laser.service';
import { CorteLaserResponse } from './response/corte-laser.response';
import { CorteLaserRequest, MantCorteLaserRequest } from './request/corte-laser.request';

declare const gapi: any;
@Component({
  selector: 'app-corte-laser',
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
    DatePickerModule,
    CardModule
  ],
  providers: [MessageService],
  templateUrl: './corte-laser.component.html',
  styleUrl: './corte-laser.component.css'
})
export class CorteLaserComponent implements OnInit, OnDestroy {
  corteLaserTable: CorteLaserResponse[] = [];
  usuarios: UsuarioResponse[] = [];
  items: any[] = [];
  group!: FormGroup; // Declaramos el FormGroup
  visible: boolean = false;
  corteLaserForm!: FormGroup;
  selectedUserName: string = '';
  usuarioUnico = false;
  deudaTotal:number = 0;
  file: File | null = null;

  constructor(private fb: FormBuilder,private readonly corteLaserService: CorteLaserService,private messageService: MessageService) {}

  ngOnInit(): void {
    this.inicializaFormulario();
    // this.listaUsuarios();
    this.listaCredito();
    // this.loadGoogleAPI();
  }

  inicializaFormulario() {
    this.group = new FormGroup({
      nombre_usuario: new FormControl('', Validators.required),
    });

    this.corteLaserForm = new FormGroup({
      telefono: new FormControl(null, Validators.required),
      comentario: new FormControl('', null),
    });
  }


  // loadGoogleAPI() {
  //   const script = document.createElement('script');
  //   script.src = 'https://apis.google.com/js/api.js';
  //   script.onload = () => {
  //     gapi.load('auth2', () => {
  //       gapi.auth2.init({
  //         client_id: '209390540736-ava19ng5pl0r70p379cu94q3bos3ol12.apps.googleusercontent.com'
  //       });
  //     });
  //   };
  //   document.body.appendChild(script);
  // }
  showDialog() {
    this.visible = true;
  }


  ngOnDestroy(): void {
    this.corteLaserForm.reset();
  }

  listaCredito() {
    const values = this.group.value;
    console.log('Values', values);
    this.corteLaserTable = [];
    this.deudaTotal = 0; // Reseteamos la deuda total antes de calcular

    const request: CorteLaserRequest = {
      p_id_corte_laser: localStorage.getItem('rol_id') || '',
    };
    this.corteLaserService.listaCorteLaser(request).subscribe(
      (response) => {
        this.corteLaserTable = response;

        this.messageService.add({
          severity: 'success',
          summary: 'Búsqueda exitosa',
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

  // listaUsuarios() {
  //   this.usuarios = [];
  //   const request: UsuarioRequest = {
  //     filtro_nombre: "",
  //   };
  //   this.creditoService.listaUsuarios(request).subscribe(
  //     (response) => {
  //       this.usuarios = response
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.items = this.usuarios.filter(user => user.nombre.toLowerCase().includes(query));
  }


  mantCorteLaser(accion:string, row:any,estado:any){
    console.log('ESTA ES LA FILA', row);
    const values = this.corteLaserForm.value;
    const request:MantCorteLaserRequest = {
      p_accion: accion,
      p_id_corte_laser: accion === 'I' ? null : row.id_corte_laser,
      p_nombre: accion === 'I' ? values.nombre : row.nombre,
      p_numero_celular: accion === 'I' ? values.telefono : row.numero_celular,
      p_nombre_archivo: accion === 'I' ? values.nombre_archivo : row.nombre_archivo,
      p_link_archivo: accion === 'I' ? values.link_archivo : row.link_archivo,
      p_comentario: accion === 'I' ? values.comentario : row.comentario,
      p_estado: estado,
      p_corte_laser: accion === 'I' ? null : row.corte_laser
    };

    this.corteLaserService.mantCorteLaser(request).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado Correctamente',
        });
        this.listaCredito()
        this.corteLaserForm.reset();
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
