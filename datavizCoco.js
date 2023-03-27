const urlTournages = "https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&rows=10000&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=nom_producteur&facet=ardt_lieu&facet=date_debut&facet=date_fin";

async function tournageSource(sourceUrl){
let reponseTournages = await fetch(sourceUrl) 
let jsonObjectTournage= await reponseTournages.json() 


let elementsTournages = jsonObjectTournage.records 

//console.log(elementsTournages)

//const titreListeTypeTournage = document.getElementById("titre")
//titreListeTypeTournage.innerText = "Voici la liste des type de tournage :"

let tailleTableau = 100
let arrondissementTournage = {}

for (let i=0; i < tailleTableau; i++){
    let arrondissement = elementsTournages[i].fields.ardt_lieu
    
      if (arrondissement in arrondissementTournage != true) {
        arrondissementTournage[arrondissement] = 1
      }
      else { 
      arrondissementTournage[arrondissement]+= 1
      }
} 

const barCanvas = document.getElementById("barArr");
const barChart = new Chart(barCanvas, {
  type:"bar",
  data:{
    labels: Object.keys(arrondissementTournage), //axe X 
    datasets:[{
      data: Object.values(arrondissementTournage) //axe Y
      }]
    }
  }
)
}
tournageSource(urlTournages)