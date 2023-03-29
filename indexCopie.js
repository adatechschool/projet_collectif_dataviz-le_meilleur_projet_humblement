
//récupération de l'url
const urlTournages = "https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&rows=10000&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=nom_producteur&facet=ardt_lieu&facet=date_debut&facet=date_fin";
//stockage du fichier brut dans une variable reponse
let reponseTournages = await fetch(urlTournages) 
// conversion de reponse au format Json
let jsonObjectTournage= await reponseTournages.json()


//affichage titre page HTML
const titreListeTypeTournage = document.getElementById("titre") 
titreListeTypeTournage.innerText = "Les tournages à Paris de 2016 à 2021"

let elementsTournages = jsonObjectTournage.records  //tableau général


//   1   ///// COMPTEUR DU NB DE TOURNAGE PAR ANNÉE + POUR L'ARRONDISSEMENT CHOISI
const boutonArr = document.getElementById("boutonArr")
boutonArr.addEventListener("click",function ligneGraph(){

// DECLARATION DES VARIABLES
let compteTournagesArrondissement = {}
let filtreArr
let tournagesFiltreArrondissement
let compteTournagesAnnee = {}

  filtreArr = document.getElementById("arrondissementSelect").value  
  //tableau filtré par un arrondissemnt 
  tournagesFiltreArrondissement = elementsTournages.filter (item => {
  return item.fields.ardt_lieu == filtreArr
  });

    for (let i=0; i < tournagesFiltreArrondissement.length; i++){
      let annee = tournagesFiltreArrondissement[i].fields.annee_tournage
      //console.log(annee)
      if (annee in compteTournagesArrondissement != true){
        compteTournagesArrondissement[annee]=1
      }
      else {
        compteTournagesArrondissement[annee]+=1
      }
    }

///////   COMPTEUR DU NOMBRE TOTAL DE TOURNAGE PAR ANNÉE

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
    label : "line : Nombre tournage par an pour l'arrondissement " + filtreArr,
    data : Object.values(compteTournagesArrondissement),
    type: "line",
    order: 1
  }
],
labels: Object.keys(compteTournagesAnnee),
},
})

})




//   2   ///// COMPTEUR DU NB DE TOURNAGE PAR ARRONDISSEMENT + POUR L'ANNÉE CHOISI

const boutonYear = document.getElementById("boutonAnnee")
boutonYear.addEventListener("click",function (){

// DECLARATION DES VARIABLES
//let  = {}
let filtreYear  //l'année sélectionnée
let tournagesFiltreYear  //tableau global pour une année
let compteTournagesAnnee = {}  //liste des tournages par arrondissement pour l'année choisie

filtreYear = document.getElementById("yearSelect").value  
  //tableau filtré pour une année 
  tournagesFiltreYear = elementsTournages.filter (item => {
  return item.fields.annee_tournage == filtreYear
  });

    for (let i=0; i < tournagesFiltreYear.length; i++){
      let arrondissement = tournagesFiltreYear[i].fields.ardt_lieu
        if (arrondissement in compteTournagesAnnee != true){
          compteTournagesAnnee[arrondissement]=1
        }
        else {
          compteTournagesAnnee[arrondissement]+=1
        }
    }


///////   COMPTEUR DU NOMBRE TOTAL DE TOURNAGE PAR ARRONDISSEMENT
let compteTournagesArrTot = {} //tableau nb de tournage total par arrondissement  = bar

    for (let i = 0 ; i < elementsTournages.length ; i++ ){
      let arrondissement = elementsTournages[i].fields.ardt_lieu
        if (arrondissement in compteTournagesArrTot!=1){
          compteTournagesArrTot[arrondissement]=1
        }
        else {compteTournagesArrTot[arrondissement]+=1
        }
    }


///// GRAPHIQUE : nombre de tournage par année + tout arrondissement
const mixedChartY = new Chart(document.getElementById('consolidationsArrYear'), {
type: 'bar',
data: {
datasets: [
  {
    label: "bar : Nombre tournage par arrondissement",
    data : Object.values(compteTournagesArrTot),
    order : 2
  }, {
    label : "line : Nombre tournage par arrondissement pour l'année " + filtreYear,
    data : Object.values(compteTournagesAnnee),
    type: "line",
    order: 1
  }
],
labels: Object.keys(compteTournagesArrTot),
},
})

})







//   3   //// GRAPHIQUE NOMBRE DE TOURNAGE TOTAL PAR ARRONDISSEMENT
let compteTournagesArr={}

for (let i = 0 ; i < elementsTournages.length ; i++ ){
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
          label: 'Nombre de tournage par arrondissement cumulé de 2016 à 2021',
          data: Object.values(compteTournagesArr),
        }
      ]
    }
  }
);

