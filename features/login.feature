Feature: Login
	
	In order to authorize the request a login feature is needed

	Scenario: Login with valid credentials
		Given there is a login page "/login"
		And There exists the user with email "alxolr@gmail.com"

		When As a guest I enter the credentials
		And I press login button

		Then I should see the name "Alexandru"
		And The buttons login|create should not be visible
		And a session for the user should be created

	Scenario: Login with bad credentials
		Given there is a login page "/login"
		And there is no user with email "alxolr@gmail.com"

		When I Inter the credentials in the form
		And I press Login button

		Then I should receive a red message "Invalid credentials"