import './ToastFeedback.css';

interface IToastFeedbackProps {
  mensagem: string;
  tipo: 'sucesso' | 'erro';
  onClose?: () => void;
}

export function ToastFeedback({ mensagem, tipo, onClose }: IToastFeedbackProps) {
  return (
    <div className={`toast-feedback toast-feedback--${tipo}`} data-testid="toast-feedback">
      <span className="toast-feedback__mensagem">{mensagem}</span>
      {onClose && (
        <button
          className="toast-feedback__fechar"
          onClick={onClose}
          data-testid="toast-fechar"
        >
          ×
        </button>
      )}
    </div>
  );
}
