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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

//Redux
import { useDispatch} from "react-redux";
import { useSelector } from "react-redux";
//Componentes
import actions from "../../Actions/Caracteristicas";
//constantes

import {ClasseConcreto,NomesAgregados} from "../../Constants/classSecao";


const Decalagem  = (props)=> {

    //Dispatch
    const dispatch = useDispatch()
    //Secao
    const CARACTERISTICAS = useSelector(state =>state.caracteristicasReducers.CARACTERISTICAS)
    const [alturaSecao,setAlturasecao]= useState((CARACTERISTICAS['h']===0)?'':CARACTERISTICAS['h'].toString().replace('.',','))
    const [bw,setBw] = useState(CARACTERISTICAS['bw']===0?'':CARACTERISTICAS['bw'].toString().replace('.',','))
    const [fck,setFck] = useState(CARACTERISTICAS['fck']===0?'':'C'+CARACTERISTICAS['fck'])

    //Cortante
    const [cortantemax, setCortantemax] = useState(CARACTERISTICAS['vmax'])
    const [cortantemin, setCortantemin] = useState(CARACTERISTICAS['vmin'])
    const [agregado, setAgregado] = useState('')
    const [alturautil, setAlturautil] = useState(CARACTERISTICAS['alturautil'])

    //Decalagem
    
    const [alerta,setAlerta] = useState(false)
    const [sucesso, setSucesso] = useState(false)
    const [mensagem, setMensagem] = useState('')

    const [ductilidade,setDuctilidade] = useState(false)







    const caracteristcas = (event)=>{
        event.preventDefault()

        let buginfernal = alerta //o setAlert nao funciona, nao adianta
        let temp = 0

        for(let i of [alturaSecao,bw]){
            if (i === ''){
                setAlerta(true)
                buginfernal = true
                setMensagem('Há campos vazios')
                break
            }
            else{
                buginfernal = false
            }
        }


        for(let i of [alturaSecao,bw]){
            for(let letra of i){
                if ('1234567890'.includes(letra)){
                    break
                }
                else{
                    buginfernal = true
                    setAlerta(true)
                    setMensagem('Precisa existir pelo menos um numero em campos numericos, não so espacadores')
                }
            }
            for(let letra of i){
                if (letra ===',' || letra==='.'){
                    temp = temp + 1
                }
                if (temp>1){
                    buginfernal = true
                    setAlerta(true)
                    setMensagem('Há quantidade excessiva de separadores viruglas ou pontos')
                    break
                }
            }
            temp = 0
        }

        if(parseFloat(bw.replace(',','.'))<12){
            setAlerta(true)
            buginfernal = true
            setMensagem('A NBR6118:2014 limita o tamanho mínimo de comprimentos de vigas a 12 cm')
        }


        if (!buginfernal){

            //dmax:parseFloat(diametromax.replace(',','.')),

         


            const item = {
                fck:ClasseConcreto[fck],
                h:parseFloat(alturaSecao.replace(',','.')),
                bw:parseFloat(bw.replace(',','.')),
                vmax:parseFloat(cortantemax.replace(',','.')),
                vmin:parseFloat(cortantemin.replace(',','.')),
                agregado:agregado,
                alturautil: parseFloat(alturautil.replace(',','.')),
                ductilidade:ductilidade
            }
            dispatch(actions.adicionar(item))
            setAlerta(false)
            setSucesso(true)
        }
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
                    <Box className='Seção Transversal' >
                    <Paper elevation={3} sx={{paddingBottom:3,paddingLeft:3,paddingRight:3,border:'1px solid #2d383a', backgroundColor:'#FBFAFA'}}>
                        <p style={{fontSize:25,fontFamily:'Helvetica,Arial', border:1}}>Seção Transversal</p>
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <item>
                                    <Box component="form" sx={{'& > :not(style)': { m: 1, width: '39ch' }}}noValidate autoComplete="off" >
                                    <FormControl>
                                            <InputLabel>Classe de Concreto</InputLabel>
                                            <Select 
                                            value={fck} 
                                            onChange={(event) =>{event.preventDefault();return setFck(event.target.value)}} 
                                            label="Classe de Concreto" 
                                            variant="outlined"  
                                            sx={{backgroundColor:'white'}}>
                                                {Object.keys(ClasseConcreto).map((item,index)=>{return<MenuItem key={index} value={item}>{item}</MenuItem>})}
                                            </Select> 
                                    </FormControl>
                                    <FormControl>
                                        <InputLabel>Natureza do Agregado</InputLabel>
                                        <Select 
                                        value={agregado} 
                                        onChange={(event) =>{event.preventDefault();return setAgregado(event.target.value)}} 
                                        label="Classe de Concreto" 
                                        variant="outlined"  
                                        sx={{backgroundColor:'white'}}>
                                            {NomesAgregados.map((item,index)=>{return<MenuItem key={index} value={item}>{item}</MenuItem>})}
                                        </Select> 
                                    </FormControl>
                                        

                                    </Box>
                                    <Box component="form" sx={{'& > :not(style)': { m: 1, width: '39ch' }, }}noValidate autoComplete="off">

                                        <TextField 
                                        value={alturaSecao} 
                                        onChange={(event) =>{event.preventDefault();return setAlturasecao(event.target.value)}} 
                                        label="Altura da seção [cm]" 
                                        variant="outlined"
                                        error={erro(alturaSecao,'numeros')}
                                        helperText = {erro(alturaSecao,'numeros')?'Insira somente números':''}
                                        sx={{backgroundColor:'white'}}/>
                                        
                                        <TextField 
                                        value={alturautil} 
                                        onChange={(event) =>{event.preventDefault();return setAlturautil(event.target.value)}} 
                                        label="Altura util [cm]" 
                                        variant="outlined"
                                        error={erro(alturautil,'numeros')}
                                        helperText = {erro(alturautil,'numeros')?'Insira somente números':''}
                                        sx={{backgroundColor:'white'}}/>
                                        
                                    </Box>
                                    <Box component="form" sx={{'& > :not(style)': { m: 1, width: '39ch' }, }}noValidate autoComplete="off">

                                        <TextField 
                                        value={bw} 
                                        onChange={(event) =>{event.preventDefault();return setBw(event.target.value)}} 
                                        label="Largura da seção [cm]" 
                                        variant="outlined"
                                        error={erro(bw,'numeros')}
                                        helperText = {erro(bw,'numeros')?'Insira somente números':''}
                                        sx={{backgroundColor:'white'}}/>

                                   
                                    </Box>
                                </item>
                            </Grid>
                        </Grid>
                    </Paper>
                    </Box>
                </Grid>
                <Grid item >
                    <Box className='Armadura Transversal' >
                        <Paper elevation={3} sx={{paddingBottom:3,paddingLeft:3,paddingRight:3,border:'1px solid #2d383a', backgroundColor:'#FBFAFA'}}>
                        <p style={{fontSize:25}}>Armadura Transversal</p>
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{marginLeft:0.25}}>
                            <Grid>
                                <item>
                                <Box component="form" sx={{'& > :not(style)': { m: 1, width: '39ch' }, }}noValidate autoComplete="off">
                                    <TextField 
                                        disabled={ductilidade}
                                        value={cortantemax} 
                                        onChange={(event) =>{event.preventDefault();return setCortantemax(event.target.value)}} 
                                        label="Cortante max" 
                                        variant="outlined"
                                        error={erro(cortantemax,'numeros')}
                                        helperText = {erro(cortantemax,'numeros')?'Insira somente números':''}
                                        sx={{backgroundColor:'white'}}/>
                                </Box>
                                <Box component="form" sx={{'& > :not(style)': { m: 1, width: '39ch' }, }}noValidate autoComplete="off">
                                    <TextField
                                        disabled={ductilidade}
                                        value={cortantemin} 
                                        onChange={(event) =>{event.preventDefault();return setCortantemin(event.target.value)}} 
                                        label="Cortante min" 
                                        variant="outlined"
                                        error={erro(cortantemin,'numeros')}
                                        helperText = {erro(cortantemin,'numeros')?'Insira somente números':''}
                                        sx={{backgroundColor:'white'}}/>
                                </Box>
                                        
        
                                </item>
                            </Grid>
                        </Grid>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item>
                    
                    
                </Grid>
                <Grid item >
                    <Box className='Opções de Dimensionamento' >
                        <Paper elevation={3} sx={{paddingBottom:3,paddingLeft:3,paddingRight:3,border:'1px solid #2d383a', backgroundColor:'#FBFAFA'}}>
                        <p style={{fontSize:25}}>Opções de Dimensionamento</p>
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{marginLeft:0.25}}>
                            <Grid>
                                <Grid>

                                <FormControlLabel
                                        label="Decalagem igual altura util"
                                        control={<Checkbox checked={ductilidade} onChange={(event)=>{
                                            return setDuctilidade(event.target.checked)
                                        }}/>}
                                    />
                                </Grid>

                                    
                              
                                    <FormControlLabel
                                        label="Calcular decalagem"
                                        control={<Checkbox checked={!ductilidade} onChange={(event)=>{
                                            return setDuctilidade(!event.target.checked)
                                        }}/>}
                                    />
                                    
                                
        
                                    <Box component="form" sx={{'& > :not(style)': { m: 1, width: '39ch' }, }}noValidate autoComplete="off">
                                        <Button variant="contained" onClick={caracteristcas}>Adicionar</Button>
                                    </Box>
                            </Grid>
                        </Grid>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Decalagem