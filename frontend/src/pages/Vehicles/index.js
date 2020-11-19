import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import api from '../../services/api';

import './styles.css';

export default function Vehicles() {
    const [vehicles, setVehicles] = useState([]);

    const history = useHistory();

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('vehicles', {
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

            const MySwal = withReactContent(Swal)

            MySwal.fire({
                icon: 'warning',
                title: 'Apagar veículo?',
                showConfirmButton: false,
                showDenyButton: true,
                showCancelButton: true,
                denyButtonText: `Deletar`,
                cancelButtonText: `Cancelar`,
            }).then((result) => {
                if (result.isDenied) {
                    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
                    return Swal.fire(
                        'Deletado!', '', 'success'
                    )
                }
            })
        } catch (err) {
            const MySwal = withReactContent(Swal)

            MySwal.fire({
                didOpen: () => {
                    MySwal.clickConfirm()
                }
            }).then(() => {
                return MySwal.fire({
                    icon: 'error',
                    title: 'Erro ao deletar veículo. Tente novamente'
                })
            })
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
                <Link className="button" to="/newVehicle">Cadastrar novo veículo</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Veículos cadastrados</h1>

            <ul>
                {vehicles.map(vehicle => (
                    <li key={vehicle.id}>
                        <strong>VEÍCULO:</strong>
                        <p>{vehicle.vehicleName}</p>

                        <strong>EQUIPAMENTOS:</strong>
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