import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import draw1 from './draw1';
import viga from '../Drawning/Viga'
import { useSelector } from "react-redux";

const Canvas = (props) => {
  
  const canvasRef = useRef(null)
  const ARMADURA = useSelector(state => state.botoesReducers.ARMADURA)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    Paper.setup(canvas);
    draw1(props.momentoresistente, props.barra);
    viga(props.barra);
  }, [props.momentoresistente, props.barra]);
  
  return <canvas ref={canvasRef} {...props} id="canvas" resize="true" height={1000}  width={1000}/>
}

export default Canvas;