import * as d3 from 'd3';

function limite(svg,x,y){

    let isDragging = false;
    let initialMouseX = x;
    let initialLineX1 = x
    let initialLineX2 = x


    const line = svg
      .append('line')
      .attr('x1', initialLineX1)
      .attr('y1', y-75)
      .attr('x2', initialLineX2)
      .attr('y2', y+75)
      .attr('stroke', '#3E76A4')
      .attr('stroke-width', 2)
      .attr("opacity", 0.8)
      .attr('stroke-dasharray', '5,5');


    return(line)


}

export default limite;
