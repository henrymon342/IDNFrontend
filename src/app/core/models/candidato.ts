export class Candidato {
  id: number;
  nombre: string;
  congregacion: string;
  ministerio: string;
  cargo: string;
  habilitado: boolean;
  selected?: boolean = false;
}
