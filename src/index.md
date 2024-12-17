---
toc: false
---

<div class="hero">
  <h1>KosAk</h1>
  <h2>Welcome to your new app!</h2>
  <!--h2>Welcome to your new app! Edit&nbsp;<code style="font-size: 90%;">src/index.md</code> to change this page.</h2-->
  <!--a href="https://observablehq.com/framework/getting-started">Get started<span style="display: inline-block; margin-left: 0.25rem;">↗︎</span></a-->
</div>

---

```js
const shots = FileAttachment("data/shots.csv").csv({typed: true});
```

```js
function markings({
  stroke = "currentColor",
  strokeWidth = 1,
  strokeOpacity = 1
} = {}) {
  // Ref. https://observablehq.com/@nor/nba-2018-19-shooting-effeciency
  const angle = Math.atan(90 / 220);
  const arc = d3.arc();
  const lines = [
    [-250, 420, 250, 420], // half
    [-250, 450, -250, -50], // left
    [250, 450, 250, -50], // right
    [250, -50, -250, -50], // bottom
    [-220, -50, -220, 90], // corner 3
    [220, -50, 220, 90], // corner 3
    [-80, -50, -80, 140], // paint
    [80, -50, 80, 140], // paint
    [-60, -50, -60, 140], // paint
    [60, -50, 60, 140], // paint
    [-80, 140, 80, 140], // free throw line
    [-30, -10, 30, -10], // backboard
    [0, -10, 0, -7.5], // rim
    [-40, -10, -40, 0], // ra
    [40, -10, 40, 0] // ra    
  ];
  const circles = [
    [0, 0, 7.5],  // rim
    [0, 140, 60],  // key
    [0, 420, 20],  // center court inner
    [0, 420, 60]  // center court outer
  ];
  const arcs = [
    [0, 0, 40, -Math.PI * 0.5, Math.PI * 0.5], // ra
    [0, 0, 237.5, -Math.PI * 0.5 - angle, Math.PI * 0.5 + angle] // 3pt
  ];
  return (index, {x, y}) => {
    return htl.svg`<g fill=none stroke=${stroke} stroke-width=${strokeWidth} stroke-opacity=${strokeOpacity}>
      ${lines.map(([x1, y1, x2, y2]) => htl.svg`<line x1=${x(x1)} x2=${x(x2)} y1=${y(y1)} y2=${y(y2)}>`)}
      ${circles.map(([cx, cy, r]) => htl.svg`<ellipse cx=${x(cx)} cy=${y(cy)} rx=${Math.abs(x(r) - x(0))} ry=${Math.abs(y(r) - y(0))}>`)}
      ${arcs.map(([cx, cy, r, a1, a2]) => htl.svg`<path d="M${x(cx + r * Math.cos(a1 - Math.PI / 2))},${y(cy + r * Math.sin(a1 - Math.PI / 2))}A${Math.abs(x(r) - x(0))} ${Math.abs(y(r) - y(0))} 0 0 ${Math.sign(x(r) - x(0)) * Math.sign(y(r) - y(0)) > 0 ? 0 : 1} ${x(cx + r * Math.cos(a2 - Math.PI / 2))},${y(cy + r * Math.sin(a2 - Math.PI / 2))}">`)}
    </g>`;
  };
}
```

## LeBron James’ shots (2003-2024)
<!--div class="card" style="display: flex; flex-direction: column; gap: 1rem;max-width: 640px;"-->
<!--https://observablehq.com/@observablehq/plot-lebron-james-shots-->

<!--div class="card">
  ${resize((width) => Plot.plot({
  }))}
</div-->
  
<div class="card center">
  ${resize((width) => Plot.plot({
    height: 640,
    axis: null,
    x: {domain: [-250, 250]},
    y: {domain: [-50, 450]},
    color: {type: "log", scheme: "ylgnbu", legend: true, label: "Made shots"},
    marks: [
      Plot.rect(shots, Plot.bin({fill: "count"}, {x: "loc_x", y: "loc_y", filter: d => +d.shot_made_flag, inset: 0, interval: 5})),
      Plot.gridX({interval: 5, strokeOpacity: 0.05}),
      Plot.gridY({interval: 5, strokeOpacity: 0.05}),
      markings()
    ]
  }))}
</div>

<!--div id="observablehq-ff7a90f4"></div>
<p>Credit: <a href="https://observablehq.com/d/db0a303ce8c90c89">LeBron James shot chart by Mitchell Thorson</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/db0a303ce8c90c89.js?v=4";
new Runtime().module(define, Inspector.into("#observablehq-ff7a90f4"));
</script-->

---

<div class="grid grid-cols-2" style="grid-auto-rows: 504px;">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Your awesomeness over time 🚀",
      subtitle: "Up and to the right!",
      width,
      y: {grid: true, label: "Awesomeness"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(aapl, {x: "Date", y: "Close", tip: true})
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "How big are penguins, anyway? 🐧",
      width,
      grid: true,
      x: {label: "Body mass (g)"},
      y: {label: "Flipper length (mm)"},
      color: {legend: true},
      marks: [
        Plot.linearRegressionY(penguins, {x: "body_mass_g", y: "flipper_length_mm", stroke: "species"}),
        Plot.dot(penguins, {x: "body_mass_g", y: "flipper_length_mm", stroke: "species", tip: true})
      ]
    }))
  }</div>
</div>

---

<!--div class="grid grid-cols-4">
  <div class="card">
    Chart your own data using <a href="https://observablehq.com/framework/lib/plot"><code>Plot</code></a> and <a href="https://observablehq.com/framework/files"><code>FileAttachment</code></a>. Make it responsive using <a href="https://observablehq.com/framework/javascript#resize(render)"><code>resize</code></a>.
  </div>
  <div class="card">
    Create a <a href="https://observablehq.com/framework/project-structure">new page</a> by adding a Markdown file (<code>whatever.md</code>) to the <code>src</code> folder.
  </div>
  <div class="card">
    Add a drop-down menu using <a href="https://observablehq.com/framework/inputs/select"><code>Inputs.select</code></a> and use it to filter the data shown in a chart.
  </div>
  <div class="card">
    Write a <a href="https://observablehq.com/framework/loaders">data loader</a> that queries a local database or API, generating a data snapshot on build.
  </div>
  <div class="card">
    Import a <a href="https://observablehq.com/framework/imports">recommended library</a> from npm, such as <a href="https://observablehq.com/framework/lib/leaflet">Leaflet</a>, <a href="https://observablehq.com/framework/lib/dot">GraphViz</a>, <a href="https://observablehq.com/framework/lib/tex">TeX</a>, or <a href="https://observablehq.com/framework/lib/duckdb">DuckDB</a>.
  </div>
  <div class="card">
    Ask for help, or share your work or ideas, on our <a href="https://github.com/observablehq/framework/discussions">GitHub discussions</a>.
  </div>
  <div class="card">
    Visit <a href="https://github.com/observablehq/framework">Framework on GitHub</a> and give us a star. Or file an issue if you’ve found a bug!
  </div>
</div-->

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

  .center {
  display: flex;
  align-items: center;
  justify-content: center;
    text-align: center; /*  center out item horizontally  */
  }
  
  .box-2 {
    width: ${width}px;
    display: flex; /* make the container div to make it a flex item. */
    justify-content: center; /*  center out item horizontally  */
  }
  .box-2 h2 {
    display: inline-block;
  }
  
@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

</style>
