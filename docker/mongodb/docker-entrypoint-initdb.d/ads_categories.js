db.ads_categories.drop();

db.ads_categories.insertMany([{
  'label': 'Véhicules',
  'slug': 'vehicules',
  'categories': [
    {
      'label': 'Voiture',
      'slug': 'voiture'
    }, {
      'label': 'Moto',
      'slug': 'moto'
    },
    {
      'label': 'Utilitaires',
      'slug': 'utilitaires'
    }
  ]
}, {
  'label': 'Loisirs',
  'slug': 'loisirs',
  'categories': [
    {
      'label': 'Vélo',
      'slug': 'velo'
    },
    {
      'label': 'DVD / Films',
      'slug': 'dvd-films'
    },
    {
      'label': 'CD / Musique',
      'slug': 'cd-musique'
    },
    {
      'label': 'Jeux & Jouets',
      'slug': 'jeux-jouets'
    },
    {
      'label': 'Livres',
      'slug': 'livres'
    },
    {
      'label': 'Animaux',
      'slug': 'animaux'
    },
    {
      'label': 'Sport',
      'slug': 'sport'
    }
  ]
}, {
  'label': 'Multimédia',
  'slug': 'multimedia',
  'categories': [
    {
      'label': 'Informatique',
      'slug' : 'informatique'
    },
    {
      'label': 'Consoles & Jeux vidéos',
      'slug' : 'consoles-jeux-videos'
    },
    {
      'label': 'Image & Son',
      'slug' : 'image-son'
    },
    {
      'label': 'Téléphonie',
      'slug' : 'telephonie'
    }
  ]
}, {
  'label': 'Maison',
  'slug': 'maison',
  'categories': [
    {
      'label': 'Electroménager',
      'slug' : 'electromenager'
    },
    {
      'label': 'Jardinage',
      'slug' : 'jardinage'
    },
    {
      'label': 'Bricolage',
      'slug' : 'bricolage'
    },
    {
      'label': 'Ameublement',
      'slug' : 'ameublement'
    }
  ]
}, {
  'label': 'Services',
  'slug': 'services',
  'categories': [
    {
      'label': 'Prestations de service',
      'slug' : 'prestations-service'
    },
    {
      'label': 'Cours particuliers',
      'slug' : 'cours-particuliers'
    },
    {
      'label': 'Covoiturage',
      'slug' : 'covoiturage'
    },
    {
      'label': "Garde d'enfants",
      'slug' : 'garde-enfants'
    }
  ]
}, {
  'label': 'Vêtements',
  'slug': 'vetements',
  'categories': [
    {
      'label': 'Homme',
      'slug' : 'homme'
    },
    {
      'label': 'Femme',
      'slug' : 'femme'
    },
    {
      'label': 'Enfant',
      'slug' : 'enfant'
    },
    {
      'label': 'Maternité',
      'slug' : 'maternite'
    }
  ]
}, {
  'label': 'Univers bébé',
  'slug': 'univers-bebe',
  'categories': [
    {
      'label': 'Équipement bébé',
      'slug' : 'equipement-bebe'
    },
    {
      'label': 'Vêtements bébé',
      'slug' : 'vetements-bebe'
    }
  ]
}, {
  'label': 'Autres',
  'slug': 'autres'
}
]);
