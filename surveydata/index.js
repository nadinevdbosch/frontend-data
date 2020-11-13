let surveyAnswers = data;
console.log(surveyAnswers);

let columnName = 'oogKleur';
let listOfAnswers = [];
let oogKleurData

for(answer of surveyAnswers){
    listOfAnswers.push(answer[columnName]);
}

function cleanData() {

    //rgb omzetten naar hex
    oogKleurData = listOfAnswers.map(entry => rgbToHex(entry.toUpperCase())); 
    
    //Zet alle letters om naar uppercase
    oogKleurData = oogKleurData.map(entry => entry.toUpperCase()); 

    //haal alle spaties eruit
    //BRON: https://stackoverflow.com/questions/5963182/how-to-remove-spaces-from-a-string-using-javascript
    oogKleurData = oogKleurData.map(entry => entry.replace(/\s/g, ''));

    //Haal alle # weg
    oogKleurData = oogKleurData.map(entry => entry.replace('#', ''));

    //Zet alle tekt om naar hex
    oogKleurData = oogKleurData.map(entry => textToHex(entry.toUpperCase())); 

    console.log(oogKleurData)

}




//converteer alle RGB naar hex
function rgbToHex (rgbValue) {
    if ( rgbValue.includes('RGB') ){
        rgbValue = rgbValue.replace('RGB', '').replace('(', '').replace(')', '').replace('.', ',').replace(' ', '');
        const [R, G, B] = rgbValue.split(',');

        if (R >= 0 && R <= 255 && G >= 0 && G <= 255 && B >= 0 && B <= 255) {
            var hexCode = parseInt(R).toString(16) + parseInt(G).toString(16) + parseInt(B).toString(16);
            console.log(hexCode)

        }

    }else{
        hexCode = rgbValue
    }

    return hexCode;

}

function textToHex (text) {
    if ( text.includes('BLAUW') ){
        var hexCode = "AAD8E6";
    } 
    else if (text.includes('BRUIN'))
    {
        var hexCode = "45322E";
    }
    else if (
        text.includes('GROEN') ){
        var hexCode = "008000";
    } else{
        hexCode = text;
    }

    return hexCode

}




cleanData()



