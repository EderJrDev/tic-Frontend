import React from "react";
import { AppSettings } from "./../../config/app-settings.js";

class ThemePanel extends React.Component {
  static contextType = AppSettings;

  constructor(props) {
    super(props);

    this.state = {
      expand: false,
      theme:
        localStorage && typeof localStorage.appTheme !== "undefined"
          ? localStorage.appTheme
          : "cyan",
      darkMode: false,
    };
    this.theme = [
      "red",
      "pink",
      "orange",
      "yellow",
      "lime",
      "green",
      "teal",
      "cyan",
      "blue",
      "purple",
      "indigo",
      "dark",
    ];
  }

  handleDarkMode = (e) => {
    if (e.target.checked) {
      this.context.handleSetAppDarkMode(true);
    } else {
      this.context.handleSetAppDarkMode(false);
    }
  };

  handleHeaderFixed = (e) => {
    if (e.target.checked) {
      this.context.handleSetAppHeaderFixed(true);
    } else {
      this.context.handleSetAppHeaderFixed(false);
    }
  };

  handleSidebarFixed = (e) => {
    if (e.target.checked) {
      this.context.handleSetAppSidebarFixed(true);
    } else {
      this.context.handleSetAppSidebarFixed(false);
    }
  };

  handleHeaderInverse = (e) => {
    if (e.target.checked) {
      this.context.handleSetAppHeaderInverse(true);
    } else {
      this.context.handleSetAppHeaderInverse(false);
    }
  };

  handleSidebarGrid = (e) => {
    if (e.target.checked) {
      this.context.handleSetAppSidebarGrid(true);
    } else {
      this.context.handleSetAppSidebarGrid(false);
    }
  };

  handleGradientEnabled = (e) => {
    if (e.target.checked) {
      this.context.handleSetAppGradientEnabled(true);
    } else {
      this.context.handleSetAppGradientEnabled(false);
    }
  };

  toggleExpand = (e) => {
    e.preventDefault();
    this.setState((state) => ({
      expand: !this.state.expand,
    }));
  };

  toggleTheme = (e, theme) => {
    e.preventDefault();
    this.context.handleSetAppTheme(theme);
    this.setState((state) => ({
      theme: theme,
    }));
  };

  render() {
    return (
      <AppSettings.Consumer>
        {({
          appDarkMode,
          appHeaderFixed,
          appHeaderInverse,
          appSidebarFixed,
          appSidebarGrid,
          appGradientEnabled,
        }) => (
          <div className={"theme-panel " + (this.state.expand ? "active" : "")}>
            <a
              href="#0"
              onClick={(e) => this.toggleExpand(e)}
              className="theme-collapse-btn"
            >
              <i className="fa fa-cog"></i>
            </a>
            <div
              className="theme-panel-content"
              data-scrollbar="true"
              data-height="100%"
            >
              <h5>Configurações do Layout</h5>

              <div className="theme-list">
                {this.theme.map((theme, i) => (
                  <div
                    key={i}
                    className={
                      "theme-list-item " +
                      (this.state.theme === theme ? "active" : "")
                    }
                  >
                    <a
                      href="#0"
                      onClick={(e) => this.toggleTheme(e, theme)}
                      className={"theme-list-link bg-" + theme}
                    >
                      &nbsp;
                    </a>
                  </div>
                ))}
              </div>

              <div className="theme-panel-divider"></div>

              <div className="row mt-10px">
                <div className="col-8 control-label text-dark fw-bold">
                  <div>
                    Modo Noturmo{" "}
                    <span
                      className="badge bg-primary ms-1 py-2px position-relative"
                      style={{ top: "-1px" }}
                    >
                      NOVO
                    </span>
                  </div>
                  <div className="lh-14">
                    <small className="text-dark opacity-50">
                      Ajuste a aparência para reduzir o brilho e dar um descanso
                      aos olhos.
                    </small>
                  </div>
                </div>
                <div className="col-4 d-flex">
                  <div className="form-check form-switch ms-auto mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="app-theme-dark-mode"
                      onChange={this.handleDarkMode}
                      id="appThemeDarkMode"
                      checked={appDarkMode}
                      value="1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="appThemeDarkMode"
                    >
                      &nbsp;
                    </label>
                  </div>
                </div>
              </div>

              <div className="theme-panel-divider"></div>

              <div className="row mt-10px align-items-center">
                <div className="col-8 control-label text-dark fw-bold">
                  Sidebar Fixo
                </div>
                <div className="col-4 d-flex">
                  <div className="form-check form-switch ms-auto mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="app-header-fixed"
                      onChange={this.handleHeaderFixed}
                      id="appHeaderFixed"
                      value="1"
                      checked={appHeaderFixed}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="appHeaderFixed"
                    >
                      &nbsp;
                    </label>
                  </div>
                </div>
              </div>
              <div className="row mt-10px align-items-center">
                <div className="col-8 control-label text-dark fw-bold">
                  Sidebar Inverso
                </div>
                <div className="col-4 d-flex">
                  <div className="form-check form-switch ms-auto mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="app-header-inverse"
                      onChange={this.handleHeaderInverse}
                      id="appHeaderInverse"
                      checked={appHeaderInverse}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="appHeaderInverse"
                    >
                      &nbsp;
                    </label>
                  </div>
                </div>
              </div>
              <div className="row mt-10px align-items-center">
                <div className="col-md-8 control-label text-dark fw-bold">
                  Gradiente ativado
                </div>
                <div className="col-md-4 d-flex">
                  <div className="form-check form-switch ms-auto mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="app-gradient-enabled"
                      onChange={this.handleGradientEnabled}
                      id="appGradientEnabled"
                      checked={appGradientEnabled}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="appGradientEnabled"
                    >
                      &nbsp;
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AppSettings.Consumer>
    );
  }
}

export default ThemePanel;
