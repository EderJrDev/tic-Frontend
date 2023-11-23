import React, { useState, useEffect } from "react";

import Header from "./components/header/header.jsx";
import Loader from "./components/loader/loader.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";
import Content from "./components/content/content.jsx";
import ThemePanel from "./components/theme-panel/theme-panel.jsx";

import { AppSettings } from "./config/app-settings.js";
import { addLocale } from "primereact/api";
import { slideToggle } from "./composables/slideToggle.js";

const App = () => {
  const [appTheme, setAppTheme] = useState("");
  const [appDarkMode, setAppDarkMode] = useState(false);
  const [appHeaderNone, setAppHeaderNone] = useState(false);
  const [appHeaderFixed, setAppHeaderFixed] = useState(true);
  const [appHeaderInverse, setAppHeaderInverse] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [appSidebarNone, setAppSidebarNone] = useState(false);
  const [appSidebarWide, setAppSidebarWide] = useState(false);
  const [appSidebarLight, setAppSidebarLight] = useState(false);
  const [appSidebarMinify, setAppSidebarMinify] = useState(false);
  const [appSidebarMobileToggled, setAppSidebarMobileToggled] = useState(false);
  const [appSidebarTransparent, setAppSidebarTransparent] = useState(false);
  const [appSidebarSearch, setAppSidebarSearch] = useState(false);
  const [appSidebarFixed, setAppSidebarFixed] = useState(true);
  const [appContentNone, setAppContentNone] = useState(false);
  const [appContentClass, setAppContentClass] = useState("");
  const [appTopMenu, setAppTopMenu] = useState(false);
  const [appTopMenuMobileToggled, setAppTopMenuMobileToggled] = useState(false);
  const [appSidebarEndToggled, setAppSidebarEndToggled] = useState(false);
  const [appSidebarEndMobileToggled, setAppSidebarEndMobileToggled] =
    useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 700);
  }, []);

  useEffect(() => {
    if (appDarkMode) {
      handleSetAppDarkMode(true);
    }
    window.addEventListener("scroll", handleScroll);

    if (localStorage) {
      if (localStorage.appTheme !== undefined) {
        document.body.classList.add("theme-" + localStorage.appTheme);
      }
      if (localStorage.appDarkMode !== undefined) {
        handleSetAppDarkMode(
          localStorage.appDarkMode === "true" ? true : false
        );
      }
      if (localStorage.appHeaderInverse !== undefined) {
        handleSetAppHeaderInverse(
          localStorage.appHeaderInverse === "true" ? true : false
        );
      }
      if (localStorage.appSidebarMinify !== undefined) {
        handleSetAppSidebarMinified(
          localStorage.appSidebarMinify === "true" ? true : false
        );
      }
      if (localStorage.appSidebarFixed !== undefined) {
        handleSetAppSidebarFixed(
          localStorage.appSidebarFixed === "true" ? true : false
        );
      }
      handleSetAppHeaderFixed(
        localStorage.appHeaderFixed === "true" ? true : false
      );
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [appDarkMode]);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHasScroll(true);
    } else {
      setHasScroll(false);
    }
    var elm = document.getElementsByClassName("nvtooltip");
    for (var i = 0; i < elm.length; i++) {
      elm[i].classList.add("d-none");
    }
  };

  const toggleAppSidebarMinify = (e) => {
    e.preventDefault();
    setAppSidebarMinify(!appSidebarMinify);
    if (localStorage) {
      localStorage.appSidebarMinify = !appSidebarMinify;
    }
  };

  const toggleAppSidebarMobile = (e) => {
    e.preventDefault();
    setAppSidebarMobileToggled(!appSidebarMobileToggled);
  };

  const handleSetAppSidebarNone = (value) => {
    setAppSidebarNone(value);
  };

  const handleSetAppSidebarMinified = (value) => {
    setAppSidebarMinify(value);
  };

  const handleSetAppSidebarFixed = (value) => {
    if (value === true && !appHeaderFixed) {
      alert(
        "Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar."
      );
      setAppHeaderFixed(true);
      if (localStorage) {
        localStorage.appHeaderFixed = true;
      }
    }
    setAppSidebarFixed(value);
    if (localStorage) {
      localStorage.appSidebarFixed = value;
    }
  };

  const toggleAppSidebarEndMobile = (e) => {
    e.preventDefault();
    setAppSidebarEndMobileToggled(!appSidebarEndMobileToggled);
  };

  const handleSetAppContentNone = (value) => {
    setAppContentNone(value);
  };

  const handleSetAppContentClass = (value) => {
    setAppContentClass(value);
  };

  const handleSetAppHeaderNone = (value) => {
    setAppHeaderNone(value);
  };

  const handleSetAppHeaderFixed = (value) => {
    if (value === false && appSidebarFixed) {
      // alert(
      //   "Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar."
      // );
      setAppSidebarFixed(false);
      if (localStorage) {
        localStorage.appSidebarFixed = false;
      }
    }
    setAppHeaderFixed(value);
    if (localStorage) {
      localStorage.appHeaderFixed = value;
    }
  };

  const handleSetAppHeaderInverse = (value) => {
    setAppHeaderInverse(value);
    if (localStorage) {
      localStorage.appHeaderInverse = value;
    }
  };

  const toggleAppTopMenuMobile = (e) => {
    e.preventDefault();
    slideToggle(document.querySelector(".app-top-menu"));
  };

  const handleSetAppBoxedLayout = (value) => {
    if (value === true) {
      document.body.classList.add("boxed-layout");
    } else {
      document.body.classList.remove("boxed-layout");
    }
  };

  const handleSetAppDarkMode = (value) => {
    if (value === true) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    setAppDarkMode(value);
    if (localStorage) {
      localStorage.appDarkMode = value;
    }
  };

  //traduzindo componentes do prime react para Portuguese
  addLocale("pt", {
    firstDayOfWeek: 1,
    dateFormat: "dd/mm/yy",
    dayNames: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    today: "Hoje",
    clear: "Limpar",
    //...
  });

  return loading ? (
    <Loader />
  ) : (
    <AppSettings.Provider
      value={{
        appTheme,
        appDarkMode,
        appHeaderNone,
        appHeaderFixed,
        appHeaderInverse,
        hasScroll,
        handleSetAppHeaderNone,
        handleSetAppHeaderInverse,
        handleSetAppHeaderFixed,
        appSidebarNone,
        appSidebarWide,
        appSidebarLight,
        appSidebarMinify,
        appSidebarMobileToggled,
        appSidebarTransparent,
        appSidebarSearch,
        appSidebarFixed,
        handleSetAppSidebarNone,
        handleSetAppSidebarMinified,
        handleSetAppSidebarFixed,
        toggleAppSidebarMinify,
        toggleAppSidebarMobile,
        appContentNone,
        appContentClass,
        handleSetAppContentNone,
        handleSetAppContentClass,
        appTopMenu,
        appTopMenuMobileToggled,
        toggleAppTopMenuMobile,
        appSidebarEndToggled,
        appSidebarEndMobileToggled,
        toggleAppSidebarEndMobile,
        handleSetAppBoxedLayout,
        handleSetAppDarkMode,
      }}
    >
      <div
        className={`app ${appHeaderNone ? "app-without-header" : ""} ${
          appHeaderFixed && !appHeaderNone ? "app-header-fixed" : ""
        } ${appSidebarFixed ? "app-sidebar-fixed" : ""} ${
          appSidebarNone ? "app-without-sidebar" : ""
        } ${appSidebarMinify ? "app-sidebar-minified" : ""} ${
          appSidebarMobileToggled ? "app-sidebar-mobile-toggled" : ""
        } ${
          appSidebarEndMobileToggled ? "app-sidebar-end-mobile-toggled" : ""
        } ${hasScroll ? "has-scroll" : ""}`}
      >
        {!appHeaderNone && <Header />}
        {!appSidebarNone && <Sidebar />}
        {!appContentNone && <Content />}
        <ThemePanel />
      </div>
    </AppSettings.Provider>
  );
};

export default App;
