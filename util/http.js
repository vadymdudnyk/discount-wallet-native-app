const url = 'http://192.168.0.45:8080';

async function authenticate(username, password) {
    let response = await fetch(url + '/users/authentications', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });

    if (response.status === 200) {
        return await response.json();
    }
    return Promise.reject('Unauthorized')
}

export default {
    authenticate
}
