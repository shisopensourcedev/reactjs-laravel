import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function List(props: any) {

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {props.responseData.map((user: any) => {

                    console.log(user);
                    return (
                        <tr key={user.id}>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
