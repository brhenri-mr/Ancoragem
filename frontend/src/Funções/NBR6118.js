class ParametrosConcreto {
    constructor(fck, ambiente, peca, bitolaL, b, h, agregado, unidades = 'kN/cm^2', dmax = 0) {
        /*
        Classe que contém os parâmetros do concreto presentes conforme NBR6118/2014
        fck: Resistência característica do concreto à compressão em 28 dias [MPa]
        ambiente: Ambiente onde se encontra a peça 
        peca: Tipo de peça de concreto armado (viga, laje, pilar)
        bitolaL: Bitola longitudinal
        agregado: Tipo de agregado estabelecido na NBR6118 item 8.2.8
        unidades: Por padrão adota-se como kN/cm^2, aceita-se MPa também
        dmax: Valor padrão é 0
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
            'Laje': [2.0, 2.5, 3.5, 4.5],
            'Viga': [2.5, 3.0, 4.0, 5.0],
            'Elemento em contato com o solo': [3.0, 3.0, 4.0, 5.0]
        };

        const tipo_agregado = {
            'Basalto e Diabásio': 1.2,
            'Granito e Gnaisse': 1,
            'Calcário': 0.9,
            'Arenito': 0.7
        };

        this.unidades = unidades;
        this.coef = unidades === 'MPa' ? 1 : 10;
        this.fck = fck;
        this.zeta = fck <= 50 ? 0.8 : 0.8 - (fck - 50) / 400;
        this.eta = fck <= 50 ? 0.85 : 0.85 * (1 - (fck - 50) / 200);
        this.fctkm = (fck <= 50 ? 0.3 * Math.pow(fck, 2 / 3) : 2.12 * Math.log(1 + 0.11 * fck))/this.coef;
        this.fctkinf = 0.7 * this.fctkm;
        this.fctksup = 1.3 * this.fctkm;
        this.ecu = fck <= 50 ? 0.0035 : 0.0026 + 0.035 * Math.pow((90 - fck) / 100, 4);
        this.agressividade = classe_de_agressividade_ambiental[ambiente];
        this.cobrimento = cobrimento_por_elemento[peca][this.agressividade - 1];
        this.dmax = dmax !== 0 ? 1.2 * this.cobrimento : dmax;
        this.ah = Math.max(2, bitolaL, 1.2 * this.dmax);
        this.av = Math.max(2, bitolaL, 0.5 * this.dmax);
        this.w0 = (b * Math.pow(h, 2)) / 6;
        this.gammac = 1.4;
        this.alfai = 0.8 + 0.2 * fck / 80 <= 1 ? 0.8 + 0.2 * fck / 80 : 1;
        this.alfae = tipo_agregado[agregado];
        this.Eci = fck <= 50 ? this.alfae * 5600 * Math.pow(fck, 0.5) : this.alfae * 21500 * (fck / 10 + 1.25) ** 1 / 3;
        this.Ecs = (this.alfai * this.Eci)/this.coef;
        this.bxmaximo = fck <= 50 ? 0.45 : 0.35;
    }
}

export default ParametrosConcreto;