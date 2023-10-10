import actionType from "../Constants";

const INITIAL_STATE = {
    CARACTERISTICAS: {
        fck:0,
        h:0,
        bw:0,
        ductilidade:0,
        vmax:0,
        vmin:0,
        agregado:'Basalto e Diabásio',
        alturautil:0
    }
}

const reducers = (state = INITIAL_STATE, action)=>{
    switch (action.type){
        case actionType.ADD_CARACTERISTICAS:
            return {CARACTERISTICAS:action.payload}
        default:
                return state
    }
}


export {reducers}