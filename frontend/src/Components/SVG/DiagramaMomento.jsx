import React from "react";
//Componentes
import Viga from "../SVG/Viga";
import Apoio from "../SVG/Apoios";
//Constante




const DiagramaMomento= (props) =>{



    if(props.DIAGRAMA.length===0){
        return<></>
    }
    else{
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