import axios from 'axios';
import { BASE_URL } from './constants';

export const http = {
    getAll: () => {
        return axios
            .get(BASE_URL)
            .then(({ data }) => data)
    },
    deleteItem: (todoItem) => {
        return axios
            .delete(BASE_URL + todoItem.id)
    },
    patchItem: (todoItem) => {
        return axios
            .patch(BASE_URL + todoItem.id, todoItem)
            .then(({ data }) => data)
    },
    addItem: (todoItem) => {
        return axios
            .post(BASE_URL, todoItem)
    }
}