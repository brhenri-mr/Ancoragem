import React from "react";
//Componentes
import Viga from "../SVG/Viga";
import Apoio from "../SVG/Apoios";
//Constante




const DiagramaMomento= (props) =>{
    /*
    DIAGRAMA: Dataset com os pontos [coordenadas x, momento]
    BARRA: valor do comprimento da barra
    Apoios: Dataset com os apoios da viga
    escalabarra: escala do tamanho da barra
    cotargrafico: Valor booleano que indica quando o grafico deve ser cortado 
    momentoresistente: Momento resistente das secao
    momentox: posicao do momento resistente na curva
    */



    if(props.DIAGRAMA.length===0){
        return<></>
    }



    //Desenha o polygon cortado
    if(props.cortargrafico){
        //preciso definir a regiao de corte
        //kn.cm -> 10^-3 tf.m
        //Momento de entrada do usuario esta em kn.cm e os do calculos tbm
        const polygonMenor = [[50,147.5]]
        const polygonMaior = [[props.momentox,props.momentoresistente]]


        for(let i = 0;i<props.DIAGRAMA.length;i++){
            if (props.DIAGRAMA[i]['MOMENTO']<props.momentoresistente){
                polygonMenor.push(props.DIAGRAMA[i])

            }
            else{
                polygonMaior.push(props.DIAGRAMA[i])
            }
        }   



        return<></>
    }





    else{
        //Preciso organizar para os valores de X
        //Saber onde tem os apois
        //
        const points =[]
        let temp = '50,147.5 '

        for(let i=0;i<props.DIAGRAMA.length;i++){
            temp = temp+ `${(parseFloat(props.DIAGRAMA[i]['X']*props.escalabarra)+50)},${parseFloat(props.DIAGRAMA[i]["Momento"])+147.5} `
        }

        temp = temp+ '50,147.5'

        points.push(temp)
    
    
        let texto = []
        return(
            <>
                <svg style={{ width:"50rem",height: "800rem"}}>
                   
                    {points.map((item,indice)=>{  
                        return <polygon points={item} key={indice} className="graficomomento"></polygon>
                    })}
                    <Viga value={props.barra*props.escalabarra} ignorar={true} apoios={[]} escala={1}></Viga>
                    {props.apoios.map((item,index)=>{
                        return <Apoio key= {index} tipo = {item.tipo} value={item.value*props.escalabarra}></Apoio>
                    })}
                    <circle cx={parseFloat(props.barra)*props.escalabarra+135} cy="147.5" r="20" stroke="black" strokeWidth="3" className="graficomomento" />
                    <text x={parseFloat(props.barra)*props.escalabarra+128} y='152'>M</text>
                    
                </svg>
            </>
        )
    }
    
}

export default DiagramaMomento