https://stackoverflow.com/questions/35578478/array-prototype-fill-with-object-passes-reference-and-not-new-instance

# Day 9

Array.fill() sets each element to the same instance of the value

```js
const rope = Array(10).fill([0, 0]);
```

Array.from({length: ARRAY_LENGTH}, () => value) makes a unique instance of the value for each element

```js
const rope = Array.from({ length: 10 }, () => [0, 0]);
```

For loop is faster but less nice syntax

```js
const value = [];
const size = 10;
const arr = new Array(size);
for (var i = 0; i < size; i++) {
  arr[i] = value;
}
```
