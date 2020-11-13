import { 
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom
} from 'd3';


const endpoint = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json?$limit=15000'
let dataPersonenautos;
let dataTaxis;

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const xScale = scaleLinear()
  	
  
  const yScale = scaleBand()
  	

const render = data => {
  const xValue = d => d.value
  const yValue = d => d.key
  const margin = {top: 50, right: 50, bottom: 50, left: 100};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  console.log(xValue)
  
  xScale.domain([0, max(data, xValue)])
  xScale.range([0, innerWidth]);
  
  yScale.domain(data.map(yValue))
  yScale.range([0, innerHeight])
  yScale.padding(0.1);
  
  
  const g = svg.append('g')
  	.attr('transform', `translate(${margin.left},${margin.top})`);
  
  g.append('g').call(axisLeft(yScale));
  g.append('g').call(axisBottom(xScale))
  	.attr('transform', `translate(0,${innerHeight})`);
  	
  
  g.selectAll('rect').data(data) // Hier zijn nog 0 rectangles
  	.enter().append('rect') // Hier maakt hij voor elk datapunt een rectangle aan
  		.attr('y', d => yScale(yValue(d)))
    	.attr('width', d => xScale(xValue(d)))
  		.attr('height', yScale.bandwidth());
};



d3.json(endpoint).then(data => {
    console.log("ruwe data", data)

    //filter personenauto
    let filteredData = filterDataRows(data, 'voertuigsoort' ,'Personenauto')
    console.log("filteren: data van alleen personenauto", filteredData)
  
  	//filter personenautos die geen taxis zijn
  	const personenautos = filterDataRows(filteredData, 'taxi_indicator' ,'Nee')
    console.log("filteren: data van alleen personenautos die geen taxis zijn", personenautos)
  
  	//filter personenautos die wel taxis zijn
  	const taxis = filterDataRows(filteredData, 'taxi_indicator' ,'Ja')
    console.log("filteren: data van alleen personenautos die wel taxis zijn", taxis)

    //transformeer personenautos naar alleen kleur 
    const personenautosTransformed = transformData(personenautos)
    console.log("data transformeren van de personenautos", personenautosTransformed)
    
    //transformeer taxis naar alleen kleur 
    const taxisTransformed = transformData(taxis)
    console.log("data transformeren van de taxis", taxisTransformed)
  
  	//array maken met alle kleuren van personenautos
    const colorsPersonenautos = filterColomn(personenautosTransformed, 'kleur')
    console.log("kleurenarray personenautos", colorsPersonenautos)
  
  	//array maken van alle kleuren van taxis
    const colorsTaxis = filterColomn(taxisTransformed, 'kleur')
    console.log("kleurenarray personenautos", colorsTaxis)
    
    //tellen hoeveel er van elke kleur zijn bij de personenautos
    const colorsOfPersonenautos = countColors(colorsPersonenautos)
    console.log("De kleuren tellen", colorsOfPersonenautos)
  
  	//tellen hoeveel er van elke kleur zijn bij de personenautos
    const colorsOfTaxis = countColors(colorsTaxis)
    console.log("De kleuren tellen", colorsOfTaxis)
    
    //Zet de kleuren van de personenautos die geteld zijn in een Array
    dataPersonenautos = newArray(colorsOfPersonenautos)
    console.log("alle kleuren van de personenautos in nieuwe array", dataPersonenautos)

    //Zet de kleuren van de taxis die geteld zijn in een Array
    dataTaxis = newArray(colorsOfTaxis)
    console.log("alle kleuren van de taxis in nieuwe array", dataTaxis)

  	render(dataTaxis)
    
})
	

function transformData(data) {
    const transformedData = data.map(item => {
        return {
            kleur: item.eerste_kleur,
        }
    })
    return transformedData
}

// kleuren returnen in een array
function countColors(data) {
    let countedColors = [];

    for (var i = 0; i < data.length; i++) {
        //https://stackoverflow.com/questions/15052702/count-unique-elements-in-array-without-sorting/15052738#15052738
        countedColors[data[i]] = 1 + (countedColors[data[i]] || 0)
    }
    return countedColors
}

// Geeft alle waardes van een specifieke kolom van de data in een array
function filterColomn(data, column) {
    // door alle data heen gaan en alleen de geselecteerde kolom geven
    return data.map(item => item[column])
}

//https://stackoverflow.com/questions/36411566/how-to-transpose-a-javascript-object-into-a-key-value-array
function newArray(dataArr) {
    return Object.entries(dataArr).map(([key, value]) => ({
        key,
        value
    }));
}

// Returnt de waardes van een bepaalde kolom en zet dit in een array.
function filterData(dataArray, column) {
    // door alle data heen gaan en alleen de geselecteerde kolom geven
    return dataArray.map(item => item[column])
}

//functie waarbij ik filter op alle personenauto's
function filterDataRows(dataArray, row, value) {
	return dataArray.filter(item => item[row]=== value)
}







