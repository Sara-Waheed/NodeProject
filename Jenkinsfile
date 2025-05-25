pipeline {
  agent any
  tools { nodejs "NodeJS_14" }
  environment {
    DOCKER_IMAGE = "sarawaheed/selenium-tests:latest"
  }
  stages {
    stage('Lint') {
      steps {
        sh 'npm install'
        sh 'npm run lint'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Unit Test') {
      steps {
        sh 'npm install'
        sh 'npm test'
      }
    }
    stage('Deploy') {
      steps {
        script {
          sh '''
            docker network create node-net || true
            docker build -t nodeproject-app:latest .
            docker rm -f nodeproject-app || true
            docker run -d --name nodeproject-app --network node-net -p 3000:3000 nodeproject-app:latest
            docker run --network node-net --rm busybox sh -c 'until wget -q --spider http://nodeproject-app:3000; do sleep 1; done'
          '''
        }
      }
    }
    stage('Selenium') {
      steps {
        sh 'docker run --network node-net --rm sarawaheed/selenium-tests:latest'
      }
    }
  }
  post {
    always {
      junit 'reports/**/*.xml'
      archiveArtifacts artifacts: 'screenshots/*.png', fingerprint: true
    }
  }
}
