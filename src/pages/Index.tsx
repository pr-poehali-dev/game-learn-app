import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type Section = 'map' | 'collection' | 'daily' | 'practices' | 'profile';

interface Crystal {
  id: number;
  name: string;
  emoji: string;
  color: string;
  element: string;
  chakra: string;
  properties: string;
  unlocked: boolean;
  level: number;
}

interface MapLevel {
  id: number;
  position: { x: number; y: number };
  unlocked: boolean;
  completed: boolean;
  crystal: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('map');
  const [userLevel] = useState(5);
  const [userEnergy] = useState(850);
  const [maxEnergy] = useState(1000);
  const [selectedCrystal, setSelectedCrystal] = useState<Crystal | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);
    return () => ctx.close();
  }, []);

  const playChakraSound = (frequency: number) => {
    if (!audioContext) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.5);
  };

  const getChakraFrequency = (chakra: string): number => {
    const frequencies: Record<string, number> = {
      'Муладхара': 256,
      'Свадхистана': 288,
      'Манипура': 320,
      'Анахата': 341.3,
      'Вишудха': 384,
      'Аджна': 426.7,
      'Сахасрара': 480,
    };
    return frequencies[chakra] || 440;
  };

  const handleCrystalSelect = (crystal: Crystal) => {
    if (crystal.unlocked) {
      setSelectedCrystal(crystal);
      playChakraSound(getChakraFrequency(crystal.chakra));
    }
  };

  const handleLevelComplete = () => {
    setShowLevelUp(true);
    playChakraSound(528);
    setTimeout(() => setShowLevelUp(false), 3000);
  };

  const crystals: Crystal[] = [
    {
      id: 1, name: 'Аметист', emoji: '💜', color: 'from-purple-600 to-purple-400',
      element: 'Воздух', chakra: 'Сахасрара', 
      properties: 'Успокоение, духовность, защита от негатива',
      unlocked: true, level: 1
    },
    {
      id: 2, name: 'Розовый кварц', emoji: '🩷', color: 'from-pink-500 to-pink-300',
      element: 'Вода', chakra: 'Анахата',
      properties: 'Любовь к себе, гармония в отношениях, сострадание',
      unlocked: true, level: 2
    },
    {
      id: 3, name: 'Цитрин', emoji: '💛', color: 'from-yellow-500 to-yellow-300',
      element: 'Огонь', chakra: 'Манипура',
      properties: 'Изобилие, уверенность, творческая энергия',
      unlocked: true, level: 3
    },
    {
      id: 4, name: 'Лазурит', emoji: '💙', color: 'from-blue-600 to-blue-400',
      element: 'Эфир', chakra: 'Вишудха',
      properties: 'Истина, самовыражение, внутренняя мудрость',
      unlocked: true, level: 4
    },
    {
      id: 5, name: 'Малахит', emoji: '💚', color: 'from-emerald-600 to-emerald-400',
      element: 'Земля', chakra: 'Анахата',
      properties: 'Трансформация, защита, исцеление сердца',
      unlocked: true, level: 5
    },
    {
      id: 6, name: 'Чёрный турмалин', emoji: '🖤', color: 'from-gray-800 to-gray-600',
      element: 'Земля', chakra: 'Муладхара',
      properties: 'Заземление, защита от энергетических атак',
      unlocked: false, level: 6
    },
    {
      id: 7, name: 'Лунный камень', emoji: '🤍', color: 'from-slate-300 to-slate-100',
      element: 'Вода', chakra: 'Аджна',
      properties: 'Интуиция, женская энергия, эмоциональный баланс',
      unlocked: false, level: 7
    },
    {
      id: 8, name: 'Тигровый глаз', emoji: '🟤', color: 'from-amber-700 to-amber-500',
      element: 'Огонь', chakra: 'Манипура',
      properties: 'Сила воли, уверенность, финансовое благополучие',
      unlocked: false, level: 8
    },
  ];

  const mapLevels: MapLevel[] = [
    { id: 1, position: { x: 50, y: 85 }, unlocked: true, completed: true, crystal: '💜' },
    { id: 2, position: { x: 30, y: 70 }, unlocked: true, completed: true, crystal: '🩷' },
    { id: 3, position: { x: 50, y: 55 }, unlocked: true, completed: true, crystal: '💛' },
    { id: 4, position: { x: 70, y: 40 }, unlocked: true, completed: true, crystal: '💙' },
    { id: 5, position: { x: 50, y: 25 }, unlocked: true, completed: false, crystal: '💚' },
    { id: 6, position: { x: 30, y: 15 }, unlocked: false, completed: false, crystal: '🖤' },
    { id: 7, position: { x: 60, y: 10 }, unlocked: false, completed: false, crystal: '🤍' },
    { id: 8, position: { x: 50, y: 5 }, unlocked: false, completed: false, crystal: '🟤' },
  ];

  const dailyAffirmations = [
    'Я излучаю любовь и притягиваю её в свою жизнь',
    'Моя энергия чиста и защищена',
    'Я открыт для изобилия во всех формах',
    'Моя интуиция направляет меня к высшему благу',
    'Я нахожусь в гармонии с собой и миром',
  ];

  const practices = [
    { id: 1, title: 'Медитация с кристаллом', duration: '10 мин', icon: 'Sparkles', energy: 50 },
    { id: 2, title: 'Очищение пространства', duration: '5 мин', icon: 'Home', energy: 30 },
    { id: 3, title: 'Сетка изобилия', duration: '15 мин', icon: 'Grid3x3', energy: 70 },
    { id: 4, title: 'Утренний ритуал', duration: '20 мин', icon: 'Sunrise', energy: 100 },
  ];

  const navItems = [
    { id: 'map' as Section, icon: 'Map', label: 'Карта' },
    { id: 'collection' as Section, icon: 'Gem', label: 'Коллекция' },
    { id: 'daily' as Section, icon: 'Heart', label: 'Сегодня' },
    { id: 'practices' as Section, icon: 'Sparkles', label: 'Практики' },
    { id: 'profile' as Section, icon: 'User', label: 'Профиль' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <div className="container max-w-md mx-auto px-4 py-6 pb-24">
        <div className="bg-gradient-to-r from-primary via-secondary to-primary p-5 rounded-3xl mb-6 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Уровень {userLevel}</h1>
              <p className="text-white/80 text-sm">Путь кристаллов</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl animate-glow">
              💎
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-white/90 text-xs">
              <span>Энергия</span>
              <span>{userEnergy} / {maxEnergy}</span>
            </div>
            <Progress value={(userEnergy / maxEnergy) * 100} className="h-2 bg-white/20" />
          </div>
        </div>

        {activeSection === 'map' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-4">Карта путешествия</h2>
            <Card className="relative bg-gradient-to-b from-secondary/20 to-primary/20 border-primary/30 overflow-hidden" style={{ height: '500px' }}>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary blur-3xl"></div>
              </div>
              
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                {mapLevels.map((level, index) => {
                  if (index < mapLevels.length - 1) {
                    const nextLevel = mapLevels[index + 1];
                    return (
                      <line
                        key={`path-${level.id}`}
                        x1={`${level.position.x}%`}
                        y1={`${level.position.y}%`}
                        x2={`${nextLevel.position.x}%`}
                        y2={`${nextLevel.position.y}%`}
                        stroke={level.unlocked ? 'rgba(155, 135, 245, 0.5)' : 'rgba(100, 100, 100, 0.3)'}
                        strokeWidth="3"
                        strokeDasharray={level.unlocked ? '0' : '8 4'}
                      />
                    );
                  }
                  return null;
                })}
              </svg>

              {mapLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => level.id === userLevel && !level.completed && handleLevelComplete()}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                    level.unlocked ? 'scale-100 cursor-pointer hover:scale-110' : 'scale-90 opacity-50'
                  }`}
                  style={{ 
                    left: `${level.position.x}%`, 
                    top: `${level.position.y}%`,
                    zIndex: 10
                  }}
                >
                  <div className={`relative ${level.id === userLevel && 'animate-glow'}`}>
                    <div className={`w-16 h-16 rounded-full ${
                      level.completed ? 'bg-gradient-to-br from-accent to-primary' :
                      level.unlocked ? 'bg-gradient-to-br from-primary to-secondary' :
                      'bg-muted'
                    } flex items-center justify-center text-3xl shadow-xl border-4 ${
                      level.id === userLevel ? 'border-white' : 'border-background'
                    }`}>
                      {level.crystal}
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-foreground whitespace-nowrap">
                      {level.id}
                    </div>
                    {level.id === userLevel && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl">
                        🧘
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </Card>
          </div>
        )}

        {activeSection === 'collection' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-4">Моя коллекция</h2>
            {crystals.map((crystal) => (
              <Card
                key={crystal.id}
                onClick={() => handleCrystalSelect(crystal)}
                className={`p-4 bg-card border-border transition-all cursor-pointer ${
                  crystal.unlocked ? 'hover:scale-[1.02] hover:shadow-xl' : 'opacity-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${crystal.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {crystal.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{crystal.name}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">{crystal.element}</Badge>
                      <Badge variant="outline" className="text-xs">{crystal.chakra}</Badge>
                    </div>
                    {crystal.unlocked && (
                      <p className="text-xs text-muted-foreground mt-2">{crystal.properties}</p>
                    )}
                  </div>
                  {crystal.unlocked ? (
                    <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
                  ) : (
                    <Icon name="Lock" className="text-muted-foreground" size={20} />
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeSection === 'daily' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Sunrise" className="text-primary" size={28} />
                <h2 className="text-xl font-bold text-foreground">Аффирмация дня</h2>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 text-center">
                <p className="text-lg font-medium text-foreground leading-relaxed">
                  "{dailyAffirmations[0]}"
                </p>
                <div className="mt-4 text-4xl">💜</div>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary">
                <Icon name="Sparkles" className="mr-2" size={18} />
                Получить новую
              </Button>
            </Card>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Рекомендации дня</h3>
              <div className="grid gap-3">
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-2xl">
                      💜
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Аметист</h4>
                      <p className="text-xs text-muted-foreground">Успокоение и духовность</p>
                    </div>
                    <Icon name="Star" className="text-accent" size={20} />
                  </div>
                </Card>
                
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-center gap-3">
                    <Icon name="Moon" className="text-primary" size={24} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Фаза луны</h4>
                      <p className="text-xs text-muted-foreground">Растущая луна • Время для новых начинаний</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'practices' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-4">Практики</h2>
            {practices.map((practice) => (
              <Card key={practice.id} className="p-4 bg-card border-border hover:border-primary transition-all cursor-pointer hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name={practice.icon} className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{practice.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {practice.duration}
                      </span>
                      <span className="flex items-center gap-1 text-primary font-semibold">
                        <Icon name="Zap" size={14} />
                        +{practice.energy}
                      </span>
                    </div>
                  </div>
                  <Icon name="Play" className="text-primary" size={24} />
                </div>
              </Card>
            ))}

            <Card className="p-5 bg-gradient-to-br from-accent/20 to-primary/20 border-accent/30 mt-6">
              <div className="flex items-start gap-3">
                <Icon name="Lightbulb" className="text-accent mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Совет дня</h3>
                  <p className="text-sm text-foreground/80">
                    Держите кристаллы под проточной водой для очищения их энергии. Заряжайте их на солнце или при лунном свете.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-2xl text-4xl">
                  🧘
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Искатель</h2>
                <p className="text-muted-foreground mb-4">На пути с января 2025</p>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{userLevel}</p>
                    <p className="text-sm text-muted-foreground">Уровень</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-secondary">5</p>
                    <p className="text-sm text-muted-foreground">Кристаллов</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-accent">12</p>
                    <p className="text-sm text-muted-foreground">Практик</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 bg-card border-border">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Trophy" size={20} />
                Достижения
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <Icon name="Star" className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Первый кристалл</p>
                    <p className="text-xs text-muted-foreground">Начать коллекцию</p>
                  </div>
                  <Icon name="Check" className="text-accent" size={20} />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="Flame" className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Неделя практик</p>
                    <p className="text-xs text-muted-foreground">7 дней подряд</p>
                  </div>
                  <Icon name="Check" className="text-accent" size={20} />
                </div>

                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <Icon name="Crown" className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Мастер кристаллов</p>
                    <p className="text-xs text-muted-foreground">Собрать все камни</p>
                  </div>
                  <Icon name="Lock" className="text-muted-foreground" size={20} />
                </div>
              </div>
            </Card>
          </div>
        )}

        {selectedCrystal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedCrystal(null)}>
            <Card className="w-full max-w-sm p-6 bg-card border-border" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${selectedCrystal.color} flex items-center justify-center text-5xl shadow-2xl mb-4 animate-scale-in`}>
                  {selectedCrystal.emoji}
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{selectedCrystal.name}</h2>
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary">{selectedCrystal.element}</Badge>
                  <Badge variant="outline">{selectedCrystal.chakra}</Badge>
                </div>
                <p className="text-foreground/80 mb-6">{selectedCrystal.properties}</p>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary" onClick={() => setSelectedCrystal(null)}>
                  Закрыть
                </Button>
              </div>
            </Card>
          </div>
        )}

        {showLevelUp && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="text-center animate-scale-in">
              <div className="text-8xl mb-6 animate-bounce">✨</div>
              <h2 className="text-4xl font-bold text-white mb-4">Уровень пройден!</h2>
              <div className="text-6xl mb-6 animate-glow">💚</div>
              <p className="text-xl text-white/80">Малахит открыт</p>
              <div className="mt-8 flex justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border shadow-2xl">
        <div className="container max-w-md mx-auto px-2 py-3">
          <div className="flex justify-around items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground scale-110'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item.icon} size={22} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;