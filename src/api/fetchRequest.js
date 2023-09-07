
export const fetchRequest = async (url = '' , option = {}) =>{
    try {
        const {method, body}= options || {}

        const requestOptions = {
            method: method || 'GET',
            headers:{
                UserId: 'Cholpon',
                'Content-Type': 'application/json',

            }
        }
        if (method !== 'GET' && method !== 'DELETE'){
            requestOptions.body = JSON.stringify(body)
        }
    } catch (error) {
        console.log(error);
    }
}