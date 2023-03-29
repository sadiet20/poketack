

/* Variables */

const NUM_TYPES = 18

const TypeIdx  = {
    Normal:     0,
    Fighting:   1,
    Flying:     2,
    Poison:     3,
    Ground:     4,
    Rock:       5,
    Bug:        6,
    Ghost:      7,
    Steel:      8,
    Fire:       9,
    Water:      10,
    Grass:      11,
    Electric:   12,
    Psychic:    13,
    Ice:        14,
    Dragon:     15,
    Fairy:      16,
    Dark:       17
}

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

//row is attacking column, 1 = strong, 0 = weak
const attackStrength = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //normal
                        [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1], //fighting
                        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], //flying
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0], //poison
                        [0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0], //ground
                        [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], //rock
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1], //bug
                        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], //ghost
                        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0], //steel
                        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0], //fire
                        [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], //water
                        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], //grass
                        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], //electric
                        [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //psychic
                        [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0], //ice
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], //dragon
                        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], //fairy
                        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]] //dark

const selectedTypeNums = []


/* Functions */

function addTypeCard(type_name, location){
    opponentContainer = document.getElementById(location)
    console.log(opponentContainer)

    html =  "<section class='type-card'>" +
                "<img class='type-icon' src='icons/" + type_name + ".svg' />" +
                "<div class='type-name'>" +
                    type_name +
                "</div>" +
            "</section>"
    
    opponentContainer.insertAdjacentHTML("beforeend", html)
}

//make sure selected Types are valid
function validateParams(selectedTypes){
    for(let i=0; i<selectedTypes.length; i++){
        let valid = false;
        for(let j=0; j<NUM_TYPES; j++){
            //keep track of the numbers of each selected type
            if(selectedTypes[i] == typeNames[j]){
                valid = true;
                selectedTypeNums.push(j)
                break
            }
        }
        if(!valid){
            //navigate to 404 page
            console.log("ERROR - INVALID")
            window.location.assign("404.html")
            return false
        }
    }
    return true
}

//adds pokemon code to HTML
function addCode(code, location){
    codeText = document.getElementById(location)
    codeText.innerHTML = code
}

//copy pokemon code to clipboard
function copyCode(event){
    console.log("id:", event.currentTarget.idName)
    codeText = document.getElementById(event.currentTarget.idName)

    navigator.clipboard.writeText(codeText.firstChild.data)
    console.log("copying:", codeText.firstChild.data)

    //remove hidden tag to make message visible
    successAlert = document.getElementsByClassName("successful-copy")
    successAlert[0].classList.remove("hidden")

    //hide message again after 2 seconds
    setTimeout(hideSuccessAlert, 2000)
}

//hide success alert
function hideSuccessAlert(){
    successAlert = document.getElementsByClassName("successful-copy")
    successAlert[0].classList.add("hidden")
}

//creates filter code for two strong attacks
function createDoubleAttackCode(strongAttacks){
    /* 
     * Ex: looking for strong attacks fire and dark
     * (@1fire, @1dark) & (@2fire, @3fire, @2dark, @3dark)
     */
    let code = ""
    for(let i=0; i<strongAttacks.length; i++){
        if(i != 0){
            code += ", "
        }

        code += "@1" + strongAttacks[i]
    }

    code += " & "

    for(let i=0; i<strongAttacks.length; i++){
        if(i != 0){
            code += ", "
        }

        code += "@2" + strongAttacks[i] + ", @3" + strongAttacks[i]
    }

    return code
}


/* Execution */

const queryString = window.location.search
console.log("query:", queryString)

const urlSearch = new URLSearchParams(queryString)
selectedTypes = urlSearch.getAll("type")
console.log("params:", selectedTypes)


//make sure parameters are valid types
let valid = validateParams(selectedTypes)

if(valid){
    //add card to signify opponent types
    for(let i=0; i<selectedTypes.length; i++){
        addTypeCard(selectedTypes[i], "opponent-types")
    }

    //add types that are strong against opponent
    let strongAttacks = []
    let attackCode = ""
    for(let i=0; i<selectedTypeNums.length; i++){
        let opp_type = selectedTypeNums[i]
        for(let j=0; j<NUM_TYPES; j++){
            if(attackStrength[j][opp_type] == 1){
                //keep track of strong attacks
                strongAttacks.push(typeNames[j])

                //add card to page
                addTypeCard(typeNames[j], "attack-types")

                //create code for attack types
                if(attackCode != ""){
                    attackCode += ", "
                }
                attackCode += "@" + typeNames[j]
            }
        }
    }
    addCode(attackCode, "attack-code")

    //add types that are vulnerable to opponent
    let avoidCode = ""
    for(let i=0; i<selectedTypeNums.length; i++){
        let opp_type = selectedTypeNums[i]
        for(let j=0; j<NUM_TYPES; j++){
            if(attackStrength[opp_type][j] == 1){
                addTypeCard(typeNames[j], "avoid-types")
                
                //create code for avoid types
                if(avoidCode != ""){
                    avoidCode += " & "
                }
                avoidCode += "!" + typeNames[j]
            }
        }
    }
    addCode(avoidCode, "avoid-code")

    //add code for attack and avoid combined
    addCode(attackCode+" & "+avoidCode, "attack-avoid-code")

    //add code for quick and charged strong attacks
    let doubleAttackCode = createDoubleAttackCode(strongAttacks)
    addCode(doubleAttackCode, "double-attack-code")

    //add code for quick + charged strong attacks + avoid combined
    addCode(doubleAttackCode+" & "+avoidCode, "double-attack-avoid-code")

    //set event listeners for copy buttons 
    let codeSections = ["attack-code", "avoid-code", "attack-avoid-code", "double-attack-code", "double-attack-avoid-code"]
    let copySymbols = document.getElementsByClassName("copy-icon")
    for(let i=0; i<copySymbols.length; i++){
        copySymbols[i].idName = codeSections[i]
        copySymbols[i].addEventListener("click", copyCode)
    }

    //hide successful copy message if 'x' is clicked
    let exitX = document.getElementsByClassName("exit-x")
    exitX[0].addEventListener("click", hideSuccessAlert)
}


/*
//print stats for what each type is vulnerable to
for(let i=0; i<attackStrength.length; i++){
    console.log(typeNames[i], "is vulnerable to:")
    for(let j=0; j<attackStrength[i].length; j++){
        if(attackStrength[j][i] == 1){
            console.log("\t", typeNames[j])
        }
    }
}
*/

