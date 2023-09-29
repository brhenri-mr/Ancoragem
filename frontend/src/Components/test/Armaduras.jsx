function Armaduras(svg,xfinal){

    const line = svg.append('line')
        .attr('x1',100)
        .attr('x2',xfinal)
        .attr('y1',150)
        .attr('y2',150)
        .attr('stroke', 'black')
        .attr('stroke-width', 2);
    
    return line;
}

export default Armaduras