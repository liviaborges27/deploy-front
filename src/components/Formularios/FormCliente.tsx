import { useEffect, useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ClienteDTO } from '../../dto/ClienteDTO';
import ClienteRequests from '../../fetch/ClienteRequests';
import { AlertCard } from '../AlertCard/AlertCard';
import styles from '../../styles/DetalhesPadrao.module.css';

type FormClienteProps = {
  idCliente?: number;
};

const clienteInicial: ClienteDTO = {
  nome: '',
  cpf: '',
  telefone: '',
  email: '',
  endereco: '',
  dataNascimento: '',
};

export function FormCliente({ idCliente }: FormClienteProps): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ClienteDTO>(clienteInicial);
  const [alerta, setAlerta] = useState<string>('');
  const [tipoAlerta, setTipoAlerta] = useState<'sucesso' | 'erro' | 'info'>('info');
  const [carregando, setCarregando] = useState<boolean>(Boolean(idCliente));

  useEffect(() => {
    const carregarCliente = async () => {
      if (!idCliente) {
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        const cliente = await ClienteRequests.buscarClientePorId(idCliente);
        setFormData(cliente);
      } catch (error) {
        const mensagem = error instanceof Error ? error.message : 'Erro ao carregar cliente.';
        setAlerta(mensagem);
        setTipoAlerta('erro');
      } finally {
        setCarregando(false);
      }
    };

    carregarCliente();
  }, [idCliente]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((atual) => ({ ...atual, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setCarregando(true);
      if (idCliente) {
        await ClienteRequests.atualizarCliente(idCliente, formData);
        setAlerta('Cliente atualizado com sucesso.');
      } else {
        await ClienteRequests.cadastrarCliente(formData);
        setAlerta('Cliente cadastrado com sucesso.');
      }
      setTipoAlerta('sucesso');
      setTimeout(() => navigate('/clientes'), 600);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao salvar cliente.';
      setAlerta(mensagem);
      setTipoAlerta('erro');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.container}> 
      <div className={styles.card}> 
        <div className={styles.header}> 
          <div>
            <p className={styles.eyebrow}>{idCliente ? 'Atualização' : 'Cadastro'}</p>
            <h2>{idCliente ? 'Atualizar cliente' : 'Cadastrar cliente'}</h2>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/clientes')}>
            Voltar
          </button>
        </div>

        {alerta ? <AlertCard tipo={tipoAlerta} mensagem={alerta} onClose={() => setAlerta('')} /> : null}

        {carregando ? (
          <div className={styles.emptyState}>Carregando cliente...</div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.grid}>
              <label>
                <span>Nome</span>
                <input name="nome" value={formData.nome} onChange={handleChange} required />
              </label>
              <label>
                <span>CPF</span>
                <input name="cpf" value={formData.cpf} onChange={handleChange} required />
              </label>
              <label>
                <span>Telefone</span>
                <input name="telefone" value={formData.telefone} onChange={handleChange} required />
              </label>
              <label>
                <span>E-mail</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </label>
              <label className={styles.fullWidth}>
                <span>Endereço</span>
                <textarea name="endereco" value={formData.endereco} onChange={handleChange} rows={3} required />
              </label>
              <label>
                <span>Data de nascimento</span>
                <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
              </label>
            </div>

            <div className={styles.actions}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/clientes')}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={carregando}>
                {carregando ? 'Salvando...' : idCliente ? 'Atualizar cliente' : 'Cadastrar cliente'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
