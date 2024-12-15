---
title: KosAk kalkulátor.
---

# Első próba

Az eredeti forrás alapján, változatlanul (GitHub from ASUS + IntelNUC).

## Kalkuláció
<BEVITELI MEZŐK> jönnek ide.
## Diagram

```js
const male = FileAttachment("data/male.csv").csv({typed: true});
let TM_data = male;
```

```js


Plot.plot({
  y: { domain: [0, 200], grid: true, label: "TTM"},
  marks: [
    Plot.ruleY([0]),
    Plot.line(TM_data, {x: "age", y: "TTM", stroke: "red"}),
    Plot.line(TM_data, {x: "age", y: "Perc", stroke: "yellow"}),
    Plot.line(TM_data, {x: "age", y: "TTS", stroke: "green"}),
    Plot.line(TM_data, {x: "age", y: "PLX", stroke: "lightblue"}),
    Plot.gridX({interval: 1})
  ]
})
```

## Táblázat (fiúk)

<span style="color:red">TTM</span> = testmagasság;
<span style="color:yellow">Perc</span> = a testmagasság a 18 éves életkori érték százalékában kifejezve;
<span style="color:green">TTS</span> = testtömeg;
<span style="color:lightblue">PLX</span> = plasztikus index

```js
Inputs.table(male, {
	format: {
		age: (x) => x.toFixed(2), 
		TTM: (x) => x.toFixed(2),
		Perc: (x) => x.toFixed(2),
		TTS: (x) => x.toFixed(2),
		PLX: (x) => x.toFixed(2)
	}
})
```
