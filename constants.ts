import { PrayerDay, PurposeDay } from "./types";

export const PURPOSE_DAYS: PurposeDay[] = [
  {
    id: 1,
    title: "Dia 1: O Silêncio da Dor",
    theme: "Acalmar o coração",
    scripture: "Salmos 34:18 - Perto está o Senhor dos que têm o coração quebrantado.",
    devotional: "Hoje, permitimo-nos sentir, mas não nos desesperar. A dor da ruptura é real, mas ela não é o seu fim. Imagine que seu coração é uma casa sendo reformada; o barulho é alto agora, mas o Mestre de Obras está trabalhando nos alicerces.",
    guidance: "Não procure respostas hoje. Apenas respire. Evite olhar redes sociais. Seu único trabalho hoje é deixar Deus te abraçar.",
    prayer: "Senhor, meu coração dói e tudo parece confuso. Eu entrego essa dor a Ti, pois não consigo carregá-la sozinha. Cubra-me com Tua paz que excede o entendimento. Amém.",
    audioDuration: "04:12"
  },
  {
    id: 2,
    title: "Dia 2: Entregando o Controle",
    theme: "Remover a dor",
    scripture: "1 Pedro 5:7 - Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",
    devotional: "Muitas vezes, nossa dor vem da tentativa frustrada de controlar o que o outro sente ou faz. Hoje, soltamos as rédeas. O controle é uma ilusão; a confiança em Deus é a única rocha firme.",
    guidance: "Escreva em um papel tudo o que você queria controlar e queime ou rasgue esse papel, simbolizando a entrega.",
    prayer: "Pai, eu solto o controle. Eu solto a necessidade de entender os 'porquês'. Eu descanso na certeza de que Tu vês o que eu não vejo. Amém.",
    audioDuration: "05:45"
  },
  {
    id: 3,
    title: "Dia 3: Quem é Você?",
    theme: "Alinhamento Espiritual",
    scripture: "Isaías 43:1 - Não temas, porque eu te remi; chamei-te pelo teu nome, tu és meu.",
    devotional: "No meio do rompimento, é comum esquecermos quem somos. Você não é 'a ex de alguém'. Você é filha amada, preciosa e completa nEle. Sua identidade não foi embora com essa pessoa.",
    guidance: "Olhe no espelho hoje e diga 3 qualidades suas que Deus te deu e que independem de qualquer relacionamento.",
    prayer: "Senhor, restaura minha identidade. Lembra-me de quem sou em Ti. Que eu não busque meu valor no olhar do outro, mas no Teu amor. Amém.",
    audioDuration: "06:10"
  },
  {
    id: 4,
    title: "Dia 4: A Postura da Mulher Sábia",
    theme: "Postura Correta",
    scripture: "Provérbios 14:1 - A mulher sábia edifica a sua casa.",
    devotional: "Edificar a casa, neste momento, significa edificar o seu templo interior. A sabedoria é silenciosa. Ela não persegue, não implora, não se humilha por migalhas. Ela se posiciona em dignidade.",
    guidance: "Pratique o silêncio absoluto em relação a ele/ela hoje. Nenhuma mensagem, nenhuma indireta.",
    prayer: "Dá-me sabedoria, Pai. Que minhas palavras sejam poucas e cheias de graça. Que meu silêncio fale mais alto que meu desespero. Amém.",
    audioDuration: "05:20"
  },
  {
    id: 5,
    title: "Dia 5: O Poder do Perdão",
    theme: "Entrega e Silêncio",
    scripture: "Colossenses 3:13 - Assim como o Senhor vos perdoou, assim também perdoai vós.",
    devotional: "O perdão não é sobre liberar o outro da culpa, é sobre liberar você da prisão da amargura. Perdoar é tirar a mão do pescoço do outro e deixar Deus ser o juiz.",
    guidance: "Ore abençoando a vida dele(a). Isso dói, mas é o remédio mais poderoso para curar seu coração.",
    prayer: "Eu decido perdoar, Senhor. Não porque sinto vontade, mas porque preciso ser livre. Eu libero [Nome] para seguir, e eu sigo contigo. Amém.",
    audioDuration: "07:00"
  },
  {
    id: 6,
    title: "Dia 6: O Lugar Secreto",
    theme: "Posicionamento",
    scripture: "Mateus 6:6 - Mas tu, quando orares, entra no teu aposento...",
    devotional: "Sua maior batalha não é vencida com argumentos, mas no lugar secreto. É lá, de joelhos, que as maiores alianças são restauradas — a começar pela sua aliança com Deus.",
    guidance: "Tire 15 minutos hoje apenas para adorar, sem pedir nada. Apenas agradeça pelo que Deus é.",
    prayer: "Senhor, Tu és meu refúgio. No secreto, eu encontro força. Fortalece meu espírito para que minha alma se acalme. Amém.",
    audioDuration: "06:30"
  },
  {
    id: 7,
    title: "Dia 7: Um Novo Começo",
    theme: "Clareza e Paz",
    scripture: "Lamentações 3:22-23 - As misericórdias do Senhor são a causa de não sermos consumidos.",
    devotional: "Chegamos ao fim de um ciclo de 7 dias. Respire. Você sobreviveu. A paz que você sente agora é um sinal de que Deus está cuidando de tudo. Descanse. O futuro é dEle.",
    guidance: "Faça algo gentil por você hoje. Um café especial, um passeio, um presente.",
    prayer: "Pai, eu te agradeço por esses dias. Eu recebo Tua paz. Eu creio que o melhor ainda está por vir, seja como for. Eu confio em Ti. Amém.",
    audioDuration: "08:15"
  }
];

export const PRAYERS_30_DAYS: PrayerDay[] = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  title: `Oração do Dia ${i + 1}`,
  content: "Senhor, guarda meu coração hoje. Que a ansiedade não encontre morada em mim, mas que a Tua paz seja a sentinela dos meus pensamentos.",
  completed: false
}));

export const INITIAL_GREETINGS = [
  "Que a paz de Deus envolva seu coração, ",
  "Seja bem-vinda ao seu refúgio, ",
  "Respire fundo e confie, ",
  "Um passo de cada vez, ",
];
