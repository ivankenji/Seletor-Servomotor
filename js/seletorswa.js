// Carrega banco de dados e converte para JSON
bdSWA = JSON.parse(bdSWA)
bdCabos = JSON.parse(bdCabos)
bdSca06= JSON.parse(bdSca06)

// gera itens únicos para o Feedback
const listaFeedback = _.uniq(_.map(bdSWA, item => item.feedback));
let selectElementFeedback = document.getElementById('feedback');
selectElementFeedback.innerHTML=""
selectElementFeedback.add(new Option("Selecione a Realimentação"));
listaFeedback.forEach(function(item, i) {
  selectElementFeedback.add(new Option(item));
})

selecionaMotor(bdSWA)

function selecionaMotor(dadosSwa){

  let selectElementFeedback = document.getElementById('feedback');
  let selectElementFreio = document.getElementById('freio');
  let selectElementTensao = document.getElementById('tensao');
  let selectElementRotacao = document.getElementById('rpm');
  let selectElementTorque = document.getElementById('torque');

  // oculta todos os campos
  document.getElementById("linhaFreio").className = "hide"
  document.getElementById("linhaTensao").className = "hide"
  document.getElementById("linhaRotacao").className = "hide"
  document.getElementById("linhaTorque").className = "hide"
  document.getElementById("containerCabo").className = "hide"
  document.getElementById("containerDrive").className = "hide"
  document.getElementById("containerResultado").className = "hide"

  //FEEDBACK
  listaUnico = _.uniq(_.map(dadosSwa, item => item.feedback));
  //atualiza html
  elementoSelecionado = selectElementFeedback.value
  selectElementFeedback.innerHTML=""
  selectElementFeedback.add(new Option("Selecione a Realimentação"));
  listaUnico.forEach(function(item, i) {
    selectElementFeedback.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista ou for item único na lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found || listaUnico.length == 1){
    selectElementFeedback.value = elementoSelecionado
  }
  //filtro
  dadosSwa = dadosSwa.filter(({feedback}) => feedback == selectElementFeedback.value);

  //FREIO
  listaUnico = _.uniq(_.map(dadosSwa, item => item.freio));
  //atualiza html
  elementoSelecionado = selectElementFreio.value
  selectElementFreio.innerHTML=""
  selectElementFreio.add(new Option("Selecione o Freio"));
  listaUnico.forEach(function(item, i) {
    selectElementFreio.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista ou for item único na lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found || listaUnico.length == 1){
    selectElementFreio.value = elementoSelecionado
  }
  //verifica se tem algum item na lista
  if(listaUnico.length>1){
    document.getElementById("linhaFreio").className = ""
  }else{
    document.getElementById("linhaFreio").className = "hide"
  }
  //filtro
  dadosSwa = dadosSwa.filter(({freio}) => freio == selectElementFreio.value);

  //TENSÃO
  listaUnico = _.uniq(_.map(dadosSwa, item => item.tensao));
  //atualiza html
  elementoSelecionado = selectElementTensao.value
  selectElementTensao.innerHTML=""
  selectElementTensao.add(new Option("Selecione a Tensão"));
  listaUnico.forEach(function(item, i) {
    selectElementTensao.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista ou for item único na lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found || listaUnico.length == 1){
    selectElementTensao.value = elementoSelecionado
  }
  //filtro
  dadosSwa = dadosSwa.filter(({tensao}) => tensao == selectElementTensao.value);

  //ROTAÇÃO
  listaUnico = _.uniq(_.map(dadosSwa, item => item.rotacao));
  //atualiza html
  elementoSelecionado = selectElementRotacao.value
  selectElementRotacao.innerHTML=""
  selectElementRotacao.add(new Option("Selecione a Rotação"));
  listaUnico.forEach(function(item, i) {
    selectElementRotacao.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista ou for item único na lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementRotacao.value = elementoSelecionado
  }
  if(listaUnico.length == 1){
    selectElementRotacao.value = listaUnico[0]
  }
  //filtro
  dadosSwa = dadosSwa.filter(({rotacao}) => rotacao == selectElementRotacao.value);

  //TORQUE
  listaUnico = _.uniq(_.map(dadosSwa, item => item.torque));
  //atualiza html
  elementoSelecionado = selectElementTorque.value
  selectElementTorque.innerHTML=""
  selectElementTorque.add(new Option("Selecione o Torque"));
  listaUnico.forEach(function(item, i) {
    selectElementTorque.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista ou for item único na lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementTorque.value = elementoSelecionado
  }
  if(listaUnico.length == 1){
    selectElementTorque.value = listaUnico[0]
  }
  //filtro
  dadosSwa = dadosSwa.filter(({torque}) => torque == selectElementTorque.value);

  function DeleteRows(tableID) {
    let tableRef = document.getElementById(tableID);
    var rowCount = tableRef.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
      tableRef.deleteRow(i);
    }
  }
  // deleta linhas da tabela
  DeleteRows("tabelaResultado")
  
  if (dadosSwa.length == 1){
    servoSelecionado = selecionaSca06(dadosSwa[0])
    caboSelecionado = selecionaCabo(dadosSwa[0])

    // se demais itens já foram selecionados
    addRow('tabelaResultado', dadosSwa[0]);
    if(servoSelecionado.length > 0){
      addRow('tabelaResultado', servoSelecionado[0]);
    }
    // CP
    if(caboSelecionado[0].length > 0){
      addRow('tabelaResultado', caboSelecionado[0][0]);
    }
    // CR
    if(caboSelecionado[1].length > 0){
      addRow('tabelaResultado', caboSelecionado[1][0]);
    }
    // CF
    if(caboSelecionado[2].length > 0){
      addRow('tabelaResultado', caboSelecionado[2][0]);
    }
  }else{
    servoSelecionado=[]
    caboSelecionado=[]
  }

  function addRow(tableID, tbDados) {
    // Get a reference to the table
    let tableRef = document.getElementById(tableID);

    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);
  
    // Insert a cell in the row at index 0
    let newCellCodigo = newRow.insertCell(0);
    let newCellReferencia = newRow.insertCell(1);
  
    // Append a text node to the cell
    let textCodigo = document.createTextNode(tbDados.codigo);
    let textReferencia = document.createTextNode(tbDados.referencia);
    newCellCodigo.appendChild(textCodigo);
    newCellReferencia.appendChild(textReferencia);
  }
}

function selecionaSca06(dadosMotor){
  let selectElementDriveSto = document.getElementById('driveSto');
  let selectElementDriveRfi = document.getElementById('driveFiltroRfi');
  let selectElementDriveFonte = document.getElementById('driveFonteInterna');
  let selectElementDriveManual = document.getElementById('driveManual');

  driveBase = dadosMotor.servoconversor
  //driveBase.length

  //FILTRA DRIVE BASE
  function filterByValue(array, value) {
    return array.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  dadosDrive = filterByValue(bdSca06, driveBase)

  //STO
  listaUnico = _.uniq(_.map(dadosDrive, item => item.sto));
  //atualiza html
  elementoSelecionado = selectElementDriveSto.value
  selectElementDriveSto.innerHTML=""
  selectElementDriveSto.add(new Option("Selecione STO"));
  listaUnico.forEach(function(item, i) {
    selectElementDriveSto.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista ou for item único na lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementDriveSto.value = elementoSelecionado
  }
  if(listaUnico.length == 1){
    selectElementDriveSto.value = listaUnico[0]
  }
  //filtro
  dadosDrive = dadosDrive.filter(({sto}) => sto === selectElementDriveSto.value);

  //FILTRO RFI
  listaUnico = _.uniq(_.map(dadosDrive, item => item.filtro));
  //atualiza html
  elementoSelecionado = selectElementDriveRfi.value
  selectElementDriveRfi.innerHTML=""
  selectElementDriveRfi.add(new Option("Selecione Filtro RFI"));
  listaUnico.forEach(function(item, i) {
    selectElementDriveRfi.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista ou for item único na lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementDriveRfi.value = elementoSelecionado
  }
  if(listaUnico.length == 1){
    selectElementDriveRfi.value = listaUnico[0]
  }
  //filtro
  dadosDrive = dadosDrive.filter(({filtro}) => filtro === selectElementDriveRfi.value);

  //FONTE
  listaUnico = _.uniq(_.map(dadosDrive, item => item.fonte));
  //atualiza html
  elementoSelecionado = selectElementDriveFonte.value
  selectElementDriveFonte.innerHTML=""
  selectElementDriveFonte.add(new Option("Selecione Fonte"));
  listaUnico.forEach(function(item, i) {
    selectElementDriveFonte.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista ou for item único na lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementDriveFonte.value = elementoSelecionado
  }
  if(listaUnico.length == 1){
    selectElementDriveFonte.value = listaUnico[0]
  }
  //filtro
  dadosDrive = dadosDrive.filter(({fonte}) => fonte === selectElementDriveFonte.value);

  //MANUAL
  listaUnico = _.uniq(_.map(dadosDrive, item => item.manual));
  //atualiza html
  elementoSelecionado = selectElementDriveManual.value
  selectElementDriveManual.innerHTML=""
  selectElementDriveManual.add(new Option("Selecione Manual"));
  listaUnico.forEach(function(item, i) {
    selectElementDriveManual.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista ou for item único na lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementDriveManual.value = elementoSelecionado
  }
  if(listaUnico.length == 1){
    selectElementDriveManual.value = listaUnico[0]
  }
  //filtro
  dadosDrive = dadosDrive.filter(({manual}) => manual === selectElementDriveManual.value);

  return (dadosDrive)
}

function selecionaCabo(dadosMotor){
  let selectElementTipoConector = document.getElementById('tipoConector');
  let selectElementInstalacao = document.getElementById('instalacao');
  let selectElementComprimento = document.getElementById('comprimentoCabo');

  // separar dados do cabo
  cabo = dadosMotor.cabo
  cabo = cabo.replace(/\s/g, '')
  cabo = cabo.split("-")
  tipoCabo = cabo[0]
  bitolaCabo = cabo[2]
//  if(dadosMotor.freio == "Com Freio") freio = true
//  else freio=false
  if(tipoCabo=="SPC"){
    tipoCaboFreio = "CF-SBC"
  }else{
    tipoCaboFreio = "CF"
  }

  // Filtro Bitola
  // se for 0,75, inclui na lista 1,5
  if (bitolaCabo == "4x0,75"){
    dadosCabos = bdCabos.filter(({bitola}) => bitola === bitolaCabo || bitola === "4x1,5");
  }else{
    dadosCabos = bdCabos.filter(({bitola}) => bitola === bitolaCabo);
  }
  //resolver
  dadosCaboResolver = bdCabos.filter(({tipo}) => tipo == "CR");

  //freio
  if(dadosMotor.freio == "Com Freio"){
    dadosCaboFreio = bdCabos.filter(({tipo}) => tipo == tipoCaboFreio);
  }else{
	  dadosCaboFreio=[]
  }
  //TIPO CONECTOR
  listaUnico = _.uniq(_.map(dadosCabos, item => item.conector));
  novalista=[]
  listaUnico.forEach(item=>{
	dadosCaboResolver = bdCabos.filter(({tipo, conector}) => tipo == "CR" && conector == item);
	dadosCaboFreio = bdCabos.filter(({tipo, conector}) => tipo == tipoCaboFreio && conector == item);
	//filtra itens
    if(dadosCaboResolver.length>0 && (!freio || dadosCaboFreio.length>0)){
	  	novalista.push(item)
    }
  })
  listaUnico = novalista

  //atualiza html
  let elementoSelecionado = selectElementTipoConector.value
  selectElementTipoConector.innerHTML=""
  selectElementTipoConector.add(new Option("Selecione o Conector"));
  listaUnico.forEach(function(item, i) {
    selectElementTipoConector.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista ou se for item único na lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementTipoConector.value = elementoSelecionado
  }
  if(listaUnico.length == 1){
    selectElementTipoConector.value = listaUnico[0]
  }
  //filtro
  dadosCabos = dadosCabos.filter(({conector}) => conector === selectElementTipoConector.value);
  dadosCaboResolver = dadosCaboResolver.filter(({conector}) => conector === selectElementTipoConector.value);
  dadosCaboFreio = dadosCaboFreio.filter(({conector}) => conector === selectElementTipoConector.value);

  //INSTALAÇÃO
  listaUnico = _.uniq(_.map(dadosCabos, item => item.instalacao));

  novalista=[]
  listaUnico.forEach(item=>{
	// cabo de resolver é sempre movimentação
	dadosCaboFreio = bdCabos.filter(({tipo, conector, instalacao}) => tipo == tipoCaboFreio && conector == selectElementTipoConector.value && instalacao == item);
	//filtra itens
    if(!freio || dadosCaboFreio.length>0){
	  	novalista.push(item)
    }
  })
  listaUnico = novalista
  //atualiza html
  elementoSelecionado = selectElementInstalacao.value
  selectElementInstalacao.innerHTML=""
  selectElementInstalacao.add(new Option("Tipo Instalação"));
  listaUnico.forEach(function(item, i) {
    selectElementInstalacao.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista ou for item único na lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementInstalacao.value = elementoSelecionado
  }
  if(listaUnico.length == 1){
    selectElementInstalacao.value = listaUnico[0]
  }
  //filtro
  dadosCabos = dadosCabos.filter(({instalacao}) => instalacao === selectElementInstalacao.value);

  //COMPRIMENTO
  listaUnico = _.uniq(_.map(dadosCabos, item => item.comprimento));
  novalista=[]
  listaUnico.forEach(item=>{
    dadosCaboResolver = bdCabos.filter(({tipo, conector, comprimento}) => tipo == "CR" && conector == selectElementTipoConector.value && comprimento == item);
    dadosCaboFreio = bdCabos.filter(({tipo, conector, comprimento}) => tipo == tipoCaboFreio && conector == selectElementTipoConector.value && comprimento == item);
    if(dadosCaboResolver.length>0 && (dadosMotor.freio == "Sem Freio" || dadosCaboFreio.length>0)){
    //if(dadosCaboResolver.length>0 && dadosCaboFreio.length>0){
      novalista.push(item)
    }
  })
  listaUnico = novalista
  //atualiza html
  elementoSelecionado = selectElementComprimento.value
  selectElementComprimento.innerHTML=""
  selectElementComprimento.add(new Option("Comprimento"));
  listaUnico.forEach(function(item, i) {
    selectElementComprimento.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista ou for item único na lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementComprimento.value = elementoSelecionado
  }
  if(listaUnico.length == 1){
    selectElementComprimento.value = listaUnico[0]
  }
  //filtro
  dadosCabos = dadosCabos.filter(({comprimento}) => comprimento == selectElementComprimento.value);
  // se for motor absoluto, não precisa de cabo de resolver
  if(tipoCabo == "SPC"){
    dadosCaboResolver = []
  }else{
    dadosCaboResolver = bdCabos.filter(({tipo, conector, comprimento}) => tipo == "CR" && conector == selectElementTipoConector.value && comprimento == selectElementComprimento.value);
  }
  if (dadosMotor.freio == "Com Freio"){
	dadosCaboFreio = bdCabos.filter(({tipo, conector, instalacao, comprimento}) => tipo == tipoCaboFreio && conector == selectElementTipoConector.value && instalacao == selectElementInstalacao.value && comprimento == selectElementComprimento.value);	  
  }else{
	dadosCaboFreio=[]
  }


  // se encotrou mais de 1 resultado, filtra novamente pela bitola (caso cabos 0,75 e 1,5)
  if(dadosCabos.length > 1){
    dadosCabos = dadosCabos.filter(({bitola}) => bitola == bitolaCabo);
  }
  return [dadosCabos,dadosCaboResolver,dadosCaboFreio]
}

const change = (e) => {
  selecionaMotor(bdSWA)
};
document.getElementById('feedback').addEventListener('change', change);
document.getElementById('freio').addEventListener('change', change);
document.getElementById('tensao').addEventListener('change', change);
document.getElementById('rpm').addEventListener('change', change);
document.getElementById('torque').addEventListener('change', change);
document.getElementById('tipoConector').addEventListener('change', change);
document.getElementById('instalacao').addEventListener('change', change);
document.getElementById('comprimentoCabo').addEventListener('change', change);
document.getElementById('driveSto').addEventListener('change', change);
document.getElementById('driveFiltroRfi').addEventListener('change', change);
document.getElementById('driveFonteInterna').addEventListener('change', change);
document.getElementById('driveManual').addEventListener('change', change);

