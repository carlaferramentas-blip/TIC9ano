/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CourseModule } from '../types';

export const modulesData: CourseModule[] = [
  {
    id: 'seguranca',
    title: 'Segurança, Responsabilidade e Respeito em Ambientes Digitais',
    category: 'Segurança',
    shortDescription: 'Desenvolve uma atitude crítica e responsável no uso de tecnologias móveis, protegendo os teus dados, compreendendo os direitos de autor e avaliando o impacto das tecnologias emergentes.',
    icon: 'ShieldAlert',
    objectives: [
      'Avaliar o impacto social de tecnologias emergentes como Inteligência Artificial (IA) e Realidades VR/AR.',
      'Adotar práticas seguras na utilização de dispositivos móveis e em redes Wi-Fi públicas.',
      'Configurar definições de privacidade (georreferenciação, acessos à câmara e microfone) nos dispositivos.',
      'Aplicar as regras de direitos de autor, licenciamento de software (Creative Commons) e acessibilidade digital.'
    ],
    subtopics: [
      {
        title: 'Tecnologias Emergentes e Sociedade',
        content: [
          'As tecnologias emergentes, tais como a Inteligência Artificial (IA), a Realidade Virtual (VR) e a Realidade Aumentada (AR), estão a transformar profundamente o nosso dia a dia, o mercado de trabalho e o lazer. Estas inovações oferecem ferramentas incríveis de simulação e produtividade, mas também geram novos dilemas éticos.',
          'Entre os principais desafios éticos da IA contam-se a possibilidade de discriminação por algoritmos enviesados, a criação de desinformação ultra-realista (como os deepfakes) e as implicações na substituição de postos de trabalho humanos. A reflexão crítica sobre estes impactos é essencial.',
          'Além disso, ao conceber ou utilizar aplicações móveis e sistemas inteligentes, é obrigatório respeitar os princípios da Acessibilidade Digital. Isto significa garantir que pessoas com necessidades especiais (visuais, auditivas ou motoras) consigam navegar e interagir com o software de forma elementar e autónoma.'
        ],
        keyConcepts: ['Inteligência Artificial', 'Realidade Virtual & Aumentada', 'Dilemas Éticos', 'Acessibilidade Digital']
      },
      {
        title: 'Privacidade e Segurança nos Dispositivos Móveis',
        content: [
          'Os dispositivos móveis (smartphones e tablets) acompanham-nos continuamente, recolhendo e processando uma enorme quantidade de dados pessoais sensíveis. Adotar práticas seguras de utilização destes aparelhos é crucial para mitigar riscos de segurança e privacidade.',
          'Um dos maiores vetores de ataque são os acessos através de redes Wi-Fi públicas e não encriptadas, onde atacantes podem intercetar tráfego e dados confidenciais. Evita realizar transações financeiras ou submeter dados escolares ligados a estas redes.',
          'Deves também analisar criteriosamente as permissões que cada aplicação instalada solicita. Configurações de privacidade que controlam a georreferenciação (localização por GPS), o acesso à câmara de vídeo, ao microfone e à lista de contactos devem ser restingidas à funcionalidade principal da aplicação para salvaguardar a tua identidade.'
        ],
        keyConcepts: ['Redes Wi-Fi Públicas', 'Georreferenciação', 'Permissões de Aplicações', 'Proteção de Privação']
      },
      {
        title: 'Direitos de Autor e Licenciamento de Aplicações',
        content: [
          'No desenvolvimento ou utilização de aplicações para dispositivos móveis, aplicam-se as normas de proteção da Propriedade Intelectual e dos Direitos de Autor. Qualquer código, design, imagem ou som está por defeito sob Copyright, não podendo ser reproduzido sem autorização explícita do autor.',
          'Como alternativa flexível, existem as licenças Creative Commons (CC), que facilitam o licenciamento partilhado sob condições pré-definidas (como BY - dar crédito, NC - não comercial, ND - sem modificações e SA - partilha semelhante). O software livre ou open-source permite a sua reutilização de acordo com a respetiva licença de uso.',
          'Ao publicar ou utilizar um artefacto tecnológico para fins escolares, deves sempre fazer referenda bibliográfica e declarar os direitos autorais e de licença dos produtos ou dados utilizados, garantindo cidadania digital interventiva.'
        ],
        keyConcepts: ['Propriedade Intelectual', 'Creative Commons', 'Direitos de Autor em Software', 'Licenças Open-Source']
      }
    ],
    quiz: [
      {
        id: 'srr-q1',
        question: 'No âmbito das aplicações móveis, o que visa garantir o princípio da "Acessibilidade"?',
        type: 'single',
        options: [
          'Garantir que a aplicação descarrega de forma rápida.',
          'Assegurar que a app pode ser operada por utilizadores com diferentes capacidades físicas, sensoriais ou motoras.',
          'Permitir que qualquer pessoa altere o código fonte livremente.',
          'Garantir que os servidores de armazenamento estão sempre operacionais.'
        ],
        correctAnswerIndex: 1,
        explanation: 'A acessibilidade digital garante que pessoas com dificuldades visuais, auditivas ou motoras consigam operar sistemas e aplicações sem barreiras.'
      },
      {
        id: 'srr-q2',
        question: 'Qual a recomendação de segurança mais fidedigna ao utilizar redes Wi-Fi abertas em locais públicos?',
        type: 'single',
        options: [
          'Utilizar as redes públicas livremente para enviar passwords e fazer pagamentos.',
          'Evitar aceder a dados confidenciais ou de pagamento e, se necessário, utilizar uma rede privada ou VPN.',
          'Apagar todas as aplicações instaladas no telemóvel antes de conectar.',
          'Manter a georreferenciação ativa em permanência no máximo detalhe.'
        ],
        correctAnswerIndex: 1,
        explanation: 'As redes públicas abertas carecem de encriptação robusta, tornando fácil a interceção de dados confidenciais por parte de terceiros maliciosos.'
      },
      {
        id: 'srr-q3',
        question: 'Por que motivo deves analisar criteriosamente as permissões de georreferenciação, câmara e microfone no teu telemóvel?',
        type: 'single',
        options: [
          'Para aumentar o volume sonoro das chamadas de voz.',
          'Porque estes acessos condicionam diretamente a tua privacidade e a recolha automática de dados pessoais.',
          'Para garantir que os jogos correm a uma velocidade superior.',
          'Porque melhora a resolução física do ecrã do telemóvel.'
        ],
        correctAnswerIndex: 1,
        explanation: 'As micro-funcionalidades de sensores determinam o controlo dos teus dados. Aplicações mal-intencionadas ou desnecessárias não devem aceder silenciosamente a estes recursos.'
      },
      {
        id: 'srr-q4',
        question: 'Se integras uma imagem licenciada sob atribuição não comercial Creative Commons (BY-NC) no teu projeto de app, deves:',
        type: 'single',
        options: [
          'Fazer uso comercial da obra e vender a aplicação para fins lucrativos.',
          'Dar os devidos créditos ao criador original e assegurar que a tua app é distribuída de forma totalmente gratuita.',
          'Ignorar a referência porque os direitos da internet pertencem a todos os estudantes.',
          'Modificar a assinatura do criador para colocares o teu próprio nome decorativo.'
        ],
        correctAnswerIndex: 1,
        explanation: 'A licença BY-NC obriga a dar crédito formal ao autor original (BY) e proíbe o aproveitamento para fins de lucro comercial (NC).'
      }
    ],
    exercise: {
      id: 'ex-seguranca',
      type: 'code-blocks',
      title: 'Configuração de Privacidade nos Dispositivos Móveis',
      description: 'Garante uma atitude responsável e segura ordenando os passos de configuração e privacidade necessários ao instalar e usar uma aplicação móvel no telemóvel.',
      task: 'Ordena os blocos de lógica do topo para a base para desenhar o fluxograma correto de privacidade e proteção de dados recomendada pelas Aprendizagens Essenciais.',
      blocks: [
        { id: 'b1', code: 'Analisar a credibilidade da fonte antes de instalar a aplicação', order: 1 },
        { id: 'b2', code: 'Verificar as permissões de acesso solicitadas pela aplicação', order: 2 },
        { id: 'b3', code: 'Rejeitar acessos desnecessários (ex: georreferenciação, câmara e microfone)', order: 3 },
        { id: 'b4', code: 'Ativar opções de privacidade e desativar recolha automática de dados', order: 4 },
        { id: 'b5', code: 'Utilizar uma ligação de rede privada, evitando redes Wi-Fi públicas', order: 5 }
      ]
    }
  },
  {
    id: 'pesquisa',
    title: 'Investigar e Pesquisar',
    category: 'Pesquisa',
    shortDescription: 'Planifica estratégias de investigação científica online, utiliza operadores avançados e avalia criticamente a fidedignidade da informação colhida.',
    icon: 'Search',
    objectives: [
      'Planificar estratégias eficientes de pesquisa e formular questões orientadoras.',
      'Definir palavras-chave precisas para refinar os resultados do motor de busca.',
      'Dominar o uso de filtros e operadores avançados (aspas, site:, filetype:).',
      'Analisar e depurar a credibilidade e qualidade das fontes encontradas.'
    ],
    subtopics: [
      {
        title: 'Planificação de Estratégias de Investigação',
        content: [
          'Uma pesquisa escolar bem-sucedida começa antes de abrirmos o motor de busca. A planificação da investigação permite formular questões pertinentes que delimitam o âmbito do problema a tratar, evitando a dispersão de tempo e a recolha de dados poluidos.',
          'Começa por estruturar o teu tema de investigação em sub-perguntas simples. De seguida, faz um levantamento conceptual identificando quais os termos, conceitos e sinónimos mais relevantes para as tuas pesquisas.',
          'Escolher os dispositivos digitais certos e as ferramentas de apoio adequadas (como bases de dados científicas ou repositórios documentais) é parte essencial da organização metodológica das Aprendizagens Essenciais.'
        ],
        keyConcepts: ['Planificação de Pesquisa', 'Questões Orientadoras', 'Palavras-Chave e Conceitos', 'Estratégias de Busca']
      },
      {
        title: 'Mecanismos e Operadores de Busca Avançada',
        content: [
          'Os motores de busca indexam biliões de páginas de internet. Para localizares de forma ultra-precisa a informação que te interessa num trabalho académico do 9º ano, deves utilizar os termos de pesquisa estruturados através de Operadores Avançados:',
          '• Aspas " ": Pesquisa rigorosamente pela correspondência exata de frase. Exemplo: "redes públicas de comunicação" força a correspondência das palavras juntas.',
          '• Sinal de menos - (Exclusão): Elimina páginas que contenham uma palavra indesejada. Exemplo: IA -filmes devolve informação de Inteligência Artificial sem conteúdos de ficção cinematográfica.',
          '• Operador site:: Restringe a busca a um domínio de país ou instituição específica. Exemplo: "cibersegurança" site:gov.pt limita a procura a portais do governo português.',
          '• Operador filetype:: Facilita a consulta de ficheiros de dados ou documentos formatados. Exemplo: "direitos de autor" filetype:pdf.'
        ],
        keyConcepts: ['Correspondência Exata', 'Operador site:', 'Filtros de Tipo de Arquivo', 'Palavras-Chave Estruturadas']
      },
      {
        title: 'Análise Crítica e Avaliação de Informação',
        content: [
          'A proliferação de notícias falsas (Fake News) e desinformação online exige que todos os alunos atuem como críticos de informação antes de a referenciar no seu trabalho.',
          'O método recomendado para auditoria de websites é o Teste CRAAP, que se organiza em 5 pilares fundamentais:',
          '1. Currency (Atualidade): A data de publicação ou revisão do artigo atesta que a informação está em vigor?',
          '2. Relevance (Relevância): O conteúdo responde de facto às tuas questões do trabalho?',
          '3. Authority (Autoridade): Quem é o autor, a instituição ou editora de publicação? Possuem credenciais académicas ou experiência certificada?',
          '4. Accuracy (Rigor): A informação é de facto sustentada por referências, factos verificados e ausente de gíria ou erros crassos?',
          '5. Purpose (Propósito): O site pretende informar o leitor de forma objetiva ou tentar vender, doutrinar ou simular um ponto de vista enviesado?'
        ],
        keyConcepts: ['Teste CRAAP', 'Desinformação & Fake News', 'Fidedignidade das Fontes', 'Fact-Checking']
      }
    ],
    quiz: [
      {
        id: 'pesquisa-q1',
        question: 'Ao deparares-te com uma notícia alarmante sobre a saúde pública numa rede social, qual deve ser a tua primeira atitude reflexiva segundo as regras de TIC?',
        type: 'single',
        options: [
          'Partilhar imediatamente com todos os teus contactos da turma para avisar a escola.',
          'Pesquisar em fontes oficiais ou canais governamentais fidedignos, aplicando o Teste CRAAP antes de aceitar a veracidade.',
          'Assumir que é totalmente verdade apenas porque a publicação tem milhares de partilhas.',
          'Copiar o conteúdo para o teu portefólio escolar sem qualquer de fonte.'
        ],
        correctAnswerIndex: 1,
        explanation: 'A partilha imediata sem verificação propaga desinformação. Devemo-nos pautar pelo rigor crítico, cruzamento de informação e avaliação de fontes.'
      },
      {
        id: 'pesquisa-q2',
        question: 'Qual a string de pesquisa correta no motor de busca se queres obter o plano curricular escolar de TIC de 9º ano em formato PDF apenas de portais governamentais portugueses?',
        type: 'single',
        options: [
          'planeamento TIC 9 ano pdf portugal',
          '"TIC 9 ano" site:gov.pt filetype:pdf',
          'TIC 9 ano -site:gov.pt',
          'pesquisar_regulamento(TIC, governotecnico.pdf)'
        ],
        correctAnswerIndex: 1,
        explanation: 'O recurso a aspas junta a frase de modo exato, "site:gov.pt" limita a domínios do governo português e "filetype:pdf" recolhe estritamente em formato de arquivo PDF.'
      },
      {
        id: 'pesquisa-q3',
        question: 'O que representa o critério "Currency" (Atualidade) ao auditares uma fonte online usando o modelo CRAAP?',
        type: 'single',
        options: [
          'A moeda de pagamento exigida para subscrever o website.',
          'O valor de mercado das ações da empresa detentora da página.',
          'A data de publicação, revisão ou atualização do documento digital analisado.',
          'A velocidade com que a página web abre no browser.'
        ],
        correctAnswerIndex: 2,
        explanation: 'A Atualidade (Currency) estuda se os dados se encontram atualizados e contemporâneos ou se, pelo contrário, já se tornaram obsoletos com a evolução do conhecimento.'
      },
      {
        id: 'pesquisa-q4',
        question: 'Como se define "Palavra-Chave" na planificação de um plano de pesquisa?',
        type: 'single',
        options: [
          'A palavra de acesso de administrador que protege a nossa conta escolar de login.',
          'Um termo ou conceito central e representativo do tema de pesquisa que serve para interrogar o motor de busca.',
          'Uma palavra com mais de trinta letras e de difícil pronúncia ortográfica.',
          'O nome do motor de busca que estamos a utilizar.'
        ],
        correctAnswerIndex: 1,
        explanation: 'As palavras-chave são os blocos construtores que resumem o tópico investigado, permitindo o emparelhamento com páginas web indexadas.'
      }
    ],
    exercise: {
      id: 'ex-pesquisa',
      type: 'code-blocks',
      title: 'Planeamento de Investigação e Pesquisa Online',
      description: 'Desenha um algoritmo lógico passo-a-passo para realizar uma investigação online sobre tecnologias de informação aplicadas à sociedade portuguesa.',
      task: 'Organiza os blocos lógicos na sequência padrão recomendada em TIC para realizar uma pesquisa com credibilidade e rigor.',
      blocks: [
        { id: 'b11', code: 'Definir a questão central de investigação e formular objetivos claros', order: 1 },
        { id: 'b12', code: 'Identificar palavras-chave e selecionar operadores lógicos avançados (ex: site:, aspas)', order: 2 },
        { id: 'b13', code: 'Executar a pesquisa online e selecionar fontes fidedignas de informação', order: 3 },
        { id: 'b14', code: 'Submeter a informação recolhida aos critérios do Teste CRAAP (Autoridade e Rigor)', order: 4 },
        { id: 'b15', code: 'Organizar, gerir os dados guardados e aplicar referências bibliográficas', order: 5 }
      ]
    }
  },
  {
    id: 'colaboracao',
    title: 'Comunicar e Colaborar',
    category: 'Colaboração',
    shortDescription: 'Mobiliza estratégias formais de comunicação síncrona e assíncrona e cria soluções lógicas de partilha na nuvem para trabalhos integrados em equipa.',
    icon: 'Cloud',
    objectives: [
      'Escolher corretamente ferramentas de comunicação síncrone e assíncrone.',
      'Organizar racionalmente árvores de ficheiros e pastas de trabalhos partilhados.',
      'Diferenciar e aplicar perfis de permissão corretos (Leitor, Comentador, Editor).',
      'Estruturar correios eletrónicos (e-mails) formais para os professores e entidades escolares.'
    ],
    subtopics: [
      {
        title: 'Comunicação Síncrona vs Assíncrona',
        content: [
          'A comunicação digital organiza-se em dois grandes blocos em função da presença de tempo real:',
          '• Comunicação Síncrona: Ocorre em tempo real. Os participantes interagem e respondem em simultâneo. Exemplos: videochamadas pelo Teams ou Meet, streaming direto e chats imediatos. É ideal para tomada de decisões urgentes e reuniões dinâmicas de projetos escolares.',
          '• Comunicação Assíncrona: Ocorre de forma deferida no tempo, não exigindo presença simultânea. Exemplos: correio eletrónico (e-mail), fóruns virtuais ou comentários em documentos partilhados na nuvem. Dá maior flexibilidade porque cada utilizador responde ao seu próprio ritmo racional.'
        ],
        keyConcepts: ['Comunicação Síncrona', 'Comunicação Assíncrona', 'Videoconferência', 'Correio Eletrónico']
      },
      {
        title: 'Organização de Portefólios de Trabalho na Nuvem',
        content: [
          'A organização e gestão de ficheiros escolares é uma competência fundamental de TIC. O armazenamento em nuvem (como o OneDrive ou o Google Drive) permite centralizar os teus portefólios de aprendizagem para acesso contínuo a partir de qualquer dispositivo.',
          'Esses sistemas reduzem os riscos de perda de dados. No entanto, exigem uma estrutura de pastas (árvore de diretórios) lógica e organizada. Deves evitar misturar ficheiros pessoais com os escolares e criar pastas dedicadas como "9º Ano" -> "TIC_9" e usar uma nomenclatura clara em ficheiros (por exemplo: "TIC_Ficha1_Rodrigo_N24.docx").'
        ],
        keyConcepts: ['Portefólio Digital', 'Estrutura de Pastas (Árvore)', 'Sincronização Cloud', 'Nomenclatura Normativa']
      },
      {
        title: 'Perfis de Partilha e E-mail Formal',
        content: [
          'A cooperação digital eficiente pauta-se pelo controlo correto das permissões de acesso e de visualização do teu trabalho:',
          '• Leitor (Viewer): Permissão unicamente de visualização e download. Útil para entregar trabalhos finais de avaliação ao teu professor de TIC.',
          '• Comentador (Commenter): Permite aos convidados adicionar anotações e comentários paralelos de melhoria sem modificar a estrutura original.',
          '• Editor (Editor): Permite ler, reescrever, alterar e apagar o conteúdo total. Reservado a trabalhos cooperativos em equipa unida.',
          'Para comunicarmos os trabalhos aos professores, usamos o e-mail oficial da escola. Deves escrever de forma cuidada, contendo um Assunto Explícito (ex: "Trabalho TIC Grupo 3 - 9ºA"), Saudação Formalizada (ex: "Exmo(a). Senhor(a) Professor(a)"), identificação clara do teu Nome/Número/Turma e a confirmação de que o ficheiro anexo se encontra devidamente anexado.'
        ],
        keyConcepts: ['Perfil Editorial', 'Comissão de Permissões', 'E-mail Formalizado', 'Submissão de Anexos']
      }
    ],
    quiz: [
      {
        id: 'colab-q1',
        question: 'Qual a permissão de partilha recomendada para criares um link de trabalho que queres enviar ao teu professor apenas para que ele faça anotações corretivas laterais, sem que possa alterar o teu texto diretamente?',
        type: 'single',
        options: [
          'Acesso de Editor.',
          'Acesso de Leitor.',
          'Acesso de Comentador.',
          'Nenhum acesso permitido.'
        ],
        correctAnswerIndex: 2,
        explanation: 'O acesso de comentador permite acrescentar observações laterais muito ricas em balões sem permitir alterar o texto oficial do próprio autor.'
      },
      {
        id: 'colab-q2',
        question: 'Identifica uma ferramenta ou plataforma puramente associada à comunicação "Assíncrona":',
        type: 'single',
        options: [
          'Uma videochamada de grupo em tempo real pelo Zoom.',
          'Um telefonema de voz de rede móvel.',
          'O envio de uma mensagem por correio eletrónico (e-mail) institucional.',
          'Uma conferência escolar de streaming ao vivo.'
        ],
        correctAnswerIndex: 2,
        explanation: 'O e-mail é assíncrono pois a pessoa que o recebe não precisa de estar online em simultâneo para o ler e responder posteriormente.'
      },
      {
        id: 'colab-q3',
        question: 'Ao elaborares uma mensagem de correio formal para pedir esclarecimentos ao teu professor de TIC, que elemento é de evitar?',
        type: 'single',
        options: [
          'Assunto resumido de forma clara no cabeçalho do e-mail.',
          'Saudação do tipo "Olá prof., vê aí rápido e diz algo!".',
          'Assinatura do teu nome civil completo e número de turma de base escolar.',
          'Indicação organizada do motivo do pedido de esclarecimento no texto.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Saudações excessivamente informais contrariam a netiqueta formal escolar ao comunicar com os superiores docentes.'
      },
      {
        id: 'colab-q4',
        question: 'Qual o perigo ético e social ao partilhar informações ou pensamentos de forma inapropriada nos canais de comunicação com a tua turma?',
        type: 'single',
        options: [
          'Diminuir a velocidade do computador pessoal.',
          'Promover conflitos sociais, cometer ciberassédio ou prejudicar a integridade pessoal de outros colegas.',
          'Aumentar o espaço de armazenamento na pasta de informática.',
          'Melhorar o sinal de transmissão da internet escolar.'
        ],
        correctAnswerIndex: 1,
        explanation: 'O comportamento irresponsável ou com linguagem inadequada danifica a harmonia interpessoal, violando as regras da Netiqueta e da cidadania digital preventiva.'
      }
    ],
    exercise: {
      id: 'ex-colaboracao',
      type: 'code-blocks',
      title: 'Configuração de Protocolo de Trabalho em Nuvem',
      description: 'Cria o algoritmo recomendado para estruturar as pastas partilhadas, definir os níveis de acesso adequados para a equipa e enviar a entrega final formalizada ao docente.',
      task: 'Ordena de cima para baixo os blocos de etapas de forma a garantir uma colaboração estruturada e segura na nuvem.',
      blocks: [
        { id: 'b21', code: 'Criar árvore de diretórios lógicos para o portefólio escolar', order: 1 },
        { id: 'b22', code: 'Adicionar os colegas de grupo à pasta comum com permissão de Editor', order: 2 },
        { id: 'b23', code: 'Configurar o link de partilha do professor apenas com perfil de Comentador', order: 3 },
        { id: 'b24', code: 'Redigir e-mail formal com assunto estruturado e saudação correta', order: 4 },
        { id: 'b25', code: 'Confirmar a presença do ficheiro anexo e enviar mensagem com sucesso', order: 5 }
      ]
    }
  },
  {
    id: 'programacao',
    title: 'Criar e Inovar',
    category: 'Programação',
    shortDescription: 'Cria portefólios digitais, domina folhas de cálculo para análise estatística e desenvolve o pensamento computacional através de programação móvel.',
    icon: 'Code',
    objectives: [
      'Recolher dados, analisá-los e criar representações estatísticas recorrendo a folhas de cálculo.',
      'Explorar a Internet das Coisas (IoT), realidade virtual/aumentada e a interação homem-computador.',
      'Desenvolver algoritmos computacionais lógicos através de estruturas de seleção e variáveis.',
      'Produzir, testar e validar pequenas aplicações para dispositivos móveis para soluções concretas.'
    ],
    subtopics: [
      {
        title: 'Folhas de Cálculo e Representação de Dados',
        content: [
          'Os alunos de TIC do 9º ano devem ser capazes de analisar, tratar e apresentar graficamente dados estatísticos recolhidos nas suas atividades ou sondagens escolares.',
          'A Folha de Cálculo (como Microsoft Excel ou Google Sheets) utiliza grelhas organizadas por Colunas (identificadas por letras) e Linhas (identificadas por números). A interseção cria Células individuais (como A1 ou E5).',
          'Através das fórmulas matemáticas e lógicas automáticas, conseguimos calcular somas, médias e estatísticas simples. Exemplo: `=CONTAR.SE(Intervalo; Critério)` conta apenas células que cumprem certas condições de conformidade (como o estado de uma fonte testada).'
        ],
        keyConcepts: ['Folha de Cálculo (Células)', 'Fórmulas e Funções', 'Representação Gráfica', '=CONTAR.SE']
      },
      {
        title: 'IoT e Tecnologias Emergentes',
        content: [
          'A Internet das Coisas (IoT - Internet of Things) é o conceito tecnológico que liga objetos físicos quotidianos à internet, permitindo que recolham dados e interajam de forma inteligente com o ambiente físico.',
          'Estes sistemas baseiam-se em Sensores (recolhem dados ambientais: temperatura, presença, luminosidade) e Atuadores (provocam ações mecânicas ou térmicas: motores, luzes, alarmes sonoros).',
          'Explorar novos modelos de interação (como comandos de gestos humanos e reconhecimento de som/voz) permite desenhar artefactos de Realidade Virtual (VR) e Realidade Aumentada (AR) integrados na sociedade do século XXI.'
        ],
        keyConcepts: ['Internet das Coisas', 'Sensores & Atuadores', 'Interação Homem-Máquina', 'Tecnologias Emergentes']
      },
      {
        title: 'Programação para Dispositivos Móveis',
        content: [
          'O desenvolvimento de programação móvel permite criar aplicações funcionais de utilidade prática. Através de metodologias ágeis de conceção (prototipagem por blocos de lógica ou código), os alunos aprendem a resolver problemas enunciados.',
          'Programar envolve o Pensamento Computacional e conceitos fundamentais como Variáveis (guardam informação temporária), Condicionais (estrutura se... senão / if... else) e Mecanismos de Repetição (ciclos de loops).',
          'O ciclo de criação de uma aplicação móvel divide-se em: Levantamento do problema -> Desenho de interfaces adaptáveis -> Codificação de blocos lógicos -> Teste e Depuração no simulador físico de telemóveis.'
        ],
        keyConcepts: ['Programação por Blocos', 'Pensamento Computacional', 'Variáveis e Constantes', 'Ciclo de Teste de Software']
      }
    ],
    quiz: [
      {
        id: 'prog-q1',
        question: 'O que caracteriza essencialmente os sensores e atuadores nos sistemas de "Internet das Coisas"?',
        type: 'single',
        options: [
          'Os sensores provocam ações físicas enquanto os atuadores servem apenas para imprimir dados.',
          'Os sensores captam dados do mundo físico (luz, calor) e os atuadores executam ações mecânicas ou respostas físicas no ambiente.',
          'Ambos são programas de software instalados unicamente nos computadores portáteis.',
          'Apenas servem para ler código HTML escrito no telemóvel.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Os sensores auscultam o estado físico do meio e transformam-no em dados. Os atuadores recebem a instrução lógica e provocam uma mudança física mecânica ou térmica no meio real.'
      },
      {
        id: 'prog-q2',
        question: 'Na programação computacional de um simulador móvel de telemóvel, o elemento "Variável" serve fundamentalmente para:',
        type: 'single',
        options: [
          'Representar a largura constante de um ecrã tátil físico.',
          'Armazenar um valor ou informação de dados na memória do telemóvel que pode mudar durante o funcionamento (ex: pontuação).',
          'Fazer a ligação wi-fi sem recurso à internet escolar.',
          'Desenhar o layout das fontes gráficas no ecrã superior.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Uma variável armazena temporariamente dados voláteis dinâmicos de que o programa necessita para executar as condições lógicas.'
      },
      {
        id: 'prog-q3',
        question: 'No processo de desenvolvimento de aplicações móveis digitais para resolver um problema proposto pelo professor, qual a ordem correta?',
        type: 'single',
        options: [
          'Desenhar o protótipo plástico -> Desenhar o código lógico -> Testar e depurar falhas no simulador móvel.',
          'Ignorar o desenho e passar imediatamente para a venda comercial da aplicação finalizada.',
          'Programar sem testar, partilhando o link com todos os alunos da turma.',
          'Apagar a aplicação após instalar para libertar recursos do telemóvel.'
        ],
        correctAnswerIndex: 0,
        explanation: 'O ciclo de desenvolvimento de software envolve o desenho de maquetas interativas (interfaces), o código de lógica e sucessivos testes de feedback físico.'
      },
      {
        id: 'prog-q4',
        question: 'Qual das seguintes fórmulas do Excel deves usar para contar automaticamente o número de alunos que obtiveram a menção de "Aprovado" numa pauta de avaliação escolar escrita na coluna F?',
        type: 'single',
        options: [
          '=CONTAR.SE(F2:F28; "Aprovado")',
          '=SOMAR.SE(F2:F28; "Aprovado")',
          '=CONTAR.VAZIO(F2:F28)',
          '=CALCULAR_TOTAL(F2:F28 == "Aprovado")'
        ],
        correctAnswerIndex: 0,
        explanation: 'A fórmula =CONTAR.SE executa uma contagem condicional em que são lidas apenas as células de determinado intervalo que contêm o valor textual procurado.'
      }
    ],
    exercise: {
      id: 'ex-programacao',
      type: 'spreadsheet-query',
      title: 'Representação de Dados e Estatística na Folha de Cálculo',
      description: 'Como aluno de TIC do 9º Ano, realizaste um inquérito às fontes do teu projeto escolar para avaliar fidedignidade e credibilidade. Precisas de criar uma fórmula na folha de cálculo Microsoft Excel para calcular o número de fontes certificadas como credíveis.',
      task: 'Analisa a tabela abaixo. Configura a fórmula de cálculo correta que conte dinamicamente quantas fontes obtiveram a classificação "Sim" na coluna E (intervalo E2:E5).',
      spreadsheetData: {
        headers: ['Fonte ID', 'Website Consultado', 'Autoridade (1-5)', 'Atualidade (Ano)', 'Credível?'],
        rows: [
          ['F01', 'DGE - Ministério Educação', '5', '2026', 'Sim'],
          ['F02', 'Blog Redes "DizQueDisse"', '1', '2023', 'Não'],
          ['F03', 'Wikipédia TIC Portugal', '4', '2026', 'Sim'],
          ['F04', 'Fórum Anónimo Polémico', '2', '2024', 'Não']
        ]
      },
      spreadsheetQuestion: {
        task: 'Qual a fórmula matemática/lógica de Folha de Cálculo correta para calcular a contagem de células correspondentes a "Sim" no intervalo E2:E5?',
        targetFormula: '=CONTAR.SE(E2:E5; "Sim")',
        correctResult: '2',
        feedback: 'A fórmula de Excel português =CONTAR.SE(E2:E5; "Sim") conta as correspondências com o critério indicado, obtendo o resultado correto de 2 fontes credíveis!'
      }
    }
  }
];
