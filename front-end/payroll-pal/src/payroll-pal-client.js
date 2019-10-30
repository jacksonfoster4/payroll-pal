import Cookies from 'js-cookie'

class PayrollPalClient  {
    static login(username, password){
        console.log('Username: ' + username)
        console.log('Password: ' + password)
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
                    'date': [10,21,2019],
                    'day': 'Monday',
                    'hours': 8,
                    'approved': true,
                    'punches': [
                        ['work', '9:00 AM', '2:30 PM'],
                        ['meal', '2:30 PM', '3:00 PM'],
                        ['meal', '3:00 PM', '5:30 PM'],
                    ]
                },
                {
                    'date': [10,22,2019],
                    'day': 'Tuesday',
                    'hours': 8,
                    'approved': false,
                    'punches': [
                        ['work', '9:00 AM', '2:30 PM'],
                        ['meal', '2:30 PM', '3:00 PM'],
                        ['meal', '3:00 PM', '5:30 PM'],
                    ]
                },
                {
                    'date': [10,23,2019],
                    'day': 'Wednesday',
                    'hours': 9.5,
                    'approved': false,
                    'punches': [
                        ['work', '9:00 AM', '2:30 PM'],
                        ['meal', '2:30 PM', '3:00 PM'],
                        ['work', '3:00 PM', '5:30 PM'],
                    ]
                },
                {
                    'date': [10,24,2019],
                    'day': 'Thursday',
                    'hours': 0,
                    'approved': false
                },
                {
                    'date': [10,25,2019],
                    'day': 'Friday',
                    'hours': 0,
                    'approved': false
                },
        ]}
    }
    static updateEntry(entry) {
        /* 
        ajax.post({
            'url': 'api.payrollpal.thefoundationworks.com/update-entry',
            'body': {
                'token': token,
                'entry': entry
            }
        }) 
        */
        console.log(entry.punches)
        console.log(`updated entry from ppc`)
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