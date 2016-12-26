"use strict";
/**
 * Created by eilamc on 12/19/2016.
 */
var _ = require("lodash");
var AppState_1 = require("./AppState");
exports.imageActionTypes = {
    LOAD_IMAGES: "LOAD_IMAGES",
};
exports.initialState = {
    data: null,
};
exports.actions = {
    loadImages: function (images) {
        return {
            type: exports.imageActionTypes.LOAD_IMAGES,
            images: images,
        };
    },
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (action.type == exports.imageActionTypes.LOAD_IMAGES) {
        return Object.assign({}, state, { data: action.images });
    }
    return state;
}
exports.reducer = reducer;
function loadImageData(state, action) {
    if (action.error) {
        return Object.assign({}, state, {
            isLoading: false,
            errorMessage: action.payload.message
        });
    }
    var dataSet = _.fromPairs(action.payload.map(function (img) { return [img.id, img]; }));
    return Object.assign({}, state, {
        isLoading: false,
        dataSet: dataSet,
        displayedItems: getDisplayedItems({
            dataSet: dataSet,
            sortBy: state.sortBy,
            isAscending: state.isAscending
        })
    });
}
function sortImageData(state, action) {
    return Object.assign({}, state, {
        sortBy: action.payload.sortBy,
        isAscending: action.payload.isAscending,
        displayedItems: getDisplayedItems({
            dataSet: state.dataSet,
            sortBy: action.payload.sortBy,
            isAscending: action.payload.isAscending
        })
    });
}
function getDisplayedItems(options) {
    var sortOperator;
    switch (options.sortBy) {
        case AppState_1.ImageSortBy.path:
            sortOperator = function (v) { return v.path; };
            break;
        default:
            sortOperator = function (v) { return v.path.toLocaleLowerCase(); };
            break;
    }
    return _(_.values(options.dataSet))
        .orderBy([sortOperator], [options.isAscending ? 'asc' : 'desc'])
        .map(function (img) { return img.id; })
        .value();
}
//# sourceMappingURL=images.js.map