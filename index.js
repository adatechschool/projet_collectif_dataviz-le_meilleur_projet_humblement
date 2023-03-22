
//récupération de l'urm
const urlTournages = "https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&rows=10000&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=nom_producteur&facet=ardt_lieu&facet=date_debut&facet=date_fin";
let reponseTournages = await fetch(urlTournages) //stockage du fichier brut dans une variable reponse
let jsonObjectTournage= await reponseTournages.json() // conversion de reponse au format Json

let elementsTournages = jsonObjectTournage.records //stockage du tableau records dans une variable elementsTournages

// console.log(elementsTournages)


let tailleTableau= elementsTournages.length // stockage de la taille du tableau dans une variable utilisée pour définir la taille de la boucle
for (let i=0; i<tailleTableau;i++){
    let elementTypeTournage= elementsTournages[i]
    console.log(elementTypeTournage.fields.type_tournage) // récupération de la valeur de la clé type de tournage, stockée dans la clé field
}

