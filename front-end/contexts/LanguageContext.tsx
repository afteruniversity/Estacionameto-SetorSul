"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type Language = "pt-BR" | "en" | "es";

type Translations = {
  [key: string]: {
    [key: string]: string | any;
  };
};

const dictionaries: Record<Language, Translations> = {
  "pt-BR": {
    nav: {
      about: "Sobre o projeto",
      pricing: "Mensalidades",
      login: "Login / Cadastro",
      user: {
        dashboard: "Painel",
        logout: "Sair",
      },
    },
    hero: {
      title: "Gerenciamento Inteligente de Estacionamento",
      subtitle:
        "Segurança, praticidade e controle total para sua vaga. Mensalistas e rotativos com a melhor experiência.",
      cta: "Garanta sua vaga",
    },
    about: {
      badge: "Sobre o Projeto",
      title: "Modernizando o estacionamento do Setor Sul",
      description:
        "Nosso sistema visa otimizar o uso das vagas limitadas, oferecendo uma gestão transparente e eficiente tanto para mensalistas quanto para usuários avulsos.",
      feature1: "Controle de acesso seguro",
      feature2: "Monitoramento de vagas em tempo real",
      feature3: "Pagamentos automatizados",
      imageAlt: "Imagem do Estacionamento",
    },
    pricing: {
      simulation: "Simulação Personalizada",
      title: "Planos Flexíveis",
      subtitle: "Escolha o melhor plano para sua necessidade",
      selected: "dia selecionado",
      selectedPlural: "dias selecionados",
      selectPrompt: "Selecione os dias para ver o valor",
      pricePerDay: "Valor Semanal",
      pricePerDaySub: "por semana",
      totalLabel: "Total Semanal",
      subscribe: "Assinar Plano",
      selectDaysWarn: "Selecione pelo menos um dia",
      daysLabel: "Dias da Semana",
      summaryTitle: "Resumo do Plano",
      daysSelectedLabel: "Dias selecionados",
      costPerDayLabel: "Valor por dia",
      // New items
      noLongTerm: "Sem compromisso de longo prazo.",
      reserveWeek: "Reservar Semana",
      discountBadge: "20% de Desconto Aplicado",
      monthlyPlan: "Assinatura Mensal",
      monthlyPlanDesc: "Garante sua vaga + Desconto exclusivo.",
      fromPrice: "De R$",
      savings: "Você economiza R$ {amount} por mês",
      subscribeDiscount: "Assinar com Desconto",
      features: [
        "Flexibilidade total",
        "Vaga rotativa",
        "Vaga Garantida",
        "Acesso automático",
        "Pagamento único",
      ],
    },
    plans: {
      offer: {
        title: "Escolha seu Plano",
        description:
          "Selecione os dias da semana que você precisa de acesso ao estacionamento",
      },
      summary: {
        title: "Resumo do Plano",
        selectedDays: "Dias selecionados:",
        costPerDay: "Valor por dia:",
        weeklyTotal: "Total Semanal:",
      },
      button: {
        subscribe: "Assinar Plano",
        selectDays: "Selecione pelo menos um dia",
      },
      prompt: {
        selectDays: "Selecione os dias que você precisa para continuar",
      },
      active: {
        pageTitle: "Gestão de Planos",
        pageDesc:
          "Gerencie sua assinatura e dias de acesso ao estacionamento de forma simples e prática.",
        simulateLabel: "Simular",
        simulateWith: "Com Plano",
        simulateWithout: "Sem Plano",
        statusTitle: "Plano Ativo",
        statusDesc:
          "Você tem acesso garantido ao estacionamento nos dias selecionados",
        cardTitle: "Detalhes do Plano",
        cardDesc: "Informações sobre sua assinatura atual",
        weeklyValue: "Valor Semanal",
        perWeek: "por semana",
        nextRenewal: "Próxima Renovação",
        autoRenewal: "renovação automática",
        cancelButton: "Cancelar Plano",
        saveChanges: "Salvar Alterações",
        saving:"Salvando...",
        unsavedChanges: "Você tem alterações não salvas",
        clickToToggle: "Clique para salvar suas alterações",
        selectAtLeastOne: "Selecione pelo menos um dia para continuar com sua assinatura",
        cancelAlert: {
          title: "Cancelar Plano",
          description:
            "Tem certeza que deseja cancelar seu plano? Você perderá o acesso aos dias reservados e esta ação não poderá ser desfeita.",
          back: "Voltar",
          confirm: "Confirmar Cancelamento",
        },
      },
      daysLabel: "Dias da Semana",
    },
    auth: {
      backToHome: "Voltar para o início",
      title: "Estacionamento",
      tabs: {
        login: "Login",
        register: "Cadastro",
      },
      login: {
        title: "Entrar",
        description: "Digite seu e-mail e senha para acessar sua conta.",
        emailLabel: "E-mail",
        passwordLabel: "Senha",
        submit: "Entrar",
        forgotPassword: "Esqueceu sua senha?",
      },
      register: {
        title: "Criar Conta",
        description: "Preencha os dados abaixo para se cadastrar.",
        nameLabel: "Nome Completo",
        emailLabel: "E-mail",
        passwordLabel: "Senha",
        confirmLabel: "Confirmar Senha",
        submit: "Cadastrar",
      },
    },
    footer: {
      copyright:
        "© 2025 Estacionamento Setor Sul. Todos os direitos reservados.",
    },
    dashboard: {
      noPlan: {
        title: "Você ainda não possui um plano",
        description:
          "Escolha um plano para começar a usar o estacionamento e garantir sua vaga.",
        button: "Escolher Plano",
      },
      activePlan: {
        title: "Plano Ativo",
        description: "Seu plano atual de estacionamento",
        daysPerWeek: "dias por semana",
        perWeek: "por semana",
        managePlan: "Gerenciar Plano",
      },
      greeting: {
        morning: "Bom dia",
        afternoon: "Boa tarde",
        evening: "Boa noite",
      },
      welcome: "Bem-vindo ao seu painel.",
      loading: "Carregando...",
      cards: {
        activeRentals: {
          title: "Meses usando nossos planos",
          description: "Seus meses usando algum de nossos planos",
          noActive: "Nenhum plano ativo",
        },
        upcomingBookings: {
          title: "Descontos totais",
          description: "Seus descontos usando o plano",
          noUpcoming: "Nenhuma plano ativo",
        },
        totalTrips: {
          title: "Uso total do estacionamento",
          description: "Quantas vezes você usou os estacionamentos este mês",
          startFirst: "Nenhum plano ativo",
        },
      },
      quickActions: {
        title: "Ações Rápidas",
        browseCars: {
          title: "Buscar Carros",
          description: "Encontre seu carro de aluguel perfeito",
        },
        viewHistory: {
          title: "Ver Histórico",
          description: "Confira seus aluguéis anteriores",
        },
      },
      logout: "Sair",
    },
    common: {
      cancel: "Cancelar",
      days: {
        short: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        full: [
          "Segunda",
          "Terça",
          "Quarta",
          "Quinta",
          "Sexta",
          "Sábado",
          "Domingo",
        ],
      },
    },
  },
  en: {
    nav: {
      about: "About",
      pricing: "Pricing",
      login: "Login / Register",
      user: {
        dashboard: "Dashboard",
        logout: "Logout",
      },
    },
    hero: {
      title: "Smart Parking Management",
      subtitle:
        "Secure, practical and well located in the South Sector. The best option for your vehicle.",
      cta: "Secure your spot",
    },
    about: {
      badge: "About the Project",
      title: "About the Project",
      description:
        "Setor Sul Parking was born from the need to optimize urban space usage in one of the city's busiest regions. Our mission is to offer security, practicality, and fair prices for monthly and daily users.",
      feature1: "Secure access control",
      feature2: "Real-time spot monitoring",
      feature3: "Automated payments",
      imageAlt: "Parking Image",
    },
    pricing: {
      simulation: "Custom Simulation",
      title: "Flexible Plans",
      subtitle: "Choose the best plan for your needs",
      selected: "day selected",
      selectedPlural: "days selected",
      selectPrompt: "Select days to see the price",
      pricePerDay: "Weekly Value",
      pricePerDaySub: "per week",
      totalLabel: "Weekly Total",
      subscribe: "Subscribe Plan",
      selectDaysWarn: "Select at least one day",
      daysLabel: "Days of the Week",
      summaryTitle: "Plan Summary",
      daysSelectedLabel: "Selected Days",
      costPerDayLabel: "Cost per day:",
      // New items
      noLongTerm: "No long-term commitment.",
      reserveWeek: "Reserve Week",
      discountBadge: "20% Discount Applied",
      monthlyPlan: "Monthly Subscription",
      monthlyPlanDesc: "Guarantees your spot + Exclusive discount.",
      fromPrice: "From $",
      savings: "You save $ {amount} per month",
      subscribeDiscount: "Subscribe with Discount",
      features: [
        "Total flexibility",
        "Rotating spot",
        "Guaranteed Spot",
        "Automatic Access",
        "Single Payment",
      ],
    },
    plans: {
      offer: {
        title: "Choose your Plan",
        description: "Select the days of the week you need parking access",
      },
      summary: {
        title: "Plan Summary",
        selectedDays: "Selected Days:",
        costPerDay: "Cost per day:",
        weeklyTotal: "Weekly Total:",
      },
      button: {
        subscribe: "Subscribe Plan",
        selectDays: "Select at least one day",
      },
      prompt: {
        selectDays: "Select the days you need to continue",
      },
      active: {
        pageTitle: "Plan Management",
        pageDesc:
          "Manage your subscription and parking access days simply and practically.",
        simulateLabel: "Simulate",
        simulateWith: "With Plan",
        simulateWithout: "Without Plan",
        statusTitle: "Active Plan",
        statusDesc: "You have guaranteed parking access on selected days",
        cardTitle: "Plan Details",
        cardDesc: "Information about your current subscription",
        weeklyValue: "Weekly Value",
        perWeek: "per week",
        nextRenewal: "Next Renewal",
        autoRenewal: "automatic renewal",
        cancelButton: "Cancel Plan",
        saveChanges: "Save changes",
        saving: "Saving...",
        unsavedChanges: "You have unsaved changes",
        clickToToggle: "Click to save your changes",
        cancelAlert: {
          title: "Cancel Plan",
          description:
            "Are you sure you want to cancel your plan? You will lose access to reserved days and this action cannot be undone.",
          back: "Back",
          confirm: "Confirm Cancellation",
        },
      },
      daysLabel: "Days of the Week",
    },
    auth: {
      backToHome: "Back to home",
      title: "Parking",
      tabs: {
        login: "Login",
        register: "Register",
      },
      login: {
        title: "Sign In",
        description: "Enter your email and password to access your account.",
        emailLabel: "Email",
        passwordLabel: "Password",
        submit: "Sign In",
        forgotPassword: "Forgot your password?",
      },
      register: {
        title: "Create Account",
        description: "Fill in the details below to register.",
        nameLabel: "Full Name",
        emailLabel: "Email",
        passwordLabel: "Password",
        confirmLabel: "Confirm Password",
        submit: "Register",
      },
    },
    footer: {
      copyright: "© 2024 Setor Sul Parking. All rights reserved.",
    },
    dashboard: {
      noPlan: {
        title: "You don't have a plan yet",
        description:
          "Choose a plan to start using the parking and secure your spot.",
        button: "Choose Plan",
      },
      activePlan: {
        title: "Active Plan",
        description: "Your current parking plan",
        daysPerWeek: "days per week",
        perWeek: "per week",
        managePlan: "Manage Plan",
      },
      greeting: {
        morning: "Good morning",
        afternoon: "Good afternoon",
        evening: "Good evening",
      },
      welcome: "Welcome to your dashboard. Here's what's happening today.",
      loading: "Loading...",
      cards: {
        activeRentals: {
          title: "Active Rentals",
          description: "Your current car rentals",
          noActive: "No active rentals",
        },
        upcomingBookings: {
          title: "Upcoming Bookings",
          description: "Your scheduled rentals",
          noUpcoming: "No upcoming bookings",
        },
        totalTrips: {
          title: "Total Trips",
          description: "All time rentals",
          startFirst: "Start your first trip!",
        },
      },
      quickActions: {
        title: "Quick Actions",
        browseCars: {
          title: "Browse Cars",
          description: "Find your perfect rental car",
        },
        viewHistory: {
          title: "View History",
          description: "Check your past rentals",
        },
      },
      logout: "Logout",
    },
    common: {
      cancel: "Cancel",
      days: {
        short: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        full: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    },
  },
  es: {
    nav: {
      about: "Sobre el proyecto",
      pricing: "Precios",
      login: "Login / Registro",
      user: {
        dashboard: "Panel",
        logout: "Cerrar sesión",
      },
    },
    hero: {
      title: "Gestión Inteligente de Estacionamiento",
      subtitle:
        "Seguro, práctico y bien ubicado en el Sector Sur. La mejor opción para su vehículo.",
      cta: "Asegura tu lugar",
    },
    about: {
      badge: "Sobre el Proyecto",
      title: "Sobre el Proyecto",
      description:
        "El Estacionamiento Sector Sur nació de la necesidad de optimizar el uso de espacios urbanos en una de las regiones más concurridas de la ciudad. Nuestra misión es ofrecer seguridad, practicidad y precios justos para mensualistas y rotativos.",
      feature1: "Control de acceso seguro",
      feature2: "Monitoreo de plazas en tiempo real",
      feature3: "Pagos automatizados",
      imageAlt: "Imagen del Estacionamiento",
    },
    pricing: {
      simulation: "Simulación Personalizada",
      title: "Planes Flexibles",
      subtitle: "Elija el mejor plan para su necesidad",
      selected: "día seleccionado",
      selectedPlural: "días seleccionados",
      selectPrompt: "Selecciona días para ver el valor",
      pricePerDay: "Valor Semanal",
      pricePerDaySub: "por semana",
      totalLabel: "Total Semanal",
      subscribe: "Suscribirse al Plan",
      selectDaysWarn: "Selecciona al menos un día",
      daysLabel: "Días de la semana",
      summaryTitle: "Resumen del Plan",
      daysSelectedLabel: "Días seleccionados",
      costPerDayLabel: "Costo por día",
      // New items
      noLongTerm: "Sin compromiso a largo plazo.",
      reserveWeek: "Reservar Semana",
      discountBadge: "20% de Descuento Aplicado",
      monthlyPlan: "Suscripción Mensual",
      monthlyPlanDesc: "Garantiza tu lugar + Descuento exclusivo.",
      fromPrice: "De R$",
      savings: "Ahorras R$ {amount} por mes",
      subscribeDiscount: "Suscribirse con Descuento",
      features: [
        "Flexibilidad total",
        "Plaza rotativa",
        "Lugar Garantizado",
        "Acceso Automático",
        "Pago único",
      ],
    },
    plans: {
      offer: {
        title: "Elige tu Plan",
        description:
          "Seleccione los días de la semana que necesita acceso al estacionamiento",
      },
      summary: {
        title: "Resumen del Plan",
        selectedDays: "Días seleccionados:",
        costPerDay: "Valor por día:",
        weeklyTotal: "Total Semanal:",
      },
      button: {
        subscribe: "Suscribir Plan",
        selectDays: "Seleccione al menos un día",
      },
      prompt: {
        selectDays: "Seleccione los días que necesita para continuar",
      },
      active: {
        pageTitle: "Gestión de Planes",
        pageDesc:
          "Administre su suscripción y días de acceso al estacionamiento de forma sencilla y práctica.",
        simulateLabel: "Simular",
        simulateWith: "Con Plan",
        simulateWithout: "Sin Plan",
        statusTitle: "Plan Activo",
        statusDesc:
          "Tiene acceso garantizado al estacionamiento en los días seleccionados",
        cardTitle: "Detalles del Plan",
        cardDesc: "Información sobre su suscripción actual",
        weeklyValue: "Valor Semanal",
        perWeek: "por semana",
        nextRenewal: "Próxima Renovación",
        autoRenewal: "renovación automática",
        cancelButton: "Cancelar Plan",
        saveChanges: "Guardar Cambios",
        saving:"Guardando...",
        unsavedChanges: "Tienes cambios sin guardar",
        clickToToggle: "Haz clic para guardar tus cambios",
        cancelAlert: {
          title: "Cancelar Plan",
          description:
            "¿Está seguro de que desea cancelar su plan? Perderá el acceso a los días reservados y esta acción no se puede deshacer.",
          back: "Volver",
          confirm: "Confirmar Cancelación",
        },
      },
      daysLabel: "Días de la Semana",
    },
    auth: {
      backToHome: "Volver al inicio",
      title: "Estacionamento",
      tabs: {
        login: "Login",
        register: "Registro",
      },
      login: {
        title: "Acceder",
        description:
          "Ingrese su correo electrónico y contraseña para acceder a su cuenta.",
        emailLabel: "Correo electrónico",
        passwordLabel: "Contraseña",
        submit: "Acceder",
        forgotPassword: "¿Olvidó su contraseña?",
      },
      register: {
        title: "Crear Cuenta",
        description: "Complete los datos a continuación para registrarse.",
        nameLabel: "Nombre Completo",
        emailLabel: "Correo electrónico",
        passwordLabel: "Contraseña",
        confirmLabel: "Confirmar Contraseña",
        submit: "Registrarse",
      },
    },
    footer: {
      copyright:
        "© 2024 Estacionamento Setor Sul. Todos los derechos reservados.",
    },
    dashboard: {
      noPlan: {
        title: "Aún no tienes un plan",
        description:
          "Elige un plan para comenzar a usar el estacionamiento y asegurar tu lugar.",
        button: "Elegir Plan",
      },
      activePlan: {
        title: "Plan Activo",
        description: "Tu plan actual de estacionamiento",
        daysPerWeek: "días por semana",
        perWeek: "por semana",
        managePlan: "Gestionar Plan",
      },
      greeting: {
        morning: "Buenos días",
        afternoon: "Buenas tardes",
        evening: "Buenas noches",
      },
      welcome: "Bienvenido a tu panel. Esto es lo que está sucediendo hoy.",
      loading: "Cargando...",
      cards: {
        activeRentals: {
          title: "Alquileres Activos",
          description: "Tus alquileres de coches actuales",
          noActive: "Sin alquileres activos",
        },
        upcomingBookings: {
          title: "Reservas Futuras",
          description: "Tus alquileres programados",
          noUpcoming: "Sin reservas futuras",
        },
        totalTrips: {
          title: "Total de Viajes",
          description: "Todos los alquileres",
          startFirst: "¡Comienza tu primer viaje!",
        },
      },
      quickActions: {
        title: "Acciones Rápidas",
        browseCars: {
          title: "Buscar Coches",
          description: "Encuentra tu coche de alquiler perfecto",
        },
        viewHistory: {
          title: "Ver Historial",
          description: "Revisa tus alquileres anteriores",
        },
      },
      logout: "Cerrar sesión",
    },
    common: {
      cancel: "Cancelar",
      days: {
        short: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        full: [
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Domingo",
        ],
      },
    },
  },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-BR");

  const t = (path: string) => {
    const keys = path.split(".");
    let current: any = dictionaries[language];
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(
          `Translation missing for key: ${path} in language: ${language}`
        );
        return path;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
