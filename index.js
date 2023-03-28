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
let elementsTournagesFiltreAnnee={}
let elementsTournagesFiltreArr={}
let elementsTournagesFiltreType={}
let compteTournagesAnnee={}
let compteTournagesArr={}
let compteTournagesType={}


//fonction globale de création des graphs, qq soit le dataset, filtré ou non
const generateCharts = (films) =>{
  //data set année tournage

  //affichage du nombre de films total



  for (let i=0;i<tailleTableau;i++){
    let annee=films[i].fields.annee_tournage
    //console.log(annee)
    if (annee in compteTournagesAnnee!=true){
      compteTournagesAnnee[annee]=1
    }
    else {
      compteTournagesAnnee[annee]+=1
    }
  }

  //graphe tournages par années
  new Chart(
    document.getElementById('consolidationsAnnee'),
    {
      type: 'bar',
      data: {
        labels: Object.keys(compteTournagesAnnee),
        datasets: [
          {
            label: 'Nombre de lieux de tournage par année',
            data: Object.values(compteTournagesAnnee),
          }
        ]
      }
    }
  );
  
  // récuperation de la valeur dans le filtre déroulant, dans le html
  
  
  for (let i=0;i<tailleTableau;i++){
    let arrondissement=films[i].fields.ardt_lieu
    // console.log(arrondissement)
    if (arrondissement in compteTournagesArr!=1){
      compteTournagesArr[arrondissement]=1
    }
    else {compteTournagesArr[arrondissement]+=1
    }
  }
  // console.log(compteTournagesArr)
  
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

  for (let i=0;i<tailleTableau;i++){
    let typeTournage=films[i].fields.type_tournage
    // console.log(typeTournage)
    if (typeTournage in compteTournagesType!=1){
      compteTournagesType[typeTournage]=1
    }
    else {compteTournagesType[typeTournage]+=1
    }
  }
  
  
  //graphe tournages par arrondissements 
  new Chart(
    document.getElementById('consolidationsType'),
    {
      type: 'bar',
      data: {
        labels: Object.keys(compteTournagesType),
        datasets: [
          {
            label: 'Nombre de lieux de tournage par Type de Tournage',
            data: Object.values(compteTournagesType),
          }
        ]
      }
    }
  );
}


//affichage par défaut des charts non filtrés
generateCharts(elementsTournages)

//Affichage par défaut du nombre total de films du scope considéré


let containerNbrFilms=document.getElementById("nombrefilms")
console.log(containerNbrFilms)
let compteurFilms= document.createElement('p')
compteurFilms.innerText=tailleTableau
containerNbrFilms.appendChild(compteurFilms)


//filtre sur les années
const boutonAnnee = document.getElementById("boutonAnnee")
boutonAnnee.addEventListener("click",function(){
  let filtreAnnee = document.getElementById("anneeSelect").value  
  //tableau filtré par un arrondissemnt 
  console.log(filtreAnnee)
  elementsTournagesFiltreAnnee = elementsTournages.filter (item => {
    return item.fields.annee_tournage == filtreAnnee 
  });
  // console.log('Tableau filtré par année')
  // console.log(elementsTournagesFiltreAnnee)
  document.getElementById("consolidationsAnnee").innerHTML=""
  generateCharts(elementsTournagesFiltreAnnee)
})

// const boutonArr = document.getElementById("boutonArr")
// boutonArr.addEventListener("click",function(){
//   let filtreArr = document.getElementById("arrondissementSelect").value  
//   //tableau filtré par un arrondissemnt 
//   elementsTournagesFiltreArr = elementsTournages.filter (item => {
//     return item.fields.ardt_lieu == filtreArr   
//   });
//   generateCharts(elementsTournagesFiltreArr)
// })


// const boutonType = document.getElementById("boutonType")
// boutonType.addEventListener("click",function(){
//   let filtreType = document.getElementById("typeSelect").value  
//   //tableau filtré par un arrondissemnt 
//   elementsTournagesFiltreType = elementsTournages.filter (item => {
//     return item.fields.type_tournage == filtreType
//   });
//   generateCharts(elementsTournagesFiltreType)
// })



// autre manière de créer un filtre :
//const elementsTournagesFiltre = elementsTournages.filter(tournage => tournage.fields.ardt_lieu == filtreArr); 