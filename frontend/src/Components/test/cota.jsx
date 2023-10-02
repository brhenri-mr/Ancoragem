
import * as d3 from 'd3';

function Cota(svg,xinicio,xfinal) {


    // Criar um retângulo



    const line = svg.append('line')
    .attr('x1',xinicio)
    .attr('x2',xfinal)
    .attr('y1',50)
    .attr('y2',50)
    .attr('stroke', 'gray')
    .attr('stroke-width', 1);

    
    const traco1 = svg.append('line')
    .attr('x1',xinicio)
    .attr('x2',xinicio)
    .attr('y1',45)
    .attr('y2',55)
    .attr('stroke', 'gray')
    .attr('stroke-width', 1);

    const traco2 = svg.append('line')
    .attr('x1',xfinal)
    .attr('x2',xfinal)
    .attr('y1',45)
    .attr('y2',55)
    .attr('stroke', 'gray')
    .attr('stroke-width', 1);

    const texto = svg.append("text")
    .attr("x", (xfinal+xinicio)/2-7.5) // Posição x do texto
    .attr("y", 45) // Posição y do texto
    .attr("font-size", "12px") // Tamanho da fonte
    .attr("fill", "black") // Cor do texto
    .text(`${xfinal-xinicio}`); // Conteúdo do texto


    return [line,traco1,traco2,texto]

  }
       



export default Cota;
