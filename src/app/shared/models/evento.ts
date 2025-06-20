export interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  ministerio: string;
  modalidad: string;
  optionplace: string;
  place: string;
  encargado: string;
  tipofecha: string;
  fechasingle: string;
  fechaini: string; // ISO 8601 string
  fechafin: string; // ISO 8601 string
  horaini: string;  // ISO 8601 string or empty string
  horafin: string;  // ISO 8601 string or empty string
  tieneimagen: string; // could be string or boolean depending on backend (e.g. "0" or "1")
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
}
