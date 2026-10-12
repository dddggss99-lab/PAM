import { conexao } from '../conexao.js'

async function listarResultados() {
    const sql = `SELECT * FROM resultado ORDER BY id DESC;`

    const conn = await conexao()

    try {
        const [rows] = await conn.query(sql)
        return rows
    } finally {
        await conn.end()
    }
}

export { listarResultados }
