import {Component} from '@angular/core'; // Importation de component dans angular core
import {MyServiceProvider} from '../my-service/my-service.provider';
import {Film} from '../model/film.model';
import {forEach} from '@angular/router/src/utils/collection'; // Importation service provider

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {
    public films: Array<Object> = new Array<Object>(); // Création d'un tableau d'objet film
    public recherche: String = ''; // Variable chaine de caractère de la donnée insérée
    public erreur: String = ''; // Variable gestion de l'affichage d'erreur dans le formulaire
    public loading: Boolean = false; // Variable pour la gestion du chargement par défaut à false
    public filmNotFound: Boolean = false;

    constructor(private myServiceProvider: MyServiceProvider) { } // Mise à disposition dans le constructeur par défaut de serviceProvider

    rechercherFilm() {
        this.erreur = '';
        this.loading = true; // Mise à jour de l'etat de la variable à true pour dire que la recherche a commencer
        // Test du contenu du formulaire s'il n'est pas vide et s'il est supérieur à 2 caractères.
        if (this.recherche.trim() !== '' && this.recherche.trim().length > 2) {
            // Version ancienne
            // this.films = this.myServiceProvider.rechercherFilms(this.recherche)
            this.myServiceProvider.rechercherFilms(this.recherche)
                .subscribe(value => this.films = value, // Récupération de la liste des valeurs envoyés par l'observable
                    error => this.erreur = error, // Affichage de l'erreur en cas d'erreur trouvé
                    () => this.loading = false,
                ); // Une fois le retour de la donnée on change l'état de loading à false
            if (this.films.length === 0) {
                this.filmNotFound = true;
            }

        } else {
            this.erreur = 'veuillez entrer au moins deux caractères !';
        }
    }

    toutRechercher() {
        // Ancienne version
        // this.films = this.myServiceProvider.rechercherToutFilms(); // Accès à tous les films à travers le provider
        this.loading = true;
        this.erreur = '';
        this.myServiceProvider.rechercherToutFilms()
            .subscribe(value => this.films = value,
                error => this.erreur = error,
                () => this.loading = false);
    }

}

