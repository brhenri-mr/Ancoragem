import { Box } from "@mui/system";
import React from "react";
import cartesiano from './cartesiano.jpg'
import Armadura from './Armadura'
import Eixos from "./Eixos";

const SecaoTransversal =(props) => {

    const x = props.bw
    const h = props.h



    return(
        <>
            
            <svg style={{ width:"25rem",height: "15rem"}}>
      
                    <rect width={x} height={h} x={155-x/2} y={80-h/2} style={{fill:'#D9D9D9',strokeWidth:1.2,stroke:'rgb(0,0,0)'}}/>
                    
                    {props.ARMADURA.map((item,chave)=>{
                        return  <Armadura key={chave} x={155+item['PosicaoX']} y={80+item['PosicaoY']} bitola={item['Diametro']} escala={2}></Armadura>
                    })}
                  
                </svg> 

        </>
    )
}

export default SecaoTransversal

///<Box border={'2px solid black'} sx={{width:'100%'}}>
///<img src={cartesiano} alt="Plano Cartesiano" height={210}/>
///</Box>