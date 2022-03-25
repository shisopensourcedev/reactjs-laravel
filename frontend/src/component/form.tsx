import { useState } from 'react';
import api from '../services/api';

export default function From(props: any) {

    let [fullname, setFullname] = useState('');
    let [email, setEmail] = useState('');
    let [message, setMessage] = useState('');

    const save = (e: any) => {
        e.preventDefault();
        setMessage('Saving...');
        api.store({
            'email': email,
            'fullname': fullname
        }).then((response) => {
            setMessage('')
            console.log(response)
            props.fetchData();
        }).catch((error) => {
            setMessage('Error')
            console.log(error)
        });
    }


    return (
        <form onSubmit={save}>
            <div className="form-group">
                <label htmlFor="pwd">Full Name:</label>
                <input
                    required
                    className="form-control"
                    name="fullname"
                    id="fullname"
                    type='text'
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input
                    required
                    className="form-control"
                    name="email"
                    id="email"
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <p>{message}</p>
        </form>
    );
}
