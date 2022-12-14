import data from './studentsPerformance.json'

// ************* Gender distribution *************
const genderData = data.map(object => object.gender)
// ['male', 'female', 'female', ...]
let genderLabels: string[] = [], genderCount: any = {}
for( let i=0; i<genderData.length; i++ ) {
	if( !genderLabels.includes(genderData[i]) ) {
		genderLabels.push(genderData[i])
	}
	if (genderCount[genderData[i]] === undefined ) {
		genderCount[genderData[i]] = 1
	} else {
		genderCount[genderData[i]]++   // { male: 482, female: 518 }
	}
}
// console.log('Student data, genderCount: ', genderCount)

let genderDataset: number[] = []
genderLabels.forEach(label => {
	// Alternativ lösning hade kunnat använda Object.keys(genderCount)
	// Exempel: label='male', genderCount['male'] === genderCount.male
	// console.log('Student data, gender dataset push:', label, genderCount[label])
	genderDataset.push(genderCount[label])
})

const genderDiagramData = {
	datasets: [
		{
			data: genderDataset,
			label: 'Count',
			backgroundColor: ['#3F2DDE', '#2596be']
		}
	],
	labels: genderLabels
}


// ************* Average math scores *************
let mathScores: any = {}
data.map(object => {
	let score: number = object['math score']
	let gender = object.gender
	if( mathScores[gender] === undefined ) {
		mathScores[gender] = score
	} else {
		mathScores[gender] += score
	}
})
genderLabels.forEach(label => {
	let count: number = genderCount[label]
	mathScores[label] = mathScores[label] / count
})

const mathDiagramData = {
	labels: genderLabels,
	datasets: [
		{
			data: mathScores,
			label: 'Average score',
			backgroundColor: ['#c193a2', '#a2c193']
		}
	]
}

// ************* Scatter plot, math scores *************
let scatterSeries: any = {}
data.forEach(object => {
	let gender: string = object.gender
	let score: number = object['math score']

	if( scatterSeries[gender] === undefined ) {
		scatterSeries[gender] = [
			{ x: 0, y: score }
		]
	} else {
		scatterSeries[gender].push({
			// x kommer vara 0, 1, 2, 3 osv.
			x: scatterSeries[gender].length, y: score
		})
	}
})
const palette: string[] = ['#c193a2', '#a2c193']  // ha med så många färger som det finns olika värden på "gender"
type Point = {
	x: number;
	y: number;
}
type Dataset = {
	label: string;
	data: Point[];
	backgroundColor: string;
}
type DiagramData = {
	datasets: Dataset[];
}
const scatterDiagramData: DiagramData = {
	// [ { label, data, backgroundColor }, ... ]
	datasets: []
}
genderLabels.forEach((label, index) => {
	let dataset: Dataset = {
		label: label,
		data: scatterSeries[label],
		backgroundColor: palette[index]
	}
	scatterDiagramData.datasets.push(dataset)
})
console.log('Student data scatter:', scatterDiagramData)

export { genderDiagramData, mathDiagramData, scatterDiagramData }
/* kodexempel från dokumentationen
data = {
    datasets: [{
        data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};
*/


/*
filter -> väljer ut vilka element i en lista man ska behålla
find -> returnerar det första matchande elementet i en lista
map -> "omvandlar" en lista

const filtered = [1, 2, 3, 4, 5].filter(x => x < 3)  // [1, 2]
const firstMatch = [1, 2, 3, 4, 5].find(x => x > 3)  // 4
*/
