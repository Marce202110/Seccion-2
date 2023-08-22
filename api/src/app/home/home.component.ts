import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

export interface IDogs {
  raza: string;
  cantidad: number;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  razaCantidad: IDogs[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData().subscribe((data) => {
      if (data && data.message) {
        this.getDogImages(data.message);
      }
    });
  }

  getDogImages(data: any) {
    this.apiService.dogsImages().subscribe({
      next: (resp) => {
        if (resp && resp.message && resp.message.length) {
          this.calcularCantidadPorRaza(data, resp.message);
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  calcularCantidadPorRaza(data: any, images: any[]) {
    this.razaCantidad = [];

    const arryDogs = Object.keys(data);
    arryDogs.map((dog, index) => {
      this.razaCantidad.push({
        raza: dog,
        cantidad: Math.floor(Math.random() * 10),
        url: images[index > 49 ? Math.floor(Math.random() * 49) : index],
      });
    });
  }

  getrouterLink(raza: string, url: string) {
    return ['/home/form', raza, url];
  }

  lista() {}
}
