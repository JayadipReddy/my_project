pipeline {
    agent any

    environment {
        BACKEND_PORT = "8000"
        FRONTEND_PORT = "3000"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/JayadipReddy/my_project.git'
            }
        }

        stage('Backend Setup') {
            steps {
                bat '''
                cd backend
                if not exist .venv (
                    python -m venv .venv
                )
                call .\\.venv\\Scripts\\activate
                pip install -r requirements.txt
                '''
            }
        }

        stage('Frontend Build') {
            steps {
                bat '''
                cd frontend
                npm install
                npm run build
                '''
            }
        }

        stage('Start Backend') {
            steps {
                bat '''
                cd backend
                call .\\.venv\\Scripts\\activate
                start /B uvicorn main:app --host 0.0.0.0 --port %BACKEND_PORT%
                '''
            }
        }

        stage('Start Frontend') {
            steps {
                bat '''
                cd frontend
                start /B npm run start
                '''
            }
        }
    }
}
