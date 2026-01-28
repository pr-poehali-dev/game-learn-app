import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Section = 'home' | 'games' | 'courses' | 'achievements' | 'leaderboard' | 'shop' | 'profile';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [userLevel] = useState(12);
  const [userXP] = useState(3750);
  const [xpToNextLevel] = useState(5000);
  const [coins] = useState(2450);

  const navItems: { id: Section; icon: string; label: string }[] = [
    { id: 'home', icon: 'Home', label: 'Главная' },
    { id: 'games', icon: 'Gamepad2', label: 'Игры' },
    { id: 'courses', icon: 'GraduationCap', label: 'Курсы' },
    { id: 'achievements', icon: 'Trophy', label: 'Достижения' },
    { id: 'leaderboard', icon: 'Award', label: 'Рейтинг' },
    { id: 'shop', icon: 'ShoppingBag', label: 'Магазин' },
    { id: 'profile', icon: 'User', label: 'Профиль' },
  ];

  const games = [
    { id: 1, title: 'Математическая гонка', xp: 50, difficulty: 'Легко', icon: 'Calculator' },
    { id: 2, title: 'Загадки логики', xp: 75, difficulty: 'Средне', icon: 'Brain' },
    { id: 3, title: 'Викторина истории', xp: 100, difficulty: 'Сложно', icon: 'BookOpen' },
    { id: 4, title: 'Химический паззл', xp: 80, difficulty: 'Средне', icon: 'FlaskConical' },
  ];

  const courses = [
    { id: 1, title: 'Основы программирования', progress: 65, icon: 'Code' },
    { id: 2, title: 'Английский язык', progress: 42, icon: 'Languages' },
    { id: 3, title: 'Физика для начинающих', progress: 88, icon: 'Atom' },
    { id: 4, title: 'Мировая литература', progress: 23, icon: 'BookMarked' },
  ];

  const achievements = [
    { id: 1, title: 'Первые шаги', desc: 'Завершить первый урок', unlocked: true, icon: 'Star' },
    { id: 2, title: 'Неделя побед', desc: '7 дней подряд', unlocked: true, icon: 'Flame' },
    { id: 3, title: 'Мастер игр', desc: 'Пройти 50 игр', unlocked: false, icon: 'Medal' },
    { id: 4, title: 'Эксперт', desc: 'Достичь 20 уровня', unlocked: false, icon: 'Crown' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Александр', level: 28, xp: 15420 },
    { rank: 2, name: 'Мария', level: 25, xp: 13890 },
    { rank: 3, name: 'Дмитрий', level: 23, xp: 12150 },
    { rank: 4, name: 'Вы', level: userLevel, xp: userXP },
  ];

  const shopItems = [
    { id: 1, title: 'Двойной XP', price: 500, icon: 'Zap' },
    { id: 2, title: 'Новая аватарка', price: 300, icon: 'Image' },
    { id: 3, title: 'Подсказка +5', price: 200, icon: 'Lightbulb' },
    { id: 4, title: 'Тема "Космос"', price: 800, icon: 'Sparkles' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Легко') return 'bg-green-500/20 text-green-400';
    if (difficulty === 'Средне') return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-red-500/20 text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 rounded-3xl mb-6 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Уровень {userLevel}</h1>
              <p className="text-white/80 text-sm">{userXP} / {xpToNextLevel} XP</p>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Icon name="Coins" className="text-yellow-300" size={20} />
              <span className="font-bold text-white">{coins}</span>
            </div>
          </div>
          <Progress value={(userXP / xpToNextLevel) * 100} className="h-3 bg-white/20" />
        </div>

        <div className="mb-6 animate-slide-up">
          {activeSection === 'home' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground mb-4">Популярные игры</h2>
              {games.slice(0, 2).map((game) => (
                <Card key={game.id} className="p-4 bg-card border-border hover:border-primary transition-all cursor-pointer hover:scale-[1.02] hover:shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon name={game.icon} className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{game.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(game.difficulty)}>{game.difficulty}</Badge>
                        <span className="text-sm text-muted-foreground">+{game.xp} XP</span>
                      </div>
                    </div>
                    <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
                  </div>
                </Card>
              ))}
              
              <h2 className="text-2xl font-bold text-foreground mb-4 mt-6">Продолжить обучение</h2>
              {courses.slice(0, 2).map((course) => (
                <Card key={course.id} className="p-4 bg-card border-border hover:border-secondary transition-all cursor-pointer hover:scale-[1.02]">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                      <Icon name={course.icon} className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.progress}% завершено</p>
                    </div>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </Card>
              ))}
            </div>
          )}

          {activeSection === 'games' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground mb-4">Все игры</h2>
              {games.map((game) => (
                <Card key={game.id} className="p-4 bg-card border-border hover:border-primary transition-all cursor-pointer hover:scale-[1.02] hover:shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                      <Icon name={game.icon} className="text-white" size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">{game.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(game.difficulty)}>{game.difficulty}</Badge>
                        <span className="text-sm font-semibold text-primary">+{game.xp} XP</span>
                      </div>
                    </div>
                    <Icon name="Play" className="text-primary" size={24} />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeSection === 'courses' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground mb-4">Мои курсы</h2>
              {courses.map((course) => (
                <Card key={course.id} className="p-5 bg-card border-border hover:border-secondary transition-all cursor-pointer hover:scale-[1.02]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg">
                      <Icon name={course.icon} className="text-white" size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.progress}% завершено</p>
                    </div>
                  </div>
                  <Progress value={course.progress} className="h-3" />
                </Card>
              ))}
            </div>
          )}

          {activeSection === 'achievements' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground mb-4">Достижения</h2>
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`p-4 bg-card border-border transition-all ${achievement.unlocked ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl ${achievement.unlocked ? 'bg-gradient-to-br from-accent to-primary' : 'bg-muted'} flex items-center justify-center shadow-lg`}>
                      <Icon name={achievement.icon} className="text-white" size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                    </div>
                    {achievement.unlocked && (
                      <Icon name="Check" className="text-accent" size={24} />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeSection === 'leaderboard' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground mb-4">Таблица лидеров</h2>
              {leaderboard.map((player) => (
                <Card key={player.rank} className={`p-4 bg-card border-border ${player.name === 'Вы' ? 'border-primary border-2' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${player.rank <= 3 ? 'bg-gradient-to-br from-accent to-primary' : 'bg-muted'} flex items-center justify-center font-bold text-white text-xl`}>
                      {player.rank}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{player.name}</h3>
                      <p className="text-sm text-muted-foreground">Уровень {player.level} • {player.xp} XP</p>
                    </div>
                    {player.rank <= 3 && (
                      <Icon name="Crown" className="text-accent" size={24} />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeSection === 'shop' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground mb-4">Магазин</h2>
              <div className="grid grid-cols-2 gap-4">
                {shopItems.map((item) => (
                  <Card key={item.id} className="p-4 bg-card border-border hover:border-accent transition-all cursor-pointer hover:scale-105">
                    <div className="w-full h-24 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 shadow-lg">
                      <Icon name={item.icon} className="text-white" size={40} />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-2">{item.title}</h3>
                    <div className="flex items-center gap-1 text-accent font-bold">
                      <Icon name="Coins" size={16} />
                      <span>{item.price}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'profile' && (
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-2xl">
                    <Icon name="User" className="text-white" size={48} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Игрок #{userLevel}</h2>
                  <p className="text-muted-foreground mb-4">Участник с января 2025</p>
                  <div className="flex gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">{userLevel}</p>
                      <p className="text-sm text-muted-foreground">Уровень</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-secondary">{coins}</p>
                      <p className="text-sm text-muted-foreground">Монет</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-accent">2</p>
                      <p className="text-sm text-muted-foreground">Достижений</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-card border-border">
                <h3 className="font-bold text-foreground mb-4">Статистика</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Игр сыграно</span>
                    <span className="font-semibold text-foreground">42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Уроков пройдено</span>
                    <span className="font-semibold text-foreground">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Дней подряд</span>
                    <span className="font-semibold text-accent">7</span>
                  </div>
                </div>
              </Card>
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
    </div>
  );
};

export default Index;
