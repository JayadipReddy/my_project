pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/JayadipReddy/my_project.git'
            }
        }

        stage('Backend - Setup & Check') {
            steps {
                dir('backend') {
                    bat '''
                    python -m venv .venv
                    .venv\\Scripts\\activate
                    pip install -r requirements.txt
                    python -c "import main"
                    '''
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir('frontend') {
                    bat '''
                    npm install
                    npm run build
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ CI Pipeline Passed'
        }
        failure {
            echo '❌ CI Pipeline Failed'
        }
    }
}
