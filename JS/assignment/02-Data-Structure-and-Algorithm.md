# 자료 구조와 알고리즘

**1.1 선형검색**

- 선형 검색(linear search)은 배열의 각 요소를 한 인덱스씩 순차적으로 접근하면서 동작한다.
- 선형 검색은 배열의 정렬 여부와 상관없이 동작하는 장점이 있지만, 배열의 모든 요소를 확인해야 하는 단점이 있다.
- 시간 복잡도: O(n)

선형 검색을 통해 주어진 배열(array)에 주어진 값(target)이 요소로 존재하는지 확인하여 존재하는 경우 해당 인덱스를 반환하고 존재하지 않는 경우 -1을 반환하는 함수를 구현하라. 단, 어떠한 빌트인 함수도 사용하지 않고 for 문을 사용하여 구현하여야 한다.

```javascript
function linearSearch(array, target) {
  let index = -1;
  const length = array.length; // const [ length ] = array.length;
  for (let i = 0; i < length; i++) {
    if (array[i] === target) index = i;
  }
  return index;
}

console.log(linearSearch([1, 2, 3, 4, 5, 6], 1)); // 0
console.log(linearSearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(linearSearch([1, 2, 3, 4, 5, 6], 5)); // 4
console.log(linearSearch([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(linearSearch([1, 2, 3, 4, 5, 6], -1)); // -1
console.log(linearSearch([1, 2, 3, 4, 5, 6], 0)); // -1
console.log(linearSearch([1, 2, 3, 4, 5, 6], 7)); // -1
```

&nbsp;

**1.2  이진 검색**

- 이진 검색(binary search)은 선형 검색과는 달리 **정렬된 배열에서만 동작**한다.
- 선형 검색은 배열의 모든 요소를 확인해야 하지만 이진 검색은 중간값과 검색 대상 값을 비교하여 검색 범위를 매번 반으로 줄여 나간다.
  - 검색 대상 값이 중간값보다 작은 경우 중간값보다 작은 쪽(왼쪽)을 검색 범위로 한정한다.
  - 검색 대상 값이 중간값보다 큰 경우 중간값보다 큰 쪽(오른쪽)을 검색 범위로 한정한다.
  - 검색 대상 값을 검색할 때까지 이와 같은 처러를 반복한다.
- 시간 복잡도: O(log n)

&nbsp;

이진 검색을 통해 주어진 배열(array)에 주어진 값(target)이 요소로 존재하는지 확인하여 존재하는 경우 해당 인덱스를 반환하고 존재하지 않는 경우 -1을 반환하는 함수를 구현하라. 단, 아래의 빌트인 함수 이외에는 어떤 빌트인 함수도 사용하지 않아야 하며, while 문을 사용하여 구현하여야 한다.

- [Math.floor](https://poiemaweb.com/js-math#24-mathfloorx-number-number-es1): 전달받은 인수의 소수점 이하를 내림한 정수를 반환한다.

```javascript
function binarySearch(array, target) {
  let index = -1;
  let frist = array[0];
  let last = array.length;
  function medianFloor(x, y) {
    return Math.floor((x + y) / 2);
  }
  while (target >= frist && target <= last) {
    if (target === frist || target === last) {
      index = target - 1;
      break;
    } else if (medianFloor(frist, last) > target) {
      last = medianFloor(frist, last);
    } else if (medianFloor(frist, last) < target) {
      frist = medianFloor(frist, last);
    } else if (medianFloor(frist, last) === target) {
      index = target - 1;
      break;
    }
  }
  return index;
}
console.log(binarySearch([1, 2, 3, 4, 5, 6], 1)); // 0
console.log(binarySearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(binarySearch([1, 2, 3, 4, 5, 6], 5)); // 4
console.log(binarySearch([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(binarySearch([1, 2, 3, 4, 5, 6], -1)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 0)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 7)); // -1
```



```javascript
function binarySearch(array, target) {
  let count = 0;
  let frist = array[0];
  let last = array.length;
  function medianFloor(x, y) {
    return Math.floor((x + y) / 2);
  }
  if (target < frist || target > last) count = -1;
  while (target >= frist && target <= last) {
    if (medianFloor(frist, last) > target) {
      last = medianFloor(frist, last);
      count++;
    } else if (medianFloor(frist, last) < target) {
      frist = medianFloor(frist, last);
      count++;
      if (medianFloor(frist, last) + 1 === target) {
        count += 2;
        break;
      }
    } else if (medianFloor(frist, last) === target) {
      count++;
      break;
    }
  }
  return count;
}
console.log(binarySearch([1, 2, 3, 4, 5, 6], 1)); // 3
console.log(binarySearch([1, 2, 3, 4, 5, 6], 3)); // 1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 5)); // 3
console.log(binarySearch([1, 2, 3, 4, 5, 6], 6)); // 4
console.log(binarySearch([1, 2, 3, 4, 5, 6], -1)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 0)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 7)); // -1
```

&nbsp;

**2.1 버블 정렬**

- 버블 정렬(buble sort)은 순차적으로 배열을 순회하면서 인접한 두 요소를 비교하여 작은 요소를 왼쪽으로, 큰 요소를 오른쪽으로 교환한다.
- 버블 정렬은 가장 간단하지만 가장 느린 정렬 알고리즘이다.
- 시간 복잡도: O(n2)

&nbsp;

버블 정렬을 통해 주어진 배열(array)을 정렬하는 함수를 구현하라. 단, 어떠한 빌트인 함수도 사용하지 않고 for 문을 사용하여 구현하여야 한다.

```javascript
function bubbleSort(array) {
  const length = array.length;
  let left = 0;
  let right = 0;
  for (let i = 1; i < length; i++) {
    for (let j = 0; j < length - i; j++) {
      if (array[j] > array[j + 1]) {
        left = array[j];
        right = array[j + 1];
        array[j] = right;
        array[j + 1] = left;
      }
    }
  }
  return array;
}


console.log(bubbleSort([2, 4, 5, 1, 3]));     // [1, 2, 3, 4, 5]
console.log(bubbleSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]
console.log(bubbleSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
```

&nbsp;

**2.2 선택 정렬**

- 선택 정렬(selection sort)은 배열의 최소값을 검색하여 배열의 왼쪽부터 순차적으로 정렬을 반복하는 정렬 알고리즘이다.
- 배열이 미정렬 상태이므로 최소값 검색에는 이진 검색이 아닌 선형 검색 알고리즘을 사용한다.
- 선택 정렬은 버블 정렬보다 빠르다.
- 시간 복잡도: O(n2)

&nbsp;

선택 정렬을 통해 주어진 배열(array)을 정렬하는 함수를 구현하라. 단, 어떠한 빌트인 함수도 사용하지 않고 for 문을 사용하여 구현하여야 한다.

```javascript
function selectionSort(array) {
  const length = array.length;
  for (let i = 0; i < length - 1; i++) {
    let minValue = Infinity;
    let minIndex;
    for (let j = i + 1; j < length; j++) {
      minValue = array[j] < minValue ? (minValue = array[j]) : minValue;
      minIndex = array[j] === minValue ? (minIndex = j) : minIndex;
    }
    array[minIndex] = array[i] > minValue ? (array[minIndex] = array[i]) : array[minIndex];
    array[i] = array[i] > minValue ? (array[i] = minValue) : array[i];
  }
  return array;
}

console.log(selectionSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
console.log(selectionSort([2, 4, 5, 1, 3]));     // [1, 2, 3, 4, 5]
console.log(selectionSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]
```

&nbsp;

**2.3 삽입 정렬**

- 삽입 정렬(insertion sort)은 인덱스 1부터 왼쪽과 비교하면서 순차적으로 정렬을 반복하는 정렬 알고리즘이다.
- 정렬이 진행됨에 따라 왼쪽에는 정렬이 종료된 값이 모이게 되고, 오른쪽에는 아직 정렬되지 않은 값이 남게 된다.
- 선택 정렬은 최소값 검색이 필요하지만 삽입 정렬은 필요없다.
- 삽입 정렬은 평균 시나리오에서 선택 정렬과 유사하고(데이터 정렬 유형에 따라 차이가 있다) 버블 정렬보다 빠르다.
- 시간 복잡도: O(n2)

&nbsp;

삽입 정렬을 통해 주어진 배열(array)을 정렬하는 함수를 구현하라. 단, 어떠한 빌트인 함수도 사용하지 않고 for 문을 사용하여 구현하여야 한다.

```javascript
function insertionSort(array) {
  const length = array.length;
  let left = 0;
  let right = 0;
  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (array[j] < array[j - 1]) {
        left = array[j];
        right = array[j - 1];
        array[j] = right;
        array[j - 1] = left;
      }
    }
  }
  return array;
}

console.log(insertionSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
console.log(insertionSort([2, 4, 5, 1, 3]));    // [1, 2, 3, 4, 5]
console.log(insertionSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]
```

