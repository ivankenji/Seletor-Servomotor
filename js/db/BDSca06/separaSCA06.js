import XLSX from 'xlsx'

export function separaSca06(selectedFile){
  return new Promise (retorno=>{
    //abre arquivo
    const fileReader = new FileReader()
    let data=[];
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event)=>{
      const bstr=event.target.result
      const workBook=XLSX.read(bstr,{type:"binary"})
      //loop em cada planilha
      workBook.SheetNames.forEach(sheetName => {
        const rowObject = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
        //loop em cada linha de dados
        let lastDataRowObj={}
        rowObject.forEach(dataRow => {
          let dataRowObj={}
          dataRowObj.referencia = dataRow.Referência
          let posTamanho = 5
          let posCorrenteInicio = posTamanho+1
          let posCorrenteFinal = dataRowObj.referencia.search("P")+1
          let posTipoTensao = posCorrenteFinal+1
          let posTensao = posTipoTensao + 1
          // Separa Tamanho
          dataRowObj.tamanho = dataRowObj.referencia.substr(posTamanho,1)
          // Separa Corrente
          let strTemp = dataRowObj.referencia.substr(posCorrenteInicio,posCorrenteFinal-posCorrenteInicio+1)
          strTemp = strTemp.toString().replace("P",".")
          dataRowObj.corrente = parseFloat(strTemp)
          // Tipo Tensão (mono ou tri)
          strTemp = dataRowObj.referencia.substr(posTipoTensao,1)
          if(strTemp == "D") dataRowObj.tipoTensao = "Mono ou Tri"
          if(strTemp == "T") dataRowObj.tipoTensao = "Trifásico"
          // Tensão
          strTemp = dataRowObj.referencia.substr(posTensao,1)
          if(strTemp == "2") dataRowObj.tensao = "220-240"
          if(strTemp == "4") dataRowObj.tensao = "380-480"
          // Manual
          dataRowObj.manual = dataRowObj.referencia.search("P6") > 0 ? "Sim" : "Não"
          // Filtro
          dataRowObj.filtro = dataRowObj.referencia.search("C3") > 0 ? "Sim" : "Não"
          // Fonte
          dataRowObj.fonte = dataRowObj.referencia.search("W2") > 0 ? "Sim" : "Não"
          // STO
          dataRowObj.sto = dataRowObj.referencia.search("Y1") > 0 ? "Sim" : "Não"
          //Código
          dataRowObj.codigo = dataRow.Código.toString()

          // Se Preço for indefinido, repete anterior
          if (typeof(dataRow.Preço) === 'undefined') {
            dataRowObj.preco=lastDataRowObj.preco
          }else{
            // se não for indefinido, elimina ","
            let precostr = dataRow.Preço.toString().replace(".","")
            precostr = precostr.toString().replace(",",".")
            //console.log(precostr)
            dataRowObj.preco=parseFloat(precostr)
            //console.log(dataRowObj)
          }

          // Se IPI for indefinido, repete anterior
          if (typeof(dataRow.IPI) === 'undefined') {
            dataRowObj.ipi=lastDataRowObj.ipi
          }else{
            dataRowObj.ipi = dataRow.IPI
          }
          
          console.log(dataRowObj)
          lastDataRowObj=dataRowObj
          data.push(dataRowObj)
        })
      });
      retorno(data)
    }
  })
}
