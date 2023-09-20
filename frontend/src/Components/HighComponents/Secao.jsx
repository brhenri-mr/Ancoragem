import React from "react";
import { useState } from "react";
//Material UI
import { Box } from "@mui/system"
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { FormControl } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { AlertTitle } from "@mui/material";


//Redux
import { useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import {actions} from "../../Actions/Armaduras"

//constantes

import { ClasseAço } from "../../Constants/classSecao";

import { diametros } from "../../Constants/classSecao";
import SecaoTransversal from "../SVG/SecaoTransversal";

const Secao  = (props)=> {

    //Dispatch
    const dispatch = useDispatch()
    const CARACTERISTICAS = useSelector(state =>state.caracteristicasReducers.CARACTERISTICAS)
    const [fyk,setFyk] = useState('')

    //const [diametromax,setDiametromax] = useState('')

    const [diametroL,setDiametroL] = useState('')

    const[posicaoX, setPosicaoX] = useState('')
    const[posicaoY, setPosicaoY] = useState('')


    const [alerta,setAlerta] = useState(false)
    const [sucesso, setSucesso] = useState(false)
    const [mensagem, setMensagem] = useState('')


    const addArmaduras = (event) =>{
        event.preventDefault()
        console.log(fyk)
        const barra = {
            id: new Date(),
            fyk:ClasseAço[fyk],
            Diametro:diametros[diametroL],
            PosicaoX:parseFloat(posicaoX),
            PosicaoY:parseFloat(posicaoY)*-1

        }
        dispatch(actions.adicionar(barra))
    }






    const erro = (variavel,nome ) =>{
        if (variavel[0] === undefined){
            return false
        }
        else if (nome==='nome'){
            if (!'*'.includes(variavel[variavel.length-1])){
                return false
        }
        }
        else if (nome==='numeros'){
            if ('1234567890-+.,'.includes(variavel[variavel.length-1])){
                return false
        }
        }
        return true
    }


    return(
        <>
           <Box sx={{paddingBottom:(alerta || sucesso)?'1rem':'0rem'}}>
                <Collapse in={alerta}>
                    <Alert severity="warning" onClose={() => {setAlerta(false)}}>
                        <AlertTitle>Atenção Entrada de Dados — <strong>Inválida</strong></AlertTitle>
                        {mensagem}
                        </Alert>
                </Collapse>
                <Collapse in={(sucesso)} >
                    <Alert onClose={() => {setSucesso(false)}} >
                        <AlertTitle >Seção Cadastrada com Sucesso</AlertTitle>
                        </Alert>
                </Collapse>
            </Box>
        
            <Grid container spacing={4}>
                <Grid item>
                    <Box className='Distribuição das Armaduras' >
                    <Paper elevation={3} sx={{paddingBottom:3,paddingLeft:3,paddingRight:3,border:'1px solid #2d383a', backgroundColor:'#FBFAFA'}}>
                        <p style={{fontSize:25,fontFamily:'Helvetica,Arial', border:1}}>Distribuição das Armaduras</p>
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <item>
                                    <Box component="form" sx={{'& > :not(style)': { m: 1, width: '39ch' }}}noValidate autoComplete="off" >
                
                                        <FormControl>
                                            <InputLabel>Classe de Aço</InputLabel>
                                            <Select 
                                            value={fyk} 
                                            onChange={(event) =>{event.preventDefault();return setFyk(event.target.value)}} 
                                            label="Classe de Aço" 
                                            variant="outlined"
                                            sx={{backgroundColor:'white'}}>
                                                {Object.keys(ClasseAço).map((item,index)=>{return<MenuItem key={index} value={item}>{item}</MenuItem>})}
                                            </Select> 
                                        </FormControl>
                                        <FormControl>
                                            <InputLabel>Diâmetro armadura Longitudinal</InputLabel>
                                            <Select 
                                            value={diametroL} 
                                            onChange={(event) =>{event.preventDefault();return setDiametroL(event.target.value)}} 
                                            label="Diâmetro armadura Longitudinal"  
                                            variant="outlined"  
                                            sx={{backgroundColor:'white'}}>
                                                {Object.keys(diametros).map((item,index)=>{return<MenuItem key={index} value={item}>{item}</MenuItem>})}
                                            </Select> 
                                        </FormControl>

                                    </Box>
                                    <Box component="form" sx={{'& > :not(style)': { m: 1, width: '39ch' }, }}noValidate autoComplete="off">

                                        <TextField 
                                        value={posicaoX} 
                                        onChange={(event) =>{event.preventDefault();return setPosicaoX(event.target.value)}} 
                                        label="posição em x [cm]" 
                                        variant="outlined"
                                        error={erro(posicaoX,'numeros')}
                                        helperText = {erro(posicaoX,'numeros')?'Insira somente números':''}
                                        sx={{backgroundColor:'white'}}/>
                                        
                                        <TextField 
                                        value={posicaoY} 
                                        onChange={(event) =>{event.preventDefault();return setPosicaoY(event.target.value)}} 
                                        label="posição em y [cm]" 
                                        variant="outlined"
                                        error={erro(posicaoY,'numeros')}
                                        helperText = {erro(posicaoY,'numeros')?'Insira somente números':''}
                                        sx={{backgroundColor:'white'}}/>

                                       
                                    </Box>
                                    <Box component="form" sx={{'& > :not(style)': { m: 1, width: '21ch' }, }}noValidate autoComplete="off">
                                        <Button variant="contained" onClick={addArmaduras}>Adicionar</Button>
                                    </Box>
                                    
                                </item>
                            </Grid>
                            <Grid>

                            </Grid>
                        </Grid>
                    </Paper>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Secao