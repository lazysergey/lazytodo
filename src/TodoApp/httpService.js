import axios from 'axios';
import { TODO_URL } from './constants';

export const http = {
    getAll: () => {
        return axios
            .get(TODO_URL)
            .then(({ data }) => data)
    },
    deleteItem: (todoItem) => {
        return axios
            .delete(TODO_URL + todoItem.id)
    },
    patchItem: (todoItem) => {
        return axios
            .patch(TODO_URL + todoItem.id, todoItem)
            .then(({ data }) => data)
    },
    addItem: (todoItem) => {
        return axios
            .post(TODO_URL, todoItem)
    }
}