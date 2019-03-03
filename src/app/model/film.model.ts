// Création du model de l'objet FILM avec les titres comme dans les données JSON retourner
export class Film {
    public title: String;
    public episode_id: String;
    public director: String;

     constructor(title: String, episode_id: String, director: String) {
        this.title = title;
        this.episode_id = episode_id;
        this.director = director;
    }
}
