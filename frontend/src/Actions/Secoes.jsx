import actionType from "../Constants";

const actions ={
    adicionar: el =>({
        type: actionType.ADD_SECAO,
        payload: el,
    }),
    remover: el =>({
        type: actionType.REMOVER_SECAO,
        payload: el,
    }),
    cadastrar: el =>({
        type: actionType.CADASTRAR,
        payload: el,
    })
}

export {actions}
