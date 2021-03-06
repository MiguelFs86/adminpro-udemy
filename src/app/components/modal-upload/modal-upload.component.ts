import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
import swal from 'sweetalert';

@Component({
    selector: 'app-modal-upload',
    templateUrl: './modal-upload.component.html',
    styles: []
})
export class ModalUploadComponent implements OnInit {
    
    imagenSubir: File;
    imagenTemp: string;
    
    constructor(public _subirArhivoService: SubirArchivoService,
                public _modalUploadService: ModalUploadService) {}
    
    ngOnInit() {
    }

    seleccionImagen(archivo: File){
        if (!archivo){
            this.imagenSubir = null;
            return;
        }
        
        if (archivo.type.indexOf('image') < 0){
            swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
            this.imagenSubir = null;
            return;
        }

        this.imagenSubir = archivo;

        const reader = new FileReader();
        const urlImagenTemp = reader.readAsDataURL(archivo);
        reader.onloadend = () => {
            this.imagenTemp = String(reader.result);
        };
    }

    subirImagen(){
        this._subirArhivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
            .then( resp => {
                this._modalUploadService.notificacion.emit( resp );
                this.cerrarModal();
            })  
            .catch( err => {
                console.log('Error cargando imagen.');
            });
    }

    cerrarModal(){
        this.imagenTemp = null;
        this.imagenSubir = null;

        this._modalUploadService.ocultarModal();
    }
    
}
