import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Viga from './3djs';
import limite from './limites';
import Armaduras from './Armaduras';


const AncoragemViga = ()=>{
    /*
    Componentye que retorna os desenhos da ancoragem
    Parto do principio que sempre existira dois pontos para cada limite
    logo todo limite sera PAR
    */
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


        let posicoes = [100,150,250,300]

        let linha = []

        let barras = [Armaduras(svg,100,300,0)]

        let indice
  
        

        posicoes.forEach((item,chave)=>{
            linha.push(limite(svg,item))
        })

        //----------------------------------------------------------------------------------------------------------
        //indice para compatibilizar os indices das linhas com as das barras
        let indices_barras=[...Array(linha.length/2).keys()]
        let temp = [...Array(linha.length/2).keys()].reverse()

        temp.forEach((item,chave)=>{
            indices_barras.push(item)
        })

        //----------------------------------------------------------------------------------------------------------

        let segmentos = linha.slice(1,linha.length-1)


        //rodando a quantidade de segmentos possiveis
        for(let i=1;i<=segmentos.length-1;i++){
            barras.push(Armaduras(
                svg,
                parseFloat(segmentos[i-1].attr('x2')),
                parseFloat(segmentos[i].attr('x2')),
                15))
        }




//-----------------------------------------------------------------------

    const handleMouseDown = (e) => {




        for(let i =0; i<linha.length;i++){
            if(parseInt(linha[i].attr('x1'))+10+150>e.clientX & parseInt(linha[i].attr('x1'))-10+150<e.clientX){
                isDragging = true;
                indice = i
            }
        }

       

        initialMouseX = e.clientX;
        initialLineX1 = +linha[indice].attr('x1');
        initialLineX2 = +linha[indice].attr('x2');
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const deltaX = e.clientX - initialMouseX;
            let newLineX1
            let newLineX2



            if(indice<linha.length/2){
                if((initialLineX1 + deltaX)<=posicoes[indice]){

                    if(indice!==0 & indice !==linha.length-1){
                        console.log((initialLineX1 + deltaX))
                        if((initialLineX1 + deltaX)>=posicoes[indice-1]){
                        newLineX1 = initialLineX1 + deltaX;
                        newLineX2 = initialLineX2 + deltaX;
                        }
                        else{
                            newLineX1 = initialLineX1
                            newLineX2 = initialLineX2
                        }
                    }
                    else{
                        newLineX1 = initialLineX1
                        newLineX2 = initialLineX2
                    }
                
                  
                    }
                else{
                    newLineX1 = initialLineX1
                    newLineX2 = initialLineX2
                    }


            }
            else{

                if((initialLineX1 + deltaX)>=posicoes[indice]){

                    if(indice!==0 | indice !==linha.length-1){
                        if((initialLineX1 + deltaX)<=posicoes[indice+1]){
                        newLineX1 = initialLineX1 + deltaX;
                        newLineX2 = initialLineX2 + deltaX;
                        }
                        else{
                            newLineX1 = initialLineX1
                            newLineX2 = initialLineX2
                        }
                    }
                    else{
                        newLineX1 = initialLineX1
                        newLineX2 = initialLineX2
                    }
                
                  
                    }
                else{
                    newLineX1 = initialLineX1
                    newLineX2 = initialLineX2
                    }


            }

          

        if(newLineX1>=100 & newLineX1<=300){
            linha[indice]
            .attr('x1', newLineX1)
            .attr('x2', newLineX2);

            if(indice<linha.length/2){
                barras[indices_barras[indice]]
                .attr('x1',newLineX1-10);
            }
            else{ 
                console.log('aqui')

                barras[indices_barras[indice]]
                .attr('x2',newLineX2+10);
            }
            
           
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