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
            body: body,
        }).then(res => res.json())
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
                "Authorization": 'JWT ' + PayrollPalClient.getAuthToken(),
            }),
            method: method ? method : 'POST',
            body: body,
        }).then(res => res.json())
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
        let body = JSON.stringify(
            {'username': username, 'password': password}
        )
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
    static async getEntries(start, end){
        return PayrollPalClient.sendAuthedRequest('/get-entries', 'POST')
    }
    static updateEntry(entry) {
        /* 
        ajax.post({
            'url': `${apiUrl}/update-entry`,
            'body': {
                'token': token,
                'entry': entry
            }
        }) 
        */
        console.log(`updated entry from ppc`)
        console.log(`Date: ${entry.date}`)
        console.log(`Punches: ${entry.punches}`)
        console.log(`Approved: ${entry.approved}`)
        return entry
    }
    static logout(){
        PayrollPalClient.sendAuthedRequest('/logout', 'POST')
        PayrollPalClient.deleteAuthToken();
        Cookies.remove('demo')
    }
    static approveAll(){
        /* ajax.post({
            'url': `${apiUrl}/approve-all`,
            'body': {
                'token': token,
                'start': start,
                'end': end
            }
        }) */
        console.log('All hours have been approved')
    }
    static getAuthToken(){
        return Cookies.get('authToken')
    }

    static async getIsAuthenticated(){
        return await PayrollPalClient.sendAuthedRequest('/verify', 'GET').then(
            (result) => {
                return true
            },
            (error) => {
                return false
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
    //let ping = 
    setInterval(function () {
        PayrollPalClient.sendAuthedRequest('/hearbeat', 'GET')
    }, 30000)

}

export default PayrollPalClient;
export { Heartbeat }