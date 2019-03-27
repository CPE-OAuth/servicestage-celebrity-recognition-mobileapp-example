#!/usr/bin/python
# -*- coding: utf-8 -*-
import json
import requests
import os


# Common Variables
rest_api_base = 'http://49.4.13.131:30373/'
img_folder = os.getcwd() + '/minpics/'
app_id = 'myAppId'
headers = {'Content-Type': 'application/json', 'X-Parse-Application-Id': app_id}
headers_imgs = {'X-Parse-Application-Id': app_id}


# Insert object with file
def insertObjectWithFile(data_json, name_class, images_name):
    # Insert image
    image_api_url = '{0}mbaas/files/{1}'.format(rest_api_base, images_name)
    image_file = open(img_folder + images_name, 'rb').read()
    image_response = requests.post(image_api_url, headers=headers_imgs, data=image_file)
    if image_response.status_code == 201:

        # Prepare image data
        image_response_json = json.loads(image_response.content.decode('utf-8'))
        image_response_json['__type'] = "File"
        data_json['photo'] = image_response_json

        return insertObject(data_json, name_class)

    else:
        return 'Insert image failed: {0}'.format(image_response.status_code)


# Insert object
def insertObject(data_json, name_class):
    # Insert object
    api_url = '{0}mbaas/classes/{1}'.format(rest_api_base, name_class)
    response = requests.post(api_url, headers=headers, json=data_json)
    if response.status_code == 201:
        return json.loads(response.content.decode('utf-8'))
    else:
        return 'Insert object failed: {0}'.format(response.status_code)



# Get objects
def getObjects():
    api_url = '{0}mbaas/classes/{1}'.format(rest_api_base, name_class)
    response = requests.get(api_url, headers=headers)
    if response.status_code == 200:
        return json.loads(response.content.decode('utf-8'))
    else:
        return response.status_code


# Execute function
print(insertObjectWithFile({"position": "7th President of the People's Republic of China","wiki": "https://en.wikipedia.org/wiki/Xi_Jinping","name": "习近平","description": "Xi Jinping is a Chinese politician serving as general secretary of the Communist Party of China, president of the People's Republic of China, and chairman of the Central Military Commission. Often described as China's paramount leader since 2012, the CPC officially gave him the title of core leader in 2016.","education": "Tsinghua University (BE, LLD)[note 1]","nationality": "Chinese"}, 'CelebInfo', 'xijinping.jpg'))
print(insertObjectWithFile({"position": "Führer of Germany","wiki": "https://en.wikipedia.org/wiki/Adolf_Hitler","name": "希特勒","education": "No formal education","nationality": "German","born": "20 April 1889, Braunau am Inn, Austria","description": "Adolf Hitler was a German politician and leader of the Nazi Party. He rose to power to become dictator of Germany, serving as Chancellor from 1933 and Führer from 1934. During his dictatorship from 1933 to 1945, he initiated World War II in Europe by invading Poland in September 1939."}, 'CelebInfo', 'hitler.jpg'))
print(insertObjectWithFile({"position": "General Secretary of the Communist Party of China","wiki": "https://en.wikipedia.org/wiki/Hu_Jintao","name": "胡锦涛","education": "Degree in hydraulic engineering,Tsinghua University","nationality": "Chinese","born": "21 December 1942 (age 76), Taizhou, China","description": "Hu Jintao is a retired Chinese politician who was the paramount leader of China from 2002 to 2012. He held the offices of General Secretary of the Communist Party from 2002 to 2012, President of the People's Republic from 2003 to 2013 and Chairman of the Central Military Commission from 2004 to 2012"}, 'CelebInfo', 'hujintao.jpg'))
print(insertObjectWithFile({"position": "Actor, director, producer, action choreographer","wiki": "https://en.wikipedia.org/wiki/Jackie_Chan","name": "成龙","education": "not having received a proper education","nationality": "Chinese (Hong Kong)","born": "7 April 1954 (age 64),Chan Kong-sang","description": "Chan Kong-sang known professionally as Jackie Chan, is a Hong Kong martial artist, actor, film director, producer, stuntman, and singer. He is known for his acrobatic fighting style, comic timing, use of improvised weapons, and innovative stunts, which he typically performs himself, in the cinematic world. He has trained in wushu or kungfu and hapkido,[5][6] and has been acting since the 1960s, appearing in over 150 films."}, 'CelebInfo', 'jackiechan.jpg'))
print(insertObjectWithFile({"position": "General Secretary of the Communist Party of China","wiki": "https://en.wikipedia.org/wiki/Jiang_Zemin","name": "江泽民","education": "Shanghai Jiao Tong University (1947)","nationality": "Chinese","born": "17 August 1926 (age 92), Yangzhou, China","description": "Jiang Zemin is a retired Chinese politician who served as General Secretary of the Communist Party of China from 1989 to 2002, as Chairman of the Central Military Commission of the Communist Party of China from 1989 to 2004, and as President of the People's Republic of China from 1993 to 2003."}, 'CelebInfo', 'jiangzemin.jpg'))
print(insertObjectWithFile({"position": "Chairman of the Communist Party of China","wiki": "https://en.wikipedia.org/wiki/Mao_Zedong","name": "毛泽东","education": "Chinese classical literature","nationality": "Chinese","born": "26 December 1893, Xiangtan, China","description": "Mao Zedong, also known as Chairman Mao, was a Chinese communist revolutionary who became the founding father of the People's Republic of China, which he ruled as the Chairman of the Communist Party of China from its establishment in 1949 until his death in 1976."}, 'CelebInfo', 'mao.jpg'))
print(insertObjectWithFile({"position": "44th President of the United States","wiki": "https://en.wikipedia.org/wiki/Barack_Obama","name": "巴拉克·奥巴马","education": "Harvard Law School (1988–1991)","nationality": "American","born": "4 August 1961 (age 57), Hawaii, United States","description": "Barack Hussein Obama II is an American attorney and politician who served as the 44th President of the United States from 2009 to 2017. A member of the Democratic Party, he was the first African American to be elected to the presidency. He previously served as a U.S. senator from Illinois from 2005 to 2008."}, 'CelebInfo', 'obama.jpg'))
print(insertObjectWithFile({"position": "2nd President of Russia","wiki": "https://en.wikipedia.org/wiki/Vladimir_Putin","name": "弗拉基米尔·弗拉基米罗维奇·普京","education": "Saint Petersburg State University (LLB)","nationality": "Russian","born": "7 October 1952 (age 66), Russia","description": "Vladimir Vladimirovich Putin is a Russian politician and former intelligence officer serving as President of Russia since 2012, previously holding the position from 2000 until 2008. In between his presidential terms he was also the Prime Minister of Russia under his close associate Dmitry Medvedev."}, 'CelebInfo', 'putin.jpg'))
print(insertObjectWithFile({"position": "45th President of the United States","wiki": "https://en.wikipedia.org/wiki/Donald_Trump","name": "唐纳德·特朗普","education": "BSc in economics","nationality": "American","born": "June 14, 1946 (age 72), New York", "description": "Donald John Trump is the 45th and current president of the United States. Before entering politics, he was a businessman and television personality. Trump was born and raised in the New York City borough of Queens and received an economics degree from the Wharton School."}, 'CelebInfo', 'trump.jpg'))
print(insertObjectWithFile({"position": "4th President of the People's Republic of China","wiki": "https://en.wikipedia.org/wiki/Yang_Shangkun","name": "邓小平","education": "Moscow Sun Yat-sen University","nationality": "Chinese","born": "3 August 1907, Chongqing, China","description": "Yang Shangkun was President of the People's Republic of China from 1988 to 1993, and was a powerful Vice Chairman and Secretary-General of the Central Military Commission under Deng Xiaoping. He married Li Bozhao in 1929, one of the few women to participate in the Long March, as did Yang."}, 'CelebInfo', 'yang.jpg'))





