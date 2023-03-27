// tests
//récupération de l'url
const urlTournages = "https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&rows=10000&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=nom_producteur&facet=ardt_lieu&facet=date_debut&facet=date_fin";
//stockage du fichier brut dans une variable reponse
let reponseTournages = await fetch(urlTournages) 
// conversion de reponse au format Json
let jsonObjectTournage= await reponseTournages.json()
//stockage du tableau records dans une variable elementsTournages
let elementsTournages = jsonObjectTournage.records 

// console.log(elementsTournages)


//affichage titre page HTML, à enlever
const titreListeTypeTournage = document.getElementById("titre") 
titreListeTypeTournage.innerText = "Voici la liste des type de tournage :"

//variable pour manipuler un tableau de taille 100
let tailleTableau = 100


let compteTournages={}

for (let i=0;i<tailleTableau;i++){
  let annee=elementsTournages[i].fields.annee_tournage
  //console.log(annee)
  if (annee in compteTournages!=true){
    compteTournages[annee]=1
  }
  else {
    compteTournages[annee]+=1
  }
}
//console.log(compteTournages)



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

// récuperation de la valeur dans le filtre déroulant, dans le html

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



let elementsTournagesFiltre={}
const boutonArr = document.getElementById("boutonArr")
boutonArr.addEventListener("click",function(){
  let filtreArr = document.getElementById("arrondissementSelect").value  
  //tableau filtré par un arrondissemnt 
  elementsTournagesFiltre = elementsTournages.filter (item => {
    return item.fields.ardt_lieu == filtreArr   
  });
  generateCharts(elementsTournagesFiltre)
})



const generateCharts = (films) =>{

}

// const filtreArr = document.getElementById("arrondissementSelect")
// console.log(filtreArr.value)
// let test= compteTournagesArr.filter(function(arr){
//   return arr.filterArr.value
// })



// autre manière de créer un filtre :
//const elementsTournagesFiltre = elementsTournages.filter(tournage => tournage.fields.ardt_lieu == filtreArr); 