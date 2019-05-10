db.departments.drop();
db.departments.insertMany([
  {
    'region': db.regions.findOne({ code: '84' }, { _id: 1 })._id,
    'code': '01',
    'name': 'Ain',
    'slug': 'ain'
  },
  {
    'region': db.regions.findOne({ code: '32' }, { _id: 1 })._id,
    'code': '02',
    'name': 'Aisne',
    'slug': 'aisne'
  },
  {
    'region': db.regions.findOne({ code: '84' }, { _id: 1 })._id,
    'code': '03',
    'name': 'Allier',
    'slug': 'allier'
  },
  {
    'region': db.regions.findOne({ code: '93' }, { _id: 1 })._id,
    'code': '04',
    'name': 'Alpes-de-Haute-Provence',
    'slug': 'alpes de haute provence'
  },
  {
    'region': db.regions.findOne({ code: '93' }, { _id: 1 })._id,
    'code': '05',
    'name': 'Hautes-Alpes',
    'slug': 'hautes alpes'
  },
  {
    'region': db.regions.findOne({ code: '93' }, { _id: 1 })._id,
    'code': '06',
    'name': 'Alpes-Maritimes',
    'slug': 'alpes maritimes'
  },
  {
    'region': db.regions.findOne({ code: '84' }, { _id: 1 })._id,
    'code': '07',
    'name': 'Ard\u00e8che',
    'slug': 'ardeche'
  },
  {
    'region': db.regions.findOne({ code: '44' }, { _id: 1 })._id,
    'code': '08',
    'name': 'Ardennes',
    'slug': 'ardennes'
  },
  {
    'region': db.regions.findOne({ code: '76' }, { _id: 1 })._id,
    'code': '09',
    'name': 'Ari\u00e8ge',
    'slug': 'ariege'
  }, {

    'region': db.regions.findOne({ code: '44' }, { _id: 1 })._id,
    'code': '10',
    'name': 'Aube',
    'slug': 'aube'
  }, {

    'region': db.regions.findOne({ code: '76' }, { _id: 1 })._id,
    'code': '11',
    'name': 'Aude',
    'slug': 'aude'
  }, {

    'region': db.regions.findOne({ code: '76' }, { _id: 1 })._id,
    'code': '12',
    'name': 'Aveyron',
    'slug': 'aveyron'
  }, {

    'region': db.regions.findOne({ code: '93' }, { _id: 1 })._id,
    'code': '13',
    'name': 'Bouches-du-Rh\u00f4ne',
    'slug': 'bouches du rhone'
  }, {

    'region': db.regions.findOne({ code: '28' }, { _id: 1 })._id,
    'code': '14',
    'name': 'Calvados',
    'slug': 'calvados'
  }, {

    'region': db.regions.findOne({ code: '84' }, { _id: 1 })._id,
    'code': '15',
    'name': 'Cantal',
    'slug': 'cantal'
  }, {

    'region': db.regions.findOne({ code: '75' }, { _id: 1 })._id,
    'code': '16',
    'name': 'Charente',
    'slug': 'charente'
  }, {

    'region': db.regions.findOne({ code: '75' }, { _id: 1 })._id,
    'code': '17',
    'name': 'Charente-Maritime',
    'slug': 'charente maritime'
  }, {

    'region': db.regions.findOne({ code: '24' }, { _id: 1 })._id,
    'code': '18',
    'name': 'Cher',
    'slug': 'cher'
  }, {

    'region': db.regions.findOne({ code: '75' }, { _id: 1 })._id,
    'code': '19',
    'name': 'Corr\u00e8ze',
    'slug': 'correze'
  }, {

    'region': db.regions.findOne({ code: '27' }, { _id: 1 })._id,
    'code': '21',
    'name': 'C\u00f4te-d\'Or',
    'slug': 'cote dor'
  }, {

    'region': db.regions.findOne({ code: '53' }, { _id: 1 })._id,
    'code': '22',
    'name': 'C\u00f4tes-d\'Armor',
    'slug': 'cotes darmor'
  }, {

    'region': db.regions.findOne({ code: '75' }, { _id: 1 })._id,
    'code': '23',
    'name': 'Creuse',
    'slug': 'creuse'
  }, {

    'region': db.regions.findOne({ code: '75' }, { _id: 1 })._id,
    'code': '24',
    'name': 'Dordogne',
    'slug': 'dordogne'
  }, {

    'region': db.regions.findOne({ code: '27' }, { _id: 1 })._id,
    'code': '25',
    'name': 'Doubs',
    'slug': 'doubs'
  }, {

    'region': db.regions.findOne({ code: '84' }, { _id: 1 })._id,
    'code': '26',
    'name': 'Dr\u00f4me',
    'slug': 'drome'
  }, {

    'region': db.regions.findOne({ code: '28' }, { _id: 1 })._id,
    'code': '27',
    'name': 'Eure',
    'slug': 'eure'
  }, {

    'region': db.regions.findOne({ code: '24' }, { _id: 1 })._id,
    'code': '28',
    'name': 'Eure-et-Loir',
    'slug': 'eure et loir'
  }, {

    'region': db.regions.findOne({ code: '53' }, { _id: 1 })._id,
    'code': '29',
    'name': 'Finist\u00e8re',
    'slug': 'finistere'
  }, {

    'region': db.regions.findOne({ code: '94' }, { _id: 1 })._id,
    'code': '2A',
    'name': 'Corse-du-Sud',
    'slug': 'corse du sud'
  }, {

    'region': db.regions.findOne({ code: '94' }, { _id: 1 })._id,
    'code': '2B',
    'name': 'Haute-Corse',
    'slug': 'haute corse'
  }, {

    'region': db.regions.findOne({ code: '76' }, { _id: 1 })._id,
    'code': '30',
    'name': 'Gard',
    'slug': 'gard'
  }, {

    'region': db.regions.findOne({ code: '76' }, { _id: 1 })._id,
    'code': '31',
    'name': 'Haute-Garonne',
    'slug': 'haute garonne'
  }, {

    'region': db.regions.findOne({ code: '76' }, { _id: 1 })._id,
    'code': '32',
    'name': 'Gers',
    'slug': 'gers'
  }, {

    'region': db.regions.findOne({ code: '75' }, { _id: 1 })._id,
    'code': '33',
    'name': 'Gironde',
    'slug': 'gironde'
  }, {

    'region': db.regions.findOne({ code: '76' }, { _id: 1 })._id,
    'code': '34',
    'name': 'H\u00e9rault',
    'slug': 'herault'
  }, {

    'region': db.regions.findOne({ code: '53' }, { _id: 1 })._id,
    'code': '35',
    'name': 'Ille-et-Vilaine',
    'slug': 'ille et vilaine'
  }, {

    'region': db.regions.findOne({ code: '24' }, { _id: 1 })._id,
    'code': '36',
    'name': 'Indre',
    'slug': 'indre'
  }, {

    'region': db.regions.findOne({ code: '24' }, { _id: 1 })._id,
    'code': '37',
    'name': 'Indre-et-Loire',
    'slug': 'indre et loire'
  }, {

    'region': db.regions.findOne({ code: '84' }, { _id: 1 })._id,
    'code': '38',
    'name': 'Is\u00e8re',
    'slug': 'isere'
  }, {

    'region': db.regions.findOne({ code: '27' }, { _id: 1 })._id,
    'code': '39',
    'name': 'Jura',
    'slug': 'jura'
  }, {

    'region': db.regions.findOne({ code: '75' }, { _id: 1 })._id,
    'code': '40',
    'name': 'Landes',
    'slug': 'landes'
  }, {

    'region': db.regions.findOne({ code: '24' }, { _id: 1 })._id,
    'code': '41',
    'name': 'Loir-et-Cher',
    'slug': 'loir et cher'
  }, {

    'region': db.regions.findOne({ code: '84' }, { _id: 1 })._id,
    'code': '42',
    'name': 'Loire',
    'slug': 'loire'
  }, {

    'region': db.regions.findOne({ code: '84' }, { _id: 1 })._id,
    'code': '43',
    'name': 'Haute-Loire',
    'slug': 'haute loire'
  }, {

    'region': db.regions.findOne({ code: '52' }, { _id: 1 })._id,
    'code': '44',
    'name': 'Loire-Atlantique',
    'slug': 'loire atlantique'
  }, {

    'region': db.regions.findOne({ code: '24' }, { _id: 1 })._id,
    'code': '45',
    'name': 'Loiret',
    'slug': 'loiret'
  }, {

    'region': db.regions.findOne({ code: '76' }, { _id: 1 })._id,
    'code': '46',
    'name': 'Lot',
    'slug': 'lot'
  }, {

    'region': db.regions.findOne({ code: '75' }, { _id: 1 })._id,
    'code': '47',
    'name': 'Lot-et-Garonne',
    'slug': 'lot et garonne'
  }, {

    'region': db.regions.findOne({ code: '76' }, { _id: 1 })._id,
    'code': '48',
    'name': 'Loz\u00e8re',
    'slug': 'lozere'
  }, {

    'region': db.regions.findOne({ code: '52' }, { _id: 1 })._id,
    'code': '49',
    'name': 'Maine-et-Loire',
    'slug': 'maine et loire'
  }, {

    'region': db.regions.findOne({ code: '28' }, { _id: 1 })._id,
    'code': '50',
    'name': 'Manche',
    'slug': 'manche'
  }, {

    'region': db.regions.findOne({ code: '44' }, { _id: 1 })._id,
    'code': '51',
    'name': 'Marne',
    'slug': 'marne'
  }, {

    'region': db.regions.findOne({ code: '44' }, { _id: 1 })._id,
    'code': '52',
    'name': 'Haute-Marne',
    'slug': 'haute marne'
  }, {

    'region': db.regions.findOne({ code: '52' }, { _id: 1 })._id,
    'code': '53',
    'name': 'Mayenne',
    'slug': 'mayenne'
  }, {

    'region': db.regions.findOne({ code: '44' }, { _id: 1 })._id,
    'code': '54',
    'name': 'Meurthe-et-Moselle',
    'slug': 'meurthe et moselle'
  }, {

    'region': db.regions.findOne({ code: '44' }, { _id: 1 })._id,
    'code': '55',
    'name': 'Meuse',
    'slug': 'meuse'
  }, {

    'region': db.regions.findOne({ code: '53' }, { _id: 1 })._id,
    'code': '56',
    'name': 'Morbihan',
    'slug': 'morbihan'
  }, {

    'region': db.regions.findOne({ code: '44' }, { _id: 1 })._id,
    'code': '57',
    'name': 'Moselle',
    'slug': 'moselle'
  }, {

    'region': db.regions.findOne({ code: '27' }, { _id: 1 })._id,
    'code': '58',
    'name': 'Ni\u00e8vre',
    'slug': 'nievre'
  }, {

    'region': db.regions.findOne({ code: '32' }, { _id: 1 })._id,
    'code': '59',
    'name': 'Nord',
    'slug': 'nord'
  }, {

    'region': db.regions.findOne({ code: '32' }, { _id: 1 })._id,
    'code': '60',
    'name': 'Oise',
    'slug': 'oise'
  }, {

    'region': db.regions.findOne({ code: '28' }, { _id: 1 })._id,
    'code': '61',
    'name': 'Orne',
    'slug': 'orne'
  }, {

    'region': db.regions.findOne({ code: '32' }, { _id: 1 })._id,
    'code': '62',
    'name': 'Pas-de-Calais',
    'slug': 'pas de calais'
  }, {

    'region': db.regions.findOne({ code: '84' }, { _id: 1 })._id,
    'code': '63',
    'name': 'Puy-de-D\u00f4me',
    'slug': 'puy de dome'
  }, {

    'region': db.regions.findOne({ code: '75' }, { _id: 1 })._id,
    'code': '64',
    'name': 'Pyr\u00e9n\u00e9es-Atlantiques',
    'slug': 'pyrenees atlantiques'
  }, {

    'region': db.regions.findOne({ code: '76' }, { _id: 1 })._id,
    'code': '65',
    'name': 'Hautes-Pyr\u00e9n\u00e9es',
    'slug': 'hautes pyrenees'
  }, {

    'region': db.regions.findOne({ code: '76' }, { _id: 1 })._id,
    'code': '66',
    'name': 'Pyr\u00e9n\u00e9es-Orientales',
    'slug': 'pyrenees orientales'
  }, {

    'region': db.regions.findOne({ code: '44' }, { _id: 1 })._id,
    'code': '67',
    'name': 'Bas-Rhin',
    'slug': 'bas rhin'
  }, {

    'region': db.regions.findOne({ code: '44' }, { _id: 1 })._id,
    'code': '68',
    'name': 'Haut-Rhin',
    'slug': 'haut rhin'
  }, {

    'region': db.regions.findOne({ code: '84' }, { _id: 1 })._id,
    'code': '69',
    'name': 'Rh\u00f4ne',
    'slug': 'rhone'
  }, {

    'region': db.regions.findOne({ code: '27' }, { _id: 1 })._id,
    'code': '70',
    'name': 'Haute-Sa\u00f4ne',
    'slug': 'haute saone'
  }, {

    'region': db.regions.findOne({ code: '27' }, { _id: 1 })._id,
    'code': '71',
    'name': 'Sa\u00f4ne-et-Loire',
    'slug': 'saone et loire'
  }, {

    'region': db.regions.findOne({ code: '52' }, { _id: 1 })._id,
    'code': '72',
    'name': 'Sarthe',
    'slug': 'sarthe'
  }, {

    'region': db.regions.findOne({ code: '84' }, { _id: 1 })._id,
    'code': '73',
    'name': 'Savoie',
    'slug': 'savoie'
  }, {

    'region': db.regions.findOne({ code: '84' }, { _id: 1 })._id,
    'code': '74',
    'name': 'Haute-Savoie',
    'slug': 'haute savoie'
  }, {

    'region': db.regions.findOne({ code: '11' }, { _id: 1 })._id,
    'code': '75',
    'name': 'Paris',
    'slug': 'paris'
  }, {

    'region': db.regions.findOne({ code: '28' }, { _id: 1 })._id,
    'code': '76',
    'name': 'Seine-Maritime',
    'slug': 'seine maritime'
  }, {

    'region': db.regions.findOne({ code: '11' }, { _id: 1 })._id,
    'code': '77',
    'name': 'Seine-et-Marne',
    'slug': 'seine et marne'
  }, {

    'region': db.regions.findOne({ code: '11' }, { _id: 1 })._id,
    'code': '78',
    'name': 'Yvelines',
    'slug': 'yvelines'
  }, {

    'region': db.regions.findOne({ code: '75' }, { _id: 1 })._id,
    'code': '79',
    'name': 'Deux-S\u00e8vres',
    'slug': 'deux sevres'
  }, {

    'region': db.regions.findOne({ code: '32' }, { _id: 1 })._id,
    'code': '80',
    'name': 'Somme',
    'slug': 'somme'
  }, {

    'region': db.regions.findOne({ code: '76' }, { _id: 1 })._id,
    'code': '81',
    'name': 'Tarn',
    'slug': 'tarn'
  }, {

    'region': db.regions.findOne({ code: '76' }, { _id: 1 })._id,
    'code': '82',
    'name': 'Tarn-et-Garonne',
    'slug': 'tarn et garonne'
  }, {

    'region': db.regions.findOne({ code: '93' }, { _id: 1 })._id,
    'code': '83',
    'name': 'Var',
    'slug': 'var'
  }, {

    'region': db.regions.findOne({ code: '93' }, { _id: 1 })._id,
    'code': '84',
    'name': 'Vaucluse',
    'slug': 'vaucluse'
  }, {

    'region': db.regions.findOne({ code: '52' }, { _id: 1 })._id,
    'code': '85',
    'name': 'Vend\u00e9e',
    'slug': 'vendee'
  }, {

    'region': db.regions.findOne({ code: '75' }, { _id: 1 })._id,
    'code': '86',
    'name': 'Vienne',
    'slug': 'vienne'
  }, {

    'region': db.regions.findOne({ code: '75' }, { _id: 1 })._id,
    'code': '87',
    'name': 'Haute-Vienne',
    'slug': 'haute vienne'
  }, {

    'region': db.regions.findOne({ code: '44' }, { _id: 1 })._id,
    'code': '88',
    'name': 'Vosges',
    'slug': 'vosges'
  }, {

    'region': db.regions.findOne({ code: '27' }, { _id: 1 })._id,
    'code': '89',
    'name': 'Yonne',
    'slug': 'yonne'
  }, {

    'region': db.regions.findOne({ code: '27' }, { _id: 1 })._id,
    'code': '90',
    'name': 'Territoire de Belfort',
    'slug': 'territoire de belfort'
  }, {

    'region': db.regions.findOne({ code: '11' }, { _id: 1 })._id,
    'code': '91',
    'name': 'Essonne',
    'slug': 'essonne'
  }, {

    'region': db.regions.findOne({ code: '11' }, { _id: 1 })._id,
    'code': '92',
    'name': 'Hauts-de-Seine',
    'slug': 'hauts de seine'
  }, {

    'region': db.regions.findOne({ code: '11' }, { _id: 1 })._id,
    'code': '93',
    'name': 'Seine-Saint-Denis',
    'slug': 'seine saint denis'
  }, {

    'region': db.regions.findOne({ code: '11' }, { _id: 1 })._id,
    'code': '94',
    'name': 'Val-de-Marne',
    'slug': 'val de marne'
  }, {

    'region': db.regions.findOne({ code: '11' }, { _id: 1 })._id,
    'code': '95',
    'name': 'Val-d\'Oise',
    'slug': 'val doise'
  }, {

    'region': db.regions.findOne({ code: '01' }, { _id: 1 })._id,
    'code': '971',
    'name': 'Guadeloupe',
    'slug': 'guadeloupe'
  }, {

    'region': db.regions.findOne({ code: '02' }, { _id: 1 })._id,
    'code': '972',
    'name': 'Martinique',
    'slug': 'martinique'
  }, {

    'region': db.regions.findOne({ code: '03' }, { _id: 1 })._id,
    'code': '973',
    'name': 'Guyane',
    'slug': 'guyane'
  }, {

    'region': db.regions.findOne({ code: '04' }, { _id: 1 })._id,
    'code': '974',
    'name': 'La R\u00e9union',
    'slug': 'la reunion'
  }, {

    'region': db.regions.findOne({ code: '06' }, { _id: 1 })._id,
    'code': '976',
    'name': 'Mayotte',
    'slug': 'mayotte'
  }, {

    'region': db.regions.findOne({ code: 'COM' }, { _id: 1 })._id,
    'code': '975',
    'name': 'Saint-Pierre-et-Miquelon',
    'slug': 'saint pierre et miquelon'
  }, {

    'region': db.regions.findOne({ code: 'COM' }, { _id: 1 })._id,
    'code': '977',
    'name': 'Saint-Barth\u00e9lemy',
    'slug': 'saint barthelemy'
  }, {

    'region': db.regions.findOne({ code: 'COM' }, { _id: 1 })._id,
    'code': '978',
    'name': 'Saint-Martin',
    'slug': 'saint martin'
  }, {

    'region': db.regions.findOne({ code: 'COM' }, { _id: 1 })._id,
    'code': '984',
    'name': 'Terres australes et antarctiques fran\u00e7aises',
    'slug': 'terres australes et antarctiques francaises'
  }, {

    'region': db.regions.findOne({ code: 'COM' }, { _id: 1 })._id,
    'code': '986',
    'name': 'Wallis et Futuna',
    'slug': 'wallis et futuna'
  }, {

    'region': db.regions.findOne({ code: 'COM' }, { _id: 1 })._id,
    'code': '987',
    'name': 'Polyn\u00e9sie fran\u00e7aise',
    'slug': 'polynesie francaise'
  }, {

    'region': db.regions.findOne({ code: 'COM' }, { _id: 1 })._id,
    'code': '988',
    'name': 'Nouvelle-Cal\u00e9donie',
    'slug': 'nouvelle caledonie'
  }, {

    'region': db.regions.findOne({ code: 'COM' }, { _id: 1 })._id,
    'code': '989',
    'name': '\u00cele de Clipperton',
    'slug': 'ile de clipperton'
  }
]);
