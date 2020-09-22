import React from 'react'
import io from 'socket.io-client'
import OAuth from '../components/OAuth'
const socket = io("http://localhost:8000")
const providers = ['twitter', 'google', 'facebook', 'github']

export default props => {
    return (
        <div className={'wrapper'}>
            <div className={'container'}>
                {providers.map(provider => <OAuth provider={provider} key={provider} socket={socket}/>)}
            </div>
        </div>
    );
}