import { conexao } from '../conexao.js'

async function deletarResultado(id) {

    const sql = `DELETE FROM resultado WHERE id = ?`
    const conn = await conexao()

    try {
        // Executar a consulta
        const [results] = await conn.query(sql, [id]);

        await conn.end()
        return results
      } catch (err) {
        return err.message
      }
}

export { deletarResultado }
