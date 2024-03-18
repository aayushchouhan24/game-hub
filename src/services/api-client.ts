import axios from "axios";

export default axios.create({
    baseURL:"https://api.rawg.io/api",
    params:{
        key:'3b18fb80b7c142bb95686729f1a6c46a'
    }
})