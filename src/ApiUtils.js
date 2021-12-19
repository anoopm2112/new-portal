import axios from 'axios'
export const API_KEY = 'uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7';
export const SECTION_API_URL = 'https://api.nytimes.com/svc/news/v3/content/section-list.json?';

export const ARTICLE_API_URL = 'https://api.nytimes.com/svc/news/v3/content/all/all.json?';




export const getAllSection = async () => {
    let sections = []
    // await axios.get(`${API_URL}api-key=${API_KEY}`)
    //     .then(res => {
    //         sections = res.data;
    //         // this.setState({ persons });
    //     })
    return sections;
}