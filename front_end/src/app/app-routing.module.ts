import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioUpdateComponent } from './usuario/usuario-update.component';

const routes: Routes = [
  { path: '', component: UsuarioComponent},
  { path: "usuario/update/:id", component: UsuarioUpdateComponent },
  { path: 'new', component: UsuarioUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
