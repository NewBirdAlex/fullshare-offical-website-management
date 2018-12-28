// const config = {
//     path:'http://192.168.7.208:8096/company-cms-manager'
// }

// export default config;

const configer = {
    path:'http://192.168.7.208:8096/company-cms-manager',
    official : 'http://fsfsb.fullshare.cc/',
    manager : 'http://fsbmanage.fullshare.cc/'
};
if(window.location.hostname.match(/\.fullshare\.cc/)){
    //丰盛集团官网
    configer.path = 'http://fsbapi.fullshare.cc/';
}else if((/:3000/ig).test(window.location.href)){
    //本地
    configer.path='http://192.168.7.208:8096/company-cms-manager';
}else{
    // configer.path='http://inapi.fshtop.com/company-cms-manager' //内网
    configer.path='http://api.fshtop.com/company-cms-manager' //外网
}
// configer.path = 'http://fsbapi.fullshare.cc/';
module.exports = configer;