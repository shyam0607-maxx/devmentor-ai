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
  6: {
    module: 6,
    name: "Queues & Hash Tables",
    description: "Non-linear data structures for specialized use cases",
    topics: [
      {
        id: "queues",
        name: "Queues",
        description: "FIFO (First In First Out) linear data structure",
        notes: `
## Queues (FIFO)

Queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are added at rear and removed from front.

### Real-World Analogy:
\`\`\`
Like a line at the cashier:
- First person to join (enqueue) is first to leave (dequeue)
- Last person joined is last to leave

Front [1] [2] [3] [4] Rear
 ^                      ^
 |                      |
Dequeue              Enqueue
\`\`\`

### Basic Operations:
- **Enqueue**: Add element at rear - O(1)
- **Dequeue**: Remove element from front - O(1)
- **Peek**: View front element - O(1)
- **isEmpty**: Check if queue is empty - O(1)

### Types:
1. Simple Queue: Straight forward FIFO
2. Circular Queue: Rear connects to front
3. Priority Queue: Elements with priority
4. Double-ended Queue (Deque): Add/remove from both ends

### Applications:
- CPU task scheduling
- Printer queue management
- Customer service lines
- BFS in graphs
- Level-order tree traversal
        `,
        codeExamples: {
          java: `
import java.util.*;

public class QueueExample {
  // Using Java's built-in Queue
  public static void main(String[] args) {
    Queue<Integer> queue = new LinkedList<>();

    // Enqueue - O(1)
    queue.add(10);
    queue.add(20);
    queue.add(30);

    // Peek - O(1)
    System.out.println("Front: " + queue.peek()); // 10

    // Dequeue - O(1)
    System.out.println("Dequeued: " + queue.remove()); // 10

    // Custom Queue Implementation
  }

  static class CustomQueue {
    private int[] arr;
    private int front = 0, rear = -1, size = 0;

    CustomQueue(int capacity) {
      arr = new int[capacity];
    }

    void enqueue(int x) {
      if (size == arr.length) {
        System.out.println("Queue Full!");
        return;
      }
      rear = (rear + 1) % arr.length;
      arr[rear] = x;
      size++;
    }

    int dequeue() {
      if (size == 0) throw new RuntimeException("Queue Empty");
      int val = arr[front];
      front = (front + 1) % arr.length;
      size--;
      return val;
    }
  }
}
          `,
          python: `
from collections import deque

class Queue:
  def __init__(self):
    self.items = deque()

  # Enqueue - O(1)
  def enqueue(self, val):
    self.items.append(val)

  # Dequeue - O(1)
  def dequeue(self):
    if self.is_empty():
      return None
    return self.items.popleft()

  # Peek - O(1)
  def peek(self):
    if self.is_empty():
      return None
    return self.items[0]

  def is_empty(self):
    return len(self.items) == 0

  def size(self):
    return len(self.items)

# Usage
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
print(queue.peek())      # 10
print(queue.dequeue())   # 10
          `,
          cpp: `
#include <iostream>
#include <queue>
using namespace std;

int main() {
  // Using STL Queue
  queue<int> q;

  // Enqueue - O(1)
  q.push(10);
  q.push(20);
  q.push(30);

  // Peek - O(1)
  cout << "Front: " << q.front() << endl; // 10

  // Dequeue - O(1)
  q.pop();
  cout << "Size: " << q.size() << endl;

  // Custom Queue using array
  class CircularQueue {
  private:
    int* arr;
    int front, rear, size;
  public:
    CircularQueue(int cap) {
      arr = new int[cap];
      front = rear = -1;
      size = 0;
    }

    void enqueue(int x) {
      rear = (rear + 1) % 100;
      arr[rear] = x;
      size++;
    }
  };

  return 0;
}
          `,
        },
        timeComplexity: "Enqueue O(1), Dequeue O(1), Peek O(1)",
        spaceComplexity: "O(n) - where n is number of elements",
        difficulty: "Intermediate",
      },
      {
        id: "hash-tables",
        name: "Hash Tables / Hash Maps",
        description: "Key-value pairs with hash-based indexing",
        notes: `
## Hash Tables / Hash Maps

A data structure that implements an associative array - a structure that maps keys to values using a hash function.

### Core Concepts:
1. **Hash Function**: Converts key to index O(1)
2. **Collision Handling**: When two keys hash to same index
3. **Load Factor**: ratio = size / capacity

### Collision Resolution:
1. Chaining: Store collisions in linked list
2. Open Addressing: Find next available slot

### Hash Function Properties:
- Fast to compute
- Distributes keys uniformly
- Deterministic (same key → same hash)
- Minimize collisions

### Advantages:
- Average O(1) insertion, deletion, lookup
- Flexible key types
- No need to sort
- Real-world friendly

### Disadvantages:
- Worst-case O(n) if many collisions
- Extra memory for hash table
- Order not preserved

### Applications:
- Caching systems
- Database indexing
- Symbol tables
- Finding duplicates
- Frequency counting
- Two-sum problems
        `,
        codeExamples: {
          java: `
import java.util.*;

public class HashMapExample {
  public static void main(String[] args) {
    // HashMap with O(1) average operations
    HashMap<String, Integer> map = new HashMap<>();

    // Insert - O(1) average
    map.put("apple", 5);
    map.put("banana", 3);
    map.put("orange", 7);

    // Search - O(1) average
    System.out.println(map.get("apple")); // 5

    // Update - O(1) average
    map.put("apple", 10);

    // Delete - O(1) average
    map.remove("banana");

    // Check existence - O(1) average
    if (map.containsKey("orange")) {
      System.out.println("Found!");
    }

    // Iterate
    for (String key : map.keySet()) {
      System.out.println(key + ": " + map.get(key));
    }
  }
}
          `,
          python: `
# Python dictionary = hash table
hash_map = {}

# Insert - O(1) average
hash_map["apple"] = 5
hash_map["banana"] = 3

# Search - O(1) average
print(hash_map.get("apple"))  # 5

# Delete - O(1) average
del hash_map["banana"]

# Check existence
if "apple" in hash_map:
  print("Found!")

# Get all items
for key, value in hash_map.items():
  print(f"{key}: {value}")

# Frequency Counter Example
def count_frequency(arr):
  freq = {}
  for num in arr:
    freq[num] = freq.get(num, 0) + 1
  return freq

# Two Sum Problem
def two_sum(arr, target):
  seen = {}
  for num in arr:
    complement = target - num
    if complement in seen:
      return [seen[complement], num]
    seen[num] = num
  return None
          `,
          cpp: `
#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
  // unordered_map = hash table
  unordered_map<string, int> hash_map;

  // Insert - O(1) average
  hash_map["apple"] = 5;
  hash_map["banana"] = 3;

  // Search - O(1) average
  cout << hash_map["apple"] << endl; // 5

  // Delete - O(1) average
  hash_map.erase("banana");

  // Check existence
  if (hash_map.find("apple") != hash_map.end()) {
    cout << "Found!" << endl;
  }

  // Iterate
  for (auto& p : hash_map) {
    cout << p.first << ": " << p.second << endl;
  }

  // Frequency counter
  unordered_map<int, int> freq;
  int arr[] = {1, 2, 2, 3, 3, 3};
  for (int num : arr) {
    freq[num]++;
  }

  return 0;
}
          `,
        },
        timeComplexity: "Insert/Delete/Search O(1) average, O(n) worst",
        spaceComplexity: "O(n) where n is number of key-value pairs",
        difficulty: "Intermediate",
      },
    ],
  },
  7: {
    module: 7,
    name: "Sorting & Searching",
    description: "Essential algorithms for arranging and finding data",
    topics: [
      {
        id: "merge-sort",
        name: "Merge Sort",
        description: "Divide-and-conquer sorting algorithm O(n log n)",
        notes: `
## Merge Sort

Merge Sort is a divide-and-conquer algorithm that divides array into halves, sorts them recursively, then merges them back.

### Algorithm Steps:
1. Divide: Split array into two halves
2. Conquer: Recursively sort both halves
3. Merge: Merge two sorted halves into one

### Example:
\`\`\`
[38, 27, 43, 3, 9, 82]
       ↓ Divide
[38, 27, 43] | [3, 9, 82]
    ↓ Divide
[38] [27, 43] | [3, 9] [82]
       ↓ Merge
[27, 38, 43] | [3, 9, 82]
       ↓ Merge
[3, 9, 27, 38, 43, 82]
\`\`\`

### Characteristics:
- Divide-and-Conquer approach
- Stable sort (preserves order of equal elements)
- Not in-place (needs extra space)
- Best for linked lists
- Guaranteed O(n log n)

### Time Complexity:
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n log n)

### Space Complexity:
- O(n) - for temporary arrays
        `,
        codeExamples: {
          java: `
public class MergeSort {
  // Main merge sort function
  public static void mergeSort(int[] arr) {
    if (arr.length < 2) return;
    mergeSort(arr, 0, arr.length - 1);
  }

  private static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
      int mid = left + (right - left) / 2;
      mergeSort(arr, left, mid);
      mergeSort(arr, mid + 1, right);
      merge(arr, left, mid, right);
    }
  }

  // Merge two sorted subarrays
  private static void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right) {
      if (arr[i] <= arr[j]) {
        temp[k++] = arr[i++];
      } else {
        temp[k++] = arr[j++];
      }
    }

    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    for (i = left, k = 0; i <= right; i++, k++) {
      arr[i] = temp[k];
    }
  }
}
          `,
          python: `
def merge_sort(arr):
  if len(arr) < 2:
    return arr

  mid = len(arr) // 2
  left = merge_sort(arr[:mid])
  right = merge_sort(arr[mid:])

  return merge(left, right)

def merge(left, right):
  result = []
  i = j = 0

  while i < len(left) and j < len(right):
    if left[i] <= right[j]:
      result.append(left[i])
      i += 1
    else:
      result.append(right[j])
      j += 1

  result.extend(left[i:])
  result.extend(right[j:])
  return result

# Usage
arr = [38, 27, 43, 3, 9, 82]
print(merge_sort(arr))  # [3, 9, 27, 38, 43, 82]
          `,
          cpp: `
#include <iostream>
using namespace std;

void merge(int arr[], int left, int mid, int right) {
  int temp[right - left + 1];
  int i = left, j = mid + 1, k = 0;

  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      temp[k++] = arr[i++];
    } else {
      temp[k++] = arr[j++];
    }
  }

  while (i <= mid) temp[k++] = arr[i++];
  while (j <= right) temp[k++] = arr[j++];

  for (i = left, k = 0; i <= right; i++, k++) {
    arr[i] = temp[k];
  }
}

void mergeSort(int arr[], int left, int right) {
  if (left < right) {
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
}
          `,
        },
        timeComplexity: "O(n log n) - all cases",
        spaceComplexity: "O(n) - temporary arrays",
        difficulty: "Advanced",
      },
      {
        id: "binary-search",
        name: "Binary Search",
        description: "Efficient O(log n) search on sorted arrays",
        notes: `
## Binary Search

Binary Search is an efficient algorithm to find a target value in a sorted array by repeatedly dividing the search space in half.

### Requirements:
- Array MUST be sorted
- Works on any comparable elements

### Algorithm:
1. Start with left=0, right=n-1
2. Calculate mid = left + (right - left) / 2
3. Compare arr[mid] with target:
   - If equal: found!
   - If arr[mid] > target: search left half
   - If arr[mid] < target: search right half
4. Repeat until found or left > right

### Example:
\`\`\`
Search for 35 in [10, 20, 30, 35, 40, 50]

Step 1: left=0, right=5, mid=2
        arr[2]=30 < 35, so left=3

Step 2: left=3, right=5, mid=4
        arr[4]=40 > 35, so right=3

Step 3: left=3, right=3, mid=3
        arr[3]=35, Found!
\`\`\`

### Time Complexity:
- Best: O(1) - element at middle
- Average: O(log n)
- Worst: O(log n)

### Space Complexity:
- O(1) - iterative
- O(log n) - recursive (call stack)

### Variations:
- Left-most occurrence
- Right-most occurrence
- First >= target
- Last <= target
        `,
        codeExamples: {
          java: `
public class BinarySearch {
  // Iterative Binary Search - O(log n)
  public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;

    while (left <= right) {
      int mid = left + (right - left) / 2;

      if (arr[mid] == target) {
        return mid;
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1; // Not found
  }

  // Recursive Binary Search
  public static int binarySearchRec(int[] arr, int left, int right, int target) {
    if (left > right) return -1;

    int mid = left + (right - left) / 2;
    if (arr[mid] == target) {
      return mid;
    } else if (arr[mid] < target) {
      return binarySearchRec(arr, mid + 1, right, target);
    } else {
      return binarySearchRec(arr, left, mid - 1, target);
    }
  }

  public static void main(String[] args) {
    int[] arr = {10, 20, 30, 35, 40, 50};
    System.out.println(binarySearch(arr, 35)); // 3
  }
}
          `,
          python: `
def binary_search(arr, target):
  left, right = 0, len(arr) - 1

  while left <= right:
    mid = left + (right - left) // 2

    if arr[mid] == target:
      return mid
    elif arr[mid] < target:
      left = mid + 1
    else:
      right = mid - 1

  return -1  # Not found

def binary_search_rec(arr, left, right, target):
  if left > right:
    return -1

  mid = left + (right - left) // 2

  if arr[mid] == target:
    return mid
  elif arr[mid] < target:
    return binary_search_rec(arr, mid + 1, right, target)
  else:
    return binary_search_rec(arr, left, mid - 1, target)

# Usage
arr = [10, 20, 30, 35, 40, 50]
print(binary_search(arr, 35))  # 3
          `,
          cpp: `
#include <iostream>
using namespace std;

int binarySearch(int arr[], int n, int target) {
  int left = 0, right = n - 1;

  while (left <= right) {
    int mid = left + (right - left) / 2;

    if (arr[mid] == target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;  // Not found
}

int binarySearchRec(int arr[], int left, int right, int target) {
  if (left > right) return -1;

  int mid = left + (right - left) / 2;

  if (arr[mid] == target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRec(arr, mid + 1, right, target);
  } else {
    return binarySearchRec(arr, left, mid - 1, target);
  }
}
          `,
        },
        timeComplexity: "O(log n) - all cases",
        spaceComplexity: "O(1) iterative, O(log n) recursive",
        difficulty: "Intermediate",
      },
    ],
  },
  8: {
    module: 8,
    name: "Advanced Algorithms",
    description: "Complex problem-solving techniques",
    topics: [
      {
        id: "dynamic-programming",
        name: "Dynamic Programming",
        description: "Optimization technique using overlapping subproblems",
        notes: `
## Dynamic Programming

Dynamic Programming is an optimization technique that solves complex problems by breaking them into overlapping subproblems and storing their solutions to avoid recomputation.

### Key Principles:
1. **Overlapping Subproblems**: Same subproblems solved multiple times
2. **Optimal Substructure**: Solution built from optimal solutions of subproblems
3. **Memoization**: Store computed results

### Approaches:
1. **Top-Down (Memoization)**: Recursive with caching
2. **Bottom-Up (Tabulation)**: Iterative building up solutions

### Classic Examples:

**Fibonacci Sequence:**
- Naive: O(2^n) - recalculates same values
- DP: O(n) - stores each value once

**Longest Common Subsequence (LCS):**
- Used in diff algorithms, DNA matching
- DP saves exponential comparisons

**Knapsack Problem:**
- Select items maximizing value within weight limit
- Real-world: Resource allocation, portfolio optimization

### When to Use DP:
- Problem has overlapping subproblems
- Problem has optimal substructure
- Greedy won't give optimal solution
- Memorization reduces complexity

### Applications:
- Fibonacci numbers
- Coin change problem
- Longest Increasing Subsequence
- Matrix chain multiplication
- Word break problems
- Pathfinding in grids
        `,
        codeExamples: {
          java: `
public class DynamicProgramming {
  // Fibonacci - Top-Down (Memoization)
  static int[] memo;

  public static int fibMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
    return memo[n];
  }

  // Fibonacci - Bottom-Up (Tabulation)
  public static int fibTab(int n) {
    if (n <= 1) return n;
    int[] dp = new int[n + 1];
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
  }

  // Coin Change Problem
  public static int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
      dp[i] = Integer.MAX_VALUE;
      for (int coin : coins) {
        if (coin <= i && dp[i - coin] != Integer.MAX_VALUE) {
          dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
      }
    }
    return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];
  }
}
          `,
          python: `
def fib_memo(n, memo={}):
  if n <= 1:
    return n
  if n in memo:
    return memo[n]

  memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
  return memo[n]

def fib_tab(n):
  if n <= 1:
    return n

  dp = [0] * (n + 1)
  dp[1] = 1

  for i in range(2, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]

  return dp[n]

# Coin Change
def coin_change(coins, amount):
  dp = [float('inf')] * (amount + 1)
  dp[0] = 0

  for i in range(1, amount + 1):
    for coin in coins:
      if coin <= i:
        dp[i] = min(dp[i], dp[i - coin] + 1)

  return dp[amount] if dp[amount] != float('inf') else -1

# LIS (Longest Increasing Subsequence)
def lis(arr):
  n = len(arr)
  dp = [1] * n

  for i in range(1, n):
    for j in range(i):
      if arr[j] < arr[i]:
        dp[i] = max(dp[i], dp[j] + 1)

  return max(dp)
          `,
          cpp: `
#include <iostream>
#include <vector>
#include <cstring>
using namespace std;

int memo[100];

// Fibonacci - Memoization
int fibMemo(int n) {
  if (n <= 1) return n;
  if (memo[n] != -1) return memo[n];
  memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
  return memo[n];
}

// Fibonacci - Tabulation
int fibTab(int n) {
  if (n <= 1) return n;
  vector<int> dp(n + 1);
  dp[1] = 1;

  for (int i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// Coin Change
int coinChange(vector<int>& coins, int amount) {
  vector<int> dp(amount + 1, INT_MAX);
  dp[0] = 0;

  for (int i = 1; i <= amount; i++) {
    for (int coin : coins) {
      if (coin <= i && dp[i - coin] != INT_MAX) {
        dp[i] = min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] == INT_MAX ? -1 : dp[amount];
}
          `,
        },
        timeComplexity: "Depends on problem - typically O(n) to O(n²)",
        spaceComplexity: "O(n) for memoization/tabulation",
        difficulty: "Advanced",
      },
      {
        id: "graphs-intro",
        name: "Graphs - Introduction",
        description: "Fundamental concepts of graph data structures",
        notes: `
## Graphs - Introduction

Graph is a non-linear data structure consisting of vertices (nodes) and edges (connections) representing relationships between entities.

### Terminology:
- **Vertex/Node**: A single point in the graph
- **Edge**: Connection between two vertices
- **Degree**: Number of edges connected to a vertex
- **Path**: Sequence of vertices connected by edges
- **Cycle**: Path that starts and ends at same vertex

### Types of Graphs:

**1. Directed vs Undirected:**
- Undirected: Edges have no direction (friendship)
- Directed: Edges have direction (following on Twitter)

**2. Weighted vs Unweighted:**
- Unweighted: All edges equal
- Weighted: Edges have values (distances, costs)

**3. Dense vs Sparse:**
- Dense: Many edges
- Sparse: Few edges

### Representation:
1. **Adjacency Matrix**: 2D array [i][j] = edge weight
2. **Adjacency List**: Array of lists for each vertex

### Graph Traversal:
1. **BFS (Breadth-First Search)**: Level-wise exploration
2. **DFS (Depth-First Search)**: Deep exploration first

### Applications:
- Social networks
- GPS navigation
- Web crawling
- Recommendation systems
- Network routing
- Game development

### Real-World Examples:
- Facebook: Users (nodes), friendships (edges)
- Google Maps: Locations (nodes), roads (edges)
- Wikipedia: Articles (nodes), links (edges)
        `,
        codeExamples: {
          java: `
import java.util.*;

public class GraphIntro {
  // Adjacency List Representation
  static class Graph {
    int vertices;
    List<Integer>[] adj;

    Graph(int v) {
      vertices = v;
      adj = new ArrayList[v];
      for (int i = 0; i < v; i++) {
        adj[i] = new ArrayList<>();
      }
    }

    void addEdge(int u, int v) {
      adj[u].add(v);
    }

    // BFS Traversal - O(V + E)
    void bfs(int start) {
      boolean[] visited = new boolean[vertices];
      Queue<Integer> queue = new LinkedList<>();

      queue.add(start);
      visited[start] = true;

      while (!queue.isEmpty()) {
        int u = queue.poll();
        System.out.print(u + " ");

        for (int v : adj[u]) {
          if (!visited[v]) {
            visited[v] = true;
            queue.add(v);
          }
        }
      }
    }

    // DFS Traversal - O(V + E)
    void dfs(int start) {
      boolean[] visited = new boolean[vertices];
      dfsHelper(start, visited);
    }

    void dfsHelper(int u, boolean[] visited) {
      visited[u] = true;
      System.out.print(u + " ");

      for (int v : adj[u]) {
        if (!visited[v]) {
          dfsHelper(v, visited);
        }
      }
    }
  }

  public static void main(String[] args) {
    Graph g = new Graph(5);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(2, 4);

    System.out.println("BFS:");
    g.bfs(0);
    System.out.println("\\nDFS:");
    g.dfs(0);
  }
}
          `,
          python: `
from collections import defaultdict, deque

class Graph:
  def __init__(self, vertices):
    self.vertices = vertices
    self.adj = defaultdict(list)

  def add_edge(self, u, v):
    self.adj[u].append(v)

  # BFS Traversal - O(V + E)
  def bfs(self, start):
    visited = set()
    queue = deque([start])
    visited.add(start)

    while queue:
      u = queue.popleft()
      print(u, end=" ")

      for v in self.adj[u]:
        if v not in visited:
          visited.add(v)
          queue.append(v)

  # DFS Traversal - O(V + E)
  def dfs(self, start):
    visited = set()
    self._dfs_helper(start, visited)

  def _dfs_helper(self, u, visited):
    visited.add(u)
    print(u, end=" ")

    for v in self.adj[u]:
      if v not in visited:
        self._dfs_helper(v, visited)

# Usage
g = Graph(5)
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 3)
g.add_edge(2, 4)

print("BFS:")
g.bfs(0)
print("\\nDFS:")
g.dfs(0)
          `,
          cpp: `
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class Graph {
private:
  int vertices;
  vector<vector<int>> adj;

public:
  Graph(int v) : vertices(v) {
    adj.resize(v);
  }

  void addEdge(int u, int v) {
    adj[u].push_back(v);
  }

  // BFS - O(V + E)
  void bfs(int start) {
    vector<bool> visited(vertices, false);
    queue<int> q;

    q.push(start);
    visited[start] = true;

    while (!q.empty()) {
      int u = q.front();
      q.pop();
      cout << u << " ";

      for (int v : adj[u]) {
        if (!visited[v]) {
          visited[v] = true;
          q.push(v);
        }
      }
    }
  }

  // DFS - O(V + E)
  void dfs(int start) {
    vector<bool> visited(vertices, false);
    dfsHelper(start, visited);
  }

private:
  void dfsHelper(int u, vector<bool>& visited) {
    visited[u] = true;
    cout << u << " ";

    for (int v : adj[u]) {
      if (!visited[v]) {
        dfsHelper(v, visited);
      }
    }
  }
};
          `,
        },
        timeComplexity: "BFS/DFS: O(V + E) where V=vertices, E=edges",
        spaceComplexity: "O(V) - visited set/array",
        difficulty: "Advanced",
      },
    ],
  },
};

module.exports = dsaCurriculum;
