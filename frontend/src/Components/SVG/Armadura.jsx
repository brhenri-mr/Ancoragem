import React from "react";



const Barras = (props) =>{
    // barras por camada = lista 
    // av = distancia 
    // ah = distancia horizontal 


    const raio = props.bitola*props.escala/2
    const patternSize = Math.ceil(Math.sqrt(2) * raio * 2);

    return (
    
        <>
        <pattern id="hachura" patternUnits="userSpaceOnUse" width={patternSize/9} height={patternSize/9} patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2={patternSize/2} style={{ stroke: 'red', strokeWidth: 1.2 }} />
        </pattern>
    
        <circle cx={props.x} cy={props.y} r={raio} style={{ fill: 'url(#hachura)', stroke:'black' }}></circle>

        </>
    )
   
}



export default Barras