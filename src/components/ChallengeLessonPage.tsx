import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';

// Dados dos vídeos para cada desafio
const challengeLessonData: Record<string, { title: string; challengeVideoId: string; solutionVideoId?: string }> = {
  '1': { title: "Desafio 01", challengeVideoId: 'kuTfOme0Cng' },
  '2': { title: "Desafio 02", challengeVideoId: 'kuTfOme0Cng', solutionVideoId: '24cEQSPl_38' },
  '3': { title: "Desafio 03", challengeVideoId: 'kuTfOme0Cng', solutionVideoId: '24cEQSPl_38' },
  '4': { title: "Desafio 04", challengeVideoId: 'kuTfOme0Cng', solutionVideoId: '24cEQSPl_38' },
  '5': { title: "Desafio 05", challengeVideoId: 'kuTfOme0Cng', solutionVideoId: '24cEQSPl_38' },
  '6': { title: "Desafio 06", challengeVideoId: 'kuTfOme0Cng', solutionVideoId: '24cEQSPl_38' },
  '7': { title: "Desafio 07", challengeVideoId: 'kuTfOme0Cng', solutionVideoId: '24cEQSPl_38' },
  '8': { title: "Desafio 08", challengeVideoId: 'kuTfOme0Cng', solutionVideoId: '24cEQSPl_38' },
  '9': { title: "Desafio 09", challengeVideoId: 'kuTfOme0Cng', solutionVideoId: '24cEQSPl_38' },
  '10': { title: "Desafio 10", challengeVideoId: 'kuTfOme0Cng', solutionVideoId: '24cEQSPl_38' },
};


const ChallengeLessonPage: React.FC = () => {
  const navigate = useNavigate();
  const { challengeId } = useParams<{ challengeId: string }>();
  const [activeVideo, setActiveVideo] = useState<'challenge' | 'solution'>('challenge');
  const [player, setPlayer] = useState<any>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const lessonInfo = challengeId ? challengeLessonData[challengeId] : null;

  const currentVideoId = lessonInfo
    ? activeVideo === 'challenge'
      ? lessonInfo.challengeVideoId
      : lessonInfo.solutionVideoId
    : null;
  
  // Efeito para criar o player de vídeo
  useEffect(() => {
    const onPlayerReady = (event: any) => {
      setPlayer(event.target);
    };

    const onPlayerStateChange = (event: any) => {
      setShowPlayButton(event.data !== window.YT.PlayerState.PLAYING);
    };

    const initializePlayer = () => {
      if (playerRef.current) {
        if (player) {
          player.destroy();
        }
        new window.YT.Player(playerRef.current, {
          height: '100%',
          width: '100%',
          videoId: lessonInfo?.challengeVideoId, // Carrega o primeiro vídeo
          playerVars: {
            controls: 0, modestbranding: 1, rel: 0, showinfo: 0, fs: 1,
            playsinline: 1, origin: window.location.origin
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      }
    };
    
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }
  }, [challengeId]);

  // Efeito para trocar o vídeo ao clicar nos botões
  useEffect(() => {
    if (player && currentVideoId && typeof player.cueVideoById === 'function') {
      const currentLoadedId = player.getVideoData()?.video_id;
      // Carrega o vídeo apenas se for diferente do que já está carregado
      if (currentLoadedId !== currentVideoId) {
        // ----- A CORREÇÃO ESTÁ AQUI -----
        // `cueVideoById` prepara o vídeo sem tocar.
        player.cueVideoById(currentVideoId);
        setShowPlayButton(true);
      }
    }
  }, [activeVideo, player, currentVideoId]);

  if (!lessonInfo) {
    return <div className="min-h-screen bg-black text-white p-8">Desafio não encontrado.</div>;
  }

  const handlePlayClick = () => player?.playVideo();
  const handleVideoClick = () => {
    if (player && typeof player.getPlayerState === 'function') {
      const state = player.getPlayerState();
      if (state === window.YT.PlayerState.PLAYING) player.pauseVideo();
      else player.playVideo();
    }
  };

  const hasSolution = !!lessonInfo.solutionVideoId;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="container mx-auto px-4 pt-8">
        <button
          onClick={() => navigate('/bonus/desafios')}
          className="flex items-center hover:text-cyan-400 transition-colors duration-300 text-lg group mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Voltar para os Desafios
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{lessonInfo.title}</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 my-8">
        <div className="relative max-w-6xl mx-auto">
          <div className="video-container relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl cursor-pointer" onClick={handleVideoClick}>
            <div ref={playerRef} className="absolute inset-0 w-full h-full" />
            {showPlayButton && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10" onClick={(e) => { e.stopPropagation(); handlePlayClick(); }}>
                <div className="bg-purple-600 hover:bg-purple-700 rounded-full p-6 md:p-8 shadow-2xl transform hover:scale-110 transition-all duration-300 cursor-pointer">
                  <Play className="w-12 h-12 md:w-16 md:h-16 text-white ml-1" fill="currentColor" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {hasSolution && (
        <div className="container mx-auto px-4 mb-12">
          <div className="flex flex-col sm:flex-row gap-4 max-w-6xl mx-auto">
            <button
              onClick={() => setActiveVideo('challenge')}
              className={`flex-1 py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center text-white font-semibold ${activeVideo === 'challenge' ? 'bg-blue-500 ring-2 ring-blue-300 scale-105' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              Desafio
            </button>
            <button
              onClick={() => setActiveVideo('solution')}
              className={`flex-1 py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center text-white font-semibold ${activeVideo === 'solution' ? 'bg-green-600 ring-2 ring-green-400 scale-105' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              Solução
            </button>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 py-12 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {lessonInfo.title}
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

export default ChallengeLessonPage;
