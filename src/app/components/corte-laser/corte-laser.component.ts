import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ConfirmationService, MessageService } from 'primeng/api';
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
import { UsuarioResponse } from '../credito/response/usuario.response';
import { CorteLaserService } from '../../services/corte-laser.service';
import { CorteLaserResponse } from './response/corte-laser.response';
import { CorteLaserRequest, MantCorteLaserRequest } from './request/corte-laser.request';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


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
    CardModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService,ConfirmationService],
  templateUrl: './corte-laser.component.html',
  styleUrl: './corte-laser.component.css'
})
export class CorteLaserComponent implements OnInit, OnDestroy {
  corteLaserTable: CorteLaserResponse[] = [];
  usuarios: UsuarioResponse[] = [];
  items: any[] = [];
  group!: FormGroup;
  visible: boolean = false;
  corteLaserForm!: FormGroup;
  selectedUserName: string = '';
  usuarioUnico = false;
  deudaTotal:number = 0;
  file: File | null = null;

  constructor(private readonly corteLaserService: CorteLaserService,private messageService: MessageService,private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.inicializaFormulario();
    this.listaCredito();
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
    this.deudaTotal = 0;

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

  reporteCorteDefectuoso(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿El documento se encuentra defectuoso?',
        header: 'Documento defectuoso',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Reportar',
            severity: 'danger',
        },

        accept: () => {
            this.messageService.add({ severity: 'error', summary: 'Reportado', detail: 'Corte reportado correctamente' });
        }
    });
  }

  procesoCorte(event: Event, index: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Desea trabajar el documento?',
        header: 'Trabajar documento',
        icon: 'pi pi-wrench',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Trabajar',
            severity: 'contrast',
        },

        accept: () => {
            this.messageService.add({ severity: 'error', summary: 'Reportado', detail: 'Corte reportado correctamente' });
        }
    });
  }

  descargarDocumento(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Desea descargar el documento?',
        header: 'Descargar Documento',
        icon: 'pi pi-download',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Descargar',
            severity: 'contrast',
        },

        accept: () => {
            this.messageService.add({ severity: 'error', summary: 'Reportado', detail: 'Corte reportado correctamente' });
        }
    });
  }
}
