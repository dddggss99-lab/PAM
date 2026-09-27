
import express from 'express'
import { inserirResultado } from './DAO/resultadoDAO.js'
const app = express()

app.use(express.json())

app.post('/resultado', async (req, res) => {
    try {
        const dados = req.body
        console.log(dados)
        // const resultado = await inserirResultado(dados)

        // res.status(201).json({
        //     mensagem: 'Resultado salvo com sucesso!',
        //     id: resultado.insertId
        // })
    } catch (erro) {
        res.status(500).json({
            erro: 'Erro ao salvar resultado',
            detalhes: erro.message
        })
    }
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})