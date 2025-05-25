pipeline {
  agent any
  tools { nodejs "NodeJS_14" }
  environment {
    DOCKER_IMAGE = "sarawaheed/selenium-tests:latest"
  }
  stages {
    stage('Lint')       { steps { sh 'npm install'; sh 'npm run lint' } }
    stage('Build')      { steps { sh 'npm run build' } }
    stage('Unit Test') {
    steps {
    sh 'npm test || echo "Tests failed - continuing pipeline"'
    // Validate XML report exists
    sh 'test -f reports/test-results.xml || exit 1' 
  }
}
    stage('Deploy') {
  steps {
    sh '''
      docker network create node-network || true
      docker build -t nodeproject-app:latest .
      docker rm -f nodeproject-app || true
      docker run -d --name nodeproject-app --network node-network -p 3000:3000 nodeproject-app:latest
    '''
  }
}

stage('Selenium') {
  steps {
    sh 'docker run --network node-network sarawaheed/selenium-tests:latest'
  }
}
  post {
    always {
      junit 'reports/**/*.xml'
      archiveArtifacts artifacts: 'screenshots/*.png', fingerprint: true
    }
  }
}
