import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import draw1 from './draw1';
import viga from '../Drawning/Viga'
import { useSelector } from "react-redux";
import { useDispatch} from "react-redux";
import {actions as cadastrar} from "../../Actions/Secoes"

const Canvas = (props) => {
  
  const canvasRef = useRef(null)
  const ARMADURA = useSelector(state => state.botoesReducers.ARMADURA)
  const DIAGRAMA = useSelector(state => state.botoesReducers.DIAGRAMA)
  const BARRA = useSelector(state => state.barraReducers.BARRA)
  const CADASTRAR = useSelector(state => state.botoesReducers.CADASTRAR)
  const dispatch = useDispatch()

  let escalabarra = (500/BARRA>1)? 1:500/BARRA




  useEffect(() => {

    if(DIAGRAMA.length!==0){
      const canvas = canvasRef.current;
      Paper.setup(canvas);
      const inter = draw1(props.momentoresistente, props.barra,DIAGRAMA,escalabarra);
  
      console.log(CADASTRAR)
  
      if(CADASTRAR){
        console.log('?')
        dispatch(cadastrar.cadastrar(inter))
  
  
  
      }
  
  
      viga([props.barra,escalabarra]);
    }
   
  }, [props.momentoresistente, props.barra]);



  
  return <canvas ref={canvasRef} {...props} id="canvas" resize="true" height={1000}  width={1000}/>
}

export default Canvas;