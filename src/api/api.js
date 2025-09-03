import axios from "axios";

const API_BASE_URL="http://localhost/crm-solvonix/api/v1/user";


export const getContacts=()=> axios.get(`${API_BASE_URL}/contacts`);