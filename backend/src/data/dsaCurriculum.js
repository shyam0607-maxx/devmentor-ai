const dsaCurriculum = {
  1: {
    module: 1,
    name: "Basics & Complexity",
    description: "Foundation concepts for DSA",
    topics: [
      {
        id: "big-o",
        name: "Big O Notation",
        description: "Understanding time and space complexity",
        notes: `
## Big O Notation

Big O notation describes the worst-case scenario for how an algorithm's runtime or space grows as the input size increases.

### Common Complexities (from fastest to slowest):
- **O(1)** - Constant: Always takes same time (e.g., array access by index)
- **O(log n)** - Logarithmic: Divides problem in half (e.g., binary search)
- **O(n)** - Linear: Proportional to input size (e.g., linear search)
- **O(n log n)** - Linearithmic: Divide and conquer (e.g., merge sort)
- **O(n²)** - Quadratic: Nested loops (e.g., bubble sort)
- **O(n³)** - Cubic: Triple nested loops
- **O(2ⁿ)** - Exponential: Recursive without memoization
- **O(n!)** - Factorial: Generates all permutations

### Example Analysis:
\`\`\`
for (int i = 0; i < n; i++)        // runs n times
  for (int j = 0; j < n; j++)      // runs n times
    sum += arr[i][j];              // O(1) operation

Total: O(n²)
\`\`\`
        `,
        codeExamples: {
          java: `
public class BigOExample {
  // O(1) - Constant time
  public static int getFirst(int[] arr) {
    return arr[0];
  }

  // O(n) - Linear time
  public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == target) return i;
    }
    return -1;
  }

  // O(n²) - Quadratic time
  public static void bubbleSort(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
      for (int j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          int temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  }

  // O(log n) - Logarithmic time
  public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
      int mid = left + (right - left) / 2;
      if (arr[mid] == target) return mid;
      if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  }
}
          `,
          python: `
# O(1) - Constant time
def get_first(arr):
    return arr[0]

# O(n) - Linear time
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

# O(n²) - Quadratic time
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# O(log n) - Logarithmic time
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
          `,
          cpp: `
#include <iostream>
using namespace std;

// O(1) - Constant time
int getFirst(int arr[]) {
    return arr[0];
}

// O(n) - Linear time
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

// O(n²) - Quadratic time
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

// O(log n) - Logarithmic time
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
          `,
        },
        timeComplexity: "Varies by operation: O(1) to O(n!)",
        spaceComplexity: "O(1) for most comparisons",
        difficulty: "Beginner",
      },
      {
        id: "recursion",
        name: "Recursion",
        description: "Understanding recursive functions and how they work",
        notes: `
## Recursion

A function that calls itself to solve smaller instances of the same problem.

### Key Concepts:
1. **Base Case**: Condition that stops recursion
2. **Recursive Case**: Function calls itself with different parameters
3. **Stack**: Keeps track of function calls

### Common Pattern:
\`\`\`
if (base_case) return result;
return recursive_function(smaller_problem);
\`\`\`

### Example: Factorial
- Factorial(5) = 5 × Factorial(4)
- Factorial(4) = 4 × Factorial(3)
- ... continue until Factorial(1) = 1

**Time Complexity**: O(n) - makes n recursive calls
**Space Complexity**: O(n) - call stack depth
        `,
        codeExamples: {
          java: `
public class Recursion {
  // Factorial: n! = n × (n-1)!
  public static int factorial(int n) {
    // Base case
    if (n <= 1) return 1;
    // Recursive case
    return n * factorial(n - 1);
  }

  // Fibonacci: fib(n) = fib(n-1) + fib(n-2)
  public static int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  // Power: x^n
  public static int power(int x, int n) {
    if (n == 0) return 1;
    return x * power(x, n - 1);
  }

  // Sum of array
  public static int arraySum(int[] arr, int index) {
    if (index == arr.length) return 0;
    return arr[index] + arraySum(arr, index + 1);
  }
}
          `,
          python: `
# Factorial
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Fibonacci
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Power
def power(x, n):
    if n == 0:
        return 1
    return x * power(x, n - 1)

# Sum of array
def array_sum(arr, index=0):
    if index == len(arr):
        return 0
    return arr[index] + array_sum(arr, index + 1)

# Memoization (optimization)
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]
          `,
          cpp: `
#include <iostream>
using namespace std;

// Factorial
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Fibonacci
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Power
int power(int x, int n) {
    if (n == 0) return 1;
    return x * power(x, n - 1);
}

// Sum of array
int arraySum(int arr[], int index, int n) {
    if (index == n) return 0;
    return arr[index] + arraySum(arr, index + 1, n);
}
          `,
        },
        timeComplexity: "O(n) for linear recursion, O(2^n) for exponential",
        spaceComplexity: "O(n) - call stack depth",
        difficulty: "Beginner",
      },
    ],
  },
  2: {
    module: 2,
    name: "Arrays & Strings",
    description: "Working with arrays and string manipulation",
    topics: [
      {
        id: "arrays-basics",
        name: "Array Basics",
        description: "Understanding arrays and common operations",
        notes: `
## Arrays

A data structure that stores multiple elements in a fixed-size, contiguous block of memory.

### Key Characteristics:
- **Fixed Size**: Size is determined at creation
- **Contiguous Memory**: All elements stored next to each other
- **Zero-Indexed**: First element at index 0
- **Random Access**: O(1) access to any element

### Common Operations:
- **Access**: arr[i] → O(1)
- **Search**: Linear or binary → O(n) or O(log n)
- **Insert**: Shift elements → O(n)
- **Delete**: Shift elements → O(n)
- **Traverse**: Visit all elements → O(n)

### Real-World Use Cases:
- Storing scores in a game
- List of prices in a store
- Pixel data in an image
        `,
        codeExamples: {
          java: `
public class ArrayOperations {
  // 1D Array
  public static void basic1D() {
    int[] arr = {1, 2, 3, 4, 5};
    System.out.println(arr[0]); // Access: O(1)
  }

  // 2D Array (Matrix)
  public static void basic2D() {
    int[][] matrix = {
      {1, 2, 3},
      {4, 5, 6},
      {7, 8, 9}
    };
    System.out.println(matrix[0][1]); // 2
  }

  // Search
  public static int search(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == target) return i;
    }
    return -1; // Not found
  }

  // Insert (shift elements)
  public static int[] insert(int[] arr, int value, int index) {
    int[] newArr = new int[arr.length + 1];
    for (int i = 0; i < index; i++) {
      newArr[i] = arr[i];
    }
    newArr[index] = value;
    for (int i = index; i < arr.length; i++) {
      newArr[i + 1] = arr[i];
    }
    return newArr;
  }

  // Traverse (print all)
  public static void traverse(int[] arr) {
    for (int val : arr) {
      System.out.println(val);
    }
  }
}
          `,
          python: `
# Basic operations
arr = [1, 2, 3, 4, 5]
print(arr[0])  # Access: O(1)

# 2D Array (Matrix)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(matrix[0][1])  # 2

# Search
def search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

# Insert
def insert(arr, value, index):
    arr.insert(index, value)
    return arr

# Traverse
def traverse(arr):
    for val in arr:
        print(val)

# Common methods
arr.append(6)        # Add to end
arr.remove(3)        # Remove by value
arr.pop(0)          # Remove by index
arr.sort()          # Sort
          `,
          cpp: `
#include <iostream>
#include <vector>
using namespace std;

// Basic array
void basic() {
    int arr[5] = {1, 2, 3, 4, 5};
    cout << arr[0]; // O(1)
}

// Dynamic array (vector)
void dynamicArray() {
    vector<int> arr = {1, 2, 3, 4, 5};
    arr.push_back(6);    // Add to end
    arr.pop_back();      // Remove from end
    arr.insert(arr.begin() + 2, 10); // Insert at index 2
}

// 2D Array
void matrix2D() {
    vector<vector<int>> matrix = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    cout << matrix[0][1]; // 2
}

// Search
int search(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

// Traverse
void traverse(vector<int>& arr) {
    for (int val : arr) {
        cout << val << " ";
    }
}
          `,
        },
        timeComplexity: "Access O(1), Search O(n), Insert O(n), Delete O(n)",
        spaceComplexity: "O(n) - proportional to array size",
        difficulty: "Beginner",
      },
    ],
  },
};

module.exports = dsaCurriculum;
