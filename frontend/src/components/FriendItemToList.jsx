import { useState } from 'react'
import { getCookie } from './getCookie.js';

export default function FriendItemToList({id, username, userCode, setCurrentConversationId}) {
    const [codeActive, setCodeActive] = useState(false);

    function setConversationId(userId) {
        fetch('http://127.0.0.1:5000/get_conversation_id', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'user_id': userId, 'session': getCookie('session')}),
        })
        .then(response => response.json())
        .then(data => {
            setCurrentConversationId(data.id);
        })
        .catch(error => { console.error('Error adding entry:', error); });
    }
    
    return (
        <div className="FriendItem" onMouseEnter={() => setCodeActive(true)} onMouseLeave={() => setCodeActive(false)} style={{cursor:"pointer"}} onClick={() => setConversationId(id)}>
            {username}{codeActive && <span style={{opacity:"0.8"}}>#{userCode}</span>}
        </div>
    )
  }