# Class Dependency Graph

The Class Dependency Graph takes a plain text file, parses it into nodes, and 
gives the user the ability to select each node and identify the nodes linked 
to the node they selected.  

## Getting Started

**Clone the repository**<br>
`git clone git@github.com:apipkin/DependencyGraph.git`

**Change into the directory**<br>
`cd DependencyGraph`

**Install important packages**<br>
`npm install`

**Start the server**<br>
`npm start`


## Testing

### Unit Tests
 - *test* `npm test`
 - *test coverage* `npm run test:cover`
 - *test coverage in browser* `test:cover:browser`

### Test Plan

1. Attempt with a simple file and select the node.
  **Upload:** 
  ```
  ClassA
  ```
  - **Select:** `ClassA`
  - **Expected**: `ClassA`
  - **Result**: `ClassA`

2. Attempt with a more complex file and select `ClassA`
  **Upload:** 
  ```
  ClassA ClassC ClassE
  ClassB ClassD ClassG
  ClassE ClassB ClassF ClassH
  ClassI ClassC 
  ```
  - **Select:** `ClassA`
  - **Expected:** `ClassA ClassE ClassH ClassF ClassB ClassG ClassD ClassC`
  - **Result:** `ClassA ClassE ClassH ClassF ClassB ClassG ClassD ClassC`

3. Attempt with a more complex file and select `ClassC`
  **Upload:** 
  ```
  ClassA ClassC ClassE
  ClassB ClassD ClassG
  ClassE ClassB ClassF ClassH
  ClassI ClassC 
  ```
  - **Select:** `ClassC`
  - **Expected:** `ClassC`
  - **Result:** `ClassC`

4. Attempt with a cyclic graph and select `ClassA`
  **Upload:**
  ```
  ClassA ClassB
  ClassB ClassA
  ```
  - **Select:** `ClassA`
  - **Expected:** Error: CircularDependency
  - **Result:** Error: CircularDependency

5. Attempt an upload of a non `.txt` file
  **Upload:** (image file)
  - **Expected:** Error: Invalid File
  - **Result:** Error: Invalid File

6. Attempt to select an invalid option
  **Upload:**
  ```
  ClassA ClassC ClassE
  ClassB ClassD ClassG
  ClassE ClassB ClassF ClassH
  ClassI ClassC 
  ```
  - **Select:** `ClassN` (modify list with web inspector)
  - **Expected:** Error: NodeRetrievalError
  - **Result:** Error: NodeRetrievalError



## UML Diagram
![UML Diagram](https://raw.githubusercontent.com/apipkin/DependencyGraph/master/uml_diagram.png)


## Lessons learned
One of the main lessons learned, and the longest portion of research for very 
little gain was uploading the asynchronous file to the server and parsing it 
directly. The biggest portion of this had to do with understanding how hapi 
loaded files with streams. This is done through a configuration object in the 
route. 

Working with a one way dependency graph worked really well with lessons learned
in previous tree and list structures. Graphs were a bit of a mystery going into
this lesson, but after reading how they are able to be broken down with 
verticies and edges it begin to make more sense. Verticies become nodes, and 
edges become a list of nodes within the node. This gives the abilty to traverse
the graph recursively. 


## Possible Improvements
One possible improvement would be to graphically display the graph that is 
presented rather than a string. This graph would not have to an image file, but
rather an ASCII tree. 

As with other projects, custom dialog boxes would be enhance the UI for 
application feedback to the user. 

