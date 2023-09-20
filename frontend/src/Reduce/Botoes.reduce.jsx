import actionType from "../Constants";

const INITIAL_STATE = {
    APOIOS: [],
    DIAGRAMA:[],
    ARMADURA:[]

}

const reducers  =(state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionType.ADD_APOIO:
            return {APOIOS: [...state.APOIOS, {...action.payload}],DIAGRAMA:state.DIAGRAMA,ARMADURA:state.ARMADURA}
        case actionType.REMOVER_APOIO:
            return {APOIOS: state.APOIOS.filter(x => x.id !== action.payload.id),DIAGRAMA:state.DIAGRAMA,ARMADURA:state.ARMADURA}
        case actionType.ADD_MOMENTO:
            return {DIAGRAMA: [...state.DIAGRAMA, {...action.payload}],APOIOS:state.APOIOS,ARMADURA:state.ARMADURA}
        case actionType.REMOVER_MOMENTO:
            return {DIAGRAMA: state.DIAGRAMA.filter(x => x.id !== action.payload.id),APOIOS:state.APOIOS,ARMADURA:state.ARMADURA}
        case actionType.ADD_ARMADURA:
            return {DIAGRAMA:state.DIAGRAMA ,APOIOS:state.APOIOS,ARMADURA:[...state.ARMADURA, {...action.payload}]}
        case actionType.REMOVER_ARMADURA:
            return {DIAGRAMA:state.DIAGRAMA ,APOIOS:state.APOIOS,ARMADURA:state.ARMADURA.filter(x => x.id !== action.payload.id)}
        default:
            return state
    }
}

export {reducers}
