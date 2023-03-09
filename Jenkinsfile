pipeline {
    agent {
        dockerfile {
            args '-u 0:0'
        }
    }
    environment {
        AWS_ACCOUNT_ID = "981684844178"
        AWS_REGION = "us-east-1"
        ECR_NAME = "good-buy-ecr"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
        DYNAMO_DB_HANDLER_PATH = "good-buy-backend/good-buy-dynamodb-handler"
        GOOGLE_MAPS_HANDLER_PATH = "good-buy-backend/good-buy-google-maps-handler"
        STORE_APIS_HANDLER_PATH = "good-buy-backend/good-buy-store-apis-handler"
        DOCKER_IMAGE_TAG_1 = "good-buy-dynamodb-handler-image"
        DOCKER_IMAGE_TAG_2 = "good-buy-google-maps-handler-image"
        DOCKER_IMAGE_TAG_3 = "good-buy-store-apis-handler-image"
        LAMBDA_FUNCTION_NAME_1 = "good-buy-dynamodb-handler"
        LAMBDA_FUNCTION_NAME_2 = "good-buy-google-maps-handler"
        LAMBDA_FUNCTION_NAME_3 = "good-buy-store-apis-handler"
    }
    options {
        timestamps()
    }
    stages {
//         stage("Lint") {
//             steps {
//                 sh "python3 -m pylint ${STORE_APIS_HANDLER_PATH}/tests/product_retrieval.py"
//             }
//         }
        stage("Test") {
            steps {
                sh "pytest ${STORE_APIS_HANDLER_PATH}/tests/product_retrieval.py"
            }
        }
        stage("Delete existing images in ECR") {
            steps {
                sh '''
                    aws ecr batch-delete-image \
                    --region ${AWS_REGION} \
                    --repository-name ${ECR_NAME} \
                    --image-ids \
                    "$(aws ecr list-images --region ${AWS_REGION} \
                    --repository-name ${ECR_NAME} \
                    --query 'imageIds[*]' \
                    --output json)" || true
                '''
            }
        }
        stage("Docker client authentication with ECR") {
            steps {
                sh '''
                    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                '''
            }
        }
        stage("Building Docker Images") {
            steps {
                dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                    sh "docker build -t ${DOCKER_IMAGE_TAG_1} ."
                }
                dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                    sh "docker build -t ${DOCKER_IMAGE_TAG_2} ."
                }
                dir ("${STORE_APIS_HANDLER_PATH}") {
                    sh "docker build -t ${DOCKER_IMAGE_TAG_3} ."
                }
            }
        }
        stage("Tagging Docker Images") {
            steps {
                dir ("${DYNAMO_DB_HANDLER_PATH}") {
                    sh "docker tag ${DOCKER_IMAGE_TAG_1} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_1}"
                }
                dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                    sh "docker tag ${DOCKER_IMAGE_TAG_2} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_2}"
                }
                dir ("${STORE_APIS_HANDLER_PATH}") {
                    sh "docker tag ${DOCKER_IMAGE_TAG_3} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_3}"
                }
            }
        }
        stage("Pushing Docker Images to ECR") {
            steps {
                dir ("${DYNAMO_DB_HANDLER_PATH}") {
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_1}"
                }
                dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_2}"
                }
                dir ("${STORE_APIS_HANDLER_PATH}") {
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_3}"
                }
            }
        }
        stage("Prune images, containers, networks, and volumes") {
            steps {
                sh "docker system prune -af --volumes"
            }
        }
        stage ("Deploying ECR images in Lambdas") {
            steps {
                sh '''
                    aws lambda update-function-code \
                    --region ${AWS_REGION} \
                    --function-name ${LAMBDA_FUNCTION_NAME_1} \
                    --image-uri ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_1}

                    aws lambda update-function-code \
                    --region ${AWS_REGION} \
                    --function-name ${LAMBDA_FUNCTION_NAME_2} \
                    --image-uri ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_2}

                    aws lambda update-function-code \
                    --region ${AWS_REGION} \
                    --function-name ${LAMBDA_FUNCTION_NAME_3} \
                    --image-uri ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_3}
                '''
            }
        }
    }
}