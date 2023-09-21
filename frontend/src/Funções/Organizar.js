function organizar(dataset,valornovo){
    /*
    dataset: dataset dos valores consolidados
    valornovo: valor novo a ser inserido no dataset
    */
   const saida = []
   let j = 0
   let jacoloquei = false

    for(let i = 0;i<dataset.length;i++){
        if(dataset[i]['X']<valornovo['X']){
            j = j + 1
        }
        else if(dataset[i]['X']>valornovo['X'] && !jacoloquei){
            saida.push(valornovo)
            jacoloquei = true
        }
        saida.push(dataset[i])
    }

    if (j===dataset.length){
        saida.push(valornovo)
    }

    return saida
}

export default organizar