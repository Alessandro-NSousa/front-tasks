export class User {
    id: number;
    nome: string;
    email: string;
    role: string;
    ativo: boolean;

    constructor(id?: number, nome?: string, email?: string, role?: string, ativo?: boolean) {
        this.id = id || 0;
        this.nome = nome || '';
        this.email = email || '';
        this.role = role || '';
        this.ativo = ativo || false;
    }
}
