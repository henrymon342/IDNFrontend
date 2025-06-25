export interface Usuario {
  id: number;
  name: string;
  lastname: string;
  username: string;
  password: string;
  admin: boolean;
  cargo: string;
  ministerio: string;
  miembroen: string;
  type: string;
  createdAt: string; // puedes usar Date si conviertes el string
  updatedAt: string;
}
