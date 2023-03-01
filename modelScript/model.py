import numpy as np
import pandas as pd
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


similarity = 0;
data = [];

def function1():
    data = pd.read_csv('/data for model.csv', encoding= 'unicode_escape')
    selected_features = ['Title','netProfit','grossrevenue','reasonForSale','niches','countries']
    for feature in selected_features:
        data[feature] = data[feature].fillna('')


    combined_features = data['Title']+' '+str(data['netProfit'])+' '+str(data['grossrevenue'])+' '+data['reasonForSale']+' '+data['niches']+' '+data['countries']
    vectorizer = TfidfVectorizer()
    feature_vectors = vectorizer.fit_transform(combined_features)
    similarity = cosine_similarity(feature_vectors)



def function2(field_name):
    list_of_all_titles = data['niches'].tolist()
    find_close_match = difflib.get_close_matches(field_name, list_of_all_titles)
    close_match = find_close_match[0]
    index_of_the_movie = data[data.niches == close_match]['Index'].values[0]
    similarity_score = list(enumerate(similarity[index_of_the_movie]))
    sorted_similar_movies = sorted(similarity_score, key = lambda x:x[1], reverse = True) 
    print('Movies suggested for you : \n')
    title_from_index = []
    new_title = []

    for movie in sorted_similar_movies[0:10]:
        index = movie[0]
        new_title.append(data[data.index==index]['Id'].values[0])

    title_from_index = list(set(new_title))
    title_from_index