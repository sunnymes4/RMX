/**
 * INSPINIA - Responsive Admin Theme
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'INSPINIA | Responsive Admin Theme';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'INSPINIA | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                if ($('body').hasClass('mini-navbar')){
                    element.addClass('ng-hide');
                }
                element.metisMenu();
            }, 200);
        }
    };
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn" href="" ng-click="minimalize()"><i class="fa fa-stack-2x custom-nav-bar-icon fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 100);
                    $('#side-menu').removeClass('ng-hide');
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 300);
                    $('#side-menu').removeClass('ng-hide');
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                    $('#side-menu').addClass('ng-hide');
                }
            }
        }
    };
}

function autoWindowHeight(){
    return{
        restrict:'AE',

        link: function (scope, elem, attrs){
            var element = elem[0];
            var height = 0;
            var body = window.document.body;
            if (window.innerHeight) {
                height = window.innerHeight;
            } else if (body.parentElement.clientHeight) {
                height = body.parentElement.clientHeight;
            } else if (body && body.clientHeight) {
                height = body.clientHeight;
            }
            element.style.height = ((height - element.offsetTop-attrs.heightToReduce) + "px");
        }
    }
}


function badgeDropDown(){
    return{
        restrict:'AE',
        template: '<span class="badge custom-badge" dropdown-menu="ddMenuOptions2" dropdown-model="ddMenuSelected2"><span style="font-size: 10px;"  class="glyphicon glyphicon-chevron-down"></span></span>',
        link: function (scope, elem, attrs){

        }
    }
}

function hierarchyNav(){
    return{
        restrict:'E',
        templateUrl: 'views/modules/common/hierarchyNav.html',
        scope: {
            menuList: '=',
            styleClassName: '=styleClassName'
        },
        replace: true,
        link: function (scope, elem, attrs){

        }
    }
}

function addItemPopup($modal){
    return{
        restrict:'AE',
        scope:{
            changedValue:'=',
            listOfItems:'='
        },
        link: function (scope, elem, attrs){
            scope.$watch('changedValue', function(newVal, oldVal){
                var oldValue = oldVal;
                if(scope.changedValue == 'addNew'){
                    var modalInstance = $modal.open({
                        templateUrl:'views/modules/common/addNewItem.tpl.html',
                        size:'md',
                        windowClass: 'add-new-item-popup',
                        controller:function($scope, $modalInstance){
                            $scope.saveItem = function(itemName){
                                $scope.close(itemName);
                            }

                            $scope.close = function(itemName){
                                $modalInstance.close(itemName);
                            }
                        }
                    });

                    modalInstance.result.then(function(itemName){
                        if(itemName && itemName.length){
                            var newId = Math.floor(Math.random()*90000) + 10000;
                            scope.listOfItems.push({id:newId.toString(), code:itemName});
                            scope.changedValue = oldValue;
                        }
                    });
                }
            })
        }
    }
}

/**
 *
 * Pass all functions into module
 */
commonModule
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('autoWindowHeight', autoWindowHeight)
    .directive('badgeDropDown', badgeDropDown)
    .directive('addItemPopup', addItemPopup)
    .directive('hierarchyNav', hierarchyNav);
