import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Viga from './3djs';
import limite from './limites';
import Armaduras from './Armaduras';


const AncoragemViga = ()=>{
    const svgRef = useRef();

    useEffect(() => {
//---------------------------JANELA---------------------------------------
        const width = 400;
        const height = 200;
        let isDragging = false;
        let initialMouseX = 100
        let initialLineX1 = 100
        let initialLineX2 = 100

        const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

//-------------------------------------------------------------------------
        
        Viga(svg,width,height)
        const line = limite(svg,100)
        const armadura = Armaduras(svg,parseFloat(line.attr('x2')))

//-----------------------------------------------------------------------

    const handleMouseDown = (e) => {

        console.log(parseInt(line.attr('x1'))-10+150)
        console.log(e.clientX)
        if(parseInt(line.attr('x1'))+10+150>e.clientX & parseInt(line.attr('x1'))-10+150<e.clientX){
            isDragging = true;
        }

        initialMouseX = e.clientX;
        initialLineX1 = +line.attr('x1');
        initialLineX2 = +line.attr('x2');
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
        const deltaX = e.clientX - initialMouseX;
        const newLineX1 = initialLineX1 + deltaX;
        const newLineX2 = initialLineX2 + deltaX;
        console.log(newLineX1)
        if(newLineX1>=100 & newLineX1<=300){
            line
            .attr('x1', newLineX1)
            .attr('x2', newLineX2);
            armadura
            .attr('x2',newLineX2+10);
        }

   
        }
       
    };

    const handleMouseUp = () => {
        isDragging = false;
    };

    svg.node().addEventListener('mousedown', handleMouseDown);
    svg.node().addEventListener('mousemove', handleMouseMove);
    svg.node().addEventListener('mouseup', handleMouseUp);
    

    })




    return(
        <svg ref={svgRef}></svg>
    )
}


export default AncoragemViga