# URLs
1. UI: http://localhost:3000
2. API: http://localhost:3333

# Available Scripts
In the project directory after `npm install`, you can run scripts:

### SSR
#### `start-ssr`
starts SSR (next.js) build bundle with both frontend + backend launched with concurrently

#### `start-ssrd`
starts SSR (next.js) build bundle with both frontend + backend launched with concurrently (1100ms simulated delay)

### CSR
#### `start-csr` 
starts CSR build bundle with both frontend + backend launched with concurrently

#### `start-csr-front`
starts CSR frontend only

### BE
#### `start-back` 
starts `json-server` API based on `todo.database.js`    

# Task:
#### Goal

Create a kickass TODO application.

#### Feature requirements

Application should support basic CRUD operations for todo lists.
User should have an ability to view, add, remove, complete/uncomplete his todos;
Todos should be saved to database of your choice
(Refer http://todomvc.com/ as example)

#### General Techical Requirements

1. Application should support universal(isomorphic) rendering (Both on client and server)
2. Client-side tests are plus.
3. Should be a clear README, describing how to install dependencies, prepare infrastructure and launch application
