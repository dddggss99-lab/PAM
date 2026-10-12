import mysql from 'mysql2/promise'

async function conexao() {
    const pool = mysql.createPool({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: ' ',
        database: 'quiz',
        dateStrings: true // DATE volta como 'YYYY-MM-DD' 
    })
    return pool
}

async function closeConexao(pool) {
    if (pool) {
        console.log("Fechando a conexão com o banco de dados")
        await pool.end()
    } else {
        console.log("Conexão já fechada")
    }
}

async function testarConexao() {
  try {
    const pool = await conexao();
    const conn = await pool.getConnection();
    await conn.ping();
    console.log("✅ Conexão com o MySQL bem-sucedida!");
    conn.release();
    await pool.end();
  } catch (erro) {
    console.error("❌ Falha ao conectar com o MySQL:", erro.message);
  }
}

export { conexao, closeConexao, testarConexao }
