import React, {useState} from 'react';
import api from '../../services/api';

export default function Login({history}) {

    // criado para dar um estado para seu component
  const [email, setEmail] = useState('');

  // funcao padrao para evento de submit
  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(email);
    const response = await api.post('/sessions',{email});

    const { _id } = response.data;

    localStorage.setItem('user',_id);
    // console.log(_id);
    history.push('/dashboard')

  }
  // poderia usar assim
  // function handleEmailChange(event){
  //   setEmail(event.target.value)
  // }

    return (
        <>
        <p>
            Ofereça <strong>spots</strong> para programadores e encotre <strong>talentos</strong> para sua empresa.
        </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL*</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Seu Melhor e-mail"
                    value={email}
                    // onChange={handleEmailChange}
                    onChange={event => setEmail(event.target.value)}
                />
                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}