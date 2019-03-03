import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MyServiceProvider} from '../my-service/my-service.provider';
import {FilmDetails} from '../model/film-detail.model'; // Pour récupérer la route (le lien sur lequel je me trouve )

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public episode_id: String = '';
  public filmsDetails: FilmDetails;
  public erreur: String = '';
  public loading: Boolean = false; // Variable pour la gestion du chargement par défaut à false
  constructor(private route: ActivatedRoute, private myServiceProvider: MyServiceProvider) { } // Ajout de route dans mon constructeur

  ngOnInit() {
    // Recupération de la route courante et de ses paramètres pour pouvoir l'afficher dans la page details
      this.route.params.subscribe(
          // params id pour récupérer l'id passer en paramètre dans l'url, ce id correcpond à l'id mis devant details dans le bloc
          // route de app.module.ts
          params => this.episode_id = params['id']
      );
      this.getFilmDetails(this.route.snapshot.params['id']);
  }

  getFilmDetails(idFilm) {
      this.erreur = '';
      this.loading = true;
      this.myServiceProvider.getFilmDetails(idFilm).subscribe(
          data => {
            this.filmsDetails = data;
            console.log(this.filmsDetails);
            this.loading = false;
          });
  }

}
