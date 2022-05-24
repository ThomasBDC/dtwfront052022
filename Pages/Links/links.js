const urlApi = 'https://dtw.azurewebsites.net/api'
const urlApiLinks = urlApi + '/links';
let currentPage = 1;
//Juste pour tester l'appel AJAX
function getLinks(perPage = 10, page =1){
    const headers = new Headers();
    headers.append("Content-Type", "application/json")

    const init = {
        method: 'GET', 
        headers: headers
    };

    const urlRequete = urlApiLinks + '?perPage='+perPage+'&page='+page;
    fetch(urlRequete, init)
        .then(response => {
            return response.json();
        })
        .then(response => {
            //Déclare une chaine de caractères
            let myHtml = '';
            
            //Pour chaque lien que je reçoit de ma requête ajax
            response.forEach(element => {
                /*Je crée un élément en html, qui corresponds 
                à l'affichage de mon lien*/

            myHtml +=
                `
                <div class="cardLinks">
                    <div class="card h-100">
                        <img src="https://picsum.photos/200/100" class="card-img-top" alt="image">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">
                            ${element.description}
                            </p>
                            <a href="${element.link}" class="btn btn-primary">
                                Go !   
                            </a>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">By ${element.author.surName} ${element.author.foreName}</small>
                        </div>
                    </div>
                </div>
                `;

            });
            document.getElementById("linksContainer").innerHTML += myHtml;
        })
        .catch(error =>{
            alert(error);
        });
}

function paginate(){
    currentPage ++;
    getLinks(15,currentPage)
}


document.addEventListener('DOMContentLoaded', function () {
    getLinks(15,1);

    //infite scroll
    window.addEventListener('scroll', () => {
        const {
            scrollTop,//Ce qui est au dessus de mon écran (j'ai déjà scrollé cette partie)
            scrollHeight,//La hauteur totale de mon site
            clientHeight//La hauteur de mon écran
        } = document.documentElement;
    
        if (scrollTop + clientHeight >= scrollHeight -5 ) {
            //action à faire pour le scroll infini
            paginate();
        }
    });

  }, false);