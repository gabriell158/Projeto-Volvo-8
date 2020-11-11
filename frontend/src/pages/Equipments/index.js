import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Equipments() {
    const [equipments, setEquipments] = useState([]);

    const history = useHistory();

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('equipments', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setEquipments(response.data);
        })
    }, [userId]);

    async function handleDeleteEquipment(id) {
        try { 
            await api.delete(`equipments/${id}`, {
                headers: {
                    Authorization:userId,
                }
            });

            setEquipments(equipments.filter(equipment => equipment.id !== id));
        } catch (err) {
            alert('Erro ao deletar equipamento. Tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <span>Bem vindo(a), {userName}</span>

                <Link className="button" to="/profile">Perfil</Link>
                
                <Link className="button" to="/newEquipment">Cadastrar novo equipamento</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>

            </header>

            <h1>Equipamentos cadastrados</h1>

            <ul>
                {equipments.map(equipment => (
                    <li key={equipment.id}>
                        <strong>EQUIPAMENTO:</strong>
                        <p>{equipment.equipName}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{equipment.description}</p>
                        
                        <strong>QUANTIDADE:</strong>
                        <p>{equipment.quantity}</p>
                        
                        <strong>LOCALIZAÇÃO:</strong>
                        <p>{equipment.location}</p>

                        <button onClick={() => handleDeleteEquipment(equipment.id)} type="button">
                            <FiTrash2 size={20} color="a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}