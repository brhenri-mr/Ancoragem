function Armaduras(svg,xinicio,xfinal,y,deltay){

    const line = svg.append('line')
        .attr('x1',xinicio)
        .attr('x2',xfinal)
        .attr('y1',y+50+deltay)
        .attr('y2',y+50+deltay)
        .attr('stroke', 'black')
        .attr('stroke-width', 2);
    
    return line;
}

export default Armaduras