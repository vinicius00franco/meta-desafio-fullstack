import { IProduto } from '../../src/models/IProduto';
import { readFileSync } from 'fs';
import { join } from 'path';

export function carregarSeedProdutos(): Omit<IProduto, 'id'>[] {
  const caminhoArquivo = join(__dirname, '../../src/seeds/produtos.json');
  const dados = readFileSync(caminhoArquivo, 'utf-8');
  return JSON.parse(dados) as Omit<IProduto, 'id'>[];
}
