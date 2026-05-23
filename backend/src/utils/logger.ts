export function logger(mensagem: string, nivel: 'info' | 'error' | 'warn' = 'info'): void {
  const timestamp = new Date().toISOString();
  const logMensagem = `[${timestamp}] [${nivel.toUpperCase()}] ${mensagem}`;
  
  switch (nivel) {
    case 'error':
      console.error(logMensagem);
      break;
    case 'warn':
      console.warn(logMensagem);
      break;
    default:
      console.log(logMensagem);
  }
}
