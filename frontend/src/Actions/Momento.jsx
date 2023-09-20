import actionType from "../Constants";

const actions ={
    adicionar: el =>({
        type: actionType.ADD_MOMENTO,
        payload: el,
    }),
    remover: el =>({
        type: actionType.REMOVER_MOMENTO,
        payload: el,
    })
}

export {actions}
