let PageContext = {}

let AJAX = {
    get: async function(url) {
        return axios.get(url).then(function (res){return res.data;});
    },
    post: async function(url, data) {
        return this.send('post', url, data).then(function (res){return res.data;});
    },
    put: async function(url, data) {
        return this.send('put', url, data).then(function (res){return res.data;});
    },
    patch: async function(url, data) {
        return this.send('patch', url, data).then(function (res){return res.data;});
    },
    delete: async function(url, data) {
        return this.send('delete', url, data).then(function (res){return res.data;});
    },
    send: async function (method, url, data) {
        let res = axios({method: method, url: url, data: data});
        res.then(e => {
            return res;
        }).catch(e => {
            console.log(e);
            if(e.response.status == 401) {
                Dialog.confirm('세션이 만료됐거나 아직 로그인하지 않은 사용자입니다.<br>다시 로그인 하시겠습니까?', function () {
                   SSO.logout();
                });
            }
        })
        return res;
    }
}

let Page = {
    awake: function(option = {}) {
        // 1. Dialog 생성
        Dialog.init();
        this.setDevice(option);
        handleResize();
        $(window).scroll(scrollHandler);
        start();
    },
    go: function (url, params) {
        location.href = (url);
    },

    move: function (url, params) {
        location.replace(url);
    },
    back: function () {
        history.back();
        //location.href = document.referrer;
    },
    reload: function() {
        location.reload();
    },
}