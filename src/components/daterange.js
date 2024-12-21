import {button, datetime, form} from "npm:@observablehq/inputs";

let startInput = datetime({ label: "From", value: new Date()-7*24*3600000});
let endInput = datetime({ label: "To", value: new Date(),validate:e=>new Date(e.value)>startInput.value });

const predefinedPeriodInput = button([
  ["6 hours", value => setRange(6*3600*1000)],
  ["2 days", value => setRange(2*24*3600*1000)],
  ["1 week", value => setRange(7*24*3600*1000)],
  ["1 month", value => setRange(31*24*3600*1000)],
  ["-1 year", value => setRange(365*24*3600*1000)],
  ["+1 year", value => setRange(-1*365*24*3600*1000)]
], {value: null, width:90});

const setRange = (period)=>{
    startInput.value = new Date()-period;
    endInput.value = new Date();
    return period;
}

export const daterange = form({
  from : startInput,
  to : endInput,
  predefined : predefinedPeriodInput
})