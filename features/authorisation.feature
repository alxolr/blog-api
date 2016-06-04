Feature: Authorisation feature
  As an administrator I should be able to login and to authorise
  myself into the administration area with a password and a username.

  Scenario: Admin user authentification page.
    Given I am a guest user
    And I follow "/admin/"
    Then I should see "Please Login"
    And I should see "Username"
    And I should see "Password"

  Scenario: Admin user authentification login
    Given I am a guest username
    And I follow "/admin/"
    When I insert "admin" in "username"
    And I insert "admin-password" in "password"
    And I press "Login"
    Then I should see "Administration board"
