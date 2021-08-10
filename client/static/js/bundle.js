(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {Data, postPoem} = require('./model')

function checkPoem(e) {
    e.preventDefault();
    let title = e.target.poemTitle.value;
    let poem = e.target.userPoem.value;
    let gif = document.querySelector('#selectedGif img')
    gif ? giphyURL = gif.getAttribute('src') : giphyURL = ''
    try {
        postValidity(title, poem)
        postPoem(title, poem, giphyURL)
    } catch (err) {
        let errorMessage = document.createElement('p')
        errorMessage.textContent = err
        document.querySelector('form').appendChild(errorMessage)
        console.log('whoops', err)
        return;
    }
}


function postValidity(title, poem) {
    if (title.length == 0) {
        throw new Error('please enter a title')
    }
    if (poem.length == 0) {
        throw new Error(`you haven't written your poem yet!`)
    }
}

async function fetchGif(userInput) {
    const APIKEY = '1GZ3I3ZbWKLBCfC7UFrN1yWVhQkONQ32'
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${userInput}&rating=pg-13&limit=5`
    let response = await fetch(url)
        .then(resp => resp.json())
        .then(content => {
            console.log(content.data[0].images.fixed_height.url)
            return content;
        })
        .catch(err => {
            console.log(err)
        })
    return response
}

module.exports = { fetchGif, postPoem, checkPoem }

},{"./model":2}],2:[function(require,module,exports){
const {adjectives, animals} = require('./nameData')

let formatDate = () => {
    let today = new Date()
    let yyyy = today.getFullYear()
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    return `${dd}${mm}${yyyy}`;
}

let randomName = () => {
    let randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    let randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    return `${randomAdjective} ${randomAnimal}`
}

class Data {
    constructor(title, poem){
        this.author = randomName();
        this.title = title;
        this.text = poem;
        this.gifURL = giphyURL;
        this.date = formatDate();
    }
}

function makeElement(element, type, id, value='') {
    newElement = document.createElement(element)
    newElement.setAttribute('type', type);
    newElement.setAttribute('id', id);
    newElement.setAttribute('value', value);
    return newElement;
}

function postPoem(title, poem, giphyURL) {
    let data = new Data(title, poem, giphyURL)
    fetch('https://hakema-server.herokuapp.com/posts', {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }
    })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}


module.exports = { Data, makeElement, formatDate, postPoem, randomName }

},{"./nameData":3}],3:[function(require,module,exports){
let animals =
    [
        "Aardvark",
        "Albatross",
        "Alligator",
        "Alpaca",
        "Ant",
        "Anteater",
        "Antelope",
        "Ape",
        "Armadillo",
        "Donkey",
        "Baboon",
        "Badger",
        "Barracuda",
        "Bat",
        "Bear",
        "Beaver",
        "Bee",
        "Bison",
        "Boar",
        "Buffalo",
        "Butterfly",
        "Camel",
        "Capybara",
        "Caribou",
        "Cassowary",
        "Cat",
        "Caterpillar",
        "Cattle",
        "Chamois",
        "Cheetah",
        "Chicken",
        "Chimpanzee",
        "Chinchilla",
        "Chough",
        "Clam",
        "Cobra",
        "Cockroach",
        "Cod",
        "Cormorant",
        "Coyote",
        "Crab",
        "Crane",
        "Crocodile",
        "Crow",
        "Curlew",
        "Deer",
        "Dinosaur",
        "Dog",
        "Dogfish",
        "Dolphin",
        "Dotterel",
        "Dove",
        "Dragonfly",
        "Duck",
        "Dugong",
        "Dunlin",
        "Eagle",
        "Echidna",
        "Eel",
        "Eland",
        "Elephant",
        "Elk",
        "Emu",
        "Falcon",
        "Ferret",
        "Finch",
        "Fish",
        "Flamingo",
        "Fly",
        "Fox",
        "Frog",
        "Gaur",
        "Gazelle",
        "Gerbil",
        "Giraffe",
        "Gnat",
        "Gnu",
        "Goat",
        "Goldfinch",
        "Goldfish",
        "Goose",
        "Gorilla",
        "Goshawk",
        "Grasshopper",
        "Grouse",
        "Guanaco",
        "Gull",
        "Hamster",
        "Hare",
        "Hawk",
        "Hedgehog",
        "Heron",
        "Herring",
        "Hippopotamus",
        "Hornet",
        "Horse",
        "Human",
        "Hummingbird",
        "Hyena",
        "Ibex",
        "Ibis",
        "Jackal",
        "Jaguar",
        "Jay",
        "Jellyfish",
        "Kangaroo",
        "Kingfisher",
        "Koala",
        "Kookabura",
        "Kouprey",
        "Kudu",
        "Lapwing",
        "Lark",
        "Lemur",
        "Leopard",
        "Lion",
        "Llama",
        "Lobster",
        "Locust",
        "Loris",
        "Louse",
        "Lyrebird",
        "Magpie",
        "Mallard",
        "Manatee",
        "Mandrill",
        "Mantis",
        "Marten",
        "Meerkat",
        "Mink",
        "Mole",
        "Mongoose",
        "Monkey",
        "Moose",
        "Mosquito",
        "Mouse",
        "Mule",
        "Narwhal",
        "Newt",
        "Nightingale",
        "Octopus",
        "Okapi",
        "Opossum",
        "Oryx",
        "Ostrich",
        "Otter",
        "Owl",
        "Oyster",
        "Panther",
        "Parrot",
        "Partridge",
        "Peafowl",
        "Pelican",
        "Penguin",
        "Pheasant",
        "Pig",
        "Pigeon",
        "Pony",
        "Porcupine",
        "Porpoise",
        "Quail",
        "Quelea",
        "Quetzal",
        "Rabbit",
        "Raccoon",
        "Rail",
        "Ram",
        "Rat",
        "Raven",
        "Reindeer",
        "Rhinoceros",
        "Rook",
        "Salamander",
        "Salmon",
        "Sandpiper",
        "Sardine",
        "Scorpion",
        "Seahorse",
        "Seal",
        "Shark",
        "Sheep",
        "Shrew",
        "Skunk",
        "Snail",
        "Snake",
        "Sparrow",
        "Spider",
        "Spoonbill",
        "Squid",
        "Squirrel",
        "Starling",
        "Stingray",
        "Stinkbug",
        "Stork",
        "Swallow",
        "Swan",
        "Tapir",
        "Tarsier",
        "Termite",
        "Tiger",
        "Toad",
        "Trout",
        "Turkey",
        "Turtle",
        "Viper",
        "Vulture",
        "Wallaby",
        "Walrus",
        "Wasp",
        "Weasel",
        "Whale",
        "Wildcat",
        "Wolf",
        "Wolverine",
        "Wombat",
        "Woodcock",
        "Woodpecker",
        "Worm",
        "Wren",
        "Yak",
        "Zebra"
    ]

let adjectives =
    [
        "abandoned",
        "able",
        "absolute",
        "adorable",
        "adventurous",
        "academic",
        "acceptable",
        "acclaimed",
        "accomplished",
        "accurate",
        "aching",
        "acidic",
        "acrobatic",
        "active",
        "actual",
        "adept",
        "admirable",
        "admired",
        "adolescent",
        "adorable",
        "adored",
        "advanced",
        "afraid",
        "affectionate",
        "aged",
        "aggravating",
        "aggressive",
        "agile",
        "agitated",
        "agonizing",
        "agreeable",
        "ajar",
        "alarmed",
        "alarming",
        "alert",
        "alienated",
        "alive",
        "all",
        "altruistic",
        "amazing",
        "ambitious",
        "ample",
        "amused",
        "amusing",
        "anchored",
        "ancient",
        "angelic",
        "angry",
        "anguished",
        "animated",
        "annual",
        "another",
        "antique",
        "anxious",
        "any",
        "apprehensive",
        "appropriate",
        "apt",
        "arctic",
        "arid",
        "aromatic",
        "artistic",
        "ashamed",
        "assured",
        "astonishing",
        "athletic",
        "attached",
        "attentive",
        "attractive",
        "austere",
        "authentic",
        "authorized",
        "automatic",
        "avaricious",
        "average",
        "aware",
        "awesome",
        "awful",
        "awkward",
        "babyish",
        "bad",
        "back",
        "baggy",
        "bare",
        "barren",
        "basic",
        "beautiful",
        "belated",
        "beloved",
        "beneficial",
        "better",
        "best",
        "bewitched",
        "big",
        "big-hearted",
        "biodegradable",
        "bite-sized",
        "bitter",
        "black",
        "black-and-white",
        "bland",
        "blank",
        "blaring",
        "bleak",
        "blind",
        "blissful",
        "blond",
        "blue",
        "blushing",
        "bogus",
        "boiling",
        "bold",
        "bony",
        "boring",
        "bossy",
        "both",
        "bouncy",
        "bountiful",
        "bowed",
        "brave",
        "breakable",
        "brief",
        "bright",
        "brilliant",
        "brisk",
        "broken",
        "bronze",
        "brown",
        "bruised",
        "bubbly",
        "bulky",
        "bumpy",
        "buoyant",
        "burdensome",
        "burly",
        "bustling",
        "busy",
        "buttery",
        "buzzing",
        "calculating",
        "calm",
        "candid",
        "canine",
        "capital",
        "carefree",
        "careful",
        "careless",
        "caring",
        "cautious",
        "cavernous",
        "celebrated",
        "charming",
        "cheap",
        "cheerful",
        "cheery",
        "chief",
        "chilly",
        "chubby",
        "circular",
        "classic",
        "clean",
        "clear",
        "clear-cut",
        "clever",
        "close",
        "closed",
        "cloudy",
        "clueless",
        "clumsy",
        "cluttered",
        "coarse",
        "cold",
        "colorful",
        "colorless",
        "colossal",
        "comfortable",
        "common",
        "compassionate",
        "competent",
        "complete",
        "complex",
        "complicated",
        "composed",
        "concerned",
        "concrete",
        "confused",
        "conscious",
        "considerate",
        "constant",
        "content",
        "conventional",
        "cooked",
        "cool",
        "cooperative",
        "coordinated",
        "corny",
        "corrupt",
        "costly",
        "courageous",
        "courteous",
        "crafty",
        "crazy",
        "creamy",
        "creative",
        "creepy",
        "criminal",
        "crisp",
        "critical",
        "crooked",
        "crowded",
        "cruel",
        "crushing",
        "cuddly",
        "cultivated",
        "cultured",
        "cumbersome",
        "curly",
        "curvy",
        "cute",
        "cylindrical",
        "damaged",
        "damp",
        "dangerous",
        "dapper",
        "daring",
        "darling",
        "dark",
        "dazzling",
        "dead",
        "deadly",
        "deafening",
        "dear",
        "dearest",
        "decent",
        "decimal",
        "decisive",
        "deep",
        "defenseless",
        "defensive",
        "defiant",
        "deficient",
        "definite",
        "definitive",
        "delayed",
        "delectable",
        "delicious",
        "delightful",
        "delirious",
        "demanding",
        "dense",
        "dental",
        "dependable",
        "dependent",
        "descriptive",
        "deserted",
        "detailed",
        "determined",
        "devoted",
        "different",
        "difficult",
        "digital",
        "diligent",
        "dim",
        "dimpled",
        "dimwitted",
        "direct",
        "disastrous",
        "discrete",
        "disfigured",
        "disgusting",
        "disloyal",
        "dismal",
        "distant",
        "downright",
        "dreary",
        "dirty",
        "disguised",
        "dishonest",
        "dismal",
        "distant",
        "distinct",
        "distorted",
        "dizzy",
        "dopey",
        "doting",
        "double",
        "downright",
        "drab",
        "drafty",
        "dramatic",
        "dreary",
        "droopy",
        "dry",
        "dual",
        "dull",
        "dutiful",
        "each",
        "eager",
        "earnest",
        "early",
        "easy",
        "easy-going",
        "ecstatic",
        "edible",
        "educated",
        "elaborate",
        "elastic",
        "elated",
        "elderly",
        "electric",
        "elegant",
        "elementary",
        "elliptical",
        "embarrassed",
        "embellished",
        "eminent",
        "emotional",
        "empty",
        "enchanted",
        "enchanting",
        "energetic",
        "enlightened",
        "enormous",
        "enraged",
        "entire",
        "envious",
        "equal",
        "equatorial",
        "essential",
        "esteemed",
        "ethical",
        "euphoric",
        "even",
        "evergreen",
        "everlasting",
        "every",
        "evil",
        "exalted",
        "excellent",
        "exemplary",
        "exhausted",
        "excitable",
        "excited",
        "exciting",
        "exotic",
        "expensive",
        "experienced",
        "expert",
        "extraneous",
        "extroverted",
        "extra-large",
        "extra-small",
        "fabulous",
        "failing",
        "faint",
        "fair",
        "faithful",
        "fake",
        "false",
        "familiar",
        "famous",
        "fancy",
        "fantastic",
        "far",
        "faraway",
        "far-flung",
        "far-off",
        "fast",
        "fat",
        "fatal",
        "fatherly",
        "favorable",
        "favorite",
        "fearful",
        "fearless",
        "feisty",
        "feline",
        "female",
        "feminine",
        "few",
        "fickle",
        "filthy",
        "fine",
        "finished",
        "firm",
        "first",
        "firsthand",
        "fitting",
        "fixed",
        "flaky",
        "flamboyant",
        "flashy",
        "flat",
        "flawed",
        "flawless",
        "flickering",
        "flimsy",
        "flippant",
        "flowery",
        "fluffy",
        "fluid",
        "flustered",
        "focused",
        "fond",
        "foolhardy",
        "foolish",
        "forceful",
        "forked",
        "formal",
        "forsaken",
        "forthright",
        "fortunate",
        "fragrant",
        "frail",
        "frank",
        "frayed",
        "free",
        "French",
        "fresh",
        "frequent",
        "friendly",
        "frightened",
        "frightening",
        "frigid",
        "frilly",
        "frizzy",
        "frivolous",
        "front",
        "frosty",
        "frozen",
        "frugal",
        "fruitful",
        "full",
        "fumbling",
        "functional",
        "funny",
        "fussy",
        "fuzzy",
        "gargantuan",
        "gaseous",
        "general",
        "generous",
        "gentle",
        "genuine",
        "giant",
        "giddy",
        "gigantic",
        "gifted",
        "giving",
        "glamorous",
        "glaring",
        "glass",
        "gleaming",
        "gleeful",
        "glistening",
        "glittering",
        "gloomy",
        "glorious",
        "glossy",
        "glum",
        "golden",
        "good",
        "good-natured",
        "gorgeous",
        "graceful",
        "gracious",
        "grand",
        "grandiose",
        "granular",
        "grateful",
        "grave",
        "gray",
        "great",
        "greedy",
        "green",
        "gregarious",
        "grim",
        "grimy",
        "gripping",
        "grizzled",
        "gross",
        "grotesque",
        "grouchy",
        "grounded",
        "growing",
        "growling",
        "grown",
        "grubby",
        "gruesome",
        "grumpy",
        "guilty",
        "gullible",
        "gummy",
        "hairy",
        "half",
        "handmade",
        "handsome",
        "handy",
        "happy",
        "happy-go-lucky",
        "hard",
        "hard-to-find",
        "harmful",
        "harmless",
        "harmonious",
        "harsh",
        "hasty",
        "hateful",
        "haunting",
        "healthy",
        "heartfelt",
        "hearty",
        "heavenly",
        "heavy",
        "hefty",
        "helpful",
        "helpless",
        "hidden",
        "hideous",
        "high",
        "high-level",
        "hilarious",
        "hoarse",
        "hollow",
        "homely",
        "honest",
        "honorable",
        "honored",
        "hopeful",
        "horrible",
        "hospitable",
        "hot",
        "huge",
        "humble",
        "humiliating",
        "humming",
        "humongous",
        "hungry",
        "hurtful",
        "husky",
        "icky",
        "icy",
        "ideal",
        "idealistic",
        "identical",
        "idle",
        "idiotic",
        "idolized",
        "ignorant",
        "ill",
        "illegal",
        "ill-fated",
        "ill-informed",
        "illiterate",
        "illustrious",
        "imaginary",
        "imaginative",
        "immaculate",
        "immaterial",
        "immediate",
        "immense",
        "impassioned",
        "impeccable",
        "impartial",
        "imperfect",
        "imperturbable",
        "impish",
        "impolite",
        "important",
        "impossible",
        "impractical",
        "impressionable",
        "impressive",
        "improbable",
        "impure",
        "inborn",
        "incomparable",
        "incompatible",
        "incomplete",
        "inconsequential",
        "incredible",
        "indelible",
        "inexperienced",
        "indolent",
        "infamous",
        "infantile",
        "infatuated",
        "inferior",
        "infinite",
        "informal",
        "innocent",
        "insecure",
        "insidious",
        "insignificant",
        "insistent",
        "instructive",
        "insubstantial",
        "intelligent",
        "intent",
        "intentional",
        "interesting",
        "internal",
        "international",
        "intrepid",
        "ironclad",
        "irresponsible",
        "irritating",
        "itchy",
        "jaded",
        "jagged",
        "jam-packed",
        "jaunty",
        "jealous",
        "jittery",
        "joint",
        "jolly",
        "jovial",
        "joyful",
        "joyous",
        "jubilant",
        "judicious",
        "juicy",
        "jumbo",
        "junior",
        "jumpy",
        "juvenile",
        "kaleidoscopic",
        "keen",
        "key",
        "kind",
        "kindhearted",
        "kindly",
        "klutzy",
        "knobby",
        "knotty",
        "knowledgeable",
        "knowing",
        "known",
        "kooky",
        "kosher",
        "lame",
        "lanky",
        "large",
        "last",
        "lasting",
        "late",
        "lavish",
        "lawful",
        "lazy",
        "leading",
        "lean",
        "leafy",
        "left",
        "legal",
        "legitimate",
        "light",
        "lighthearted",
        "likable",
        "likely",
        "limited",
        "limp",
        "limping",
        "linear",
        "lined",
        "liquid",
        "little",
        "live",
        "lively",
        "livid",
        "loathsome",
        "lone",
        "lonely",
        "long",
        "long-term",
        "loose",
        "lopsided",
        "lost",
        "loud",
        "lovable",
        "lovely",
        "loving",
        "low",
        "loyal",
        "lucky",
        "lumbering",
        "luminous",
        "lumpy",
        "lustrous",
        "luxurious",
        "mad",
        "made-up",
        "magnificent",
        "majestic",
        "major",
        "male",
        "mammoth",
        "married",
        "marvelous",
        "masculine",
        "massive",
        "mature",
        "meager",
        "mealy",
        "mean",
        "measly",
        "meaty",
        "medical",
        "mediocre",
        "medium",
        "meek",
        "mellow",
        "melodic",
        "memorable",
        "menacing",
        "merry",
        "messy",
        "metallic",
        "mild",
        "milky",
        "mindless",
        "miniature",
        "minor",
        "minty",
        "miserable",
        "miserly",
        "misguided",
        "misty",
        "mixed",
        "modern",
        "modest",
        "moist",
        "monstrous",
        "monthly",
        "monumental",
        "moral",
        "mortified",
        "motherly",
        "motionless",
        "mountainous",
        "muddy",
        "muffled",
        "multicolored",
        "mundane",
        "murky",
        "mushy",
        "musty",
        "muted",
        "mysterious",
        "naive",
        "narrow",
        "nasty",
        "natural",
        "naughty",
        "nautical",
        "near",
        "neat",
        "necessary",
        "needy",
        "negative",
        "neglected",
        "negligible",
        "neighboring",
        "nervous",
        "new",
        "next",
        "nice",
        "nifty",
        "nimble",
        "nippy",
        "nocturnal",
        "noisy",
        "nonstop",
        "normal",
        "notable",
        "noted",
        "noteworthy",
        "novel",
        "noxious",
        "numb",
        "nutritious",
        "nutty",
        "obedient",
        "obese",
        "oblong",
        "oily",
        "oblong",
        "obvious",
        "occasional",
        "odd",
        "oddball",
        "offbeat",
        "offensive",
        "official",
        "old",
        "old-fashioned",
        "only",
        "open",
        "optimal",
        "optimistic",
        "opulent",
        "orange",
        "orderly",
        "organic",
        "ornate",
        "ornery",
        "ordinary",
        "original",
        "other",
        "our",
        "outlying",
        "outgoing",
        "outlandish",
        "outrageous",
        "outstanding",
        "oval",
        "overcooked",
        "overdue",
        "overjoyed",
        "overlooked",
        "palatable",
        "pale",
        "paltry",
        "parallel",
        "parched",
        "partial",
        "passionate",
        "past",
        "pastel",
        "peaceful",
        "peppery",
        "perfect",
        "perfumed",
        "periodic",
        "perky",
        "personal",
        "pertinent",
        "pesky",
        "pessimistic",
        "petty",
        "phony",
        "physical",
        "piercing",
        "pink",
        "pitiful",
        "plain",
        "plaintive",
        "plastic",
        "playful",
        "pleasant",
        "pleased",
        "pleasing",
        "plump",
        "plush",
        "polished",
        "polite",
        "political",
        "pointed",
        "pointless",
        "poised",
        "poor",
        "popular",
        "portly",
        "posh",
        "positive",
        "possible",
        "potable",
        "powerful",
        "powerless",
        "practical",
        "precious",
        "present",
        "prestigious",
        "pretty",
        "precious",
        "previous",
        "pricey",
        "prickly",
        "primary",
        "prime",
        "pristine",
        "private",
        "prize",
        "probable",
        "productive",
        "profitable",
        "profuse",
        "proper",
        "proud",
        "prudent",
        "punctual",
        "pungent",
        "puny",
        "pure",
        "purple",
        "pushy",
        "putrid",
        "puzzled",
        "puzzling",
        "quaint",
        "qualified",
        "quarrelsome",
        "quarterly",
        "queasy",
        "querulous",
        "questionable",
        "quick",
        "quick-witted",
        "quiet",
        "quintessential",
        "quirky",
        "quixotic",
        "quizzical",
        "radiant",
        "ragged",
        "rapid",
        "rare",
        "rash",
        "raw",
        "recent",
        "reckless",
        "rectangular",
        "ready",
        "real",
        "realistic",
        "reasonable",
        "red",
        "reflecting",
        "regal",
        "regular",
        "reliable",
        "relieved",
        "remarkable",
        "remorseful",
        "remote",
        "repentant",
        "required",
        "respectful",
        "responsible",
        "repulsive",
        "revolving",
        "rewarding",
        "rich",
        "rigid",
        "right",
        "ringed",
        "ripe",
        "roasted",
        "robust",
        "rosy",
        "rotating",
        "rotten",
        "rough",
        "round",
        "rowdy",
        "royal",
        "rubbery",
        "rundown",
        "ruddy",
        "rude",
        "runny",
        "rural",
        "rusty",
        "sad",
        "safe",
        "salty",
        "same",
        "sandy",
        "sane",
        "sarcastic",
        "sardonic",
        "satisfied",
        "scaly",
        "scarce",
        "scared",
        "scary",
        "scented",
        "scholarly",
        "scientific",
        "scornful",
        "scratchy",
        "scrawny",
        "second",
        "secondary",
        "second-hand",
        "secret",
        "self-assured",
        "self-reliant",
        "selfish",
        "sentimental",
        "separate",
        "serene",
        "serious",
        "serpentine",
        "several",
        "severe",
        "shabby",
        "shadowy",
        "shady",
        "shallow",
        "shameful",
        "shameless",
        "sharp",
        "shimmering",
        "shiny",
        "shocked",
        "shocking",
        "shoddy",
        "short",
        "short-term",
        "showy",
        "shrill",
        "shy",
        "sick",
        "silent",
        "silky",
        "silly",
        "silver",
        "similar",
        "simple",
        "simplistic",
        "sinful",
        "single",
        "sizzling",
        "skeletal",
        "skinny",
        "sleepy",
        "slight",
        "slim",
        "slimy",
        "slippery",
        "slow",
        "slushy",
        "small",
        "smart",
        "smoggy",
        "smooth",
        "smug",
        "snappy",
        "snarling",
        "sneaky",
        "sniveling",
        "snoopy",
        "sociable",
        "soft",
        "soggy",
        "solid",
        "somber",
        "some",
        "spherical",
        "sophisticated",
        "sore",
        "sorrowful",
        "soulful",
        "soupy",
        "sour",
        "Spanish",
        "sparkling",
        "sparse",
        "specific",
        "spectacular",
        "speedy",
        "spicy",
        "spiffy",
        "spirited",
        "spiteful",
        "splendid",
        "spotless",
        "spotted",
        "spry",
        "square",
        "squeaky",
        "squiggly",
        "stable",
        "staid",
        "stained",
        "stale",
        "standard",
        "starchy",
        "stark",
        "starry",
        "steep",
        "sticky",
        "stiff",
        "stimulating",
        "stingy",
        "stormy",
        "straight",
        "strange",
        "steel",
        "strict",
        "strident",
        "striking",
        "striped",
        "strong",
        "studious",
        "stunning",
        "stupendous",
        "stupid",
        "sturdy",
        "stylish",
        "subdued",
        "submissive",
        "substantial",
        "subtle",
        "suburban",
        "sudden",
        "sugary",
        "sunny",
        "super",
        "superb",
        "superficial",
        "superior",
        "supportive",
        "sure-footed",
        "surprised",
        "suspicious",
        "svelte",
        "sweaty",
        "sweet",
        "sweltering",
        "swift",
        "sympathetic",
        "tall",
        "talkative",
        "tame",
        "tan",
        "tangible",
        "tart",
        "tasty",
        "tattered",
        "taut",
        "tedious",
        "teeming",
        "tempting",
        "tender",
        "tense",
        "tepid",
        "terrible",
        "terrific",
        "testy",
        "thankful",
        "that",
        "these",
        "thick",
        "thin",
        "third",
        "thirsty",
        "this",
        "thorough",
        "thorny",
        "those",
        "thoughtful",
        "threadbare",
        "thrifty",
        "thunderous",
        "tidy",
        "tight",
        "timely",
        "tinted",
        "tiny",
        "tired",
        "torn",
        "total",
        "tough",
        "traumatic",
        "treasured",
        "tremendous",
        "tragic",
        "trained",
        "tremendous",
        "triangular",
        "tricky",
        "trifling",
        "trim",
        "trivial",
        "troubled",
        "true",
        "trusting",
        "trustworthy",
        "trusty",
        "truthful",
        "tubby",
        "turbulent",
        "twin",
        "ugly",
        "ultimate",
        "unacceptable",
        "unaware",
        "uncomfortable",
        "uncommon",
        "unconscious",
        "understated",
        "unequaled",
        "uneven",
        "unfinished",
        "unfit",
        "unfolded",
        "unfortunate",
        "unhappy",
        "unhealthy",
        "uniform",
        "unimportant",
        "unique",
        "united",
        "unkempt",
        "unknown",
        "unlawful",
        "unlined",
        "unlucky",
        "unnatural",
        "unpleasant",
        "unrealistic",
        "unripe",
        "unruly",
        "unselfish",
        "unsightly",
        "unsteady",
        "unsung",
        "untidy",
        "untimely",
        "untried",
        "untrue",
        "unused",
        "unusual",
        "unwelcome",
        "unwieldy",
        "unwilling",
        "unwitting",
        "unwritten",
        "upbeat",
        "upright",
        "upset",
        "urban",
        "usable",
        "used",
        "useful",
        "useless",
        "utilized",
        "utter",
        "vacant",
        "vague",
        "vain",
        "valid",
        "valuable",
        "vapid",
        "variable",
        "vast",
        "velvety",
        "venerated",
        "vengeful",
        "verifiable",
        "vibrant",
        "vicious",
        "victorious",
        "vigilant",
        "vigorous",
        "villainous",
        "violet",
        "violent",
        "virtual",
        "virtuous",
        "visible",
        "vital",
        "vivacious",
        "vivid",
        "voluminous",
        "wan",
        "warlike",
        "warm",
        "warmhearted",
        "warped",
        "wary",
        "wasteful",
        "watchful",
        "waterlogged",
        "watery",
        "wavy",
        "wealthy",
        "weak",
        "weary",
        "webbed",
        "wee",
        "weekly",
        "weepy",
        "weighty",
        "weird",
        "welcome",
        "well-documented",
        "well-groomed",
        "well-informed",
        "well-lit",
        "well-made",
        "well-off",
        "well-to-do",
        "well-worn",
        "wet",
        "which",
        "whimsical",
        "whirlwind",
        "whispered",
        "white",
        "whole",
        "whopping",
        "wicked",
        "wide",
        "wide-eyed",
        "wiggly",
        "wild",
        "willing",
        "wilted",
        "winding",
        "windy",
        "winged",
        "wiry",
        "wise",
        "witty",
        "wobbly",
        "woeful",
        "wonderful",
        "wooden",
        "woozy",
        "wordy",
        "worldly",
        "worn",
        "worried",
        "worrisome",
        "worse",
        "worst",
        "worthless",
        "worthwhile",
        "worthy",
        "wrathful",
        "wretched",
        "writhing",
        "wrong",
        "wry",
        "yawning",
        "yearly",
        "yellow",
        "yellowish",
        "young",
        "youthful",
        "yummy",
        "zany",
        "zealous",
        "zesty",
        "zigzag",
    ]

module.exports = { adjectives, animals }
},{}],4:[function(require,module,exports){
const controller = require('./controller')
const { makeElement } = require('./model')

function initBindings() {
    document.querySelector('#makePost').addEventListener('click', showForm);
}

function showForm(e) {
    e.preventDefault();
    let form = document.createElement('form')
    form.setAttribute("id", "new-post-form");
    let titleField = makeElement('input', 'text', 'poemTitle')
    titleField.setAttribute('name', 'poemTitle')
    let labelTitle = document.createElement('label');
    labelTitle.setAttribute("name", "poemTitle");
    labelTitle.innerText = "Title  ";
    let poemField = makeElement('input', 'text', 'userPoem');
    poemField.setAttribute("name", "userPoem")
    let labelPoem = document.createElement('label');
    labelPoem.setAttribute("name", "poemTitle");
    labelPoem.innerText = "Your Poem:  ";
    let makePost = makeElement('input', 'submit', 'submitPoem', 'post')
    let searchGif = makeElement('input', 'submit', 'addGif', 'gif?')
    let counterArea = document.createElement("span");
    let selectedGif = document.createElement('span');
    selectedGif.setAttribute('id', 'selectedGif');
    counterArea.setAttribute("id", "counter");
    document.querySelector('header').after(form)
    form.append(labelTitle, titleField, labelPoem, poemField, counterArea, makePost, selectedGif, searchGif);
    formBtnsListeners();
}

function formBtnsListeners() {
    document.querySelector('#new-post-form').addEventListener('submit', controller.checkPoem)
    document.querySelector('#addGif').addEventListener('click', showGifForm);
    let textArea = document.querySelector('#userPoem');
    textArea.addEventListener("keyup", e => counter(e));

}

function showGifForm(e) {
    e.preventDefault();
    let gifForm = document.createElement('form')
    gifForm.setAttribute('id', 'gifForm')
    let searchWord = makeElement('input', 'text', 'gifWord');
    searchWord.setAttribute('placeholder', 'search for a gif');
    let searchGif = makeElement('input', 'submit', 'gifSearch','search');
    let gifContainer = document.createElement('section');
    gifContainer.setAttribute('id', 'gifContainer');
    gifForm.append(searchWord, searchGif, gifContainer);
    document.querySelector('form').append(gifForm);
    document.querySelector('#gifSearch').addEventListener('click', displayGif)
}

async function displayGif(e) {
    e.preventDefault()
    document.querySelector("#gifContainer").textContent = "";
    let userInput = document.querySelector('#gifWord').value;
    let gifData = await controller.fetchGif(userInput)
    for (let i = 0; i < gifData.data.length; i++) {

        let gifPath = gifData.data[i].images.fixed_height.url
        let gif = document.createElement('img')
        gif.setAttribute('src', gifPath)
        document.querySelector('#gifContainer').append(gif)
        gif.addEventListener('click', selectGif)
    }
}

function selectGif(e) {
    console.log(e)
    let gifPath = e.target.src
    console.log(gifPath)
    document.querySelector("#selectedGif").textContent = "";
    let previewGif = document.createElement('img')
    previewGif.setAttribute('src', gifPath)
    document.querySelector('#selectedGif').append(previewGif)
    e.path[2].remove()
}


function counter(e) {
    e.preventDefault();
    const max = 500;
    let textLen = e.target.value.length;
    let span = document.querySelector('#counter');
    span.innerText = `${textLen}/500`;
}


let url =  "https://hakema-server.herokuapp.com";

function displayPost(){
    fetch(`${url}/posts`)
    .then(res => res.json())
    .then(data => appendPost(data))
    .catch(err => console.log(err));
}

function appendPost(data){
    let container = document.getElementById("posts");

    for (let i = 0; i < data.length; i++){
        let post = data[i]
        let article = document.createElement('article');
        article.setAttribute('id', post.id)

        let divBody = document.createElement("div");
        divBody.setAttribute("class", "post");

        let title = document.createElement('p');
        title.innertext = post.author;
        let textCont = document.createElement('p');
        textCont.innerText = post.text;
        let author = document.createElement('p');
        author.innerText = post.author;
        divBody.append(title, author, textCont)
        // divBody.textContent = `${post.author} ${post.title} ${post.text}`
        let divReact = document.createElement('div');

        let divComment = document.createElement('div');
        let commentBtn = document.createElement("button");
        commentBtn.textContent = "Comment";
        commentBtn.setAttribute("class", "comment-btn");
        let commentForm = document.createElement("input");
        commentForm.setAttribute("type","text");
        commentForm.setAttribute("class","comment-form");

        // container.appendChild(div);
        // container.appendChild(commentForm);
        // container.appendChild(commentBtn);

        commentBtn.addEventListener('click', e => makeComment(e));
        let commentSection = document.createElement("div");
        commentSection.setAttribute("class", "comment");

        for (let x = 0; x < post.comments.length; x++ ){
            let comments = document.createElement("div");
            comments.textContent = post.comments[x];
            commentSection.appendChild(comments);
        }
        divComment.append(commentForm, commentBtn);
        article.append(divBody, divReact, divComment)
        container.appendChild(article);
        //
        // container.appendChild(commentSection);
        // container.setAttribute("class", "post-container");
        // container.setAttribute("id", post.id);
    }
}

// const commentBtn = document.querySelector(".comment-btn");

// commentBtn.addEventListener('click', post);
//
// function makeComment(e){
//     e.preventDefault();
//     let commentInput = document.getElementsByClassName('comment-form').value;
//     const data = commentInput
//     const postId = commentInput.closest(".post-container").id
//     fetch(`http://localhost:3000/posts/${postId}`,{
//         method: "POST",
//         headers:{
//             'Content-Type':'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log('Success:', data);
//     })
//     .catch((error)=>{
//         console.error('Error:', error);
//     });
// };



displayPost();


initBindings();

},{"./controller":1,"./model":2}]},{},[4]);
