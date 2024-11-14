// APIComponent.js
import React from 'react';
import axiosInstance from './AxiosInstance';

axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
export default class APIHelper {

    // Function to make a GET request
    static Get(endpoint, headers = {}, obj) {
        try {
            return new Promise((resolve, reject) => {
                axiosInstance.get(`${endpoint}`, { headers })
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        } catch (error) {
            console.error('GET request failed:', error);
        }
    };

    // Function to make a POST request
    static Post(endpoint, obj, headers = { 'Content-Type': 'application/json', Accept: 'application/json' }) {
        try {
            return new Promise((resolve, reject) => {
                axiosInstance
                    .post(`${endpoint}`, obj, { headers })
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        } catch (error) {
            console.error('POST request failed:', error);
        }
    };

};
