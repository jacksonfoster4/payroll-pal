import Cookies from 'js-cookie'

class PayrollPalClient  {
    static login(username, password){
        PayrollPalClient.setAuthToken("AUTH-TOKEN-XXXXX123456XX");
    }
    static getEntries(start, end){
        let token = Cookies.get('authToken')
        /* ajax.post({
            'url': 'api.payrollpal.thefoundationworks.com/get-entries',
            'body': {
                'token': token,
                'start': start,
                'end': end
            }
        }) */
        return {
            "start": "October 21, 2019", "end":"October 25, 2019"
        }
    }
    static logout(){
        PayrollPalClient.deleteAuthToken();
    }

    static getAuthToken(){
        return Cookies.get('authToken')
    }

    static getIsAuthenticated(){
        let isAuthenticated = true
        /* let isAuthenticated = ajax.post({
            'url': api.payrollpal.thefoundationworks.com/authenticate
            'body': {
                'token': token
            }
        }) */
        return isAuthenticated
    }

    static setAuthToken(token){
        Cookies.set('authToken', token)
    }

    static deleteAuthToken(){
        Cookies.remove('authToken')
    }

}

export default PayrollPalClient;