
var verbs = ['hack', 'own', 'sell', 'buy', 'destroy', 'save', 'override',
  'datamine', 'surveil', 'monitor', 'countersurveil', 'subvert', 'study',
  'oppress', 'suppress', 'enslave', 'consume', 'censor', 'contain', 'subdue',
  'conceal', 'conquer', 'silence', 'download', 'create', 'bailout', 'wipeout',
  'control']

var nouns = ['planet', 'network', 'internet', 'law', 'government', 'enemy',
  'power core', 'infrastructure', 'airwaves', 'oceans', 'user data', 'future',
  'past', 'moon', 'universe', 'metaverse', 'game', 'media', 'poor', 'rich',
  'banks', 'lawyers', 'sheep', 'privileged', 'disadvantaged', 'people',
  'civilians', 'consciousness', 'consensus']

var text = null
var animateTimeout = null
function makeSentence() {
  return chooseRandom(verbs) + '\nthe\n' + chooseRandom(nouns)
}

function chooseRandom(array) {
  return array[~~(Math.random() * array.length)]
}


function init() {
  text = d3.select('div.text')
  d3.select('body').on('click', function() { reset(0) })
  reset(1000)
}

function reset(delay) {
  var data = text.text()
  text.datum(data)

  var duration = data.length * 50
  text.transition()
    .delay(delay)
    .duration(duration)
    .tween('text', deleteTextTween)
    .each('end', animate)
}


function animate() {
  var sentence = makeSentence()
  var duration = sentence.length * 100
  var delay = 1000
  text.datum(sentence)
    .transition()
    .delay(delay)
    .duration(duration)
    .ease(d3.ease('ease-out'))
    .tween('text', typeWriterTween)
    .each('end', function() {
      text
        .transition()
        .delay(delay)
        .duration(sentence.length * 50)
        .tween('text', deleteTextTween)
        .each('end', animate)
    })
}

function typeWriterTween(d, i) {
  return function (t) {
    this.textContent = d.slice(0, Math.round( t * d.length) );
  };
}
function deleteTextTween(d, i) {
  return function (t) {
    this.textContent = d.slice(0, Math.round( (1 - t) * d.length) );
  };
}


init()