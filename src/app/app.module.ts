import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'; // Import de FormsModule pour pouvoir utiliser ngModel
import { HttpClientModule } from '@angular/common/http'; // pour l'interrogation des web services rest
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {MyComponentComponent} from './my-component/my-component.component';
import {SearchComponent} from './search/search.component'; // Ajout du sous composant dans le module
import {MyServiceProvider} from './my-service/my-service.provider'; // Appel de mon service provider
import { DetailsComponent } from './details/details.component';

// Création et gestion des routes et des url dans l'application avec le tableau routes
const routes: Routes = [
    {path: 'recherche', component: SearchComponent}, // Liaison path recherche au composant search
    // Pour passer plusieurs paramètres à details je peux mettre autant de fois les param comme suite /:id/:nom etc.
    {path: 'details/:id', component: DetailsComponent}, // Liaison path details au composant details
    {path: '', redirectTo: '/recherche', pathMatch: 'full'} // Path vide redirection vers la page de recherche
    ];

@NgModule({
  declarations: [
    AppComponent,
      MyComponentComponent, // Ajout du nom du composant dans les declarations.
      SearchComponent, DetailsComponent
  ],
  imports: [
    BrowserModule,
      FormsModule, // Ajout de l'import FormsModule dans les imports
      HttpClientModule,  // Ajout de l'import HttpClientModule dans les imports
      RouterModule.forRoot(routes) // Pour le routage entre plusieurs pages et la gestion des urls de l'application avec le tableau routes
  ],
  providers: [MyServiceProvider], // Ajout de mon service provider à provider
  bootstrap: [AppComponent]
})
export class AppModule { }
