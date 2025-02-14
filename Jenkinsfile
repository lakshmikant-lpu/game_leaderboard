pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
        DOCKER_HUB_USER = 'lakshmikant4lpu'
        IMAGE_NAME = 'game_leaderboard'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/lakshmikant-lpu/game_leaderboard.git'
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    def nodeInstalled = sh(script: 'node -v || true', returnStdout: true).trim()
                    if (!nodeInstalled.contains(NODE_VERSION)) {
                        sh "nvm install ${NODE_VERSION} && nvm use ${NODE_VERSION}"
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Logging in to Docker Hub...'
                withCredentials([string(credentialsId: 'docker-hub-password', variable: 'DOCKER_PASSWORD')]) {
                    sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_HUB_USER} --password-stdin"
                }
                echo 'Pushing image to Docker Hub...'
                sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to EC2...'
                sh """
                docker stop ${IMAGE_NAME} || true
                docker rm ${IMAGE_NAME} || true
                docker pull ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}
                docker run -d -p 80:3000 --name ${IMAGE_NAME} ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
