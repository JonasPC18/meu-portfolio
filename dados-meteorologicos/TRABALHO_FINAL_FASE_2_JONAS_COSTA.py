import matplotlib.pyplot as plt

# ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Primeiramente criei a função "carregar_dados" para criar um dicionário com todos os dados no arquivo csv. 
# Iniciei abrindo o arquivo e pulei a primeira linha, que é o cabeçalho.
# Depois criei a variável "lista_dados" que irá armazenar os meus dicionários.
# Utilizei a função ".split" para separar os dados sempre em que há uma vírgula.
# Por fim, peguei cada item da linha e criei um dicionário com as chaves dos itens do cabeçalho, e adicionei estes dicionários à lista_dados.
# ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def carregar_dados():
    with open('Anexo_Arquivo_Dados_Projeto_Logica_e_programacao_de_computadores.csv', 'r') as arquivo:
        linhas = arquivo.readlines()[1:]
    lista_dados = []
    for linha in linhas:
        itens = linha.split(',')
        dicionario = {
            'data': itens[0],
            'precip': float(itens[1]),
            'maxima': float(itens[2]),
            'minima': float(itens[3]),
            'horas_insol': float(itens[4]),
            'temp_media': float(itens[5]),
            'um_relativa': float(itens[6]),
            'vel_vento': float(itens[7])
        }
        lista_dados.append(dicionario)
    return lista_dados

# ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Criei a função "visualizacao_dados" para atender aos requisitos relativos ao item A do exercício.
# Começo a função pedindo para o usuário digitar mês e ano de início e fim no padrão MM/AAAA.
# Em seguida em "data_lista" retirei os 3 primeiros dígitos das datas (correspondentes aos dias e a primeira barra).
# Quanto aos inputs que forneci, separei eles em dois itens correspontentes a data e o ano, os inverti e juntei novamente, de modo a formar um numero (ex:12/2006 para 200612).
# Criei um novo input chamado "opcao" para o usuário escolher quais dados ele quer visualizar.
# A escolha do usuário vai para a função "impressao", junto com a data de inicio, data de fim e a lista de dados.
# Na função "impressao" transformei os dados correspondente as datas da lista em números e inverti ano e mês (ex:12/2006 para 200612), assim eu pude verificar quais datas estavam entre a data de início e a data de fim.
# Por fim, criei uma condição que retorna os dados que foram escolhidos no input da variável "opcao".
# ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def visualizacao_dados(lista):
    def impressao(data1,data2,lista2,numero):
        for i in lista2:
            data = i['data'][3:]
            data = data.split('/')
            data = data[1] + data[0]
            if data1 <= data <= data2:
                if numero == 1:
                    print(f"Data: {i['data']} - Precipitação: {i['precip']}mm - Temp. Máxima: {i['maxima']}°C - Temp. Mínima: {i['minima']}°C - Horas Insol.: {i['horas_insol']} - Temp. Média: {i['temp_media']}°C - Umidade Relativa: {i['um_relativa']}% - Vel. do Vento: {i['vel_vento']}m/s ")
                elif numero == 2:
                    print(f"Data: {i['data']} - Precipitação: {i['precip']}mm")
                elif numero == 3:
                    print(f"Data: {i['data']} - Temp. Máxima: {i['maxima']}°C - Temp. Mínima: {i['minima']}°C - Temp. Média: {i['temp_media']}°C")
                elif numero == 4:
                    print(f"Data: {i['data']} - Umidade Relativa: {i['um_relativa']}% - Vel. do Vento: {i['vel_vento']}m/s ")
                else:
                    print('Erro: Número inválido') 
                      
    inicio = input("Digite a data inicial em meses e anos (MM/AAAA): ")
    fim = input("Digite a data final em meses e anos (MM/AAAA): ")
    
    data_lista = [item['data'][3:] for item in lista]
    
    data_inicio = inicio.split('/')
    data_inicio = data_inicio[1] + data_inicio[0]
    data_fim = fim.split('/')
    data_fim = data_fim[1] + data_fim[0]
    
    if inicio in data_lista and fim in data_lista and data_inicio <= data_fim:
        opcao = int(input("Digite o que você deseja visualizar (1- Todos os dados, 2- Precipitação, 3- Temperatura, 4- Umidade e Vento): "))
        if opcao == 1 or opcao == 2 or opcao == 3 or opcao == 4:
            impressao(data_inicio, data_fim, lista, opcao) 
        else:
            print('Erro: Número Inválido')                  
    else:
        print("Erro: Datas Inválidas")    

# ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      
# A função mes_menos_chuvoso atende os requisitos do item B do exercício, ou seja, encontrar o mês menos chuvoso considerando todo o arquivo.
# Criei o dicionário "meses" que acumula a precipitação dos dias de determinado mês, relacionando com os meses e anos em que elas ocorreram.
# Ao final do processo de acumulação, a função utiliza a função "min()" com a chave "meses.get" para determinar a chave associada à menor soma de precipitação.
# A função então exibe o resultado, apresentando o mês e ano com a menor precipitação registrada, além da precipitação do mesmo mês.
# ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------       

def mes_menos_chuvoso(lista):
    meses = {}
    
    for i in lista:
        mes = int(i['data'].split('/')[1])
        ano = int(i['data'].split('/')[2])
        chave = (mes, ano)
        if chave not in meses:
            meses[chave] = 0
        meses[chave] += i['precip']
        
    mes_menor_precip = min(meses, key=meses.get)
    
    print(f'''Mês menos chuvoso: {mes_menor_precip[0]}/{mes_menor_precip[1]} 
Precipitação: {meses[mes_menor_precip]:.2f}mm''')

# ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# A função media_temperatura_min atende aos requisitos do item C do exercício.
#
# Começo transferindo os a lista de dados para a função.
# Na variável "temp_mes", peço para o usuário definir o mês que ele quer conferir a média da temperatura mínima.
# 
# Em seguida crio uma váriavel para a função "soma_todo_periodo", que calcula média geral da temperatura mínima de todos os meses.
# Na função "soma_todo_periodo" crio a variável "cont_dias" para saber quantos dias estão inclusos nos dados entre 2006 e 2016, e a variável "soma_minimas", que soma todas as temperaturas mínimas do período.
# Depois, na variável "media_total" divido a soma do período pelo numero de dias, obtendo a média (caso o "cont_dias" não for 0).
#
# Após obter a média de todo o período, as funções "lista_agosto" e "media_agosto" chamam a função "agosto".
# Na função "agosto", eu crio um dicionário que relaciona os anos com a média de temperatura de agosto deste ano.
# Em seguida, crio um loop para encontrar o numero de dias e a soma das mínimas de agosto de cada ano.
# Depois, calculo as médias de temperatura e adiciono no dicionário.
# Por fim, em "media_total" eu somo os valores do dicionário e divido por 10 (Este é o número de Agostos disponíveis no período. Caso o ano 2016 tivesse os dados de agosto, este número seria "11")
# Retorno o dicionário "minimas_por_ano" (que relaciona os anos com as respectivas médias de agosto) para a variável "lista_agosto".
# Retorno "media_total" (media da temp minima dos meses de agosto) para a variável "média_agosto"
# 
# Caso o número do mês escolhido pelo usuário na variável "temp_mes" esteja entre 1 e 12 exceto 8, a função "media" é ativada.
# Nessa função, basicamente calculo a média da temperatura mínima do mês escolhido, com a variavel "cont_dias" para verificar quantos dias tem o mês escolhido no período, e "minímas" para guardar os valores.
# Após verificar e guardar os valores com o loop, calculo a media em "soma_minimas" somando as minimas e divididindo pelo numero de dias.
# Retorno o valor de soma_minimas. 
# Continuando a condição, informo todos dados verificados nas funções que são solicitados no exercício.
#
# Caso o valor que o usuário digitou seja 8, correspondendo à agosto, pego o dicionário da função "agosto", que foi retornado para a variavel "lista_agosto"
# Utilizo um loop para exibir os dados das chaves (os anos) com seus valores (as médias)
# Depois exibo os dados solicitados.
# 
# Por fim, caso o mês digitado no input não esteja entre 1 e 12, exibo a frase "Número de mês inválido."
# ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------   

def media_temperatura_min(lista):
    
    def media(lista2, mes):
        cont_dias = 0
        minimas = []
        
        for i in lista2:
            data = i['data']
            mes_escolhido = int(data.split('/')[1])
            ano_periodo = int(data.split('/')[2])

            if mes == mes_escolhido and 2006 <= ano_periodo <= 2016:
                cont_dias += 1
                minimas.append(i['minima'])
    
        soma_minimas = (sum(minimas)) / cont_dias
        
        return soma_minimas
          
    def agosto(lista2):
        minimas_por_ano = {}
        
        for ano in range(2006, 2017):
            soma_minimas = 0
            cont_dias = 0
            for i in lista2:
                data = i['data']
                mes_periodo= int(data.split('/')[1])
                ano_periodo = int(data.split('/')[2])
                if mes_periodo == 8 and ano_periodo == ano:
                    cont_dias += 1
                    soma_minimas += i['minima']
            if cont_dias != 0:
                media_temp = soma_minimas / cont_dias
                minimas_por_ano[ano] = media_temp
        media_total = sum(minimas_por_ano.values()) / 10
        return(minimas_por_ano, media_total)
    
    def soma_todo_periodo(lista2):
        soma_minimas = 0
        cont_dias = 0
        
        for i in lista2:
            data = i['data']
            ano_periodo = int(data.split('/')[2])
            if 2006 <= ano_periodo <= 2016:
                cont_dias += 1
                soma_minimas += i['minima']
        media_total = soma_minimas / cont_dias if cont_dias != 0 else 0
        return media_total
                
    temp_mes = int(input('Digite o número do mês que deseja saber a média de temperatura mínima: '))
    media_geral = soma_todo_periodo(lista)
    lista_agosto, media_agosto = agosto(lista)
    
    if 1 <= temp_mes <= 7 or 9 <= temp_mes <= 12:
        media_mes_escolhido = media(lista, temp_mes)
        print(f'A média da temperatura mínima do mês informado (entre 2006 e 2016) é: {media_mes_escolhido:.2f}°C.')
        print(f'A média geral da temperatura mínima para todo o período de 2006 à 2016 é: {media_geral:.2f}°C.')
        print(f'A média geral da temperatura mínima dos meses de agosto (entre 2006 e 2016) é: {media_agosto:.2f}°C.')
        
    elif temp_mes == 8:
        print('Média de temperaturas de Agosto de cada ano entre 2006 e 2016:')
        for ano, media2 in lista_agosto.items():
            print(f'08/{ano}: {media2:.2f}°C')
        print(f'A média geral da temperatura mínima dos meses de agosto (entre 2006 e 2016) é: {media_agosto:.2f}°C.')   
        print(f'A média geral da temperatura mínima para todo o período de 2006 à 2016 é: {media_geral:.2f}°C.')
        
    else:
        print('Número de mês inválido.')
       
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
# Na função "gerar_grafico", inicialmente peço para o usuario inserir o número do mês para a visualização do gráfico.
# Após, coleto uma lista de anos e uma das médias de temperaturas do mês escolhido de cada ano (a função medias_temp é similar a função "agosto" da função "media_temperatura_min")
# A partir dessas listas, crio o gráfico solicitado, utilizando a biblioteca matplotlib.pyplot importada no inicio do código.
# Adiciono as legendas necessárias e exibo o gráfico.   
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
       
def gerar_grafico(lista):
    
    def medias_temp(lista2, mes):
        
        lista_anos = []
        lista_medias = []
        
        for ano in range(2006, 2017):
            soma_minimas = 0
            cont_dias = 0
            for i in lista2:
                data = i['data']
                mes_periodo= int(data.split('/')[1])
                ano_periodo = int(data.split('/')[2])
                if mes_periodo == mes and ano_periodo == ano:
                    cont_dias += 1
                    soma_minimas += i['minima']
            if cont_dias != 0:
                media_temp = soma_minimas / cont_dias
                string_mt = float(f'{media_temp:.2f}')
                lista_medias.append(string_mt)
                lista_anos.append(ano)
                
        return(lista_anos, lista_medias)
        
    escolha_mes = int(input('Digite o mês para o gráfico (1-12): '))
    anos, medias = medias_temp(lista,escolha_mes)
    print(anos,medias)

    plt.bar(anos, medias)
    plt.xlabel('Ano')
    plt.ylabel('Temperatura Mínima Média (°C)')
    plt.title(f'Médias de Temperatura Mínima do Mês {escolha_mes} (2006-2016)')
    plt.show()

# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
# O programa começa aqui, onde eu crio a variavel "dados" que chama a função que carrega os dados.
# Após, criei um input que recebe um número que equivale ao tipo de dados ele que o usuário quer visualizar. 
# Utilizei o loop para repetir a pergunta até que o usuário encerre o programa digitando o código "5".
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 

dados = carregar_dados()

while True:
    escolha_funcao = int(input('''========================================================================================
Escolha os dados que você quer visualizar: 

1 - Visualizar intervalo de dados em modo de texto.
2 - Mês menos chuvoso.
3 - Média da temperatura mínima de determinado mês entre 2006 e 2016.
4 - Gráfico com as médias de temperatura mínima de determinado mês entre 2006 e 2016.
5 - Sair.
========================================================================================
'''))

    if escolha_funcao == 1:
        visualizacao_dados(dados)
    elif escolha_funcao == 2:
        mes_menos_chuvoso(dados)
    elif escolha_funcao == 3:
        media_temperatura_min(dados)
    elif escolha_funcao == 4:
        gerar_grafico(dados)
    elif escolha_funcao == 5:
        break
    else:
        print('Número Inválido.')
