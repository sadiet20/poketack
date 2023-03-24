
/* Variables */

const TYPES = {
    NORMAL:     0,
    FIGHTING:   1,
    FLYING:     2,
    POISON:     3,
    GROUND:     4,
    ROCK:       5,
    BUG:        6,
    GHOST:      7,
    STEEL:      8,
    FIRE:       9,
    WATER:      10,
    GRASS:      11,
    ELECTRIC:   12,
    PSYCHIC:    13,
    ICE:        14,
    DRAGON:     15,
    FAIRY:      16,
    DARK:       17
}

var TYPE_NAMES = [
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
    console.log("==selected:", TYPE_NAMES[clickedType])

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


function generateAttack(){
    console.log("==generate attack button clicked")
}


/* Execution */

var generateAttackButton = document.getElementById("generate-attack-button")
generateAttackButton.addEventListener("click", generateAttack)

var types = document.getElementsByClassName("type-card")
console.log(types)
for(var i=0; i<types.length; i++){
    types[i].poketype = i
    types[i].addEventListener("click", markType)
}

