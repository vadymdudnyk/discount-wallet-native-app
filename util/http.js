import React from 'react'
import {AsyncStorage} from 'react-native'

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

async function register(email, phoneNumber, password) {
    let body = JSON.stringify({
        email: email,
        phoneNumber: phoneNumber,
        password: password
    });
    let response = await fetch(`${url}/users`, {
        method: 'POST',
        body: body,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });

    if (response.status === 200) {
        return await response.json();
    }
    await logError(response);
    return Promise.reject('Error')
}

async function discoverBusinesses() {
    const userToken = await AsyncStorage.getItem('userToken');
    let response = await fetch(`${url}/businesses/discover`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });
    if (response.status === 200) {
        return await response.json();
    }
    await logError(response);
    return Promise.reject('Error while fetching discovered businesses')
}

async function subscribeToBusiness(id) {
    const userToken = await AsyncStorage.getItem('userToken');
    let response = await fetch(`${url}/businesses/${id}/subscribers`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });
    if (response.status === 200) {
        return Promise.resolve();
    }
    await logError(response);
    return Promise.reject('Error while fetching discovered businesses')
}

async function getCustomerCoupons() {
    const userToken = await AsyncStorage.getItem('userToken');
    let response = await fetch(url + '/customer/coupons', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });
    if (response.status === 200) {
        return await response.json();
    }
    await logError(response);
    return Promise.reject('Error while fetching discovered businesses')
}

async function logError(response) {
    let json = await response.json();
    console.log(`Response status ${response.status}`);
    console.log(`Response object ${json}`)
}

export default {
    authenticate,
    register,
    discoverBusinesses,
    subscribeToBusiness,
    getCustomerCoupons
}
