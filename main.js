
//my code
// myCanvas.width=400;
// myCanvas.height=300;
// const margin=30
// const n=20;
// const array=[];
// for(let i=0;i<n;i++)
// {
//     array[i]=Math.random();
// } 
// const cols=[];
// const spacing =(myCanvas.width-margin*2)/n;
// const ctx =myCanvas.getContext("2d");
// const maxcolumnheight=200;
// for(let i=0;i<array.length;i++)
// {
//     const x=i*spacing+spacing/2+margin;
//     const y=myCanvas.height-margin-i*3;
//     const width=spacing-4;
//     const height=maxcolumnheight*array[i];
//     cols[i]=new Column(x,y,width,height);
    

// }
// let moves=bubblesort(array);
// animate();
// function bubblesort(array)
// {
//     const moves=[];
//     do{
//         var swapped =false;
//         for(let i=1;i<array.length;i++)
//         {
//             if(array[i-1]>array[i])
//             {
//                 swapped=true;
//                 [array[i-1],array[i]]=[array[i],array[i-1]];
//                 moves.push(
//                     {indices:[i-1,i],swap:true}
//                 );
//             }
//             else{
//                 moves.push(
//                     {indices:[i-1,i],swap:false}
//                 );
//             }
//         }
//     }while(swapped);
//     return moves;
// }
// function animate()
// {
//     ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
//     let changed=false;
//     for(let i=0;i<cols.length;i++)
//     {
//         changed=cols[i].draw(ctx)||changed;
//     }
//     if(!changed &&moves.length>0)
//     {
//         const move=moves.shift();
//         const [i,j]=move.indices;
//         if(move.swap)
//         {
//             cols[i].moveTo(cols[j]);
//             cols[j].moveTo(cols[i],-1);
//             [cols[i],cols[j]]=[cols[j],cols[i]];

//         }
//         else {
//             //to-do
//         }
//     }


//     requestAnimationFrame(animate);

// }

//************************************************************************************** */

//chat gbt
const myCanvas = document.getElementById("myCanvas"); // Canvas element
const startButton = document.getElementById("startButton"); // Start button element
const resetButton = document.getElementById("resetButton"); // Reset button element
const sortTypeSelect = document.getElementById("sortTypeSelect"); // Sort type select element
const ctx = myCanvas.getContext("2d"); // 2D drawing context

// Set up initial variables and arrays
const margin = 30; // Margin for the canvas
const n = 20; // Number of elements in the array
const array = []; // Array to store the random values
let cols = []; // Array to store the column objects
let moves = []; // Array to store the sorting moves
let sorting = false; // Flag to track if sorting is in progress

// Set canvas dimensions
myCanvas.width = 400; // Canvas width
myCanvas.height = 300; // Canvas height

// Generate random array
for (let i = 0; i < n; i++) {
  array[i] = Math.random(); // Generate a random value between 0 and 1 and store it in the array
}
console.log(array); // Log the generated array

// Calculate column properties
const spacing = (myCanvas.width - margin * 2) / n; // Calculate the spacing between columns
const maxColumnHeight = 150; // Maximum height of the columns

// Create column objects
for (let i = 0; i < array.length; i++) {
  const x = i * spacing + spacing / 2 + margin; // Calculate the x-coordinate of the column
  const y = myCanvas.height - margin - i * 3; // Calculate the y-coordinate of the column
  const width = spacing - 4; // Calculate the width of the column
  const height = maxColumnHeight * array[i]; // Calculate the height of the column based on the array value
  cols[i] = new Column(x, y, width, height); // Create a new column object and store it in the cols array
}

// Event listeners
startButton.addEventListener("click", startSorting); // Add click event listener to the start button
sortTypeSelect.addEventListener("change", changeSortType); // Add change event listener to the sort type select

// Define an object to map the sorting types to their respective sorting functions
const sortFunctions = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  // Add more sorting functions for other types if needed
};

// Function to start sorting
function startSorting() {
  if (!sorting) {
    const sortType = sortTypeSelect.value; // Get the selected sort type
    const sortFunction = sortFunctions[sortType]; // Get the corresponding sorting function from the sortFunctions object
    moves = sortFunction(array); // Apply the sorting function to the array and store the resulting moves
    animate(); // Start the animation
    sorting = true; // Set the sorting flag to true
  }
}

// Function to reset sorting
function resetSorting() {
  sorting = false; // Set the sorting flag to false
  resetArray(); // Reset the array
  drawColumns(); // Redraw the columns on the canvas
}

// Function to change the sorting type
function changeSortType() {
  if (!sorting) {
    resetSorting(); // Reset the sorting if it's not in progress
  }
}

// Bubble Sort
function bubbleSort(array) {
  const moves = []; // Initialize an array to store the moves
  let swapped; // Flag to track if any swap occurred
  do {
    swapped = false; // Assume no swap occurred
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) {
        swapped = true; // Set the swap flag to true
        [array[i - 1], array[i]] = [array[i], array[i - 1]]; // Swap the elements in the array
        moves.push({ indices: [i - 1, i], swap: true }); // Add the move to the moves array with swap=true
      } else {
        moves.push({ indices: [i - 1, i], swap: false }); // Add the move to the moves array with swap=false
      }
    }
  } while (swapped); // Repeat until no more swaps occur
  return moves; // Return the moves array
}

// Selection Sort
function selectionSort(array) {
  const moves = []; // Initialize an array to store the moves
  for (let i = 0; i < array.length; i++) {
    let minIndex = i; // Assume the current element is the minimum
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j; // Update the minimum index
      }
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]]; // Swap the elements in the array
      moves.push({ indices: [i, minIndex], swap: true }); // Add the move to the moves array with swap=true
    } else {
      moves.push({ indices: [i, minIndex], swap: false }); // Add the move to the moves array with swap=false
    }
  }
  return moves; // Return the moves array
}

// Insertion Sort
function insertionSort(array) {
  const moves = []; // Initialize an array to store the moves
  for (let i = 1; i < array.length; i++) {
    const currentValue = array[i]; // Get the current value
    let j = i - 1;
    while (j >= 0 && array[j] > currentValue) {
      array[j + 1] = array[j]; // Shift elements to the right
      moves.push({ indices: [j, j + 1], swap: true }); // Add the move to the moves array with swap=true
      j--;
    }
    array[j + 1] = currentValue; // Insert the current value at the correct position
    moves.push({ indices: [j, j + 1], swap: false }); // Add the move to the moves array with swap=false
  }
  return moves; // Return the moves array
}

// Animation function
function animate() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); // Clear the canvas

  let changed = false; // Flag to track if any column changed position

  for (let i = 0; i < cols.length; i++) {
    changed = cols[i].draw(ctx) || changed; // Draw each column and update the changed flag
  }

  if (!changed && moves.length > 0) {
    const move = moves.shift(); // Get the next move from the moves array
    const [i, j] = move.indices; // Get the indices of the columns involved in the move

    if (move.swap) {
      cols[i].moveTo(cols[j]); // Move column i to the position of column j
      cols[j].moveTo(cols[i], -1); // Move column j to the position of column i with a negative duration
      [cols[i], cols[j]] = [cols[j], cols[i]]; // Swap the column objects in the cols array
    } else {
      // Handle moves without swaps (to-do)
    }
  }

  requestAnimationFrame(animate); // Continue the animation loop
}
