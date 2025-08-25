import { ref, push, get } from 'firebase/database';
import { db } from './firebase';

export interface Colaborador {
  id?: string;
  nome: string;
  email: string;
  departamento: string;
  ativo: boolean;
  dataCriacao: number;
}

export const colaboradoresService = {
  // Cadastrar novo colaborador
  async cadastrar(colaborador: Omit<Colaborador, 'id' | 'dataCriacao'>): Promise<string> {
    try {
      const colaboradoresRef = ref(db, 'colaboradores');
      const novoColaborador = {
        ...colaborador,
        dataCriacao: Date.now(),
      };
      
      const docRef = await push(colaboradoresRef, novoColaborador);
      return docRef.key || '';
    } catch (error) {
      console.error('Erro ao cadastrar colaborador:', error);
      throw new Error('Falha ao cadastrar colaborador');
    }
  },

  // Buscar todos os colaboradores
  async buscarTodos(): Promise<Colaborador[]> {
    try {
      const colaboradoresRef = ref(db, 'colaboradores');
      const snapshot = await get(colaboradoresRef);
      
      if (snapshot.exists()) {
        const colaboradores: Colaborador[] = [];
        snapshot.forEach((childSnapshot) => {
          colaboradores.push({
            id: childSnapshot.key || '',
            ...childSnapshot.val()
          });
        });
        
        // Ordenar por data de criação (mais recente primeiro) - ordenação local
        return colaboradores.sort((a, b) => b.dataCriacao - a.dataCriacao);
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
      throw new Error('Falha ao buscar colaboradores');
    }
  }
};
