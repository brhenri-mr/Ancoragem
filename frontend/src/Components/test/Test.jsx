import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import draw1 from './draw1';
import viga from '../Drawning/Viga'
import { useSelector } from "react-redux";
import { useDispatch} from "react-redux";
import {actions as cadastrar} from "../../Actions/Secoes"
import { useState } from 'react';

const Canvas = (props) => {
  
  const canvasRef = useRef(null)
  const ARMADURA = useSelector(state => state.botoesReducers.ARMADURA)
  const DIAGRAMA = useSelector(state => state.botoesReducers.DIAGRAMA)
  const BARRA = useSelector(state => state.barraReducers.BARRA)
  const CADASTRAR = useSelector(state => state.botoesReducers.CADASTRAR)
  const dispatch = useDispatch()

  const [inter,setInter] = useState('')

  let escalabarra = (500/BARRA>1)? 1:500/BARRA
  console.log(CADASTRAR)
  console.log(DIAGRAMA)



  useEffect(() => {

    if(DIAGRAMA.length!==0){
      console.log('?')
      const canvas = canvasRef.current;
      Paper.setup(canvas);
      if(!CADASTRAR){
      setInter(draw1(props.momentoresistente, props.barra,DIAGRAMA,escalabarra))
      }

  
      if(CADASTRAR){
        console.log('?')
        console.log(inter)
        dispatch(cadastrar.cadastrar(inter))
  
  
  
      }
  
  
      viga([props.barra,escalabarra]);
    }
   
  }, [props.momentoresistente, props.barra]);



  
  return <canvas ref={canvasRef} {...props} id="canvas" resize="true" height={1000}  width={1000}/>
}

export default Canvas;