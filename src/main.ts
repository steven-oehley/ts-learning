// ts basic / primitive types
const name: string = "Steve"; // string type
const age: number = 25; // number type
const isStudent: boolean = false; // boolean type

// union types
// ------ varibale can be one of a few types - example a user id

let userId: string | number;
userId = 123;
userId = "xx722828202";
userId = false; // ts error not string or number
// both are okay - no ts errors

let userId2: string | number | boolean;
userId2 = 123;
userId2 = "xx722828202";
userId2 = false; // no ts errors

// Object types with ts

let user: object;
user = {
  name: "Steve",
  age: 25,
  isStudent: false,
};

// above is okay but no hints regarding structure of object - can do better

let userObj: {
  name: string;
  age: number;
  isStudent: boolean;
  id: string | number;
};
// assign to an object with specific structure
// semicolon instead of comma for types

userObj = {
  name: "Steve",
  age: 25,
  isStudent: false,
  // checks for missing types as well - error because id is missing :D
  // id: "xx722828202",
};

// Array types with ts
let hobbies: string[];
hobbies = ["reading", "coding", "swimming"];

let numbers: number[];
numbers = [1, 2, 3, 4, 5];

// can also do it like this

let hobbies2: Array<string>;
hobbies2 = ["reading", "coding", "swimming"];

let data: object[];

// function types with ts
function add(
  a: number,
  b: number
): /* decalre rturn type after parameter list */ number {
  return a + b;
  // use undefined if no return value
  // better type for no return - void
}

function sayHello(name: string): void {
  console.log("Hello" + name);
}

// dealing with a function as a parameter
function calculate(
  a: number,
  b: number,
  callFn: (
    first: number,
    second: number
  ) => number /* alias could be used here */
): number {
  return callFn(a, b);
}

console.log(calculate(10, 20, add));

// using aliases - benefit, reusable

type AddFn = (a: number, b: number) => number;

function calculate2(a: number, b: number, callFn: AddFn): number {
  return callFn(a, b);
}

console.log(calculate2(10, 20, add));

// alias with objects

type User = {
  name: string;
  age: number;
  idNumber: string;
  address: string;
};

const userOne: User = {
  name: "Steve",
  age: 25,
  idNumber: "xx722828202",
  address: "123 Main St",
};

// interfaces are another way to define object types

interface Credentials {
  username: string;
  password: string;
}

const creds: Credentials = {
  username: "steve",
  password: "password",
};

// when type or interface
// type can generally be used anywhere
// interface is more limited to object types - cant be used for union types, etc

// merging types

type Admin = {
  name: string;
  age: number;
  permissions: string[];
};

type AppUser = {
  name: string;
  age: number;
  id: string;
};

// app admin should be combination of both
type AppAdmin = Admin & AppUser;

let admin: AppAdmin = {
  name: "Steve",
  age: 25,
  permissions: ["create", "update"],
  id: "xx722828202",
};

// being specific with literals
// want a type to be a of a certain type and a certain value

let status: "success" | "error"; // only two possible values of type string
status = "success";

// "Type Guards" (i.e., if statements that check which concrete type is being used)
// when using "Type Guards" TS performs "Type Narrowing".

function combine(a: number | string, b: number | string) {
  if (typeof a === "number" && typeof b === "number") {
    // above is a type guard
    // TypeScript narrows the types of a & b from "either a number or a string" down to "definitely a number" - what the if condition checks for
    // only returns true if both a and b are numbers
    // then return sum of a and b
    return a + b;
  }

  // After the if statement, TypeScript understands that a and b are again either a number or a string"
  // because we only make it into the if statement if both are of type number.
  // if both not numbers, return a concatenated with b
  return `${a} ${b}`;
}

/* Important: You can NOT check if a value meets the definition of a custom type (type alias) or interface type. These are TypeScript-specific features for which no JavaScript equivalent exists. Therefore, since those if checks need to run at runtime, you can't write any code that would be able to check for those types at runtime.

For example, the below code won't work because the User type does not exist once the code is compiled to JavaScript:

type User = {
  name: string;
  age: number;
};
 
type Admin = {
  name: string;
  age: number;
  permissions: string[];
};
 
function login(u: User | Admin) {
  if (typeof u === User) {
    // do something
  }
}
But you could check for the existence of the permissions property since only the Admin object will have one:

function login(u: User | Admin) {
  if ('permissions' in u) {
    // do something
  }
}
That code would work at runtime. */

// Generics in TypeScript

// declare a type that is fixed to a certain value - just example
type Role = "admin" | "user" | "guest";

let roles: Array<Role> = ["admin", "user", "guest"]; // array is of type Role - can only be one of the three values
// Array is the generic type here
// could also right above like this Role[] // but dont access the generic built in array type

// able to build own generic types in TS
// generic type is a type that is flexible regarding the value it holds
type DataStorage<T> = {
  data: T[];
  addItem: (item: T) => void;
  removeItem: (item: T) => void;
};

// data attribute can be of any type - could be strings, numbers, objects, etc
// only know at the time of implementation / retrieval
// add T as a placeholder for the type taken in by the DataStorage generic type

// when making a new instance of DataStorage, specify the type
const textStorage: DataStorage<string> = {
  data: ["one", "two", "three"],
  addItem(item: string) {
    this.data.push(item);
  },
  removeItem(item: string) {
    this.data.splice(this.data.indexOf(item), 1);
  },
};

const userStorage: DataStorage<User> = {
  data: [userOne],
  addItem(item: User) {
    this.data.push(item);
  },
  removeItem(item: User) {
    this.data.splice(this.data.indexOf(item), 1);
  },
};
