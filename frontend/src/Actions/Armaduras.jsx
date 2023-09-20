import actionType from "../Constants";

const actions ={
    adicionar: el =>({
        type: actionType.ADD_ARMADURA,
        payload: el,
    }),
    remover: el =>({
        type: actionType.REMOVER_ARMADURA,
        payload: el,
    })
}

export {actions}
