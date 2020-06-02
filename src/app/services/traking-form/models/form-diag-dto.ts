export class FormDiagDto {
    numeroHistoria: string; //25
    matricula: string; // 20
    documento: number;
    tipoDocumento: string; // 15
    extension: string; //3
    complemento: string; //2
    nombre: string; //40
    apellidoPaterno: string; //30
    apellidoMaterno: string; //30
    ocupacion: string; //25
    areaLaboral: string; //35
    direccion: string; //100
    email: string; //40
    fechaNacimiento: string;
    genero: string; //1 (F, M, O)
    telefono: number;
    celular: string; // 8
    riesgoParaMedicos: string; //300
    fechaTomaMuestra: string;
    estaInternado: string; //2
    enfermedadesPadece: string; //350
    medicamentosPorEnfermedad: string; //300
    estaEmbarazada: string; //2
    fechaUltimaMenstruacion: string; 
    peso: number;
    talla: number;
    indiceMasaCorporal: number;
    disponeDomicilio: string; //2
    disponePersonaAyudaCama: string;//2
    disponePersonaAyudaHablar: string;//2
    disponeAyudaComida: string;//2
    disponeAyudaLimpieza: string;//2
    fuma: string;//2
    cigarrillosAlDia: string;//30
    haceCuantoNoFuma: string;//30
    bebidasAlcoholicas: string;//2
    cantidadConsumoBebidas: string; //50
    estupefacientes: string;//2
    sedentarismo: string;//40
    carenciaEconomica: string;//2
    tensionFamiliar: string;//2
    escalaTensionFamiliar: string;//100
    comentariosTensionFamiliar: string; //100
    estadoSaludActual: string; //20
    rangoEstadoSalud: number;
    tos: string;//2
    dolorGarganta: string;//2
    dolorCabeza: string;//2
    fiebre: string;//2
    temperatura: string;//30
    pulso: string;//30
    dificultadRespirar: string;//2
    frecuenciaRespiratoria: string;//30
    dificultadTerminarFrases: string;//2
    medicamentosConsumidos: string;//300
    vitaminasConsumidas: string;//200
    usoMedicinaNaturista: string;//2
    medicinaNaturistaConsumida: string;//50
    deseaRecibirSuero: string;//2
    deseaDonarSangre: string;//2
    medicoAsignado: string; //50
    tipoSangre: string;//5
    perdioPeso: string;//1

    constructor() {
        this.numeroHistoria = ''; //25
        this.matricula = ''; // 20
        this.documento = null;
        this.tipoDocumento = ''; // 15
        this.extension = ''; //3
        this.complemento = ''; //2
        this.nombre = ''; //40
        this.apellidoPaterno = ''; //30
        this.apellidoMaterno = ''; //30
        this.ocupacion = ''; //25
        this.areaLaboral = ''; //35
        this.direccion = ''; //100
        this.email = ''; //40
        this.fechaNacimiento = '';
        this.genero = ''; //1 (F, M, O)
        this.telefono = 0;
        this.celular = ''; // 8
        this.riesgoParaMedicos = ''; //300
        this.fechaTomaMuestra = '';
        this.estaInternado = ''; //2
        this.enfermedadesPadece = ''; //350
        this.medicamentosPorEnfermedad = ''; //300
        this.estaEmbarazada = ''; //2
        this.fechaUltimaMenstruacion = ''; 
        this.peso = 0;
        this.talla = 0;
        this.indiceMasaCorporal = 0;
        this.disponeDomicilio = ''; //2
        this.disponePersonaAyudaCama = '';//2
        this.disponePersonaAyudaHablar = '';//2
        this.disponeAyudaComida = '';//2
        this.disponeAyudaLimpieza = '';//2
        this.fuma = '';//2
        this.cigarrillosAlDia = '';//30
        this.haceCuantoNoFuma = '';//30
        this.bebidasAlcoholicas = '';//2
        this.cantidadConsumoBebidas = ''; //50
        this.estupefacientes = '';//2
        this.sedentarismo = '';//40
        this.carenciaEconomica = '';//2
        this.tensionFamiliar = '';//2
        this.escalaTensionFamiliar = '';//100
        this.comentariosTensionFamiliar = ''; //100
        this.estadoSaludActual = ''; //20
        this.rangoEstadoSalud = 0;
        this.tos = '';//2
        this.dolorGarganta = '';//2
        this.dolorCabeza = '';//2
        this.fiebre = '';//2
        this.temperatura = '';//30
        this.pulso = '';//30
        this.dificultadRespirar = '';//2
        this.frecuenciaRespiratoria = '';//30
        this.dificultadTerminarFrases = '';//2
        this.medicamentosConsumidos = '';//300
        this.vitaminasConsumidas = '';//200
        this.usoMedicinaNaturista = '';//2
        this.medicinaNaturistaConsumida = '';//50
        this.deseaRecibirSuero = '';//2
        this.deseaDonarSangre = '';//2
        this.medicoAsignado = ''; //50
    }
}