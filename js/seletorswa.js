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

/*motorSelecionado = {
  cabo: "CP-...m-4x0,75-B",
  carcaca: 56,
  codigo: "10362947",
  corrente: "2,5",
  feedback: "Resolver",
  freio: "Sem Freio",
  ipi: 0,
  preco: 7096.23,
  referencia: "SWA 562-2,5-20 ",
  rotacao: 2000,
  servoconversor: "SCA06B05P0D2",
  tensao: "220-240",
  torque: 2.5,
}
selecionaSca06(motorSelecionado)
*/


function selecionaMotor(dadosSwa){
  let selectElementFeedback = document.getElementById('feedback');
  let selectElementFreio = document.getElementById('freio');
  let selectElementTensao = document.getElementById('tensao');
  let selectElementRotacao = document.getElementById('rpm');
  let selectElementTorque = document.getElementById('torque');
  let txtMotorSelecionado = document.getElementById('motorSelecionado');

  //FEEDBACK
  listaUnico = _.uniq(_.map(dadosSwa, item => item.feedback));
  //atualiza html
  elementoSelecionado = selectElementFeedback.value
  selectElementFeedback.innerHTML=""
  selectElementFeedback.add(new Option("Selecione a Realimentação"));
  listaUnico.forEach(function(item, i) {
    selectElementFeedback.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
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
  //verifica se o elemento ainda existe na nova lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementFreio.value = elementoSelecionado
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
  //verifica se o elemento ainda existe na nova lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementTensao.value = elementoSelecionado
  }
  //filtro
  dadosSwa = dadosSwa.filter(({tensao}) => tensao == selectElementTensao.value);

  //ROTAÇÃO
  listaUnico = _.uniq(_.map(dadosSwa, item => item.rotacao));
  //atualiza html
  elementoSelecionado = selectElementRotacao.value
  selectElementRotacao.innerHTML=""
  selectElementRotacao.add(new Option("Selecione a Tensão"));
  listaUnico.forEach(function(item, i) {
    selectElementRotacao.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementRotacao.value = elementoSelecionado
  }
  //filtro
  dadosSwa = dadosSwa.filter(({rotacao}) => rotacao == selectElementRotacao.value);

  //TORQUE
  listaUnico = _.uniq(_.map(dadosSwa, item => item.torque));
  //atualiza html
  elementoSelecionado = selectElementTorque.value
  selectElementTorque.innerHTML=""
  selectElementTorque.add(new Option("Selecione a Tensão"));
  listaUnico.forEach(function(item, i) {
    selectElementTorque.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementTorque.value = elementoSelecionado
  }
  //filtro
  dadosSwa = dadosSwa.filter(({torque}) => torque == selectElementTorque.value);

  if (Object.keys(dadosSwa).length == 1){
    txtMotorSelecionado.innerText = "Código Motor: " + dadosSwa[0].codigo + " Referência: " + dadosSwa[0].referencia
    selecionaSca06(dadosSwa[0])
    selecionaCabo(dadosSwa[0])
    // se demais itens já foram selecionados
  }else{
    txtMotorSelecionado.innerText = ""
  }

}

function selecionaSca06(dadosMotor){
  console.log(dadosMotor)
  let selectElementDriveSto = document.getElementById('driveSto');
  let selectElementDriveRfi = document.getElementById('driveFiltroRfi');
  let selectElementDriveFonte = document.getElementById('driveFonteInterna');
  let selectElementDriveManual = document.getElementById('driveManual');
  let txtDriveSelecionado = document.getElementById('driveSelecionado');

  driveBase = dadosMotor.servoconversor
  console.log(driveBase)
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
  //verifica se o elemento ainda existe na nova lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementDriveSto.value = elementoSelecionado
  }
  //filtro
  dadosDrive = dadosDrive.filter(({sto}) => sto === selectElementDriveSto.value);

  //FILTRO RFI
  listaUnico = _.uniq(_.map(dadosDrive, item => item.filtro));
  console.log(listaUnico)
  //atualiza html
  elementoSelecionado = selectElementDriveRfi.value
  selectElementDriveRfi.innerHTML=""
  selectElementDriveRfi.add(new Option("Selecione Filtro RFI"));
  listaUnico.forEach(function(item, i) {
    selectElementDriveRfi.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementDriveRfi.value = elementoSelecionado
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
  //verifica se o elemento ainda existe na nova lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementDriveFonte.value = elementoSelecionado
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
  //verifica se o elemento ainda existe na nova lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementDriveManual.value = elementoSelecionado
  }
  //filtro
  dadosDrive = dadosDrive.filter(({manual}) => manual === selectElementDriveManual.value);

  if (Object.keys(dadosDrive).length == 1){
    txtDriveSelecionado.innerText = "Código Drive: "+ dadosDrive[0].codigo  + " Modelo: " + dadosDrive[0].referencia
    // se demais itens já foram selecionados
  }else{
    txtDriveSelecionado.innerText = ""
  }


  console.log("testedrive",dadosDrive)
  console.log(dadosDrive)
}

function selecionaCabo(dadosMotor){
  let selectElementTipoConector = document.getElementById('tipoConector');
  let selectElementInstalacao = document.getElementById('instalacao');
  let selectElementComprimento = document.getElementById('comprimentoCabo');
  let txtCaboSelecionado = document.getElementById('caboSelecionado');

  // separar dados do cabo
  cabo = dadosMotor.cabo
  cabo = cabo.replace(/\s/g, '')
  cabo = cabo.split("-")
  tipoCabo = cabo[0]
  bitolaCabo = cabo[2]
  if(dadosMotor.freio == "Com Freio") freio = true
  else freio=false
	console.log("freio", freio)

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
  if(freio){
    dadosCaboFreio = bdCabos.filter(({tipo}) => tipo == "CF");
  }else{
	  dadosCaboFreio=[]
  }
  //TIPO CONECTOR
  listaUnico = _.uniq(_.map(dadosCabos, item => item.conector));
  novalista=[]
  listaUnico.forEach(item=>{
	dadosCaboResolver = bdCabos.filter(({tipo, conector}) => tipo == "CR" && conector == item);
	dadosCaboFreio = bdCabos.filter(({tipo, conector}) => tipo == "CF" && conector == item);
	//filtra itens
    if(dadosCaboResolver.length>0 && (!freio || dadosCaboFreio.length>0)){
		novalista.push(item)
    }
  })
  listaUnico = novalista
  console.log("listaunico_conector",listaUnico)
  //atualiza html
  let elementoSelecionado = selectElementTipoConector.value
  selectElementTipoConector.innerHTML=""
  selectElementTipoConector.add(new Option("Selecione o Conector"));
  listaUnico.forEach(function(item, i) {
    selectElementTipoConector.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementTipoConector.value = elementoSelecionado
  }
  //filtro
  dadosCabos = dadosCabos.filter(({conector}) => conector === selectElementTipoConector.value);
  dadosCaboResolver = dadosCaboResolver.filter(({conector}) => conector === selectElementTipoConector.value);
  dadosCaboFreio = dadosCaboFreio.filter(({conector}) => conector === selectElementTipoConector.value);

  //INSTALAÇÃO
  listaUnico = _.uniq(_.map(dadosCabos, item => item.instalacao));
console.log("listaUnico", listaUnico)

  novalista=[]
  listaUnico.forEach(item=>{
	// cabo de resolver é sempre movimentação
	dadosCaboFreio = bdCabos.filter(({tipo, conector, instalacao}) => tipo == "CF" && conector == selectElementTipoConector.value && instalacao == item);
	//filtra itens
    if(!freio || dadosCaboFreio.length>0){
		novalista.push(item)
    }
  })
  listaUnico = novalista
  console.log("listaunico_inst",listaUnico)
  //atualiza html
  elementoSelecionado = selectElementInstalacao.value
  selectElementInstalacao.innerHTML=""
  selectElementInstalacao.add(new Option("Tipo Instalação"));
  listaUnico.forEach(function(item, i) {
    selectElementInstalacao.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementInstalacao.value = elementoSelecionado
  }
  //filtro
  dadosCabos = dadosCabos.filter(({instalacao}) => instalacao === selectElementInstalacao.value);

  //COMPRIMENTO
  listaUnico = _.uniq(_.map(dadosCabos, item => item.comprimento));
  novalista=[]
  listaUnico.forEach(item=>{
	dadosCaboResolver = bdCabos.filter(({tipo, conector, comprimento}) => tipo == "CR" && conector == selectElementTipoConector.value && comprimento == item);
	dadosCaboFreio = bdCabos.filter(({tipo, conector, comprimento}) => tipo == "CF" && conector == selectElementTipoConector.value && comprimento == item);
    if(dadosCaboResolver.length>0 && (!freio || dadosCaboFreio.length>0)){
    //if(dadosCaboResolver.length>0 && dadosCaboFreio.length>0){
      novalista.push(item)
    }
  })
  listaUnico = novalista
  //atualiza html
  elementoSelecionado = selectElementComprimento.value
  selectElementComprimento.innerHTML=""
  selectElementComprimento.add(new Option("Tipo Instalação"));
  listaUnico.forEach(function(item, i) {
    selectElementComprimento.add(new Option(item));
  })
  //verifica se o elemento ainda existe na nova lista
  found = listaUnico.find(element => element == elementoSelecionado);
  if(found){
    selectElementComprimento.value = elementoSelecionado
  }
  //filtro
  dadosCabos = dadosCabos.filter(({comprimento}) => comprimento == selectElementComprimento.value);
  dadosCaboResolver = bdCabos.filter(({tipo, conector, comprimento}) => tipo == "CR" && conector == selectElementTipoConector.value && comprimento == selectElementComprimento.value);
  if (freio){
	dadosCaboFreio = bdCabos.filter(({tipo, conector, instalacao, comprimento}) => tipo == "CF" && conector == selectElementTipoConector.value && instalacao == selectElementInstalacao.value && comprimento == selectElementComprimento.value);	  
  }else{
	dadosCaboFreio=[]
  }

  // se encotrou mais de 1 resultado, filtra novamente pela bitola (caso cabos 0,75 e 1,5)
  if(dadosCabos.length > 1){
    dadosCabos = dadosCabos.filter(({bitola}) => bitola == bitolaCabo);
  }
  console.log(dadosCaboResolver,dadosCaboFreio )

  if (Object.keys(dadosCabos).length == 1){
	if(freio){
		txtFreio = "Código Cabo Freio: " + dadosCaboFreio[0].codigo + " Referência: " + dadosCaboFreio[0].referencia
	}else{
		txtFreio=""
	}
    txtCaboSelecionado.innerText = "Código Cabo Potência: " + dadosCabos[0].codigo + " Referência: " + dadosCabos[0].referencia + "\n"+
	"Código Cabo Resolver: " + dadosCaboResolver[0].codigo + " Referência: " + dadosCaboResolver[0].referencia + "\n"+
	txtFreio
    // se demais itens já foram selecionados
  }else{
    txtCaboSelecionado.innerText = ""
  }
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

