export interface Pastor {
  id?: number;
  name: string;
  direccion: string;
  celular: string;
  correo: string;
  fecha_nac: string;
  lugar_nac: string;
  estado_civil: string;

  nombre_esposa: string;
  fecha_nac_esposa: string;
  lugar_nac_esposa: string;
  category: string;

  area: string;
  year: string;
  dado_en: string;

  membresia: string;
  lugardeministerio: string;

  titulos?: string;
  requisitos?: string;
  data_family?: string;
  educacion?: string;
}
