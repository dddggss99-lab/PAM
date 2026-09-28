import { conexao } from '../conexao.js'

async function editarIntegralmenteResultado(infos, id) {

    const sql = `UPDATE resultado SET nome = ?, email = ?, data_nascimento = ?, sexo = ?, resultado = ? WHERE id = ? ;`
    const conn = await conexao()

    try {
        // Executar a consulta
        const [results] = await conn.query(sql, [...infos, id]);

        await conn.end()
        return results
      } catch (err) {
        return err.message
      }
}

export { editarIntegralmenteResultado }
