// Fisher-Yates shuffle http://stackoverflow.com/a/6274398/369171
function shuffle(array) {
  var counter = array.length, temp, index;

  // While there are elements in the array
  while (counter > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
  }

  return array;
}

function RNGUniqueInRange(minInclusive, maxExclusive) {
  this.min = minInclusive;
  this.max = maxExclusive;
  this.randoms = [];
}

RNGUniqueInRange.prototype._fillRandoms = function() {
  for (var i = this.min; i < this.max; ++i) {
    this.randoms.push(i);
  }

  shuffle(this.randoms);
};

RNGUniqueInRange.prototype.next = function() {
  if (this.randoms.length === 0) {
    this._fillRandoms();
  }

  return this.randoms.pop();
};

function getRandomToy($toys, rng) {
  return $toys.eq(rng.next());
}

function highlightToyInList($toy) {
  $toy.addClass('toy--selected');
}

function clearSelectedToy($toys) {
  $toys.removeClass('toy--selected');
}

function displayToy($toy) {
  $('.js-selected-toy').text($toy.text());
}

$(function() {
  var $toys = $('.js-list li');
  var rng = new RNGUniqueInRange(0, $toys.length);

  $('.js-select-btn').click(function() {
    var $toy = getRandomToy($toys, rng);
    clearSelectedToy($toys);
    highlightToyInList($toy);
    displayToy($toy);
  });
});
