const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
  serverUrl: 'https://sonar.area42.fr',
  token: 'e9a8dd765bf423c7483fb749f16d05df4b7d2241',
  options: {
    'sonar.projectKey': 'Helpee',
    'sonar.login': 'e9a8dd765bf423c7483fb749f16d05df4b7d2241',
    'sonar.projectName': 'Helpee',
    'sonar.sources': '.',
    'sonar.projectVersion': '0.1.0',
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.inclusions': 'assets/**, src/**, views/**',
    'sonar.exclusions': 'assets/fonts, assets/icons, assets/images, bin/**, dist/**, docker/**, logs/**, node_modules/**, public/**'

  }
}, () => {});
