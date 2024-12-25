---
title: Met-Com 0.1
---

```js
// Import into your own notebook first
// import {textcolor} from "@observablehq/text-color-annotations-in-markdown"
```

```js
const system = "metric";
```

```js
const gender = view(Inputs.radio(["male", "female"], {label: "neme:", value: "male"}));
```

```js
const Age = Inputs.range([18, 80], {label: "életkor:", step: 1, value: 60});
const view_Age = view(Age);
```

```js
const height = Inputs.range([0, 220], {label: "magasság [cm]:", step: 1, value: 191});
const view_height = view(height);
```

```js
const weight_MIN = 0;
const weight_MAX = 250;
const weight = Inputs.range([weight_MIN, weight_MAX], {label: "testsúly [kg]:", step: 0.1, value: 97.4});
const view_weight = view(weight);
```

```js
const Fat_percentage = Inputs.range([10, 30], {label: "BodyFat [%]:", step: 0.1, value: 25.7});
const view_Fat_percentage = view(Fat_percentage);
```

```js
import * as d3 from "npm:d3";

const injuriesByMonth = [
	{"id":1,"injuries":2788},
	{"id":2,"injuries":2443},
	{"id":3,"injuries":2856},
	{"id":4,"injuries":2909},
	{"id":5,"injuries":3485},
	{"id":6,"injuries":3613},
	{"id":7,"injuries":3494},
	{"id":8,"injuries":3248},
	{"id":9,"injuries":3131},
	{"id":10,"injuries":3206},
	{"id":11,"injuries":2890},
	{"id":12,"injuries":3175}
];

	const width = 928;
	const height = 500;
	const margin = ({top: 30, right: 30, bottom: 20, left: 40});

	const idExtent = d3.extent(injuriesByMonth, d => d.id);
	const idMin = d3.min(injuriesByMonth, d =>  d.id);
	const idMax = d3.max(injuriesByMonth, d =>  d.id);
	const maxInjuries = d3.max(injuriesByMonth, d => d.injuries);

	const x = d3.scaleLinear()
		.domain([idMin,idMax])
		.range([margin.left, width - margin.right]);

	const y = d3.scaleLinear()
		.domain([0, maxInjuries]).nice()
		.range([height - margin.bottom, margin.top]);

	var line = d3.line()
		.x(d => x(d.id))
		.y(d => y(d.injuries));

function chart() {
// Setup
	const svg = d3.create('svg')
		.attr('width', width)
		.attr('height', height);
// Create the axes
	const xAxis = d3.axisBottom(x); 
	svg.append('g')
		// move x-axis down to the bottom
		.attr('transform', `translate(0,${height - margin.bottom})`)
		.call(xAxis);
	const yAxis = d3.axisLeft(y)
		.tickFormat(d => d);
	svg.append('g')
		// move y-axis to the left to account for left margin
		.attr('transform', `translate(${margin.left})`)
		.call(yAxis)
		.call(g => g.select('.domain').remove())
		// add axis label
		.append('text')
			.attr('fill', 'black')
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'hanging')
			.attr('font-weight', 'bold')
			.text('Collision Injuries, 2019');
// Draw the line. We are only drawing one line, so we can append one path
	svg.append('path')
		.attr('stroke', 'steelblue')
		.attr('stroke-width', 2)
		.attr('fill', 'none')
		.attr('d', line(injuriesByMonth));
	return svg.node();
}
```

idMin: ${idMin}

idMax: ${idMax}

idExtent: ${idExtent}

line: ${line(injuriesByMonth)}

${chart()}