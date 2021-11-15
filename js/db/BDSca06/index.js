import {useState} from 'react';
import './atualizaSwa.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import firebase from '../../services/firebaseConnection';
import {FiUser} from 'react-icons/fi';
import React from 'react';
import XLSX from 'xlsx'
import {separaSwa} from './separaSwa'
import {separaCabos} from './separaCabos'
import {openDbCabos} from '../../databaseExcel/BD_Cabos'
import {separaSca06} from './separaSCA06'

//import xlsxFile  from 'read-excel-file';

import {toast} from 'react-toastify';

export default function BancoDados(){
  const [dadosSwa, setDadosSwa] = useState([]);
  const [dadosCabos, setDadosCabos] = useState([]);
  const [dadosSca06, setDadosSca06] = useState([]);
  const [stsCadastro, setStsCadastro] = useState([]);
  const [tabelaRetorno, setTabelaRetorno] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [urlDownload, setUrlDownload] = useState([])
  
  const importExcel=(e)=>{
    const selectedFile=e.target.files[0]
    if(selectedFile){
      setFileName(selectedFile.name)
      if(selectedFile.name === 'BD_SWA.xlsx'){
        separaSwa(selectedFile)
        .then(dado=>{
          setDadosSwa(dado)
          //console.log(dado)
          setTabelaRetorno(criaTabelaSwa(dado))
        })
      }
      if(selectedFile.name === 'BD_Cabos.xlsx'){
        separaCabos(selectedFile)
        .then(dado=>{
          //console.log(dado)
          setDadosCabos(dado)
          setTabelaRetorno(criaTabelaCabos(dado))
        })
      }
      if(selectedFile.name === 'BD_SCA06.xlsx'){
        separaSca06(selectedFile)
        .then(dado=>{
          //console.log(dado)
          setDadosSca06(dado)
          setTabelaRetorno(criaTabelaSca06(dado))
        })
      }
    }
  }

  async function handleSentDb(e){
    e.preventDefault();

    var db = firebase.firestore();
    var batch = db.batch()

    if(fileName==='BD_SWA.xlsx'){
      dadosSwa.forEach((doc) => {
        var docRef = db.collection("TbSwa").doc((doc.referencia).toString());
        batch.set(docRef, doc);
      });
    }
    if(fileName==='BD_Cabos.xlsx'){
      dadosCabos.forEach((doc) => {
        var docRef = db.collection("TbCabos").doc((doc.referencia).toString());
        batch.set(docRef, doc);
      });
    }
    batch.commit()
    .then(()=>{
      console.log('cadastrado com sucesso')
    })
  }

  function criaTabelaCabos(dado){
    return(
        <table>
          <thead>
            <tr>
              <th>Referência</th>
              <th>Tipo</th>
              <th>Comprimento</th>
              <th>Bitola</th>
              <th>Conector</th>
              <th>Instalação</th>
              <th>Código</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
          {dado.map((item, index)=>{
            return(
              <tr key={index}>
                <td data-label="Cliente">{item.referencia}</td>
                <td data-label="Cliente">{item.tipo}</td>
                <td data-label="Cliente">{item.comprimento}</td>
                <td data-label="Cliente">{item.bitola}</td>
                <td data-label="Cliente">{item.conector}</td>
                <td data-label="Cliente">{item.instalacao}</td>
                <td data-label="Cliente">{item.codigo}</td>
                <td data-label="Cliente">{item.preco}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
    )
  }
  function criaTabelaSwa(dado){
    return(
        <table>
          <thead>
            <tr>
              <th>Referência</th>
              <th>Torque</th>
              <th>Rotação</th>
              <th>Corrente</th>
              <th>Cabo</th>
              <th>Servoconversor</th>
              <th>Código</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
          {dado.map((item, index)=>{
            return(
              <tr key={index}>
                <td data-label="Cliente">{item.referencia}</td>
                <td data-label="Cliente">{item.torque}</td>
                <td data-label="Cliente">{item.rotacao}</td>
                <td data-label="Cliente">{item.corrente}</td>
                <td data-label="Cliente">{item.cabo}</td>
                <td data-label="Cliente">{item.servoconversor}</td>
                <td data-label="Cliente">{item.codigo}</td>
                <td data-label="Cliente">{item.preco}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
    )
  }
  function criaTabelaSca06(dado){
    return(
        <table>
          <thead>
            <tr>
              <th>Referência</th>
              <th>Tamanho</th>
              <th>Tipo Tensão</th>
              <th>Tensão</th>
              <th>Corrente</th>
              <th>Manual</th>
              <th>Filtro</th>
              <th>Fonte</th>
              <th>STO</th>
              <th>Codigo</th>
              <th>Preço</th>
              <th>IPI</th>
            </tr>
          </thead>
          <tbody>
          {dado.map((item, index)=>{
            return(
              <tr key={index}>
                <td data-label="Cliente">{item.referencia}</td>
                <td data-label="Cliente">{item.tamanho}</td>
                <td data-label="Cliente">{item.tipoTensao}</td>
                <td data-label="Cliente">{item.tensao}</td>
                <td data-label="Cliente">{item.corrente}</td>
                <td data-label="Cliente">{item.manual}</td>
                <td data-label="Cliente">{item.filtro}</td>
                <td data-label="Cliente">{item.fonte}</td>
                <td data-label="Cliente">{item.sto}</td>
                <td data-label="Cliente">{item.codigo}</td>
                <td data-label="Cliente">{item.preco}</td>
                <td data-label="Cliente">{item.ipi}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
    )
  }
  function downloadTxtFile(){
    const element = document.createElement("a");
    let jsonString=[]
    if(fileName==='BD_SWA.xlsx'){
      jsonString = JSON.stringify(dadosSwa)
    }
    if(fileName==='BD_Cabos.xlsx'){
      jsonString = JSON.stringify(dadosCabos)
      console.log(jsonString)
    }
    if(fileName==='BD_SCA06.xlsx'){
      jsonString = JSON.stringify(dadosSca06)
      jsonString = `const bdJson = JSON.parse('` + jsonString + `')

      export function openDbSwa(){
        return(bdJson)
      }`
      console.log(typeof(jsonString))
    }
    const file = new Blob([jsonString], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.js";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    console.log('fim')
  }

  function openJsonFile(){
    console.log(openDbCabos())
  }

  return(
    <div>
      <Header/>
      <div className="content">
        <Title name="Cadasto de Servomotores">
          <FiUser size={25} />
        </Title>
        <div className="container">
          <form>
            <input type="file" onChange={importExcel} />
            <button type="button" onClick={handleSentDb} >Envia BD</button>
            <br/>
            <button type="button" onClick={downloadTxtFile}>Download json</button>
            <br/>
            <button type="button" onClick={openJsonFile}>Teste Abrir Json</button>

            <div>
              {tabelaRetorno}
            </div>
            <span>{stsCadastro}</span>
          </form>
        </div>
      </div>
    </div>
  )
}