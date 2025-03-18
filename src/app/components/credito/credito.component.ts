import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {FormBuilder, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
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


@Component({
  selector: 'app-credito',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,  // Aquí lo importas directamente
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
    DialogModule
  ],
  templateUrl: './credito.component.html',
  styleUrl: './credito.component.css'
})
export class CreditoComponent implements OnInit, OnDestroy{
  products = [
    {
      usuario: 'Juan Perez',
      descripcion: 'Compra de laptop',
      monto: 1200,
      fechaRegistro: '2024-03-10',
      fechaActualizacion: '2024-03-12',
      estado: 'Aprobado',
      comentarios: 'Entrega en 3 días'
    },
    {
      usuario: 'Maria Gomez',
      descripcion: 'Compra de smartphone',
      monto: 850,
      fechaRegistro: '2024-03-08',
      fechaActualizacion: '2024-03-09',
      estado: 'Pendiente',
      comentarios: 'Esperando pago'
    },
    {
      usuario: 'Carlos Ruiz',
      descripcion: 'Compra de auriculares',
      monto: 150,
      fechaRegistro: '2024-03-05',
      fechaActualizacion: '2024-03-06',
      estado: 'Rechazado',
      comentarios: 'Stock agotado'
    }
  ];
  group!: FormGroup;  // Declaramos el FormGroup
  visible: boolean = false;
  creditoForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inicializaFormulario();
  }

  inicializaFormulario() {
    this.group = new FormGroup({
      nombre_usuario: new FormControl('', Validators.required)
    });

    this.creditoForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      monto: new FormControl(null, [Validators.required, Validators.min(1)]),
      descripcion: new FormControl('', Validators.maxLength(200))
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
}
