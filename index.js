
//récupération de l'urm
const urlTournages = "https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&rows=10000&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=nom_producteur&facet=ardt_lieu&facet=date_debut&facet=date_fin";
let reponseTournages = await fetch(urlTournages) //stockage du fichier brut dans une variable reponse
let jsonObjectTournage= await reponseTournages.json() // conversion de reponse au format Json

let elementsTournages = jsonObjectTournage.records //stockage du tableau records dans une variable elementsTournages

console.log(elementsTournages)

const titreListeTypeTournage = document.getElementById("titre")
titreListeTypeTournage.innerText = "Voici la liste des type de tournage :"

let tailleTableau = 100
console.log(tailleTableau) // stockage de la taille du tableau dans une variable utilisée pour définir la taille de la boucle
for (let i=0; i < tailleTableau; i++){
    // console.log('boucle n°'+i)
    let elementsParTournages = elementsTournages[i]
    let typeTournage = elementsParTournages.fields.type_tournage
    console.log(typeTournage) // récupération de la valeur de la clé type de tournage, stockée dans la clé field
    
    const listeTypeTournage = document.createElement('p');
    listeTypeTournage.innerText = typeTournage
    titreListeTypeTournage.appendChild(listeTypeTournage)
}


let compteTournages= {
    '2016':0,
    '2017':0,
    '2018':0,
    '2019':0,
    '2020':0,
    '2021':0,
}

console.log(compteTournages)

for (let i=0;i<tailleTableau;i++){
    let annee=elementsTournages[i].fields.annee_tournage
    console.log(annee)
    compteTournages[annee]+=1
    compteTournages[annee]=compteTournages[annee]+1
}
console.log(compteTournages)

new Chart(
          document.getElementById('consolidations'),
          {
            type: 'bar',
            data: {
              labels: Object.keys(compteTournages),
              datasets: [
                {
                  label: 'Nombre de lieux de tournage par année',
                  data: Object.values(compteTournages),
                }
              ]
            }
          }
        );


