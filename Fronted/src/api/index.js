const axios = require('axios');

let config = {
    mode: 'no-cors',
    headers: {
        'Accept':'*/*',
        'Access-Control-Allow-Origin': '*',
        'Conten-type':'application/json'
    }
}
const url = `http://localhost:3050`;
const getCons = ()=>{
    return axios.get(`${url}/cons`,config);
}
const postCons = (data)=>{
    return axios.post(`${url}/cons`,data,config);
}
const putCons = (num_consulta,data)=>{
    return axios.put(`${url}/cons/${num_consulta}`,data,config);
}
const delCons = (num_consulta)=>{
    return axios.delete(`${url}/cons/${num_consulta}`,config);
}
const getMedCons = (num_consulta)=>{
    return axios.get(`${url}/cons/${num_consulta}/meds`,config);
}
const postMedCons = (num_consulta,data)=>{
    return axios.post(`${url}/cons/${num_consulta}/meds`,data,config);
}
const delMedCons = (num_consulta)=>{
    return axios.delete(`${url}/cons/${num_consulta}/meds`,config);
}
const getMeds = ()=>{
    return axios.get(`${url}/meds`,config);
}
const postMeds = (data)=>{
    return axios.post(`${url}/meds`,data,config);
}
const putMed = (id_med,data)=>{
    return axios.put(`${url}/meds/${id_med}`,data,config);
}
const delMed = (id_med)=>{
    return axios.delete(`${url}/meds/${id_med}`,config);
}
module.exports = {
    getCons,
    postCons,
    putCons,
    delCons,
    getMedCons,
    postMedCons,
    delMedCons,
    getMeds,
    postMeds,
    putMed,
    delMed,
}