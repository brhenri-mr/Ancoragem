import React, { useState } from "react";
//material ui
import { Box } from "@mui/system"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FormControl } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//redux
import { useDispatch } from "react-redux";
import { actions } from "../../Actions/Momento";
//
import Tabela_diagramas from "../Inputs/Tabela_diagramas";


const Diagrama = (props)=>{

    const [comprimento,setComprimento] = useState()
    const [momento,setMomento] = useState()

    const dispatch = useDispatch()



    const onClickAdd = (event) =>{
        dispatch(actions.adicionar({
            id: new Date(),
            X:parseFloat(comprimento),
            Momento: parseFloat(momento)
        }))

    }





    return(<>
    <Grid container spacing={4}>
        <Grid item xs={4}>
        <Box className='Geometria'>
            <Paper elevation={3} sx={{paddingBottom:3,paddingLeft:3,paddingRight:'25rem',border:'1px solid #2d383a', backgroundColor:'#FBFAFA'}}>
                <p style={{fontSize:25,fontFamily:'Helvetica,Arial', border:1}}>{'Momento'}</p>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item>
                    <item>
                    <Box component="form" sx={{'& > :not(style)': { m: 1, width: '39ch' }}}noValidate autoComplete="off" >
                    <FormControl>
                        <TextField 
                        label='Posição X seção [cm]' 
                        variant="outlined" 
                        value={comprimento} 
                        onChange={ (event) =>{ event.preventDefault();return setComprimento(event.target.value)}}
                        sx={{backgroundColor:'white'} }
                        />
                    </FormControl>

                    </Box>
                    <Box component="form" sx={{'& > :not(style)': { m: 1, width: '39ch' }}}noValidate autoComplete="off" >
                    <FormControl>
                        <TextField 
                        label='Momento na seção [tf.m]' 
                        variant="outlined" 
                        value={momento} 
                        onChange={ (event) =>{ event.preventDefault();return setMomento(event.target.value)}}
                        sx={{backgroundColor:'white'} }
                        />
                    </FormControl>
                    <Button variant="contained" onClick={onClickAdd}>Add</Button>
                    </Box>
                    </item>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
        <Tabela_diagramas Apoios={props.DIAGRAMA} label={['X [m]','Momento [tf.m]','Ação']} rotulos={['X','Momento']}></Tabela_diagramas>
            
        </Grid>
   
        </Grid>

    </>)
}

export default Diagrama