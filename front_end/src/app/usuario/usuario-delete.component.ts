import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../usuario-service.service';
import { IUsuario } from './usuario';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {
  usuario?: IUsuario;

  constructor(
    protected usuarioService: UsuarioService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  confirmDelete(id: number): void {
    this.usuarioService.delete(id).subscribe(() => {
      this.activeModal.close();
      location.reload();
    })
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
