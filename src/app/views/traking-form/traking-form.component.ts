import { Component, OnInit, OnChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TrakingFormService } from '../../services/traking-form/traking-form.service';
import { FormDiagDto } from '../../services/traking-form/models/form-diag-dto';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { ResponseSaveDto } from '../../services/traking-form/models/response-save-dto';
import { ParamsDto } from '../../services/traking-form/models/params-dto';

@Component({
  selector: 'app-traking-form',
  templateUrl: './traking-form.component.html',
  styleUrls: ['./traking-form.component.css'],
  providers: [TrakingFormService]
})
export class TrakingFormComponent implements OnInit, OnChanges {

  searchBy = 'Historia Clinica';
  historia = '';
  matricula = '';
  isDonate = false;
  isDisableMatricula = false;
  formDto: FormDiagDto = new FormDiagDto();
  listForms: any = [];
  idForm: number;
  isLoading = false;

  listaDocumento: string[] = ['CI', 'PASAPORTE', 'LIBRETA MILITAR', 'RUN'];
  listaExtension: string[] = ['LP', 'SC', 'CB', 'OR', 'PT', 'PD', 'BN', 'CH', 'TJ'];
  lista7: string[] = ['Masculino','Femenino','Ninguno','Otro',];
  listaGenero = [{value:'M', text:'Masculino'},{value:'F',text:'Femenino'}];
  listaSiNoTV = [{value:'Si', text:'Si'},{value:'No', text:'No'},{value:'TV',text:'Tal vez'}];
  listaSiNo = [{value:'Si', text:'Si'},{value:'No', text:'No'}];
  lista11: string[] = ['Personal de Salud','Policia','Militar','Construccion','Alimentos','Manufactura','Desempleado','Jubilado','Otro ',];
  
  lista14: string[] = ['Medicina','Enfermeria (Licenciada o Auxiliar)','Laboratorio','Fisioterapia/kinesiologia','Odontologia',];
  lista15: string[] = ['Emergencia','Terapia Intensiva','Terapia Intermedia','Urgencia','Consultorio Covid','Consulta Externa General','Sala Hospitalaria','Direccion','Quirofano','Triage','Transporte y traslado',];
  lista17: string[] = ['Si','No',];
  lista18: string[] = ['Diabetes','Hipertensión Arterial','Tuberculosis','Enfermedad Respiratoria (ASMA. ENF. OBSTRUCTIVA CRONICA. FIBROSIS. OTRA)','Enfermedad Cardiaca','Chagas','Ninguna de las anteriores','Cancer','Enfermedad Renal','Colagenopatias','Otro',];
  lista20: string[] = ['IECA (enalapril. rinopril. lisinopril. ramipril. etc)','ARA-2 (Losartan. Temisartan. Valsartan. etc)','Ninguno de los anteriores','InmunoSupresores (Nectofenolato. vincristina. cicloflosfamida. metotrexate. etc)'];
  lista21 = [{value:'Si', text:'Si'},{value:'No', text:'No'}];
  lista26 = [{value:'Si', text:'Si'},{value:'No', text:'No'}];
  lista27 = [{value:'Si', text:'Si'},{value:'No', text:'No'}];
  lista28 = [{value:'Si', text:'Si'},{value:'No', text:'No'}];
  lista29 = [{value:'Si', text:'Si'},{value:'No', text:'No'}];
  lista30 = [{value:'Si', text:'Si'},{value:'No', text:'No'}];
  lista31 = [{value:'Si', text:'Si'},{value:'No', text:'No'}];
  lista32: string[] = ['Mas de 30 paquetes al año','Menos de 30 paquetes al año',];
  lista33: string[] = ['Nunca ha fumado','Hace mas de 1 año','Hace mas de 3 meses pero menos de 1 año',];
  lista34 = [{value:'Si', text:'Si'},{value:'No', text:'No'}];
  lista35: string[] = ['Si es hombre - más de 4 medidas en ún solo día o 14 a la semana','Si es mujer - más de 3 medidas en ún solo día o 7 a la semana',];
  lista36 = [{value:'Si', text:'Si'},{value:'No', text:'No'},{value:'TV',text:'Tal vez'}];
  lista37: string[] = ['Sí - 3 veces por semana durnte al menos 30 minutos','Sí - menos de 3 veces por semana','No realizo actividades físicas',];
  lista38 = [{value:'Si', text:'Si'},{value:'No', text:'No'},{value:'TV',text:'Tal vez'}];
  lista39 = [{value:'Si', text:'Si'},{value:'No', text:'No'},{value:'TV',text:'Tal vez'}];
  lista40: string[] = ['Agresion Verbal','Agresion Fisica','Agresion Psicologica','Agresión Sexual','Ninguna de las anteriores',];
  lista42: string[] = ['Sano','Enfermo','Otro',];
  lista45: number[] = [1,2,3,4,5,];
  lista46 = [{value:'Si', text:'Si'},{value:'No', text:'No'}];
  lista47 = [{value:'Si', text:'Si'},{value:'No', text:'No'}];
  lista48 = [{value:'Si', text:'Si'},{value:'No', text:'No'}];
  lista49 = [{value:'Si', text:'Si'},{value:'No', text:'No'}, {value:'NS', text:'No sé'}];
  lista50: string[] = ['37.4 °Centigrados o menos','Más de 37.4 °Centigrados','No sé',];
  lista51: string[] = ['Más de 100 pulsaciones por minuto','Menos de 100 pulsaciones por minuto','No se - no me he tomado el pulso',];
  lista52: string[] = ['Si','No',];
  lista53: string[] = ['Menos o igual a 22 respiraciones por minuto','23 o más respiraciones por minuto',' No sé',];
  lista54: string[] = ['Si','No',];
  lista55: string[] = ['Hidroxicloroquina o Cloroquina','Azitromicina','Ivermectina','Indometacina','Trimetoprima Sulfametoxazol (Cotrimoxazol / Bactrin / Bacterol)','Aspirina','Prednisona','Ninguno de los anteriores','Otro',];
  lista57: string[] = ['Zinc','Omega - 3 u Omega - 6','Calcio','Magnesio','Ninguno','Otro',];
  lista59: string[] = ['Si','No',];
  lista60: string[] = ['Eucalipto','Menta','Ninguno','Otro',];
  lista62 = [{value:'Si', text:'Si'},{value:'No', text:'No'}, {value:'NS', text:'No sé'}];
  lista63 = [{value:'Si', text:'Si'},{value:'No', text:'No'},{value:'TV',text:'Tal vez'}];
  listTypeBlood = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+' , '0-'];

  title1: string = "Datos Personales";
  title2: string = "Riesgo Laboral";
  title3: string = "Antecedentes Medicos";
  title4: string = "Evaluación de Apoyo Social Instrumental";
  title5: string = "Antecedentes Sociales";
  title6: string = "Tensión Familiar";
  title7: string = "Datos Clínicos Subjetivos";
  title8: string = "Datos Clinicos Objetivos";
  title9: string = "Riesgo de Intoxicación por automedicacion";

  riesgoParaMedicosChecked: Boolean[] = [];
  enfermedadesPadeceChecked: Boolean[] = [];
  medicamentosPorEnfermedadChecked: Boolean[] = [];
  escalaTensionFamiliarChecked: Boolean[] = [];
  estadoSaludActualChecked: Boolean[] = [];
  medicamentosConsumidosChecked: Boolean[] = [];
  vitaminasConsumidasChecked: Boolean[] = [];
  medicinaNaturistaConsumidaChecked: Boolean[] = [];
  isSuccess = false;
  message = '';


  constructor(private trakingFormService: TrakingFormService, private _formBuilder: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    
  }

  ngOnChanges() {
    
  }

  public showConsole() {
    this.setCheckBoxs();
    //console.log(this.formDto);
    console.log(this.riesgoParaMedicosChecked)
    
  }

  public saveTrakingForm() {

    this.setCheckBoxs();
    this.formDto.fechaNacimiento = moment(this.formDto.fechaNacimiento).format('MM-MM-YYYY').toString();
    this.formDto.fechaTomaMuestra = moment(this.formDto.fechaTomaMuestra).format('MM-MM-YYYY').toString();
    this.formDto.fechaUltimaMenstruacion = moment(this.formDto.fechaUltimaMenstruacion).format('MM-MM-YYYY').toString();
    this.isLoading = true;
    this.trakingFormService.save(this.formDto).subscribe( (res: any) => {
      /*this.isSuccess = true;
      this.message = res.body;*/
      this.isLoading = false;
      this.openDialog(res.body)
    }, error => {
      this.isLoading = false;
    });
  }

  public getFormPrevious() {
    let esMatricula = true;
    let parametros = this.matricula;
    if(this.searchBy === 'Historia Clinica'){
      esMatricula = false;
      parametros = this.historia;
    }
    if(parametros === null || typeof parametros === 'undefined' || parametros === ''){
      return;
    }

    let request: ParamsDto = {
      esMatricula: esMatricula,
	    parametros: parametros,//'7B' //
    };
    this.isLoading = true;
    this.trakingFormService.getFormPrevious(request).subscribe( (resp: any) => {
      this.isLoading = false;
      this.listForms = resp.body;
    }, error => {
      this.isLoading = false;
    });
  }

  public getFormById() {
    this.isLoading = true;
    this.trakingFormService.getFormById(this.idForm).subscribe( (resp: any) => {
      this.isLoading = false;
      this.formDto = resp.body;
      this.isDisableMatricula = true;
      this.getCheckBoxs();
    }, error => {
      this.isLoading = false;
    });
  }

  public newForm() {
    this.isDisableMatricula = false;
    this.formDto = new FormDiagDto();
    this.riesgoParaMedicosChecked = [];
    this.enfermedadesPadeceChecked = [];
    this.medicamentosPorEnfermedadChecked = [];
    this.escalaTensionFamiliarChecked = [];
    this.estadoSaludActualChecked = [];
    this.medicamentosConsumidosChecked = [];
    this.vitaminasConsumidasChecked = [];
    this.medicinaNaturistaConsumidaChecked = [];
  }

  public changeDonate() {
    this.isDonate = false;
    if(this.formDto.deseaDonarSangre=='Si') {
      this.isDonate = true;
    }
  }

  private setCheckBoxs() {
    this.formDto.riesgoParaMedicos = '';
    this.formDto.enfermedadesPadece = '';
    this.formDto.medicamentosPorEnfermedad = '';
    this.formDto.escalaTensionFamiliar = '';
    this.formDto.estadoSaludActual = '';
    this.formDto.medicamentosConsumidos = '';
    this.formDto.vitaminasConsumidas = '';
    this.formDto.medicinaNaturistaConsumida = '';
    
    this.riesgoParaMedicosChecked.forEach( (value, index) => {
      this.formDto.riesgoParaMedicos += this.lista15[index] + ',';
    });
    this.enfermedadesPadeceChecked.forEach( (value, index) => {
      this.formDto.enfermedadesPadece += this.lista18[index] + ',';
    })
    this.medicamentosPorEnfermedadChecked.forEach( (value, index) => {
      this.formDto.medicamentosPorEnfermedad += this.lista20[index] + ',';
    })
    this.escalaTensionFamiliarChecked.forEach( (value, index) => {
      this.formDto.escalaTensionFamiliar += this.lista40[index] + ',';
    })
    this.estadoSaludActualChecked.forEach( (value, index) => {
      this.formDto.estadoSaludActual += this.lista42[index] + ',';
    })
    this.medicamentosConsumidosChecked.forEach( (value, index) => {
      this.formDto.medicamentosConsumidos += this.lista55[index] + ',';
    })
    this.vitaminasConsumidasChecked.forEach( (value, index) => {
      this.formDto.vitaminasConsumidas += this.lista57[index] + ',';
    })
    this.medicinaNaturistaConsumidaChecked.forEach( (value, index) => {
      this.formDto.medicinaNaturistaConsumida += this.lista60[index] + ',';
    })
  }

  private getCheckBoxs() {

    let riesgoParaMedicosArray = this.formDto.riesgoParaMedicos.split(',');
    let enfermedadesPadeceArray = this.formDto.enfermedadesPadece.split(',');
    let medicamentosPorEnfermedadArray = this.formDto.medicamentosPorEnfermedad.split(',');
    let escalaTensionFamiliarArray = this.formDto.escalaTensionFamiliar.split(',');
    let estadoSaludActualArray = this.formDto.estadoSaludActual.split(',');
    let medicamentosConsumidosArray = this.formDto.medicamentosConsumidos.split(',');
    let vitaminasConsumidasArray = this.formDto.vitaminasConsumidas.split(',');
    let medicinaNaturistaConsumidaArray = this.formDto.medicinaNaturistaConsumida.split(',');

    this.riesgoParaMedicosChecked = [];
    this.enfermedadesPadeceChecked = [];
    this.medicamentosPorEnfermedadChecked = [];
    this.escalaTensionFamiliarChecked = [];
    this.estadoSaludActualChecked = [];
    this.medicamentosConsumidosChecked = [];
    this.vitaminasConsumidasChecked = [];
    this.medicinaNaturistaConsumidaChecked = [];

    

    riesgoParaMedicosArray.forEach( (value, index) => {
      this.lista15.forEach( (value1, index1) => {
        if(value==value1){
          this.riesgoParaMedicosChecked[index1] = true;
        }
      })
    });

    enfermedadesPadeceArray.forEach( (value, index) => {
      this.lista18.forEach( (value1, index1) => {
        if(value==value1){
          this.enfermedadesPadeceChecked[index1] = true;
        }
      })
    });

    medicamentosPorEnfermedadArray.forEach( (value, index) => {
      this.lista20.forEach( (value1, index1) => {
        if(value==value1){
          this.medicamentosPorEnfermedadChecked[index1] = true;
        }
      })
    });

    escalaTensionFamiliarArray.forEach( (value, index) => {
      this.lista40.forEach( (value1, index1) => {
        if(value==value1){
          this.escalaTensionFamiliarChecked[index1] = true;
        }
      })
    });

    estadoSaludActualArray.forEach( (value, index) => {
      this.lista42.forEach( (value1, index1) => {
        if(value==value1){
          this.estadoSaludActualChecked[index1] = true;
        }
      })
    });

    medicamentosConsumidosArray.forEach( (value, index) => {
      this.lista55.forEach( (value1, index1) => {
        if(value==value1){
          this.medicamentosConsumidosChecked[index1] = true;
        }
      })
    });

    vitaminasConsumidasArray.forEach( (value, index) => {
      this.lista57.forEach( (value1, index1) => {
        if(value==value1){
          this.vitaminasConsumidasChecked[index1] = true;
        }
      })
    });

    medicinaNaturistaConsumidaArray.forEach( (value, index) => {
      this.lista60.forEach( (value1, index1) => {
        if(value==value1){
          this.medicinaNaturistaConsumidaChecked[index1] = true;
        }
      })
    });
    
  }

  openDialog(data: ResponseSaveDto): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newForm();
    });
  }

  cleanSearch() {
    this.matricula = '';
    this.historia = '';
  }

}
