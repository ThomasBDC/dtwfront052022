const urlApi = 'https://dtw.azurewebsites.net/api'
const urlApiLinks = urlApi + '/links';
let currentPage = 1;
let isSearchMode = false;

function getLinks(perPage = 10, page =1){
    isSearchMode = false;
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
            if(page == 1){
                //Premier affichage, on vide le contenu de la div
                document.getElementById("linksContainer").innerHTML = myHtml;
            }
            else{
                //étapes de pagination, on ajoute le contenu en s
                document.getElementById("linksContainer").innerHTML += myHtml;
            }
        })
        .catch(error =>{
            alert(error);
        });
}

function paginate(){
    currentPage ++;
    getLinks(15,currentPage)
}

function searchLinks(){
    isSearchMode = true;
    currentPage = 1;

    const search = document.getElementById("searchBarInput").value;
    
    if(search == '' || search == undefined){
        getLinks(15, currentPage);
    }
    else{
        const headers = new Headers();
        headers.append("Content-Type", "application/json")
    
        const init = {
            method: 'GET', 
            headers: headers
        };
    
        //https://dtw.azurewebsites.net/api/links/search?search=laur
        const urlRequete = urlApiLinks + '/search?search='+search;
    
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
                if(myHtml != ''){
                    document.getElementById("linksContainer").innerHTML = myHtml;
                }
                else{
                    document.getElementById("linksContainer").innerHTML = `<span class="text-danger">Fin de l'affichage des résultats`;
                }
            })
            .catch(error =>{
                alert(error);
            });
    }

    
}


function addLink(){
    alert("ajouter le lien");
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
    
        if(!isSearchMode){
            if (scrollTop + clientHeight >= scrollHeight -5 ) {
                //action à faire pour le scroll infini
                paginate();
            }
        }
    });

  }, false);