import Cookies from 'js-cookie'

class PayrollPalClient  {
    static login(username, password){
        setIsAuthenticated(true);
        setAuthToken("AUTH-TOKEN-XXXXX123456XX");
        return ppc
    }
    static getEntries(start, end){
        let token = Cookies.get('authToken')
        /* ajax.post({
            url: 'api.payrollpal.thefoundationworks.com/get-entries',
            body: {
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
        this.deleteAuthToken();
        this.deleteIsAuthenticated();
    }

    static getAuthToken(){
        return Cookies.get('authToken')
    }

    static getIsAuthenticated(){
        let isAuthenticated = true
        /* let isAuthenticated = ajax.post({
            'token': token
        }) */
        return isAuthenticated
    }

    static setAuthToken(token){
        Cookies.set('authToken', token)
    }
    static setIsAuthenticated(val){
        Cookies.set('isAuthenticated', val)
    }

    static deleteAuthToken(){
        Cookies.remove('authToken')
    }
    static deleteIsAuthenticated(){
        Cookies.remove('isAuthenticated')
    }

}

export default PayrollPalClient;