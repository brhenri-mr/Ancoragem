import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Viga from './3djs';
import limite from './limites';
import Armaduras from './Armaduras';
import Cota from './cota';


const AncoragemViga = ()=>{
    /*
    Componentye que retorna os desenhos da ancoragem
    Parto do principio que sempre existira dois pontos para cada limite
    logo todo limite sera PAR
    */
    const svgRef = useRef();

    useEffect(() => {
//---------------------------JANELA---------------------------------------
        const width = 700;
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


        let posicoes = [100,300,350,400,450,600]

        let ancoragem = 15

        let linha = []

        let barras = [Armaduras(svg,posicoes[0],posicoes[posicoes.length-1],height/2,0,ancoragem)]

        let indice

        let cotas = []
        
        for(let i=0;i<posicoes.length;i++){
            if(i===0){
                cotas.push(Cota(svg,50,posicoes[i]))
                cotas.push(Cota(svg,posicoes[i],posicoes[i+1]))
            }
            else if(i+1===posicoes.length){
                cotas.push(Cota(svg,posicoes[i],650))
            }
            else{

                cotas.push(Cota(svg,posicoes[i],posicoes[i+1]))
                
            
            }
        }


        posicoes.forEach((item,chave)=>{
            linha.push(limite(svg,item,height/2))
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

        let test = []

        for(let i=0;i<segmentos.length;i++){
            test.push(segmentos[i].attr('x2'))
        }


        //rodando a quantidade de segmentos possiveis
        for(let i=0;i<Math.floor((test.length)/2);i++){
            

            barras.push(Armaduras(
                svg,
                parseInt(test[i]),
                parseInt(test.reverse()[i]),
                height/2,
                20*(1+i),
                ancoragem))
        }

//-----------------------------------------------------------------------

        
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

          

        if(newLineX1>=0 & newLineX1<=900){
            linha[indice]
            .attr('x1', newLineX1)
            .attr('x2', newLineX2);

            cotas[indice][0].attr('x2',newLineX1)

            if(indice<linha.length/2){
                barras[indices_barras[indice]]
                .attr('x1',newLineX1-ancoragem);

                cotas[indice][0].attr('x2',newLineX1);
                cotas[indice][2]
                .attr('x2',newLineX1)
                .attr('x1',newLineX1);
                cotas[indice+1][0].attr('x1',newLineX1);
                cotas[indice+1][1]
                .attr('x2',newLineX1)
                .attr('x1',newLineX1);

                cotas[indice][3].text(`${cotas[indice][0].attr('x2')-cotas[indice][0].attr('x1')}`)
                .attr("x", (parseFloat(cotas[indice][0].attr('x2'))-parseFloat(cotas[indice][0].attr('x1')))/2+parseFloat(cotas[indice][0].attr('x1'))-7.5);
                cotas[indice+1][3].text(`${cotas[indice+1][0].attr('x2')-cotas[indice+1][0].attr('x1')}`)
                .attr("x", (parseFloat(cotas[indice+1][0].attr('x2'))-parseFloat(cotas[indice+1][0].attr('x1')))/2+parseFloat(cotas[indice+1][0].attr('x1'))-7.5);

            }
            else{ 

                barras[indices_barras[indice]]
                .attr('x2',newLineX2+ancoragem);

                cotas[indice][0].attr('x2',newLineX1);
                cotas[indice+1][0].attr('x1',newLineX1);

                cotas[indice][2]
                .attr('x2',newLineX1)
                .attr('x1',newLineX1);
                
                cotas[indice+1][1]
                .attr('x2',newLineX1)
                .attr('x1',newLineX1);

                cotas[indice][3]
                .text(`${cotas[indice][0].attr('x2')-cotas[indice][0].attr('x1')}`)
                .attr("x", (parseFloat(cotas[indice][0].attr('x2'))-parseFloat(cotas[indice][0].attr('x1')))/2+parseFloat(cotas[indice][0].attr('x1'))-7.5);
                cotas[indice+1][3]
                .text(`${cotas[indice+1][0].attr('x2')-cotas[indice+1][0].attr('x1')}`)
                .attr("x", (parseFloat(cotas[indice+1][0].attr('x2'))-parseFloat(cotas[indice+1][0].attr('x1')))/2+parseFloat(cotas[indice+1][0].attr('x1'))-7.5);
              
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



    svg.attr("transform", `scale(${1})`);
    

    })

    return(
        <svg ref={svgRef}></svg>
    )
}


export default AncoragemViga