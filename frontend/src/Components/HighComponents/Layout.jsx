import React, { useState } from "react";
//Material ui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Alert, Collapse } from "@mui/material";

//compoments
import Figura from "./Figura";
import TabPanel from "../Inputs/Tabpanel";

import Secao from "./Secao";

import Geometria from "./Geometria";

//redux

import { useSelector } from "react-redux";

//Components
import Diagrama from "./Diagrama";
import DiagramaMomento from "../SVG/DiagramaMomento";
import Decalagem from "./Decalagem";
import SecaoTransversal from "../SVG/SecaoTransversal";
import Tabela_armaduras from "../Inputs/Tabela_armaduras";

//Func
import ParametrosConcreto from '../../Funções/NBR6118'
import {calculoAdimensionais,momento_secao,verificacaoAdimensionais} from '../../Funções/Ancoragem'
import regressao from "../../Funções/regressao";

import Canvas from '../test/Test'
import BarChart from '../test/3djs'
import DraggableLineChart from "../test/limites";
import AncoragemViga from "../test/AncoragemViga";


function secao_cadastrada(secao,armadura,alerta,alertavalido){

    if(alertavalido){
        return alerta
    }
    else if(secao.length!==0 && armadura.length===0){
        return true
    }


    return false
}




function estabilidaded(el){
    ///vetor com o tipo de apoios
    let restricao= 0
    let mensagem = ''

    const tipos = [0,0,0]

    for (let dicionario of el){
        if (dicionario['tipo']==="Apoio Simples"){
            restricao += 1
            tipos[0] = 1 + tipos[0]

        }
        else if (dicionario['tipo']==="Apoio Rotulado"){
            restricao += 2
            tipos[1] = 1 + tipos[1]
        }
        else if (dicionario['tipo']==="Apoio Engastado"){
            restricao += 3
            tipos[2] = 1 + tipos[2]
        }
    }

    if(tipos[0]===0 && tipos[1]===0 && tipos[2]===0){
        mensagem = 'Insira um Apoio'
    }

    else if (tipos[0]>1 && tipos[1]===0 && tipos[2]===0){
        mensagem = 'Estrutura Hipoestática'
    }
    else if (restricao<3){
        mensagem = 'Estrutura Hipoestática'
    }
    else if(restricao>3){
        mensagem = 'Estrutura Hiperestática'
    }
    else{
        mensagem = 'Estrutura Isoestática'
    }

    return [mensagem,restricao]
}



const Layout = () => {



    //useSelector
    const APOIOS = useSelector(state => state.botoesReducers.APOIOS)
    const BARRA = useSelector(state => state.barraReducers.BARRA)
    const DIAGRAMA = useSelector(state => state.botoesReducers.DIAGRAMA)
    const ARMADURA = useSelector(state => state.botoesReducers.ARMADURA)
    const CARACTERISTICAS = useSelector(state => state.caracteristicasReducers.CARACTERISTICAS)
    const SECAO = useSelector(state => state.botoesReducers.SECAO)
    const CADASTRAR = useSelector(state => state.botoesReducers.CADASTRAR)

    console.log(ARMADURA)
    console.log(SECAO)


    let momento_resistente = 0
    let intercepcao = 0

    let escalabarra = (500/BARRA>1)? 1:500/BARRA



    //useState
    const [value, setValue] = useState(0)
    const estabilidade = estabilidaded(APOIOS)
    const [alerta,setAlerta] = useState(true)
    


    
    //Class
    const NBR6118 = new ParametrosConcreto(CARACTERISTICAS['fck'],'Rural','Viga',ARMADURA['Diametro'],CARACTERISTICAS['bw'],CARACTERISTICAS['h'],CARACTERISTICAS['agregado'])

    let bx
    let linhanneutra
    let As

    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //Calculo do momento gerado pelas secao
    if (ARMADURA.length!==0){

        As = 3.1415*0.25*ARMADURA[0]['Diametro']**2*ARMADURA.length  //cm²





        let [bx,bz,bs,mensagem] = calculoAdimensionais(
            NBR6118.zeta,
            12500,
            NBR6118.eta,
            CARACTERISTICAS['bw'],
            CARACTERISTICAS['alturautil'],
            CARACTERISTICAS['fck']/14,
            NBR6118.Ecs,
            ARMADURA[0]['fyk']/11.5,
            NBR6118.ecu)

        momento_resistente = momento_secao(CARACTERISTICAS['alturautil'],NBR6118.zeta,bx,bs,ARMADURA[0]['fyk']/11.5,ARMADURA.length,ARMADURA[0]['Diametro'],1,'positivo')


        intercepcao = regressao(DIAGRAMA,momento_resistente)

        bx = verificacaoAdimensionais(
            NBR6118.zeta,
            NBR6118.eta,
            CARACTERISTICAS['bw'],
            CARACTERISTICAS['alturautil'],
            CARACTERISTICAS['fck']/14,
            NBR6118.Ecs,
            ARMADURA[0]['fyk']/11.5,
            NBR6118.ecu,
            bs,
            As)

        linhanneutra = (bx*CARACTERISTICAS['alturautil'])


        if(linhanneutra<0){
            console.log('ERRO')
            linhanneutra = 0
        }




    }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    function handleChange (event, newValue) {
        setValue(newValue);
      };
    
    
    const Item = styled('div')(({ theme }) => ({
        ...theme.typography.body2,
        borderStyle: 'none',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return(
        <div>
            <Box sx={{ width: '100%'}}>
                <Box sx={{ display: 'flex',borderBottom: 1, borderColor: 'divider',flexGrow: 1}}>
                    <Box sx={{backgroundColor:'#D9D9D9',height: '120vh'}}>
                        <Tabs 
                            value={value} 
                            onChange={ handleChange} 
                            aria-label="basic tabs example" 
                            orientation="vertical"
                            sx={{ borderRight: 1, borderColor: 'divider'}}>
                            <Tab label="Viga" sx={{fontWeight: 'bold'}} />
                            <Tab label="Diagrama"  sx={{fontWeight: 'bold'}}/>
                            <Tab label="Decalagem"  sx={{fontWeight: 'bold'}}/>
                            <Tab label="Armaduras" sx={{fontWeight: 'bold'}}/>
                            <Tab label="test" sx={{fontWeight: 'bold'}}/>
                        </Tabs>
                    </Box>

            <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Geometria APOIOS = {APOIOS}></Geometria>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>
                            <Collapse in={estabilidade[0] ==='Insira um Apoio'}>
                                <Alert severity="info">{estabilidade[0]}</Alert>
                            </Collapse>
                            <Collapse in={estabilidade[0] ==='Estrutura Hipoestática'}>
                                <Alert severity="warning">{estabilidade[0]}</Alert>
                            </Collapse>
                            <Collapse in={estabilidade[0] ==='Estrutura Isoestática' || estabilidade[0] ==='Estrutura Hiperestática'}>
                                <Alert>{estabilidade[0]}</Alert>
                            </Collapse>
                            <Figura apoios={APOIOS} barra={BARRA}  ignorar={true}></Figura>
                        </Item>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Diagrama DIAGRAMA={DIAGRAMA}></Diagrama>
                        </Grid>
                        <Grid item xs={6}>
                            <DiagramaMomento barra={BARRA} apoios={APOIOS} escalabarra={escalabarra} DIAGRAMA={DIAGRAMA} cortargrafico={false}></DiagramaMomento>
                        </Grid>
                </Grid>
                
               
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Decalagem/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Collapse in={CADASTRAR&&alerta}>
                    <Alert severity="info" onClose={() => {setAlerta(false)}}>Seção Cadastrada</Alert>
                    <br></br>
                </Collapse>
                <Collapse in={CARACTERISTICAS['fck']!==0}>
                    <Grid container spacing={2}>
                            
                            <Grid item xs={6}>
                                <Secao></Secao>
                                <Tabela_armaduras Apoios={ARMADURA} label={['X [cm]','Y [cm]','Ação']} rotulos={['PosicaoX','PosicaoY']}></Tabela_armaduras>
                            </Grid>
                            <Grid item xs={3}>
                                <SecaoTransversal bw={100} h={100} linhaneutra={linhanneutra} ARMADURA={ARMADURA}></SecaoTransversal>
                                <Canvas barra={BARRA} momentoresistente={momento_resistente}></ Canvas>
                                <AncoragemViga></AncoragemViga>
                                
                            </Grid>
                            <Grid item xs={3}>
                                
                            </Grid>
                        
                    </Grid>
                </Collapse>
            </TabPanel>
            <TabPanel value={value} index={4}>

                    <AncoragemViga></AncoragemViga>

            </TabPanel>
            </Box>
        </Box>
        </div>
    )
}

export default Layout