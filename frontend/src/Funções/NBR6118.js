class ParametrosConcreto {
    constructor(fck, ambiente, peca, bitolaL, b, h, unidades = 'kN/cm^2') {
        /*
        Classe que contem os parametros do concreto presentes conforme NBR6118/2014
        fck = Resistência caracteristica do concreto a compresssao em 28 dias [MPa]
        ambiente = ambiente onde se encontra a peça 
        peca = tipo de peça de concreto armadi( viga, laje, pilar)
        bitolaL = bitola logitudinal
        unidades = por padrão adota-se como kN/cm^2, aceita-se MPa tambem
        */

        const classe_de_agressividade_ambiental = {
            'Rural': 1,
            'Submersa': 1,
            'Urbana': 2,
            'Marinha': 3,
            'Industrial1': 3,
            'Industrial2': 4,
            'Respingos de maré': 4
        };

        // Cobrimento por elemento em cm
        const cobrimento_por_elemento = {
            'Viga': [2.0, 2.5, 3.5, 4.5],
            'Laje': [2.5, 3.0, 4.0, 5.0],
            'Elemento em contato com o solo': [3.0, 3.0, 4.0, 5.0]
        };

        this.unidades = unidades;
        this.fck = fck;
        this.zeta = fck <= 50 ? 0.8 : 0.8 - (fck - 50) / 400;
        this.eta = fck <= 50 ? 0.85 : 0.85 * (1 - (fck - 50) / 200);
        this.fctkm = fck <= 50 ? 0.3 * Math.pow(fck, 2 / 3) : 2.12 * Math.log(1 + 0.11 * fck);
        this.fctkinf = 0.7 * this.fctkm;
        this.fctksup = 1.3 * this.fctkm;
        this.coef = unidades === 'MPa' ? 1 : 10;
        this.ecu = fck <= 50 ? 0.0035 : 0.0026 + 0.035 * Math.pow((90 - fck) / 100, 4);
        this.agressividade = classe_de_agressividade_ambiental[ambiente];
        this.cobrimento = cobrimento_por_elemento[peca][this.agressividade - 1];
        this.dmax = 1.2 * this.cobrimento;
        this.ah = Math.max(2, bitolaL, 1.2 * this.dmax);
        this.av = Math.max(2, bitolaL, 0.5 * this.dmax);
        this.w0 = (b * Math.pow(h, 2)) / 6;
        this.gammac = 1.4;
    }
}
