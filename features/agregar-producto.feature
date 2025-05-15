Feature: Agregar producto al carrito

  Scenario: Usuario agrega un producto desde la página de productos
    Given que el usuario ha iniciado sesión con credenciales válidas
    When agrega el producto "Sauce Labs Backpack" al carrito
    Then el carrito debe mostrar 1 producto agregado