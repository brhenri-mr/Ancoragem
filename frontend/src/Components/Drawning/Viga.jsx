import Paper from "paper";


  const viga = (entradas) => {

    const escala = entradas[1]
    const barra = entradas[0]



    // Defina os pontos de início e fim da linha
    const startPoint = new Paper.Point(50, 147.5);
    const endPoint = new Paper.Point(parseFloat(barra)+50, 147.5);

    // Crie a linha
    const line = new Paper.Path.Line(startPoint, endPoint);



    line.scale(escala,line.bounds.leftCenter)
    line.strokeColor = 'black'
    line.strokeWidth = 4
    line.strokeCap = 'round';

  Paper.view.draw();
};

export default viga;