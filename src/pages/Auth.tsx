import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface AuthProps {
  onAuth: () => void;
}

const Auth = ({ onAuth }: AuthProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth();
  };

  return (
    <div className="min-h-screen bg-[#17212b] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Логотип */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#2AABEE] to-[#1a8fd1] rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <Icon name="MessageCircle" className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Vibe</h1>
          <p className="text-[#8ba4bd] text-sm">Мессенджер нового поколения</p>
        </div>

        {/* Карточка формы */}
        <div className="bg-[#232e3c] rounded-2xl p-6 shadow-xl border border-[#2b3847]">
          {/* Переключатель */}
          <div className="flex bg-[#17212b] rounded-xl p-1 mb-6">
            <button
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === "login"
                  ? "bg-[#2AABEE] text-white shadow"
                  : "text-[#8ba4bd] hover:text-white"
              }`}
              onClick={() => setMode("login")}
            >
              Вход
            </button>
            <button
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === "register"
                  ? "bg-[#2AABEE] text-white shadow"
                  : "text-[#8ba4bd] hover:text-white"
              }`}
              onClick={() => setMode("register")}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="text-[#8ba4bd] text-xs font-medium mb-1.5 block">Имя</label>
                <div className="relative">
                  <Icon name="User" className="w-4 h-4 text-[#8ba4bd] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full bg-[#17212b] border border-[#2b3847] rounded-xl px-4 py-3 pl-10 text-white text-sm placeholder-[#8ba4bd] focus:outline-none focus:border-[#2AABEE] transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[#8ba4bd] text-xs font-medium mb-1.5 block">Номер телефона</label>
              <div className="relative">
                <Icon name="Phone" className="w-4 h-4 text-[#8ba4bd] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 000 000-00-00"
                  className="w-full bg-[#17212b] border border-[#2b3847] rounded-xl px-4 py-3 pl-10 text-white text-sm placeholder-[#8ba4bd] focus:outline-none focus:border-[#2AABEE] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[#8ba4bd] text-xs font-medium mb-1.5 block">Пароль</label>
              <div className="relative">
                <Icon name="Lock" className="w-4 h-4 text-[#8ba4bd] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#17212b] border border-[#2b3847] rounded-xl px-4 py-3 pl-10 pr-10 text-white text-sm placeholder-[#8ba4bd] focus:outline-none focus:border-[#2AABEE] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8ba4bd] hover:text-white transition-colors"
                >
                  <Icon name={showPassword ? "EyeOff" : "Eye"} className="w-4 h-4" />
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="text-right">
                <button type="button" className="text-[#2AABEE] text-xs hover:underline">
                  Забыли пароль?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#2AABEE] hover:bg-[#1a8fd1] text-white py-3 rounded-xl text-sm font-semibold shadow-lg mt-2"
            >
              {mode === "login" ? "Войти в Vibe" : "Создать аккаунт"}
            </Button>
          </form>

          {/* Разделитель */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#2b3847]"></div>
            <span className="text-[#8ba4bd] text-xs">или</span>
            <div className="flex-1 h-px bg-[#2b3847]"></div>
          </div>

          {/* Вход через телефон (QR) */}
          <Button
            variant="outline"
            className="w-full border-[#2b3847] text-[#8ba4bd] hover:bg-[#2b3847] hover:text-white rounded-xl py-3 text-sm bg-transparent"
          >
            <Icon name="QrCode" className="w-4 h-4 mr-2" />
            Войти через QR-код
          </Button>
        </div>

        {/* Футер */}
        <p className="text-center text-[#8ba4bd] text-xs mt-6 leading-relaxed">
          Регистрируясь, вы соглашаетесь с{" "}
          <button className="text-[#2AABEE] hover:underline">Условиями использования</button>
          {" "}и{" "}
          <button className="text-[#2AABEE] hover:underline">Политикой конфиденциальности</button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
