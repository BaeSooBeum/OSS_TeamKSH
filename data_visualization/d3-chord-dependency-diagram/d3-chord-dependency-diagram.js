// URL: https://beta.observablehq.com/@mbostock/d3-chord-dependency-diagram
// Title: D3 Chord Dependency Diagram
// Author: Mike Bostock (@mbostock)
// Version: 91
// Runtime version: 1


const m0 = {
    id: "7658b4d9887cc334@91",
    variables: [{
            inputs: ["md"],
            value: (function(md) {
                return (
                    md 
                )
            })
        },
        {
			// 데이터 시각화 차트의 각종 정보를 가져온다.
            name: "chart",
            inputs: ["d3", "DOM", "width", "height", "chord", "data", "color", "arc", "innerRadius", "ribbon"],
            value: (function(d3, DOM, width, height, chord, data, color, arc, innerRadius, ribbon) {
                //차트의 가로 세로 길이와 글자 폰트 속성을 가져온다.
				const svg = d3.select(DOM.svg(width, height))
                    .attr("viewBox", [-width / 2, -height / 2, width, height])
                    .attr("font-size", 10)
                    .attr("font-family", "sans-serif")
                    .style("width", "100%")
                    .style("height", "auto");
				
                const chords = chord(data.matrix);
				//
                const group = svg.append("g")
                    .selectAll("g")
                    .data(chords.groups)
                    .enter().append("g");
				
                group.append("path")
                    .attr("fill", d => color(d.index))
                    .attr("stroke", d => color(d.index))
                    .attr("d", arc);

                group.append("text")
                    .each(d => {
                        d.angle = (d.startAngle + d.endAngle) / 2;
                    })
                    .attr("dy", ".35em")
                    .attr("transform", d => `
        rotate(${(d.angle * 180 / Math.PI - 90)})
        translate(${innerRadius + 26})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
      `)
                    .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
                    .text(d => data.nameByIndex.get(d.index));

                svg.append("g")
                    .attr("fill-opacity", 0.67)
                    .selectAll("path")
                    .data(chords)
                    .enter().append("path")
                    .attr("stroke", d => d3.rgb(color(d.source.index)).darker())
                    .attr("fill", d => color(d.source.index))
                    .attr("d", ribbon);

                return svg.node();
            })
        },
        {
            name: "data",
            inputs: ["d3"],
            value: (async function(d3) {
                  const imports = await d3.json("./json.json");

  const indexByName = new Map;
  const nameByIndex = new Map;
  const matrix = [];
  let n = 0;

  // 지정된 클래스 이름에 대한 Flare 패키지 이름을 반환한다.
  function name(name) {
    return name;
  }

                // 각 패키지 이름에 대해 고유한 인덱스를 계산한다.
                imports.forEach(d => {
                    if (!indexByName.has(d = name(d.name))) {
                        nameByIndex.set(n, d);
                        indexByName.set(d, n++);
                    }
                });

                // 가져온 패키지 개수를 세고 정사각형 매트릭스를 구성한다.
                imports.forEach(d => {
                    const source = indexByName.get(name(d.name));
                    let row = matrix[source];
                    if (!row) row = matrix[source] = Array.from({
                        length: n
                    }).fill(0);
                    d.imports.forEach(d => row[indexByName.get(name(d))]++);
                });

                return {
                    matrix,
                    indexByName,
                    nameByIndex
                };
            })
        },
        {
			//그룹명 정렬을 수행한다.
            name: "chord",
            inputs: ["d3"],
            value: (function(d3) {
                return (
                    d3.chord()
                    .padAngle(.04)
                    .sortSubgroups(d3.descending)
                    .sortChords(d3.descending)
                )
            })
        },
        {
			//
            name: "arc",
            inputs: ["d3", "innerRadius"],
            value: (function(d3, innerRadius) {
                return (
                    d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(innerRadius + 20)
                )
            })
        },
        {
			//표에서 그래프의 속성을 지정한다.
            name: "ribbon",
            inputs: ["d3", "innerRadius"],
            value: (function(d3, innerRadius) {
                return (
                    d3.ribbon()
                    .radius(innerRadius)
                )
            })
        },
        {
			//색 속성을 지정한다.
            name: "color",
            inputs: ["d3"],
            value: (function(d3) {
                return (
                    d3.scaleOrdinal(d3.schemeCategory10)
                )
            })
        },
        {
			//외부 원의 크기를 지정한다.
            name: "outerRadius",
            inputs: ["width", "height"],
            value: (function(width, height) {
                return (
                    Math.min(width, height) * 0.5
                )
            })
        },
        {
			//내부 원의 크기를 지정한다.
            name: "innerRadius",
            inputs: ["outerRadius"],
            value: (function(outerRadius) {
                return (
                    outerRadius - 124
                )
            })
        },
        {
			//가로 길이를 지정한다.
            name: "width",
            value: (function() {
                return (
                    964
                )
            })
        },
        {
			//높이 값을 지정한다.
            name: "height",
            inputs: ["width"],
            value: (function(width) {
                return (
                    width
                )
            })
        },
        {
			//
            name: "d3",
            inputs: ["require"],
            value: (function(require) {
                return (
                    require("d3@5")
                )
            })
        }
    ]
};

const notebook = {
    id: "7658b4d9887cc334@91",
    modules: [m0]
};

export default notebook;