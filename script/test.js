import ApiService from "./ApiService.js";

(async function(){
    const api = new ApiService('https://jsonplaceholder.typicode.com', true);
    const getResult = await api.getCategory('comments', {postId: 1, id: 3});
    const postResult = await api.addTask({id: 1, user: "Иван", age: 28});
    console.log(getResult);
    console.log(postResult);
})();


