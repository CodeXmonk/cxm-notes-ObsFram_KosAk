---
title: KosAk report
---

# A brief history of space exploration

This report is a brief overview of the history and current state of rocket launches and space exploration.

## Forrás

A morfológiai életkor meghatározásához - melyet Mészáros János alapján (1990) ismertetünk - a következő változók ismerete szükséges: a személy naptári életkora decimális értékben (DCK), a testmagasság (TTM), a testtömeg (TTS) és a plasztikus index (PLX). Az első háromról már említést tettünk. A PLX a csontozatra és az izomzatra jellemző három mérőszám aritmetikai összege, azaz PLX = VAS + AKK + KZK, ahol a VAS = vállszélesség, AKK = alkarkerület, KZK = kézkerület (mindhárom cm-ben kifejezve).

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
    Plot.line(TM_data, {x: "age", y: "PLX", stroke: "lightblue"})
  ]
})
```

## Táblázat
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
