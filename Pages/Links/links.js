const urlApi = 'https://dtw.azurewebsites.net/api'
const urlApiLinks = urlApi + '/links';
//Juste pour tester l'appel AJAX
function getLinks(){
    const headers = new Headers();
    headers.append("Content-Type", "application/json")

    const init = {
        method: 'GET', 
        headers: headers
    };

    
    fetch(urlApiLinks, init)
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response);
        })
        .catch(error =>{
            alert(error);
        });
}