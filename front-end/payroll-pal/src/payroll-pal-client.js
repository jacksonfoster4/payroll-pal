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
            'totalHours': 25.5,
            'entries': [
                {
                    'date': '10/21/19',
                    'day': 'Monday',
                    'hours': 8,
                    'approved': true
                },
                {
                    'date': '10/22/19',
                    'day': 'Tuesday',
                    'hours': 8,
                    'approved': false
                },
                {
                    'date': '10/23/19',
                    'day': 'Wednesday',
                    'hours': 9.5,
                    'approved': false
                },
                {
                    'date': '10/24/19',
                    'day': 'Thursday',
                    'hours': 0,
                    'approved': false
                },
                {
                    'date': '10/25/19',
                    'day': 'Friday',
                    'hours': 0,
                    'approved': false
                },
        ]}
    }
    static logout(){
        PayrollPalClient.deleteAuthToken();
    }
    static approveAll(){
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
            return false
        }
        /* let isAuthenticated = ajax.post({
            'url': api.payrollpal.thefoundationworks.com/authenticate
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