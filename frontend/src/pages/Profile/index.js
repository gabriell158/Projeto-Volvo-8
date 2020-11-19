import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

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

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <span>Bem vindo(a), {userName}</span>

                <Link className="button" to="/equipments">Equipamentos</Link>
                <Link className="button" to="/vehicles">Veículos</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Selecione um veículo para realizar um teste</h1>

            <ul>
                {vehicles.map(vehicle => (
                    <li key={vehicle.id}>
                        <strong>VEÍCULO:</strong>
                        <p>{vehicle.name}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{vehicle.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}