
var verbs = ['hack', 'own', 'sell', 'buy', 'destroy', 'save', 'override',
  'datamine', 'surveil', 'monitor', 'countersurveil', 'subvert', 'study',
  'oppress', 'suppress', 'enslave', 'consume', 'censor', 'subdue', 'control',
  'conceal', 'conquer', 'silence', 'download', 'create', 'bailout', 'wipeout']

var nouns = ['planet', 'network', 'internet', 'law', 'government', 'enemy',
  'power core', 'infrastructure', 'airwaves', 'oceans', 'user data', 'future',
  'past', 'moon', 'universe', 'metaverse', 'game', 'media', 'poor', 'rich',
  'banks', 'lawyers', 'sheep', 'privileged', 'people', 'power',
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
  d3.select('.fullscreen').on('click', fullscreen)
  reset()
}

function reset() {
  var data = text.text()
  text.datum(data)

  var duration = data.length * 50
  text.transition()
    .delay(1000)
    .duration(duration)
    .tween('text', deleteTextTween)
    .each('end', animate)
}


function animate() {
  var typeDuration = 1500
  var delayDuration = 1000
  var deleteDuration = 750

  var timeMod = typeDuration + deleteDuration * 2 + deleteDuration
  var now = Date.now()
  var nowToNearestMod = Math.floor(now / timeMod) * timeMod
  Math.seedrandom(nowToNearestMod)
  var sentence = makeSentence()
  var duration = sentence.length * 100
  text.datum(sentence)
    .transition()
    .delay(delayDuration)
    .duration(typeDuration)
    .ease(d3.ease('ease-out'))
    .tween('text', typeWriterTween)
    .each('end', function() {
      text
        .transition()
        .delay(delayDuration)
        .duration(deleteDuration)
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

function fullscreen() {
  launchIntoFullscreen(document.documentElement)
}
// Find the right method, call on correct element
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

init()