export class ColumnDataCsv {
  nombre: boolean;
  congregacion: boolean;
  ministerio: boolean;
  cargo: boolean;
  codigo: boolean;

  constructor(data?: Partial<ColumnDataCsv>) {
    // Inicializamos con false por defecto o con el valor que venga en 'data'
    this.nombre = data?.nombre ?? false;
    this.congregacion = data?.congregacion ?? false;
    this.ministerio = data?.ministerio ?? false;
    this.cargo = data?.cargo ?? false;
    this.codigo = data?.codigo ?? false;
  }
}
