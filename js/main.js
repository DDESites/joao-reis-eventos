/* =========================================================
   João Reis Eventos — main.js
   Menu mobile, galeria (filtros + lightbox), formulário de
   orçamento e animações de entrada
   ========================================================= */
(function () {
  'use strict';

  /* -------------------------------------------------
     0. Dados de contato
     Fonte: Google Maps — João Reis - Aluguel de Mesas e Cadeiras
     (61) 99293-7016 · formato: 55 + DDD + número
     ------------------------------------------------- */
  var WHATSAPP_NUMERO = '5561992937016';

  function abrirWhatsApp(mensagem) {
    var url = 'https://wa.me/' + WHATSAPP_NUMERO;
    if (mensagem) url += '?text=' + encodeURIComponent(mensagem);
    window.open(url, '_blank', 'noopener');
  }

  /* Botões gerais com data-wpp="mensagem inicial" */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-wpp]');
    if (!el) return;
    e.preventDefault();
    abrirWhatsApp(el.getAttribute('data-wpp') || '');
  });

  /* -------------------------------------------------
     1. Menu mobile
     ------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function fecharMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var aberto = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!aberto));
      nav.classList.toggle('is-open', !aberto);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) fecharMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fecharMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) fecharMenu();
    });
  }

  /* -------------------------------------------------
     2. Galeria — filtros
     ------------------------------------------------- */
  var botoesFiltro = document.querySelectorAll('.filtro');
  var itensGaleria = document.querySelectorAll('.galeria__item');

  if (botoesFiltro.length && itensGaleria.length) {
    botoesFiltro.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filtro');

        botoesFiltro.forEach(function (b) { b.classList.remove('ativo'); });
        btn.classList.add('ativo');

        itensGaleria.forEach(function (item) {
          var combina = cat === 'todos' || item.getAttribute('data-categoria') === cat;
          item.classList.toggle('oculto', !combina);
        });
      });
    });
  }

  /* -------------------------------------------------
     3. Galeria — lightbox
     ------------------------------------------------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  var visiveis = [];
  var indiceAtual = 0;

  function itensVisiveis() {
    return Array.prototype.filter.call(itensGaleria, function (i) {
      return !i.classList.contains('oculto');
    });
  }

  function mostrarImagem(i) {
    if (!visiveis.length) return;
    indiceAtual = (i + visiveis.length) % visiveis.length;
    var img = visiveis[indiceAtual].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  function abrirLightbox(item) {
    if (!lightbox) return;
    visiveis = itensVisiveis();
    indiceAtual = visiveis.indexOf(item);
    mostrarImagem(indiceAtual);
    lightbox.classList.add('aberto');
    document.body.style.overflow = 'hidden';
  }

  function fecharLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('aberto');
    document.body.style.overflow = '';
  }

  if (lightbox && itensGaleria.length) {
    itensGaleria.forEach(function (item) {
      item.addEventListener('click', function () { abrirLightbox(item); });
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          abrirLightbox(item);
        }
      });
    });

    lightbox.querySelector('.lightbox__fechar').addEventListener('click', fecharLightbox);
    lightbox.querySelector('.lightbox__nav--ant').addEventListener('click', function () {
      mostrarImagem(indiceAtual - 1);
    });
    lightbox.querySelector('.lightbox__nav--prox').addEventListener('click', function () {
      mostrarImagem(indiceAtual + 1);
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) fecharLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('aberto')) return;
      if (e.key === 'Escape') fecharLightbox();
      if (e.key === 'ArrowLeft') mostrarImagem(indiceAtual - 1);
      if (e.key === 'ArrowRight') mostrarImagem(indiceAtual + 1);
    });
  }

  /* -------------------------------------------------
     4. Formulário de orçamento → WhatsApp
     ------------------------------------------------- */
  var form = document.getElementById('form-orcamento');

  if (form) {
    /* Máscara simples de telefone */
    var tel = form.querySelector('#telefone');
    if (tel) {
      tel.addEventListener('input', function () {
        var v = tel.value.replace(/\D/g, '').slice(0, 11);
        if (v.length > 6) {
          tel.value = '(' + v.slice(0, 2) + ') ' + v.slice(2, v.length > 10 ? 7 : 6) + '-' + v.slice(v.length > 10 ? 7 : 6);
        } else if (v.length > 2) {
          tel.value = '(' + v.slice(0, 2) + ') ' + v.slice(2);
        } else if (v.length) {
          tel.value = '(' + v;
        }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Remove mensagens de erro anteriores */
      form.querySelectorAll('.campo--erro').forEach(function (n) { n.remove(); });

      var dados = {
        nome: form.querySelector('#nome').value.trim(),
        telefone: form.querySelector('#telefone').value.trim(),
        data: form.querySelector('#data-evento').value,
        local: form.querySelector('#local').value.trim(),
        obs: form.querySelector('#observacoes').value.trim()
      };

      var itens = Array.prototype.map
        .call(form.querySelectorAll('input[name="itens"]:checked'), function (c) {
          return '• ' + c.value;
        });

      var faltando = [];

      function marcarErroEm(campo, msg) {
        var p = document.createElement('p');
        p.className = 'campo--erro';
        p.style.color = '#ff6b6b';
        p.style.fontSize = '0.8rem';
        p.style.marginTop = '6px';
        p.textContent = msg;
        campo.appendChild(p);
      }

      function marcarErro(id, msg) {
        marcarErroEm(form.querySelector('#' + id).closest('.campo'), msg);
      }

      if (!dados.nome) { faltando.push('nome'); marcarErro('nome', 'Informe seu nome.'); }
      if (dados.telefone.replace(/\D/g, '').length < 10) {
        faltando.push('telefone');
        marcarErro('telefone', 'Informe um telefone com DDD.');
      }
      if (!dados.local) { faltando.push('local'); marcarErro('local', 'Informe o local do evento.'); }
      if (!itens.length) {
        faltando.push('itens');
        marcarErroEm(form.querySelector('.campo--itens'), 'Selecione pelo menos um item.');
      }

      if (faltando.length) {
        var primeiro = form.querySelector('.campo--erro');
        if (primeiro) primeiro.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      var linhas = [
        'Olá! Vim pelo site da João Reis Eventos e gostaria de um orçamento. 😊',
        '',
        '👤 *Nome:* ' + dados.nome,
        '📞 *Telefone:* ' + dados.telefone
      ];

      if (dados.data) {
        var d = new Date(dados.data + 'T12:00:00');
        linhas.push('📅 *Data do evento:* ' + d.toLocaleDateString('pt-BR'));
      }

      linhas.push('📍 *Local:* ' + dados.local);
      linhas.push('', '*Itens desejados:*');
      linhas = linhas.concat(itens);

      if (dados.obs) linhas.push('', '*Observações:* ' + dados.obs);

      linhas.push('', 'Aguardo confirmação de disponibilidade e valor. Obrigado(a)!');

      abrirWhatsApp(linhas.join('\n'));
    });
  }

  /* -------------------------------------------------
     5. Animação de entrada das seções
     ------------------------------------------------- */
  var alvos = document.querySelectorAll('.animar');

  if (alvos.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          obs.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });

    alvos.forEach(function (el) { obs.observe(el); });
  } else {
    alvos.forEach(function (el) { el.classList.add('visivel'); });
  }

  /* -------------------------------------------------
     6. Ano atual no rodapé
     ------------------------------------------------- */
  var ano = document.getElementById('ano-atual');
  if (ano) ano.textContent = new Date().getFullYear();
})();
