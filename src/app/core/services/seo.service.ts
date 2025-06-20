import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta) { }

  generateTags( config: any ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    config = {
      title: "IDN La Paz",
      description: "Iglesia del Nazareno Distrito La Paz",
      image: "",
      slug: "",
      ...config
    }

  }
}
