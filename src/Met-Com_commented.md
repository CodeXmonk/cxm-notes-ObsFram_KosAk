---
title: Met-Com 0.1
---

```js
import * as d3 from "npm:d3";

const system = "metric";
const gender = view(Inputs.radio(["male", "female"], {label: "neme:", value: "male"}));
const Age = Inputs.range([18, 80], {label: "életkor:", step: 1, value: 60});
const view_Age = view(Age);
const height = Inputs.range([0, 220], {label: "magasság [cm]:", step: 1, value: 191});
const view_height = view(height);
const weight_MIN = 0;
const weight_MAX = 250;
const weight = Inputs.range([weight_MIN, weight_MAX], {label: "testsúly [kg]:", step: 0.1, value: 97.4});
const view_weight = view(weight);
const fat_MIN = 0;
const fat_MAX = 250;
const Fat_percentage = Inputs.range([10, 30], {label: "BodyFat [%]:", step: 0.1, value: 25.7});
const view_Fat_percentage = view(Fat_percentage);


function MetComchart() {
	const margin = {top: 20, right: 220, bottom: 160, left: 20};
	const w = Math.min(width, 800) - margin.left - margin.right;
	const h = (w / 1.618 - margin.top - margin.bottom)+180;
	const x = d3.scaleLinear().domain([weight_MIN, weight_MAX]).rangeRound([0, w]);
	const y = d3.scaleLinear().domain([fat_MIN, fat_MAX]).rangeRound([h, 0]);
	const svg = d3.create('svg')
		.attr('width', w + margin.left + margin.right)
		.attr('height', h + margin.top + margin.bottom);
//		.attr('transform', 'translate(${margin.left}, ${margin.top})');


	area_7(); // background physically inactive (age>40)
/*	area_1(); // starving frail
	area_2(); // thin light
	area_6(); // heavy dense
	area_5(); // muscular bodybuilders
	area_3a(); // well-built athconstic
	area_3b(); // well-built athconstic
	//area_8(); // average fat / average weight /* it works, but...*/
/*
	TV_line();
	BF_line();
	LBM_line();

	grid_lines();

	area_4(); // ideal fat / average weight
	todayData( "#BCBCC4", '', 50); //szürke
/*
	const legend_Values_Vertical_rects = [
		["2","thin light"],
		["3","well-built athconstic"],
		["5","muscular bodybuilders"],
		["4","ideal fat / average weight"],
		//["8","average fat / average weight"],
		["6","heavy dense"],
		["7","physically inactive (age > 40)"],
		["1","starving frail"]];
	draw_legend_Vertical_rects(10,5,16,16,20,legend_Values_Vertical_rects);
	const legend_Values_Vertical_lines = [
		["TV_line","TV: Total Body Volume"],
		["BF_line","BF: Bodyfat curve"],
		["LBM_line","LBM curve"]];
	draw_legend_Vertical_lines(10,h-50,20,20,30,legend_Values_Vertical_lines);

	const title_CatAna = "CATABOLIC and ANABOLIC REGIONS";
	const legend_Values_CatAna = [
		["1","7","Bodyfat gain","LBM catabolism, FAT anabolism"],
		["3","5","Muscle gain","LBM anabolism, FAT catabolism"],
		[0,"2","Weight loss","LBM & FAT catabolism"],
		[0,"6","Weight gain","LBM & FAT anabolism"]];
	const title_Sheldon = "SHELDON\'s BODY TYPES";
	const legend_Values_Sheldon = [
		["7","6","ENDOMORPHIC","high bodyweight"],
		["3","5","MESOMORPHIC","low bodyfat percentage"],
		["1","2","ECTOMORPHIC","low bodyweight"]];

	draw_legend_Bottom_Horizontal(-20,30,16,16,22,20,title_CatAna,legend_Values_CatAna,75);
	draw_legend_Bottom_Horizontal(400,30,16,16,22,20,title_Sheldon,legend_Values_Sheldon,100);

	function evenNumbers(nums) {  
		const evens = new Array();
		for (const i = 0; i < nums.length-1; i++) {
			if ((nums[i] % 2) != 1) {
				evens.push(nums[i]);
			}
		}
		return evens;
	};
	/*using Devine equation*/
/*	
	function get_body_mass_ideal(gender) {
		const body_mass_ideal = 0.0;
		if(gender=="male"){
			body_mass_ideal = Math.round(50 + 2.3*((height/2.54)-60));
		}else{
			body_mass_ideal = Math.round(45.5 + 2.3*((height/2.54)-60));
		}
		return body_mass_ideal;
	}

	function TV_line() {
		const LineTV_intersect_Xaxis = calculateLineTV_intersect_Xaxis(fat_MIN);
		const area = d3.line()
			.defined(function(d) { 
				return weight_MIN <= d && d <= LineTV_intersect_Xaxis; 
			})
			.x(d => x(d))
			.y(d => Math.min(h, y(calculateLineTV(d))));
		g.append('path')
			.datum(x.ticks(100))
			.attr("class", "TV_line")
			.attr('d', area);
	}

	function BF_line() {
		const LineBF_intersect_Xaxis = calculateLineBF_intersect_Xaxis(fat_MIN);
		const area = d3.line()
			.defined(function(d) { 
				return LineBF_intersect_Xaxis <= d && d <= weight_MAX;
			})
			.x(d => x(d))
			.y(d => Math.min(h, y(calculateLineBF(d))));
		g.append('path')
			.datum(x.ticks(100))
			.attr('class', 'BF_line')
		.attr('d', area);
	}

	function LBM_line() {
		const area = d3.line()
			.defined(function(d) { 
				return weight_MIN < d && d <= weight_MAX; 
			})
			.x(d => x(d))
			.y(d => Math.min(h, y(calculateLineLBM(d))));
		g.append('path')
			.datum(x.ticks(100))
			.attr('class', 'LBM_line')
			.attr('d', area);
	}

	function area_1() {
		const area = d3.area()
			.defined(function(d) { 
				return weight_MIN <= d && d <= get_body_mass_ideal(gender); 
			})
			.x(d => x(d))
			.y0(h)
			.y1(d => Math.min(h, y(calculateLineTV(d))));
			g.append('path')
				.datum(x.ticks(100))
				.attr('d', area)
				.attr('class', 'area_1');
	}

	function area_2() {
		const area = d3.area()
			.defined(function(d) { 
				return weight_MIN <= d && d <= get_body_mass_ideal(gender); 
			})
			.x(d => x(d))
			.y0(h)
			.y1(d => Math.min(h, y(calculateLineLBM(d))));
		g.append('path')
			.datum(x.ticks(100))
			.attr('d', area)
			.attr('class', 'area_2');
	}

	function area_3a() {
		const area = d3.area()
			.defined(function(d) { 
				return weight_MIN <= d && d <= get_body_mass_ideal(gender); 
			})
			.x(d => x(d))
			.y0(h)
			.y1(d => Math.min(h, y(calculateLineBF(d))));
		g.append('path')
			.datum(x.ticks(100))
			.attr('d', area)
			.attr('class', 'area_3a');
	}

	function area_3b() {
		const area = d3.area()
			.defined(function(d) { 
				return get_body_mass_ideal(gender) <= d; 
			})
			.x(d => x(d))
			.y0(h)
			.y1(d => Math.min(h, y(calculateLineTV(d))));
		g.append('path')
			.datum(x.ticks(100))
			.attr('d', area)
			.attr('class', 'area_3b');
	}

	function area_4() {
		//const fat_ideal_returned = new Array();
		var fat_ideal_returned = get_fat_ideal_by_age_and_gender(Age);

		const poly = [
			{"x":get_weight_average_min(gender), "y":fat_ideal_returned["min"]},//fat_ideal.min},
			{"x":get_weight_average_max(gender),"y":fat_ideal_returned["min"]},
			{"x":get_weight_average_max(gender),"y":fat_ideal_returned["max"]},
			{"x":get_weight_average_min(gender),"y":fat_ideal_returned["max"]}];

		g.append("polygon")
			.data([poly])
			.attr('class', 'area_4')
			.attr("points",function(d) { 
				return d.map(function(d) {
					return [x(d.x),y(d.y)].join(",");
				}).join(" ");
			});
	}

	function area_8() {
		//const fat_average_returned = new Array();
		var fat_average_returned = get_fat_average_by_age_and_gender(Age);
		const poly = [
			{"x":get_weight_average_min(gender), "y":fat_average_returned["min"]},//fat_ideal.min},
			{"x":get_weight_average_max(gender),"y":fat_average_returned["min"]},
			{"x":get_weight_average_max(gender),"y":fat_average_returned["max"]},
			{"x":get_weight_average_min(gender),"y":fat_average_returned["max"]}];

		g.append("polygon")
			.data([poly])
			.attr('class', 'area_8')
			.attr("points",function(d) { 
				return d.map(function(d) {
					return [x(d.x),y(d.y)].join(",");
				}).join(" ");
			});
	}

	function area_5() {
		const area = d3.area()
			.defined(function(d) { 
				return get_body_mass_ideal(gender) <= d; 
			})
			.x(d => x(d))
			.y0(h)
			.y1(d => Math.min(h, y(calculateLineLBM(d))));
		g.append('path')
			.datum(x.ticks(100))
			.attr('d', area)
			.attr('class', 'area_5');
	}

	function area_6() {
		const area = d3.area()
			.defined(function(d) { 
				return get_body_mass_ideal(gender) <= d; 
			})
			.x(d => x(d))
			.y0(h)
			.y1(d => Math.min(h, y(calculateLineBF(d))));
		g.append('path')
			.datum(x.ticks(100))
			.attr('d', area)
			.attr('class', 'area_6');
	}

	function area_7() {
		const area_7 = g.append("rect")
			.attr('class', 'area_7')
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", w)
			.attr("height", h-margin.top);
	}

	function todayData(color, label, labelWeight){
		const point = {"x": weight, "y": Fat_percentage}
		g.append("circle")
			.attr("r", 5)
			.attr("cx", x(point.x))
			.attr("cy", y(point.y));
	}
	//Legned_Vertical_lines START /////////////////////////////////////////////////////////////////////////////
	function draw_legend_Vertical_lines(dx,dy,lineLength, dy_lines, dx_text,legend_Values) {
		const Legned_Vertical_lines = g.append('g')
			.attr("width", w).attr("height", h)
			.attr("transform","translate("+dx+"," + dy + ")");
		const legend_lines = Legned_Vertical_lines.selectAll('.legend_lines')
			.data(legend_Values)
			.enter().append('g')
			.attr("transform", function (d, i) {
				{ return "translate("+w+"," + (i * dy_lines) + ")" }
			});

		const legend_line = legend_lines.append("line")//making a line for legend
			.attr("class", function (d) {
				return d[0];
			})
			.attr("x1", 5)
			.attr("x2", lineLength)
			.attr("y1", 0)
			.attr("y2", 0);
		legend_lines.append("text")
			.attr("x", dx_text)
			.attr("y", 0)
			.attr("dy", ".35em")
			.style("text-anchor", "start")
			.style("font-size", "14px")
			.text(function (d) {
				return d[1]
			});
	}
	//Legned_Vertical_lines END /////////////////////////////////////////////////////////////////////////////
	//Legned_Vertical_rects START /////////////////////////////////////////////////////////////////////////////
	function draw_legend_Vertical_rects(dx,dy,rectHeight,rectWidth,dy_rect,legend_Values) {
		const Legned_Vertical_rects = g.append('g')
			.attr("width", w).attr("height", h)
			.attr("transform","translate("+dx+"," + dy + ")");
		const legend_rects = Legned_Vertical_rects.selectAll('.legend_rects')
			.data(legend_Values)
			.enter().append('g')
			.attr("transform", function (d, i) {
				{ return "translate("+w+"," + (i * dy_rect) + ")" }
			});
		const legend_rect = legend_rects.append('rect')
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", rectWidth)
		.attr("height", rectHeight)
		.attr("class", function (d) {
			return "area_" + d[0];
		})
		.attr("stroke", 'black');
		legend_rects.append('text')
			.attr("x", rectWidth/2)
			.attr("y", rectHeight/2)
			.attr("dy", ".35em")
			.style("text-anchor", "middle")
			.style("font-size", "12px")
			.style("font-weight", "bold")
			.text(function (d) {
				return d[0]
			});
		legend_rects.append('text')
			.attr("x", rectWidth + 10)
			.attr("y", rectHeight/2)
			.attr("dy", ".35em")
			.style("text-anchor", "start")
			.style("font-size", "14px")
			.text(function (d) {
				return d[1]
			});
	}
	//Legned_Vertical_rects END ///////////////////////////////////////////////////////////////////////////////
	// draw_legend_Bottom_Horizontal START ////////////////////////////////////////////////////////////////////
	function draw_legend_Bottom_Horizontal(dx,dy,rectHeight,rectWidth,dy_rect,dx_rects,title,legend_Values,dx_round_brackets) {
		const Legned_Bottom_Horizontal = g.append('g')
			.attr("width", w).attr("height", h + 20)
			.attr("transform","translate("+dx+"," + dy + ")");

		const Title = Legned_Bottom_Horizontal.append('text')
			.attr("x", 0)
			.attr("y", h+10)
			.attr("dy", ".35em")
			.style("text-anchor", "start")
			.style("font-size", "14px")
			.style("font-weight", "bold")
			.text(title);

		const Bottom_Horizontal_legend_rects = Legned_Bottom_Horizontal.selectAll('.Bottom_Horizontal_legend_rects')
			.data(legend_Values)
			.enter().append('g')
			.attr("transform", function (d, i) {
				{ return "translate("+0+"," + ((h+30)+(i * dy_rect)) + ")" }
			});

		const legend_rect_1 = Bottom_Horizontal_legend_rects.append('rect')
			.filter(function(d) {
				if (d[0] != 0) {
					return true; //This item will be included in the selection
				} else {
					return false; //This item will be excluded, e.g. "cheese"
				}
			})
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", rectWidth)
			.attr("height", rectHeight)
			.attr("class", function (d) {
				return "area_" + d[0];
			})
			.attr("stroke", 'black');

		Bottom_Horizontal_legend_rects.append('text')
			.filter(function(d) {
				if (d[0] != 0) {
					return true; //This item will be included in the selection
				} else {
					return false; //This item will be excluded, e.g. "cheese"
				}
			})
			.attr("x", rectWidth/2)
			.attr("y", rectHeight/2)
			.attr("dy", ".35em")
			.style("text-anchor", "middle")
			.style("font-size", "12px")
			.style("font-weight", "bold")
			.text(function (d) {
				return d[0]
			});
		Bottom_Horizontal_legend_rects.append('text')
			.attr("x", (2* rectWidth + dx_rects + dx_rects/2))
			.attr("y", rectHeight/2)
			.attr("dy", ".35em")
			.style("text-anchor", "middle")
			.style("font-size", "12px")
			.style("font-weight", "bold")
			.text(":");

		Bottom_Horizontal_legend_rects.append('text')
			.filter(function(d) {
				if (d[0] !== 0) {
					return true; //This item will be included in the selection
				} else {
					return false; //This item will be excluded, e.g. "cheese"
				}
			})
			.attr("x", (rectWidth + dx_rects/2))
			.attr("y", rectHeight/2)
			.attr("dy", ".35em")
			.style("text-anchor", "middle")
			.style("font-size", "12px")
			.style("font-weight", "bold")
			.text("&");//&

		const legend_rect_2 = Bottom_Horizontal_legend_rects.append('rect')
			.attr("x", rectWidth + dx_rects)
			.attr("y", 0)
			.attr("width", rectWidth)
			.attr("height", rectHeight)
			.attr("class", function (d) {
				return "area_" + d[1];
			})
			.attr("stroke", 'black');
		Bottom_Horizontal_legend_rects.append('text')
			.attr("x", (rectWidth + dx_rects) + rectWidth/2)
			.attr("y", rectHeight/2)
			.attr("dy", ".35em")
			.style("text-anchor", "middle")
			.style("font-size", "12px")
			.style("font-weight", "bold")
			.text(function (d) {
				return d[1]
			});
		Bottom_Horizontal_legend_rects.append('text')
			.attr("x", (2* rectWidth +  2 * dx_rects))
			.attr("y", rectHeight/2)
			.attr("dy", ".35em")
			.style("text-anchor", "start")
			.style("font-size", "12px")
			.style("font-weight", "bold")
			.text(function (d) {
				return d[2]
			});
		Bottom_Horizontal_legend_rects.append('text')
			.attr("x", (2* rectWidth +  2 * dx_rects)+dx_round_brackets)
			.attr("y", rectHeight/2)
			.attr("dy", ".35em")
			.style("text-anchor", "start")
			.style("font-size", "12px")
			.text(function (d) {
				return " ( "+d[3]+" )"
			});
	}
*/
	return svg.node();
}
/*
function get_weight_average_max(gender){
	const weight_average_max;
	if(gender=="male"){
		weight_average_max = (1.188*height - 128.39).toFixed(2)
	}else{
		weight_average_max = (0.9864*height - 100.34).toFixed(2)
	}
	return weight_average_max;
}
*/
/*
function get_weight_average_min(gender){
	const weight_average_min;
	if(gender=="male"){
		weight_average_min = (0.969*height - 104.44).toFixed(2)
	}else{
		weight_average_min = (0.8078*height - 82.221).toFixed(2)
	}
	return weight_average_min;
}
*/
/*
function get_fat_ideal_by_age_and_gender(Age){
	const fat_ideal = new Array();
	if(gender=="male"){
		switch (true) {
			case 18 <= Age && Age <= 20:
				fat_ideal["min"] = 6.2;
				fat_ideal["max"] = 12.5;
				break;
			case 20 < Age && Age <= 25:
				fat_ideal["min"] = 7.3;
				fat_ideal["max"] = 13.6;
				break;
			case 25 < Age && Age <= 30:
				fat_ideal["min"] = 10.6;
				fat_ideal["max"] = 16.4;
				break;
			case 30 < Age && Age <= 35:
				fat_ideal["min"] = 11.7;
				fat_ideal["max"] = 17.5;
				break;
			case 35 < Age && Age <= 40:
				fat_ideal["min"] = 12.7;
				fat_ideal["max"] = 18.6;
				break;
			case 40 < Age && Age <= 45:
				fat_ideal["min"] = 15.9;
				fat_ideal["max"] = 21.3;
				break;
			case 45 < Age && Age <= 50:
				fat_ideal["min"] = 16.9;
				fat_ideal["max"] = 22.4;
				break;
			case 51 <= Age && Age <= 55:
				fat_ideal["min"] = 18.0;
				fat_ideal["max"] = 23.4;
				break;
			case 55 < Age:
				fat_ideal["min"] = 19.1;
				fat_ideal["max"] = 24.5;
				break;
		}
	}else{
		switch (true) {
			case 18 <= Age && Age <= 20:
				fat_ideal["min"] = 17.7;
				fat_ideal["max"] = 21.5;
				break;
			case 20 < Age && Age <= 25:
				fat_ideal["min"] = 20.3;
				fat_ideal["max"] = 23.8;
				break;
			case 25 < Age && Age <= 30:
				fat_ideal["min"] = 20.9;
				fat_ideal["max"] = 24.5;
				break;
			case 30 < Age && Age <= 35:
				fat_ideal["min"] = 21.5;
				fat_ideal["max"] = 25.1;
				break;
			case 35 < Age && Age <= 40:
				fat_ideal["min"] = 24.0;
				fat_ideal["max"] = 27.3;
				break;
			case 40 < Age && Age <= 45:
				fat_ideal["min"] = 24.6;
				fat_ideal["max"] = 27.9;
				break;
			case 45 < Age && Age <= 50:
				fat_ideal["min"] = 25.2;
				fat_ideal["max"] = 28.6;
				break;
			case 51 <= Age && Age <= 55:
				fat_ideal["min"] = 25.9;
				fat_ideal["max"] = 29.2;
				break;
			case 55 < Age:
				fat_ideal["min"] = 26.5;
				fat_ideal["max"] = 29.8;
				break;
		}
	}
	return fat_ideal;
}
*/
/*
function get_fat_average_by_age_and_gender(Age){
	const fat_average = new Array();
	if(gender=="male"){
		switch (true) {
			case 18 <= Age && Age <= 20:
				fat_average["min"] = 14.3;
				fat_average["max"] = 18.9;
				break;
			case 20 < Age && Age <= 25:
				fat_average["min"] = 15.4;
				fat_average["max"] = 21.2;
				break;
			case 25 < Age && Age <= 30:
				fat_average["min"] = 18.1;
				fat_average["max"] = 22.3;
				break;
			case 30 < Age && Age <= 35:
				fat_average["min"] = 19.2;
				fat_average["max"] = 23.4;
				break;
			case 35 < Age && Age <= 40:
				fat_average["min"] = 20.2;
				fat_average["max"] = 24.4;
				break;
			case 40 < Age && Age <= 45:
				fat_average["min"] = 22.8;
				fat_average["max"] = 26.6;
				break;
			case 45 < Age && Age <= 50:
				fat_average["min"] = 23.9;
				fat_average["max"] = 27.7;
				break;
			case 51 <= Age && Age <= 55:
				fat_average["min"] = 25.0;
				fat_average["max"] = 28.7;
				break;
			case 55 < Age:
				fat_average["min"] = 26.0;
				fat_average["max"] = 30.8;
				break;
		}
	}else{
		switch (true) {
			case 18 <= Age && Age <= 20:
				fat_average["min"] = 23.2;
				fat_average["max"] = 29.0;
				break;
			case 20 < Age && Age <= 25:
				fat_average["min"] = 25.5;
				fat_average["max"] = 29.6;
				break;
			case 25 < Age && Age <= 30:
				fat_average["min"] = 26.1;
				fat_average["max"] = 31.5;
				break;
			case 30 < Age && Age <= 35:
				fat_average["min"] = 26.7;
				fat_average["max"] = 32.1;
				break;
			case 35 < Age && Age <= 40:
				fat_average["min"] = 28.8;
				fat_average["max"] = 32.7;
				break;
			case 40 < Age && Age <= 45:
				fat_average["min"] = 29.4;
				fat_average["max"] = 34.4;
				break;
			case 45 < Age && Age <= 50:
				fat_average["min"] = 30.1;
				fat_average["max"] = 35.0;
				break;
			case 51 <= Age && Age <= 55:
				fat_average["min"] = 30.7;
				fat_average["max"] = 35.6;
				break;
			case 55 < Age:
				fat_average["min"] = 31.3;
				fat_average["max"] = 37.2;
				break;
		}
	}
	return fat_average;
}
*/
/*
function get_fat_perc_average(Age){
	const fat_perc_average, fat_ideal;
	var fat_ideal = get_fat_ideal_by_age_and_gender(Age);
	var fat_perc_average = (fat_ideal["max"] + fat_ideal["min"])/2;
	return fat_perc_average;
}
*/
/*
function fat_mass_average() {
	const fat_perc_average = get_fat_perc_average(Age);
	return (fat_perc_average / 100)*get_body_mass_ideal(gender);
}
*/
/*
var weight_MIN = Math.round(get_body_mass_ideal(gender) - 15);
var weight_MAX = Math.round(get_body_mass_ideal(gender) + 15);
var fat_MIN = Math.round(get_fat_perc_average(Age)-11);
var fat_MAX = Math.round(get_fat_perc_average(Age)+11);
*/
/*
function lean_mass_average(){
	const lean_mass_ideal;
	const fat_perc_average = get_fat_perc_average(Age);
	return lean_mass_ideal - ( (fat_perc_average / 100)*get_body_mass_ideal(gender) );
}
*/
/*
const data_adults_weight_to_height_ratio = [
	["4'6\"",  "137", "63-77", "28.5-34.9", "63-77", "28.5-34.9"],
	["4'7\"",  "140", "68-83", "30.8-37.6", "68-84", "30.8-38.1"],
	["4'8\"",  "142", "72-88", "32.6-39.9", "74-90", "33.5-40.8"],
	["4'9\"",  "145", "77-94", "30.8-37.6", "79-97", "35.8-43.9"],
	["4'10\"",  "147", "81-99", "36.4-44.9", "85-103", "38.5-46.7"],
	["4'11\"",  "150", "86-105", "39.0-47.6", "99-110", "40.8-49.9"],
	["5'0\"",  "152", "90-110", "40.8-49.9", "95-117", "43.1-53.0"],
	["5'1\"",  "155", "95-116", "43.1-52.6", "101-123", "45.8-55.8"],
	["5'2\"",  "157", "99-121", "44.9-54.9", "106-130", "48.1-58.9"],
	["5'3\"",  "160", "104-127", "47.2-57.6", "112-136", "50.8-61.6"],
	["5'4\"",  "163", "108-132", "49.0-59.9", "117-143", "53.0-64.8"],
	["5'5\"",  "165", "113-138", "51.2-62.6", "122-150", "55.3-68.0"],
	["5'6\"",  "168", "117-143", "53.0-64.8", "128-156", "58.0-70.7"],
	["5'7\"",  "170", "122-149", "55.3-67.6", "133-163", "60.3-73.9"],
	["5'8\"",  "173", "126-154", "57.1-69.8", "139-169", "63.0-76.6"],
	["5'9\"",  "175", "131-160", "59.4-72.6", "144-176", "65.3-79.8"],
	["5'10\"",  "178", "135-165", "61.2-74.8", "149-183", "67.6-83.0"],
	["5'11\"",  "180", "140-171", "63.5-77.5", "155-189", "70.3-85.7"],
	["6'0\"",  "183", "144-176", "65.3-79.8", "160-196", "72.6-88.9"],
	["6'1\"",  "185", "149-182", "67.6-82.5", "166-202", "75.3-91.6"],
	["6'2\"",  "188", "153-187", "69.4-84.8", "171-209", "77.5-94.8"],
	["6'3\"",  "191", "158-193", "71.6-87.5", "176-216", "79.8-98.0"],
	["6'4\"",  "193", "162-198", "73.5-89.8", "182-222", "82.5-100.6"],
	["6'5\"",  "195", "167-204", "75.7-92.5", "187-229", "84.8-103.8"],
	["6'6\"",  "198", "171-209", "77.5-94.8", "193-235", "87.5-106.5"],
	["6'7\"",  "201", "176-215", "79.8-97.5", "198-242", "89.8-109.7"],
	["6'8\"",  "203", "180-220", "81.6-99.8", "203-249", "92.0-112.9"],
	 ["6'9\"",  "205", "185-226", "83.9-102.5", "209-255", "94.8-115.6"],
	["6'10\"",  "208", "189-231", "85.7-104.8", "214-262", "97.0-118.8"],
	["6'11\"",  "210", "194-237", "88.0-107.5", "220-268", "99.8-121.5"],
	["7'0\"",  "213", "198-242", "89.8-109.7", "225-275", "102.0-124.7"]
]
*/
/*
function LineTV_correction() {
	const fat_perc_average = get_fat_perc_average(Age);
	const weight_X = ( 495 / ( fat_perc_average + 450 ) ) * 83;
	const TV_correction = get_body_mass_ideal(gender) - weight_X;
	if(TV_correction <= 0){
		TV_correction = Math.abs(TV_correction);
	}else{
		TV_correction = -Math.abs(TV_correction);
	}
	return TV_correction;
}
*/
/*
function calculateLineTV(weight_axis_data) {
	return (495 / ((weight_axis_data+LineTV_correction()) / 83) - 450 );
}
*/
/*
function calculateLineTV_intersect_Xaxis(y) {
	return (((495 - y)/450)*83)-LineTV_correction()
}
*/
/*
function calculateLineLBM(weight_axis_data) {
  return (fat_mass_average() / weight_axis_data)*100;
}
*/
/*
function calculateLineBF(weight_axis_data) {
	const fat_perc_average = get_fat_perc_average(Age);
	const lean_mass_average = get_body_mass_ideal(gender) - ( (fat_perc_average / 100)*get_body_mass_ideal(gender) );
	return (( weight_axis_data - lean_mass_average ) / weight_axis_data ) * 100;
}
*/
/*
function calculateLineBF_intersect_Xaxis(y){
	const fat_perc_average = get_fat_perc_average(Age);
	const lean_mass_average = get_body_mass_ideal(gender) - ( (fat_perc_average / 100)*get_body_mass_ideal(gender) );
	return (lean_mass_average*100)/(100-y);
}
*/
/*
function append(element, input, update) {
	element.append(input);
	input.addEventListener("input", update);
}
*/
```

${MetComchart()}

# The Devine equation
(IBW: ideal body weight)

Women: IBW [kg] = 45.5 kg + 2.3 kg × (height[in] - 60)

Men: IBW [kg] = 50 kg + 2.3 kg × (height[in] - 60)

1 in = 2,54 cm


# male

( Using regression line equation of "Adults Weight to Height Ratio Chart" found later down...)

weight_average_max = 1,188*height - 128,39

weight_average_min = 0,969*height - 104,44

# female
weight_average_max = 0,9864*height - 100,34

weight_average_min = 0,8078*height - 82,221


<h1>Data used</h1>

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:12px;padding:1px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;text-align:center;vertical-align:middle}
.tg td{font-weight:bold;}
.td_blue{background-color:#1E90FF;}
.td_green{background-color:#32CD32;}
.td_yellow{background-color:#FFFF00;}
.td_red{background-color:#FF0000;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:bold;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-th{text-align:center;vertical-align:middle}
</style>
<h2>MEN</h2>
<table class="tg">
  <tr>
    <th class="tg-th">AGE</th><th class="tg-th" colspan=17>BODY FAT for MEN [%]</th>
  </tr>
  <tr>
    <td>18-20</td>
    <td class="td_blue">2.0</td>
      <td class="td_blue">3.9</td>
    <td class="td_green">6.2</td>
    <td class="td_green">8.5</td><td class="td_green">10.5</td><td class="td_green">12.5</td>
    <td class="td_yellow">14.3</td>
      <td class="td_yellow">16.0</td><td class="td_yellow">17.5</td><td class="td_yellow">18.9</td>
    <td class="td_red">20.2</td>
      <td class="td_red">21.3</td><td class="td_red">22.3</td><td class="td_red">23.1</td>
      <td class="td_red">23.8</td><td class="td_red">24.3</td><td class="td_red">24.9</td>
  </tr>
  <tr>
    <td>21-25</td>
    <td class="td_blue">2.5</td>
      <td class="td_blue">4.9</td>
    <td class="td_green">7.3</td>
      <td class="td_green">9.5</td>
      <td class="td_green">11.6</td>
      <td class="td_green">13.6</td>
    <td class="td_yellow">15.4</td>
        <td class="td_yellow">17.0</td>
        <td class="td_yellow">18.6</td>
        <td class="td_yellow">20.0</td>
        <td class="td_yellow">21.2</td>
    <td class="td_red">22.3</td>
      <td class="td_red">23.3</td>
      <td class="td_red">24.2</td>
      <td class="td_red">24.9</td>
      <td class="td_red">25.4</td>
      <td class="td_red">25.8</td>
  </tr>
  <tr>
    <td>26-30</td>
    <td class="td_blue">3.5</td>
      <td class="td_blue">6.0</td>
      <td class="td_blue">8.4</td>
    <td class="td_green">10.6</td>
      <td class="td_green">12.7</td>
      <td class="td_green">14.6</td>
      <td class="td_green">16.4</td>
    <td class="td_yellow">18.1</td>
      <td class="td_yellow">19.6</td>
      <td class="td_yellow">21.0</td>
      <td class="td_yellow">22.3</td>
    <td class="td_red">23.4</td>
      <td class="td_red">24.4</td>
      <td class="td_red">25.2</td>
      <td class="td_red">25.9</td>
      <td class="td_red">26.5</td>
      <td class="td_red">26.9</td>
  </tr>
  <tr>
    <td>31-35</td>
    <td class="td_blue">4.5</td>
      <td class="td_blue">7.1</td>
      <td class="td_blue">9.4</td>
    <td class="td_green">11.7</td>
      <td class="td_green">13.7</td>
      <td class="td_green">15.7</td>
      <td class="td_green">17.5</td>
    <td class="td_yellow">19.2</td>
      <td class="td_yellow">20.7</td>
      <td class="td_yellow">22.1</td>
      <td class="td_yellow">23.4</td>
    <td class="td_red">24.5</td>
      <td class="td_red">25.5</td>
      <td class="td_red">26.3</td>
      <td class="td_red">27.0</td>
      <td class="td_red">27.5</td>
      <td class="td_red">28.0</td>
  </tr>
  <tr>
    <td>36-40</td>
    <td class="td_blue">5.6</td>
      <td class="td_blue">8.1</td>
      <td class="td_blue">10.5</td>
    <td class="td_green">12.7</td>
      <td class="td_green">14.8</td>
      <td class="td_green">16.8</td>
      <td class="td_green">18.6</td>
    <td class="td_yellow">20.2</td>
      <td class="td_yellow">21.8</td>
      <td class="td_yellow">23.2</td>
      <td class="td_yellow">24.4</td>
    <td class="td_red">25.6</td>
      <td class="td_red">26.5</td>
      <td class="td_red">27.4</td>
      <td class="td_red">28.1</td>
      <td class="td_red">28.6</td>
      <td class="td_red">29.0</td>
  </tr>
  <tr>
    <td>41-45</td>
    <td class="td_blue">6.7</td>
      <td class="td_blue">9.2</td>
      <td class="td_blue">11.5</td>
      <td class="td_blue">13.8</td>
    <td class="td_green">15.9</td>
      <td class="td_green">17.8</td>
      <td class="td_green">19.6</td>
      <td class="td_green">21.3</td>
    <td class="td_yellow">22.8</td>
      <td class="td_yellow">24.7</td>
      <td class="td_yellow">25.5</td>
      <td class="td_yellow">26.6</td>
    <td class="td_red">27.6</td>
      <td class="td_red">28.4</td>
      <td class="td_red">29.1</td>
      <td class="td_red">29.7</td>
      <td class="td_red">30.1</td>
  </tr>
  <tr>
    <td>46-50</td>
    <td class="td_blue">7.7</td>
      <td class="td_blue">10.2</td>
      <td class="td_blue">12.6</td>
      <td class="td_blue">14.8</td>
    <td class="td_green">16.9</td>
      <td class="td_green">18.9</td>
      <td class="td_green">20.7</td>
      <td class="td_green">22.4</td>
    <td class="td_yellow">23.9</td>
      <td class="td_yellow">25.3</td>
      <td class="td_yellow">26.6</td>
      <td class="td_yellow">27.7</td>
    <td class="td_red">28.7</td>
      <td class="td_red">29.5</td>
      <td class="td_red">30.2</td>
      <td class="td_red">30.7</td>
      <td class="td_red">31.2</td>
  </tr>
  <tr>
    <td>51-55</td>
    <td class="td_blue">8.8</td>
      <td class="td_blue">11.3</td>
      <td class="td_blue">13.7</td>
      <td class="td_blue">15.9</td>
    <td class="td_green">18.0</td>
      <td class="td_green">20.0</td>
      <td class="td_green">21.8</td>
      <td class="td_green">23.4</td>
    <td class="td_yellow">25.0</td>
      <td class="td_yellow">26.4</td>
      <td class="td_yellow">27.6</td>
      <td class="td_yellow">28.7</td>
    <td class="td_red">29.7</td>
      <td class="td_red">30.6</td>
      <td class="td_red">31.2</td>
      <td class="td_red">31.8</td>
      <td class="td_red">32.2</td>
  </tr>
  <tr>
    <td>56 & UP</td>
    <td class="td_blue">9.9</td>
      <td class="td_blue">12.4</td>
      <td class="td_blue">14.7</td>
      <td class="td_blue">17.0</td>
    <td class="td_green">19.1</td>
      <td class="td_green">21.0</td>
      <td class="td_green">22.8</td>
      <td class="td_green">24.5</td>
    <td class="td_yellow">26.0</td>
      <td class="td_yellow">27.4</td>
      <td class="td_yellow">28.7</td>
      <td class="td_yellow">29.8</td>
      <td class="td_yellow">30.8</td>
    <td class="td_red">31.6</td>
      <td class="td_red">32.3</td>
      <td class="td_red">32.9</td>
      <td class="td_red">33.3</td>
  </tr>
  <tr>
    <td></td>
    <td class="td_blue" colspan=4>LEAN</td>
    <td class="td_green" colspan=4>IDEAL</td>
    <td class="td_yellow" colspan=5>AVERAGE</td>
    <td class="td_red" colspan=4>ABOVE AVERAGE</td>
  </tr>
</table>
<br />
<h2>WOMEN</h2>
<table class="tg">
  <tr>
    <th class="tg-th">AGE</th><th class="tg-th" colspan=17>BODY FAT for WOMEN [%]</th>
  </tr>
  <tr>
    <td>18-20</td>
    <td class="td_blue">11.3</td>
      <td class="td_blue">13.5</td>
      <td class="td_blue">15.7</td>
    <td class="td_green">17.7</td>
      <td class="td_green">19.7</td>
      <td class="td_green">21.5</td>
    <td class="td_yellow">23.2</td>
      <td class="td_yellow">24.8</td>
      <td class="td_yellow">26.3</td>
      <td class="td_yellow">27.7</td>
      <td class="td_yellow">29.0</td>
    <td class="td_red">30.2</td>
      <td class="td_red">31.3</td>
      <td class="td_red">32.3</td>
      <td class="td_red">33.1</td>
      <td class="td_red">33.9</td>
      <td class="td_red">34.6</td>
  </tr>
  <tr>
    <td>21-25</td>
    <td class="td_blue">11.9</td>
      <td class="td_blue">14.2</td>
      <td class="td_blue">16.3</td>
      <td class="td_blue">18.4</td>
    <td class="td_green">20.3</td>
      <td class="td_green">22.1</td>
      <td class="td_green">23.8</td>
    <td class="td_yellow">25.5</td>
      <td class="td_yellow">27.0</td>
      <td class="td_yellow">28.4</td>
      <td class="td_yellow">29.6</td>
    <td class="td_red">30.8</td>
      <td class="td_red">31.9</td>
      <td class="td_red">32.9</td>
      <td class="td_red">33.8</td>
      <td class="td_red">34.5</td>
      <td class="td_red">35.2</td>
  </tr>
  <tr>
    <td>26-30</td>
    <td class="td_blue">12.5</td>
      <td class="td_blue">14.8</td>
      <td class="td_blue">16.9</td>
      <td class="td_blue">19.0</td>
    <td class="td_green">20.9</td>
      <td class="td_green">22.7</td>
      <td class="td_green">24.5</td>
    <td class="td_yellow">26.1</td>
      <td class="td_yellow">27.6</td>
      <td class="td_yellow">29.0</td>
      <td class="td_yellow">30.3</td>
      <td class="td_yellow">31.5</td>
    <td class="td_red">32.5</td>
      <td class="td_red">33.5</td>
      <td class="td_red">34.4</td>
      <td class="td_red">35.2</td>
      <td class="td_red">35.8</td>
  </tr>
  <tr>
    <td>31-35</td>
    <td class="td_blue">13.2</td>
      <td class="td_blue">15.4</td>
      <td class="td_blue">17.6</td>
      <td class="td_blue">19.6</td>
    <td class="td_green">21.5</td>
      <td class="td_green">23.4</td>
      <td class="td_green">25.1</td>
    <td class="td_yellow">26.7</td>
      <td class="td_yellow">28.2</td>
      <td class="td_yellow">28.6</td>
      <td class="td_yellow">30.9</td>
      <td class="td_yellow">32.1</td>
    <td class="td_red">33.2</td>
      <td class="td_red">34.1</td>
      <td class="td_red">35.0</td>
      <td class="td_red">35.8</td>
      <td class="td_red">36.4</td>
  </tr>
  <tr>
    <td>36-40</td>
    <td class="td_blue">13.8</td>
      <td class="td_blue">16.0</td>
      <td class="td_blue">18.2</td>
      <td class="td_blue">20.2</td>
      <td class="td_blue">22.2</td>
    <td class="td_green">24.0</td>
      <td class="td_green">25.7</td>
      <td class="td_green">27.3</td>
    <td class="td_yellow">28.8</td>
      <td class="td_yellow">30.2</td>
      <td class="td_yellow">31.5</td>
      <td class="td_yellow">32.7</td>
    <td class="td_red">33.8</td>
      <td class="td_red">34.8</td>
      <td class="td_red">35.6</td>
      <td class="td_red">36.4</td>
      <td class="td_red">37.0</td>
  </tr>
  <tr>
    <td>41-45</td>
    <td class="td_blue">14.4</td>
      <td class="td_blue">16.7</td>
      <td class="td_blue">18.8</td>
      <td class="td_blue">20.8</td>
      <td class="td_blue">22.8</td>
    <td class="td_green">24.6</td>
      <td class="td_green">26.3</td>
      <td class="td_green">27.9</td>
    <td class="td_yellow">29.4</td>
      <td class="td_yellow">30.8</td>
      <td class="td_yellow">32.1</td>
      <td class="td_yellow">33.3</td>
      <td class="td_yellow">34.4</td>
    <td class="td_red">35.4</td>
      <td class="td_red">36.3</td>
      <td class="td_red">37.0</td>
      <td class="td_red">37.7</td>
  </tr>
  <tr>
    <td>46-50</td>
    <td class="td_blue">15.0</td>
      <td class="td_blue">17.3</td>
      <td class="td_blue">19.4</td>
      <td class="td_blue">21.5</td>
      <td class="td_blue">23.4</td>
    <td class="td_green">25.2</td>
      <td class="td_green">26.9</td>
      <td class="td_green">28.6</td>
    <td class="td_yellow">30.1</td>
      <td class="td_yellow">31.5</td>
      <td class="td_yellow">32.8</td>
      <td class="td_yellow">34.0</td>
      <td class="td_yellow">35.0</td>
    <td class="td_red">36.0</td>
      <td class="td_red">36.9</td>
      <td class="td_red">37.6</td>
      <td class="td_red">38.3</td>
  </tr>
  <tr>
    <td>51-55</td>
    <td class="td_blue">15.6</td>
      <td class="td_blue">17.9</td>
      <td class="td_blue">20.0</td>
      <td class="td_blue">22.1</td>
      <td class="td_blue">24.0</td>
    <td class="td_green">25.9</td>
      <td class="td_green">27.6</td>
      <td class="td_green">29.2</td>
    <td class="td_yellow">30.7</td>
      <td class="td_yellow">32.1</td>
      <td class="td_yellow">33.4</td>
      <td class="td_yellow">34.6</td>
      <td class="td_yellow">35.6</td>
    <td class="td_red">36.6</td>
      <td class="td_red">37.5</td>
      <td class="td_red">38.3</td>
      <td class="td_red">38.9</td>
  </tr>
  <tr>
    <td>56 & UP</td>
    <td class="td_blue">16.3</td>
      <td class="td_blue">18.5</td>
      <td class="td_blue">20.7</td>
      <td class="td_blue">22.7</td>
      <td class="td_blue">24.6</td>
    <td class="td_green">26.5</td>
      <td class="td_green">28.2</td>
      <td class="td_green">29.8</td>
    <td class="td_yellow">31.3</td>
      <td class="td_yellow">32.7</td>
      <td class="td_yellow">34.0</td>
      <td class="td_yellow">35.2</td>
      <td class="td_yellow">36.3</td>
      <td class="td_yellow">37.2</td>
    <td class="td_red">38.1</td>
      <td class="td_red">38.9</td>
      <td class="td_red">39.5</td>
  </tr>
  <tr>
    <td></td>
    <td class="td_blue" colspan=5>LEAN</td>
    <td class="td_green" colspan=3>IDEAL</td>
    <td class="td_yellow" colspan=6>AVERAGE</td>
    <td class="td_red" colspan=3>ABOVE AVERAGE</td>
  </tr>
</table>

---

<style>
/*
input[type="radio"] {
    -ms-transform: scale(1.2); /* IE 9 */
    -webkit-transform: scale(1.2); /* Chrome, Safari, Opera */
    transform: scale(1.2);
}
*/
.grid line {
  stroke: #c0c0c0;
}

.minor line {
  stroke-opacity: .5;
}

.grid text {
  display: none;
}

.axis line {
  stroke: #000;
}

.axis path,
.grid path {
  display: none;
}

.TV_line {
  fill: none;
  stroke: black;
  stroke-width: 3px;
}
.BF_line {
  fill: none;
  stroke: blue;
  stroke-width: 3px;
}
.LBM_line {
  fill: none;
  stroke: red;
  stroke-width: 3px;
}

.area_1 {
  fill: #fefde1;
  opacity: 1.0;
}
.area_2 {
  fill: #d9f08b;
  opacity: 1.0;
}
.area_3 {
  fill: #97DD47;
  opacity: 1.0;
}
.area_3a {
  fill: #97DD47;
  opacity: 1.0;
}
.area_3b {
  fill: #97DD47;
  opacity: 1.0;
}
.area_3b_line {
  fill: none;
  stroke: steelblue;
  stroke-width: 4px;
}
.area_4 {
  fill: transparent;
  opacity: 1.0;
  stroke: black;
  stroke-width: 1px;
}
.area_8 {
  fill: #e5e5e6;
  opacity: 0.5;
  stroke: black;
}
.area_5 {
  fill: #1a9850;
  opacity: 1.0;
}
.area_6 {
  fill: #f46d43;
  opacity: 1.0;
}
.area_7 {
  fill: #fee08b;
  opacity: 1.0;
}

#table_adults_weight_to_height_ratio tr:nth-child(even) {background-color: #f2f2f2;}
#table_adults_weight_to_height_ratio th, td{
  text-align: center;
}
</style>
