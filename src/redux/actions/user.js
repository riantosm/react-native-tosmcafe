import Axios from "axios";

const URL_STRING = 'http://192.168.1.237:3001/api/v1';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTgyNjg3NjA0fQ.lqvHkkKjXB65ZSPLFQBQrrMs29QBRO7po5_1Vc93qAo';

export const getAllUser = () => {
  return {
    type: "GET_USER", // string yang mendiskripsikan perintah
    payload: Axios.get(`${URL_STRING}/user`, {
      headers: {
        token: TOKEN
      }
    })
  };
};

export const postNewUser = data => {
  console.warn('proses');
  return {
    type: "POST_USER",
    payload: Axios.post(`${URL_STRING}/user`,
      {
        name_user: data.name_user,
        username: data.username,
        password: data.password
      },
      {
        headers: {
          token: TOKEN
        }
      }
    )
  };
};
