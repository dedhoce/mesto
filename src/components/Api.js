export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers    
  }
  
  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();  
  }

  getUserInfo() {    
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers      
    })
    .then(res => {      
        this._getResponseData(res)
        throw new Error('Что-то пошло не так');
    })        
  }  

  pushUserInfo(newUserInfo) {    
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserInfo.name,
        about: newUserInfo.subname
      })
    }); 
  }

  pushAvatar(newLinkAvatar) {        
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newLinkAvatar.avatar        
      })
    }); 
  }

  getInitialCards() {    
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers      
    })
    .then(res => {      
        this._getResponseData(res)
        throw new Error('Что-то пошло не так');
    })        
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers      
    });
  }

  pushInfoCreateCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.url         
      })
    })
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers      
    });  
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers      
    });
  }

  // другие методы работы с API
}




