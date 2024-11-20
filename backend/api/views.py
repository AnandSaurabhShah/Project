from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import numpy as np
import joblib
import os
from .models import Autism
from .serializers import AutismSerializer
from rest_framework import status
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Model', 'ASD_final.pkl')
# Load the pre-trained model
model = joblib.load(model_path)

@api_view(['POST'])
def predict(request):
    if request.method == 'POST':
        serializer = AutismSerializer(data=request.data)
        if serializer.is_valid():
            input_data = tuple(serializer.validated_data.values())
            input_data_as_numpy_array = np.asarray(input_data).reshape(1, -1)
            print("Input data shape:", input_data_as_numpy_array.shape)
            
            # Make prediction
            prediction = model.predict(input_data_as_numpy_array)
            probability = model.predict_proba(input_data_as_numpy_array)[0][1]  # Probability of the positive class (autism)
            print("Prediction:", prediction)
            print("Probability of autism:", probability)
            
            # Return the prediction and probability as JSON response
            return Response({'prediction': prediction, 'probability': probability})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

