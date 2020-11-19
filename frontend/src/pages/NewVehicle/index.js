import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import api from '../../services/api'

import './styles.css'

const animatedComponents = makeAnimated();

export default function NewVehicle() {
  const [vehicleName, setName] = useState('')
  const [equipList, setEquipList] = useState()
  const [equipments, setEquipments] = useState([]);

  const history = useHistory()

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    api.get('equipments', {
        headers: {
          Authorization: userId,
        }
    }).then(response => {
        setEquipments(response.data);
    })
  }, [userId]);

  const options = [];
  
  equipments.map(fillOptions);

  async function fillOptions(equipment) {
    try {
      const obj = {
        id: equipment["id"],
        value: equipment["equipName"],
        label: equipment["equipName"],
      }
      options.push(obj)
    } catch (err){

      const MySwal = withReactContent(Swal)

      MySwal.fire({
        didOpen: () => {
          MySwal.clickConfirm()
        }
      }).then(() => {
        return MySwal.fire({
          icon: 'error',
          title: 'Erro ao carregar os equipamentos'
        })
      })
      history.push('/vehicles')
    }
  }

  async function handleChange(id) {
    try {
      setEquipList(id)
    } catch (err) {
      alert(err)
    }
  }

  async function handleNewVehicle(e) {
    e.preventDefault()
    let description = []

    for(var i = 0; i < equipList.length; i++) {
      description += equipList[i].value + ', '
    }

    const data = {
      vehicleName,
      description,
      equipList
    }

    try {
      await api.post('/vehicles', data, {
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
          title: 'Veículo cadastrado com sucesso'
        })
      })
      history.push('/vehicles')
    } catch (err) {
      const MySwal = withReactContent(Swal)

      MySwal.fire({
        didOpen: () => {
          MySwal.clickConfirm()
        }
      }).then(() => {
        return MySwal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar veículo, tente novamente'
        })
      })
    }
  }

  return (
    <div className="new-vehicle-container">
      <div className="content">
        <section>
          {/*<img src={logoImg} alt="Be The Hero" />*/}
          <h1> Cadastrar Novo Veículo </h1>
          <p> Adicione os equipamentos necessários para realizar o teste neste veículo.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={handleNewVehicle}>
          <input placeholder="Nome do Veículo" value={vehicleName} onChange={e => setName(e.target.value)} />
          <Select
            isMulti
            options={options}
            value={equipList}
            closeMenuOnSelect={false}
            components={animatedComponents}
            onChange={handleChange}
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}