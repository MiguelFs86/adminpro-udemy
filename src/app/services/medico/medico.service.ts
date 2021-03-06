import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import swal from 'sweetalert';

@Injectable({
    providedIn: 'root'
})
export class MedicoService {
    
    constructor(public http: HttpClient, 
                public _usuarioService: UsuarioService) { }

    totalMedicos: number = 0;

    cargarMedicos(){
        const url = URL_SERVICIOS + '/medico';
        return this.http.get(url)
            .pipe(map((resp:any) => {
                this.totalMedicos = resp.total;
                return resp.medicos;
            }));
    }

    buscarMedico( termino: string){
        const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
        return this.http.get(url)
            .pipe(map((resp:any) => {
                return resp.medicos;
            }));
    }

    borrarMedico(id: string){
        let url = URL_SERVICIOS + '/medico/' + id;
        url += '?token=' + this._usuarioService.token;
        return this.http.delete(url)
            .pipe(map((resp:any) => {
                swal('Medico borrado', 'Medico eliminado correctamente', 'success');
                return resp;
            }));
    }

    guardarMedico(medico: Medico){
        let url = URL_SERVICIOS + '/medico';
        if (medico._id){
            /* update */
            url += '/' + medico._id;
            url += '?token=' + this._usuarioService.token;
            return this.http.put(url, medico)
            .pipe(map((resp: any) => {
                swal('Medico actualizado', medico.nombre, 'success');
                return resp.medico;
            }));
        } else {
            /* create */
            url += '?token=' + this._usuarioService.token;
            return this.http.post(url, medico)
            .pipe(map((resp: any) => {
                swal('Medico creado', medico.nombre, 'success');
                return resp.medico;
            }));
        }

    }

    cargarMedico( id: string){
        const url = URL_SERVICIOS + '/medico/' + id;
        return this.http.get(url)
            .pipe(map((resp:any)=> resp.medico));
    }
}
