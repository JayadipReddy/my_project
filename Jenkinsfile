pipeline {
    agent any

    options {
        skipDefaultCheckout()
    }

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

                echo ===== Running npm install =====
                npm install
                if errorlevel 1 exit /b 1

                echo ===== Running npm run build =====
                npm run build
                if errorlevel 1 exit /b 1

                echo ===== Verifying .next directory =====
                dir .next || exit /b 1
                '''
            }
        }


        stage('Start Backend') {
            steps {
                bat '''
                cd backend
                call .\\.venv\\Scripts\\activate
                start "" /B uvicorn main:app --host 0.0.0.0 --port %BACKEND_PORT%
                '''
            }
        }

        stage('Start Frontend + JobAlive') {
            steps {
                bat '''
                cd frontend
                echo Starting Next.js in FOREGROUND
                npx next start -H 0.0.0.0 -p %FRONTEND_PORT%
                '''
            }
        }
    }
}
