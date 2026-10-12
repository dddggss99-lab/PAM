import { conexao } from '../conexao.js'

async function buscarResultado(id) {
    const sql = `SELECT * FROM resultado WHERE id = ?`

    const conn = await conexao()

    try {
        const [rows] = await conn.query(sql, [id])
        return rows
    } finally {
        await conn.end()
    }
}

export { buscarResultado }
