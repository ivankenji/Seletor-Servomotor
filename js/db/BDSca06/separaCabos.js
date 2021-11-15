import XLSX from 'xlsx'

export function separaCabos(selectedFile){
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
        rowObject.forEach(dataRow => {
          let dataRowObj={}
          dataRowObj.referencia = dataRow.Referência

          //let strAtual=dataRowObj.referencia
          let letraM = dataRowObj.referencia.indexOf("m")
          let hifem1 = dataRowObj.referencia.lastIndexOf("-",letraM)
          //let strParte1 = readDataRow[index].substr(hifem1+1,letraM-hifem1-1)

          //Tipo
          dataRowObj.tipo = dataRowObj.referencia.substr(0,hifem1)
          //Comrprimento
          let comprimento = dataRowObj.referencia.substr(hifem1+1,letraM-hifem1-1)
          comprimento = comprimento.replace(",",".")
          dataRowObj.comprimento=parseFloat(comprimento)
          //Bitola para cabo CR
          if((dataRowObj.tipo).search("CR")>=0){
            dataRowObj.bitola="6x0,2 mm² + 2x0,5 mm²"
          }
          //Bitola para cabo CF
          if((dataRowObj.tipo).search("CF")>=0){
            dataRowObj.bitola="2x0,75 mm²"
          }
          //Bitola para cabo CP ou SPC
          if((dataRowObj.tipo).search("CP")>=0 || (dataRowObj.tipo).search("SPC")>=0){
            let strTemp = dataRowObj.referencia.substr(letraM+2)
            dataRowObj.bitola = strTemp.substr(0,strTemp.search("-"))
          }
          //Tipo de conector
          dataRowObj.conector= (dataRowObj.referencia).search("-90")>=0 ? "90 graus" : "Reto";
          //Instalação
          if((dataRowObj.tipo).search("CR")>=0 || (dataRowObj.tipo).search("CF")>=0 || (dataRowObj.referencia).search("-M")>=0){
            dataRowObj.instalacao = "Movimentação"
          }else dataRowObj.instalacao = "Fixa"

          //Código
          dataRowObj.codigo = dataRow.Código.toString()
          // verifica se for Preço, elimina "."
          let precostr = dataRow.Preço.toString().replace(".","")
          precostr = precostr.toString().replace(",",".")
          dataRowObj.preco=parseFloat(precostr)
          //IPI
          dataRowObj.ipi = dataRow.IPI

          data.push(dataRowObj)
        })
      });
      retorno(data)
    }
  })
}