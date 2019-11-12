import Cookies from 'js-cookie'

const apiUrl = 'http://localhost:5000'
// const apiUrl = 'payrollpal.thefoundationworks.com/api

class PayrollPalClient  {

    static async sendRequest(path, method, body){
        return await fetch(`${apiUrl}${path}`, {

            headers: new Headers({
                "Content-Type": 'application/json',
            }),
            method: method ? method : 'POST',
            body: JSON.stringify(body),

        })
        .then(res => res.json())
        .then(
            (result) => {
                return result
            },
            (error) => {
                return error
            }
        )
    }

    static async sendAuthedRequest(path, method, body){
        return await fetch(`${apiUrl}${path}`, {

            headers: new Headers({
                "Content-Type": 'application/json',
                "Authorization": 'JWT ' + PayrollPalClient.getAuthToken()
            }),
            method: method ? method : 'POST',
            body: JSON.stringify(body),

        })
        .then( res => res.json() )
        .then(
            (result) => {
                return result
            },
            (error) => {
                return error
            }
        )
    }
    
    static login(...args) { 
        let username = args[0].username
        let password = args[0].password
        let body = {'username': username, 'password': password}
        let demo = args[0].demo

        return PayrollPalClient.sendRequest('/auth', 'POST', body).then(
            (result) => {
                let token = result['access_token']
                PayrollPalClient.setAuthToken(token)
                return result
            },
            (error) => {
                return error
            }
        )
    }

    static getEntries(start, end){
        let body = {'start': start, 'end': end}
        return PayrollPalClient.sendAuthedRequest('/get-entries', 'POST', body)
    }

    static updateEntry(entry) {
        let body = {'entry': entry}
        return PayrollPalClient.sendAuthedRequest('/update-entry', 'POST', body)
    }

    static approveAll(start, end){
        let body = {'start': start, 'end': end}
        return PayrollPalClient.sendAuthedRequest('/approve-all', 'POST', body)
    }

    static logout(){
        PayrollPalClient.sendAuthedRequest('/logout', 'POST')
        PayrollPalClient.deleteAuthToken();
        Cookies.remove('demo')
    }

    static getAuthToken(){
        return Cookies.get('authToken')
    }

    static async getIsAuthenticated(){
        return await PayrollPalClient.sendAuthedRequest('/verify', 'GET').then(
            (result) => {
                return result.error ? false : true
            }
        )
    }

    static setAuthToken(token){
        Cookies.set('authToken', token)
    }

    static deleteAuthToken(){
        Cookies.remove('authToken')
    }

}

const Heartbeat = () => {
    return PayrollPalClient.sendAuthedRequest('/hearbeat', 'GET').then(
        (result) => {
            if(result.error){
                throw Error("Whoops! Something went wrong. Your token most likely expired or was invalid.")
            }
        }
    )
}

export default PayrollPalClient;
export { Heartbeat }