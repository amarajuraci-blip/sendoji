import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Play, Download, MessageCircle, FileText, Maximize, ExternalLink } from 'lucide-react';
import BackButton from './BackButton';

// ===== CONFIGURAÇÃO FÁCIL - ALTERE AQUI =====
const COMMERCIALS_LIST = [
  { videoId: '', offerLink: '' },
  { videoId: 'DSYN1ZIdO4I', offerLink: 'https://ocaminhodaarte.com/como-desenhar-melhor-2-0/' },
  { videoId: 'Kt5rE0JnlUA', offerLink: 'https://metodofanart.com.br/' },
  { videoId: 'CNu9GjbgDxg', offerLink: 'https://agenciavirtual.neoenergia.com' },
  { videoId: '0Ab-F7Y3IXc', offerLink: 'https://www.instagram.com/' }
];
const AD_INTERVAL_HOURS = 3; // Intervalo em horas entre comerciais
// ============================================

const LessonPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const [activeTab, setActiveTab] = useState<'materials' | 'comments'>('materials');
  const [player, setPlayer] = useState<any>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showFullscreenButton, setShowFullscreenButton] = useState(false);
  const [isCommercial, setIsCommercial] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState<string>('');
  const [currentCommercial, setCurrentCommercial] = useState<{ videoId: string; offerLink: string } | null>(null);

  // Objeto de dados com os títulos originais e estáveis, agora com suporte opcional para pdfUrl
  const lessonData: Record<string, Record<string, { title: string; videoId: string; pdfUrl?: string }>> = {
    '1': {
        '01': { title: 'Começando do Zero', videoId: 'kuTfOme0Cng' },
        '02': { title: 'Treino dos Polígonos!', videoId: 'kuTfOme0Cng' },
        '03': { title: 'Formas Básicas', videoId: 'kuTfOme0Cng' },
        '04': { title: 'Primeiros Traços', videoId: 'kuTfOme0Cng' },
        '05': { title: 'Exercícios Práticos', videoId: 'kuTfOme0Cng' }
    },
    '2': {
        '01': { title: 'Materiais Essenciais', videoId: 'kuTfOme0Cng' },
        '02': { title: 'Escolhendo as Ferramentas', videoId: 'kuTfOme0Cng' }
    },
    '3': {
        '01': { title: 'Começando do ZERO!', videoId: 'QH2CO1GBS5Y' },
        '02': { title: 'Treino dos Polígonos!', videoId: 'bQTgVxJigo4', pdfUrl: 'https://drive.google.com/drive/folders/1c6vtceJANs4HqkW5SepDF_fIQogyV7DE?usp=drive_link' },
        '03': { title: 'Coração & Árvore', videoId: '3XPDAIy9MQ4', pdfUrl: 'https://drive.google.com/drive/folders/1B5ZkNEhRnyfm9QSUBr3OI_WzqmVy27sz?usp=drive_link' },
        '04': { title: 'Polígono de Pássaros', videoId: 'LVeUqJqBRXU', pdfUrl: 'https://drive.google.com/drive/folders/1Fh_NJXai66mZafiXNfgcQbQ-V-6JGCnN?usp=drive_link' },
        '05': { title: 'Polígono de Répteis', videoId: 'uK7dqTMxqic', pdfUrl: 'https://drive.google.com/drive/folders/10OpE1cF6uLP7C62VoJ4O-cp8d60_fBet?usp=drive_link' },
        '06': { title: 'Polígono de Aracnídeo', videoId: 'n4Kc4jMxUnE', pdfUrl: 'https://drive.google.com/drive/folders/1YAah8-WflQCCcPzSyGNwzTuNelhcNpSa?usp=drive_link' },
        '07': { title: 'Polígono de Face Humana', videoId: 'U_tmMonT-SI', pdfUrl: 'https://drive.google.com/drive/folders/1N_5Y_hIQy05L_qjdwwyp9S_GTeNptIi8?usp=drive_link' }
    },
    '4': {
        '01': { title: 'Os primeiros Esboços', videoId: 'H4K9jfnW23U', pdfUrl: 'https://drive.google.com/drive/folders/1xhag0WYJ_YW4gU6RFmibQsyhUPadwlyR?usp=drive_link' },
        '02': { title: 'Esboço de Desenhos Simples', videoId: 'kOwHguqn6kI', pdfUrl: 'https://drive.google.com/drive/folders/1z9jtXGLLghqktJy_eEnLecUXKOVC6P2m?usp=drive_link' },
        '03': { title: 'Vaca da leite & Abelha da mel', videoId: 'UIBGCSwbB0A', pdfUrl: 'https://drive.google.com/drive/folders/1sSI473CU64dDYm1F01lXDLErc-E5r_rm?usp=sharing' },
        '04': { title: 'Simplificando um Pato', videoId: '37hGJhCJcJc', pdfUrl: 'https://drive.google.com/drive/folders/1F6w0sMFpHqfCK7Qb5AhSON6AWuPOuf6T?usp=drive_link' },
        '05': { title: 'Simplificando uma Coruja', videoId: '7aiK8zvtC7c', pdfUrl: 'https://drive.google.com/drive/folders/1h1833Cyf1zowQYfB1Y1EvQMiqpkItvyH?usp=drive_link' },
        '06': { title: 'Simplificando um Golfinho', videoId: '6ArzJy7bT2M', pdfUrl: 'https://drive.google.com/drive/folders/1gsETFReidPZLdapUbwFCRxmBw6Z4YHX3?usp=drive_link' },
        '07': { title: 'Simplificando um Cachorro', videoId: 'X2efMgpMx6w', pdfUrl: 'https://drive.google.com/drive/folders/1N-MOcvy9gBpFEXXud9hHsSLkJceU5rs7?usp=drive_link' },
        '08': { title: 'Simplificando uma Vaca', videoId: 'wN6t_5L7hJY', pdfUrl: 'https://drive.google.com/drive/folders/1EeEb7yx_77U5jBllhFIRsGRHr7ACBtzn?usp=drive_link' },
        '09': { title: 'Simplificando um Porco', videoId: '88A0SqDiDUA', pdfUrl: 'https://drive.google.com/drive/folders/1bqJ_uf5Rhb8MwMCeciof1eL0i5a1QvUm?usp=drive_link' },
        '10': { title: 'Simplificando um Gatinho', videoId: 'uCS6nvxXp0s', pdfUrl: 'https://drive.google.com/drive/folders/1XQflS3pOLkF_Dbi9eMqx-0zK1bXIpG-s?usp=drive_link' }
    },
    '5': {
        '01': { title: 'Rosto Frontal', videoId: 'CQ5TiXwWRcw' },
        '02': { title: 'Perfil e 3/4"', videoId: 'GiU2shM1TVw' },
        '03': { title: '3/4" Inverso e Invertido', videoId: 'plk80s9C_Dw' },
        '04': { title: 'Um Novo Esboço!', videoId: '8O8u4BUUUyc' },
        '05': { title: 'Entendendo o Novo Esboço', videoId: 'AuX7dufZhog' },
        '06': { title: 'Rotação da Cabeça', videoId: 'x26BJgxmEOk' },
        '07': { title: 'Rotação Parte 2', videoId: '0OhF8c8z-cI' }
    },
    '6': {
        '01': { title: 'Regras dos olhos - PARTE 01', videoId: 'YN9K0qOFiqA', pdfUrl: 'https://drive.google.com/drive/folders/1c_4ubUxlAjKa-3wi_qiZWoL6OlaNZkUU?usp=drive_link' },
        '02': { title: 'Regras dos olhos - PARTE 02', videoId: 'FN8jqv6erZI' },
        '03': { title: 'Regras dos olhos - PARTE 03', videoId: 'NNt13vHH9TI', pdfUrl: 'https://drive.google.com/drive/folders/1Efx_ehi0V3E9FEApIDmbFx4FkF5c1BX9?usp=drive_link' },
        '04': { title: 'Composição do Nariz', videoId: 'NnTSJwZAELg', pdfUrl: 'https://drive.google.com/drive/folders/16j9tondx9q0sfWvL09RexU-Tjw1swlI9?usp=drive_link' },
        '05': { title: 'Cabelo Masculino', videoId: 'IWwSNqMHle8', pdfUrl: 'https://drive.google.com/drive/folders/1aOi7pqkkslkTMeBTnpt_f75BCv2qEEFN?usp=drive_link' },
        '06': { title: 'Cabelo Feminino', videoId: 'uoY9OQbIccU', pdfUrl: 'https://drive.google.com/drive/folders/1ncqbKmgvEl6HvKLEPnOePOr33Axu5xJM?usp=drive_link' }
    },
    '7': {
        '01': { title: 'Felicidade', videoId: 'ZwPCI6BGyYI', pdfUrl: 'https://drive.google.com/drive/folders/1WKM8vWbEaAidj8mn7hP6U2guIPFmnvET?usp=drive_link' },
        '02': { title: 'Raiva', videoId: 'qhJ71rADyYY' },
        '03': { title: 'Tristeza', videoId: '5ezJ3r7LQpw' },
        '04': { title: 'Medo', videoId: 'FHS1qT3qEzM' },
        '05': { title: 'Ódio', videoId: 'g_vpFHz8Ono' }
    },
    '8': {
        '01': { title: 'Gohan e Videl', videoId: 'ke9y4Rx-4qk', pdfUrl: 'https://drive.google.com/drive/folders/1rilNx7ByNMbiIeXwmYJSZgtNTOIYC8mt?usp=drive_link' },
        '02': { title: 'Naruto e Sasuke', videoId: 'kCXa5zMDSuI', pdfUrl: 'https://drive.google.com/drive/folders/1C_Smh0Mr1E1QiyBeQcK8rc1KLohQ-NIs?usp=drive_link' },
        '03': { title: 'Goku e Android N°17', videoId: 'mP1qaTHi5UA', pdfUrl: 'https://drive.google.com/drive/folders/1SpJTs7DXpqFg1uCPeLnMqA9EqR__Dg-N?usp=drive_link' },
        '04': { title: 'Gohan e Kakashi', videoId: 'evaUg6vxGwA', pdfUrl: 'https://drive.google.com/drive/folders/1ZtLIzBuxl8hpewblQpY8yOMWo6Jt-CAa?usp=drive_link' },
        '05': { title: 'Sakura e Sasuke', videoId: '88gb874YxbI', pdfUrl: 'https://drive.google.com/drive/folders/1q3DhzVeLOKoX4ctkIQwyi8TKlWBoqBUM?usp=drive_link' },
        '06': { title: 'Android N°18 e Sarada', videoId: 'Xg3XaI6BK4Q', pdfUrl: 'https://drive.google.com/drive/folders/1oF717baD_H2QtmhMhflzt2swqqHHgjoZ?usp=drive_link' },
        '07': { title: 'Tanjiro e Nezuko', videoId: '6dFPf3XIm3g', pdfUrl: 'https://drive.google.com/drive/folders/1tKjubRCnPdgL_DlbG28YElG46g36NPVB?usp=drive_link' }
    },
    '9': {
        '01': { title: 'Mão - Primeiro Treino', videoId: 'Paw9g0OoiLA' },
        '02': { title: 'Mão - Segundo Treino', videoId: 'vg0-l1bAa-8', pdfUrl: 'https://drive.google.com/drive/folders/10zanU9OzQZLtxCZ-kuabf1dBpcaIN-5V?usp=drive_link' },
        '03': { title: 'Mão - Terceiro Treino', videoId: 'AF74qIHyfEA', pdfUrl: 'https://drive.google.com/drive/folders/1CaZZEXcpinZEHV6y9Ghecz7DnKdHFdjC?usp=drive_link' },
        '04': { title: 'Treino de Pé', videoId: 'K1YhwLEzc_U', pdfUrl: 'https://drive.google.com/drive/folders/1uODHTG3cxr6ycI9tkSTEVJw8LoFI5psK?usp=drive_link' }
    },
    '10': {
        '01': { title: 'Corpo Frontal Masculino', videoId: 'h_lTs5mIJuY', pdfUrl: 'https://drive.google.com/drive/folders/1egz29QkGTNM4mQQOCze3WSPHZbY8b6qV?usp=drive_link' },
        '02': { title: 'Corpo Frontal Feminino', videoId: 'PSNOYIp7xkY' },
        '03': { title: 'Corpo de Perfil ( 2 género)', videoId: '8Uonv3H-8oQ', pdfUrl: 'https://drive.google.com/drive/folders/1tbtky5KxRIGSzyBOS3PHKaomRJZVeEfs?usp=drive_link' },
        '04': { title: 'Corpo de 3/4" ( 2 género)', videoId: 'gerYJ5sb5jo', pdfUrl: 'https://drive.google.com/drive/folders/1E3jK5Ly7OGtG2wSLtT7HnUz31YyIOK_0?usp=drive_link' },
        '05': { title: 'Corpo de Costa ( 2 género) ', videoId: 'blI8QfOSsoU', pdfUrl: 'https://drive.google.com/drive/folders/1nbwmw0jKShk6ZH5QQr7RZgkMk0SCtX1E?usp=drive_link' },
        '06': { title: 'Treino de Altura - PARTE 01', videoId: 'vpYREy_cmzI', pdfUrl: 'https://drive.google.com/drive/folders/1NIDo9PVOjDJuEzK07yHwEcMZ-Lqa56i3?usp=drive_link' },
        '07': { title: 'Treino de Altura - PARTE 02', videoId: 'kkcpq6zK_aU' },
        '08': { title: 'Treino de Altura - PARTE 03', videoId: '7bFqW6J58-s' }
    },
    'como-desenhar-1': {
        '01': { title: 'Aladdin', videoId: 'g5UMKjU9IlQ', pdfUrl: 'https://drive.google.com/drive/folders/185kUM49Sm85OUIZkCWlbI9dzxG4c1Nlt?usp=drive_link' }, '02': { title: 'Alice', videoId: 'AEPV7wrcMcA' }, '03': { title: 'Anna', videoId: 'qpahRSnYVDU' }, '04': { title: 'Ariel', videoId: 'jyL55tPe1uw' }, '05': { title: 'Branca de Neve', videoId: '6wV-S_2xYhw' }, '06': { title: 'Cinderela', videoId: 'd_ITYs-jCfg' }, '07': { title: 'Hércules', videoId: 'Z3MV0K3ILX0' }, '08': { title: 'Jasmine', videoId: 'vxSjNz5SZa4' }, '09': { title: 'Li Shang', videoId: 'loq3udIxtSs' }, '10': { title: 'Margarida', videoId: 'vNM5fu9h3dU' }, '11': { title: 'Mickey', videoId: 'HpgpAe_RR9Q' }, '12': { title: 'Minnie', videoId: 'YFyMFAnPiPo' }, '13': { title: 'Mulan', videoId: 'YiFrpBhKXRQ' }, '14': { title: 'Pateta', videoId: '-J6Vydw5Wso' }, '15': { title: 'Pato Donald', videoId: 'YbhJot8jb5Q' }, '16': { title: 'Peter Pan', videoId: 'f_FITuh139k' }, '17': { title: 'Pluto', videoId: 'ZV99adRsH1M' }, '18': { title: 'Pocahontas', videoId: 'yauh3N3mJYQ' }, '19': { title: 'Rapunzel', videoId: '5qdTMqde1LM' }, '20': { title: 'Tio Patinhas', videoId: '2a4RGaozcJ8' }
    },
    'como-desenhar-2': {
        '01': { title: 'Pernalonga', videoId: 'cM_m8qq-Z-g', pdfUrl: 'https://drive.google.com/drive/folders/1YzK6dyb-tQWTAqk6N1XZ0mwuLzVlUffb?usp=drive_link' }, '02': { title: 'Piu Piu', videoId: '5t28OpeJrvw' }, '03': { title: 'Tasmanian', videoId: 'JmVy64nNXoQ' }, '04': { title: 'Coiote', videoId: '3kA-mSH5erM' }, '05': { title: 'Daffy Duck', videoId: 'CX_KeG5at2U' }, '06': { title: 'Elmer Fudd', videoId: 'T4HFTo3Owts' }, '07': { title: 'Eufrazino', videoId: 'yNTesOnPlB8' }, '08': { title: 'Frajola Jr.', videoId: 'QuJOd65Ftns' }, '09': { title: 'Gaguinho', videoId: '_Qi1pCte7Z8' }, '10': { title: 'Lola Bunny', videoId: '7BN35Q-J97k' }, '11': { title: 'Marvin, o Marciano', videoId: '0Ok8gHXZgq0' }, '12': { title: 'Papa-Léguas', videoId: 'CLo5uV7w6XA' }, '13': { title: 'Pepé Le Pew', videoId: 'y5pP1x8oZJI' }, '14': { title: 'Petúnia', videoId: '_y04xAWI4dY' }, '15': { title: 'Speedy González', videoId: 'c1LpW5_NwtI' }
    },
    'como-desenhar-3': {
        '01': { title: 'Marge Simpson', videoId: 'xmxs7vnS0QU', pdfUrl: 'https://drive.google.com/drive/folders/1WQJVe_MavA-JwQa2cvHcDxUOKnvnwUwD?usp=drive_link' }, '02': { title: 'Bart Simpson', videoId: 'CPlTgu6DXP0' }, '03': { title: 'Homer Simpson', videoId: '-qK2ZZdCTt4' }, '04': { title: 'Lisa Simpson', videoId: 'aUOzqfO2pj0' }, '05': { title: 'Flanders', videoId: 'PlpSNLcnBrI' }, '06': { title: 'Milhouse Van Houten', videoId: 'P5ZYJLWrLZ8' }, '07': { title: 'Chefe Wiggum', videoId: 'T-F4gUtjWRg' }, '08': { title: 'Krusty o Palhaço', videoId: 'Zmr1GuGuEA0' }, '09': { title: 'Montgomery Burns', videoId: 'Hk8KzVMJeLg' }, '10': { title: 'Nelson Muntz', videoId: 'ais4CnXQe8E' }, '11': { title: 'Lisa Simpson', videoId: 'lDsundkF-oE' }, '12': { title: 'Bart Simpson', videoId: 'JbvUsgSaZLo' }, '13': { title: 'Robert Terwilliger', videoId: 'IJVAt2-BQgk' }, '14': { title: 'Abraham Simpson II', videoId: 'hFE0J6mLCVA' }, '15': { title: 'Zelador Willie', videoId: '1sKSbJss-So' }
    },
    'como-desenhar-4': {
        '01': { title: 'Boruto Uzumaki', videoId: 'IxQaV0_EcBs', pdfUrl: 'https://drive.google.com/drive/folders/1Qm7zNQPnHI5AMR6n2bUSmWxgaPyUDyrJ?usp=drive_link' }, '02': { title: 'Uchiha Sarada', videoId: '7Kg_keEyyro' }, '03': { title: 'Mitsuki', videoId: 'WNXHqMBtVSk' }, '04': { title: 'Kawaki', videoId: 'HV_q1_7PSu8' }, '05': { title: 'Shikadai Nara', videoId: 'NdzpUs36SPw' }, '06': { title: 'Uchiha Sasuke', videoId: 'UdfmhhYCvso' }, '07': { title: 'Metal Lee', videoId: 'wdiRMWG8DvU' }, '08': { title: 'Gaara (Kazekage)', videoId: 'IT790C0I7iw' }, '09': { title: 'Himawari Uzumaki', videoId: 'o7qOz_U4fe4' }, '10': { title: 'Boruto Uzumaki²', videoId: 'S_zdCo1kHiU' }, '11': { title: 'Shikamaru', videoId: 'sPc2eLOqR9U' }, '12': { title: 'Chocho Akimichi', videoId: 'EpyIgljFElw' }, '13': { title: 'Inojin Yamanaka', videoId: 'qgQp4vsrvrQ' }, '14': { title: 'Sumire Kakei', videoId: 'o3NsR-fkjIA' }, '15': { title: 'Suzumeno Namida', videoId: 'qNUrfSoPRnk' }
    },
    'como-desenhar-5': {
        '01': { title: 'Goku', videoId: 'vp8mG0smltw', pdfUrl: 'https://drive.google.com/drive/folders/1u6jf_qX8LgD3jK6Q6GIaVhHHuPRPfEuW?usp=drive_link' }, '02': { title: 'Gohan Kid', videoId: '2MwZjS2A00w' }, '03': { title: 'Tenchihan', videoId: 'GK39sqd-p5s' }, '04': { title: 'Vegeta', videoId: 'pVqUXNk-mE8' }, '05': { title: 'Kaioshin do Leste', videoId: 'Y4aMgaB8ZBY' }, '06': { title: 'Goku com bastão', videoId: 'D3uGYr5PA70' }, '07': { title: 'Freeza', videoId: 'kapXJc_LAJI' }, '08': { title: 'Ginyu', videoId: 'SSQBLcILZcc' }, '09': { title: 'Dodoria', videoId: '0zAwWSWfuAQ' }, '10': { title: 'Gohan²', videoId: 'ZJcIEFho5Y0' }, '11': { title: 'Android Nº17', videoId: 'YZCkqxHENBY' }, '12': { title: 'Android N°18', videoId: 'AZ5BVz_t8i0' }, '13': { title: 'Gotenks SSJ', videoId: 'hb_tSsDuphk' }, '14': { title: 'Majin Boo', videoId: 'snx7anC4-x8' }, '15': { title: 'Goku SSJ', videoId: 'E7TtDVFlz98' }
    },
    'como-desenhar-6': {
        '01': { title: 'Monkey D. Luffy', videoId: '7rNC_yWmy9I', pdfUrl: 'https://drive.google.com/drive/folders/171mnpy_KkncgdbyStWBOPftgf_vM1WZQ?usp=drive_link' }, '02': { title: 'Zoro', videoId: '05A5vKy1M8w' }, '03': { title: 'Nami', videoId: 'cHLY50ThHYs' }, '04': { title: 'Usopp', videoId: 'o76pTEPaBHo' }, '05': { title: 'Sanji', videoId: '1WfZRWCVuDw' }, '06': { title: 'Nico Robin', videoId: 'A2W-SPpejos' }, '07': { title: 'Chopper', videoId: 'f50XSTt--QQ' }
    },
    'bonus-perspectiva-0': {
        '01': { title: 'Introdução', videoId: 'kuTfOme0Cng' }
    }
  };

  const isComoDesenhar = location.pathname.includes('/como-desenhar/');
  const isBonusPerspective = location.pathname.includes('/bonus/perspectiva/');
  
  let currentModuleKey = moduleId || '1';
  if (isBonusPerspective) {
    currentModuleKey = `bonus-perspectiva-${moduleId}`;
  } else if (isComoDesenhar) {
    currentModuleKey = `como-desenhar-${moduleId}`;
  }

  const currentLesson = lessonData[currentModuleKey]?.[lessonId || '01'] || {
    title: 'Aula não encontrada',
    videoId: 'kuTfOme0Cng'
  };

  // Função para verificar se deve mostrar comercial
  const checkShouldShowCommercial = () => {
    // Se não há comerciais na lista, não mostrar comercial
    if (COMMERCIALS_LIST.length === 0) {
      return false;
    }

    const lastAdTimestamp = localStorage.getItem('lastAdTimestamp');
    if (!lastAdTimestamp) {
      return true; // Primeira vez, mostrar comercial
    }
    
    const lastAdTime = parseInt(lastAdTimestamp);
    const currentTime = Date.now();
    const timeDifference = currentTime - lastAdTime;
    const hoursElapsed = timeDifference / (1000 * 60 * 60); // Converter para horas
    
    return hoursElapsed >= AD_INTERVAL_HOURS;
  };

  // Função para sortear um comercial aleatório
  const getRandomCommercial = () => {
    if (COMMERCIALS_LIST.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * COMMERCIALS_LIST.length);
    return COMMERCIALS_LIST[randomIndex];
  };

  // Função para salvar timestamp do comercial
  const saveCommercialTimestamp = () => {
    localStorage.setItem('lastAdTimestamp', Date.now().toString());
  };

  // useEffect para determinar qual vídeo carregar inicialmente
  useEffect(() => {
    const shouldShow = checkShouldShowCommercial();
    if (shouldShow) {
      const selectedCommercial = getRandomCommercial();
      if (selectedCommercial) {
        setCurrentCommercial(selectedCommercial);
        setVideoToPlay(selectedCommercial.videoId);
        setIsCommercial(true);
      } else {
        // Se não há comerciais, carregar a aula diretamente
        setVideoToPlay(currentLesson.videoId);
        setIsCommercial(false);
      }
    } else {
      setVideoToPlay(currentLesson.videoId);
      setIsCommercial(false);
    }
  }, [currentLesson.videoId]);

  // useEffect principal para carregar/recriar o player do YouTube
  useEffect(() => {
    if (!videoToPlay) return;

    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        initializePlayer();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);
      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    };

    const initializePlayer = () => {
      // Destruir player existente se houver
      if (player) {
        player.destroy();
        setPlayer(null);
      }

      if (playerRef.current && window.YT) {
        const newPlayer = new window.YT.Player(playerRef.current, {
          height: '100%',
          width: '100%',
          videoId: videoToPlay,
          playerVars: {
            controls: isCommercial ? 0 : 1, // Sem controles para comercial
            modestbranding: 1, 
            rel: 0, 
            showinfo: 0, 
            fs: 1,
            cc_load_policy: 0, 
            iv_load_policy: 3, 
            autohide: 1, 
            disablekb: isCommercial ? 1 : 0, // Desabilitar teclado para comercial
            autoplay: isCommercial ? 1 : 0, // Autoplay apenas para comerciais
            playsinline: 1, 
            origin: window.location.origin
          },
          events: {
            onReady: (event: any) => {
              setPlayer(event.target);
              // Se for comercial, iniciar automaticamente
              if (isCommercial) {
                event.target.playVideo();
              }
            },
            onStateChange: (event: any) => {
              const state = event.data;
              setShowPlayButton(state !== window.YT.PlayerState.PLAYING);
              setShowFullscreenButton(state === window.YT.PlayerState.PLAYING || state === window.YT.PlayerState.PAUSED);
              
              // Quando o comercial termina, transicionar para a aula
              if (isCommercial && state === window.YT.PlayerState.ENDED) {
                saveCommercialTimestamp();
                setIsCommercial(false);
                setCurrentCommercial(null);
                setVideoToPlay(currentLesson.videoId);
              }
            }
          }
        });
      }
    };

    loadYouTubeAPI();

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoToPlay]); // Dependência apenas do videoToPlay

  const handlePlayClick = () => player?.playVideo();
  
  const handleVideoClick = () => {
    if (player) {
      const state = player.getPlayerState();
      if (state === window.YT.PlayerState.PLAYING) player.pauseVideo();
      else player.playVideo();
    }
  };
  
  const handleFullscreenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    player?.getIframe()?.requestFullscreen().catch((err: any) => console.log(err));
  };

  const handleOfferClick = () => {
    if (currentCommercial) {
      window.open(currentCommercial.offerLink, '_blank');
    }
  };

  const handlePreviousLesson = () => {
    const currentLessonNum = parseInt(lessonId || '01');
    if (currentLessonNum > 1) {
      const prevLesson = String(currentLessonNum - 1).padStart(2, '0');
      if (isComoDesenhar) navigate(`/como-desenhar/${moduleId}/aula/${prevLesson}`);
      else if (isBonusPerspective) navigate(`/bonus/perspectiva/${moduleId}/aula/${prevLesson}`);
      else navigate(`/modulo/${moduleId}/aula/${prevLesson}`);
    }
  };

  const handleNextLesson = () => {
    const currentLessonNum = parseInt(lessonId || '01');
    const maxLessons = Object.keys(lessonData[currentModuleKey] || {}).length;
    if (currentLessonNum < maxLessons) {
      const nextLesson = String(currentLessonNum + 1).padStart(2, '0');
      if (isComoDesenhar) navigate(`/como-desenhar/${moduleId}/aula/${nextLesson}`);
      else if (isBonusPerspective) navigate(`/bonus/perspectiva/${moduleId}/aula/${nextLesson}`);
      else navigate(`/modulo/${moduleId}/aula/${nextLesson}`);
    }
  };

  const handleBackToModule = () => {
    if (isComoDesenhar) navigate(`/como-desenhar/${moduleId}`);
    else if (isBonusPerspective) navigate(`/bonus/perspectiva/${moduleId}`);
    else navigate(`/modulo/${moduleId}`);
  };

  const currentLessonNum = parseInt(lessonId || '01');
  const maxLessons = Object.keys(lessonData[currentModuleKey] || {}).length;
  const hasPrevious = currentLessonNum > 1;
  const hasNext = currentLessonNum < maxLessons;

  const getModuleTitle = () => {
    if (isComoDesenhar) return `MÓDULO ${moduleId?.padStart(2, '0')} - Como Desenhar`;
    if (isBonusPerspective) return `BÔNUS: MÓDULO ${moduleId} - Perspectiva`;
    return `MÓDULO ${moduleId?.padStart(2, '0')}`;
  };

  // Determinar o título da página
  const pageTitle = isCommercial ? "Um Breve Anúncio" : `${lessonId}: ${currentLesson.title}`;
  
  return (
    <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 pt-8">
            <BackButton onClick={handleBackToModule} text="Voltar para a lista de aulas" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 mt-6">
              {pageTitle}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 my-8">
            <div className="relative max-w-6xl mx-auto">
                <div 
                    className="video-container relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl cursor-pointer"
                    onClick={handleVideoClick}
                    style={{ position: 'relative' }}
                >
                    <div ref={playerRef} className="absolute inset-0 w-full h-full" />
                    
                    {/* Botão de Play */}
                    {showPlayButton && (
                        <div 
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10"
                            onClick={(e) => { e.stopPropagation(); handlePlayClick(); }}
                            style={{ position: 'absolute', zIndex: 10 }}
                        >
                            <div className="bg-purple-600 hover:bg-purple-700 rounded-full p-6 md:p-8 shadow-2xl transform hover:scale-110 transition-all duration-300 cursor-pointer">
                                <Play className="w-12 h-12 md:w-16 md:h-16 text-white ml-1" fill="currentColor" />
                            </div>
                        </div>
                    )}
                    
                    {/* Botão de Tela Cheia */}
                    {showFullscreenButton && !isCommercial && (
                        <div className="absolute bottom-4 right-4 z-15" style={{ position: 'absolute', zIndex: 15 }}>
                            <button
                                onClick={handleFullscreenClick}
                                className="bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110 shadow-lg"
                                title="Tela Cheia"
                            >
                                <Maximize className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                    
                    {/* Botão da Oferta Especial - Só aparece durante o comercial */}
                    {isCommercial && currentCommercial && (
                        <div className="absolute bottom-4 right-4 z-20" style={{ position: 'absolute', zIndex: 20 }}>
                            <button
                                onClick={handleOfferClick}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse flex items-center gap-2"
                                title="Aproveitar Oferta Especial"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Aproveitar Oferta
                            </button>
                        </div>
                    )}
                    
                    {!showPlayButton && (
                        <div 
                            className="absolute inset-0 z-5 cursor-pointer"
                            style={{ position: 'absolute', zIndex: 5 }}
                            onClick={handleVideoClick}
                        />
                    )}
                </div>
            </div>
        </div>

        {/* Botões de Navegação - Escondidos durante o comercial */}
        {!isCommercial && (
            <div className="container mx-auto px-4 mb-12">
                <div className="flex flex-col sm:flex-row gap-4 max-w-6xl mx-auto">
                    <button 
                        onClick={handlePreviousLesson}
                        disabled={!hasPrevious}
                        className={`flex-1 py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center group ${hasPrevious ? 'bg-gray-900 hover:bg-gray-800 text-white cursor-pointer' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                    >
                        <ArrowLeft className={`w-5 h-5 mr-2 transition-transform duration-300 ${hasPrevious ? 'group-hover:-translate-x-1' : ''}`} />
                        Aula Anterior
                    </button>
                    <button 
                        onClick={handleNextLesson}
                        disabled={!hasNext}
                        className={`flex-1 py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center group ${hasNext ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                    >
                        Próxima Aula
                        <ArrowLeft className={`w-5 h-5 ml-2 rotate-180 transition-transform duration-300 ${hasNext ? 'group-hover:translate-x-1' : ''}`} />
                    </button>
                </div>
            </div>
        )}

        {/* Seção de Materiais e Comentários - Escondida durante o comercial */}
        {!isCommercial && (
            <div className="container mx-auto px-4 mb-16">
                <div className="max-w-6xl mx-auto">
                    <div className="flex border-b border-gray-800 mb-8">
                        <button
                            onClick={() => setActiveTab('materials')}
                            className={`flex items-center px-6 py-4 font-semibold transition-colors duration-300 border-b-2 ${activeTab === 'materials' ? 'text-purple-400 border-purple-400' : 'text-gray-400 border-transparent hover:text-white'}`}
                        >
                            <FileText className="w-5 h-5 mr-2" />
                            Materiais de Apoio
                        </button>
                        <button
                            onClick={() => setActiveTab('comments')}
                            className={`flex items-center px-6 py-4 font-semibold transition-colors duration-300 border-b-2 ${activeTab === 'comments' ? 'text-purple-400 border-purple-400' : 'text-gray-400 border-transparent hover:text-white'}`}
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Comentários
                        </button>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-8">
                        {activeTab === 'materials' && (
                            <>
                                {currentLesson.pdfUrl ? (
                                    <div className="text-center py-12">
                                        <FileText className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-white mb-2">Material Disponível</h3>
                                        <p className="text-gray-400 mb-6">Clique no botão abaixo para baixar o material de apoio.</p>
                                        <a
                                            href={currentLesson.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center mx-auto w-fit"
                                        >
                                            <Download className="w-5 h-5 mr-2" />
                                            Baixar Material
                                        </a>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-white mb-2">Materiais de Apoio</h3>
                                        <p className="text-gray-400 mb-6">Nenhum material disponível para esta aula.</p>
                                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center mx-auto opacity-50 cursor-not-allowed">
                                            <Download className="w-5 h-5 mr-2" />
                                            Download Materiais
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                        {activeTab === 'comments' && (
                            <div className="text-center py-12">
                                <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    EM BREVE, UMA NOVA FORMA DE INTERAGIR
                                </h3>
                                <p className="text-gray-400">
                                    ESTAMOS A TRABALHAR NUMA SECÇÃO DE COMENTÁRIOS DIRETAMENTE AQUI NA PÁGINA PARA VOCÊ PODER TIRAR DÚVIDAS E PARTILHAR O SEU PROGRESSO.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {isCommercial ? "Publicidade" : `${getModuleTitle()} - Aula ${lessonId}`}
                </h3>
            </div>
        </footer>
    </div>
  );
};

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default LessonPage;