
//récupération de l'url
const urlTournages = "https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&rows=10000&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=nom_producteur&facet=ardt_lieu&facet=date_debut&facet=date_fin";
//stockage du fichier brut dans une variable reponse
let reponseTournages = await fetch(urlTournages) 
// conversion de reponse au format Json
let jsonObjectTournage= await reponseTournages.json()
//stockage du tableau records dans une variable elementsTournages
let elementsTournages = jsonObjectTournage.records 


//affichage titre page HTML, à enlever
const titreListeTypeTournage = document.getElementById("titre") 
titreListeTypeTournage.innerText = "Les tournages à Paris"
 

//variable  = longueur du tableau général
let tailleTableau = elementsTournages.length


///////   COMPTEUR DU NOMBRE TOTAL DE TOURNAGE PAR ANNÉE
let compteTournagesAnnee = {}

for (let i=0; i < elementsTournages.length; i++){
  let annee = elementsTournages[i].fields.annee_tournage
  //console.log(annee)
  if (annee in compteTournagesAnnee != true){
    compteTournagesAnnee[annee]=1
  }
  else {
    compteTournagesAnnee[annee]+=1
  }
}

///////   COMPTEUR DU NOMBRE TOTAL DE TOURNAGE PAR ANNÉE
///////   TOUT ARRONDISSEMENT CONFONDU
let compteTournagesArrondissement = {}

for (let i=0; i < elementsTournages.length; i++){
  let annee = elementsTournages[i].fields.annee_tournage
  //console.log(annee)
  if (annee in compteTournagesArrondissement != true){
    compteTournagesArrondissement[annee]=1
  }
  else {
    compteTournagesArrondissement[annee]+=1
  }
}


///// GRAPHIQUE : nombre de tournage par année + tout arrondissement
const mixedChart = new Chart(document.getElementById('consolidations'), {
  type: 'bar',
  data: {
    datasets: [
      {
        label: "bar : Nombre tournage par an",
        data : Object.values(compteTournagesAnnee),
        order : 2
      }, {
        label : "line : Nombre tournage par an pour l'arrondissement ",
        data : Object.values(compteTournagesArrondissement),
        type: "line",
        order: 1
      }
    ],
    labels: Object.keys(compteTournagesAnnee),
  },
}
);


// COMPTEUR DU NB DE TOURNAGE PAR ANNÉE POUR L'ARRONDISSEMENT CHOISI
let filtreArr
let tournagesFiltreArrondissement

const boutonArr = document.getElementById("boutonArr")
boutonArr.addEventListener("click",function(){
  filtreArr = document.getElementById("arrondissementSelect").value  
  //tableau filtré par un arrondissemnt 
  tournagesFiltreArrondissement = elementsTournages.filter (item => {
      return item.fields.ardt_lieu == filtreArr

    });
// après filtre : elementsTournagesFiltre = { "les tournages détaillés du 11ème" }

compteTournagesArrondissement = {}

for (let i=0; i < tournagesFiltreArrondissement.length; i++){
  let annee = tournagesFiltreArrondissement[i].fields.annee_tournage
  //console.log(annee)
  if (annee in compteTournagesArrondissement != true){
    compteTournagesArrondissement[annee]=1
  }
  else {
    compteTournagesArrondissement[annee]+=1
  }
}}
)




// BOUTON CHOIX ARRONDISSEMENT

/*
let filtreArr

const boutonArr = document.getElementById("boutonArr")
boutonArr.addEventListener("click",function(){
  filtreArr = document.getElementById("arrondissementSelect").value  
  //tableau filtré par un arrondissemnt 
   elementsTournagesFiltre = elementsTournages.filter (item => {
      return item.fields.ardt_lieu == filtreArr

    });
    // après filtre : elementsTournagesFiltre = { "les tournages détaillés du 11ème" }


  //  compteTournagesArrondissement = {}

for (let i=0; i < elementsTournagesFiltre.length; i++){
  let annee = elementsTournagesFiltre[i].fields.annee_tournage
  //console.log(annee)
  if (annee in compteTournagesArrondissement != true){
    compteTournagesArrondissement[annee]=1
  }
  else {
    compteTournagesArrondissement[annee]+=1
  }
}
// après boucle : compteTournages = {2019:1, 2020:2, 2021:5, ...} 
  


//graphe tournages par années dans un arrondissment choisi
new Chart(
  document.getElementById('consolidations'),
  {
    type: 'line',
    data: {
      labels: Object.keys(compteTournages),
      datasets: [
        {
          data : Object.values(compteTournages),
        }
      ]
    },
    options: {
      title : { 
        display: true, 
        text: "Nombre de tournage par année dans le " + filtreArr,
    } }
  }
);
})
*/

// FIN BOUTON CHOIX ARRONDISSEMENT



// récuperation de la valeur dans le filtre déroulant, dans le html

//console.log(elementsTournagesFiltre)

/*
//compte des tournages par année
let compteTournages= {}


for (let i=0;i<tailleTableau;i++){
  let annee=elementsTournagesFiltre[i].fields.annee_tournage
  //console.log(annee)
  if (annee in compteTournages!=true){
    compteTournages[annee]=1
  }
  else {
    compteTournages[annee]+=1
  }
}
//console.log(compteTournages)
*/

/*
//graphe tournages par années
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

*/



// compte des arrondissement par tournages 
let compteTournagesArr={}
for (let i=0;i<tailleTableau;i++){
  let arrondissement=elementsTournages[i].fields.ardt_lieu
  console.log(arrondissement)
  if (arrondissement in compteTournagesArr!=1){
    compteTournagesArr[arrondissement]=1
  }
  else {compteTournagesArr[arrondissement]+=1
  }
}
console.log(compteTournagesArr)

//graphe tournages par arrondissements 
new Chart(
  document.getElementById('consolidationsArr'),
  {
    type: 'bar',
    data: {
      labels: Object.keys(compteTournagesArr),
      datasets: [
        {
          label: 'Nombre de lieux de tournage par arrondissement',
          data: Object.values(compteTournagesArr),
        }
      ]
    }
  }
);


// const filtreArr = document.getElementById("arrondissementSelect")
// console.log(filtreArr.value)
// let test= compteTournagesArr.filter(function(arr){
//   return arr.filterArr.value
// })


// function filtre(arr){
// 	const lessThan10Filter = arr => arr.filter(item => item < 10);
// 	return lessThan10Filter
// }




// console.log(test)

// autre manière de créer un filtre :
//const elementsTournagesFiltre = elementsTournages.filter(tournage => tournage.fields.ardt_lieu == filtreArr); 



//affichage type de tournages (tests initiaux)
// console.log(tailleTableau) // stockage de la taille du tableau dans une variable utilisée pour définir la taille de la boucle
// for (let i=0; i < tailleTableau; i++){
//     // console.log('boucle n°'+i)
//     let elementsParTournages = elementsTournages[i]
//     let typeTournage = elementsParTournages.fields.type_tournage
//     console.log(typeTournage) // récupération de la valeur de la clé type de tournage, stockée dans la clé field
    
//     const listeTypeTournage = document.createElement('p');
//     listeTypeTournage.innerText = typeTournage
//     titreListeTypeTournage.appendChild(listeTypeTournage)
// }
