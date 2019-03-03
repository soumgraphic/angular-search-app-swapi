import { Injectable } from '@angular/core';
import {Film} from '../model/film.model';
import { Observable, of, throwError } from 'rxjs'; // Import de rx pour consommer les données avec du multi threading
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {FilmDetails} from '../model/film-detail.model';
import {catchError, map, tap} from 'rxjs/operators'; // pour consommer le web service rest

@Injectable() // La classe MyServiceProvider est injectable partout
export class MyServiceProvider {
    constructor(private httpClient: HttpClient) {}

    resultFilmDetails: Array<FilmDetails> = Array<FilmDetails>();

    // Le type de la fonction devient un tableau de film observable
    rechercherFilms(titre: String): Observable<Array<Film>> {
        return new Observable(observer => { // Retour de la fonction type observable
            // Appel du web service de stars wars via le lien avec search concatener au titre chercher
            this.httpClient.get('https://swapi.co/api/films/?search=' + titre)
                .subscribe(
                    data => {
                        if (data && data['results']) { // vérification si des données existe dans data et dans le bloc results de json
                            observer.next(data['results']); // Récupération des données contenu dans le bloc results de json
                        } else {
                            observer.error('Aucun film trouvé'); // Si aucun film n'a été trouvé
                        }
                        observer.complete(); // Compléter l'observer
                    }
                );

            /*setTimeout(() => {
                const films: Array<Film> = Array<Film>();
                films.push({title: 'Stars Wars 4', director: 'George Lucas', episode_id: '4'});
                observer.next(films);
                observer.complete();
            }, 1000);*/
        });
        // version avant
        // Création d'une variable tableau sur un tableau de model film avec les attributs du film
        // const films: Array<Film> = Array<Film>();
        // films.push({title: 'Stars Wars 4', director: 'George Lucas', episode_id: '4'});
        // return films;
    }

    rechercherToutFilms(): Observable<Array<Film>> {
        return new Observable(observer => {
            // Récupération de tous les films en fonction des données définis dans Model Film (title, episode_id, director)
            this.httpClient.get('https://swapi.co/api/films/')
                .subscribe(
                    data => {
                        if (data && data['results']) {
                            observer.next(data['results']);
                        } else {
                            observer.error('Aucun film trouvé');
                        }
                        observer.complete();
                    }
                );

            /*setTimeout(() => {
                const films: Array<Film> = Array<Film>();
                films.push({title: 'Stars Wars 4', director: 'George Lucas', episode_id: '4'});
                films.push(new Film('Stars Wars 5', 'George Lucas', '5'));
                observer.next(films);
                observer.complete();
            }, 1000);*/
        });
        // const films: Array<Film> = Array<Film>();
        // Push à films pour donner des valeurs à notre model film
        // films.push({title: 'Stars Wars 4', director: 'George Lucas', episode_id: '4'});
        // films.push(new Film('Stars Wars 5', 'George Lucas', '5'));
        // return films;
    }

    getFilmDetails(filmId: string): Observable<FilmDetails> {
        const url = 'https://swapi.co/api/films/' + filmId;
        return this.httpClient.get<FilmDetails>(url).pipe(
            tap(_ => console.log(`fetched film details id=${filmId}`)),
            catchError(this.handleError<FilmDetails>(`getFilmDetails id=${filmId}`))
        );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}
