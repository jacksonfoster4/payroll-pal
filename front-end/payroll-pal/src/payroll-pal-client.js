import Cookies from 'js-cookie'

class PayrollPalClient  {
    static login(username, password){
        let ppc = new PayrollPalClient()
        ppc.setIsAuthenticated(true);
        ppc.setAuthToken("AUTH-TOKEN-XXXXX123456XX");
        return ppc
    }
    logout(){
        this.authToken = null;
        this.deleteAuthToken();
        this.isAuthenticated = false;
        this.deleteIsAuthenticated();
    }

    static getAuthToken(){
        return Cookies.get('authToken')

    }

    static getIsAuthenticated(){
        return Cookies.get('isAuthenticated')
    }

    setAuthToken(token){
        this.authToken = token;
        Cookies.set('authToken', token)
    }
    setIsAuthenticated(val){
        this.isAuthenticated = val;
        Cookies.set('isAuthenticated', val)
    }

    deleteAuthToken(){
        this.authToken = undefined;
        Cookies.remove('authToken')
    }
    deleteIsAuthenticated(){
        this.isAuthenticated = undefined;
        Cookies.remove('isAuthenticated')
    }

}

export default PayrollPalClient;