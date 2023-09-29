
import * as d3 from 'd3';

function Viga(svg,width, height) {


    // Criar um retângulo
    const rectWidth = 200;
    const rectHeight = 50;
    const rectX = (width - rectWidth) / 2;
    const rectY = (height - rectHeight) / 2;

    svg.append('rect')
      .attr('x', rectX)
      .attr('y', rectY)
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .attr('fill', '#D3D3D3')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('fill-opacity',0.7);

  }
       



export default Viga;
