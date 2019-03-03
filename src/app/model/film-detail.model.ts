import {FilmDetailsVehicles} from './film-detail-vehicle.model';

export class FilmDetails {
    public title: String;
    public episode_id: String;
    public opening_crawl: String;
    public director: String;
    public producer: String;
    public release_date: Date;
    public created: Date;
    public edited: String;
    public planets: Array<String>;
    /*
     A ce niveau les deux versions de vehicles marche, si vehicules avait des choses nommer
     à l'intérieur dans le json retourner on allait ajouter ses attributs nommer dans le modèle de vehicle pour pouvoir les récupérer
     ou sinon on fait comme pour la planete pour être simple.
    */
    public vehicles: Array<FilmDetailsVehicles>;
    // public vehicles: Array<String>;

    constructor(title: String, episode_id: String, opening_crawl: String, director: String, producer: String, release_date: Date, created: Date, edited: String, planets: Array<String>, vehicles: Array<FilmDetailsVehicles>) {
        this.title = title;
        this.episode_id = episode_id;
        this.opening_crawl = opening_crawl;
        this.director = director;
        this.producer = producer;
        this.release_date = release_date;
        this.created = created;
        this.edited = edited;
        this.planets = planets;
        this.vehicles = vehicles;
    }
}
