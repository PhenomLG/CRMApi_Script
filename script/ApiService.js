export default class ApiService {
    _baseUrl;
    _test;
    constructor(baseUrl, test = false) {
        this._baseUrl = baseUrl;
        this._test = test;
    }

    _fetchGetRequest = async (url) => {
        const response = await fetch(url);
        if(!response.ok)
            throw new Error(`Что-то пошло не так с получением контактов по адресу: ${url}, Статус: ${response.status}`);
        return await response.json();
    }

    getCategory = async (category, params = null) => {
        let getUrl = new URL(`${this._baseUrl}/${category}`);
        if(params !== null) {
            for (const param in params)
                getUrl.searchParams.set(param, params[param]);
        }
        return await this._fetchGetRequest(getUrl);
    }

    addTask = async (data) => {
        let postUrl = this._baseUrl + (this._test ?  '/posts' : '/tasks');

        const response = await fetch(postUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-type': 'application/json'}
        });

        if(!response.ok){
            throw new Error(`Что-то пошло не так с добавлением задачи для id: ${data.id}, Статус: ${response.status}`);
        }

        const result = await response.json();
        console.log(`Задача ${result.id} создана.`);
        return result;
    }
}