import { conexao } from '../conexao.js'

async function inserirResultado({ nome, email, data_nascimento, sexo, escolhas, resultado }) {
    const sql = `INSERT INTO resultado (nome, email, data_nascimento, sexo, resultado) VALUES (?, ?, ?, ?, ?, )`

    const conn = await conexao()

    try {
        // Executar a consulta
        const [results] = await conn.query(sql, [
            nome,
            email,
            data_nascimento,
            sexo,
            resultado
        ]);

        await conn.end()
        return results
      } catch (err) {
        return err.message
      }
}

export { inserirResultado }
