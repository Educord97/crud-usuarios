import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario-service.service';
import { IUsuario, Usuario } from './usuario';

import * as moment from 'moment';

@Component({
  selector: 'app-usuarios-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {
  usuarios: IUsuario[] = [];
  id?: number;
  usuario: Usuario = new Usuario();

  editForm = this.fb.group({
    idCadUsuario: [],
    dcrUsuario: [null, Validators.required],
    dcrLogin: [null, Validators.required],
    dcrSenha: [null, Validators.required],
    datCadastro: [null, Validators.required],
    datDesativacao: []
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected usuarioService: UsuarioService,
    protected router: Router,
    protected route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.usuarioService.listById(this.id!).subscribe(res => {
      this.usuario = res;
      this.populateFieldForms(this.usuario);
    });
  }

  populateFieldForms(usuario: IUsuario): void {
    this.editForm.controls['idCadUsuario'].setValue(usuario.idCadUsuario);
    this.editForm.controls['dcrUsuario'].setValue(usuario.dcrUsuario);
    this.editForm.controls['dcrLogin'].setValue(usuario.dcrLogin);
    this.editForm.controls['dcrSenha'].setValue(usuario.dcrSenha);
    this.editForm.controls['datCadastro'].setValue(usuario.datCadastro);
    this.editForm.controls['datDesativacao'].setValue(usuario.datDesativacao);
  }
  
  save(): void {
    const usuario = this.createForm();
    this.usuarioService.save(usuario).subscribe(() => {
      this.router.navigate([''])
    })
  }

  update(){
    this.usuarioService.update(this.id!, this.usuario).subscribe( () =>{
      this.router.navigate(['']);
    });
  }

  submitFormSaveOrUpdate(): void {
    const usuario = this.createForm();
    if(usuario.idCadUsuario !== null) {
      this.update();
    } else {
      this.save();
    }
  }

  createForm(): IUsuario {
    const DATE_TIME_FORMAT = 'DD-MM-YYYY';
    return {
      ...new Usuario(),
      idCadUsuario: this.editForm.get(['idCadUsuario'])!.value,
      dcrUsuario: this.editForm.get(['dcrUsuario'])!.value,
      dcrLogin: this.editForm.get(['dcrLogin'])!.value,
      dcrSenha: this.editForm.get(['dcrSenha'])!.value,
      datCadastro: this.editForm.get(['datCadastro'])!.value ? moment(this.editForm.get(['datCadastro'])!.value, DATE_TIME_FORMAT) : undefined,
      datDesativacao: this.editForm.get(['datDesativacao'])!.value ? moment(this.editForm.get(['datDesativacao'])!.value, DATE_TIME_FORMAT) : undefined
    }
  }

  updateForm(usuario: IUsuario): void {
    this.editForm.patchValue({
      idCadUsuario: usuario.idCadUsuario,
      dcrUsuario: usuario.dcrUsuario,
      dcrLogin: usuario.dcrLogin,
      dcrSenha: usuario.dcrSenha,
      datCadastro: usuario.datCadastro,
      datDesativacao: usuario.datDesativacao
    })
  }

  cancel(): void {
    window.history.back();
  }
}
