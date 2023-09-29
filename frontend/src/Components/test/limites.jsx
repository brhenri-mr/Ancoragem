import * as d3 from 'd3';

function limite(svg,x){

    let isDragging = false;
    let initialMouseX = x;
    let initialLineX1 = x
    let initialLineX2 = x


    const line = svg
      .append('line')
      .attr('x1', initialLineX1)
      .attr('y1', 25)
      .attr('x2', initialLineX2)
      .attr('y2', 175)
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');


    return(line)


}

export default limite;
