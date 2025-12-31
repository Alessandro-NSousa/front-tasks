import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { UserEditComponent } from './features/users/user-edit/user-edit.component';
import { UserNewComponent } from './features/users/user-new/user-new.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TarefaEditComponent } from './features/tarefas/tarefa-edit/tarefa-edit.component';
import { TarefaNewComponent } from './features/tarefas/tarefa-new/tarefa-new.component';
import { TarefaListComponent } from './features/tarefas/tarefa-list/tarefa-list.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: RegistroComponent,
    },
    {
        path: 'user/edit',
        component: UserEditComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'user/new',
        component: UserNewComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'tarefa/list',
        component: TarefaListComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'tarefa/new',
        component: TarefaNewComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'tarefa/edit/:id',
        component: TarefaEditComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'user/list',
        component: UserListComponent,
        canActivate: [AuthGuardService]
    }
    
];
