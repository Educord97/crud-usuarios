import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../usuario-service.service';
import { IUsuario } from './usuario';
import { UsuarioDeleteComponent } from './usuario-delete.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: IUsuario[] = [];

  constructor(
    protected usuarioService: UsuarioService,
    protected modalService: NgbModal,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(): void {
    this.usuarioService.list().subscribe(res => {
      this.usuarios = res
    })
  }

  editUser(id?: number) {
    this.router.navigate(['usuario/update', id])
  }

  delete(usuario: IUsuario): void {
    const modal = this.modalService.open(UsuarioDeleteComponent, { size: 'lg', backdrop: 'static' });
    modal.componentInstance.usuario = usuario;
  }
}
