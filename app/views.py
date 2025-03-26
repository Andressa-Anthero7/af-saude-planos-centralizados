from django.shortcuts import render, redirect
import requests
from .models import Leads, Config_WhatsApp
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.conf import settings
from django.utils.timezone import now

def index(request):
    if request.method == 'POST':
        # Capturar os dados do formulário
        nome_leads = request.POST.get('nome')
        whats_app_leads = request.POST.get('whatsapp')
        recebido_em = now()

        # Salvar no banco de dados
        Leads.objects.create(
            nome_leads=nome_leads,
            whats_app_leads=whats_app_leads,
            data_recebimento=recebido_em
        )

        # Configuração da API do WhatsApp
        url = f"https://graph.facebook.com/v13.0/{settings.PHONE_NUMBER_ID}/messages"
        
        payload = {
            "messaging_product": "whatsapp",
            "to": +5516993379492,  # Enviar para o depto de vendas
            "type": "text",
            "text": {
                "body": f"📢 Novo Lead recebido!\n\nNome: {nome_leads}\nWhatsApp: {whats_app_leads}\n\nVerifique na Dashboard\n\nhttps://planosaudesc.com.br/accounts/login/adriana/dashboard."
            }
        }

        headers = {
            "Authorization": f"Bearer {settings.ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }

        # Enviar mensagem pelo WhatsApp
        response = requests.post(url, headers=headers, json=payload)
        response_data = response.json()

        # Verificar resposta
        if response.status_code == 200:
            return render(request, 'site/agradecimento.html')
        else:
            return JsonResponse(
                {"message": "⚠️ Lead salvo, mas falha ao enviar mensagem",
                 "error": response_data},
                status=response.status_code
            )

    return render(request, 'site/index.html')

def agradecimento(request):
    return render(request, 'site/agradecimento.html')

def politica_privacidade(request):
    return render(request,'site/politica-privacidade.html')

@login_required
def dashboard(request,user):
    leads = Leads.objects.all().order_by('-data_recebimento')
    quantidade_leads =  Leads.objects.all()
    return render(request, 'site/dashboard.html', {'leads': leads,'quantidade_leads':quantidade_leads})

def status_envelope_leads(request,pk):
    if request.method == "POST":
        print('post')
        novo_status_envelope_leads = 'fa-envelope-open-text'
        Leads.objects.filter(pk=pk).update(status_envelope=novo_status_envelope_leads)
        leads = Leads.objects.all().order_by('-data_recebimento')
        quantidade_leads = Leads.objects.all()
        return redirect(reverse('dashboard',args=[request.user]))
    else:
        return redirect(reverse('dashboard',args=[request.user]))

def custom_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('login_redirect')  # Chama a URL de redirecionamento
        else:
            return render(request, 'registration/login.html', {'error': 'Usuário ou senha inválidos.'})
    return render(request, 'registration/login.html')

@login_required
def login_redirect(request):
    username = request.user.username
    url_redirect = f'/accounts/login/{username}/dashboard/'  # URL do dashboard
    return redirect(url_redirect)


def remover_lead(request,pk):
    lead_remover = get_object_or_404(Leads, pk=pk)
    lead_remover.delete()
    return JsonResponse({'Status': 'Leads Removido com Sucesso!!'}, status=200)