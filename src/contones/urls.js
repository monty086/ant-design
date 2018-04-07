
let urls = {} ;

let protocol = window.location.protocol;//xieyi
let host  = window.location.host;

urls.baseURL = protocol+'//'+host;

urls.login = '/login'   
urls.order_list = '/order/list'



export default urls