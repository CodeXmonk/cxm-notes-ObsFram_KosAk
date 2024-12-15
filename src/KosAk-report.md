---
title: KosAk report
---

# Első próba

Az eredeti forrás alapján, változatlanul (ASUS + IntelNUC).

<div class="tip">This is a tip.</div>

## Forrás

<span style="color:blue">some *blue* text</span>

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

```js
// Import into your own notebook first
//import {textcolor} from "@observablehq/text-color-annotations-in-markdown"
function textcolor(content, style = {}) {
  function yiq(color) {
    const {r, g, b} = d3.rgb(color);
    return (r * 299 + g * 587 + b * 114) / 1000 / 255; // returns values between 0 and 1
  }
  const {
    background,
    color = yiq(background) >= 0.6 ? "#111" : "white", 
    padding = "0 5px",
    borderRadius = "4px",
    fontWeight = 800,
    ...rest
  } = typeof style === "string" ? {background: style} : style;
  return htl.html`<span style=${{
    background, 
    color, 
    padding, 
    borderRadius, 
    fontWeight, 
    ...rest
  }}>${content}</span>`;
}
```

## Táblázat
```js
Inputs.table(male, {
  header: {
//    age: ${textcolor("Age", 'darkgreen')},
//    age:  textcolor("Age", {background: '#111111', color: 'red'}),
//    TTM:  textcolor("TTM", {background: '#111111', color: 'red'}),
//      age: "Age",
  },
	format: {
		age: (x) => x.toFixed(2), 
		TTM: (x) => x.toFixed(2),
		Perc: (x) => x.toFixed(2),
		TTS: (x) => x.toFixed(2),
		PLX: (x) => x.toFixed(2)
	}
})
```
