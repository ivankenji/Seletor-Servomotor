import XLSX from 'xlsx'

export function separaSwa(selectedFile){
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

          // Se for encoder absoluto 20bits
          if(dataRow.Referência.search("DM20C9") >=0){
            let hifem1 = dataRowObj.referencia.search("-")
            hifem1 = dataRowObj.referencia.indexOf("-", hifem1+1)
            let str1 = dataRowObj.referencia.substr(0,dataRowObj.referencia.search("-"))
            let str2 = dataRowObj.referencia.substr(dataRowObj.referencia.search("-")+1)
            dataRowObj.referencia=str1.concat(str2)
            dataRowObj.feedback='Absoluto 20 bits'
          }else dataRowObj.feedback='Resolver'
          //carcaca
          dataRowObj.carcaca = parseInt(dataRowObj.referencia.substr(4,dataRowObj.referencia.search("-")-5))
          //tensão
          let tensao = dataRowObj.referencia.substr(dataRowObj.referencia.search("-")-1,1)
          if(tensao==='2') dataRowObj.tensao="220-240"
          if(tensao==='4') dataRowObj.tensao="380-480"

          // Torque
          let h1 = dataRowObj.referencia.search("-")
          let h2 = dataRowObj.referencia.indexOf("-",h1+1)
          let strTemp=dataRowObj.referencia.substr(h1+1,h2-h1-1)
          strTemp = strTemp.toString().replace(",",".")
          dataRowObj.torque = parseFloat(strTemp)
          //Rotação
          dataRowObj.rotacao = dataRowObj.referencia.substr(h2+1,2)*100
          //Corrente
          dataRowObj.corrente = dataRow.Corrente

          //Freio
          if(dataRowObj.referencia.search('-F') >=0 || dataRowObj.referencia.search('\\+F') >=0){
            dataRowObj.freio = "Com Freio"
          }else{
            dataRowObj.freio = "Sem Freio"
          }

          // Cabo de potência se for indefinido, repete valor anterior
          if (typeof(dataRow.Cabo) === 'undefined') {
            dataRowObj.cabo=lastDataRowObj.cabo
          }else{
            dataRowObj.cabo = dataRow.Cabo
          }
          // Servoconversor, se for indefinido, repete valor anterior
          if (typeof(dataRow.Servoconversor) === 'undefined') {
            dataRowObj.servoconversor=lastDataRowObj.servoconversor
          }else{
            dataRowObj.servoconversor = dataRow.Servoconversor
          }
          //Código
          dataRowObj.codigo = dataRow.Código.toString()
          // Preço  verifica se for Preço, elimina "."
          let precostr = dataRow.Preço.toString().replace(".","")
          precostr = precostr.toString().replace(",",".")
          dataRowObj.preco=parseFloat(precostr)
          //IPI
          dataRowObj.ipi = dataRow.IPI

          lastDataRowObj=dataRowObj
          data.push(dataRowObj)
        })
      });
      retorno(data)
    }
  })
}
