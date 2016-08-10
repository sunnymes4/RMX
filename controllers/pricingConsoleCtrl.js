/**
 * Created by Santhosh on 06-Jan-16.
 */

pricingConsole
    .controller('PricingConsoleController', ['$scope', '$timeout', '$window', 'commonService', 'PricingConsoleService', 'Notification','$filter',
        function ($scope, $timeout, $window, commonService, PricingConsoleService, Notification, $filter) {

            $scope.showSideBar = false;
            $scope.classForMainContent = 'col-lg-12';
            $scope.hierarchy = 'navbar hierarchy-menu';
            $scope.attribute = 'navbar attribute-menu';

            $scope.toggleSideBar = function () {
                if (!$scope.showSideBar) {
                    $scope.classForMainContent = 'col-lg-8 col-md-8 col-sm-12';
                    $scope.hierarchy = 'navbar hierarchy-menu hierarchy-menu-right';
                    $scope.attribute = 'navbar attribute-menu attribute-menu-right';
                    $timeout(function () {
                        $scope.showSideBar = !$scope.showSideBar;
                        $scope.refreshSlider();
                    }, 1000);
                } else if ($scope.showSideBar) {
                    $scope.showSideBar = !$scope.showSideBar;
                    $scope.classForMainContent = 'col-lg-12';
                    $timeout(function () {
                        $scope.refreshSlider();
                        $scope.hierarchy = 'navbar hierarchy-menu';
                    }, 1000)
                }
            }

            function headerCellRendererFunc(params) {
                // Customizing the header

                return '<span title='+params.value+'>'+params.value+'</span>';

            }

            var requestApprovalColumnDefs = [
                {headerName: "Run Id", field: "runId", width: 155, cellClass: "text-center"},
                {headerName: "% Profit", field: "profit", width: 150, cellClass: "text-center"},
                {headerName: "% Revenue", field: "revenue", cellClass: "text-center", width: 150},
                {headerName: "% Volume", field: "volume", cellClass: "text-center", width: 150},
                {
                    headerName: "Select", field: "select", cellClass: "text-center", width: 150,
                    template: '<input type="checkbox" class="custom-check-box"/><span class="lbl padding-8"></span> '
                }

            ];

            var requestApprovalRowData = [
                {
                    runId: "1201",
                    profit: "5.5%",
                    revenue: "2.8%",
                    volume: "1.0%",
                    select: true
                },
                {
                    runId: "1203",
                    profit: "9.5%",
                    revenue: "0.8%",
                    volume: "1.9%",
                    select: false
                },
                {
                    runId: "1133",
                    profit: "3.5%",
                    revenue: "5.6%",
                    volume: "2.0%",
                    select: false
                },
                {
                    runId: "1200",
                    profit: "1.5%",
                    revenue: "0.3%",
                    volume: "0.9%",
                    select: false
                }
            ];

            $scope.requestApprovalGridOptions = {
                columnDefs: requestApprovalColumnDefs,
                rowData: requestApprovalRowData,
                enableColResize: true,
                angularCompileColumn: true
            };

            var gridWidthResize = function (time) {
                $timeout(function () {
                    $scope.runIdGridOptions.api.sizeColumnsToFit();
                }, time);
            }

            angular.element($window).on('resize', function (e) {
                gridWidthResize(1000);
                $scope.refreshSlider();
            });

            $scope.resizeGrid = function (isOpened) {
                gridWidthResize(1000);
            }

            var getPCInfo = function () {
                PricingConsoleService.getPCInfo().then(function (data) {
                    $scope.PCInfo = data;
                    $scope.PCInfo.input.optimizeStatus = $scope.PCInfo.input.optimizeStatus.toString();
                    $scope.PCInfo.input.startDate =  $scope.PCInfo.input.startDate ?  $scope.PCInfo.input.startDate : new Date();
                    $scope.PCInfo.input.endDate = $scope.PCInfo.input.endDate ? $scope.PCInfo.input.endDate : new Date();
                    // Initialize Price Range Sliders
                    buildRangeSliders($scope.PCInfo.input);

                    // Adding all option for zone
                    $scope.PCInfo.zoneList.push({id:0, code:'All Zone'});

                    $scope.PCInfo.runList[0].effectiveDate = $filter('date')($scope.PCInfo.runList[0].effectiveDate, 'MM/dd/yyyy');

                }, function (error) {
                    Notification.error('Error while getting PC Info');
                })
            }

            getPCInfo();

            var allOption = {
                "id": 0,
                "category": null,
                "categoryStr": null,
                "code": "ALL",
                "description": "ALL"
            }

            var addAllOptionAndMakeDefault = function (array, defaultObj) {
                array.push(allOption);
                $scope[defaultObj] = array[0];
            }

            $scope.departmentList = [];
            $scope.selectedDepartment = {};

            $scope.categoryList = [];
            $scope.selectedCategory = {};

            $scope.subCategoryList = [];
            $scope.selectedSubCategory = {};
            addAllOptionAndMakeDefault($scope.subCategoryList, 'selectedSubCategory');
            $scope.planogramList = [];
            $scope.selectedPlanogram = {};
            addAllOptionAndMakeDefault($scope.planogramList, 'selectedPlanogram');

            var getDepartmentList = function () {
                commonService.getGeneralLookupList(1).then(function (data) {
                    $scope.departmentList = data;
                    $scope.selectedDepartment = data[0];
                    $scope.workFlowSelectedDepartment = data[0];
                    getCategoryListByDepartment(1, $scope.selectedDepartment.id)
                }, function () {
                    Notification.error('Error while getting Department list')
                })
            }

            getDepartmentList();

            $scope.selectDepartment = function (department) {
                $scope.selectedDepartment = department;
                getCategoryListByDepartment(1, department.id);
                getProductRelationship(1, department.id, 0, 0, 0);
                $scope.subCategoryList = [];
                $scope.selectedSubCategory = {};
                addAllOptionAndMakeDefault($scope.subCategoryList, 'selectedSubCategory');
                $scope.planogramList = [];
                $scope.selectedPlanogram = {};
                addAllOptionAndMakeDefault($scope.planogramList, 'selectedPlanogram');
                $scope.showCanvasImage('assets/images/plano-without-price.jpg');
            }

            var getCategoryListByDepartment = function (typeId, categoryId) {
                commonService.getGeneralLookupListByCategory(typeId, categoryId).then(function (data) {
                    $scope.categoryList = data;
                    addAllOptionAndMakeDefault($scope.categoryList, 'selectedCategory');
                    $scope.selectedCategory = allOption;
                }, function () {
                    Notification.error('Error while getting Category list')
                })
            }

            $scope.selectCategory = function (category) {
                $scope.selectedCategory = category;
                if (category.id) {
                    getProductRelationship(2, $scope.selectedDepartment.id, category.id, 0, 0);
                    getSubCategoryListByCategory(2, category.id);

                } else if (category.id == 0) {
                    getProductRelationship(1, $scope.selectedDepartment.id, 0, 0, 0);
                    $scope.subCategoryList = [];
                    $scope.selectedSubCategory = {};
                    addAllOptionAndMakeDefault($scope.subCategoryList, 'selectedSubCategory');
                } else {
                    Notification.error('Invalid Category')
                }

                $scope.planogramList = [];
                $scope.selectedPlanogram = {};
                addAllOptionAndMakeDefault($scope.planogramList, 'selectedPlanogram');

            }

            var getSubCategoryListByCategory = function (typeId, categoryId) {
                commonService.getGeneralLookupListByCategory(typeId, categoryId).then(function (data) {
                    $scope.subCategoryList = data;
                    addAllOptionAndMakeDefault($scope.subCategoryList, 'selectedSubCategory');
                    $scope.selectedSubCategory = allOption;
                }, function () {
                    Notification.error('Error while getting SubCategory list')
                })
            }

            $scope.selectSubCategory = function (subCategory) {
                $scope.selectedSubCategory = subCategory;
                if (!subCategory.id && !$scope.selectedCategory.id) {
                    return false;
                }
                else if (subCategory.id) {
                    getProductRelationship(3, $scope.selectedDepartment.id, $scope.selectedCategory.id, subCategory.id, 0);
                    getPlanogramListBysubCategory(3, subCategory.id);

                } else if (subCategory.id == 0) {
                    getProductRelationship(2, $scope.selectedDepartment.id, $scope.selectedCategory.id, 0, 0);
                    $scope.planogramList = [];
                    $scope.selectedPlanogram = {};
                    addAllOptionAndMakeDefault($scope.planogramList, 'selectedPlanogram');
                } else {
                    Notification.error('Invalid Category')
                }

            }

            var getPlanogramListBysubCategory = function (typeId, categoryId) {
                commonService.getGeneralLookupListByCategory(typeId, categoryId).then(function (data) {
                    $scope.planogramList = data;
                    addAllOptionAndMakeDefault($scope.planogramList, 'selectedPlanogram');
                    $scope.selectedPlanogram = allOption;
                }, function () {
                    Notification.error('Error while getting Planogram list')
                })
            }

            $scope.selectPlanogram = function (planogram) {
                $scope.selectedPlanogram = planogram;
                if (!planogram.id && !$scope.selectedSubCategory.id) {
                    return false;
                }
                else if (planogram.id) {
                    getProductRelationship(4, $scope.selectedDepartment.id, $scope.selectedCategory.id, $scope.selectedSubCategory.id, planogram.id);


                } else if (planogram.id == 0) {
                    getProductRelationship(3,$scope.selectedDepartment.id, $scope.selectedCategory.id, $scope.selectedSubCategory.id, 0);
                } else {
                    Notification.error('Invalid Category')
                }
            }

            var productRelationShip = []

            var getProductRelationship = function (typeId, depId, catId, subCatId, planogramId) {
                commonService.getProductRelationship(typeId,  depId, catId, subCatId, planogramId).then(function (data) {
                    productRelationShip = data;
                    priceList = [];
                    if ($scope.selectedPlanogram.id) {
                        getOptimizedPrice($scope.selectedPlanogram.id);
                    } else {
                        //$scope.showPrice($scope.defaultPriceOption);
                    }
                }, function (err) {
                    Notification.error('Error while getting list')
                })
            }

            $scope.refreshSlider = function () {
                $timeout(function(){
                    $scope.$broadcast('rzSliderForceRender');
                }, 500);
            }

            $scope.date = new Date();
            $scope.endDate = new Date();

            $scope.showMe = true;
            $scope.test = function () {
                $scope.showMe = !$scope.showMe;
            }

            $scope.testControl = true;
            $scope.test2 = function () {
                $scope.testControl = !$scope.testControl;
            }

            $scope.rangeSlider = {
                overallPriceChangeSlider: {},
                overallVolumeChangeSlider: {},
                productPriceChangeSlider: {},
                productVolumeChangeSlider: {}
            }

            var buildRangeSliders = function (data) {
                $scope.refreshSlider();
                $scope.rangeSlider.overallPriceChangeSlider = {
                    minValue: data.overallPriceChangeMin,
                    maxValue: data.overallPriceChangeMax,
                    options: {
                        ceil: 20,
                        floor: -20,
                        translate: function(value, sliderId){
                            return value +' %'
                        },
                        noSwitching: true
                    }
                };

                $scope.rangeSlider.overallVolumeChangeSlider = {
                    minValue: data.overallVolumeChangeMin,
                    maxValue: data.overallVolumeChangeMax,
                    options: {
                        ceil: 20,
                        floor: -20,
                        translate: function(value, sliderId){
                            return value +' %'
                        },
                        noSwitching: true
                    }
                };

                $scope.rangeSlider.productPriceChangeSlider = {
                    minValue: data.productPriceChangeMin,
                    maxValue: data.productPriceChangeMax,
                    options: {
                        ceil: 20,
                        floor: -20,
                        translate: function(value, sliderId){
                            return value +' %'
                        },
                        noSwitching: true
                    }
                };

                $scope.rangeSlider.productVolumeChangeSlider = {
                    minValue: data.productVolumeChangeMin,
                    maxValue: data.productVolumeChangeMax,
                    options: {
                        ceil: 20,
                        floor: -20,
                        translate: function(value, sliderId){
                            return value +' %'
                        },
                        noSwitching: true
                    }
                };

            }

            $scope.goalList = [];
            var getGoalList = function () {
                commonService.getGeneralLookupList(19).then(function (data) {
                    $scope.goalList = data;
                }, function (err) {
                    Notification.error('Error while getting Goals list');
                })
            }
            $scope.boundList = [];
            var getBoundList = function () {
                commonService.getGeneralLookupList(20).then(function (data) {
                    $scope.boundList = data;
                }, function (err) {
                    Notification.error('Error while getting Bounds list');
                })
            }

            getGoalList();
            getBoundList();

            $scope.saveOptimizeResults = function (sku) {
                var dataToPost = $scope.PCInfo.input;

                // Assigning Price change ranges
                dataToPost.overallPriceChangeMax = $scope.rangeSlider.overallPriceChangeSlider.maxValue;
                dataToPost.overallPriceChangeMin = $scope.rangeSlider.overallPriceChangeSlider.minValue;
                dataToPost.overallVolumeChangeMax = $scope.rangeSlider.overallVolumeChangeSlider.maxValue;
                dataToPost.overallVolumeChangeMin = $scope.rangeSlider.overallVolumeChangeSlider.minValue;

                // Assigning Volume change ranges
                dataToPost.productPriceChangeMax = $scope.rangeSlider.productPriceChangeSlider.maxValue;
                dataToPost.productPriceChangeMin = $scope.rangeSlider.productPriceChangeSlider.minValue;
                dataToPost.productVolumeChangeMax = $scope.rangeSlider.productVolumeChangeSlider.maxValue;
                dataToPost.productVolumeChangeMin = $scope.rangeSlider.productVolumeChangeSlider.minValue;

                dataToPost.startDate = dataToPost.startDate ?  new Date(dataToPost.startDate).getTime() : null;
                dataToPost.endDate =  dataToPost.endDate ? new Date(dataToPost.endDate).getTime() : null;

                if (!sku) {
                    _.forEach(productRelationShip, function (value) {
                        dataToPost.items[value.id] = {productRelation: value.id, lock: false};
                    });
                } else {
                    dataToPost.items[sku.id] = {productRelation: sku.id, lock: false};
                }

                dataToPost.planogram = $scope.selectedPlanogram.id;
                dataToPost.optimizeStatus = dataToPost.optimizeStatus && dataToPost.optimizeStatus.length ? parseInt(dataToPost.optimizeStatus.length) : 0;

                console.log(dataToPost);

                PricingConsoleService.savePCInfo(dataToPost).then(function (data) {
                    Notification.success('Optimized Successfully');
                    getPCInfo();
                    getOptimizedResults();
                    getOptimizedPrice($scope.selectedPlanogram.id);
                }, function (err) {
                    Notification.error('Error while saving SC info')
                })
            }

            var runIdColumnDefs = [
                {
                    headerName: "Run ID", field: "runId", width: 130, cellClass: 'text-center',
                    template:'<a href="javascript:void(0)"><span ng-bind="data.runId"></span></a>'
                },
                {
                    headerName: "Status", field: "optimisationStatus", width: 130, cellClass: 'text-center',
                    template: '<span class="{{(data.optimisationStatus == 1) ? \'glyphicon glyphicon-ok\':\'glyphicon glyphicon-remove\'}}"></span></span>'
                },
                {
                    headerName: "Change In Revenue", field: "changeInRevenue", width: 130, cellClass: 'text-center',
                    template: '<span>{{data.changeInRevenueStr}}</span>'
                },
                {
                    headerName: "Change % In Revenue", field: "percentageRevenue", width: 130, cellClass: 'text-center',
                    template: '<span>{{data.percentageRevenue}} %</span>'
                },
                {
                    headerName: "Change In Volume", field: "changeInVolume", width: 130, cellClass: 'text-center',
                    template: '<span>{{data.changeInVolume | currency: "":0 }}</span>'
                },
                {
                    headerName: "Change % In Volume", field: "percentageVolume", width: 130, cellClass: 'text-center',
                    template: '<span>{{data.percentageVolume}} %</span>'
                },
                {
                    headerName: "Change In Profit", field: "changeInProfit", width: 130, cellClass: 'text-center',
                    template: '<span>{{data.changeInProfitStr}}</span>'
                },
                {
                    headerName: "Change % In Profit", field: "percentageProfit", width: 130, cellClass: 'text-center',
                    template: '<span>{{data.percentageProfit}} %</span>'
                }
            ];

            $scope.runIdGridOptions = {
                columnDefs: runIdColumnDefs,
                angularCompileRows: true,
                angularCompileHeaders: true,
                enableColResize: false,
                headerCellRenderer: headerCellRendererFunc,
            };

            var buildOptimizeResultGrid = function (data) {
                $scope.runIdGridOptions.api.setRowData(data);
                gridWidthResize(1000);
            }

            var getOptimizedResults = function () {
                PricingConsoleService.getOptimizedResultData().then(function (data) {
                    // Building Optimization results
                    buildOptimizeResultGrid(data);
                }, function (err) {
                    Notification.error('Error while getting Optimized Results')
                })
            }

            getOptimizedResults();

            var priceList = [];
            $scope.defaultPriceOption = "0";

            var getOptimizedPrice = function (planogramId) {
                PricingConsoleService.getOptimizePriceForPlanogram(planogramId).then(function (data) {
                    $scope.priceData = data;
                    priceList = [];
                    var lengthToBuild = $scope.priceData.length >= priceCoOrdinates.length ? priceCoOrdinates.length : $scope.priceData.length;
                    for (var i = 0; i < lengthToBuild; i++) {
                        var priceObj = {
                            "currentPrice": {
                                "value": data[i].currentPrice,
                                "x": priceCoOrdinates[i].currentPrice.x,
                                "y": priceCoOrdinates[i].currentPrice.y
                            },
                            "optimizePrice": {
                                "value": data[i].optimisedPrice,
                                "x": priceCoOrdinates[i].optimizePrice.x,
                                "y": priceCoOrdinates[i].optimizePrice.y
                            }
                        };
                        priceList.push(priceObj);
                    }
                    $scope.showPrice($scope.defaultPriceOption);
                }, function (err) {
                    Notification.error('Error while getting Price Data')
                })
            }

            $scope.rightBarSlider = {
                value: 0,
                options: {
                    floor: 0,
                    ceil: 0,
                    step: 0,
                    precision: 0,
                    readOnly:true
                }
            };

            $scope.enableSlider = function(){
                $scope.rightBarSlider = {
                    value: 0,
                    options: {
                        floor: -.5,
                        ceil: .5,
                        step: 0.1,
                        precision: 1,
                        translate: function(value, sliderId){
                            return value+' %'
                        }
                    }
                };
            }

            var priceCoOrdinates = [
                {
                    "currentPrice": {"value": 27.5, "x": 55, "y": 102},
                    "optimizePrice": {"value": 35.5, "x": 55, "y": 114}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 150, "y": 102},
                    "optimizePrice": {"value": 35.5, "x": 150, "y": 114}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 235, "y": 102},
                    "optimizePrice": {"value": 35.5, "x": 235, "y": 114}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 315, "y": 102},
                    "optimizePrice": {"value": 35.5, "x": 315, "y": 114}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 411, "y": 102},
                    "optimizePrice": {"value": 35.5, "x": 411, "y": 114}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 503, "y": 102},
                    "optimizePrice": {"value": 35.5, "x": 503, "y": 114}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 583, "y": 102},
                    "optimizePrice": {"value": 35.5, "x": 583, "y": 114}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 671, "y": 102},
                    "optimizePrice": {"value": 35.5, "x": 671, "y": 114}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 751, "y": 102},
                    "optimizePrice": {"value": 35.5, "x": 751, "y": 114}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 825, "y": 102},
                    "optimizePrice": {"value": 35.5, "x": 825, "y": 114}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 935, "y": 102},
                    "optimizePrice": {"value": 35.5, "x": 935, "y": 114}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 1070, "y": 102},
                    "optimizePrice": {"value": 35.5, "x": 1070, "y": 114}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 55, "y": 220},
                    "optimizePrice": {"value": 35.5, "x": 55, "y": 232}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 150, "y": 220},
                    "optimizePrice": {"value": 35.5, "x": 150, "y": 232}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 286, "y": 220},
                    "optimizePrice": {"value": 35.5, "x": 286, "y": 232}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 420, "y": 220},
                    "optimizePrice": {"value": 35.5, "x": 420, "y": 232}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 525, "y": 220},
                    "optimizePrice": {"value": 35.5, "x": 525, "y": 232}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 629, "y": 220},
                    "optimizePrice": {"value": 35.5, "x": 629, "y": 232}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 730, "y": 220},
                    "optimizePrice": {"value": 35.5, "x": 730, "y": 232}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 850, "y": 220},
                    "optimizePrice": {"value": 35.5, "x": 850, "y": 232}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 945, "y": 220},
                    "optimizePrice": {"value": 35.5, "x": 945, "y": 232}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 1029, "y": 220},
                    "optimizePrice": {"value": 35.5, "x": 1029, "y": 232}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 1106, "y": 220},
                    "optimizePrice": {"value": 35.5, "x": 1106, "y": 232}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 55, "y": 339},
                    "optimizePrice": {"value": 35.5, "x": 55, "y": 351}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 150, "y": 339},
                    "optimizePrice": {"value": 35.5, "x": 150, "y": 351}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 286, "y": 339},
                    "optimizePrice": {"value": 35.5, "x": 286, "y": 351}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 420, "y": 339},
                    "optimizePrice": {"value": 35.5, "x": 420, "y": 351}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 525, "y": 339},
                    "optimizePrice": {"value": 35.5, "x": 525, "y": 351}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 629, "y": 339},
                    "optimizePrice": {"value": 35.5, "x": 629, "y": 351}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 730, "y": 339},
                    "optimizePrice": {"value": 35.5, "x": 730, "y": 351}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 850, "y": 339},
                    "optimizePrice": {"value": 35.5, "x": 850, "y": 351}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 945, "y": 339},
                    "optimizePrice": {"value": 35.5, "x": 945, "y": 351}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 1024, "y": 339},
                    "optimizePrice": {"value": 35.5, "x": 1024, "y": 351}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 1099, "y": 339},
                    "optimizePrice": {"value": 35.5, "x": 1099, "y": 351}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 55, "y": 456},
                    "optimizePrice": {"value": 35.5, "x": 55, "y": 468}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 161, "y": 456},
                    "optimizePrice": {"value": 35.5, "x": 161, "y": 468}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 283, "y": 456},
                    "optimizePrice": {"value": 35.5, "x": 283, "y": 468}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 404, "y": 456},
                    "optimizePrice": {"value": 35.5, "x": 404, "y": 468}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 503, "y": 456},
                    "optimizePrice": {"value": 35.5, "x": 503, "y": 468}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 503, "y": 456},
                    "optimizePrice": {"value": 35.5, "x": 503, "y": 468}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 582, "y": 456},
                    "optimizePrice": {"value": 35.5, "x": 582, "y": 468}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 666, "y": 456},
                    "optimizePrice": {"value": 35.5, "x": 666, "y": 468}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 748, "y": 456},
                    "optimizePrice": {"value": 35.5, "x": 748, "y": 468}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 827, "y": 456},
                    "optimizePrice": {"value": 35.5, "x": 827, "y": 468}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 909, "y": 456},
                    "optimizePrice": {"value": 35.5, "x": 909, "y": 468}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 994, "y": 456},
                    "optimizePrice": {"value": 35.5, "x": 994, "y": 468}
                },
                {
                    "currentPrice": {"value": 27.5, "x": 1078, "y": 456},
                    "optimizePrice": {"value": 35.5, "x": 1078, "y": 468}
                },
            ]

            var canvas = document.getElementById("pricingConsoleCanvas");
            var context = canvas.getContext("2d");

            var planogram = new Image();

            planogram.onload = function () {
                $scope.showPrice($scope.defaultPriceOption);
            };

            var hidePricesInImage = function(){
                angular.forEach(priceCoOrdinates, function (item) {
                    var x = item.currentPrice.x - 37;
                    var y = item.currentPrice.y - 11;
                    var width = (item.currentPrice.x - x) + 35;
                    var height = (item.currentPrice.y - y) + 14;

                    context.fillStyle = "#000000";
                    context.fillRect(x, y, width, height);
                })
            }

            var loadCanvasImage = function (showOP, showCP) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(planogram, 0, 0, planogram.naturalWidth, planogram.naturalHeight);
                context.font = "7pt Arial";
                context.textAlign = "center";
                hidePricesInImage();
                angular.forEach(priceList, function (item) {
                    if (showCP && item.currentPrice.value) {
                        context.fillStyle = "#FFFFFF";
                        context.fillText("C.P - $" + item.currentPrice.value, item.currentPrice.x, item.currentPrice.y);
                    }
                    if (showOP && item.optimizePrice.value) {
                        context.fillStyle = "#B9FFFB";
                        context.fillText("O.P - $" + item.optimizePrice.value, item.optimizePrice.x, item.optimizePrice.y);
                    }
                });
            }

            planogram.src = "assets/images/plano-without-price.jpg";

            $scope.showCanvasImage = function (src) {
                planogram.src = src;
                //$scope.showPrice($scope.defaultPriceOption);
            };

            $scope.showPrice = function (priceOption) {
                switch(priceOption){
                    case '0':{
                        loadCanvasImage(true, true);
                        break;
                    }
                    case '1':{
                        loadCanvasImage(false, true);
                        break;
                    }
                    case '2':{
                        loadCanvasImage(true, false);
                        break;
                    }
                }
            }

            $scope.savePCInfo = function () {
                var dataToPost = $scope.PCInfo.input;

                // Assigning Price change ranges
                dataToPost.overallPriceChangeMax = $scope.rangeSlider.overallPriceChangeSlider.maxValue;
                dataToPost.overallPriceChangeMin = $scope.rangeSlider.overallPriceChangeSlider.minValue;
                dataToPost.overallVolumeChangeMax = $scope.rangeSlider.overallVolumeChangeSlider.maxValue;
                dataToPost.overallVolumeChangeMin = $scope.rangeSlider.overallVolumeChangeSlider.minValue;

                // Assigning Volume change ranges
                dataToPost.productPriceChangeMax = $scope.rangeSlider.productPriceChangeSlider.maxValue;
                dataToPost.productPriceChangeMin = $scope.rangeSlider.productPriceChangeSlider.minValue;
                dataToPost.productVolumeChangeMax = $scope.rangeSlider.productVolumeChangeSlider.maxValue;
                dataToPost.productVolumeChangeMin = $scope.rangeSlider.productVolumeChangeSlider.minValue;
                dataToPost.startDate = dataToPost.startDate ?  new Date(dataToPost.startDate).getTime() : null;
                dataToPost.endDate =  dataToPost.endDate ? new Date(dataToPost.endDate).getTime() : null;

                PricingConsoleService.saveCategoryConsInfo(dataToPost).then(function (data) {
                    Notification.success('Saved Successfully')
                }, function (err) {
                    Notification.error('Error while saving PC info')
                })
            }

            $scope.$on('$OnLevelSelect', function($event, args){
                getProductRelationship(4, args.itemSelected['1'], args.itemSelected['2'], args.itemSelected['3'], args.itemSelected['4']);
                $scope.selectedDepartment = {id:args.itemSelected['1'], description: args.itemSelected['1name']};
                $scope.selectedCategory = {id:args.itemSelected['2'], description: args.itemSelected['2name']};
                $scope.selectedSubCategory = {id:args.itemSelected['3'], description: args.itemSelected['3name']};
                $scope.selectedPlanogram = {id:args.itemSelected['4'], description: args.itemSelected['4name']};
            });

            //TODO this is a temporary fix for Request Approval & Test Vs Ctrl, Have to change the component

            $scope.blLogicGrid = {
                open:false
            }

            $scope.showRequestApprovalFunc = function(){
                $scope.showRequestApproval = !$scope.showRequestApproval;
                $scope.blLogicGrid.open = false;
            }

            $scope.showTestVsCtrlFunc = function(){
                $scope.showTestVsCtrl = !$scope.showTestVsCtrl;
                $scope.blLogicGrid.open = false;
            }

            $scope.toggleDumPopup= function(){
                $scope.dumPopup = !$scope.dumPopup;
            }

            $scope.hideBoth = function(){
                $scope.showRequestApproval = false;
                $scope.showTestVsCtrl = false;
            }

            $scope.hideBoth();

            $scope.sendEmail = function(){
                Notification.success('Email sent successfully')
            }
            $scope.exportPlanogram = function(){
                Notification.success('Planogram exported successfully')
            }

        }]);

