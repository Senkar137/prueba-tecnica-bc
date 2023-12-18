import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerRegistrationGuard } from './core/guards/trainer-registration.guard';
import { TeamGuard } from './core/guards/team.guard';

const routes: Routes = [
  {
    path: 'configuration',
    loadChildren: () =>
      import('./modules/trainer-settings/trainer-settings.module').then(
        m => m.TrainerSettingsModule
      ),
  },
  {
    path: 'team-formation',
    canActivate: [TrainerRegistrationGuard],
    loadChildren: () =>
      import('./modules/trainer-formation/trainer-formation.module').then(
        m => m.TrainerFormationModule
      ),
  },
  {
    path: 'trainer-profile',
    canActivate: [TeamGuard],
    loadChildren: () =>
      import('./modules/trainer-profile/trainer-profile.module').then(
        m => m.TrainerProfileModule
      ),
  },
  { path: '', redirectTo: '/configuration', pathMatch: 'full' },
  { path: '**', redirectTo: '/configuration' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
