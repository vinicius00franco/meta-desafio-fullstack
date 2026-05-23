import './NotificacaoToast.css';

type TipoNotificacao = 'sucesso' | 'erro' | 'aviso' | 'informacao';

interface NotificacaoToastProps {
  mensagem: string;
  tipo: TipoNotificacao;
  onClose: () => void;
}

export function NotificacaoToast({ mensagem, tipo, onClose }: NotificacaoToastProps) {
  return (
    <div className={`notificacao-toast notificacao-toast--${tipo}`}>
      <div className="notificacao-toast__conteudo">
        <span className="notificacao-toast__icone">{obterIcone(tipo)}</span>
        <span className="notificacao-toast__mensagem">{mensagem}</span>
        <button 
          className="notificacao-toast__fechar"
          onClick={onClose}
          aria-label="Fechar notificação"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function obterIcone(tipo: TipoNotificacao): string {
  const icones = {
    sucesso: '✓',
    erro: '✕',
    aviso: '⚠',
    informacao: 'ℹ',
  };
  return icones[tipo];
}
