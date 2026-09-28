import express from 'express'

import { listarResultados } from './DAO/resultado/listar_resultado.js'
import { buscarResultado } from './DAO/resultado/buscar_resultado.js'
import { inserirResultado } from './DAO/resultado/inserir_resultado.js'
import { editarIntegralmenteResultado } from './DAO/resultado/editar_integralmente_resultado.js'
import { editarParcialmenteResultado } from './DAO/resultado/editar_parcialmente_resultado.js'
import { deletarResultado } from './DAO/resultado/deletar_resultado.js'

const app = express()

app.use(express.json())

// Rota Base
app.get('/', (req, res) => {
    res.json({ mensagem: 'API do Quiz Avatar rodando perfeitamente!' })
})

// 1. CONSULTAR TODOS (GET)
app.get('/resultado', async (req, res) => {
    try {
        const resultados = await listarResultados()
        res.json(resultados)
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao listar resultados', detalhes: erro.message })
    }
})

// 2. CONSULTAR POR ID (GET)
app.get('/resultado/:id', async (req, res) => {
    try {
        const { id } = req.params
        const resultado = await buscarResultado(id)

        if (!resultado || resultado.length === 0) {
            return res.status(404).json({ erro: 'Resultado não encontrado' })
        }

        res.json(resultado)
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar resultado', detalhes: erro.message })
    }
})

// 3. INCLUSÃO / CADASTRO (POST)
app.post('/resultado', async (req, res) => {
    try {
        const dados = req.body
        console.log(dados)

        if (!dados.nome) {
            return res.status(400).json({ erro: 'O campo nome é obrigatório.' })
        }

        const resultado = await inserirResultado(dados)

        res.status(201).json({
            mensagem: 'Resultado salvo com sucesso',
            id: resultado.insertId
        })
    } catch (erro) {
        res.status(500).json({
            erro: 'Erro ao salvar resultado',
            detalhes: erro.message
        })
    }
})

// 4. ATUALIZAÇÃO COMPLETA (PUT)
app.put('/resultado/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, email, data_nascimento, sexo, escolhas, resultado } = req.body

        const infos = [nome, email, data_nascimento, sexo, escolhas ?? null, resultado]
        const resposta = await editarIntegralmenteResultado(infos, id)

        if (resposta.affectedRows === 0) {
            return res.status(404).json({ erro: 'Resultado não encontrado para atualização.' })
        }

        res.json({ mensagem: 'Resultado atualizado com sucesso!' })
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao atualizar resultado', detalhes: erro.message })
    }
})

// 5. ATUALIZAÇÃO PARCIAL (PATCH)
app.patch('/resultado/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { campo, valor } = req.body

        const resposta = await editarParcialmenteResultado(id, campo, valor)

        if (resposta.affectedRows === 0) {
            return res.status(404).json({ erro: 'Resultado não encontrado para atualização.' })
        }

        res.json({ mensagem: 'Resultado atualizado com sucesso!' })
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao atualizar parcialmente o resultado', detalhes: erro.message })
    }
})

// 6. DELEÇÃO (DELETE)
app.delete('/resultado/:id', async (req, res) => {
    try {
        const { id } = req.params
        const resultado = await deletarResultado(id)

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Resultado não encontrado para exclusão.' })
        }

        res.json({ mensagem: `Resultado com ID ${id} deletado com sucesso!` })
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao deletar resultado', detalhes: erro.message })
    }
})

app.listen(3000, () => {
    console.log('🚀 Servidor rodando na porta 3000')
})
