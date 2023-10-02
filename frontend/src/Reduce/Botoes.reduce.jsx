import actionType from "../Constants";
import organizar from "../Funções/Organizar";

const INITIAL_STATE = {
    APOIOS: [],
    DIAGRAMA:[],
    ARMADURA:[],
    SECAO:[],
    CADASTRAR:false

}

const reducers  =(state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionType.ADD_APOIO:
            return {APOIOS: [...state.APOIOS, {...action.payload}],DIAGRAMA:state.DIAGRAMA,ARMADURA:state.ARMADURA,CADASTRAR: false, SECAO: state.SECAO}

        case actionType.REMOVER_APOIO:
            return {APOIOS: state.APOIOS.filter(x => x.id !== action.payload.id),DIAGRAMA:state.DIAGRAMA,ARMADURA:state.ARMADURA,CADASTRAR: false, SECAO: state.SECAO}

        case actionType.ADD_MOMENTO:
            //Organiza os valores
            console.log(organizar(state.DIAGRAMA,action.payload))
            return {DIAGRAMA: organizar(state.DIAGRAMA,action.payload) ,APOIOS:state.APOIOS,ARMADURA:state.ARMADURA,CADASTRAR: false, SECAO: state.SECAO}

        case actionType.REMOVER_MOMENTO:
            return {DIAGRAMA: state.DIAGRAMA.filter(x => x.id !== action.payload.id),APOIOS:state.APOIOS,ARMADURA:state.ARMADURA,CADASTRAR: false, SECAO: state.SECAO}

        case actionType.ADD_ARMADURA:
            return {DIAGRAMA:state.DIAGRAMA ,APOIOS:state.APOIOS,ARMADURA:[...state.ARMADURA, {...action.payload}],CADASTRAR: false, SECAO: state.SECAO}

        case actionType.REMOVER_ARMADURA:
            return {DIAGRAMA:state.DIAGRAMA ,APOIOS:state.APOIOS,ARMADURA:state.ARMADURA.filter(x => x.id !== action.payload.id),CADASTRAR: false, SECAO: state.SECAO}
        
        case actionType.ADD_SECAO:
            return {
                DIAGRAMA:state.DIAGRAMA ,
                APOIOS:state.APOIOS,
                ARMADURA:[],
                CADASTRAR: true,
                SECAO:[...state.SECAO,[...state.ARMADURA]]
            }

        case actionType.REMOVER_SECAO:
            return {
                DIAGRAMA:state.DIAGRAMA ,
                APOIOS:state.APOIOS,
                ARMADURA:state.ARMADURA,
                CADASTRAR: false,
                SECAO:state.SECAO.slice(0,-1)
            }

        case actionType.CADASTRAR:

            state.SECAO[state.SECAO.length-1]['pontos'] = action.payload

            console.log(state.SECAO)


            return {
                DIAGRAMA:state.DIAGRAMA ,
                APOIOS:state.APOIOS,
                ARMADURA:state.ARMADURA,
                CADASTRAR: false,
                SECAO: state.SECAO
            }


        
        default:
            return state
    }
}

export {reducers}
