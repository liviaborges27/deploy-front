import type { JSX } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Navegacao } from './components/Navegacao/Navegacao';
import { Rodape } from './components/Rodape/Rodape';
import { PCadastroCliente } from './pages/PCadastroCliente';
import { PAtualizarCliente } from './pages/PAtualizarCliente';
import { PDetalheCliente } from './pages/PDetalheCliente';
import { PListagemCliente } from './pages/PListagemCliente';
import { PCadastroProduto } from './pages/PCadastroProduto';
import { PAtualizarProduto } from './pages/PAtualizarProduto';
import { PDetalheProduto } from './pages/PDetalheProduto';
import { PListagemProduto } from './pages/PListagemProduto';
import { PHome } from './pages/PHome';
import './App.css';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navegacao />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<PHome />} />
            <Route path="/clientes" element={<PListagemCliente />} />
            <Route path="/clientes/cadastro" element={<PCadastroCliente />} />
            <Route path="/clientes/atualizar/:idCliente" element={<PAtualizarCliente />} />
            <Route path="/clientes/detalhes/:idCliente" element={<PDetalheCliente />} />
            <Route path="/produtos" element={<PListagemProduto />} />
            <Route path="/produtos/cadastro" element={<PCadastroProduto />} />
            <Route path="/produtos/atualizar/:idProduto" element={<PAtualizarProduto />} />
            <Route path="/produtos/detalhes/:idProduto" element={<PDetalheProduto />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Rodape />
      </div>
    </BrowserRouter>
  );
}

export default App;
