import Paper from "paper";



  const draw1 = (momento_resistente,barra) => {





    //Grafico
    let myPath = new Paper.Path({
      segments: [[50, 147.5], [100, 400], [200, 147.5]],
      fillColor: '#cc3333',
    
      strokeColor:'black',
      opacity:1,
      closed: true,
      strokeWidth:1
  });



  // Crie um objeto de texto
  const text = new Paper.PointText({
    content: `${(momento_resistente*0.001).toFixed(2).toString().replace('.',',')} tf.m`,
    point: new Paper.Point(parseFloat(barra)+50+25, momento_resistente*0.001+147.5), // Posição do texto no canvas
    fontSize: 20,
    fillColor: 'black' // Cor do texto
  });

  // Você pode ajustar outras propriedades de texto, como alinhamento, fonte, etc.
  text.justification = 'left'; // Alinhamento horizontal (center, left, right)


  console.log()

  //Limite
  let segundo = new Paper.Path({
    segments: [[50, 147.5], [200, 147.5], [200, momento_resistente*0.001+147.5],[50,momento_resistente*0.001+147.5]],
    fillColor: '#33cc33',
    opacity:1,
    closed: true,
   
  });

  // Defina os pontos de início e fim da linha
  const startPoint = new Paper.Point(0, momento_resistente*0.001+147.5);
  const endPoint = new Paper.Point(parseFloat(barra)+50, momento_resistente*0.001+147.5);

  // Crie a linha
  const line = new Paper.Path.Line(startPoint, endPoint);
  line.strokeColor = 'white';
  line.opacity = 0



  const resultado = segundo.subtract(myPath)

  resultado.fillColor ='white'
  resultado.strokeColor = 'black'




  // Encontre as interseções entre a linha e o caminho
  const intersections = myPath.getIntersections(line);

  intersections.forEach(intersection => {
    const circle = new Paper.Path.Circle(intersection.point, 2);
    circle.fillColor = 'black';
  });



  

  Paper.view.draw();
};

export default draw1;