import numpy as np
import pandas as pd
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sys

data  = []
def function1():
    data = pd.read_csv('F:/areeb/FAST/ascension_backend/modelScript/data for model.csv', encoding= 'unicode_escape')
    selected_features = ['Title','netProfit','grossrevenue','reasonForSale','niches','countries']
    for feature in selected_features:
        data[feature] = data[feature].fillna('')

    combined_features = data['Title']+' '+str(data['netProfit'])+' '+str(data['grossrevenue'])+' '+data['reasonForSale']+' '+data['niches']+' '+data['countries']
    vectorizer = TfidfVectorizer()
    feature_vectors = vectorizer.fit_transform(combined_features)
    similarity = cosine_similarity(feature_vectors)
    print(similarity)



def function2(field_name):
    print(data)
    list_of_all_titles = data['niches'].tolist()
    # find_close_match = difflib.get_close_matches(field_name, list_of_all_titles)
    # close_match = find_close_match[0]
    # index_of_the_movie = data[data.niches == close_match]['Index'].values[0]
    # similarity_score = list(enumerate(similarity[index_of_the_movie]))
    # sorted_similar_business = sorted(similarity_score, key = lambda x:x[1], reverse = True) 
    # print('businesses suggested for you : \n')
    # businessID = []
    # new_title = []

    # for business in sorted_similar_business[0:10]:
    #     index = business[0]
    #     new_title.append(data[data.index==index]['niches'].values[0])

    # businessID = list(set(new_title))
    # print(businessID)



function_name = sys.argv[1]
if function_name == "initilize":
    function1()
else:
    function2(function_name)