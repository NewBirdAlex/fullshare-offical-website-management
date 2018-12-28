
//广度优先遍历
function object_breadthTraversal(obj, test, depthLimit){
    var k, v, i, l, temp, rs, key, value, subObj, path, subPath;
    var queue = [], subQueue, deep = 0, testResult;
    
    depthLimit = (depthLimit-0) > 0 ? depthLimit : Number.MAX_VALUE;
    
    deep++;
    for(k in obj){
        v = obj[k];
        rs = test.call(obj, k, v, [k], null);
        if(rs === false) return;
        if(rs === true) continue;
        
        if(typeof(v) === 'object' && v !== null){
            queue.push({
                path : [k],
                subObj : v
            });
        }
    }
    
    while(queue.length){
        subQueue = [];
        if(deep > depthLimit) break;
        for(i = 0, l = queue.length; i < l; i++){
            temp = queue[i];
            subObj = temp.subObj;
            path = temp.path;
            
            object_each(subObj, function(key, val){
                var subPath = path.concat([key]);
                var rs = test.call(obj, key, val, subPath, this);
                if(rs === true) return;
                if(rs === false){
                    testResult = true;
                    return false;
                }
                
                if(typeof(val) === 'object' && val !== null){
                    subQueue.push({
                        path : subPath,
                        subObj : val
                    });
                }
            });
            
            if(testResult) return;
        }
        queue = subQueue;
        deep++;
    }
}

//对象遍历，只遍历一层
function object_each(obj, each){
    var k, l, result;
    if(typeof(obj) !== 'object' || obj === null) return;
    
    if(Object.prototype.toString.call(obj) === '[object Array]'){
        for(k = 0, l = obj.length; k < l; k++){
            result = each.call(obj, k, obj[k]);
            if(result === false) break;
        }
    }else{
        for(k in obj){
            result = each.call(obj, k, obj[k]);
            if(result === false) break;
        }
    }
}

var data = [
    {
        title : '网站设定',
        url : '/home/setting'
    },
    {
        title : '首页',
        submenu : [
            {
                title : 'Banner',
                url : '/home/banner'
            }
        ]
    },
    {
        title : '丰盛',
        submenu : [
            {
                title : '关于丰盛',
                submenu : [
                    // {
                    //     title : 'Banner',
                    //     url : '/home/about/banner'
                    // },
                    {
                        title : '业务介绍',
                        submenu : [
                            {
                                title : '建设投资',
                                url : '/home/building'
                            },
                            {
                                title : '健康服务',
                                url : '/home/health'
                            },
                            {
                                title : '文化旅游',
                                url : '/home/travel'
                            }
                        ]
                    },
                    {
                        title : '丰盛文化',
                        url : '/home/editFsCulture'
                    },
                    {
                        title : '文化活动',
                        url : '/home/culture'
                    }
                ]
            }
        ]
    },
    {
        title : '健康',
        url : '/home/healthlist'
    },
    {
        title : '资讯',
        url : '/home/newslist'
    }
];

//通过属性url查找，对应的路径
function findPath(url, data){
    var paths = [], i, item = data, result = [];
    object_breadthTraversal(data, function(key, val, path){
        if(val.url === url){
            paths = path;
            return false;
        }
    });

    while(paths.length){
        i = paths.shift();
        item = item[i];
        if((i+'').match(/^\d$/)){
            result.push({
                title : item.title,
                url : item.url
            });
        }
    }

    return result;
}


findPath('/home/editFsCulture', data);

export default {
    data,
    findPath
}
