import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import api from '../../services/api';

import './styles.css';

export default function Register() {
    const [userName, setName] = useState('');
    const [email, setEmail] = useState('');
    //const [whatsapp, setWhatsapp] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        
        const data = {
            userName,
            email
            //whatsapp
        };

        try {
            const response = await api.post('users', data);

            const MySwal = withReactContent(Swal)

            MySwal.fire({
                didOpen: () => {
                    MySwal.clickConfirm()
                }
            }).then(() => {
                return MySwal.fire({
                    icon: 'info',
                    title: `Seu ID de acesso: ${response.data.id}`
                })
            })
            
            history.push('/');
        } catch (err) {
            const MySwal = withReactContent(Swal)

            MySwal.fire({
                didOpen: () => {
                    MySwal.clickConfirm()
                }
            }).then(() => {
                return MySwal.fire({
                    icon: 'error',
                    title: `Erro no cadastro, tente novamente`
                })
            })
        }
    }
    return(
        <div className="register-container">
            <div className="content">
                <section>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome" value={userName} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    {/*<input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />*/}

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}