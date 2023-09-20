import React, { useState } from "react";
// componentes
import Apoio from "../SVG/Apoios";
import Viga from "../SVG/Viga";
//Constante
import PadraoParaDesenho from "../../Constants/PadraoParaDesenho";
import Eixos from "../SVG/Eixos";
import { FormControl } from "@mui/material";
import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import { Box } from "@mui/system"





const Figura = (props) =>{

    let magmax = 0
    const [label,setLabel] = useState('')

    let escalabarra = (500/props.barra>1)? 1:500/props.barra


    let escala = (Math.abs(100/magmax)>1)? 1:Math.abs(100/magmax)


    
    if (Math.abs(magmax)<=20){
        escala = 2.5
    }

    if (props.ignorar){
        return (
            <div>
                <svg {...PadraoParaDesenho}>
                    <Viga value={props.barra*escalabarra} mag={magmax*escala-50} apoios={props.apoios} escala={escalabarra}></Viga>
                    {props.apoios.map((item,index)=>{
                        return <Apoio key= {index} tipo = {item.tipo} value={item.value*escalabarra} escala={escalabarra}></Apoio>
                    })}
                
                </svg>
            </div>
        )
    }
    else{
        return (
            <div>
                <Box component="form" sx={{'& > :not(style)': { m: 1, width: '39ch' }}}noValidate autoComplete="off" >
                    <FormControl>
                        <InputLabel>Descrição do carregamento</InputLabel>
                        <Select 
                        value={label} 
                        onChange={(event) =>{event.preventDefault();return setLabel(event.target.value)}} 
                        label="Descrição do carregamento"  
                        variant="outlined"  
                        sx={{backgroundColor:'white'}}>
                       
                        </Select> 
                    </FormControl>
                </Box>
                <br></br>
                <svg {...PadraoParaDesenho}>
                    <Eixos></Eixos>
                    <Viga value={props.barra*escalabarra} mag={magmax*escala-50} apoios={props.apoios} escala={escalabarra}></Viga>
                    {props.apoios.map((item,index)=>{
                        return <Apoio key= {index} tipo = {item.tipo} value={item.value*escalabarra} escala={escalabarra}></Apoio>
                    })}
                    
                    
                    
                </svg>
            </div>
        )
    }
    
}

export default Figura