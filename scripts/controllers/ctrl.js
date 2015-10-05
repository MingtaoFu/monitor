/**
 *
 * Created by mingtao on 15-10-4.
 */

//验证返回是否成功
function val(data) {
    return data.returnStatus == 'S';
}

//src头
var srcHeader = 'data:image/jpeg;base64,';

app.controller('rootCtrl', ['$scope', 'service', '$rootScope', function($scope, service, $rootScope) {
    $scope.deB = 0;
    $scope.linkB = 0;
    $scope.suggestion = '';

    var req = function(url, success, params) {
        var theParams = params || {};
        $scope.suggestion = '操作进行中';
        service.req.get(url, theParams).then(
            function(data) {
                if(val(data)) {
                    success(data);
                    $scope.suggestion = '操作成功';
                } else {
                    $scope.suggestion = data.returnMsg;
                }
            },
            function() {
                $scope.suggestion = '连接失败';
            }
        );
    };

    $rootScope.data = {
        deviceList: [1],
        device: 1,
        settings: {
            xrandr: '320x240',
            white: 'auto',
            effects: 'normal',
            explosure: 2,
            lightness: 2,
            contrast: 2,
            saturation: 2,
            LEDSwitch: 0
        },
        effectsMapping: {
            normal: '正常',
            blackwhite: '黑白',
            blue: '偏蓝',
            green: '偏绿',
            red: '偏红',
            antique: '复古',
            negative: '反色',
            bwnegative: '黑白反色'
        },
        picture: '',
        LEDArr: [
            {"id": 0, "status:": 0},
            {"id": 1, "status:": 0},
            {"id": 2, "status:": 0},
            {"id": 3, "status:": 0},
            {"id": 4, "status:": 0},
            {"id": 5, "status:": 0},
            {"id": 6, "status:": 0},
            {"id": 7, "status:": 0}
        ]
    };

    $rootScope.get = {
        deviceList: function() {
            req(
                'device/list',
                function(data) {
                    $rootScope.data.deviceList = data.devList;
                    $rootScope.data.device = data.devList[0];
                    $scope.deB = 1;
                }
            );
        },

        picture: function() {
            service.req.get('camera/picture', {ID: $rootScope.data.device}).then(function(data) {
                if(val(data)) {
                    $rootScope.data.picture = srcHeader + data.picture;
                } else {
                    //报错
                }
            });
        },

        setting: function() {
            req(
                'device/setting',
                function(data) {
                    $rootScope.data.settings = data.devSetting;
                    $scope.linkB = 1;
                },
                {
                    ID: $rootScope.data.device
                }
            );
        },

        LED: function() {

        }
    };

    $rootScope.set = function(key, value) {
        var obj = {};
        obj['ID'] = $rootScope.data.device;
        obj[key] = value;
        req(
            'camera/' + key,
            function(data) {
                $rootScope.data.settings[key] =  value;
            },
            obj
        );
    };

    /*----------LED模块-----------*/

}]);
