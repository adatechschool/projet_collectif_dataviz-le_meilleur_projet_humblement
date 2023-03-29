//récupération de l'url
const urlTournages = "https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&rows=10000&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=nom_producteur&facet=ardt_lieu&facet=date_debut&facet=date_fin";
//stockage du fichier brut dans une variable reponse
let reponseTournages = await fetch(urlTournages) 
// conversion de reponse au format Json
let jsonObjectTournage= await reponseTournages.json()
//stockage du tableau records dans une variable elementsTournages
let elementsTournages = jsonObjectTournage.records 

let elementsTournagesFiltreAnnee={}
let elementsTournagesFiltreArr={}
let elementsTournagesFiltreType={}
let compteTournagesAnnee={}
let compteTournagesArr={}
let compteTournagesType={}
let anneeChart= new Chart ()
let arrChart = new Chart ()
let typeChart= new Chart ()


export const filtreTableau = ()=>{
    let filtreAnnee = document.getElementById("anneeSelect").value  
    let filtreArr = document.getElementById("arrSelect").value
    console.log(filtreArr)
    let filtreType = document.getElementById("typeSelect").value
    //tableau filtré par un arrondissemnt 
    console.log(filtreAnnee)
    console.log(filtreArr)
    console.log(filtreType)

    if (filtreAnnee=="" && filtreArr!="" && filtreType!=""){
        const elementsTournagesFiltre = elementsTournages.filter(tournage => tournage.fields.annee_tournage == filtreAnnee)
    }
    else {
        const elementsTournagesFiltre = elementsTournages.filter(tournage => tournage.fields.annee_tournage == filtreAnnee && tournage.fields.ardt_lieu == filtreArr && tournage.fields.type_tournage == filtreType); 
    }

    
    // elementsTournagesFiltreAnnee = elementsTournages.filter (item => {
    //   return item.fields.annee_tournage == filtreAnnee 
    // });
    // console.log('Tableau filtré par année')
    // console.log(elementsTournagesFiltreAnnee)
}