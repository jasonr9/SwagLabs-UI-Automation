Feature: Inicio de sesión

Scenario: Usuario inicia sesión con credenciales válidas
  Given que el usuario está en la página de login
  When ingresa sus credenciales válidas
  And hace clic en el botón de login
  Then debería ver la página principal de productos


Scenario: Usuario no puede iniciar sesión con credenciales inválidas
   Given que el usuario está en la página de login
   When ingresa sus credenciales inválidas
    And hace clic en el botón de login
    Then debería ver un mensaje de error de credenciales inválidas