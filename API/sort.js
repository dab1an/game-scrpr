import { itemList } from "./scraper";

function swap(itemList, leftIndex, rightIndex) {
  var temp = itemList[leftIndex];
  itemList[leftIndex] = itemList[rightIndex];
  itemList[rightIndex] = temp;
}

function partition(itemList, l, r) {
  var pivot = itemList[Math.floor((r + l) / 2)], //middle element
    i = l, //l pointer
    j = r; //r pointer
  while (i <= j) {
    while (itemList[i] < pivot) {
      i++;
    }
    while (itemList[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(itemList, i, j); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(itemList, l, r) {
  var index;
  if (itemList.length > 1) {
    index = partition(itemList, l, r); //index returned from partition
    if (l < index - 1) {
      //more elements on the l side of the pivot
      quickSort(itemList, l, index - 1);
    }
    if (index < r) {
      //more elements on the r side of the pivot
      quickSort(itemList, index, r);
    }
  }
  return itemList;
}
