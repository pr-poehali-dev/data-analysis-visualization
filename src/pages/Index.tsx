import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Contact {
  id: number;
  name: string;
  phone: string;
  avatar: string;
  color: string;
  lastMsg?: string;
  time?: string;
  unread?: number;
}

interface Message {
  id: number;
  text: string;
  mine: boolean;
  time: string;
}

const COLORS = [
  "from-purple-500 to-violet-500",
  "from-green-500 to-teal-500",
  "from-pink-500 to-rose-500",
  "from-orange-500 to-amber-500",
  "from-blue-500 to-cyan-500",
  "from-red-500 to-pink-500",
];

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeChat, setActiveChat] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [inputText, setInputText] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(true);

  const addContact = () => {
    if (!newName.trim()) return;
    const contact: Contact = {
      id: Date.now(),
      name: newName.trim(),
      phone: newPhone.trim() || "",
      avatar: newName.trim()[0].toUpperCase(),
      color: COLORS[contacts.length % COLORS.length],
    };
    setContacts((prev) => [...prev, contact]);
    setNewName("");
    setNewPhone("");
    setShowAddModal(false);
  };

  const sendMessage = () => {
    if (!inputText.trim() || !activeChat) return;
    const msg: Message = {
      id: Date.now(),
      text: inputText.trim(),
      mine: true,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), msg],
    }));
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeChat.id ? { ...c, lastMsg: msg.text, time: msg.time } : c
      )
    );
    setInputText("");
  };

  const openChat = (contact: Contact) => {
    setActiveChat(contact);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#17212b] text-white flex flex-col">
      {/* Навбар */}
      <nav className="bg-[#232e3c] border-b border-[#0d1117] px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#2AABEE] to-[#1a8fd1] rounded-full flex items-center justify-center shadow">
            <Icon name="MessageCircle" className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Vibe</span>
        </div>
        <Button
          className="bg-[#2AABEE] hover:bg-[#1a8fd1] text-white rounded-full px-4 py-2 text-sm font-semibold"
          onClick={() => setShowAddModal(true)}
        >
          <Icon name="UserPlus" className="w-4 h-4 mr-2" />
          Новый контакт
        </Button>
      </nav>

      {/* Основной макет */}
      <div className="flex flex-1 overflow-hidden">
        {/* Боковая панель */}
        <div
          className={`${
            mobileSidebarOpen ? "flex" : "hidden"
          } lg:flex w-full lg:w-72 bg-[#232e3c] flex-col border-r border-[#0d1117] flex-shrink-0`}
        >
          {/* Шапка */}
          <div className="px-4 py-3 border-b border-[#0d1117] flex items-center justify-between">
            <span className="text-white font-semibold">Чаты</span>
            <button
              onClick={() => setShowAddModal(true)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2b3847] transition-colors"
            >
              <Icon name="PenSquare" className="w-4 h-4 text-[#8ba4bd]" />
            </button>
          </div>

          {/* Поиск */}
          <div className="px-3 py-2">
            <div className="bg-[#17212b] rounded-full px-3 py-2 flex items-center gap-2">
              <Icon name="Search" className="w-4 h-4 text-[#8ba4bd]" />
              <span className="text-[#8ba4bd] text-sm">Поиск</span>
            </div>
          </div>

          {/* Список контактов */}
          <div className="flex-1 overflow-y-auto">
            {contacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-6 text-center gap-4 pb-16">
                <div className="w-16 h-16 bg-[#17212b] rounded-full flex items-center justify-center">
                  <Icon name="Users" className="w-8 h-8 text-[#8ba4bd]" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Нет контактов</p>
                  <p className="text-[#8ba4bd] text-sm">Добавьте первый контакт, чтобы начать общение</p>
                </div>
                <Button
                  className="bg-[#2AABEE] hover:bg-[#1a8fd1] text-white rounded-full px-5 py-2 text-sm font-semibold"
                  onClick={() => setShowAddModal(true)}
                >
                  <Icon name="UserPlus" className="w-4 h-4 mr-2" />
                  Добавить контакт
                </Button>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => openChat(contact)}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-[#2b3847] cursor-pointer transition-colors ${
                    activeChat?.id === contact.id ? "bg-[#2b3847]" : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${contact.color} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white text-sm font-bold">{contact.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium truncate">{contact.name}</span>
                      {contact.time && (
                        <span className="text-[#8ba4bd] text-xs ml-2 flex-shrink-0">{contact.time}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[#8ba4bd] text-xs truncate">
                        {contact.lastMsg || contact.phone || "Нет сообщений"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Область чата */}
        <div className={`${!mobileSidebarOpen ? "flex" : "hidden"} lg:flex flex-1 flex-col`}>
          {activeChat ? (
            <>
              {/* Заголовок чата */}
              <div className="h-14 bg-[#232e3c] border-b border-[#0d1117] flex items-center px-4 gap-3 flex-shrink-0">
                <Button
                  variant="ghost"
                  className="lg:hidden p-1 hover:bg-[#2b3847]"
                  onClick={() => setMobileSidebarOpen(true)}
                >
                  <Icon name="ArrowLeft" className="w-5 h-5 text-[#8ba4bd]" />
                </Button>
                <div
                  className={`w-9 h-9 bg-gradient-to-br ${activeChat.color} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white text-sm font-bold">{activeChat.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm">{activeChat.name}</div>
                  <div className="text-[#8ba4bd] text-xs">{activeChat.phone || "В сети"}</div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#2b3847]">
                    <Icon name="Phone" className="w-4 h-4 text-[#8ba4bd]" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#2b3847]">
                    <Icon name="Video" className="w-4 h-4 text-[#8ba4bd]" />
                  </Button>
                </div>
              </div>

              {/* Сообщения */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#17212b]">
                {(messages[activeChat.id] || []).length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                    <div className="w-14 h-14 bg-[#232e3c] rounded-full flex items-center justify-center">
                      <Icon name="MessageCircle" className="w-7 h-7 text-[#8ba4bd]" />
                    </div>
                    <p className="text-[#8ba4bd] text-sm">Напишите первое сообщение!</p>
                  </div>
                ) : (
                  messages[activeChat.id].map((msg) => (
                    <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                          msg.mine
                            ? "bg-[#2b5278] rounded-tr-sm text-white"
                            : "bg-[#232e3c] rounded-tl-sm text-[#d1dce8]"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <div className={`flex items-center gap-1 mt-1 ${msg.mine ? "justify-end" : ""}`}>
                          <span className="text-[#8ba4bd] text-xs">{msg.time}</span>
                          {msg.mine && <Icon name="CheckCheck" className="w-3.5 h-3.5 text-[#2AABEE]" />}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Поле ввода */}
              <div className="p-3 bg-[#17212b] flex-shrink-0">
                <div className="bg-[#232e3c] rounded-full px-4 py-2 flex items-center gap-3 border border-[#2b3847]">
                  <Icon name="Paperclip" className="w-4 h-4 text-[#8ba4bd] cursor-pointer hover:text-[#2AABEE] transition-colors flex-shrink-0" />
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Написать сообщение..."
                    className="flex-1 bg-transparent text-white text-sm placeholder-[#8ba4bd] outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <Icon name="Smile" className="w-4 h-4 text-[#8ba4bd] cursor-pointer hover:text-[#2AABEE] transition-colors" />
                    {inputText.trim() ? (
                      <button
                        onClick={sendMessage}
                        className="w-8 h-8 bg-[#2AABEE] rounded-full flex items-center justify-center hover:bg-[#1a8fd1] transition-colors"
                      >
                        <Icon name="Send" className="w-4 h-4 text-white" />
                      </button>
                    ) : (
                      <Icon name="Mic" className="w-4 h-4 text-[#8ba4bd] cursor-pointer hover:text-[#2AABEE] transition-colors" />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Пустое состояние — чат не выбран */
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8 bg-[#17212b]">
              <div className="w-20 h-20 bg-[#232e3c] rounded-full flex items-center justify-center">
                <Icon name="MessageCircle" className="w-10 h-10 text-[#2AABEE]" />
              </div>
              <div>
                <p className="text-white text-lg font-semibold mb-1">Выберите чат</p>
                <p className="text-[#8ba4bd] text-sm">
                  {contacts.length === 0
                    ? "Добавьте контакт, чтобы начать общение"
                    : "Выберите контакт слева, чтобы открыть чат"}
                </p>
              </div>
              {contacts.length === 0 && (
                <Button
                  className="bg-[#2AABEE] hover:bg-[#1a8fd1] text-white rounded-full px-6 py-2 text-sm font-semibold"
                  onClick={() => setShowAddModal(true)}
                >
                  <Icon name="UserPlus" className="w-4 h-4 mr-2" />
                  Добавить контакт
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Модалка добавления контакта */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}
        >
          <div className="bg-[#232e3c] rounded-2xl p-6 w-full max-w-sm border border-[#2b3847] shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-lg">Новый контакт</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2b3847] transition-colors"
              >
                <Icon name="X" className="w-4 h-4 text-[#8ba4bd]" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[#8ba4bd] text-xs font-medium mb-1.5 block">Имя *</label>
                <div className="relative">
                  <Icon name="User" className="w-4 h-4 text-[#8ba4bd] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addContact()}
                    placeholder="Введите имя"
                    autoFocus
                    className="w-full bg-[#17212b] border border-[#2b3847] rounded-xl px-4 py-3 pl-10 text-white text-sm placeholder-[#8ba4bd] focus:outline-none focus:border-[#2AABEE] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#8ba4bd] text-xs font-medium mb-1.5 block">Номер телефона</label>
                <div className="relative">
                  <Icon name="Phone" className="w-4 h-4 text-[#8ba4bd] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addContact()}
                    placeholder="+7 000 000-00-00"
                    className="w-full bg-[#17212b] border border-[#2b3847] rounded-xl px-4 py-3 pl-10 text-white text-sm placeholder-[#8ba4bd] focus:outline-none focus:border-[#2AABEE] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1 border-[#2b3847] text-[#8ba4bd] hover:bg-[#2b3847] hover:text-white rounded-xl bg-transparent"
                onClick={() => setShowAddModal(false)}
              >
                Отмена
              </Button>
              <Button
                className="flex-1 bg-[#2AABEE] hover:bg-[#1a8fd1] text-white rounded-xl font-semibold disabled:opacity-40"
                onClick={addContact}
                disabled={!newName.trim()}
              >
                Добавить
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
