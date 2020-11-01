import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
    const [vehicles, setVehicles] = useState([]);

    const history = useHistory();

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setVehicles(response.data);
        })
    }, [userId]);

    async function handleDeleteVehicle(id) {
        try { 
            await api.delete(`vehicles/${id}`, {
                headers: {
                    Authorization:userId,
                }
            });

            setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso. Tente novamente.');
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

                <Link className="button" to="/vehicles/new">Cadastrar novo veículo</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Veículos cadastrados</h1>

            <ul>
                {vehicles.map(vehicle => (
                    <li key={vehicle.id}>
                        <strong>VEÍCULO:</strong>
                        <p>{vehicle.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{vehicle.description}</p>

                        <button onClick={() => handleDeleteVehicle(vehicle.id)} type="button">
                            <FiTrash2 size={20} color="a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}