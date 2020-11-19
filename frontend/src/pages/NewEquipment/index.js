import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import './styles.css'

export default function NewEquipment() {
  const [equipName, setName] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [location, setLocation] = useState('')
  
  const history = useHistory()
  
  const userId = localStorage.getItem('userId')
  
  async function handleNewEquipment(e) {
    e.preventDefault()
    const data = {
      equipName,
      description,
      quantity,
      location,
    }
    try {
      await api.post('/equipments', data, {
        headers: {
          Authorization: userId,
        }
      })

      const MySwal = withReactContent(Swal)
      
      MySwal.fire({
          didOpen: () => {
              MySwal.clickConfirm()
          }
      }).then(() => {
          return MySwal.fire({
              icon: 'success',
              title: 'Equipamento cadastrado com sucesso'
          })
      })
      history.push('/equipments')
    } catch (err) {
      const MySwal = withReactContent(Swal)

      MySwal.fire({
          didOpen: () => {
              MySwal.clickConfirm()
          }
      }).then(() => {
          return MySwal.fire({
              icon: 'error',
              title: 'Erro ao cadastrar equipamento, tente novamente'
          })
      })
    }
  }

  return (
    <div className="new-equipment-container">
      <div className="content">
        <section>
          <h1> Cadastrar Novo Equipamento </h1>
          <p>Adicione um equipamento para ser inserido no estoque.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={handleNewEquipment}>
          <input placeholder="Nome do equipamento" value={equipName} onChange={e => setName(e.target.value)} />
          <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
          <input placeholder="Quantidade" value={quantity} onChange={e => setQuantity(e.target.value)} />
          <input placeholder="Localização" value={location} onChange={e => setLocation(e.target.value)} />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}