import { conexao } from '../conexao.js'

async function inserirResultado(dados) {
    const { nome, email, data_nascimento, sexo, resultado,
            q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = dados

    const perguntas = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10].map(q => q ?? null)

    const sql = `INSERT INTO resultado
        (nome, email, data_nascimento, sexo, resultado, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const conn = await conexao()

    try {
        const [results] = await conn.query(sql, [nome, email, data_nascimento, sexo, resultado, ...perguntas])
        return results
    } finally {
        await conn.end()
    }
}

export { inserirResultado }
