export function convertWholeDollarsToCents(dollars) {
    return dollars * 100;
}

export function convertCentsToWholeDollars(cents) {
    return cents / 100;
}

export function calculateProductTotals(items) {
    const totalAmount = items
        .map(item => item.amount)
        .reduce((total, currentAmount) => total + currentAmount);

    const totalPrice = items
        .map(item => item.price)
        .reduce((total, currentPrice) => total + currentPrice);

    return {
        amount: totalAmount,
        price: totalPrice
    }
}

export function pluralize(item) {
    return item === 1 ? '' : 's';
}

export function keyInObject(object, key) {
    return object[key] ? true : false
}

// export function keyValueToLowerCase(obj) {
//     if (!obj) {
//         return;
//     }
//     if (typeof obj !== 'Object' && typeof obj !== 'object') {
//         return;
//     }
//     var keys = Object.keys(obj);
//     var result = {};
//     keys.map(function (k, v) {
//         if (typeof k === 'string') {
//             if (typeof obj[k] === 'string') {
//                 result[k.toLowerCase()] = obj[k].toLowerCase();
//             } else {
//                 // if the node is an object, perform the same process over that node
//                 if (typeof obj[k] === 'Object' || typeof obj[k] === 'object') {
//                     result[k.toLowerCase()] = toLowerCase(obj[k]);
//                 } else {
//                     result[k.toLowerCase()] = obj[k];
//                 }
//             }
//         }
//     });
//     return result;
// }