

/* Variables */


/* Functions */
function addTypeCard(type_name){
    opponentContainer = document.getElementById("opponent-types")

    console.log(opponentContainer)

    html =  "<section class='type-card'>" +
                "<img class='type-icon' src='icons/" + type_name + ".svg' />" +
                "<div class='type-name'>" +
                    type_name +
                "</div>" +
            "</section>"
    
    opponentContainer.insertAdjacentHTML("beforeend", html)
}


/* Execution */

const queryString = window.location.search
console.log("query:", queryString)

const urlSearch = new URLSearchParams(queryString)
selectedTypes = urlSearch.getAll("type")
console.log("params:", selectedTypes)

for(var i=0; i<selectedTypes.length; i++){
    addTypeCard(selectedTypes[i])
}
