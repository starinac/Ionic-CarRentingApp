import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './pages/register/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule'},
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule', canLoad:[AuthGuard]  },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule', canLoad:[AuthGuard]  },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule', canLoad:[AuthGuard]  },
  { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule', canLoad:[AuthGuard]  },
  { path: 'rent', loadChildren: './components/rent/rent.module#RentPageModule', canLoad:[AuthGuard]  },
  { path: 'sell', loadChildren: './pages/sell/sell.module#SellPageModule', canLoad:[AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
