// import { expect } from 'chai';
// import { listActionString } from '../utils/logListAction.js';

// describe('listActionString()', function() {

//     function testItem(arrayOrObj) {
//         const testString = listActionString(
//             arrayOrObj,
//             'ran',
//             'test',
//             'tests'
//         );
//         console.log(testString);
//         expect(testString).to.be.a('string');
//         expect(testString.includes('undefined')).to.be.false;
//     };

//     describe('Array input', function() {

//         it('returns a string when provided a multiple items', function() {
//             testItem(['item1', 'item2']);
//         });

//         it('returns a string when provided a single item', function() {
//             testItem(['singleItem']);
//         });

//         it('returns a string when the array is empty', function() {
//             testItem([]);
//         });
//     });

//     describe('Map input', function() {

//         it('returns a string when provided a multiple items', function() {
//             const testMap = new Map();
//             testMap.set('item1', 'item1Value');
//             testMap.set('item2', 'item2Value');
//             testItem(testMap);
//         });

//         it('returns a string when provided a single item', function() {
//             const testMap = new Map();
//             testMap.set('singleItem', 'singleItemValue');
//             testItem(testMap);
//         });
//     });
// });
