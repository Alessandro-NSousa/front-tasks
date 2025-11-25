export class Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    status: string;
    criacao: Date | null;
    colaborador: string;

    constructor(id?: number, titulo?: string, descricao?: string, status?: string, criacao?: Date, colaborador?: string) {
        this.id = id || 0;
        this.titulo = titulo || '';
        this.descricao = descricao || '';
        this.status = status || '';
        this.criacao = criacao || null;
        this.colaborador = colaborador || '';
    }
}
