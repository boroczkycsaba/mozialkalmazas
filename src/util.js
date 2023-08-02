import axios from "axios";

export const getData=async ({queryKey})=>{
    console.debug('axios kérés:',queryKey)
    const url=queryKey[1]
    const resp=await axios.get(url)
    return resp.data
}

export const img_300="https://image.tmdb.org/t/p/w300"
export const img_500="https://image.tmdb.org/t/p/w500"

export const imgUnavailable="https://www.movienewz.com/img/films/poster-holder.jpg"

export const noPicture="https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";