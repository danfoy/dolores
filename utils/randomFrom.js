/**
* Select [quantity] items from [array]. By default returns a string in single
* mode, unless {array: true} is passed in the options object. Doesn't allow
* duplicates unless {subtractive: false} is passed in the options object.
*
* @param {array} source
* @param {number} [quantity=1]
* @param {boolean} [options={subtractive: true, array: false}]
* @returns {string|array}
*/
export default function randomFrom(
  source,
  quantity = 1,
  options = {
    subtractive: true,
    array: false
  }
){
  // Error if input is not compatiable
  if (!Array.isArray(source))
    throw new Error(`${source} is not an array`);

  // Error if in subtractive mode and requested quantity is larger than input
  if (options.subtractive && quantity > source.length)
    throw new Error(`Requested quantity ${quantity} is greater than the ${source.length} available items`);

  // Return a single item in single mode (no array)
  if (quantity === 1 && !options.array)
    return source[Math.floor(Math.random() * source.length)];

  // Clone available entries and setup results pool
  let availableEntries = [...source];
  let selectedEntries = [];

  for (let i = 0; quantity > i; i++) {

    // Get a random entry
    const randomIndex = Math.floor(Math.random() * availableEntries.length);
    const selectedEntry = availableEntries[randomIndex];

    // Add the selection to the results pool
    selectedEntries.push(selectedEntry);

    // Remove selection from the pool of entries in subtractive mode
    if (options.subtractive) availableEntries = availableEntries
      .filter(entry => entry !== selectedEntry);
  };
  return selectedEntries;

};
