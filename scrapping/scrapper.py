from selenium import webdriver
#from selenium.webdriver.common.keys import Keys #usar en caso de necesitar teclas
from selenium.webdriver.common.by import By
from urllib.parse import urlencode, quote_plus # para codificar urls
import time
import json

markets = [
    {'name':'D1',
     'url':'https://domicilios.tiendasd1.com/search?name=',
     'productos':['pan', 'huevos'],
     'xpath':{
        'test':"//*[@class='CardName__CardNameStyles-sc-147zxke-0 bWeSzf prod__name']",
        'names':"//*[@class='CardName__CardNameStyles-sc-147zxke-0 bWeSzf prod__name']",
        'prices':"//*[@class='CardBasePrice__CardBasePriceStyles-sc-1dlx87w-0 bhSKFL base__price']",
        'images':"//*[@class='prod__figure__img']"
        },
     'options':{
        'scroll': {
            'behavior': False,
            'repeat':0
            }
        }
     },
    {'name':'Exito',
     'url':'https://www.exito.com/leche?_q=leche&map=ft',
     'productos':[''],
     'xpath':{
        'test':"//*[@class='vtex-search-result-3-x-galleryItem vtex-search-result-3-x-galleryItem--normal vtex-search-result-3-x-galleryItem--default pa4']/section/a/article/div[3]/div[2]/div/div/div/div/div/div/div[3]/div/div/div/h3/span",
        'names':"//*[@class='vtex-search-result-3-x-galleryItem vtex-search-result-3-x-galleryItem--normal vtex-search-result-3-x-galleryItem--default pa4']/section/a/article/div[3]/div[2]/div/div/div/div/div/div/div[3]/div/div/div/h3/span",
        'prices':"//*[@class='vtex-search-result-3-x-galleryItem vtex-search-result-3-x-galleryItem--normal vtex-search-result-3-x-galleryItem--default pa4']/section/a/article/div[3]/div[2]/div/div/div/div/div/div/div[4]/div[3]/div/span",
        'images':"//*[@class='vtex-search-result-3-x-galleryItem vtex-search-result-3-x-galleryItem--normal vtex-search-result-3-x-galleryItem--default pa4']/section/a/article/div[3]/div/div/img"
        },
     'options':{
        'scroll': {
            'behavior': True,
            'repeat':1
            }
        }
     },
    {'name':'Jumbo',
     'url':'https://www.tiendasjumbo.co/supermercado/despensa',
     'productos':[''],
     'xpath':{
        'test':"//*[@class='vtex-search-result-3-x-galleryItem vtex-search-result-3-x-galleryItem--gallery-css vtex-search-result-3-x-galleryItem--normal vtex-search-result-3-x-galleryItem--gallery-css--normal vtex-search-result-3-x-galleryItem--grid vtex-search-result-3-x-galleryItem--gallery-css--grid pa4']/section/a/article/div/div[2]/div/h3/span",
        'names':"//*[@class='vtex-search-result-3-x-galleryItem vtex-search-result-3-x-galleryItem--gallery-css vtex-search-result-3-x-galleryItem--normal vtex-search-result-3-x-galleryItem--gallery-css--normal vtex-search-result-3-x-galleryItem--grid vtex-search-result-3-x-galleryItem--gallery-css--grid pa4']/section/a/article/div/div[2]/div/h3/span",
        'prices':"//*[@class='vtex-search-result-3-x-galleryItem vtex-search-result-3-x-galleryItem--gallery-css vtex-search-result-3-x-galleryItem--normal vtex-search-result-3-x-galleryItem--gallery-css--normal vtex-search-result-3-x-galleryItem--grid vtex-search-result-3-x-galleryItem--gallery-css--grid pa4']/section/a/article/div/div[5]/div/div/div[2]/div/div/div/div",
        'images':"//*[@class='vtex-search-result-3-x-galleryItem vtex-search-result-3-x-galleryItem--gallery-css vtex-search-result-3-x-galleryItem--normal vtex-search-result-3-x-galleryItem--gallery-css--normal vtex-search-result-3-x-galleryItem--grid vtex-search-result-3-x-galleryItem--gallery-css--grid pa4']/section/a/article/div/div/div/div/div/div/img"
        },
     'options':{
        'scroll': {
            'behavior': True,
            'repeat':1
            }
        }
     }
    ]
def scrapMarket(market, driver, fullProductos):
    for i in market['productos']:
        try:
            driver.get(market['url']+i) # abrir url con elemento a buscar
            time.sleep(10)

            terminaDeCargar = False
            # el while va a esperar de a 1 segundo hasta que los productos hayan cargado
            i=0
            while(not terminaDeCargar):
                try:
                    # se va a saltar a catch en caso de que la pagina no haya finalizado de cargar productos
                    print('el' , driver.find_element(By.XPATH , market['xpath']['test']))
                    terminaDeCargar = True
                except:
                    i+=1
                    if(i>60):
                        a= 0 / 0
                    time.sleep(1)

            if market['options']['scroll']['behavior']:
                for i in range(market['options']['scroll']['repeat']):
                    driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
                    time.sleep(3)

            #obtener elementos HTML que contienen el nombre del producto
            list_names = driver.find_elements(By.XPATH , market['xpath']['names'])
            list_names = [ title.text for title in list_names ] # se recorre lista_names para (elementoHtml[i]  se reemplaza por elementoHtml[i].texto)
            #obtener elementos HTML que contienen el precio del producto
            list_prices = driver.find_elements(By.XPATH , market['xpath']['prices'])
            list_prices = [ int(price.text.replace("$ ","").replace(".","")) for price in list_prices ] # se recorre lista_prices para (elementoHtml[i]  se reemplaza por elementoHtml[i].textoSinPuntoYsinSimboloPrecio y se pasa a float )
            #obtener elementos HTML que contienen el la direccion de la imagen del producto en etiqueta src
            list_images = driver.find_elements(By.XPATH , market['xpath']['images']) 
            list_images = [ quote_plus(image.get_attribute('src')) for image in list_images ] # se recorre lista_images para (elementoHtml[i]  se reemplaza por elementoHTML[i].src )

            # a continuacion se almacenan todos los productos en un array bajo la estructura :
            #fullProductos[i] = {
            #   'name': 'nombreProducto',
            #   'price': 000.00,
            #   'market': 'nombresupermercado,
            #   'image':'https://servidorMerdao/direccion/de/imagen/ref/productoScrapeado'
            # }
            for i in range(len(list_names)):
                fullProductos.append({'name':list_names[i], 'price':list_prices[i], 'market':market['name'], 'image':list_images[i]})
            #time.sleep(10)

        except:
            print("error")
    return fullProductos

def uploadToBd(fullProductos, driver):
    stringElements = json.dumps(fullProductos)# se pasa el arreglo a JSON
    print(stringElements)
    driver.get('http://localhost:3000/uploadProductos') # se abre pagina de servidor propio
    inputP = driver.find_element(By.XPATH , "//*[@id='root']/input[1]")# se selecciona el input de la clave
    inputP.send_keys('U6hfsS2ZT4G9Ux8x')#se escribe la clave sobre el input
    input = driver.find_element(By.XPATH , "//*[@id='root']/input[2]")# se selecciona el input de los elementos
    input.send_keys(stringElements)#se escribe el JSON sobre el input
    btnSend = driver.find_element(By.XPATH , "//*[@id='root']/button")#se obtiene btn enviar
    btnSend.click() # se oprime btn enviar
    print(stringElements)
    #time.sleep(15) # se espera respuesta 
    response = ""
    i=0
    while(response != "success"):
        response = driver.find_element(By.XPATH , "//*[@id='response']").text# se selecciona el input
        time.sleep(2)
        i+=1
        if(i>30):
            a=0/0
    print('success')

def scrapMarkets(markets):
    fullProductos = [] # va a almacenar el resultado de los productos scrapeados
    driver = webdriver.Chrome('/chromedriver.exe')#creacion de driver
    for i in markets:
        fullProductos = scrapMarket(i, driver, fullProductos)
    uploadToBd(fullProductos, driver)

    driver.close()# se cierra el navegador 
    return fullProductos

result = scrapMarkets(markets)
