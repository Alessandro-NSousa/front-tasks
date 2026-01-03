import { Colaborador } from "../users/colaboradorDto";

export class Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    status: string;
    criacao: Date | null;
    colaborador: Colaborador | null;

    constructor(id?: number, titulo?: string, descricao?: string, status?: string, criacao?: Date, colaborador?: Colaborador) {
        this.id = id || 0;
        this.titulo = titulo || '';
        this.descricao = descricao || '';
        this.status = status || '';
        this.criacao = criacao || null;
        this.colaborador = colaborador || null;
    }
}
