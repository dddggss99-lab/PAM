import { conexao } from '../conexao.js'

async function editarParcialmenteResultado(id, campo, valor) {
    const data = [valor, id]

    const colunasPermitidas = ['nome', 'email', 'data_nascimento', 'sexo', 'escolhas', 'resultado']; // Colunas que podem ser editadas
    if (!colunasPermitidas.includes(campo)) {
        throw new Error('Coluna inválida');
    }

    const sql = `UPDATE resultado set ${campo} = ? WHERE id = ? ;`
    const conn = await conexao()

    try {
        // Executar a consulta
        const [results] = await conn.query(sql, data);

        await conn.end()
        return results
      } catch (err) {
        return err.message
      }
}

export { editarParcialmenteResultado }
