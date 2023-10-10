function Armaduras(svg,xinicio,xfinal,y,deltay,ancoragem){

    const line = svg.append('line')
        .attr('x1',xinicio-ancoragem)
        .attr('x2',xfinal+ancoragem)
        .attr('y1',y+50+deltay)
        .attr('y2',y+50+deltay)
        .attr('stroke', 'black')
        .attr('stroke-width', 2);
    
    return line;
}

export default Armaduras