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

### Visual Representation:
\`\`\`
Index:    0      1      2      3      4
       +----+----+----+----+----+
Data:  | 10 | 20 | 30 | 40 | 50 |
       +----+----+----+----+----+
Memory: [Contiguous Block in RAM]
\`\`\`

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

### 2D Array Visualization:
\`\`\`
     Col 0  Col 1  Col 2
Row 0  [1]    [2]    [3]
Row 1  [4]    [5]    [6]
Row 2  [7]    [8]    [9]
\`\`\`

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
  3: {
    module: 3,
    name: "Linked Lists",
    description: "Understanding linked lists and pointer-based structures",
    topics: [
      {
        id: "linked-list-basics",
        name: "Linked List Basics",
        description: "Nodes, pointers, and traversal",
        notes: `
## Linked Lists

A linear data structure where elements (nodes) are connected via pointers/references.

### Visual Representation:
\`\`\`
Head →  [10|→]  →  [20|→]  →  [30|→]  →  [40|NULL]
        Node 1      Node 2      Node 3      Node 4

Each Node contains:
- Data: The value stored
- Next: Pointer to next node
\`\`\`

### Comparison with Arrays:
\`\`\`
ARRAYS:
- Fixed size
- Contiguous memory
- O(1) access
- O(n) insert/delete

LINKED LISTS:
- Dynamic size
- Non-contiguous memory
- O(n) access
- O(1) insert/delete (if position known)
\`\`\`

### Types of Linked Lists:
1. **Singly Linked List**: Each node points to next
2. **Doubly Linked List**: Each node points to next AND previous
3. **Circular Linked List**: Last node points back to first

### Doubly Linked List Visualization:
\`\`\`
NULL ← [10|↔] ↔ [20|↔] ↔ [30|↔] ↔ [40|NULL]
\`\`\`

### Real-World Applications:
- Browser history (back/forward buttons)
- Undo/Redo functionality
- Music playlist with prev/next
        `,
        codeExamples: {
          java: `
public class Node {
  int data;
  Node next;

  Node(int data) {
    this.data = data;
    this.next = null;
  }
}

public class LinkedList {
  Node head;

  // Insert at beginning - O(1)
  public void insertFirst(int data) {
    Node newNode = new Node(data);
    newNode.next = head;
    head = newNode;
  }

  // Traverse - O(n)
  public void display() {
    Node current = head;
    while (current != null) {
      System.out.print(current.data + " → ");
      current = current.next;
    }
    System.out.println("NULL");
  }

  // Search - O(n)
  public boolean search(int target) {
    Node current = head;
    while (current != null) {
      if (current.data == target) return true;
      current = current.next;
    }
    return false;
  }
}
          `,
          python: `
class Node:
  def __init__(self, data):
    self.data = data
    self.next = None

class LinkedList:
  def __init__(self):
    self.head = None

  # Insert at beginning - O(1)
  def insert_first(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node

  # Traverse - O(n)
  def display(self):
    current = self.head
    while current:
      print(f"{current.data} → ", end="")
      current = current.next
    print("NULL")

  # Search - O(n)
  def search(self, target):
    current = self.head
    while current:
      if current.data == target:
        return True
      current = current.next
    return False
          `,
          cpp: `
#include <iostream>
using namespace std;

struct Node {
  int data;
  Node* next;
  Node(int d) : data(d), next(NULL) {}
};

class LinkedList {
public:
  Node* head;

  LinkedList() : head(NULL) {}

  // Insert at beginning - O(1)
  void insertFirst(int data) {
    Node* newNode = new Node(data);
    newNode->next = head;
    head = newNode;
  }

  // Traverse - O(n)
  void display() {
    Node* current = head;
    while (current) {
      cout << current->data << " → ";
      current = current->next;
    }
    cout << "NULL\\n";
  }

  // Search - O(n)
  bool search(int target) {
    Node* current = head;
    while (current) {
      if (current->data == target) return true;
      current = current->next;
    }
    return false;
  }
};
          `,
        },
        timeComplexity: "Access O(n), Insert O(1), Delete O(1)",
        spaceComplexity: "O(n) - one node per element",
        difficulty: "Intermediate",
      },
    ],
  },
  4: {
    module: 4,
    name: "Stacks & Queues",
    description: "LIFO and FIFO data structures",
    topics: [
      {
        id: "stacks",
        name: "Stacks (LIFO)",
        description: "Last-In-First-Out data structure",
        notes: `
## Stacks (LIFO)

Last element added is the first one removed. Like a stack of plates!

### Visual Representation:
\`\`\`
Push 10:    Push 20:    Push 30:    Pop:
┌───┐       ┌───┐       ┌───┐       ┌───┐
│10 │       │20 │       │30 │ TOP   │   │
└───┘       ├───┤       ├───┤   →   ├───┤
            │10 │       │20 │       │20 │ TOP
            └───┘       ├───┤       ├───┤
                        │10 │       │10 │
                        └───┘       └───┘

Operations:
- Push: Add to top - O(1)
- Pop: Remove from top - O(1)
- Peek: View top - O(1)
\`\`\`

### Stack vs Queue Comparison:
\`\`\`
STACK (LIFO):        QUEUE (FIFO):
Push 1, 2, 3         Enqueue 1, 2, 3
Pop Order: 3,2,1     Dequeue Order: 1,2,3

Stack:          Queue:
  [3]           [1] → [2] → [3]
  [2]           Front        Rear
  [1]
\`\`\`

### Applications:
- Browser back button
- Undo/Redo in editors
- Function call stack
- Expression evaluation
- Backtracking algorithms
        `,
        codeExamples: {
          java: `
public class Stack {
  private int[] arr;
  private int top;
  private int capacity;

  Stack(int size) {
    arr = new int[size];
    capacity = size;
    top = -1;
  }

  // Push - O(1)
  public void push(int x) {
    if (top == capacity - 1) {
      System.out.println("Stack Overflow");
      return;
    }
    arr[++top] = x;
  }

  // Pop - O(1)
  public int pop() {
    if (top == -1) {
      System.out.println("Stack Underflow");
      return -1;
    }
    return arr[top--];
  }

  // Peek - O(1)
  public int peek() {
    if (top == -1) return -1;
    return arr[top];
  }

  // Is Empty - O(1)
  public boolean isEmpty() {
    return top == -1;
  }
}
          `,
          python: `
class Stack:
  def __init__(self, size=100):
    self.arr = []
    self.capacity = size

  # Push - O(1)
  def push(self, x):
    if len(self.arr) < self.capacity:
      self.arr.append(x)
    else:
      print("Stack Overflow")

  # Pop - O(1)
  def pop(self):
    if not self.arr:
      print("Stack Underflow")
      return None
    return self.arr.pop()

  # Peek - O(1)
  def peek(self):
    if not self.arr:
      return None
    return self.arr[-1]

  # Is Empty - O(1)
  def is_empty(self):
    return len(self.arr) == 0

  # Size - O(1)
  def size(self):
    return len(self.arr)
          `,
          cpp: `
#include <iostream>
#include <vector>
using namespace std;

class Stack {
private:
  vector<int> arr;
  int top;
  int capacity;

public:
  Stack(int size = 100) {
    capacity = size;
    top = -1;
  }

  // Push - O(1)
  void push(int x) {
    if (top < capacity - 1) {
      arr.push_back(x);
      top++;
    } else {
      cout << "Stack Overflow\\n";
    }
  }

  // Pop - O(1)
  int pop() {
    if (top == -1) {
      cout << "Stack Underflow\\n";
      return -1;
    }
    int val = arr[top];
    arr.pop_back();
    top--;
    return val;
  }

  // Peek - O(1)
  int peek() {
    if (top == -1) return -1;
    return arr[top];
  }
};
          `,
        },
        timeComplexity: "Push O(1), Pop O(1), Peek O(1)",
        spaceComplexity: "O(n)",
        difficulty: "Beginner",
      },
    ],
  },
  5: {
    module: 5,
    name: "Trees",
    description: "Hierarchical data structures",
    topics: [
      {
        id: "binary-trees",
        name: "Binary Trees",
        description: "Trees where each node has at most 2 children",
        notes: `
## Binary Trees

A hierarchical structure where each node has at most 2 children (left and right).

### Visual Representation:
\`\`\`
        1 (Root)
       / \\
      2   3
     / \\
    4   5

Tree Structure:
- Root: Node with no parent (1)
- Internal: Nodes with children (1, 2)
- Leaf: Nodes with no children (3, 4, 5)
- Height: Maximum distance from root to leaf
\`\`\`

### Types of Binary Trees:
\`\`\`
1. Full Binary Tree:
   Every node has 0 or 2 children
     1
    / \\
   2   3
  / \\ / \\
 4  5 6  7

2. Complete Binary Tree:
   All levels filled except possibly last
     1
    / \\
   2   3
  / \\ /
 4  5 6

3. Perfect Binary Tree:
   All internal nodes have 2 children
   All leaves at same level
     1
    / \\
   2   3
  / \\ / \\
 4  5 6  7

4. Binary Search Tree (BST):
   Left < Node < Right
     5
    / \\
   3   7
  / \\ / \\
 2  4 6  8
\`\`\`

### Tree Traversals:
\`\`\`
      1
     / \\
    2   3

Inorder (L-N-R):   2 1 3
Preorder (N-L-R):  1 2 3
Postorder (L-R-N): 2 3 1
Level Order:       1 2 3
\`\`\`

### Applications:
- File system hierarchy
- DOM in web browsers
- Expression parsing
- Huffman coding
- Binary search trees
        `,
        codeExamples: {
          java: `
public class TreeNode {
  int data;
  TreeNode left, right;

  TreeNode(int data) {
    this.data = data;
    left = right = null;
  }
}

public class BinaryTree {
  TreeNode root;

  // Inorder Traversal - O(n)
  void inorder(TreeNode node) {
    if (node == null) return;
    inorder(node.left);      // Left
    System.out.print(node.data + " ");  // Node
    inorder(node.right);     // Right
  }

  // Preorder Traversal - O(n)
  void preorder(TreeNode node) {
    if (node == null) return;
    System.out.print(node.data + " ");  // Node
    preorder(node.left);     // Left
    preorder(node.right);    // Right
  }

  // Height of Tree - O(n)
  int height(TreeNode node) {
    if (node == null) return -1;
    return 1 + Math.max(height(node.left),
                        height(node.right));
  }
}
          `,
          python: `
class TreeNode:
  def __init__(self, data):
    self.data = data
    self.left = None
    self.right = None

class BinaryTree:
  def __init__(self):
    self.root = None

  # Inorder Traversal - O(n)
  def inorder(self, node):
    if not node:
      return
    self.inorder(node.left)        # Left
    print(node.data, end=" ")      # Node
    self.inorder(node.right)       # Right

  # Preorder Traversal - O(n)
  def preorder(self, node):
    if not node:
      return
    print(node.data, end=" ")      # Node
    self.preorder(node.left)       # Left
    self.preorder(node.right)      # Right

  # Height - O(n)
  def height(self, node):
    if not node:
      return -1
    return 1 + max(self.height(node.left),
                   self.height(node.right))
          `,
          cpp: `
#include <iostream>
#include <algorithm>
using namespace std;

struct TreeNode {
  int data;
  TreeNode *left, *right;
  TreeNode(int d) : data(d), left(NULL), right(NULL) {}
};

class BinaryTree {
public:
  // Inorder - O(n)
  void inorder(TreeNode* node) {
    if (!node) return;
    inorder(node->left);
    cout << node->data << " ";
    inorder(node->right);
  }

  // Preorder - O(n)
  void preorder(TreeNode* node) {
    if (!node) return;
    cout << node->data << " ";
    preorder(node->left);
    preorder(node->right);
  }

  // Height - O(n)
  int height(TreeNode* node) {
    if (!node) return -1;
    return 1 + max(height(node->left),
                   height(node->right));
  }
};
          `,
        },
        timeComplexity: "Traversal O(n), Height O(n), Search O(h)",
        spaceComplexity: "O(h) - recursive call stack",
        difficulty: "Intermediate",
      },
    ],
  },
};

module.exports = dsaCurriculum;
