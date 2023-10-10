function resistencia_aderencia(bitola, fctd, classeaco, d, h) {
    // eta1 vai ficar na nbr parametros
    // eta2 vai ficar na nbr parametros
    let eta1, eta2, eta3;

    // eta1
    switch (classeaco) {
        case 50:
            eta1 = 2.25;
            break;
        case 60:
            eta1 = 1;
            break;
        case 25:
            eta1 = 1;
            break;
        default:
            eta1 = 0; // Valor padrão caso a classe não corresponda a nenhum dos casos
    }

    // eta2
    if (h > 60) {
        if (h - 30 > d) {
            eta2 = 1;
        } else {
            eta2 = 0.7;
        }
    } else {
        if (d < 30) {
            eta2 = 0.7;
        } else {
            eta2 = 1;
        }
    }

    // eta3
    if (bitola <= 32) {
        eta3 = 1;
    } else {
        eta3 = 132 - bitola / 100;
    }

    return (eta1 * eta2 * eta3) * fctd;
}

function comprimento_necessario(bitola, fbd, fyd, Ascal, Asef, alfa) {
    /*
    Funcao que retorna o comprimento necessario de ancoragem
    bitola: diametro da secao transversal da aramdura
    fbd: resistencia de aderencia 
    fyd: resistencia de calculo a escoamento do aco
    Ascal: area de aco calculada
    Asef: area de aco efetivo 
    */
    let lb = Math.max((bitola / 4) * (fyd / fbd), 25 * bitola);
    let lbmin = Math.max(0.3 * lb, 10 * bitola, 10);
    let lbnec = Math.max(alfa * lb * Ascal / Asef, lbmin);
    return lbnec;
}

function decalagem(vsdmax, vc, d, modelo) {
    /*
    Retorna a decalgem (ah) 
    vsdmax: esforco resistente de cortante maximo
    vs: resistencia do concreto a cortante
    d: altura util do concreto armado
    modelo: modelo a ser adotado Modelo 1 ou Modelo 2
    */
    switch (modelo) {
        case 'Modelo 1':
            return Math.max(0.5 * d * (vsdmax / (vsdmax - vc)), 0.5 * d);
        case 'Modelo 2':
            return Math.max(0.866 * d, 0.5 * d);
        default:
            return 0; // Valor padrão caso o modelo não corresponda a nenhum dos casos
    }
}

function momento_secao(d, zeta, beta_x, beta_s, fyd, n, d_l, dlinha, criterio) {
    /*
    Funcao que retorna o momento resistencia da secao
    d: altura util
    zeta: parametro nbr6118
    beta_x: redistribuicao da linha neutra
    beta_s: parametro admensional
    fyd: Resistência caracteristicas de escoamento da barra de aco longitudinal
    n: quantidade de barras de aco em uma secao 
    d_l: diametro da bitola longitudinal
    dlinha: distancia até as armaduras negativa
    criterio: Momento resistênte positivo ou negativo 
    */
    const area_u = 0.25 * 3.1415 * d_l ** 2;

    if (criterio === "positivo") {
        return d * (1 - zeta * beta_x * 0.5) * beta_s * fyd * n * area_u;
    } else {
        return beta_s * fyd * (d - dlinha) * n * area_u;
    }
}

function comprimento_de_ancoragem(lbnec, al, bitola, xcamada, xinferior) {
    if (lbnec + al + (xcamada[1] - xcamada[0]) > 10 * bitola + al + (xinferior[1] - xinferior[0])) {
        return [lbnec + al, 10 * bitola + al, xcamada, "lbnec+al"];
    } else {
        return [lbnec + al, 10 * bitola + al, xinferior, "10*bitola+al"];
    }
}

function calculoAdimensionais(zeta, momento, eta, bw, d, fcd, Es, fyd, ecu) {
    /*
    Cálculo das variáveis adimensionais bx, bz, bs
    zeta = parâmetro estabelecido na NBR6118 |
    momento = momento solicitante na seção |
    eta = parâmetro estabelecido na NBR6118 |
    d = altura útil da seção |
    fcd = resistência característica de cálculo à compressão do concreto |
    Es = módulo elástico secante do concreto |
    fyd = resistência ao escoamento de cálculo do aço |
    ecu = deformação última do concreto no devido domínio |
    */

    // Dados
    if (1 - (2 * momento) / (eta * bw * Math.pow(d, 2) * fcd) <= 0 || 1 / zeta - (1 / zeta) * Math.sqrt(1 - (2 * momento) / (eta * bw * Math.pow(d, 2) * fcd)) === 0) {
        return [0, 0, 0, 'Impossível calcular a posição da linha Neutra'];
    } else {
        const bx = 1 / zeta - (1 / zeta) * Math.sqrt(1 - (2 * momento) / (eta * bw * Math.pow(d, 2) * fcd));
        const bz = 1 - 0.5 * zeta * bx;
        const bs = Math.min(Es / fyd * (1 - bx) / bx * ecu, 1);

        return [bx, bz, bs, 'Tudo certo'];
    }
}

function verificacaoAdimensionais(zeta, eta, bw, d, fcd, Es, fyd, ecu,bs,As){

    let bx = (As*fyd)/(eta*zeta*bw*d*fcd)*bs 
    let bs_novo = Math.min(Es / fyd * (1 - bx) / bx * ecu, 1);



    
    for (let i=0; i<1000;i++){

        if(bs===bs_novo){
            return bx
        }
        
        bs_novo = Math.min(Es / fyd * (1 - bx) / bx * ecu, 1);
        bx = (As*fyd)/(eta*zeta*bw*d*fcd)*bs_novo


       
    }

    return -1
}


export {resistencia_aderencia,comprimento_necessario,decalagem,momento_secao,comprimento_de_ancoragem,calculoAdimensionais,verificacaoAdimensionais}
