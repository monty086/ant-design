
let urls = {} ;

let protocol = window.location.protocol;//xieyi
let host  = window.location.host;

// urls.baseURL = protocol+'//'+host;
urls.baseURL = 'http://127.0.0.1:7002';

urls.login = '/user/signin'  
urls.singup ='/user/singup'
urls.signout ='/user/signout'
urls.articleList = '/article/list'
urls.deleteBlog = '/article/delete'

// urls.addBlog = "/article/add"
urls.editBlog = "/article/edit"
urls.discuss = "/article/discuss"



export default urls