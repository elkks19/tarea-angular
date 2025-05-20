import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  images: any[] = [];
  isLoading: boolean = true;
  selectedImage: any = null;
  error: string | null = null;

  // Configuración de la galería
  itemsPerPage: number = 10;
  currentPage: number = 1;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.loadImages(); // Llama a la carga de imágenes al iniciar el componente
  }

  loadImages(): void {
    this.isLoading = true;
    this.error = null;

    this.imageService.getImages(this.itemsPerPage).subscribe({
      next: (data) => {
        this.images = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Ocurrió un error al cargar las imágenes.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
  showImageDetails(id:string):void{
    this.imageService.getImageDetails(id).subscribe({
      next: (details) => {
        this.selectedImage = details;
      },
      error: (err) => {
        this.error = 'Ocurrió un error al cargar los detalles de la imagen.';
        console.error(err);
      }
   });
  }
}