Feature: Proceso de compra

  Scenario: Usuario completa el proceso de compra
  Given que el usuario ha agregado un producto al carrito y accede al checkout
  When completa sus datos con nombre, apellido y código postal
  When confirma el pedido
  Then debería ver una página de confirmación de compra exitosa