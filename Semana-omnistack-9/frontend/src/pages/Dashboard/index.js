import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([])
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3000', {
        query: { user_id },
    }), [user_id]);
    useEffect(() => {


        // ouve a comunicacao entre o backand com o frontend , (socket.on('parametro para ouvir'))
        // recebe esses dados no parametro 'data' que sao passados pelo backend e retorna no console do frontend
        // socket.on('hello', data => {
        //     console.log(data);
        // })

        // envia os dados pelo frontend para o backend (socket.emit('parametro para enviar'))
        //   poderia usar um setTimeout por exemplo e enviar a cada X segundos
        // socket.emit('omni', 'Stack');

        // ouvindo do booking_request criado la no backend e pegando os dados e mostrando no console
        socket.on('booking_request', data => {
            // console.log(data);  
            setRequests([...requests, data]);

        });

    }, [requests, socket]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            // console.log(response.data);
            setSpots(response.data);
        }
        loadSpots();
    }, []);

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> esta solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p>
                        <button className ="accept">ACEITAR</button>
                        <button className ="reject">REJEITAR</button>
                    </li>
                ))}
            </ul>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : `GRATUITO`}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar Novo Spot</button>
            </Link>
        </>
    )
}