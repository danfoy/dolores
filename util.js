module.exports.randomFrom = function (
    list,
    quantity = 1,
    options = {
        subtractive: true,
    }
){
    // Error if input is not compatiable
    if (!Array.isArray(list))
        throw new Error(`${list} is not an array`);

    // Error if in subtractive mode and requested quantity is larger than input
    if (options.subtractive && quantity > list.length)
        throw new Error(`Requested quantity ${quantity} is greater than the ${list.length} available items`);

    // Return a single item in single mode (no array)
    if (quantity === 1) return list[Math.floor(Math.random() * list.length)];

    // Pick random items as if from a hat
    let availableEntries = [...list];
    let selectedEntries = [];
    for (let i = 0; quantity > i; i++) {
        const randomIndex = Math.floor(Math.random() * availableEntries.length);
        selectedEntries.push(availableEntries[randomIndex]);
        if (options.subtractive) availableEntries.splice(randomIndex, 1);
    };
    return selectedEntries;

};
