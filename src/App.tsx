// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useState, FormEvent, ChangeEvent } from 'react';

// Importe o CSS do Font Awesome
import 'font-awesome/css/font-awesome.min.css';

interface FormData {
  cep: string;
  num_cep: string;
}

interface ApiResult {
  coordenadas_inicio: [number, number];
  coordenadas_destino: [number, number];
  endereco_ini: string;
  endereco_instituicao: string;
  descricao_distancia: string;
  duracao_minutos: number;
  // Adicione outras propriedades conforme necessário
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    cep: '',
    num_cep: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleConsultarClick = async () => {
    const { cep, num_cep } = formData;
    // const cep = document.getElementById('cep');

    const url_api = `http://127.0.0.1:8000/car_data/${cep}/${num_cep}/IFPR%20-%20Cascavel/85814800/2020`;
  
    try {
      const dados_api = await fetch(url_api);
      const data_api: ApiResult = await dados_api.json();
  
      const cepElement = document.getElementById('cep') as HTMLInputElement;
      const enderecoAlunoElement = document.getElementById('endereco_aluno') as HTMLInputElement;
      const enderecoInstElement = document.getElementById('endereco_inst') as HTMLInputElement;
      const distanciaElement = document.getElementById('distancia') as HTMLInputElement;
      const tempAproxElement = document.getElementById('temp_aprox') as HTMLInputElement;
      const mapaElement = document.getElementById('iframe') as HTMLInputElement;
  
      if (data_api.hasOwnProperty('erro')) {
        cepElement.value = 'Endereço não encontrado!';
      } else {
        enderecoAlunoElement.value = data_api.endereco_ini;
        enderecoInstElement.value = data_api.endereco_instituicao;
        distanciaElement.value = data_api.descricao_distancia;
        tempAproxElement.value = `${data_api.duracao_minutos.toFixed(2)} min`;
  
        const latlon_ini = data_api.coordenadas_inicio;
        const latlon_fim = data_api.coordenadas_destino;
        const url_map = `http://127.0.0.1:8000/rota?long_org=${latlon_ini[1]}&lat_org=${latlon_ini[0]}&long_dest=${latlon_fim[1]}&lat_dest=${latlon_fim[0]}`;
        mapaElement.src = url_map;
        console.log(url_map);
      }
    } catch (error) {
      console.error('Erro ao consultar a API:', error);
    }
  };

  return (
    <div className="App">
    <header className="App-header">
        <nav className="navbar">
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#exemplo">Exemplos</a></li>
          <li><a href="#contato">Contato</a></li>
          <div className="dot"></div>
        </nav>

      
      <div id="sobre">

        <h1>Trabalho de Conclusão de Curso sobre API para apresentar dados de Geoprocessamento</h1>
        <section>
          <h2>Sobre o TCC</h2>
          <p>
            Este trabalho aborda a utilização de uma API de geolocalização para calcular rotas entre dois endereços,
            estimar o tempo de viagem, calcular a distância e explorar outras funcionalidades relacionadas.
          </p>
        </section>


        <section>
          <h2>Dados da API de Geolocalização</h2>
          <p>
            A API utilizada fornece informações precisas sobre geolocalização, permitindo a obtenção de rotas, tempo de
            viagem e distância entre diferentes locais.
          </p>
          {/* Adicione mais informações sobre a API conforme necessário */}
        </section>
      </div>

      <div id="exemplo">
        <section className="content-section">
        <h2 className="utilization-title">Exemplo de Utilização</h2>
          <div className="api-example">
            <form>
                  <div className="inputbox">
                      <label>CEP Aluno*</label>
                      <input type="text" 
                        id="cep"
                        value={formData.cep}
                        onChange={handleInputChange}
                        required
                      />
                  </div>
                  <div className="inputbox">
                      <label>Número do Imóvel*</label>
                      <input type="text" 
                        id="num_cep" 
                        value={formData.num_cep}
                        onChange={handleInputChange} 
                        required
                      />
                  </div>

                  <button type="button" onClick={handleConsultarClick}>
                    Consultar API
                  </button>

                  <div className="inputbox">
                      <label>Endereço Aluno</label>
                      <input type="text" id="endereco_aluno"/>
                  </div>
                  <div className="inputbox">
                      <label>Endereço Instituição</label>
                      <input type="text" id="endereco_inst"/>
                  </div>
                  <div className="inputbox">
                      <label>Distância</label>
                      <input type="text" id="distancia"/>
                  </div>
                  <div className="inputbox">
                      <label>Tempo aproximado de viagem</label>
                      <input type="text" id="temp_aprox"/>
                  </div>
            </form>
            <div className="page">
              <iframe id="iframe" height="450" width="500"></iframe>
            </div>
          </div>
        </section>
      </div>
      <div id='contato'>
        <footer>
          <h2>Equipe de Desenvolvimento</h2>
          <div className="person-card">
            <div className="person">
              <img src=".\src\assets\bolfe.jpg" alt="Pedro Bolfe" />
              <p>Pedro Henrique Schroeder Bolfe</p>
            </div>
            <div className="social-icons">
              <a href="https://www.instagram.com/pedro_bolfe" target="_blank">
                <i className="fa fa-instagram"> pedro_bolfe</i>
              </a>
              <a href="https://github.com/pedrobolfe" target="_blank">
                <i className="fa fa-github"> pedrosch</i>
              </a>
              <a href="https://www.linkedin.com/in/pedro-henrique-schroeder-bolfe-2b80aa278" target="_blank">
                <i className="fa fa-linkedin"> Pedro Schroeder</i>
              </a>
              <a href="mailto:pedroschroeder06@email.com" target="_blank">
                <i className="fa fa-envelope"> pedroschroeder06@gmail.com</i>
              </a>
            </div>
          </div>

          <div className="person-card">
            <div className="person">
              <img src=".\src\assets\miotto.jpg" alt="Pedro Miotto" />
              <p>Pedro Miotto Mujica</p>
            </div>
            <div className="social-icons">
              <a href="https://www.instagram.com/pedromiotto03" target="_blank">
                <i className="fa fa-instagram"> pedromiotto</i>
              </a>
              <a href="https://github.com/pedromujica1" target="_blank">
                <i className="fa fa-github"> pedromujica1</i>
              </a>
              <a href="https://www.linkedin.com/in/pedro-miotto-607811283" target="_blank">
                <i className="fa fa-linkedin"> Pedro Miotto</i>
              </a>
              <a href="mailto:miottopedro@email.com" target="_blank">
                <i className="fa fa-envelope"> miottopedro@gmail.com</i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </header>
  </div>
  )
}
export default App