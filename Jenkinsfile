pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID = "981684844178"
        AWS_REGION = "us-east-1"
        ECR_NAME = "good-buy-ecr"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}"
        BACKEND_FOLDER_NAME = "good-buy-backend"
        LAMBDA_FUNCTION_NAMES = "good-buy-dynamodb-handler," +
                                "good-buy-google-maps-api-handler," +
                                "good-buy-get-products-handler," +
                                "good-buy-filter-products-handler," +
                                "good-buy-email-subscriber-handler," +
                                "good-buy-email-notifier-handler"
    }
    options {
        timestamps()
    }
    stages {
        stage("Pre-deployment stage") {
            agent {
                docker {
                    image "python:3.9"
                    args "-u 0:0"
                }
            }
            steps {
                script {
                    def exclude_dirs = "data-scripts,tests"
                    def pylint_rcfile = "${BACKEND_FOLDER_NAME}/.pylintrc"
                    sh """
                        python3 -m pip install --upgrade pip
                        pip3 install --upgrade -r requirements.txt
                    """
                    parallel(
                        "Unit tests": {
                            stage("Unit tests") {
                                sh "python3 -m pytest -r ${BACKEND_FOLDER_NAME}"
                            }
                        },
                        "Security tests": {
                            stage("Security tests") {
                                sh "python3 -m bandit --exclude ${exclude_dirs} -r ${BACKEND_FOLDER_NAME}"
                            }
                        },
                        "Linting tests": {
                            stage("Linting tests") {
                                sh "python3 -m pylint --rcfile=${pylint_rcfile} --ignore=${exclude_dirs} -r y ${BACKEND_FOLDER_NAME}"
                            }
                        },
                        "Coverage": {
                            stage("Coverage") {
                                sh """
                                    python3 -m coverage run --source=${BACKEND_FOLDER_NAME} -m pytest -r ${BACKEND_FOLDER_NAME}
                                    python3 -m coverage report
                                """
                            }
                        }
                    )
                }
            }
        }
        stage("Merge branch into 'main'") {
//             when {
//                 expression {
//                     def isMergeCommit = sh(script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
//                     return isMergeCommit.startsWith("Merge pull request #")
//                 }
//             }
            stages {
                stage("Authenticate Docker client to ECR") {
                    steps {
                        sh """
                            aws ecr get-login-password \
                            --region ${AWS_REGION} \
                            | docker login \
                            --username AWS \
                            --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                        """
                    }
                }
                stage("Build Docker images") {
                    steps {
                        script {
                            def lambdaFunctionNamesList = LAMBDA_FUNCTION_NAMES.split(",").toList()
                            dockerImageTagsList = LAMBDA_FUNCTION_NAMES.split(",").toList().collect { "${it}-${env.GIT_BRANCH}-${env.GIT_COMMIT}" }
                            def buildSteps = [:]
                            lambdaFunctionNamesList.each { functionName ->
                                def handlerPath = env."${functionName}_path"
                                def dockerImageTag = dockerImageTagsList[lambdaFunctionNamesList.indexOf(functionName)]
                                buildSteps["Build ${functionName} image"] = {
                                    dir(handlerPath) {
                                        sh "docker build -t ${dockerImageTag} ."
                                    }
                                }
                            }
                            parallel(buildSteps)
                        }
                    }
                }
                stage("Build Docker images") {
                    steps {
                        script {
                            def lambdaFunctionNamesList = LAMBDA_FUNCTION_NAMES.tokenize(',')
                            def buildSteps = [:]
                            lambdaFunctionNamesList.each { functionName ->
                                def handlerPath = "${BACKEND_FOLDER_NAME}/${functionName}"
                                def dockerImageTag = "${REPOSITORY_URI}:${functionName}"
                                buildSteps["Build ${functionName} image"] = {
                                    dir(handlerPath) {
                                        sh "docker build -t ${dockerImageTag} ."
                                    }
                                }
                            }
                            parallel(buildSteps)
                        }
                    }
                }
                stage("Tag Docker images") {
                    steps {
                        script {
                            def lambdaFunctionNamesList = LAMBDA_FUNCTION_NAMES.split(",").toList()
                            dockerImageTagsList = LAMBDA_FUNCTION_NAMES.split(",").toList().collect { "${it}-${env.GIT_BRANCH}-${env.GIT_COMMIT}" }
                            def tagSteps = lambdaFunctionNamesList.collect { functionName ->
                                def handlerPath = env."${functionName}_path"
                                def dockerImageTag = dockerImageTagsList[lambdaFunctionNamesList.indexOf(functionName)]
                                return [name: "Tag ${functionName} image",
                                        body: {
                                            dir(handlerPath) {
                                                sh "docker tag ${dockerImageTag} ${REPOSITORY_URI}:${dockerImageTag}"
                                            }
                                        }]
                            }
                            parallel(tagSteps)
                        }
                    }
                }
                stage("Push Docker images to ECR") {
                    steps {
                        script {
                            def lambdaFunctionNamesList = LAMBDA_FUNCTION_NAMES.split(",").toList()
                            dockerImageTagsList = LAMBDA_FUNCTION_NAMES.split(",").toList().collect { "${it}-${env.GIT_BRANCH}-${env.GIT_COMMIT}" }
                            def pushSteps = lambdaFunctionNamesList.collect { functionName ->
                                def handlerPath = env."${functionName}_path"
                                def dockerImageTag = dockerImageTagsList[lambdaFunctionNamesList.indexOf(functionName)]
                                return [name: "Push ${functionName} image",
                                        body: {
                                            dir(handlerPath) {
                                                sh "docker push ${dockerImageTag} ${REPOSITORY_URI}:${dockerImageTag}"
                                            }
                                        }]
                            }
                            parallel(pushSteps)
                        }
                    }
                }
                stage("Deploy Docker images to Lambdas from ECR") {
                    steps {
                        script {
                            def lambdaFunctionNamesList = LAMBDA_FUNCTION_NAMES.split(",").toList()
                            dockerImageTagsList = LAMBDA_FUNCTION_NAMES.split(",").toList().collect { "${it}-${env.GIT_BRANCH}-${env.GIT_COMMIT}" }
                            def deploySteps = lambdaFunctionNamesList.collect { functionName ->
                                def dockerImageTag = dockerImageTagsList[lambdaFunctionNamesList.indexOf(functionName)]
                                def dockerImageUri = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${dockerImageTag}"
                                return [name: "Deploy ${functionName} image",
                                        body: {
                                            sh """
                                                aws lambda update-function-code \\
                                                --region ${AWS_REGION} \\
                                                --function-name ${functionName} \\
                                                --image-uri ${dockerImageUri}
                                            """
                                        }]
                            }
                            parallel(deploySteps)
                        }
                    }
                }
                stage ("Prune Docker resources") {
                    steps {
                        sh "docker system prune -af --volumes"
                    }
                }
            }
        }
    }
}