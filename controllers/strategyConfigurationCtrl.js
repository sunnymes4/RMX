/**
 * Created by Santhosh on 06-Jan-16.
 */

strategyConfiguration
    .controller('StrategyConfigurationController', ['$scope', '$timeout', 'StrategyConfigService', 'Notification', 'commonService',
        function ($scope, $timeout, StrategyConfigService, Notification, commonService) {
            $scope.hierarchyMenuList = [
                {
                    title: 'Department 1',
                    dropDownList: ['Department 1', 'Department 2']
                },
                {
                    title: 'All Category',
                    dropDownList: ['Category 1', 'Category 2']
                },
                {
                    title: 'All Sub Category',
                    dropDownList: ['Sub Category 1', 'Sub Category 2']
                },
                {
                    title: 'All Planogram',
                    dropDownList: ['Planogram 1', 'Planogram 2']
                }
            ];

            var units = [
                {id: 1, name: 'Percentage', sympol: '%', fieldName: 'percentageValue'},
                {id: 0, name: 'Actual', sympol: 'k', fieldName: 'value'}
            ];

            $scope.preferedUnitId = 0;

            var getUnitById = function (unitId) {
                var findUnit = _.findWhere(units, {id: unitId});
                return findUnit.sympol;
            }

            var getFieldNameById = function (unitId) {
                var findUnit = _.findWhere(units, {id: unitId});
                return findUnit.fieldName;
            }

            var barChartTooltip = function(res, title){
                if (res.data.timeLine) {
                    var mainValue = $scope.preferedUnitId == 1 ? res.data.percentageValue : res.data.value;
                    var compValue = $scope.preferedUnitId == 1 ? res.data.compPercentageValue : res.data.compValue;
                    return "<h3 style='background-color: #E2E2E2'>" + title + "</h3>" +
                        "&nbsp;&nbsp;<span><span class='sc-barchart-tooltip-box' style='background-color: " + res.data.color + "'></span>&nbsp;&nbsp;<span class='sc-barchart-tooltip-text'>" + res.data.timeLine + " " + mainValue + getUnitById($scope.preferedUnitId) + "&nbsp;&nbsp;</span></span><br>"
                }
            }

            $scope.revenueChartOptions = {
                chart: {
                    type: 'discreteBarChart',
                    height: 250,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 55
                    },
                    x: function (d) {
                        return d.timeLine;
                    },
                    y: function (d) {
                        return d[getFieldNameById($scope.preferedUnitId)] + (1e-5);
                    },
                    showValues: true,
                    valueFormat: function (d) {
                        return d3.format(',.0f')(d) + getUnitById($scope.preferedUnitId);
                    },
                    showXAxis: false,
                    duration: 500,

                    xAxis: {
                        axisLabel: '',
                        showMaxMin: false,
                    },
                    yAxis: {
                        axisLabel: '',
                        axisLabelDistance: -10,
                        showMaxMin: false,
                        tickFormat: function (n) {
                            return d3.format(',.1f')(n) + getUnitById($scope.preferedUnitId);
                        }
                    },
                    color: function (d, i) {
                        return d.color;
                    },
                    tooltip: {
                        contentGenerator: function (data) {
                            return barChartTooltip(data, 'Revenue');
                        }
                    }
                }
            };

            $scope.profitChartOptions = {
                chart: {
                    type: 'discreteBarChart',
                    height: 250,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 55
                    },
                    x: function (d) {
                        return d.timeLine;
                    },
                    y: function (d) {
                        return d[getFieldNameById($scope.preferedUnitId)] + (1e-5);
                    },
                    showValues: true,
                    valueFormat: function (d) {
                        return d3.format(',.0f')(d) + getUnitById($scope.preferedUnitId);
                    },
                    showXAxis: false,
                    duration: 500,

                    xAxis: {
                        axisLabel: '',
                        showMaxMin: false,
                    },
                    yAxis: {
                        axisLabel: '',
                        axisLabelDistance: -10,
                        showMaxMin: false,
                        tickFormat: function (n) {
                            return d3.format(',.1f')(n) + getUnitById($scope.preferedUnitId);
                        }
                    },
                    color: function (d, i) {
                        return d.color;
                    },
                    tooltip: {
                        contentGenerator: function (data) {
                            return barChartTooltip(data, 'Profit');
                        }
                    }
                }
            };

            $scope.volumeChartOptions = {
                chart: {
                    type: 'discreteBarChart',
                    height: 250,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 55
                    },
                    x: function (d) {
                        return d.timeLine;
                    },
                    y: function (d) {
                        return d[getFieldNameById($scope.preferedUnitId)] + (1e-5);
                    },
                    showValues: true,
                    valueFormat: function (d) {
                        return d3.format(',.1f')(d) + getUnitById($scope.preferedUnitId);
                    },
                    showXAxis: false,
                    duration: 500,

                    xAxis: {
                        axisLabel: '',
                        showMaxMin: false,
                    },
                    yAxis: {
                        axisLabel: '',
                        axisLabelDistance: -10,
                        showMaxMin: false,
                        tickFormat: function (n) {
                            return d3.format(',.1f')(n) + getUnitById($scope.preferedUnitId);
                        }
                    },
                    color: function (d, i) {
                        return d.color;
                    },
                    tooltip: {
                        contentGenerator: function (data) {
                            return barChartTooltip(data, 'Volume');
                        }
                    }
                }
            };

            $scope.refreshSlider = function () {
                $timeout(function(){
                    $scope.$broadcast('rzSliderForceRender');
                }, 500);
            }

            $scope.activateAttribute = function (relationshipType) {
                $scope.selectedRelationType = relationshipType;
            }

            $scope.activateAttribute('Size Match');

            var configurePriceEndPoints = {
                startPoint: 1,
                endPoint: 99,
                xIncrement: 1,
                yIncrement: 10,
            };

            $scope.priceEnd2DArray = [];

            var buildPriceArrayList = function () {
                for (var i = configurePriceEndPoints.startPoint; i < configurePriceEndPoints.endPoint / configurePriceEndPoints.yIncrement; i++) {
                    var innerArrayToPush = [];
                    for (var j = i * configurePriceEndPoints.yIncrement; j < (i * configurePriceEndPoints.yIncrement) + configurePriceEndPoints.yIncrement; j++) {
                        innerArrayToPush.push(j * configurePriceEndPoints.xIncrement);
                    }
                    $scope.priceEnd2DArray.push(innerArrayToPush);
                }
            }

            buildPriceArrayList();

            $scope.activatedCells = [];

            // Toggling the clicked cell
            $scope.activateCell = function (cellValue, callBack) {
                if (callBack) {
                    removeCellStyle(cellValue)
                } else {
                    $scope.activatedCells.push(cellValue);
                }
            }

            // Removing the style to passed cell value
            var removeCellStyle = function (cellVal) {
                var findIndex = $scope.activatedCells.indexOf(cellVal);
                if (findIndex >= 0) {
                    $scope.activatedCells.splice(findIndex, 1);
                }
            }

            // Select the entire column
            $scope.selectColumn = function (modelValue, row) {
                for (var i = row; i <= configurePriceEndPoints.endPoint;) {
                    modelValue ? $scope.activatedCells.push(i) : removeCellStyle(i)
                    i += configurePriceEndPoints.yIncrement;
                }
            }

            // Select the row
            $scope.selectRow = function (modelValue, column) {
                angular.forEach(column, function (cellVal) {
                    modelValue ? $scope.activatedCells.push(cellVal) : removeCellStyle(cellVal);
                })
            }

            $scope.showSideBar = false;
            $scope.classForMainContent = 'col-lg-12';
            $scope.hierarchy = 'navbar hierarchy-menu';

            $scope.toggleSideBar = function () {
                if (!$scope.showSideBar) {
                    $scope.classForMainContent = 'col-lg-8 col-md-8 col-sm-12';
                    $scope.hierarchy = 'navbar hierarchy-menu hierarchy-menu-right';
                    $timeout(function () {
                        $scope.showSideBar = !$scope.showSideBar;
                        $scope.SCInfo && $scope.SCInfo.scchart ? buildBarChart($scope.SCInfo.scchart) : false;
                        $scope.SCInfo && $scope.SCInfo.scMatrixChart ? buildRoleClassificationChart($scope.SCInfo.scMatrixChart) : false;
                        $scope.refreshSlider();
                    }, 1000);
                } else if ($scope.showSideBar) {
                    $scope.showSideBar = !$scope.showSideBar;
                    $scope.classForMainContent = 'col-lg-12';
                    $timeout(function () {
                        $scope.refreshSlider();
                        $scope.hierarchy = 'navbar hierarchy-menu';
                        $scope.SCInfo && $scope.SCInfo.scchart ? buildBarChart($scope.SCInfo.scchart) : false;
                        $scope.SCInfo && $scope.SCInfo.scMatrixChart ? buildRoleClassificationChart($scope.SCInfo.scMatrixChart) : false;
                    }, 1000)
                }
            }

            var getSCInfo = function () {
                StrategyConfigService.getSCInfo().then(function (data) {
                    $scope.SCInfo = data;

                    // Build bar chart
                    buildBarChart($scope.SCInfo.scchart);

                    // Build bar chart
                    buildRoleClassificationChart($scope.SCInfo.scMatrixChart);

                    // Build Range Sliders
                    buildRangeSliders($scope.SCInfo.input);

                    $scope.goalsList = $scope.SCInfo.goalsList;
                    $scope.boundList = $scope.SCInfo.boundList;
                }, function (err) {
                    Notification.error('Error while getting SC info');
                })
            }

            getSCInfo();

            $scope.SCBarChartData = {
                revenues: [{
                    key: "Revenue data",
                    values: []
                }],
                profits: [{
                    key: "Profit data",
                    values: []
                }],
                volumes: [{
                    key: "Volume data",
                    values: []
                }]
            };

            var wrapBarChartValues = function(data, yearValues, monthValues, weekValues, field, key, options){
                var yearObj = _.findWhere(data.revenues, {timeLine: yearValues[0]});
                var currentYear = _.findWhere(data.revenues, {timeLine: yearValues[1]});
                yearObj.compLine = currentYear.timeLine;
                yearObj.compValue = currentYear.value;
                yearObj.compPercentageValue= currentYear.percentageValue;

                var currentYearObj = currentYear;

                var monthObj =  _.findWhere(data.revenues, {timeLine: monthValues[0]});
                var currentMonth =  _.findWhere(data.revenues, {timeLine: monthValues[1]});
                monthObj.compLine =  currentMonth.timeLine;
                monthObj.compValue =  currentMonth.value;
                monthObj.compPercentageValue =  currentMonth.percentageValue;

                var currentMonthObj = currentMonth;

                var weekObj =  _.findWhere(data.revenues, {timeLine: weekValues[0]});
                var currentWeek =  _.findWhere(data.revenues, {timeLine: weekValues[1]});
                weekObj.compLine =  currentWeek.timeLine;
                weekObj.compValue =  currentWeek.value;
                weekObj.compPercentageValue =  currentWeek.percentageValue;

                var currentWeekObj = currentWeek;


                $scope.SCBarChartData[field] = [{key: key, values: [yearObj, currentYearObj, monthObj, currentMonthObj, weekObj, currentWeekObj]}];
                calculateBarChartTickValues($scope.SCBarChartData[field], options);

            }


            var buildBarChart = function (data) {
                wrapBarChartValues(data, ['Last Year', 'Current Year'], ['Last Month', 'Same Month From Last Year'], ['Last Week', 'Current Week'], 'revenues', 'Revenue Data', 'revenueChartOptions');
                wrapBarChartValues(data, ['Last Year', 'Current Year'], ['Last Month', 'Same Month From Last Year'], ['Last Week', 'Current Week'], 'profits', 'Profit Data', 'profitChartOptions');
                wrapBarChartValues(data, ['Last Year', 'Current Year'], ['Last Month', 'Same Month From Last Year'], ['Last Week', 'Current Week'], 'volumes', 'Volume Data', 'volumeChartOptions');
            };

            var maximumTickValue = 0;
            var numberOfPoints = 0;
            var calculateBarChartTickValues = function (data, options) {
                maximumTickValue = 0;
                var valueSource = $scope.preferedUnitId == 1 ? 'percentageValue' : 'value';
                _.forEach(data, function (obj) {
                    _.forEach(obj.values, function (val) {
                        if (val[valueSource] > maximumTickValue)
                            maximumTickValue = val[valueSource];
                    })
                });
                numberOfPoints = 4;
                $scope[options].chart.yAxis.tickValues = [0];
                var pointValue = maximumTickValue / numberOfPoints;
                for (var i = 1; i <= numberOfPoints; i++) {
                    $scope[options].chart.yAxis.tickValues.push(Math.floor(i * pointValue));
                }
                console.log(options, $scope[options].chart.yAxis.tickValues);
            }

            var calculateScatterChartTickValues = function (data, coOrdinate) {
                var minXTickValue = 0;
                _.forEach(data, function (obj) {
                    _.forEach(obj.values, function (val) {
                        if (coOrdinate == 'x') {
                            if (val[coOrdinate] < minXTickValue) {
                                minXTickValue = val[coOrdinate];
                            }
                        } else {
                            if (val[coOrdinate] > minXTickValue) {
                                minXTickValue = val[coOrdinate];
                            }
                        }
                    })
                });
                numberOfPoints = coOrdinate == 'x' ? 10 : 2;
                $scope.scatterChartoptions.chart[coOrdinate + 'Axis'].tickValues = [0];
                var pointValue = minXTickValue / numberOfPoints;
                for (var i = 1; i <= numberOfPoints; i++) {
                    $scope.scatterChartoptions.chart[coOrdinate + 'Axis'].tickValues.indexOf(Math.floor(i * pointValue)) >= 0 ? false : $scope.scatterChartoptions.chart[coOrdinate + 'Axis'].tickValues.push(Math.floor(i * pointValue));
                }
                console.log($scope.scatterChartoptions.chart[coOrdinate + 'Axis'].tickValues);
            }

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

            var currentActiveCategory = {};

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
                    currentActiveCategory = {typeId: 1, lookUpId: data[0].id};
                    getCategoryListByDepartment(1, $scope.selectedDepartment.id);

                    // Build Scatter Chart
                    getRoleClassificationData(1, $scope.selectedDepartment.id, 0, 0, 0);
                }, function () {
                    Notification.error('Error while getting Department list')
                })
            }

            getDepartmentList();

            $scope.selectDepartment = function (department) {
                currentActiveCategory = {typeId: 1, lookUpId: department.id};
                $scope.selectedDepartment = department;
                getCategoryListByDepartment(1, department.id);
                //getProductRelationship(1, department.id);
                getSCInfoByCategory(currentActiveCategory.typeId, department.id, $scope.preferedUnitId);
                $scope.subCategoryList = [];
                $scope.selectedSubCategory = {};
                addAllOptionAndMakeDefault($scope.subCategoryList, 'selectedSubCategory');
                $scope.planogramList = [];
                $scope.selectedPlanogram = {};
                addAllOptionAndMakeDefault($scope.planogramList, 'selectedPlanogram');

                // Build Scatter Chart
                getRoleClassificationData(currentActiveCategory.typeId, department.id, 0, 0, 0);
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
                currentActiveCategory = {typeId: 2, lookUpId: category.id};
                $scope.selectedCategory = category;
                if (category.id) {
                    //getProductRelationship(2, category.id);
                    getSCInfoByCategory(currentActiveCategory.typeId, category.id, $scope.preferedUnitId);
                    getSubCategoryListByCategory(2, category.id);
                    // Build Scatter Chart
                    getRoleClassificationData(currentActiveCategory.typeId, $scope.selectedDepartment.id,  category.id, 0, 0);

                } else if (category.id == 0) {
                    //getProductRelationship(1, $scope.selectedDepartment.id);
                    currentActiveCategory = {typeId: 1, lookUpId: $scope.selectedDepartment.id};
                    getSCInfoByCategory(currentActiveCategory.typeId, $scope.selectedDepartment.id, $scope.preferedUnitId);
                    // Build Scatter Chart
                    getRoleClassificationData(currentActiveCategory.typeId, $scope.selectedDepartment.id, 0, 0, 0);
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
                currentActiveCategory = {typeId: 3, lookUpId: subCategory.id};
                $scope.selectedSubCategory = subCategory;
                if (!subCategory.id && !$scope.selectedCategory.id) {
                    return false;
                }
                else if (subCategory.id) {
                    //getProductRelationship(3, subCategory.id);
                    getSCInfoByCategory(currentActiveCategory.typeId, subCategory.id, $scope.preferedUnitId);
                    getPlanogramListBysubCategory(3, subCategory.id);

                    // Build Scatter Chart
                    getRoleClassificationData(currentActiveCategory.typeId, $scope.selectedDepartment.id, $scope.selectedCategory.id, subCategory.id, 0);

                } else if (subCategory.id == 0) {
                    //getProductRelationship(2, $scope.selectedCategory.id);
                    currentActiveCategory = {typeId: 2, lookUpId: $scope.selectedCategory.id};
                    getSCInfoByCategory(currentActiveCategory.typeId, $scope.selectedCategory.id, $scope.preferedUnitId);

                    // Build Scatter Chart
                    getRoleClassificationData(currentActiveCategory.typeId, $scope.selectedDepartment.id, $scope.selectedCategory.id, 0, 0);
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
                currentActiveCategory = {typeId: 6, lookUpId: planogram.id};
                $scope.selectedPlanogram = planogram;
                if (!planogram.id && !$scope.selectedSubCategory.id) {
                    return false;
                }
                else if (planogram.id) {
                    //getProductRelationship(6, planogram.id);
                    getSCInfoByCategory(currentActiveCategory.typeId, planogram.id, $scope.preferedUnitId);

                    // Build Scatter Chart
                    getRoleClassificationData(currentActiveCategory.typeId, $scope.selectedDepartment.id, $scope.selectedCategory.id, $scope.selectedSubCategory.id, planogram.id);

                } else if (planogram.id == 0) {
                    currentActiveCategory = {typeId: 3, lookUpId: $scope.selectedSubCategory.id};
                    //getProductRelationship(3, $scope.selectedSubCategory.id);
                    getSCInfoByCategory(currentActiveCategory.typeId, $scope.selectedSubCategory.id, $scope.preferedUnitId);
                    // Build Scatter Chart
                    getRoleClassificationData(currentActiveCategory.typeId, $scope.selectedDepartment.id, $scope.selectedCategory.id,  $scope.selectedSubCategory.id, 0);
                } else {
                    Notification.error('Invalid Category')
                }
            }

            $scope.changeUnit = function (unitId) {
                $scope.preferedUnitId = unitId;
                getSCInfoByCategory(currentActiveCategory.typeId, currentActiveCategory.lookUpId, unitId);
            }

            var getSCInfoByCategory = function (typeId, lookUpId, unitId) {
                StrategyConfigService.changeBarChartValueType(typeId, lookUpId, unitId).then(function (data) {
                    buildBarChart(data);
                }, function (err) {
                    Notification.error('Error while getting bar chart values')
                })
            }

            $scope.rangeSlider = {
                overallPriceChangeSlider: {},
                overallVolumeChangeSlider: {},
                productPriceChangeSlider: {},
                productVolumeChangeSlider: {}
            }

            var buildRangeSliders;
            buildRangeSliders = function (data) {
                $scope.rangeSlider.overallPriceChangeSlider = {
                    minValue: data.overallPriceChangeMin,
                    maxValue: data.overallPriceChangeMax,
                    options: {
                        ceil: 20,
                        floor: -20,
                        translate: function (value, sliderId) {
                            return value + ' %'
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
                        translate: function (value, sliderId) {
                            return value + ' %'
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
                        translate: function (value, sliderId) {
                            return value + ' %'
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
                        translate: function (value, sliderId) {
                            return value + ' %'
                        },
                        noSwitching: true
                    }
                };
            };

            $scope.relatioshipReviewSizeSlider = [
                {
                minValue: 20,
                maxValue: 80,
                options: {
                    floor: 0,
                    ceil: 100,
                    vertical: true,
                    translate: function (value, sliderId) {
                        var suffix = undefined;
                        if (value == $scope.relatioshipReviewSizeSlider[0].options.floor || value == $scope.relatioshipReviewSizeSlider[0].options.ceil) {
                            suffix = '%'
                        } else if (value > $scope.relatioshipReviewSizeSlider[0].minValue) {
                            suffix = 'M'
                        } else {
                            suffix = 'S';
                        }
                        return value + ' ' + suffix
                    },
                    noSwitching: true
                }
            },
                {
                    minValue: 20,
                    maxValue: 80,
                    options: {
                        floor: 0,
                        ceil: 100,
                        vertical: true,
                        translate: function (value, sliderId) {
                            var suffix = undefined;
                            if (value == $scope.relatioshipReviewSizeSlider[1].options.floor || value == $scope.relatioshipReviewSizeSlider[1].options.ceil) {
                                suffix = '%'
                            } else if (value > $scope.relatioshipReviewSizeSlider[1].minValue) {
                                suffix = 'M'
                            } else {
                                suffix = 'S';
                            }
                            return value + ' ' + suffix
                        },
                        noSwitching: true
                    }
                },
                {
                    minValue: 20,
                    maxValue: 80,
                    options: {
                        floor: 0,
                        ceil: 100,
                        vertical: true,
                        translate: function (value, sliderId) {
                            var suffix = undefined;
                            if (value == $scope.relatioshipReviewSizeSlider[2].options.floor || value == $scope.relatioshipReviewSizeSlider[2].options.ceil) {
                                suffix = '%'
                            } else if (value > $scope.relatioshipReviewSizeSlider[2].minValue) {
                                suffix = 'M'
                            } else {
                                suffix = 'S';
                            }
                            return value + ' ' + suffix
                        },
                        noSwitching: true
                    }
                },
                {
                    minValue: 20,
                    maxValue: 80,
                    options: {
                        floor: 0,
                        ceil: 100,
                        vertical: true,
                        translate: function (value, sliderId) {
                            var suffix = undefined;
                            if (value == $scope.relatioshipReviewSizeSlider[3].options.floor || value == $scope.relatioshipReviewSizeSlider[3].options.ceil) {
                                suffix = '%'
                            } else if (value > $scope.relatioshipReviewSizeSlider[3].minValue) {
                                suffix = 'M'
                            } else {
                                suffix = 'S';
                            }
                            return value + ' ' + suffix
                        },
                        noSwitching: true
                    }
                }
            ]

            $scope.relatioshipReviewBrandSlider = [
                {
                minValue: 20,
                maxValue: 80,
                options: {
                    floor: 0,
                    ceil: 100,
                    vertical: true,
                    translate: function (value, sliderId) {
                        var suffix = undefined;
                        if (value == $scope.relatioshipReviewBrandSlider[0].options.floor || value == $scope.relatioshipReviewBrandSlider[0].options.ceil) {
                            suffix = '%'
                        } else if (value > $scope.relatioshipReviewBrandSlider[0].minValue) {
                            suffix = 'N'
                        } else {
                            suffix = 'P';
                        }
                        return value + ' ' + suffix
                    },
                    noSwitching: true
                }
            },
                {
                    minValue: 20,
                    maxValue: 80,
                    options: {
                        floor: 0,
                        ceil: 100,
                        vertical: true,
                        translate: function (value, sliderId) {
                            var suffix = undefined;
                            if (value == $scope.relatioshipReviewBrandSlider[1].options.floor || value == $scope.relatioshipReviewBrandSlider[1].options.ceil) {
                                suffix = '%'
                            } else if (value > $scope.relatioshipReviewBrandSlider[1].minValue) {
                                suffix = 'N'
                            } else {
                                suffix = 'P';
                            }
                            return value + ' ' + suffix
                        },
                        noSwitching: true
                    }
                },
                {
                    minValue: 20,
                    maxValue: 80,
                    options: {
                        floor: 0,
                        ceil: 100,
                        vertical: true,
                        translate: function (value, sliderId) {
                            var suffix = undefined;
                            if (value == $scope.relatioshipReviewBrandSlider[2].options.floor || value == $scope.relatioshipReviewBrandSlider[2].options.ceil) {
                                suffix = '%'
                            } else if (value > $scope.relatioshipReviewBrandSlider[2].minValue) {
                                suffix = 'N'
                            } else {
                                suffix = 'P';
                            }
                            return value + ' ' + suffix
                        },
                        noSwitching: true
                    }
                },
                {
                    minValue: 20,
                    maxValue: 80,
                    options: {
                        floor: 0,
                        ceil: 100,
                        vertical: true,
                        translate: function (value, sliderId) {
                            var suffix = undefined;
                            if (value == $scope.relatioshipReviewBrandSlider[3].options.floor || value == $scope.relatioshipReviewBrandSlider[3].options.ceil) {
                                suffix = '%'
                            } else if (value > $scope.relatioshipReviewBrandSlider[3].minValue) {
                                suffix = 'N'
                            } else {
                                suffix = 'P';
                            }
                            return value + ' ' + suffix
                        },
                        noSwitching: true
                    }
                }
            ];

            $scope.relatioshipReviewLineSlider = [
                {
                minValue:25,
                options: {
                    floor: 0,
                    ceil: 100,
                    vertical: true,
                    translate: function (value, sliderId) {
                        return value + ' %'
                    }
                }
            },
                {
                    minValue:25,
                    options: {
                        floor: 0,
                        ceil: 100,
                        vertical: true,
                        translate: function (value, sliderId) {
                            return value + ' %'
                        }
                    }
                },
                {
                    minValue:25,
                    options: {
                        floor: 0,
                        ceil: 100,
                        vertical: true,
                        translate: function (value, sliderId) {
                            return value + ' %'
                        }
                    }
                },
                {
                    minValue:25,
                    options: {
                        floor: 0,
                        ceil: 100,
                        vertical: true,
                        translate: function (value, sliderId) {
                            return value + ' %'
                        }
                    }
                }
            ]

            $scope.relatioshipReviewFeatureSlider = [
                {
                minValue: 20,
                maxValue: 80,
                options: {
                    floor: 0,
                    ceil: 100,
                    vertical: true,
                    translate: function (value, sliderId) {
                        var suffix = undefined;
                        if (value == $scope.relatioshipReviewFeatureSlider[0].options.floor || value == $scope.relatioshipReviewFeatureSlider[0].options.ceil) {
                            suffix = '%'
                        } else if (value > $scope.relatioshipReviewFeatureSlider[0].minValue) {
                            suffix = 'B'
                        } else {
                            suffix = 'G';
                        }
                        return value + ' ' + suffix
                    },
                    noSwitching: true
                }
            },
                {
                    minValue: 20,
                    maxValue: 80,
                    options: {
                        floor: 0,
                        ceil: 100,
                        vertical: true,
                        translate: function (value, sliderId) {
                            var suffix = undefined;
                            if (value == $scope.relatioshipReviewFeatureSlider[1].options.floor || value == $scope.relatioshipReviewFeatureSlider[1].options.ceil) {
                                suffix = '%'
                            } else if (value > $scope.relatioshipReviewFeatureSlider[1].minValue) {
                                suffix = 'B'
                            } else {
                                suffix = 'G';
                            }
                            return value + ' ' + suffix
                        },
                        noSwitching: true
                    }
                },
                {
                    minValue: 20,
                    maxValue: 80,
                    options: {
                        floor: 0,
                        ceil: 100,
                        vertical: true,
                        translate: function (value, sliderId) {
                            var suffix = undefined;
                            if (value == $scope.relatioshipReviewFeatureSlider[2].options.floor || value == $scope.relatioshipReviewFeatureSlider[2].options.ceil) {
                                suffix = '%'
                            } else if (value > $scope.relatioshipReviewFeatureSlider[2].minValue) {
                                suffix = 'B'
                            } else {
                                suffix = 'G';
                            }
                            return value + ' ' + suffix
                        },
                        noSwitching: true
                    }
                },
                {
                    minValue: 20,
                    maxValue: 80,
                    options: {
                        floor: 0,
                        ceil: 100,
                        vertical: true,
                        translate: function (value, sliderId) {
                            var suffix = undefined;
                            if (value == $scope.relatioshipReviewFeatureSlider[3].options.floor || value == $scope.relatioshipReviewFeatureSlider[3].options.ceil) {
                                suffix = '%'
                            } else if (value > $scope.relatioshipReviewFeatureSlider[3].minValue) {
                                suffix = 'B'
                            } else {
                                suffix = 'G';
                            }
                            return value + ' ' + suffix
                        },
                        noSwitching: true
                    }
                }
            ]

            $scope.saveSCInfo = function () {
                var dataToPost = $scope.SCInfo.input;

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
                dataToPost.startDate = null;
                dataToPost.endDate = null;

                StrategyConfigService.saveSCInfo(dataToPost).then(function (data) {
                    Notification.success('Saved Successfully')
                }, function (err) {
                    Notification.error('Error while saving SC info')
                })
            }

            $scope.scatterChartoptions = {
                chart: {
                    type: 'scatterChart',
                    height: 300,
                    //color: d3.scale.category10().range(),
                    color: function (d) {
                        return commonService.getRandomColor();
                    },
                    scatter: {
                        onlyCircles: true,
                    },
                    showXAxis: true,
                    showYAxis: true,
                    showLegend: false,
                    duration: 350,
                    //padData: true,
                    xAxis: {
                        axisLabel: 'Elaticity',
                        tickFormat: function (d) {
                            return d3.format('.00f')(d);
                        },
                        showMaxMin: false,
                        //tickPadding: 25,
                        axisLabelDistance: 11,
                        tickValues: []
                    },
                    yAxis: {
                        axisLabel: 'Volume',
                        tickFormat: function (d) {
                            return d;
                        },
                        axisLabelDistance: -5,
                        showMaxMin: false,
                        tickValues: []
                    },
                    tooltip: {
                        contentGenerator: function (data) {
                            if (data.point.productCode) {
                                return "<h4 class=\"text-center\" style='background-color: #E2E2E2;'><span style=\"width:10px;height:10px; vertical-align: middle border: 1px solid black; border-radius: 2px; background-color:" + data.point.color + ";\"></span>&nbsp;&nbsp;" + data.point.productCode + "</h4>" +
                                    "&nbsp;&nbsp;&nbsp;&nbsp;<label style='width:130px; text-overflow:ellipsis;  white-space: nowrap;  overflow: hidden;'>" + data.point.productDesc + "</label><br>" +
                                    "&nbsp;&nbsp;<span>&nbsp;&nbsp;<span style=\"font-size:12px; font-family: Verdana\">" + " " + " Elasticity: &nbsp;" + "</span>" + data.point.x + "&nbsp;&nbsp;</span><br>" +
                                    "&nbsp;&nbsp;<span>&nbsp;&nbsp;<span style=\"font-size:12px; font-family: Verdana\">" + " " + " Volume: &nbsp;" + "</span>" + data.point.y + "&nbsp;&nbsp;</span><br>" +
                                    "&nbsp;&nbsp;<span>&nbsp;&nbsp;<span style=\"font-size:12px; font-family: Verdana\">" + " " + " Size: &nbsp;" + "</span>" + data.point.size + "&nbsp;&nbsp;</span><br>";
                            }
                            return '<span>&nbsp;&nbsp;0.0 Elasticity&nbsp;&nbsp;</span>';
                        }
                    }
                }
            };

            var getRoleClassificationData = function (typeId, depId, catId, subCatId, planogramId) {
                StrategyConfigService.getRoleClassificationData(typeId, depId, catId, subCatId, planogramId).then(function (data) {
                    buildRoleClassificationChart(data);
                }, function (err) {
                    Notification.error('Error while getting Role Classification')
                })
            }

            var scatterCornerPoint = {
                "x": 0,
                "y": 0,
                "size": 0
            };


            var buildRoleClassificationChart = function (data) {
                $scope.roleClassificationData = [];

                angular.forEach(data, function (n) {
                    var objToBuild = {};
                    objToBuild.key = n.productCode;
                    objToBuild.values = [scatterCornerPoint];
                    objToBuild.values.push({
                        x: n.elasticity,
                        y: n.volume,
                        size: n.revenue,
                        productCode: n.productCode,
                        productDesc: n.productDesc,
                        color: commonService.getRandomColor()
                    });
                    $scope.roleClassificationData.push(objToBuild);
                });
                console.log($scope.roleClassificationData);
                calculateScatterChartTickValues($scope.roleClassificationData, 'x');
                calculateScatterChartTickValues($scope.roleClassificationData, 'y');
            }

            $scope.roleClassificationData = [];

            $scope.sendEmail = function(){
                Notification.success('Email sent successfully')
            }

            $scope.$on('$OnLevelSelect', function ($event, args) {
                $scope.selectedDepartment = {id: args.itemSelected['1'], description: args.itemSelected['1name']};
                $scope.selectedCategory = {id: args.itemSelected['2'], description: args.itemSelected['2name']};
                $scope.selectedSubCategory = {id: args.itemSelected['3'], description: args.itemSelected['3name']};
                $scope.selectedPlanogram = {id: args.itemSelected['4'], description: args.itemSelected['4name']};

                //getProductRelationship(6, planogram.id);
                getSCInfoByCategory(6, args.itemSelected['4'], $scope.preferedUnitId);

                // Build Scatter Chart
                getRoleClassificationData(6, $scope.selectedDepartment.id, $scope.selectedCategory.id, $scope.selectedSubCategory.id, args.itemSelected['4']);
            });

        }]);
