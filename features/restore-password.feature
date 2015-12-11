Feature: Restore Password

	In case some users does not remember their passwords a simple restoration password 
	mechanism should be added. 

	Scenario: Restore Password With Existing Email
		Given there is a restore-password route "/restore-password"
	
		When I introduce my existing email "alxolr@gmail.com"
		And click the button submit 

		Then I should get an email with a link to restore my password
	
	Scenario: Restore password after receiving email
		Given I clicked a restore password link received in email

		When I Introduce and confirm the new password

		Then a new password should be added in the system	