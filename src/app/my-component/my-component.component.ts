import {Component} from '@angular/core'; // Importation de component dans angular core

@Component({
    selector: 'app-my-component', // Creation du selecteur pour pouvoir appeler le composant dans une page html
    templateUrl: './my-component.component.html', // Lien vers la page html du composant
    styleUrls: ['./my-component.component.css'] // Css du composant
})

export class MyComponentComponent { // Par convention le nom de la classe composant est suivie par Component
    constructor() {
    }

    public display: Boolean = false; // Création d''un boolean pour conditionner l''affichage de mon texte dans l''html de mon composant
    public list: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G']; // Création d'une liste prédéfinis

    afficher() {
        this.display = !this.display; // Pour acceder à la variable display via this
    }
}

