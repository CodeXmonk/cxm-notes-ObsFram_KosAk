---
title: 01 KosAk probléma
---

# Ellenőrző bemutató

Nézzük meg, működik-e!?

## Technológia (tervezett)

<div class="caution">
Alkalmazott full-stack:
<ol>
  <li>Front-end:
    <ol>
      <li>tipográfia
        <ol>
          <li>markdown</li>
          <li>HTML</li>
          <li>css (src/custom-style.css)</li>
        </ol>
      </li>
      <li>grafikus lehetőségek
        <ol>
          <li>ObservableHQ</li>
          <li>d3.js</li>
        </ol>
      </li>
    </ol>
  </li>
  <li>Back-end:
    <ol>
      <li>javascript</li>
      <li>vagy más!?</li>
    </ol>
  </li>
</ol> 
</div>

## Tipográfia (minimal teszt)

<div class="tip">
  <span style="color:greenyellow">Tipográfia teszt:</span>
  <!--Árvíztűrő tükörfúrógép.<br-->
  <span style="color:aqua">Á</span>
  <span style="color:red">r</span>
  <span style="color:royalblue">v</span>
  <span style="color:yellowgreen">í</span>
  <span style="color:seagreen">z</span>
  <span style="color:gold">T</span>
  <span style="color:crimson">ű</span>
  <span style="color:magenta">r</span>
  <span style="color:peru">ő</span>
  <span>-</span>
  <span style="color:skyblue">T</span>
  <span style="color:lime">ü</span>
  <span style="color:darksalmon">k</span>
  <span style="color:wheat">ö</span>
  <span style="color:ghostwhite">r</span>
  <span style="color:lightskyblue">F</span>
  <span style="color:springgrean">ú</span>
  <span style="color:red">r</span>
  <span style="color:mediumpurple">ó</span>
  <span style="color:orange">g</span>
  <span style="color:greenyellow">é</span>
  <span style="color:khaki">p</span>
</div>

## A folyamat eddig - lépések/döntések

```mermaid
graph TD
   A(BANDI<br>Cikket talál.) --> B{Bandi -> Jozsónak<br>Értelmezhető ez a cikk?}
   B -->|Nem| H(<span style="color:red">Ebből nem lesz semmi...</span>)
   B -->|Igen| C{Bandi -> Jozsónak<br>Jozsó -> Bandinak<br>Programozható ez a feladat a cikk alapján?} -->|Nem| G(Bandi és Jozsó:<br>Használata nem praktikus.) --> H
   C -->|Igen| D{Applikáció?} -->|NEM létezik.| I(Írjunk egyet!)
   D -->|Létezik!?| F(Használjuk azt!<br>DE SAJNA NINCS!)
   F --> I
   I --> J{<span style="color:yellow">próba 1:</span><br>Excel}
   J -->|Más megoldás!| L{<span style="color:yellow">próba 2:</span><br>Python -> PySimpleGUI}
   J -->|Nem lesz jó.<br>Rosszul karbantartható.| K(Microsoft változtat valamit és elszáll az egész...)
   L -->|Jó lesz!<br>de vmi nem stimmel<br>Programhiba?| M{<span style="color:yellow">próba 3:</span><br>Python CLI}
   L -->|Jó lesz!<br>de vmi nem stimmel| N{Probléma az AlapAdatokkal?}
   M -->|Működik<br>Ugyanaz a hiba| N
   M -->|Működik, de csináljuk másként| O{<span style="color:yellow">próba 4:</span><br>Observable Framework<br>HTML<br>Markdown<br>javascript}
   O -->|Működik<br>Ugyanaz a hiba| N
   O -->|Működik<br>Ez lehet a használható Tech Stack| Q(<span style="color:green">SIKER!?</span>)
   N -->P{Több szem, többet lát!<br>Open Source<br>Együttműködés???}
   P -->|Nem| H
   P -->|<span style="color:yellow">IGEN<br>Friss adatok!?<br>Más módszerek!?</span>| Q
   P -->|<span style="color:yellow">IGEN<br>Van használható lehetőség.</span>| O
   Q --> R("<a href='https://codexmonk.github.io/cxm-notes-ObsFram_KosAk/KosAk-report'><span style="color:yellow">vázlat 1:<br>KosAk-report</span></a>")
```
