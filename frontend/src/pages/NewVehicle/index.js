import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function NewVehicle() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const history = useHistory()
  
  const userId = localStorage.getItem('userId')
  
  async function handleNewVehicle(e) {
    e.preventDefault()
    const data = {
      title,
      description,
    }
    try {
      await api.post('/vehicles', data, {
        headers: {
          Authorization: userId,
        }
      })
      
      history.push('/profile')
    } catch (err) {
      alert('Erro ao cadastrar veículo, tente novamente.')
    }
  }

  return (
    <div className="new-vehicle-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1> Cadastrar Novo Veículo </h1>
          <p> Adicione os componentes necessários para realizar o teste neste veículo.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={handleNewVehicle}>
          <input placeholder="Titulo do Veículo" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  )
}