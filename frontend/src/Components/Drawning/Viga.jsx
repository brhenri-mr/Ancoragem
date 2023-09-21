import Paper from "paper";


  const viga = (barra) => {



    // Defina os pontos de início e fim da linha
    const startPoint = new Paper.Point(50, 147.5);
    const endPoint = new Paper.Point(parseFloat(barra)+50, 147.5);

    // Crie a linha
    const line = new Paper.Path.Line(startPoint, endPoint);

    line.strokeColor = 'black'
    line.strokeWidth = 4
    line.strokeCap = 'round';

  

  Paper.view.draw();
};

export default viga;