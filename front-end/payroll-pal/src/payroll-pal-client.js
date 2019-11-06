import Cookies from 'js-cookie'

const apiUrl = 'localhost:8000'
// const apiUrl = 'payrollpal.thefoundationworks.com/api
class PayrollPalClient  {
    static login(...args){
        let username = args[0].username
        let password = args[0].password
        let demo = args[0].demo
        /* 
        if(demo) {
            ajax.post({
            'url': `${apiUrl}/demo`,
            'body': {
                'demo': demo,
            }
        })
        }
        else {
            ajax.post({
                'url': `${apiUrl}/login`,
                'body': {
                    'username': username,
                    'password': password,
                }
            }) 
        }*/
        console.log(username)
        console.log(password)
        console.log(demo)
        if(demo){
            Cookies.set('demo', demo)
        }
        PayrollPalClient.setAuthToken("AUTH-TOKEN-XXXXX123456XX");
        // if authenticated
        return true
        // else
        // return false
    }
    static getEntries(start, end){
        /* 
        let token = Cookies.get('authToken')
        ajax.post({
            'url': `${apiUrl}/get-entries`,
            'body': {
                'token': token,
                'start': start,
                'end': end
            }
        }) */
        return {
            'totalHours': 25.5,
            'payRate': 18.00,
            'payPeriodStart': [10,21,2019],
            'payPeriodEnd': [10,27,2019],
            'firstName': 'Jackson',
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
                    'approved': false,
                    'punches': []
                },
                {
                    'date': [10,25,2019],
                    'day': 'Friday',
                    'hours': 0,
                    'approved': false,
                    'punches': []
                },
                {
                    'date': [10,26,2019],
                    'day': 'Saturday',
                    'hours': 0,
                    'approved': false,
                    'punches': []
                },
                {
                    'date': [10,27,2019],
                    'day': 'Sunday',
                    'hours': 0,
                    'approved': false,
                    'punches': []
                },
        ]}
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