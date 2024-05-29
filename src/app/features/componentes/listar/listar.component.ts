import { Component } from '@angular/core';
import { FestivoService } from '../../servicios/festivo.service';
import { FestivoDTO } from '../../../core/entidades/FestivoDTO';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule,
   
  ],
  providers: [ DatePipe ],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {

  public year: number;
  festivos: FestivoDTO[] = [];
  columnas = [
    { prop: "nombre", name: "Festivo" },
    { prop: "fecha", name: "Fecha", pipe: this.datePipe() }
  ];
  public fechaSeleccionada: Date = new Date ();
  public mensajeValidacion: string= '';
  
  constructor(private servicio: FestivoService,
  private servicioDatePipe: DatePipe
  ) {
    this.year = new Date().getFullYear();
  }
  
  public listar() {
    this.servicio.listar(this.year).subscribe({
      next: response => {
        this.festivos = response;
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }
 
  datePipe() {
    return { transform: (value: any) => this.servicioDatePipe.transform(value, 'MM/dd/yyyy') };
  }

  public validarFecha() {
    const fecha = new Date(this.fechaSeleccionada);
    this.servicio.verificarFecha(fecha).subscribe({
      next: (respuesta: string) => {
        this.mensajeValidacion = respuesta;
      },
      error: (error: any) => {
        this.mensajeValidacion = 'Error al verificar la fecha';
      }
    });
  }
  }
  
    

