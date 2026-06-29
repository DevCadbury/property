"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type LangCode = "EN" | "FR" | "PA" | "HI" | "ES" | "ZH";

export const LANGUAGES: { code: LangCode; label: string; native: string }[] = [
  { code: "EN", label: "English", native: "English" },
  { code: "FR", label: "French", native: "Français" },
  { code: "PA", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "HI", label: "Hindi", native: "हिन्दी" },
  { code: "ES", label: "Spanish", native: "Español" },
  { code: "ZH", label: "Mandarin", native: "中文" },
];

// Translation dictionary — keyed by string id, then language
const DICT: Record<string, Record<LangCode, string>> = {
  // Nav
  "nav.search": { EN: "Search for Homes", FR: "Rechercher", PA: "ਘਰ ਲੱਭੋ", HI: "घर खोजें", ES: "Buscar Casas", ZH: "搜索房源" },
  "nav.services": { EN: "Our Services", FR: "Nos Services", PA: "ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ", HI: "हमारी सेवाएं", ES: "Servicios", ZH: "我们的服务" },
  "nav.guides": { EN: "Guides", FR: "Guides", PA: "ਗਾਈਡ", HI: "गाइड", ES: "Guías", ZH: "指南" },
  "nav.contact": { EN: "Contact", FR: "Contact", PA: "ਸੰਪਰਕ", HI: "संपर्क", ES: "Contacto", ZH: "联系" },
  "nav.reviews": { EN: "Reviews", FR: "Avis", PA: "ਸਮੀਖਿਆਵਾਂ", HI: "समीक्षाएं", ES: "Reseñas", ZH: "评价" },
  "nav.about": { EN: "About", FR: "À Propos", PA: "ਬਾਰੇ", HI: "हमारे बारे में", ES: "Acerca De", ZH: "关于我们" },
  "nav.listProperty": { EN: "List Property", FR: "Inscrire", PA: "ਜਾਇਦਾਦ ਸੂਚੀਬੱਧ ਕਰੋ", HI: "संपत्ति सूचीबद्ध करें", ES: "Publicar", ZH: "发布房源" },
  "nav.signIn": { EN: "Sign In", FR: "Connexion", PA: "ਸਾਈਨ ਇਨ", HI: "साइन इन", ES: "Iniciar Sesión", ZH: "登录" },
  "nav.account": { EN: "My Account", FR: "Mon Compte", PA: "ਮੇਰਾ ਖਾਤਾ", HI: "मेरा खाता", ES: "Mi Cuenta", ZH: "我的账户" },

  // Hero
  "hero.tagline": { EN: "Results Driven · Planet Group Realty", FR: "Axé sur les résultats · Planet Group Realty", PA: "ਨਤੀਜੇ ਆਧਾਰਿਤ · Planet Group Realty", HI: "परिणाम संचालित · Planet Group Realty", ES: "Orientado a Resultados · Planet Group Realty", ZH: "结果导向 · Planet Group Realty" },
  "hero.d1": { EN: "Discover", FR: "Découvrez", PA: "ਖੋਜੋ", HI: "खोजें", ES: "Descubre", ZH: "发现" },
  "hero.d2": { EN: "Your Next", FR: "Votre Prochaine", PA: "ਆਪਣਾ ਅਗਲਾ", HI: "अपना अगला", ES: "Tu Próximo", ZH: "您的下一个" },
  "hero.d3": { EN: "Home", FR: "Maison", PA: "ਘਰ", HI: "घर", ES: "Hogar", ZH: "家" },
  "hero.interested": { EN: "Are You Interested In", FR: "Êtes-vous intéressé par", PA: "ਕੀ ਤੁਸੀਂ ਇਸ ਵਿੱਚ ਦਿਲਚਸਪੀ ਰੱਖਦੇ ਹੋ", HI: "क्या आप रुचि रखते हैं", ES: "¿Está Interesado En", ZH: "您感兴趣的是" },
  "hero.buying": { EN: "BUYING", FR: "ACHETER", PA: "ਖਰੀਦਣਾ", HI: "खरीदना", ES: "COMPRAR", ZH: "购买" },
  "hero.selling": { EN: "SELLING", FR: "VENDRE", PA: "ਵੇਚਣਾ", HI: "बेचना", ES: "VENDER", ZH: "出售" },
  "hero.findProperty": { EN: "Find Your Perfect Property", FR: "Trouvez votre propriété idéale", PA: "ਆਪਣੀ ਸੰਪੂਰਨ ਜਾਇਦਾਦ ਲੱਭੋ", HI: "अपनी आदर्श संपत्ति खोजें", ES: "Encuentre Su Propiedad Ideal", ZH: "找到您的理想房产" },
  "hero.searchPlaceholder": { EN: "City, neighbourhood, or MLS #", FR: "Ville, quartier ou MLS #", PA: "ਸ਼ਹਿਰ, ਮੁਹੱਲਾ, ਜਾਂ MLS #", HI: "शहर, मोहल्ला, या MLS #", ES: "Ciudad, vecindario o MLS #", ZH: "城市、社区或 MLS 编号" },
  "hero.sellConfidence": { EN: "Sell With Confidence", FR: "Vendez en toute confiance", PA: "ਭਰੋਸੇ ਨਾਲ ਵੇਚੋ", HI: "विश्वास के साथ बेचें", ES: "Venda Con Confianza", ZH: "自信出售" },
  "hero.getEvaluation": { EN: "Get Your Home Evaluation", FR: "Obtenez l'évaluation de votre maison", PA: "ਆਪਣੇ ਘਰ ਦਾ ਮੁਲਾਂਕਣ ਕਰਵਾਓ", HI: "अपने घर का मूल्यांकन प्राप्त करें", ES: "Obtenga La Evaluación De Su Casa", ZH: "获取您的房屋评估" },
  "hero.talkExpert": { EN: "Talk / Text to an Expert", FR: "Parlez à un expert", PA: "ਮਾਹਰ ਨਾਲ ਗੱਲ ਕਰੋ", HI: "विशेषज्ञ से बात करें", ES: "Hable Con Un Experto", ZH: "联系专家" },
  "hero.back": { EN: "Back", FR: "Retour", PA: "ਵਾਪਸ", HI: "वापस", ES: "Atrás", ZH: "返回" },
  "hero.scroll": { EN: "Scroll", FR: "Défiler", PA: "ਸਕ੍ਰੋਲ", HI: "स्क्रॉल", ES: "Desplazar", ZH: "滚动" },
  "stat.listings": { EN: "Active Listings", FR: "Annonces Actives", PA: "ਸਰਗਰਮ ਸੂਚੀਆਂ", HI: "सक्रिय लिस्टिंग", ES: "Listados Activos", ZH: "在售房源" },
  "stat.years": { EN: "Years in BC", FR: "Ans en C.-B.", PA: "BC ਵਿੱਚ ਸਾਲ", HI: "BC में वर्ष", ES: "Años en BC", ZH: "在BC的年数" },
  "stat.satisfaction": { EN: "Client Satisfaction", FR: "Satisfaction Client", PA: "ਗਾਹਕ ਸੰਤੁਸ਼ਟੀ", HI: "ग्राहक संतुष्टि", ES: "Satisfacción Del Cliente", ZH: "客户满意度" },

  // Home guides
  "home.journeyTag": { EN: "Your Journey Starts Here", FR: "Votre parcours commence ici", PA: "ਤੁਹਾਡੀ ਯਾਤਰਾ ਇੱਥੋਂ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ", HI: "आपकी यात्रा यहां से शुरू होती है", ES: "Su Viaje Comienza Aquí", ZH: "您的旅程从这里开始" },
  "home.buyingOrSelling": { EN: "Whether You're Buying or Selling", FR: "Que vous achetiez ou vendiez", PA: "ਭਾਵੇਂ ਤੁਸੀਂ ਖਰੀਦ ਰਹੇ ਹੋ ਜਾਂ ਵੇਚ ਰਹੇ ਹੋ", HI: "चाहे आप खरीद रहे हों या बेच रहे हों", ES: "Ya Sea Que Compre o Venda", ZH: "无论您是买房还是卖房" },
  "home.forBuyers": { EN: "For Buyers", FR: "Pour Acheteurs", PA: "ਖਰੀਦਦਾਰਾਂ ਲਈ", HI: "खरीदारों के लिए", ES: "Para Compradores", ZH: "买家专区" },
  "home.forSellers": { EN: "For Sellers", FR: "Pour Vendeurs", PA: "ਵੇਚਣ ਵਾਲਿਆਂ ਲਈ", HI: "विक्रेताओं के लिए", ES: "Para Vendedores", ZH: "卖家专区" },
  "home.buyerGuide": { EN: "Buyer Benefits Guide", FR: "Guide des avantages acheteur", PA: "ਖਰੀਦਦਾਰ ਲਾਭ ਗਾਈਡ", HI: "खरीदार लाभ गाइड", ES: "Guía De Beneficios Para Compradores", ZH: "买家福利指南" },
  "home.sellerGuide": { EN: "Seller Benefits Guide", FR: "Guide des avantages vendeur", PA: "ਵੇਚਣ ਵਾਲਾ ਲਾਭ ਗਾਈਡ", HI: "विक्रेता लाभ गाइड", ES: "Guía De Beneficios Para Vendedores", ZH: "卖家福利指南" },
  "home.exploreBuyer": { EN: "Explore Buyer Guide", FR: "Explorer le guide acheteur", PA: "ਖਰੀਦਦਾਰ ਗਾਈਡ ਵੇਖੋ", HI: "खरीदार गाइड देखें", ES: "Ver Guía De Comprador", ZH: "查看买家指南" },
  "home.exploreSeller": { EN: "Explore Seller Guide", FR: "Explorer le guide vendeur", PA: "ਵੇਚਣ ਵਾਲਾ ਗਾਈਡ ਵੇਖੋ", HI: "विक्रेता गाइड देखें", ES: "Ver Guía De Vendedor", ZH: "查看卖家指南" },
  "home.communities": { EN: "Explore Communities", FR: "Explorer les communautés", PA: "ਭਾਈਚਾਰੇ ਵੇਖੋ", HI: "समुदाय देखें", ES: "Explorar Comunidades", ZH: "探索社区" },
  "home.viewAll": { EN: "View All", FR: "Voir Tout", PA: "ਸਭ ਵੇਖੋ", HI: "सभी देखें", ES: "Ver Todo", ZH: "查看全部" },
};

interface LanguageContextType {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("EN");

  useEffect(() => {
    const saved = localStorage.getItem("pg_lang") as LangCode | null;
    if (saved && LANGUAGES.some((l) => l.code === saved)) setLangState(saved);
  }, []);

  const setLang = useCallback((l: LangCode) => {
    setLangState(l);
    localStorage.setItem("pg_lang", l);
    document.documentElement.lang = l.toLowerCase();
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = DICT[key];
      if (!entry) return key;
      return entry[lang] ?? entry.EN ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
