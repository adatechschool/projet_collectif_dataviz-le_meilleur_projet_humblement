//integration de la carte
let reponseCarte= await fetch("https://public.opendatasoft.com/api/v2/")
let reponseCarteJson= await reponseCarte.json()

console.log(reponseCarteJson)