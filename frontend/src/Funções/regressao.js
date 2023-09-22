function regressao(bd,momento){


    const data = []

    for (let i=0;i<bd.length;i++){
        data.push([parseFloat(bd[i]["Momento"]),parseFloat(bd[i]["X"])])
    }

    const regression = require('regression');


    const degree = data.length>3? 2:1


    // Realiza a regressão polinomial
    const result = regression.polynomial(data, { order: degree });

    // Coeficientes do polinômio
    const coefficients = result.equation;


    //Predict

    let y = 0;
    for (let i = 0; i <= degree; i++) {
        y += coefficients[i] * Math.pow(momento, i);
    }
    return y;


}

export default regressao