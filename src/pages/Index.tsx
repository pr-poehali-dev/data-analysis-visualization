import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#17212b] text-white overflow-x-hidden">
      {/* Навигация в стиле Telegram */}
      <nav className="bg-[#232e3c] border-b border-[#0d1117] px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#2AABEE] to-[#1a8fd1] rounded-full flex items-center justify-center shadow-lg">
              <Icon name="MessageCircle" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">Vibe</h1>
              <p className="text-xs text-[#8ba4bd] hidden sm:block">Мессенджер нового поколения</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Button variant="ghost" className="text-[#8ba4bd] hover:text-white hover:bg-[#2b3847]">
              <Icon name="Globe" className="w-4 h-4 mr-2" />
              О приложении
            </Button>
            <Button className="bg-[#2AABEE] hover:bg-[#1a8fd1] text-white px-6 py-2 rounded-full text-sm font-medium shadow-md">
              Скачать Vibe
            </Button>
          </div>
          <Button
            variant="ghost"
            className="sm:hidden text-[#8ba4bd] hover:text-white hover:bg-[#2b3847] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Icon name="X" className="w-5 h-5" /> : <Icon name="Menu" className="w-5 h-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-[#0d1117]">
            <div className="flex flex-col gap-3">
              <Button variant="ghost" className="text-[#8ba4bd] hover:text-white hover:bg-[#2b3847] justify-start">
                <Icon name="Globe" className="w-4 h-4 mr-2" />
                О приложении
              </Button>
              <Button className="bg-[#2AABEE] hover:bg-[#1a8fd1] text-white px-6 py-2 rounded-full text-sm font-medium">
                Скачать Vibe
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Макет в стиле Telegram */}
      <div className="flex min-h-screen">
        {/* Боковая панель чатов — скрыта на мобильных */}
        <div
          className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-72 bg-[#232e3c] flex flex-col border-r border-[#0d1117]`}
        >
          {/* Шапка боковой панели */}
          <div className="p-4 border-b border-[#0d1117] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2AABEE] to-[#1a8fd1] rounded-full flex items-center justify-center">
                <Icon name="MessageCircle" className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">Vibe</span>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#2b3847]">
                <Icon name="Search" className="w-4 h-4 text-[#8ba4bd]" />
              </Button>
              <Button
                variant="ghost"
                className="lg:hidden text-[#8ba4bd] hover:text-white hover:bg-[#2b3847] p-1"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <Icon name="X" className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Строка поиска */}
          <div className="px-4 py-2">
            <div className="bg-[#17212b] rounded-full px-4 py-2 flex items-center gap-2">
              <Icon name="Search" className="w-4 h-4 text-[#8ba4bd]" />
              <span className="text-[#8ba4bd] text-sm">Поиск</span>
            </div>
          </div>

          {/* Список чатов */}
          <div className="flex-1 overflow-y-auto">
            {[
              { name: "Анна 💜", msg: "Увидимся вечером?", time: "12:41", avatar: "А", unread: 2, color: "from-purple-500 to-violet-500" },
              { name: "Команда Vibe", msg: "Новое обновление уже в эфире!", time: "12:30", avatar: "V", unread: 5, color: "from-[#2AABEE] to-[#1a8fd1]" },
              { name: "Михаил", msg: "Отличная идея 🔥", time: "11:55", avatar: "М", unread: 0, color: "from-green-500 to-teal-500" },
              { name: "Дарья", msg: "Скинь ссылку, пожалуйста", time: "11:20", avatar: "Д", unread: 1, color: "from-pink-500 to-rose-500" },
              { name: "Рабочий чат", msg: "Встреча в 15:00", time: "10:44", avatar: "Р", unread: 0, color: "from-orange-500 to-amber-500" },
              { name: "Семья", msg: "Мама: Как дела? ❤️", time: "09:10", avatar: "С", unread: 3, color: "from-red-500 to-pink-500" },
            ].map((chat, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-[#2b3847] cursor-pointer transition-colors ${i === 1 ? "bg-[#2b3847]" : ""}`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${chat.color} rounded-full flex items-center justify-center flex-shrink-0 relative`}>
                  <span className="text-white text-sm font-bold">{chat.avatar}</span>
                  {i === 0 && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#3ba55c] border-2 border-[#232e3c] rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium truncate">{chat.name}</span>
                    <span className="text-[#8ba4bd] text-xs ml-2 flex-shrink-0">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[#8ba4bd] text-xs truncate">{chat.msg}</span>
                    {chat.unread > 0 && (
                      <span className="ml-2 bg-[#2AABEE] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 font-medium">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Нижняя панель пользователя */}
          <div className="p-3 bg-[#1a2535] border-t border-[#0d1117] flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#2AABEE] to-[#1a8fd1] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">В</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium">Вы</div>
              <div className="text-[#8ba4bd] text-xs">В сети</div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#2b3847]">
                <Icon name="Settings" className="w-4 h-4 text-[#8ba4bd]" />
              </Button>
            </div>
          </div>
        </div>

        {/* Основная область чата */}
        <div className="flex-1 flex flex-col">
          {/* Заголовок чата */}
          <div className="h-14 bg-[#232e3c] border-b border-[#0d1117] flex items-center px-4 gap-3">
            <Button
              variant="ghost"
              className="lg:hidden text-[#8ba4bd] hover:text-[#dcddde] hover:bg-[#2b3847] p-1 mr-1"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Icon name="Menu" className="w-5 h-5" />
            </Button>
            <div className="w-9 h-9 bg-gradient-to-br from-[#2AABEE] to-[#1a8fd1] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">V</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm">Команда Vibe</div>
              <div className="text-[#8ba4bd] text-xs">5 участников, 3 онлайн</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#2b3847]">
                <Icon name="Phone" className="w-4 h-4 text-[#8ba4bd]" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#2b3847]">
                <Icon name="Video" className="w-4 h-4 text-[#8ba4bd]" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#2b3847]">
                <Icon name="Search" className="w-4 h-4 text-[#8ba4bd]" />
              </Button>
            </div>
          </div>

          {/* Сообщения */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#17212b]">

            {/* Системное сообщение */}
            <div className="flex justify-center">
              <span className="bg-[#232e3c] text-[#8ba4bd] text-xs px-4 py-1.5 rounded-full">Сегодня</span>
            </div>

            {/* Сообщение бота Vibe */}
            <div className="flex gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-[#2AABEE] to-[#1a8fd1] rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="MessageCircle" className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 max-w-2xl">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[#2AABEE] font-semibold text-sm">Vibe Bot</span>
                  <span className="bg-[#2AABEE] text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-medium">BOT</span>
                  <span className="text-[#8ba4bd] text-xs">12:00</span>
                </div>
                <div className="bg-[#232e3c] rounded-2xl rounded-tl-sm p-4 text-[#d1dce8] text-sm leading-relaxed">
                  <p className="mb-3 font-semibold text-white text-base">Добро пожаловать в Vibe! 🎉</p>
                  <div className="bg-[#17212b] border-l-4 border-[#2AABEE] p-3 rounded-lg">
                    <h3 className="text-white font-semibold mb-2 text-sm">Что умеет Vibe:</h3>
                    <ul className="space-y-1.5 text-xs text-[#8ba4bd]">
                      <li className="flex items-center gap-2"><Icon name="Check" className="w-3 h-3 text-[#2AABEE]" /> Мгновенные сообщения с шифрованием</li>
                      <li className="flex items-center gap-2"><Icon name="Check" className="w-3 h-3 text-[#2AABEE]" /> Голосовые и видеозвонки</li>
                      <li className="flex items-center gap-2"><Icon name="Check" className="w-3 h-3 text-[#2AABEE]" /> Каналы и групповые чаты</li>
                      <li className="flex items-center gap-2"><Icon name="Check" className="w-3 h-3 text-[#2AABEE]" /> Синхронизация на всех устройствах</li>
                      <li className="flex items-center gap-2"><Icon name="Check" className="w-3 h-3 text-[#2AABEE]" /> Стикеры, GIF и медиафайлы</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Сообщение пользователя Анна */}
            <div className="flex gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">А</span>
              </div>
              <div className="flex-1 max-w-2xl">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[#a78bfa] font-semibold text-sm">Анна</span>
                  <span className="text-[#8ba4bd] text-xs">12:05</span>
                </div>
                <div className="bg-[#232e3c] rounded-2xl rounded-tl-sm p-3 text-[#d1dce8] text-sm max-w-xs">
                  Наконец-то мессенджер, который работает быстро! 🚀
                </div>
              </div>
            </div>

            {/* Входящее сообщение Михаил */}
            <div className="flex gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">М</span>
              </div>
              <div className="flex-1 max-w-2xl">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[#4ade80] font-semibold text-sm">Михаил</span>
                  <span className="text-[#8ba4bd] text-xs">12:08</span>
                </div>
                <div className="bg-[#232e3c] rounded-2xl rounded-tl-sm p-3 text-[#d1dce8] text-sm max-w-xs">
                  Качество звонков просто огонь 🔥 Даже на слабом интернете!
                </div>
              </div>
            </div>

            {/* Исходящее сообщение (справа) */}
            <div className="flex gap-3 justify-end">
              <div className="max-w-xs">
                <div className="bg-[#2b5278] rounded-2xl rounded-tr-sm p-3 text-[#d1dce8] text-sm">
                  Согласен! Попробуй ещё голосовые сообщения — очень удобно
                </div>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[#8ba4bd] text-xs">12:09</span>
                  <Icon name="CheckCheck" className="w-3.5 h-3.5 text-[#2AABEE]" />
                </div>
              </div>
            </div>

            {/* Секция - Начни пользоваться Vibe */}
            <div className="bg-[#232e3c] border border-[#2b3847] rounded-2xl p-5 mt-4">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Icon name="Download" className="w-5 h-5 text-[#2AABEE]" />
                Начни общаться в Vibe
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                {[
                  { step: "1", title: "Скачай приложение", desc: "iOS, Android, Windows или macOS", icon: "Download" },
                  { step: "2", title: "Создай аккаунт", desc: "Только номер телефона — без лишних данных", icon: "UserPlus" },
                  { step: "3", title: "Пиши и звони", desc: "Найди друзей и начни общаться", icon: "MessageCircle" },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2AABEE] to-[#1a8fd1] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <h3 className="text-white font-medium mb-1 text-sm">{item.title}</h3>
                    <p className="text-[#8ba4bd] text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-[#2AABEE] hover:bg-[#1a8fd1] text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg">
                  <Icon name="Download" className="w-4 h-4 mr-2" />
                  Скачать для iPhone
                </Button>
                <Button
                  variant="outline"
                  className="border-[#2b3847] text-[#8ba4bd] hover:bg-[#2b3847] hover:text-white px-8 py-3 rounded-full text-sm font-semibold bg-transparent"
                >
                  <Icon name="Smartphone" className="w-4 h-4 mr-2" />
                  Скачать для Android
                </Button>
              </div>
            </div>

            {/* Преимущества Vibe */}
            <div className="bg-[#232e3c] border border-[#2b3847] rounded-2xl p-5">
              <h3 className="text-lg font-bold text-white mb-4">Почему выбирают Vibe?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "Zap", title: "Молниеносная скорость", desc: "Сообщения доставляются за миллисекунды" },
                  { icon: "Lock", title: "Сквозное шифрование", desc: "Ваши переписки видите только вы" },
                  { icon: "Cloud", title: "Облачное хранилище", desc: "Доступ к файлам с любого устройства" },
                  { icon: "Users", title: "Группы до 200 000", desc: "Создавайте сообщества любого размера" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#17212b] transition-colors"
                  >
                    <div className="w-9 h-9 bg-[#17212b] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={feature.icon} className="w-4 h-4 text-[#2AABEE]" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{feature.title}</div>
                      <div className="text-[#8ba4bd] text-xs mt-0.5">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Поле ввода сообщения */}
          <div className="p-3 sm:p-4 bg-[#17212b]">
            <div className="bg-[#232e3c] rounded-full px-4 py-3 flex items-center gap-3 border border-[#2b3847]">
              <Icon name="Paperclip" className="w-4 h-4 text-[#8ba4bd] cursor-pointer hover:text-[#2AABEE] transition-colors" />
              <span className="flex-1 text-[#8ba4bd] text-sm">Написать сообщение...</span>
              <div className="flex items-center gap-2">
                <Icon name="Smile" className="w-4 h-4 text-[#8ba4bd] cursor-pointer hover:text-[#2AABEE] transition-colors" />
                <Icon name="Mic" className="w-4 h-4 text-[#8ba4bd] cursor-pointer hover:text-[#2AABEE] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Правая панель — онлайн участники */}
        <div className="hidden xl:block w-64 bg-[#232e3c] p-4 border-l border-[#0d1117]">
          <div className="mb-5">
            <h3 className="text-[#8ba4bd] text-xs font-semibold uppercase tracking-wider mb-3">Онлайн — 3</h3>
            <div className="space-y-2">
              {[
                { name: "Анна", status: "В сети", avatar: "А", color: "from-purple-500 to-violet-500" },
                { name: "Михаил", status: "В сети", avatar: "М", color: "from-green-500 to-teal-500" },
                { name: "Дарья", status: "Печатает...", avatar: "Д", color: "from-pink-500 to-rose-500" },
              ].map((user, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#2b3847] cursor-pointer transition-colors">
                  <div className={`w-9 h-9 bg-gradient-to-br ${user.color} rounded-full flex items-center justify-center relative flex-shrink-0`}>
                    <span className="text-white text-sm font-bold">{user.avatar}</span>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3ba55c] border-2 border-[#232e3c] rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{user.name}</div>
                    <div className="text-[#8ba4bd] text-xs truncate">{user.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-[#8ba4bd] text-xs font-semibold uppercase tracking-wider mb-3">Не в сети — 2</h3>
            <div className="space-y-2">
              {[
                { name: "Рабочий чат", status: "2 ч назад", avatar: "Р", color: "from-orange-500 to-amber-500" },
                { name: "Семья", status: "Вчера", avatar: "С", color: "from-red-500 to-pink-500" },
              ].map((user, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#2b3847] cursor-pointer transition-colors opacity-60">
                  <div className={`w-9 h-9 bg-gradient-to-br ${user.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-sm font-bold">{user.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{user.name}</div>
                    <div className="text-[#8ba4bd] text-xs truncate">{user.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
