import { conexao } from '../conexao.js'

async function editarIntegralmenteResultado(infos, id) {
    // infos = [nome, email, data_nascimento, sexo, resultado, q1 ... q10]
    const sql = `UPDATE resultado SET nome = ?, email = ?, data_nascimento = ?, sexo = ?, resultado = ?,
        q1 = ?, q2 = ?, q3 = ?, q4 = ?, q5 = ?, q6 = ?, q7 = ?, q8 = ?, q9 = ?, q10 = ? WHERE id = ?;`
    const conn = await conexao()

    try {
        const [results] = await conn.query(sql, [...infos, id])
        return results
    } finally {
        await conn.end()
    }
}

export { editarIntegralmenteResultado }
