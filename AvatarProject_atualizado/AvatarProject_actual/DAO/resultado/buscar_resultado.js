import { conexao } from '../conexao.js'

async function buscarResultado(id) {
    const sql = `SELECT * FROM resultado WHERE id = ?`

    const conn = await conexao()

    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [id]);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

export { buscarResultado }
