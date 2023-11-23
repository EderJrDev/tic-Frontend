const isAdmin = localStorage.getItem("isAdmin") === "true";

const Menu = [
  { path: "dashboard", icon: "fa fa-sitemap", title: "Painel Geral" },
  {
    path: "produtos",
    icon: "fa fa-cogs",
    title: "Produtos",
  },
  isAdmin && {
    // Adiciona 'Usuários' apenas se isAdmin for true
    path: "usuarios",
    icon: "fa fa-user",
    title: "Usuários",
  },
  {
    path: "pedidos",
    icon: "fa fa-shopping-cart",
    title: "Entrada",
  },
  {
    path: "budget",
    icon: "fa fa-file",
    title: "Orçamentos",
  },
].filter(Boolean); // Remove entradas falsas (quando isAdmin for false)

export default Menu;
