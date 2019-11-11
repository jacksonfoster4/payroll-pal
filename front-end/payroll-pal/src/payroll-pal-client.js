import Cookies from 'js-cookie'

const apiUrl = 'http://localhost:5000'
// const apiUrl = 'payrollpal.thefoundationworks.com/api

const JWT = () => {
    return "JWT " + PayrollPalClient.getAuthToken()
} 

class PayrollPalClient  {
    static login(...args) { 
        let username = args[0].username
        let password = args[0].password
        let body = JSON.stringify({'username': username, 'password': password})
        let demo = args[0].demo
        
        return fetch(`${apiUrl}/auth`, {
            headers: { "Content-Type": 'application/json'},
            method: 'POST',
            body: body,
        })
        .then(res => res.json()) 
        .then(
            (result) => {
                let token = result['access_token']
                PayrollPalClient.setAuthToken(token)
                console.log('cookie has been set')
                return result
            },

            (error) => {
                console.log(error)
                return error
            }
            
        )
    }
    static async getEntries(start, end){
        return await fetch(`${apiUrl}/get-entries`, {
            headers: new Headers({
                "Content-Type": 'application/json',
                "Authorization": JWT(),
            }),
            method: 'POST',
        })
        .then(
            (res) => res.json() ) 
        .then(
            (error) => {
                return error
            },
            (result) => {
                return result
            }
            
        )
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

    static getIsAuthenticated(){
        if(Cookies.get('authToken')){
            return true
        }
        else {
            console.log('no token')
            return false
        }
        /* let isAuthenticated = ajax.post({
            'url': `${apiUrl}/authenticate`
            'body': {
                'token': token
            }
        }) */
    }

    static setAuthToken(token){
        Cookies.set('authToken', token)
    }

    static deleteAuthToken(){
        Cookies.remove('authToken')
    }

}

export default PayrollPalClient;