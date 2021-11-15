import {useState} from 'react';
//import './atualizaSwa.css';
import Title from '../../../components/Title';
import Header from '../../../components/Header';
import firebase from '../../../services/firebaseConnection';
import {FiUser} from 'react-icons/fi';
import React from 'react';
import XLSX from 'xlsx'
//import xlsxFile  from 'read-excel-file';

import {toast} from 'react-toastify';

export default function Customers(){
  const [dadosSwa, setDadosSwa] = useState([]);
  const [stsCadastro, setStsCadastro] = useState(['']);

  const importExcel=(e)=>{
    const file=e.target.files[0]

    const reader=new FileReader()
    reader.onload=(event)=>{
      //parse data
      const bstr=event.target.result
      const workBook=XLSX.read(bstr,{type:"binary"})

      //get first sheet
      let data = []
      workBook.SheetNames.forEach(workSheetName => {
        //const workSheetName=workBook.SheetNames[0]
        const workSheet=workBook.Sheets[workSheetName]
        const fileData=XLSX.utils.sheet_to_json(workSheet,{header:1})
        const headers=fileData[0]
        fileData.splice(0,1)
        let lastObjRow=[]
        // lê cada linha de dados
        fileData.forEach(readDataRow => {
          if(Object.keys(readDataRow).length >0){
            let objRow=[]
            // lê cada item do cabeçalho e monta um objeto
            headers.forEach((elementHeader, index) =>{
              // verifica se for Preço, elimina "."
              if(elementHeader==='Preço'){
                let precostr = readDataRow[index].toString().replace(".","")
                precostr = precostr.toString().replace(",",".")
                readDataRow[index]=parseFloat(precostr)
              }
              // verifica se torque ou corrente, converte para número (muda "," para ".")
              if(elementHeader==='Torque' || elementHeader==='Corrente'){
                readDataRow[index]=parseFloat(readDataRow[index].toString().replace(",","."))
              }
    
              // se for indefinido, copia valor anterior
              if (typeof(readDataRow[index]) === 'undefined') {
                readDataRow[index]=lastObjRow.[elementHeader]
              }
              let obj={[elementHeader]: readDataRow[index]}
              objRow={...objRow,...obj}
    
              // Insere Carcaça
              if(elementHeader==='Referência'){
                let strCarcaca = readDataRow[index].replace(" ","")
                strCarcaca = strCarcaca.substr(3,strCarcaca.search("-")-4)
                objRow={Carcaça: parseInt(strCarcaca), ...objRow}
              }

              // Insere tensão e freio
              if(workSheetName.search("220-240") >=0) objRow={Tensão: '220-240', ...objRow}
              if(workSheetName.search("380-480") >=0) objRow={Tensão: '380-480', ...objRow}
              if(workSheetName.search("Sem Freio") >=0) objRow={Freio: 'Não', ...objRow}
              if(workSheetName.search("Com Freio") >=0) objRow={Freio: 'Sim', ...objRow}
            })
            lastObjRow=objRow
            data.push(objRow)
          }
        });
      });
      setDadosSwa(data);
    }
    reader.readAsBinaryString(file)
  }

  async function handleSentDb(e){
    e.preventDefault();

    var db = firebase.firestore();
    var batch = db.batch()

    dadosSwa.forEach((doc) => {
      var docRef = db.collection("TbSwa").doc((doc.Código).toString());
      batch.set(docRef, doc);
    });

    batch.commit()
    .then(()=>{
      console.log('cadastrado com sucesso')
    })
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
            <button type="button" onClick={handleSentDb} >Cadastrar</button>
            <span>{stsCadastro}</span>
          </form>
        </div>
      </div>
    </div>
  )
}