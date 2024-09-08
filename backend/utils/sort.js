/**
 * Sorts an array of objects based on the specified key using the Quick Sort algorithm.
 *
 * @param {Array} arr - The array of objects to be sorted.
 * @param {string} key - The key in the objects by which the array should be sorted.
 * @returns {Array} - The sorted array of objects.
 */
function quickSort(arr, key) {
    // Check if the input is a valid array
    if (!Array.isArray(arr) || arr.length === 0) {
        return []; // Return an empty array if input is invalid
    }

    // Base case: if the array has 1 or fewer elements, it's already sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Select the last element as the pivot
    let pivot = arr[arr.length - 1];
    
    // Arrays to hold elements less than and greater than the pivot
    let left = [];
    let right = [];

    // Loop through the array, comparing each element with the pivot
    for (let i = 0; i < arr.length - 1; i++) {
        // If the current element's value at the key is less than the pivot's, push it to left
        if (arr[i][key] < pivot[key]) {
            left.push(arr[i]);
        } else {
            // Otherwise, push it to right
            right.push(arr[i]);
        }
    }

    // Recursively sort left and right sub-arrays, and concatenate them with the pivot
    return [...quickSort(left, key), pivot, ...quickSort(right, key)];
}

module.exports = quickSort;

