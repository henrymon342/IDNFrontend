import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'  // Servicio disponible en toda la app automáticamente
})
export class ToastService {

  constructor(private toastr: ToastrService) {}

  success(text: string): void {
    this.toastr.success(text, "Success");
  }

  info(text: string): void {
    this.toastr.info(text, "Info");
  }

  warning(text: string): void {
    this.toastr.warning(text, "Warning");
  }

  error(text: string): void {
    this.toastr.error(text, "Error");
  }
}
