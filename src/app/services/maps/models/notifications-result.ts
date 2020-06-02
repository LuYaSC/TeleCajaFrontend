export class NotificationsResult {
    id: number;
    nivel: string;
    numeroContacto: string;
    ci: string;
    fechaHoraRegistro: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}