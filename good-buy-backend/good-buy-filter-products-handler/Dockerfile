FROM public.ecr.aws/lambda/python:3.9

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

CMD ["src/lambda_function.lambda_handler"]