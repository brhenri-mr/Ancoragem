import Paper from "paper";



  const draw1 = (momento_resistente,barra,DIAGRAMA,escala) => {



    

    //---------------------------------------------------GRAFICO--------------------------------------------------


    const pontos_grafico = [[50,147.5]]

    DIAGRAMA.forEach(element => {
      pontos_grafico.push([element['X']+50,element['Momento']+147.5])
    });


    let myPath = new Paper.Path({
      segments: pontos_grafico,
      fillColor: '#cc3333',
    
      strokeColor:'black',
      opacity:1,
      closed: true,
      strokeWidth:1
  });

  
  myPath.scale(escala,myPath.bounds.topLeft)

  //------------------------------------------------------------------------------------------------------------




  // Crie um objeto de texto
  const text = new Paper.PointText({
    content: `${(momento_resistente*0.001).toFixed(2).toString().replace('.',',')} tf.m`,
    point: new Paper.Point(parseFloat(barra)*escala+50+25, (momento_resistente*0.001)*escala+147.5), // Posição do texto no canvas
    fontSize: 20,
    fillColor: 'black' // Cor do texto
  });
    // Você pode ajustar outras propriedades de texto, como alinhamento, fonte, etc.
    text.justification = 'left'; // Alinhamento horizontal (center, left, right)

  //------------------------------------------------------------------------------------------------------------



  //Limite
  let segundo = new Paper.Path({
    segments: [[50, 147.5], 
    [parseFloat(barra)+50, 147.5], 
    [parseFloat(barra)+50, (momento_resistente*0.001)+147.5],
    [50,(momento_resistente*0.001)+147.5]],
    fillColor: '#33cc33',
    opacity:1,
    closed: true,
   
  });

  segundo.scale(escala,segundo.bounds.topLeft)


  //------------------------------------------------------------------------------------------------------------

  // Defina os pontos de início e fim da linha
  const startPoint = new Paper.Point(0,( momento_resistente*0.001)+147.5);
  const endPoint = new Paper.Point((parseFloat(barra)+50), momento_resistente*0.001+147.5);

  // Crie a linha
  const line = new Paper.Path.Line(startPoint, endPoint);
  line.strokeColor = 'white';
  line.opacity = 0



  const startPointescala = new Paper.Point(0,( momento_resistente*0.001)*escala+147.5);
  const endPointescala = new Paper.Point((parseFloat(barra)*escala+50), (momento_resistente*0.001)*escala+147.5);

  // Crie a linha
  const linha_escalada = new Paper.Path.Line(startPointescala, endPointescala);
  linha_escalada.strokeColor = 'white';
  linha_escalada.opacity = 0


  //------------------------------------------------------------------------------------------------------------

  const resultado = segundo.subtract(myPath)

  resultado.fillColor ='white'
  resultado.strokeColor = 'black'




  // Encontre as interseções entre a linha e o caminho
  const intersections = myPath.getIntersections(line);

  const inter_escalado = myPath.getIntersections(linha_escalada);

  inter_escalado.forEach(intersection => {
    const circle = new Paper.Path.Circle(intersection.point, 2);
    circle.fillColor = 'black';
    
  });



// ------------------------------------------COTAS-----------------------------------------------------------------------------------------


  const cotai = new Paper.Point(50, 50)
  const cotaf = new Paper.Point(inter_escalado[0].point.x, 50)


  const cota = new Paper.Path.Line(cotai,cotaf)
  
  cota.strokeColor = 'black';
  cota.strokeWidth = 1




  const traco1 = new Paper.Path.Line(
    new Paper.Point(50,35),
    new Paper.Point(50, 65))
  traco1.strokeColor = 'black';
  traco1.strokeWidth = 1




  const traco2  = new Paper.Path.Line(
    new Paper.Point(inter_escalado[0].point.x, 35),
    new Paper.Point(inter_escalado[0].point.x, 65))
  traco2.strokeColor = 'black';
  traco2.strokeWidth = 1


  const comp_cota_i = Math.abs(intersections[0].point.x-50)
  
  // Crie um objeto de texto
  const comprimento = new Paper.PointText({
    content: `${comp_cota_i.toFixed(2).toString().replace('.',',')} cm`,
    point: new Paper.Point(intersections[0].point.x-30,comp_cota_i<50?20:45), // Posição do texto no canvas
    fontSize: 19,
    fillColor: 'black' // Cor do texto
  });

  comprimento.justification = 'center'; // Alinhamento horizontal (center, left, right)

  //--------------------------------------------------------COTA ESQUERDA ------------------------------------------------------------------
  if(inter_escalado.length>1){

  const cotai_f = new Paper.Point(inter_escalado[1].point.x, 50)
  const cotaf_f = new Paper.Point((parseFloat(barra)*escala+50), 50)


  const cota_f = new Paper.Path.Line(cotai_f,cotaf_f)
  
  cota_f.strokeColor = 'black';
  cota_f.strokeWidth = 1




  const traco1_f = new Paper.Path.Line(new Paper.Point(parseFloat(barra)*escala+50, 35),new Paper.Point(parseFloat(barra)*escala+50, 65))
  traco1_f.strokeColor = 'black';
  traco1_f.strokeWidth = 1


  const traco2_f  = new Paper.Path.Line(new Paper.Point(inter_escalado[1].point.x, 35),new Paper.Point(inter_escalado[1].point.x, 65))
  traco2_f.strokeColor = 'black';
  traco2_f.strokeWidth = 1



    // Crie um objeto de texto

    const comp_cota = Math.abs(intersections[1].point.x-parseFloat(barra)*escala-50)

    const comprimento_f = new Paper.PointText({
      content: `${comp_cota.toFixed(2).toString().replace('.',',')} cm`,
      point: new Paper.Point(intersections[1].point.x,comp_cota<50?20:45), // Posição do texto no canvas
      fontSize: 19,
      fillColor: 'black' // Cor do texto
    });
    
    // Você pode ajustar outras propriedades de texto, como alinhamento, fonte, etc.
    comprimento.justification = 'center'; // Alinhamento horizontal (center, left, right)
  }
  
  
  

  //--------------------------------------------------------------------------------------------------------------------------------------




// -----------------------------------------------------------------------------------------------------------------------------------------

  

  Paper.view.draw();

  return intersections
};

export default draw1;