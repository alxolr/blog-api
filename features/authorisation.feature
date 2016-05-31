Feature: Authorisation feature
  As an administrator I should be able to login and to authorise
  myself into the administration area with a password and a username.

  Scenario: Admin user authentification.
    Given I am a guest user
    And I follow "/admin/"
    Then I should see "Authorise yourself"
