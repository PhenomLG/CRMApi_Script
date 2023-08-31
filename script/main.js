import ApiService from "./ApiService.js";

(async function (){
    const api = new ApiService('/api/v4');
    const contactsIds = await getContactsIds(); // Возвращает массив id контактов, в которых отсутствуют сделки
    const days = 2; // Через сколько дней задача должна быть завершена
    const completionTime = new Date(Date.now() + days * 24 * 1000 * 3600 );

    const data = {
        complete_till: completionTime,
        text: 'Контакт без сделок',
    }
    contactsIds.forEach(id => {
        data['entity_id'] = id;
        api.addTask(data);
    });

    async function getContactsIds(){
        let page = 1;
        let ids = [];
        while(true){
            const contacts = await api.getCategory('contacts', { limit: 25, with: 'leads', page });

            if(contacts.length === 0)
                break;

            ids = ids.concat(contacts.map(contact => {
                if(contact._embedded.leads.length === 0)
                    return contact.id;
            }));
            page++;
        }
        return ids;
    }
})();







