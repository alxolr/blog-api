Feature: Register a new user

	Scenario: Register a new inexistent user account
		Given there is a registration page "/register"
		And is accessible
		And User with email "alxolr@gmail.com" is not saved in the system

		When I enter name "Alexandru Olaru"
		And I enter email "alxolr@gmail.com"
		And I insert the password "password"
		And I click "register" button

		Then I should see the green <flash> "Your account was registered. A confirmation email was sent"
		And I should receive as <Administrator> an email with the new user details
		And As a <Registered User> I should receive an email with the confirmation email link.

	Scenario: Register an existent user
		Given there is a registration page "/register"
		And is accessible
		And User with email "alxolr@gmail.com" exists

		When I enter email "axlolr@gmail.com"
		And I enter password "random password"

		Then I should receive a <red message> Email already exists try to login

