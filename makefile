# Install tools required for React native
install-tools:
	brew install node; brew install watchman; npm install -g react-native-cli;

# Show detailed install instructions in case of failure
show-instructions:
	python -m webbrowser "https://facebook.github.io/react-native/docs/getting-started.html"

# Setup all the necessary tools
setup-tools:
	$(MAKE) install-tools || $(MAKE) show-instructions

# Setup Auth project
setup-auth: setup-tools
	cd auth; npm install;

# Setup Manager project
setup-manager: setup-tools
	cd manager; npm install;

# Setup TechStack project
setup-techstack: setup-tools
	cd tech_stack; npm install;

# Setup all projects
setup: setup-auth setup-manager setup-techstack

run-auth-ios:
	cd auth; react-native run-ios;

run-auth-android:
	cd auth; react-native run-android;

run-techstack-ios:
	cd techstack; react-native run-ios;

run-techstack-android:
	cd techstack; react-native run-android;

run-manager-ios:
	cd manager; react-native run-ios;

run-manager-android:
	cd manager; react-native run-android;
