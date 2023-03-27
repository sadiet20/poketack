
/* Variables */

const typeNames = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "fairy",
    "dark"
]

const selectedTypes = new Set()


/* Functions */

//marks type as selected when clicked on
function markType(event){
    element = event.currentTarget
    clickedType = element.poketype
    console.log("==selected:", typeNames[clickedType])

    //if already selected, remove it
    if(selectedTypes.has(clickedType)){
        selectedTypes.delete(clickedType)
        element.classList.remove("selected")
        console.log(selectedTypes)
        return
    }

    //add to selected types
    selectedTypes.add(clickedType)
    element.classList.add("selected")
    console.log(selectedTypes)
}


//navigate to recommended attacks page and pass the selected types
function generateAttack(){
    console.log("==generate attack") 

    const recommUrl = "recomm-attack.html?"

    //generate parameters for which types are selected
    let i = 0
    for(const item of selectedTypes){
        recommUrl += "type=" + typeNames[item]
        i += 1
        if(i != selectedTypes.size){
            recommUrl += "&"
        }
    }

    //navigate to url with parameters
    window.location.assign(recommUrl)
}


/* Execution */

const generateAttackButton = document.getElementById("generate-attack-button")
generateAttackButton.addEventListener("click", generateAttack)

const types = document.getElementsByClassName("type-card")
console.log(types)
for(let i=0; i<types.length; i++){
    types[i].poketype = i       //used to idenitfy each individual box
    types[i].addEventListener("click", markType)
}
