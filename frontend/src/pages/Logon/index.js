import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import api from '../../services/api';

import './styles.css';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('userId', id);
            localStorage.setItem('userName', response.data.userName);
            
            history.push('/profile');
        } catch (err) {
            const MySwal = withReactContent(Swal)

            MySwal.fire({
                didOpen: () => {
                    MySwal.clickConfirm()
                }
            }).then(() => {
                return MySwal.fire({
                    icon: 'error',
                    title: 'Falha no login, tente novamente'
                })
            })
        }
    }

    return (
        <div className="logon-container">
            <section className="form">

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

        </div>
    );
}