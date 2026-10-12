import { conexao } from '../conexao.js'

async function editarParcialmenteResultado(id, campo, valor) {
    const colunasPermitidas = ['nome', 'email', 'data_nascimento', 'sexo', 'resultado',
        'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10']
    if (!colunasPermitidas.includes(campo)) {
        const erro = new Error('Coluna inválida')
        erro.status = 400
        throw erro
    }

    const sql = `UPDATE resultado SET ${campo} = ? WHERE id = ?;`
    const conn = await conexao()

    try {
        const [results] = await conn.query(sql, [valor, id])
        return results
    } finally {
        await conn.end()
    }
}

export { editarParcialmenteResultado }
