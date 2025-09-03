//for fetching stuff and doing communication with backend

import {SERVER} from "../utils/constants.js"
import axios from "axios"

export const apiClient=axios.create({
    baseURL:SERVER
})