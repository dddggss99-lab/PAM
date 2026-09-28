import { conexao } from '../conexao.js'

async function listarResultados() {
    console.log('DAO de RESULTADO')
    const sql = `SELECT * FROM resultado;`

    const conn = await conexao()

    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

export { listarResultados }
