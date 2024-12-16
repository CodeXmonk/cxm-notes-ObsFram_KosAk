---
title: KosAk riport.
---

# Első próba

Az eredeti forrás alapján, változatlanul (GitHub from ASUS + IntelNUC).

## Kalkuláció
<BEVITELI MEZŐK> jönnek ide.
## Diagram

```js
const male = FileAttachment("data/KosAk_2024_12_16_small.csv").csv({typed: true});
let TM_data = male;
```


## Táblázat

<span style="color:red">TTM</span> = testmagasság;
<span style="color:yellow">Perc</span> = a testmagasság a 18 éves életkori érték százalékában kifejezve;
<span style="color:green">TTS</span> = testtömeg;
<span style="color:lightblue">PLX</span> = plasztikus index

```js
Inputs.table(male, {
  columns: [
    "id",
    "Gender_Choosen",
    "DateOfBirth",
    "DCK_value",
    "BecsTM",
    "TTM_kor_minus_nearest_decimal_age",
    "TTM_value",
    "TTS_value",
    "VAS_value",
    "AKK_value",
    "KZK_value",
    "PLX_value"
  ],
  align: {
    id: "right",
    Gender_Choosen: "center",
    DateOfBirth: "center",
    DCK_value: "center",
    BecsTM: "center",
    TTM_kor_minus_nearest_decimal_age: "center"
  },
  header: {
    id: "id",
    Gender_Choosen: "Nem",
    DateOfBirth: "Születés",
    DCK_value: "Dec.kor",
    BecsTM: "Becs. magasság",
    TTM_kor_minus_nearest_decimal_age: "TTMk-DCK",
    TTM_value: "TTM",
    TTS_value: "TTS",
    VAS_value: "VAS",
    AKK_value: "AKK",
    KZK_value: "KZK",
    PLX_value: "PLX"
  },
	format: {
		id: (x) => x.toFixed(0), 
		Gender_Choosen: (x) => x.toFixed(0),
		DCK_value: (x) => x.toFixed(2),
		BecsTM: (x) => x.toFixed(2),
		TTM_kor_minus_nearest_decimal_age: (x) => x.toFixed(2),
		TTM_value: (x) => x.toFixed(2),
		TTS_value: (x) => x.toFixed(2),
		VAS_value: (x) => x.toFixed(2),
		AKK_value: (x) => x.toFixed(2),
		KZK_value: (x) => x.toFixed(2),
		PLX_value: (x) => x.toFixed(2)
	}
})
```
