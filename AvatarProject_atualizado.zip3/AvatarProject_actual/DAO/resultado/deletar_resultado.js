import { conexao } from '../conexao.js'

async function deletarResultado(id) {
    const sql = `DELETE FROM resultado WHERE id = ?`

    const conn = await conexao()

    try {
        const [results] = await conn.query(sql, [id])
        return results
    } finally {
        await conn.end()
    }
}

export { deletarResultado }
