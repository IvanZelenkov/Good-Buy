pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID = "981684844178"
        AWS_REGION = "us-east-1"
        IMAGE_REPO_NAME = "good-buy-ecr"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
        DYNAMO_DB_HANDLER_PATH = "good-buy-backend/good-buy-dynamodb-handler"
        GOOGLE_MAPS_HANDLER_PATH = "good-buy-backend/good-buy-google-maps-handler"
        STORE_APIS_HANDLER_PATH = "good-buy-backend/good-buy-store-apis-handler"
        DOCKER_IMAGE_NAME_1 = "aws-good-buy-dynamo-db-handler"
        DOCKER_IMAGE_NAME_2 = "aws-good-buy-google-maps-handler"
        DOCKER_IMAGE_NAME_3 = "aws-good-buy-store-apis-handler"
    }
    options {
        timestamps()
    }
    stages {
        stage("Docker client authentication with ECR") {
            steps {
                sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
            }
        }
        // stage("Install packages") {
        //     steps {
        //         sh "pip3 install -r ${STORE_APIS_HANDLER_PATH}/requirements.txt"
        //     }
        // }
        // stage("Build") {
        //     steps {
        //         sh "python3 ${STORE_APIS_HANDLER_PATH}/lambda_function.py"
        //     }
        // }
        // stage("Lint"){
        //     steps {
        //         sh "python3 -m pylint ${STORE_APIS_HANDLER_PATH}/tests/product_retrieval.py"
        //     }
        // }
        // stage("Test") {
        //     steps {
        //         sh "pytest ${STORE_APIS_HANDLER_PATH}/tests/product_retrieval.py"
        //     }
        // }
        stage("Building Docker Images") {
            steps {
                dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                    sh "docker build -t ${DOCKER_IMAGE_NAME_1} ."
                }
                dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                    sh "docker build -t ${DOCKER_IMAGE_NAME_2} ."
                }
                dir ("${STORE_APIS_HANDLER_PATH}") {
                    sh "docker build -t ${DOCKER_IMAGE_NAME_3} ."
                }
            }
        }
        stage("Tagging Docker Images") {
            steps {
                dir ("${DYNAMO_DB_HANDLER_PATH}") {
                    sh "docker tag ${DOCKER_IMAGE_NAME_1} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${DOCKER_IMAGE_NAME_1}"
                }
                dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                    sh "docker tag ${DOCKER_IMAGE_NAME_2} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${DOCKER_IMAGE_NAME_2}"
                }
                dir ("${STORE_APIS_HANDLER_PATH}") {
                    sh "docker tag ${DOCKER_IMAGE_NAME_3} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${DOCKER_IMAGE_NAME_3}"
                }
            }
        }
        stage("Pushing Docker Images to ECR") {
            steps {
                dir ("${DYNAMO_DB_HANDLER_PATH}") {
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${DOCKER_IMAGE_NAME_1}"
                }
                dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${DOCKER_IMAGE_NAME_2}"
                }
                dir ("${STORE_APIS_HANDLER_PATH}") {
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${DOCKER_IMAGE_NAME_3}"
                }
            }
        }
        stage("Prune images, containers, networks, and volumes") {
            steps {
                sh "docker system prune -af --volumes"
            }
        }
    }
}