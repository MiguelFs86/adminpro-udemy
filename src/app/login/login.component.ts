import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    recuerdame: boolean = false;
    email: string;

    auth2: any;
	
    constructor(private router:Router,
                public _usuarioService: UsuarioService) { }
	
	ngOnInit() {
        init_plugins();
        this.googleInit();
        
        this.email = localStorage.getItem('email') || '';
        if (this.email.length > 1){
            this.recuerdame = true;
        }
    }
    
    googleInit(){
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '221590224106-b004oj5aohof75hi125ar5nlbtlml4gu.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });
            this.attachSignin( document.getElementById('btnGoogle'));
        });
    }

    attachSignin( element ){
        this.auth2.attachClickHandler( element, {}, googleUser => {
            // const profile = googleUser.getBasicProfile();
            const token = googleUser.getAuthResponse().id_token;
            this._usuarioService.loginGoogle(token)
                .subscribe( correcto => {
                    // this.router.navigate(['/dashboard']);
                    window.location.href = '#/dashboard';
                });
        });
    }

	ingresar(forma: NgForm){
        if (forma.invalid){
            return;
        }

        const usuario = new Usuario(null, forma.value.email, forma.value.password);

        this._usuarioService.login(usuario, forma.value.recuerdame)
            .subscribe( correcto => {
            this.router.navigate(['/dashboard']);
        });
	}
	
}
