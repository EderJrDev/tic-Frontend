import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';
import PerfectScrollbar from 'react-perfect-scrollbar';

function CustomerOrder(props) {
  const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);
  const context = useContext(AppSettings);

  // useEffect(() => {
  //   context.handleSetAppSidebarNone(true);
  //   context.handleSetAppHeaderNone(true);
  //   context.handleSetAppContentFullHeight(true);
  //   context.handleSetAppContentClass('p-0');

  //   return () => {
  //     context.handleSetAppSidebarNone(false);
  //     context.handleSetAppHeaderNone(false);
  //     context.handleSetAppContentFullHeight(false);
  //     context.handleSetAppContentClass('');
  //   };
  // }, []);

  const togglePosMobileSidebar = () => {
    setPosMobileSidebarToggled(!posMobileSidebarToggled);
  };

  return (
    <div className="vh-100">
      <div className={'pos pos-customer ' + (posMobileSidebarToggled ? 'pos-mobile-sidebar-toggled' : '')} id="pos-customer">
        {/* <div className="pos-menu">
          <div className="logo">
            <Link to="/">
              <div className="logo-text"><i class="bi bi-arrow-left-circle"></i> Voltar</div>
            </Link>
          </div>
          <div className="nav-container">
            <PerfectScrollbar className="height-full" options={{ suppressScrollX: true }}>
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <Link to="/pos/customer-order" className="nav-link active" data-filter="all">
                    <i className="fa fa-fw fa-utensils mr-1 ml-n2"></i> Cozinha
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/pos/customer-order" className="nav-link" data-filter="burger">
                    <i className="fa fa-fw fa-hamburger mr-1 ml-n2"></i> Escritório
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/pos/customer-order" className="nav-link" data-filter="pizza">
                    <i className="fa fa-fw fa-pizza-slice mr-1 ml-n2"></i> Limpeza
                  </Link>
                </li>
              </ul>
            </PerfectScrollbar>
          </div>
        </div> */}
        <div className="pos-content">
          <PerfectScrollbar className="pos-content-container" options={{ suppressScrollX: true }}>
            <div className="product-row">
              <div className='col-lg-12'>
                <h1 className="page-header">Itens</h1>
              </div>
              <div className='col-lg-4 pb-3'>
                <div className="container" data-type="meat">
                  <Link to="/pos/customer-order" className="product" data-bs-toggle="modal" data-bs-target="#modalPosItem">
                    <div className="text">
                      <div className="title">Arrroz</div>
                      <div className="desc">Categoria: Alimento</div>
                      <div className="price">Quantidade: 12</div>
                      <div className="desc">Status: Aguardando</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </PerfectScrollbar>
        </div>

        <div className="pos-sidebar" id="pos-sidebar">
          <div className="pos-sidebar-nav">
            <ul className="nav nav-tabs nav-fill">
              <li className="nav-item">
                <Link to="/pos/customer-order" className="nav-link active">Novo Pedido (5)</Link>
              </li>
            </ul>
          </div>
          <div className="pos-sidebar-body tab-content" data-scrollbar="true" data-height="100%">
            <div className="tab-pane fade h-100 show active" id="newOrderTab">
              <div className="pos-table">
                <div className="row pos-table-row">
                  <div className="col-9">
                    <div className="pos-product-thumb">
                      <div className="img" style={{ backgroundImage: 'url(/assets/img/pos/product-2.jpg)' }}></div>
                      <div className="info">
                        <div className="title">Arroz</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 total-price">Qtd: 12</div>
                </div>
                <div className="row pos-table-row">
                  <div className="col-9">
                    <div className="pos-product-thumb">
                      <div className="img" style={{ backgroundImage: 'url(/assets/img/pos/product-2.jpg)' }}></div>
                      <div className="info">
                        <div className="title">Arroz</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 total-price">Qtd: 12</div>
                </div>
                <div className="row pos-table-row">
                  <div className="col-9">
                    <div className="pos-product-thumb">
                      <div className="img" style={{ backgroundImage: 'url(/assets/img/pos/product-2.jpg)' }}></div>
                      <div className="info">
                        <div className="title">Arroz</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 total-price">Qtd: 12</div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade h-100" id="orderHistoryTab">
              <div className="h-100 d-flex align-items-center justify-content-center text-center p-20">
                <div>
                  <div className="mb-3 mt-n5">
                    <svg width="6em" height="6em" viewBox="0 0 16 16" className="text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M14 5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5zM1 4v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4H1z" />
                      <path d="M8 1.5A2.5 2.5 0 0 0 5.5 4h-1a3.5 3.5 0 1 1 7 0h-1A2.5 2.5 0 0 0 8 1.5z" />
                    </svg>
                  </div>
                  <h4>No order history found</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="pos-sidebar-footer">
            <div className="subtotal">
              <div className="text">Total em quantidade:</div>
              <div className="price">30</div>
            </div>
            <div className="total">
              <div className="text">Quantidade de Itens:</div>
              <div className="price">5</div>
            </div>
            <div className="btn-row">
              {/* <Link to="/pos/customer-order" className="btn btn-default"><i className="fa fa-bell fa-fw fa-lg"></i> Service</Link>
              <Link to="/pos/customer-order" className="btn btn-default"><i className="fa fa-file-invoice-dollar fa-fw fa-lg"></i> Bill</Link> */}
              <Link to="/pos/customer-order" className="btn btn-success"><i className="fa fa-check fa-fw fa-lg"></i> Finalizar Pedido</Link>
            </div>
          </div>


        </div>

        <Link to="/pos/customer-order" className="pos-mobile-sidebar-toggler" onClick={() => this.togglePosMobileSidebar()}>
          <svg viewBox="0 0 16 16" className="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M14 5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5zM1 4v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4H1z" />
            <path d="M8 1.5A2.5 2.5 0 0 0 5.5 4h-1a3.5 3.5 0 1 1 7 0h-1A2.5 2.5 0 0 0 8 1.5z" />
          </svg>
          <span className="badge">5</span>
        </Link>

        <div className="modal modal-pos-item fade" id="modalPosItem">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body p-0">
                <button data-bs-dismiss="modal" className="btn-close position-absolute top-0 end-0 m-4"> </button>
                <div className="pos-product">
                  <div className="pos-product-img">
                    <div className="img" style={{ backgroundImage: 'url(/assets/img/pos/product-1.jpg)' }}></div>
                  </div>
                  <div className="pos-product-info">
                    <div className="title">Grill Chicken Chop</div>
                    <div className="desc">
                      chicken, egg, mushroom, salad
                    </div>
                    <div className="price">$10.99</div>
                    <hr />
                    <div className="option-row">
                      <div className="qty">
                        <div className="input-group">
                          <a href="#/" className="btn btn-default"><i className="fa fa-minus"></i></a>
                          <input type="text" className="form-control border-0 text-center" name="" defaultValue="1" />
                          <a href="#/" className="btn btn-default"><i className="fa fa-plus"></i></a>
                        </div>
                      </div>
                    </div>
                    <div className="option-row">
                      <div className="option-title">Size</div>
                      <div className="option-list">
                        <div className="option">
                          <input type="radio" id="size3" name="size" className="option-input" defaultChecked />
                          <label className="option-label" htmlFor="size3">
                            <span className="option-text">Small</span>
                            <span className="option-price">+0.00</span>
                          </label>
                        </div>
                        <div className="option">
                          <input type="radio" id="size1" name="size" className="option-input" />
                          <label className="option-label" htmlFor="size1">
                            <span className="option-text">Large</span>
                            <span className="option-price">+3.00</span>
                          </label>
                        </div>
                        <div className="option">
                          <input type="radio" id="size2" name="size" className="option-input" />
                          <label className="option-label" htmlFor="size2">
                            <span className="option-text">Medium</span>
                            <span className="option-price">+1.50</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="option-row">
                      <div className="option-title">Add On</div>
                      <div className="option-list">
                        <div className="option">
                          <input type="checkbox" name="addon[sos]" value="true" className="option-input" id="addon1" />
                          <label className="option-label" htmlFor="addon1">
                            <span className="option-text">More BBQ sos</span>
                            <span className="option-price">+0.00</span>
                          </label>
                        </div>
                        <div className="option">
                          <input type="checkbox" name="addon[ff]" value="true" className="option-input" id="addon2" />
                          <label className="option-label" htmlFor="addon2">
                            <span className="option-text">Extra french fries</span>
                            <span className="option-price">+1.00</span>
                          </label>
                        </div>
                        <div className="option">
                          <input type="checkbox" name="addon[ms]" value="true" className="option-input" id="addon3" />
                          <label className="option-label" htmlFor="addon3">
                            <span className="option-text">Mushroom soup</span>
                            <span className="option-price">+3.50</span>
                          </label>
                        </div>
                        <div className="option">
                          <input type="checkbox" name="addon[ms]" value="true" className="option-input" id="addon4" />
                          <label className="option-label" htmlFor="addon4">
                            <span className="option-text">Lemon Juice (set)</span>
                            <span className="option-price">+2.50</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="btn-row">
                      <button className="btn btn-default" data-bs-dismiss="modal">Cancel</button>
                      <button className="btn btn-success">Add to cart <i className="fa fa-plus fa-fw ms-2"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CustomerOrder;
